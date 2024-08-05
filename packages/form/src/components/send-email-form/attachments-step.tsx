"use client";

import { FormHelperText, Grid } from "@mui/material";
import { FilePreview } from "@/components/file-preview";
import { Step, StepProps } from "@/components/send-email-form/step";
import { useApi } from "@/providers/api";
import { useDropzone } from "react-dropzone";
import { Attachment } from "@/validators/email-form";
import { useState } from "react";

export function AttachmentsStep(props: StepProps) {
  const { form } = props;
  const { upload } = useApi();

  const [progress, setProgress] = useState<Record<string, number>>({});

  const attachments = form.watch("attachments");

  const onAdd = async (files: File[]) => {
    const newFormattedFiles: Attachment[] = files.map((file) => ({
      id: Math.random().toString(36),
      file,
    }));

    form.setValue("attachments", [...attachments, ...newFormattedFiles], {
      shouldValidate: true,
    });

    const uploadTasks = newFormattedFiles.map(async (attachment) => {
      setProgress((prev) => ({ ...prev, [attachment.id]: 0 }));

      try {
        const response = await upload(attachment.file, (event) => {
          if (typeof event.total !== "number") {
            return;
          }

          const progress = Math.round((event.loaded / event.total) * 100);
          setProgress((prev) => ({ ...prev, [attachment.id]: progress }));
        });

        attachment.uploadResponse = response.data;
      } catch (error) {
        form.setValue(
          "attachments",
          attachments.filter((a) => a !== attachment)
        );

        // Improvement: Show error message to user in snackbar
        console.error("Error uploading file");
      } finally {
        setProgress((prev) => {
          delete prev[attachment.id];
          return prev;
        });
      }
    });

    await Promise.all(uploadTasks);
  };

  const onRemove = ({ file }: Attachment) => {
    const newAttachments = attachments.filter(
      (attachment) => attachment.file !== file
    );

    form.setValue("attachments", newAttachments, { shouldValidate: true });
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: onAdd,
    maxSize: 1_000_000, // 1 MB
  });

  const error = form.formState.errors.attachments;

  return (
    <Step>
      <Grid item xs={12}>
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <p>Drag and drop files here, or click to select files</p>
        </div>

        <FormHelperText
          sx={{ textAlign: "center", mt: 2 }}
          error={Boolean(error)}
        >
          {error?.message}
        </FormHelperText>
      </Grid>

      {attachments.map((attachment, index) => (
        <Grid item xs={4} key={index}>
          <FilePreview
            file={attachment.file}
            progress={progress[attachment.id]}
            onRemove={() => onRemove(attachment)}
          />
        </Grid>
      ))}
    </Step>
  );
}

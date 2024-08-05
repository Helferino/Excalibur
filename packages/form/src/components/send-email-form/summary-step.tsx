"use client";

import { Box, Chip, Grid } from "@mui/material";
import { FilePreview } from "@/components/file-preview";
import { SummaryItem } from "@/components/send-email-form/summary-item";
import { Step, StepProps } from "@/components/send-email-form/step";

export function SummaryStep(props: StepProps) {
  const { form } = props;

  const { subject, receiver, ccs, body, attachments } = form.watch();

  return (
    <Step>
      <Grid item xs={12}>
        <SummaryItem label="Subject" value={subject} />
      </Grid>

      <Grid item xs={12}>
        <SummaryItem label="Receiver" value={receiver} />
      </Grid>

      <Grid item xs={12}>
        <SummaryItem
          label="CCs"
          empty={ccs.length === 0}
          render={
            <Box sx={{ display: "flex", gap: 1 }}>
              {ccs.map((cc, index) => (
                <Chip key={index} label={cc} />
              ))}
            </Box>
          }
        />
      </Grid>

      <Grid item xs={12}>
        <SummaryItem label="Body" value={body} />
      </Grid>

      <Grid item xs={12}>
        <SummaryItem
          label="Attachments"
          empty={attachments.length === 0}
          render={
            <Grid container spacing={2}>
              {attachments.map(({ file }, index) => (
                <Grid item key={index} xs={4}>
                  <FilePreview file={file} />
                </Grid>
              ))}
            </Grid>
          }
        />
      </Grid>
    </Step>
  );
}

import { Box, Paper, Tooltip, Typography } from "@mui/material";
import { isImageType } from "@/utils/utils";
import { useMemo } from "react";

type PreviewProps = {
  file: File;
  progress?: number;
  onRemove?: () => void;
};

export function FilePreview(props: PreviewProps) {
  const { file, progress, onRemove } = props;

  const isImage = useMemo(() => isImageType(file), [file]);
  const src = useMemo(
    () => (isImage ? URL.createObjectURL(file) : "file.png"),
    [isImage, file]
  );

  const label = useMemo(() => {
    if (typeof progress === "number") {
      return progress < 100 ? `Uploading ${progress}%` : file.name;
    }
    return file.name;
  }, [file, progress]);

  const onRemoveHandler = () => {
    onRemove && onRemove();
  };

  const canRemove = useMemo(() => Boolean(onRemove), [onRemove]);

  return (
    <Tooltip title="Click to remove file" disableHoverListener={!canRemove}>
      <Box
        onClick={onRemoveHandler}
        sx={{ cursor: canRemove ? "pointer" : "default" }}
      >
        <img
          width="100%"
          src={src}
          alt={file.name}
          className={isImage ? "" : "image-preview-file"}
        />
        <Typography component="p" variant="caption" align="center">
          {label}
        </Typography>
      </Box>
    </Tooltip>
  );
}

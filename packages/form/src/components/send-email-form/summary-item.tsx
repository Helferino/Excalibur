import { Typography } from "@mui/material";
import { Fragment, ReactNode, useMemo } from "react";

type SummaryItemProps = {
  label: string;
  value?: string;
  render?: ReactNode;
  empty?: boolean;
};

export function SummaryItem(props: SummaryItemProps) {
  const { label, value, render, empty } = props;

  const renderValue = useMemo(() => {
    if (empty || (!render && (value === undefined || value === ""))) {
      return <Typography fontStyle="italic">None</Typography>;
    }

    if (render) {
      return render;
    }

    return <Typography>{value}</Typography>;
  }, [render, empty, value]);

  return (
    <Fragment>
      <Typography variant="caption">{label}</Typography>
      {renderValue}
    </Fragment>
  );
}

import { Grid } from "@mui/material";
import { ReactNode } from "react";
import { UseFormReturn } from "react-hook-form";
import { EmailForm } from "@/validators/email-form";

export type StepProps = {
  form: UseFormReturn<EmailForm>;
};

type _StepProps = {
  children: ReactNode;
};

export function Step(props: _StepProps) {
  const { children } = props;

  return (
    <Grid container rowGap={2} columnSpacing={2}>
      {children}
    </Grid>
  );
}

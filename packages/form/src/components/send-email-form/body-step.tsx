import { Grid, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import { Step, StepProps } from "@/components/send-email-form/step";

export function BodyStep(props: StepProps) {
  const { form } = props;

  return (
    <Step>
      <Grid item xs={12}>
        <Controller
          name="body"
          control={form.control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Body"
              fullWidth
              multiline
              rows={5}
              error={fieldState.invalid}
              helperText={fieldState.error?.message}
            />
          )}
        />
      </Grid>
    </Step>
  );
}

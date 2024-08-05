import { emailSchema } from "common/validators";
import { Grid, TextField } from "@mui/material";
import { MuiChipsInput } from "mui-chips-input";
import { Controller } from "react-hook-form";
import { Step, StepProps } from "@/components/send-email-form/step";

export function ReceiverStep(props: StepProps) {
  const { form } = props;

  return (
    <Step>
      <Grid item xs={12} md={6}>
        <Controller
          name="subject"
          control={form.control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Subject"
              error={fieldState.invalid}
              helperText={fieldState.error?.message}
            />
          )}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <Controller
          name="receiver"
          control={form.control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Receiver"
              error={fieldState.invalid}
              helperText={fieldState.error?.message}
            />
          )}
        />
      </Grid>

      <Grid item xs={12}>
        <Controller
          name="ccs"
          control={form.control}
          render={({ field, fieldState }) => (
            <MuiChipsInput
              {...field}
              label="CCs"
              fullWidth
              size="small"
              error={fieldState.invalid}
              renderChip={(Chip, index, props) => (
                <Chip
                  key={index}
                  {...props}
                  {...(emailSchema.safeParse(props.label).success
                    ? {}
                    : { color: "error" })}
                />
              )}
              helperText={
                fieldState.invalid
                  ? "One or more email addresses are invalid"
                  : "Press enter to add email"
              }
            />
          )}
        />
      </Grid>
    </Step>
  );
}

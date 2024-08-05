import { Box } from "@mui/material";
import { ComponentType, Fragment } from "react";
import {
  Button,
  MobileStepper,
  Step,
  StepButton,
  StepLabel,
  Stepper as MuiStepper,
  Tooltip,
} from "@mui/material";
import { UseFormReturn, FieldValues } from "react-hook-form";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";

export type StepItem<T extends FieldValues> = {
  label: string;
  component: ComponentType<{ form: UseFormReturn<T> }>;
  fields: (keyof T)[];
  required: (keyof T)[];
};

type StepperProps<T extends FieldValues> = {
  step: number;
  steps: StepItem<T>[];
  defaultValues: T;
  form: UseFormReturn<T>;
  onStep: (step: number) => void;
};

export const Stepper = <T extends FieldValues>(props: StepperProps<T>) => {
  const { step: activeStep, steps, form, defaultValues, onStep } = props;

  const onNext = () => onStep(activeStep + 1);
  const onBack = () => onStep(activeStep - 1);

  const isCompleted = (step: number) => {
    if (activeStep <= step) {
      return false;
    }

    return canContinue(step);
  };

  const isSubmitting = form.formState.isSubmitting;

  const canContinue = (step: number) => {
    // @ts-ignore nemam silu :(
    if (steps[step].fields.some((field) => form.getFieldState(field).invalid)) {
      return false;
    }

    return steps[step].required.every((field) => {
      // @ts-ignore nemam silu :(
      const fieldState = form.getFieldState(field);
      return fieldState.isDirty && !fieldState.invalid;
    });
  };

  const onReset = () => {
    form.reset(defaultValues);
    onStep(0);
  };

  return (
    <Fragment>
      <Box>
        <MuiStepper activeStep={activeStep}>
          {steps.map((step, index) => (
            <Step key={index} completed={isCompleted(index)}>
              <StepButton disabled>
                <StepLabel>{step.label}</StepLabel>
              </StepButton>
            </Step>
          ))}
        </MuiStepper>
      </Box>

      <Box sx={{ marginY: 2 }}>
        <MobileStepper
          variant="progress"
          steps={steps.length}
          position="static"
          activeStep={activeStep}
          sx={{ flexGrow: 1 }}
          backButton={
            <Button size="small" onClick={onBack} disabled={activeStep === 0}>
              <KeyboardArrowLeft />
              Back
            </Button>
          }
          nextButton={
            <Button
              size="small"
              onClick={onNext}
              disabled={
                !canContinue(activeStep) || activeStep === steps.length - 1
              }
            >
              Next
              <KeyboardArrowRight />
            </Button>
          }
        />
      </Box>

      <Box>
        {steps.map((step, index) => (
          <div key={index} hidden={activeStep !== index}>
            <step.component form={form} />
          </div>
        ))}
      </Box>

      {activeStep === steps.length - 1 && (
        <Box sx={{ display: "flex", marginTop: 5 }}>
          <Tooltip title="Discard draft and start again">
            <Button
              sx={{ paddingX: 5 }}
              variant="text"
              color="error"
              onClick={onReset}
              disabled={isSubmitting}
            >
              Discard
              <DeleteIcon sx={{ ml: 1 }} fontSize="small" />
            </Button>
          </Tooltip>
          <Button
            type="submit"
            fullWidth
            color="primary"
            variant="contained"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              "Submitting"
            ) : (
              <>
                Submit
                <SendIcon sx={{ ml: 1 }} fontSize="small" />
              </>
            )}
          </Button>
        </Box>
      )}
    </Fragment>
  );
};

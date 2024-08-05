"use client";

import { EmailForm, emailFormSchema } from "@/validators/email-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CardContent } from "@mui/material";
import { useForm } from "react-hook-form";
import { useApi } from "@/providers/api";
import { StepItem, Stepper } from "@/components/stepper";
import { useState } from "react";
import { ReceiverStep } from "./send-email-form/receiver-step";
import { BodyStep } from "./send-email-form/body-step";
import { AttachmentsStep } from "./send-email-form/attachments-step";
import { SummaryStep } from "./send-email-form/summary-step";

// Some UX features
// StepItem["required"] is used for allowing user to continue in stepper
// StepItem["fields"]   is used for error handling, when error occurs in API response, stepper will go to that step

const STEPS: StepItem<EmailForm>[] = [
  {
    label: "Receiver",
    component: ReceiverStep,
    fields: ["subject", "receiver", "ccs"],
    required: ["subject", "receiver"],
  },
  {
    label: "Body",
    component: BodyStep,
    fields: ["body"],
    required: ["body"],
  },
  {
    label: "Attachments",
    component: AttachmentsStep,
    fields: ["attachments"],
    required: [],
  },
  {
    label: "Summary",
    component: SummaryStep,
    fields: [],
    required: [],
  },
];

const DEFAULT_VALUES: EmailForm = {
  subject: "",
  receiver: "",
  ccs: [],
  body: "",
  attachments: [],
};

type SendEmailFormProps = {
  onSuccess: () => void;
  onError: (error: string) => void;
};

export function SendEmailForm(props: SendEmailFormProps) {
  const { onSuccess, onError } = props;
  const { post } = useApi();

  const form = useForm<EmailForm>({
    resolver: zodResolver(emailFormSchema),
    mode: "all",
    defaultValues: DEFAULT_VALUES,
  });

  const [step, setStep] = useState(0);

  const onStep = (step: number) => setStep(step);

  const onSubmit = async (values: EmailForm) => {
    const body = {
      ...values,
      attachments: values.attachments.map(
        (attachment) => attachment.uploadResponse
      ),
    };

    const response = await post("/http/200", body);

    if (response.status === 200) {
      onSuccess();
      setStep(0);
      form.reset();
    } else if (response.status === 400) {
      // Type depends on API response
      const errors: any = response.data;

      let closestStep = STEPS.length - 1;

      for (const error in errors) {
        // Find closest step with error in stepper
        const errorStep = STEPS.findIndex((step) =>
          step.fields.includes(error as keyof EmailForm)
        );

        if (errorStep < closestStep) {
          closestStep = errorStep;
        }

        // This will bind error message to specific fields in form
        form.setError(error as keyof EmailForm, { message: errors[error] });
      }

      setStep(closestStep);
      onError("Validation failed for one or more fields");
    } else {
      onError("Unknwon error occured, please try again later");
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <CardContent>
        <Stepper
          form={form}
          step={step}
          steps={STEPS}
          defaultValues={DEFAULT_VALUES}
          onStep={onStep}
        />
      </CardContent>
    </form>
  );
}

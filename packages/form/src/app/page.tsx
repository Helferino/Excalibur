"use client";

import { SendEmailForm } from "@/components/send-email-form";
import { Header } from "@/components/send-email-form/header";
import { Card, Snackbar } from "@mui/material";
import { useState } from "react";

export default function HomePage() {
  // Can be replaced with globally accessible provider
  const [snackbar, setSnackbar] = useState<{
    error: boolean;
    message: string;
  } | null>(null);

  function onSuccess() {
    setSnackbar({ error: false, message: "Email sent successfully" });
  }

  function onError(error: string) {
    setSnackbar({ error: true, message: error });
  }

  return (
    <Card sx={{ mt: 20 }}>
      <Header />

      <SendEmailForm onSuccess={onSuccess} onError={onError} />

      <Snackbar
        open={snackbar !== null}
        autoHideDuration={6000}
        color={snackbar?.error ? "error" : "success"}
        onClose={setSnackbar.bind(null, null)}
        message={snackbar?.message}
      />
    </Card>
  );
}

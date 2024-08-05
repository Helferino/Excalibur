"use client";

import theme from "@/lib/mui";
import { ReactNode } from "react";
import { ApiProvider } from "./api";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { CssBaseline, ThemeProvider } from "@mui/material";

type ProvidersProps = {
  children: ReactNode;
};

export function Providers(props: ProvidersProps) {
  const { children } = props;

  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <ApiProvider>
          <CssBaseline />
          {children}
        </ApiProvider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}

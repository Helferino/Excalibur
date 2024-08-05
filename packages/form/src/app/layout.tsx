import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Container } from "@mui/material";
import { ReactNode } from "react";
import { Providers } from "@/providers/providers";

import "./global.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Excalibur - Send Email",
  description: "Frontend assignment for Excalibur",
};

type LayoutProps = {
  children: ReactNode;
};

export default function Layout(props: LayoutProps) {
  const { children } = props;

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Container maxWidth="sm">{children}</Container>
        </Providers>
      </body>
    </html>
  );
}

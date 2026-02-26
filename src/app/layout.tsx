import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import AppShell from "@/components/features/app-shell";

export const metadata: Metadata = {
  title: "DIU PageCrafter",
  description: "Generate, customize, and merge assignment cover pages.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}

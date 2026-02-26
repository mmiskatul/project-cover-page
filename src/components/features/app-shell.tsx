import type { PropsWithChildren } from "react";
import Navigation from "@/components/features/navigation";
import SiteFooter from "@/components/features/site-footer";

export default function AppShell({ children }: PropsWithChildren) {
  return (
    <>
      <Navigation />
      {children}
      <SiteFooter />
    </>
  );
}

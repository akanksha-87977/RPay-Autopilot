import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RPay Autopilot — AI Revenue Operating System",
  description: "An AI Revenue Agent and Agent Commerce Gateway for bounded, auditable commerce.",
  metadataBase: new URL("http://localhost:3000")
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}

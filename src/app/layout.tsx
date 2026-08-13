import "@fontsource/stack-sans-text/200.css";
import "@fontsource/stack-sans-text/300.css";
import "@fontsource/stack-sans-text/400.css";
import "@fontsource/stack-sans-text/500.css";
import "@fontsource/stack-sans-text/600.css";
import "@fontsource/stack-sans-text/700.css";
import type { Metadata } from "next";
import SmoothCursor from "@/components/smooth-cursor";
import "./globals.css";

export const metadata: Metadata = {
  title: "John Doe — Portfolio",
  description: "Full-Stack Developer. Clean, functional web experiences.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <SmoothCursor />
      </body>
    </html>
  );
}

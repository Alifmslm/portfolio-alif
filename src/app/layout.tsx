import { Geist } from "next/font/google";
import type { Metadata } from "next";
import ClickRipple from "@/components/ClickRipple";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "alifolioo",
  description: "Full-Stack Developer. Clean, functional web experiences.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={geistSans.variable}>
      <body suppressHydrationWarning>
        {children}
        <ClickRipple />
      </body>
    </html>
  );
}

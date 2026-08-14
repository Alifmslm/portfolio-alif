import "@fontsource/stack-sans-text/200.css";
import "@fontsource/stack-sans-text/300.css";
import "@fontsource/stack-sans-text/400.css";
import "@fontsource/stack-sans-text/500.css";
import "@fontsource/stack-sans-text/600.css";
import "@fontsource/stack-sans-text/700.css";
import type { Metadata } from "next";
import SmoothCursor from "@/components/smooth-cursor";
import ThemeToggle from "@/components/ThemeToggle";
import "./globals.css";

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
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");document.documentElement.setAttribute("data-theme",t||"light")}catch(e){document.documentElement.setAttribute("data-theme","light")}})();`,
          }}
        />
      </head>
      <body>
        {children}
        <SmoothCursor />
        <ThemeToggle />
      </body>
    </html>
  );
}

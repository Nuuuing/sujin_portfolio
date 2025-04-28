import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SUJIN PORTFOLIO",
  description: "Sujin's Portfolio Page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
          {children}
      </body>
    </html>
  );
}

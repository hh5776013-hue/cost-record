import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cost Record Management",
  description: "Manage your daily expenses",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

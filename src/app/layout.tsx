import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Haryana Roadways - Bus Timetable & Route Finder",
  description: "Scheduled timetable lookup for Haryana State Transport buses.",
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
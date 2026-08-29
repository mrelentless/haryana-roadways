import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Haryana Roadways - Bus Timetable & Route Finder",
  description: "Scheduled timetable lookup for Haryana State Transport buses.",
  verification: {
    google: "4qKARsi9RkPaCVs_LL-N2p4IeDtqVT1rmjfkn2D7Ex8",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
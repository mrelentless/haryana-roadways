import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Haryana Roadways Saarthi | Bus Timetable & Inquiry',
  description: 'Official scheduled timetable lookup and route guide for Haryana State Transport buses.',
  manifest: '/manifest.json',
  icons: {
    icon: '/icon-192x192.png',
    apple: '/icon-512x512.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#0d1c3a',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}

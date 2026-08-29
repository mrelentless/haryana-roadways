import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#f4f7fb] text-slate-800 py-10 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-xs">
          <ArrowLeft className="h-4 w-4" /> Back to Timetable
        </Link>

        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 space-y-6 shadow-xs">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Privacy Policy</h1>
            <p className="text-xs text-slate-400 font-semibold mt-1">Last Updated: August 2026</p>
          </div>

          <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
            <h2 className="text-base font-bold text-slate-900">1. Data Collection & Usage</h2>
            <p>We do not require account registration or store personal tracking data for timetable searches. Details submitted via the Passenger Grievance Redressal form (Name, Optional Phone number, and Issue description) are used strictly to handle inquiries.</p>

            <h2 className="text-base font-bold text-slate-900">2. Microphone Permissions</h2>
            <p>Our voice assistant runs locally through your browser's Web Speech Recognition API. Audio is processed directly on your device and is not saved to remote servers.</p>

            <h2 className="text-base font-bold text-slate-900">3. Third-Party Links & Booking Portals</h2>
            <p>Our website provides direct links to seat booking platforms and official State Transport portals. These external sites operate under their own independent privacy policies.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#f4f7fb] text-slate-800 py-10 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-xs">
          <ArrowLeft className="h-4 w-4" /> Back to Timetable
        </Link>

        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 space-y-6 shadow-xs">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Terms of Service</h1>
            <p className="text-xs text-slate-400 font-semibold mt-1">Last Updated: August 2026</p>
          </div>

          <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
            <h2 className="text-base font-bold text-slate-900">1. Informational Purpose & Disclaimer</h2>
            <p>Haryana Roadways Saarthi is an independent digital timetable directory. We are not an official government entity of Haryana State Transport Department. Final seat bookings and counter updates are managed directly through official depot counters and state portals.</p>

            <h2 className="text-base font-bold text-slate-900">2. Timetable & Fare Adjustments</h2>
            <p>Bus schedules, route milestones, and fares are regularly updated; however, operations remain subject to depot revisions, route rerouting, and traffic conditions.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
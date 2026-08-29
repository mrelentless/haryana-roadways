import React from 'react';
import Link from 'next/link';
import { Bus, ArrowLeft, Mail, MapPin, ShieldCheck } from 'lucide-react';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#f4f7fb] text-slate-800 py-10 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <Link 
          href="/" 
          className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-xs"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Timetable
        </Link>

        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <Bus className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">About Haryana Roadways Saarthi</h1>
              <p className="text-xs text-slate-500 font-semibold">Haryana Inter-State State Transport Timetable Network</p>
            </div>
          </div>

          <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
            <p>
              <strong className="text-slate-900">Haryana Roadways Saarthi</strong> is an independent commuter directory providing bus departure timings, stop milestones, state fare charts, and depot contact numbers for all 24 Haryana depots and major sub-depots.
            </p>
            <p>
              We provide quick schedule lookups for Ordinary (Haryana Saarthi), HVAC AC, and Volvo Super Luxury inter-state services connecting Delhi, Chandigarh, Jaipur, Haridwar, and regional routes across Haryana.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-1">
              <div className="flex items-center gap-2 text-slate-900 font-black text-xs">
                <MapPin className="h-4 w-4 text-blue-600" />
                <span>24 District Depots & Sub-Depots</span>
              </div>
              <p className="text-[11px] text-slate-500">Coverage across Ambala Cantt, Ambala City, Chandigarh, Gurugram, Hisar, Rohtak, and all regional bus stands.</p>
            </div>

            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-1">
              <div className="flex items-center gap-2 text-slate-900 font-black text-xs">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                <span>Verified Passenger Routes</span>
              </div>
              <p className="text-[11px] text-slate-500">Regularly updated timetable milestones and calculated per-passenger fares.</p>
            </div>
          </div>

          <div className="bg-blue-50/70 border border-blue-100 rounded-2xl p-5 space-y-2">
            <h2 className="text-sm font-black text-blue-900 flex items-center gap-2">
              <Mail className="h-4 w-4 text-blue-600" />
              Depot Enquiries & Timetable Corrections
            </h2>
            <p className="text-xs text-slate-600">For schedule corrections, route additions, or general questions, contact:</p>
            <a href="mailto:capturecine07@gmail.com" className="text-sm font-bold text-blue-600 hover:underline inline-block">
              capturecine07@gmail.com
            </a>
          </div>

          <div className="pt-4 border-t border-slate-100 text-center space-y-1">
            <p className="text-xs font-extrabold text-slate-800">
              Developed & Managed by <span className="text-blue-600 font-black">Vipin</span>
            </p>
            <p className="text-[11px] text-slate-400">
              © 2026 Haryana Roadways Saarthi. All rights reserved. Independent commuter utility portal.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

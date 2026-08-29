'use client';

import React from 'react';
import { DEPOT_HELPLINES } from '../data/busData';
import { Phone, X } from 'lucide-react';
import { Language } from '../types/bus';

export const HelplineModal: React.FC<{ isOpen: boolean; onClose: () => void; lang: Language }> = ({
  isOpen,
  onClose,
  lang
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-full max-w-md rounded-3xl p-6 shadow-2xl relative">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Phone className="h-5 w-5 text-emerald-600" />
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">
              {lang === 'hi' ? 'हरियाणा रोडवेज हेल्पलाइन' : 'Haryana Roadways Enquiries'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <p className="text-xs text-slate-500 mb-4">
          {lang === 'hi' 
            ? 'बस समय और सीट पूछताछ के लिए डिपो पूछताछ नंबर पर संपर्क करें:'
            : 'Official telephone numbers of enquiry desks across major depots:'}
        </p>

        <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
          {DEPOT_HELPLINES.map((h, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800"
            >
              <span className="font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-200">
                {lang === 'hi' ? h.depotHi : h.depotEn}
              </span>
              <a
                href={`tel:${h.phone}`}
                className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
              >
                {h.phone}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
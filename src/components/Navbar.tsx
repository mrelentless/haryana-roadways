'use client';

import React from 'react';
import { Bus, PhoneCall, Moon, Sun, Languages, ShieldCheck, MessageSquareWarning } from 'lucide-react';
import { Language } from '../types/bus';

interface NavbarProps {
  activeTab: 'routes' | 'depot';
  setActiveTab: (tab: 'routes' | 'depot') => void;
  onOpenHelpline: () => void;
  onOpenFeedback: () => void;
  isDark: boolean;
  setIsDark: (val: boolean) => void;
  lang: Language;
  setLang: (lang: Language) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenHelpline,
  onOpenFeedback,
  isDark,
  setIsDark,
  lang,
  setLang
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md">
      {/* Top Gov Ribbon */}
      <div className="bg-slate-950 text-[11px] text-slate-300 py-1.5 px-4 sm:px-8 border-b border-slate-800 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-medium tracking-wide">
            {lang === 'hi' 
              ? 'हरियाणा राज्य परिवहन विभाग • अधिकृत समय सारणी पोर्टल' 
              : 'Haryana State Transport Department • Official Timetable Network'}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={onOpenFeedback}
            className="flex items-center gap-1 text-rose-400 hover:text-rose-300 font-bold transition"
          >
            <MessageSquareWarning className="h-3.5 w-3.5" />
            <span>{lang === 'hi' ? 'शिकायत / फीडबैक' : 'Report / Feedback'}</span>
          </button>
          <span className="text-slate-600">|</span>
          <button
            onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
            className="flex items-center gap-1.5 text-amber-400 font-extrabold hover:text-amber-300 transition"
          >
            <Languages className="h-3.5 w-3.5" />
            <span>{lang === 'en' ? 'हिन्दी' : 'English'}</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3.5">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-blue-800 via-blue-700 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/30 ring-2 ring-blue-500/20">
            <Bus className="h-7 w-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-black text-lg sm:text-xl text-slate-900 dark:text-white tracking-tight leading-tight">
                {lang === 'hi' ? 'हरियाणा रोडवेज सारथी' : 'Haryana Roadways Saarthi'}
              </h1>
              <span className="hidden md:inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-black bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 border border-blue-300 dark:border-blue-800">
                <ShieldCheck className="h-3 w-3" /> VERIFIED
              </span>
            </div>
            <p className="text-xs text-blue-700 dark:text-blue-400 font-semibold">
              {lang === 'hi' ? '24 मुख्य डिपो एवं अंतरराज्यीय बस नेटवर्क' : '24 Main Depots & Inter-State Bus Network'}
            </p>
          </div>
        </div>

        {/* Tab Controls & Right Utilities */}
        <div className="flex items-center gap-2 sm:gap-3">
          <nav className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setActiveTab('routes')}
              className={`px-3.5 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'routes'
                  ? 'bg-blue-700 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {lang === 'hi' ? 'रूट खोजें' : 'Route Finder'}
            </button>
            <button
              onClick={() => setActiveTab('depot')}
              className={`px-3.5 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'depot'
                  ? 'bg-blue-700 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {lang === 'hi' ? 'डिपो बोर्ड' : 'Depot Board'}
            </button>
          </nav>

          <button
            onClick={onOpenHelpline}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950/50 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 transition shadow-sm"
          >
            <PhoneCall className="h-4 w-4" />
            <span className="hidden sm:inline">{lang === 'hi' ? 'पूछताछ केंद्र' : 'Depot Helplines'}</span>
          </button>

          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2.5 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition"
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-slate-600" />}
          </button>
        </div>
      </div>
    </header>
  );
};
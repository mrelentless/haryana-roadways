'use client';

import React from 'react';
import { ArrowLeftRight, MapPin, Calendar, Sparkles, Filter } from 'lucide-react';
import { CITIES } from '../data/busData';
import { BusCategory, Language, SearchParams } from '../types/bus';

interface SearchBarProps {
  params: SearchParams;
  setParams: React.Dispatch<React.SetStateAction<SearchParams>>;
  recentSearches: { origin: string; destination: string }[];
  onSelectRecent: (origin: string, destination: string) => void;
  lang: Language;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  params,
  setParams,
  recentSearches,
  onSelectRecent,
  lang
}) => {
  const handleSwap = () => {
    setParams(prev => ({
      ...prev,
      origin: prev.destination,
      destination: prev.origin
    }));
  };

  const categories: { labelEn: string; labelHi: string; value: BusCategory }[] = [
    { labelEn: 'All Buses', labelHi: 'सभी बसें', value: 'ALL' },
    { labelEn: 'Ordinary (Saarthi)', labelHi: 'साधारण (सारथी)', value: 'ORDINARY' },
    { labelEn: 'HVAC AC', labelHi: 'एच.वी.ए.सी (ए/सी)', value: 'HVAC' },
    { labelEn: 'Volvo / Luxury', labelHi: 'वॉल्वो / लग्जरी', value: 'VOLVO' }
  ];

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 dark:shadow-none relative overflow-hidden">
      
      {/* Search Grid */}
      <div className="grid grid-cols-1 md:grid-cols-[1.2fr,auto,1.2fr,1fr] gap-4 items-center relative z-10">
        
        {/* Origin */}
        <div className="relative">
          <label className="text-xs font-black text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-blue-600 inline-block shadow-sm" />
            {lang === 'hi' ? 'प्रस्थान (कहाँ से)' : 'From (Origin)'}
          </label>
          <div className="flex items-center bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl px-3.5 py-3 focus-within:ring-2 focus-within:ring-blue-600 transition">
            <MapPin className="h-5 w-5 text-blue-600 mr-2 shrink-0" />
            <select
              value={params.origin}
              onChange={(e) => setParams(prev => ({ ...prev, origin: e.target.value }))}
              className="bg-transparent w-full text-slate-900 dark:text-white font-bold text-sm focus:outline-none cursor-pointer"
            >
              <option value="" className="dark:bg-slate-900">
                {lang === 'hi' ? '-- प्रस्थान शहर चुनें --' : '-- Select Origin --'}
              </option>
              {CITIES.map(c => (
                <option key={`origin-${c.en}`} value={c.en} className="dark:bg-slate-900">
                  {lang === 'hi' ? c.hi : c.en}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center -my-1 md:my-0 md:pt-6">
          <button
            onClick={handleSwap}
            type="button"
            className="p-3 rounded-2xl bg-blue-50 dark:bg-slate-800 hover:bg-blue-600 hover:text-white text-blue-700 dark:text-slate-300 transition-all shadow-md border border-blue-200 dark:border-slate-700"
            title={lang === 'hi' ? 'स्थान बदलें' : 'Swap Origin & Destination'}
          >
            <ArrowLeftRight className="h-4 w-4" />
          </button>
        </div>

        {/* Destination */}
        <div className="relative">
          <label className="text-xs font-black text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-600 inline-block shadow-sm" />
            {lang === 'hi' ? 'गंतव्य (कहाँ तक)' : 'To (Destination)'}
          </label>
          <div className="flex items-center bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl px-3.5 py-3 focus-within:ring-2 focus-within:ring-blue-600 transition">
            <MapPin className="h-5 w-5 text-rose-600 mr-2 shrink-0" />
            <select
              value={params.destination}
              onChange={(e) => setParams(prev => ({ ...prev, destination: e.target.value }))}
              className="bg-transparent w-full text-slate-900 dark:text-white font-bold text-sm focus:outline-none cursor-pointer"
            >
              <option value="" className="dark:bg-slate-900">
                {lang === 'hi' ? '-- गंतव्य शहर चुनें --' : '-- Select Destination --'}
              </option>
              {CITIES.map(c => (
                <option key={`dest-${c.en}`} value={c.en} className="dark:bg-slate-900">
                  {lang === 'hi' ? c.hi : c.en}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Calendar Date Picker */}
        <div className="relative">
          <label className="text-xs font-black text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-emerald-600 inline" />
            {lang === 'hi' ? 'यात्रा तिथि (दिनांक)' : 'Travel Date'}
          </label>
          <div className="flex items-center bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl px-3.5 py-3 focus-within:ring-2 focus-within:ring-blue-600 transition">
            <input
              type="date"
              value={params.travelDate}
              onChange={(e) => setParams(prev => ({ ...prev, travelDate: e.target.value }))}
              className="bg-transparent w-full text-slate-900 dark:text-white font-bold text-sm focus:outline-none cursor-pointer"
            />
          </div>
        </div>

      </div>

      {/* Category Filter Pills */}
      <div className="mt-6 flex flex-wrap gap-2.5 items-center">
        <span className="text-xs font-black text-slate-500 dark:text-slate-400 flex items-center gap-1 mr-1">
          <Filter className="h-3.5 w-3.5" /> {lang === 'hi' ? 'सेवा प्रकार:' : 'Bus Service:'}
        </span>
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setParams(prev => ({ ...prev, category: cat.value }))}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all border ${
              params.category === cat.value
                ? 'bg-blue-700 text-white border-blue-700 shadow-md shadow-blue-700/30'
                : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
            }`}
          >
            {lang === 'hi' ? cat.labelHi : cat.labelEn}
          </button>
        ))}
      </div>

      {/* Popular Fast-Links */}
      <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 flex-wrap text-xs">
        <span className="text-slate-400 font-bold flex items-center gap-1">
          <Sparkles className="h-3.5 w-3.5 text-amber-500" /> {lang === 'hi' ? 'लोकप्रिय रूट:' : 'Popular Routes:'}
        </span>
        {[
          { from: 'Ambala City', to: 'Narnaul' },
          { from: 'Chandigarh (ISBT-17)', to: 'Delhi (ISBT Kashmiri Gate)' },
          { from: 'Delhi (ISBT Kashmiri Gate)', to: 'Hisar' }
        ].map((r, idx) => (
          <button
            key={idx}
            onClick={() => onSelectRecent(r.from, r.to)}
            className="bg-blue-50/70 dark:bg-slate-800 hover:bg-blue-600 hover:text-white text-blue-800 dark:text-blue-300 px-3 py-1.5 rounded-lg transition font-semibold"
          >
            {r.from.split(' ')[0]} ⇄ {r.to.split(' ')[0]}
          </button>
        ))}
      </div>
    </div>
  );
};
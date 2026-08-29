'use client';

import React, { useState } from 'react';
import { BusSchedule, Language } from '../types/bus';
import { ChevronDown, Clock, IndianRupee, ShieldCheck, ArrowRight } from 'lucide-react';

export const BusCard: React.FC<{ bus: BusSchedule; lang: Language }> = ({ bus, lang }) => {
  const [isOpen, setIsOpen] = useState(false);

  const getBadgeConfig = (category: BusSchedule['category']) => {
    switch (category) {
      case 'VOLVO':
        return {
          title: lang === 'hi' ? 'वॉल्वो सुपर लग्जरी' : 'Volvo Super Luxury',
          style: 'bg-purple-100 text-purple-900 border-purple-300 dark:bg-purple-950/70 dark:text-purple-300 dark:border-purple-700'
        };
      case 'HVAC':
        return {
          title: lang === 'hi' ? 'एच.वी.ए.सी वातानुकूलित' : 'HVAC Air Conditioned',
          style: 'bg-sky-100 text-sky-900 border-sky-300 dark:bg-sky-950/70 dark:text-sky-300 dark:border-sky-700'
        };
      default:
        return {
          title: lang === 'hi' ? 'साधारण (हरियाणा सारथी)' : 'Ordinary (Haryana Saarthi)',
          style: 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950/70 dark:text-emerald-300 dark:border-emerald-700'
        };
    }
  };

  const badge = getBadgeConfig(bus.category);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-200">
      
      {/* Badge & Info Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
        <div className="flex items-center gap-2.5">
          <span className={`px-3 py-1 rounded-full text-xs font-black border tracking-wide ${badge.style}`}>
            {badge.title}
          </span>
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
            {lang === 'hi' ? 'संचालक डिपो:' : 'Depot:'}{' '}
            <strong className="text-slate-900 dark:text-slate-100 font-extrabold">
              {lang === 'hi' ? bus.depotHi : bus.depotEn}
            </strong>
          </span>
        </div>
        <div className="text-xs font-black text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-lg border border-blue-200 dark:border-blue-900">
          {lang === 'hi' ? bus.frequencyHi : bus.frequencyEn}
        </div>
      </div>

      {/* Timetable Big Metric Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center mb-5">
        {/* Departure */}
        <div>
          <span className="text-3xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tight">
            {bus.departureTime}
          </span>
          <p className="text-sm font-extrabold text-slate-800 dark:text-slate-200 mt-0.5">
            {lang === 'hi' ? bus.originHi : bus.originEn}
          </p>
          <span className="text-[11px] font-bold text-slate-400 uppercase">Boarding Station</span>
        </div>

        {/* Travel Line Duration Visualizer */}
        <div className="flex flex-col items-center justify-center">
          <span className="text-xs font-black text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mb-1 bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-full">
            <Clock className="h-3.5 w-3.5 text-blue-600" /> {bus.duration}
          </span>
          <div className="w-full flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-blue-600 ring-4 ring-blue-100 dark:ring-blue-950 shrink-0" />
            <div className="h-[2px] w-full bg-gradient-to-r from-blue-600 via-slate-300 to-rose-600" />
            <div className="h-3 w-3 rounded-full bg-rose-600 ring-4 ring-rose-100 dark:ring-rose-950 shrink-0" />
          </div>
          <span className="text-[11px] text-slate-400 mt-1 font-semibold">
            {bus.viaStops.length} {lang === 'hi' ? 'स्टॉपेज' : 'Key Stops'}
          </span>
        </div>

        {/* Arrival & Fare */}
        <div className="sm:text-right flex sm:flex-col justify-between items-end">
          <div>
            <span className="text-3xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tight">
              {bus.arrivalTime}
            </span>
            <p className="text-sm font-extrabold text-slate-800 dark:text-slate-200 mt-0.5">
              {lang === 'hi' ? bus.destinationHi : bus.destinationEn}
            </p>
            <span className="text-[11px] font-bold text-slate-400 uppercase">Destination Stand</span>
          </div>
          <div className="sm:mt-2 text-right">
            <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 flex items-center justify-end">
              <IndianRupee className="h-5 w-5 inline stroke-[2.5]" />{bus.fare}
            </div>
          </div>
        </div>
      </div>

      {/* Stops Toggle */}
      <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-xs font-black text-blue-700 dark:text-blue-400 hover:text-blue-900 flex items-center gap-1.5"
        >
          {isOpen 
            ? (lang === 'hi' ? 'मार्ग विवरण बंद करें' : 'Hide Stop Checkpoints')
            : (lang === 'hi' ? 'मार्ग में पड़ने वाले सभी स्टॉप देखें' : 'View Intermediate Stop Timings')}
          <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        <span className="text-xs font-mono font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
          HR #{bus.busNumber}
        </span>
      </div>

      {/* Route Checkpoints Timeline */}
      {isOpen && (
        <div className="mt-5 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80">
          <h4 className="text-xs font-black uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-4 flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-blue-600" />
            {lang === 'hi' ? 'मार्ग स्टॉपेज, दूरी एवं निर्धारित आगमन समय' : 'Scheduled Route Checkpoints & Distances'}
          </h4>
          <div className="relative pl-7 space-y-4 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-blue-400 dark:before:bg-blue-700">
            {bus.viaStops.map((stop, index) => (
              <div key={index} className="relative flex items-center justify-between text-xs sm:text-sm">
                <div className="absolute -left-7 top-1 h-4 w-4 rounded-full border-2 border-blue-600 bg-white dark:bg-slate-900 shadow-sm" />
                <div>
                  <p className="font-extrabold text-slate-900 dark:text-white">
                    {lang === 'hi' ? stop.stopNameHi : stop.stopNameEn}
                  </p>
                  <p className="text-[11px] font-semibold text-slate-400">{stop.distanceKm} km milestone</p>
                </div>
                <div className="text-right font-mono font-extrabold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-700">
                  {stop.arrivalTime === stop.departureTime ? stop.arrivalTime : `${stop.arrivalTime} - ${stop.departureTime}`}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
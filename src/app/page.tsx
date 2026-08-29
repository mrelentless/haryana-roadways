'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from '../components/Navbar';
import { SearchBar } from '../components/SearchBar';
import { BusCard } from '../components/BusCard';
import { DepotTimetable } from '../components/DepotTimetable';
import { HelplineModal } from '../components/HelplineModal';
import { FeedbackModal } from '../components/FeedbackModal';
import { VoiceAssistant } from '../components/VoiceAssistant';
import { BUS_DATA } from '../data/busData';
import { Language, SearchParams } from '../types/bus';
import { AlertCircle, SlidersHorizontal, Heart, Bus, Calendar, MessageSquareWarning } from 'lucide-react';

export default function Home() {
  const [lang, setLang] = useState<Language>('en');
  const [activeTab, setActiveTab] = useState<'routes' | 'depot'>('routes');
  const [isHelplineOpen, setIsHelplineOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [recentSearches, setRecentSearches] = useState<{ origin: string; destination: string }[]>([]);

  const today = new Date().toISOString().split('T')[0];

  const [params, setParams] = useState<SearchParams>({
    origin: '',
    destination: '',
    category: 'ALL',
    travelDate: today,
    sortBy: 'EARLIEST'
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const handleSelectRecent = (origin: string, destination: string) => {
    setParams(prev => ({ ...prev, origin, destination }));
  };

  const handleVoiceSearch = (origin: string, destination: string, category?: string) => {
    setParams(prev => ({
      ...prev,
      origin: origin || prev.origin,
      destination: destination || prev.destination,
      category: (category as any) || prev.category
    }));
  };

  const filteredBuses = useMemo(() => {
    const selectedDayOfWeek = params.travelDate ? new Date(params.travelDate).getDay() : null;

    return BUS_DATA.filter((bus) => {
      const matchesOrigin = params.origin
        ? bus.originEn.toLowerCase().includes(params.origin.toLowerCase()) ||
          bus.viaStops.some(s => s.stopNameEn.toLowerCase().includes(params.origin.toLowerCase()))
        : true;

      const matchesDestination = params.destination
        ? bus.destinationEn.toLowerCase().includes(params.destination.toLowerCase()) ||
          bus.viaStops.some(s => s.stopNameEn.toLowerCase().includes(params.destination.toLowerCase()))
        : true;

      const matchesCategory = params.category === 'ALL' ? true : bus.category === params.category;
      const matchesDay = selectedDayOfWeek === null || bus.runsOnDays.length === 0 || bus.runsOnDays.includes(selectedDayOfWeek);

      return matchesOrigin && matchesDestination && matchesCategory && matchesDay;
    }).sort((a, b) => {
      if (params.sortBy === 'FARE_LOW') return a.fare - b.fare;
      if (params.sortBy === 'SHORTEST') return parseInt(a.duration) - parseInt(b.duration);
      return a.departureTime.localeCompare(b.departureTime);
    });
  }, [params]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans antialiased transition-colors duration-200">
      
      {/* Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenHelpline={() => setIsHelplineOpen(true)}
        onOpenFeedback={() => setIsFeedbackOpen(true)}
        isDark={isDark}
        setIsDark={setIsDark}
        lang={lang}
        setLang={setLang}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        
        {activeTab === 'routes' ? (
          <div className="space-y-6">
            
            {/* Conversational Voice Assistant */}
            <VoiceAssistant
              lang={lang}
              onVoiceSearch={handleVoiceSearch}
              filteredBuses={filteredBuses}
              origin={params.origin}
              destination={params.destination}
            />

            {/* Main Search Panel with Date Calendar */}
            <SearchBar
              params={params}
              setParams={setParams}
              recentSearches={recentSearches}
              onSelectRecent={handleSelectRecent}
              lang={lang}
            />

            {/* Result Header & Sorting Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-3">
                <span className="text-sm font-black text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-blue-600 animate-pulse" />
                  {lang === 'hi' ? 'दैनिक बस समय-सारणी:' : 'Scheduled Buses Available:'}{' '}
                  <span className="text-blue-700 dark:text-blue-400 font-extrabold text-base">{filteredBuses.length}</span>
                </span>
                {params.travelDate && (
                  <span className="text-xs font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-md flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 text-blue-600" />
                    {new Date(params.travelDate).toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 text-slate-400" />
                <label className="text-xs font-black text-slate-500 dark:text-slate-400">
                  {lang === 'hi' ? 'क्रम:' : 'Sort By:'}
                </label>
                <select
                  value={params.sortBy}
                  onChange={(e) => setParams(prev => ({ ...prev, sortBy: e.target.value as any }))}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold rounded-xl px-3 py-2 text-slate-800 dark:text-slate-200 focus:outline-none shadow-sm cursor-pointer"
                >
                  <option value="EARLIEST">{lang === 'hi' ? 'शुरुआती प्रस्थान (Earliest)' : 'Earliest Departure'}</option>
                  <option value="SHORTEST">{lang === 'hi' ? 'कम यात्रा समय (Shortest)' : 'Shortest Trip Duration'}</option>
                  <option value="FARE_LOW">{lang === 'hi' ? 'किफायती किराया (Lowest Fare)' : 'Lowest Fare'}</option>
                </select>
              </div>
            </div>

            {/* List of Bus Cards */}
            {filteredBuses.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {filteredBuses.map((bus) => (
                  <BusCard key={bus.id} bus={bus} lang={lang} />
                ))}
              </div>
            ) : (
              <div className="bg-white dark:bg-slate-900 border-2 border-dashed border-slate-300 dark:border-slate-800 rounded-3xl p-12 text-center">
                <div className="h-14 w-14 rounded-2xl bg-blue-50 dark:bg-slate-800 flex items-center justify-center mx-auto mb-3 text-blue-600">
                  <AlertCircle className="h-8 w-8" />
                </div>
                <h3 className="font-extrabold text-slate-900 dark:text-white text-lg">
                  {lang === 'hi' ? 'कोई बस सेवा उपलब्ध नहीं' : 'No Direct Bus Services Found'}
                </h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
                  {lang === 'hi'
                    ? 'कृपया "सभी बसें" चुनें या बड़े बस स्टैंड जैसे अंबाला कैंट, करनाल, रोहतक के माध्यम से सर्च करें।'
                    : 'Try choosing "All Buses" or selecting intermediate major transit depots like Ambala Cantt, Karnal, or Rohtak.'}
                </p>
                <button
                  onClick={() => setIsFeedbackOpen(true)}
                  className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-100 dark:bg-rose-950/40 dark:text-rose-300 text-xs font-bold transition"
                >
                  <MessageSquareWarning className="h-4 w-4" />
                  <span>{lang === 'hi' ? 'इस रूट के गायब होने की शिकायत करें' : 'Report Missing Route'}</span>
                </button>
              </div>
            )}

            {/* Grievance & Report Callout Card */}
            <div className="mt-8 bg-gradient-to-r from-rose-50 via-orange-50 to-amber-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900 border border-rose-200 dark:border-slate-800 rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="h-12 w-12 rounded-2xl bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-rose-600/20">
                  <MessageSquareWarning className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-black text-slate-900 dark:text-white text-sm sm:text-base">
                    {lang === 'hi' ? 'क्या कोई बस समय या रूट गलत दिख रहा है?' : 'Notice incorrect timings or missing stops?'}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    {lang === 'hi'
                      ? 'सीधे सुधार हेतु शिकायत भेजें। हमारी टीम समय-सारणी तुरंत अपडेट करेगी।'
                      : 'Submit a correction report directly to our administration desk.'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsFeedbackOpen(true)}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-extrabold shadow-md shadow-rose-600/20 transition shrink-0"
              >
                {lang === 'hi' ? 'शिकायत / सुझाव दर्ज करें' : 'Report & Send Feedback'}
              </button>
            </div>

          </div>
        ) : (
          <DepotTimetable lang={lang} />
        )}

      </main>

      <HelplineModal isOpen={isHelplineOpen} onClose={() => setIsHelplineOpen(false)} lang={lang} />
      <FeedbackModal isOpen={isFeedbackOpen} onClose={() => setIsFeedbackOpen(false)} lang={lang} />

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 py-10 bg-white dark:bg-slate-900 text-xs text-slate-500 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-3">
          <div className="flex items-center justify-center gap-2 font-black text-slate-900 dark:text-white text-sm">
            <Bus className="h-4 w-4 text-blue-600" />
            <span>Haryana State Transport Official Network Explorer</span>
          </div>

          <div className="flex items-center justify-center gap-4 text-xs font-semibold text-slate-600 dark:text-slate-400">
            <button onClick={() => setIsFeedbackOpen(true)} className="hover:text-blue-600 underline">
              {lang === 'hi' ? 'शिकायत निवारण (Feedback)' : 'Grievance / Feedback'}
            </button>
            <span>&bull;</span>
            <button onClick={() => setIsHelplineOpen(true)} className="hover:text-blue-600 underline">
              {lang === 'hi' ? 'डिपो हेल्पलाइन' : 'Depot Numbers'}
            </button>
          </div>

          <div className="pt-2 flex items-center justify-center gap-1.5 font-bold text-slate-800 dark:text-slate-200 text-sm">
            <span>Designed & Developed with</span>
            <Heart className="h-4 w-4 text-rose-600 fill-rose-600 animate-bounce" />
            <span>by <strong className="text-blue-700 dark:text-blue-400 font-black">Vipin</strong></span>
          </div>
        </div>
      </footer>

    </div>
  );
}
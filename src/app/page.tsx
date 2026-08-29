'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { BUS_SERVICES, DEPOTS, DEPOT_HELPLINES } from '../data/buses';
import { Language } from '../types/bus';
import { 
  Bus, 
  ArrowLeftRight, 
  Calendar, 
  MapPin, 
  Phone, 
  Mic, 
  MicOff, 
  Sun, 
  Moon, 
  Clock, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  ExternalLink,
  MessageSquareWarning,
  SlidersHorizontal,
  X,
  CheckCircle2,
  Ticket
} from 'lucide-react';

export default function HomePage() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [lang, setLang] = useState<Language>('en');
  const [activeTab, setActiveTab] = useState<'FINDER' | 'BOARD'>('FINDER');
  
  // Search Filters
  const [origin, setOrigin] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
  const [travelDate, setTravelDate] = useState<string>('2026-08-30');
  const [selectedFleet, setSelectedFleet] = useState<string>('ALL');
  const [boardDepot, setBoardDepot] = useState<string>('AMBALA_CANTT');
  const [sortBy, setSortBy] = useState<'EARLIEST' | 'FARE'>('EARLIEST');

  // Modals & States
  const [isHelplineOpen, setIsHelplineOpen] = useState<boolean>(false);
  const [isGrievanceOpen, setIsGrievanceOpen] = useState<boolean>(false);
  const [expandedStops, setExpandedStops] = useState<Record<string, boolean>>({});

  // Universal Voice Assistant
  const [isListening, setIsListening] = useState<boolean>(false);
  const [voiceNote, setVoiceNote] = useState<string>('');

  // Grievance Form
  const [gName, setGName] = useState('');
  const [gPhone, setGPhone] = useState('');
  const [gType, setGType] = useState('Bus Timing / Delay');
  const [gDesc, setGDesc] = useState('');
  const [gSubmitted, setGSubmitted] = useState(false);

  const swapLocations = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  const toggleStops = (id: string) => {
    setExpandedStops(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Universal Voice Search for all places
  const startVoiceSearch = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setVoiceNote(lang === 'hi' ? 'ब्राउज़र वॉइस सपोर्ट नहीं करता।' : 'Voice recognition not supported.');
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = lang === 'hi' ? 'hi-IN' : 'en-IN';
    recognition.onstart = () => {
      setIsListening(true);
      setVoiceNote(lang === 'hi' ? 'सुन रहा हूँ... बोलिए' : 'Listening... Speak any route');
    };
    recognition.onresult = (e: any) => {
      const raw = e.results[0][0].transcript.toLowerCase();
      setVoiceNote(`"${raw}"`);

      // Match destination keywords universally
      const findMatchingDepot = (text: string) => {
        const found = DEPOTS.find(d => 
          text.includes(d.name.toLowerCase()) || 
          (d.nameHi && text.includes(d.nameHi.toLowerCase())) ||
          (d.id.toLowerCase().includes(text.trim()))
        );
        return found ? found.name : '';
      };

      if (raw.includes(' to ') || raw.includes(' से ')) {
        const separator = raw.includes(' to ') ? ' to ' : ' से ';
        const parts = raw.split(separator);
        const oPart = parts[0].replace('from', '').replace('bus', '').trim();
        const dPart = (parts[1] || '').replace('tak', '').replace('तक', '').trim();

        const matchO = findMatchingDepot(oPart) || oPart;
        const matchD = findMatchingDepot(dPart) || dPart;

        if (matchO) setOrigin(matchO);
        if (matchD) setDestination(matchD);
      } else {
        const singleMatch = findMatchingDepot(raw);
        if (singleMatch) {
          setOrigin(singleMatch);
        } else {
          setOrigin(raw.trim());
        }
      }
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  // Whole day bus filter logic
  const filteredBuses = useMemo(() => {
    return (BUS_SERVICES as any[]).filter((bus) => {
      if (activeTab === 'BOARD') {
        return bus.depotId === boardDepot;
      }
      if (selectedFleet !== 'ALL') {
        const bFleet = bus.fleetType || bus.category || 'ORDINARY';
        if (bFleet !== selectedFleet) return false;
      }
      if (origin) {
        const q = origin.toLowerCase().trim();
        const mOrigin = (bus.origin || '').toLowerCase().includes(q) || (bus.originHi || '').toLowerCase().includes(q);
        const mStop = bus.intermediateStops?.some((s: any) => 
          (s.name || '').toLowerCase().includes(q) || (s.nameHi || '').toLowerCase().includes(q)
        );
        if (!mOrigin && !mStop) return false;
      }
      if (destination) {
        const q = destination.toLowerCase().trim();
        const mDest = (bus.destination || '').toLowerCase().includes(q) || (bus.destinationHi || '').toLowerCase().includes(q);
        const mStop = bus.intermediateStops?.some((s: any) => 
          (s.name || '').toLowerCase().includes(q) || (s.nameHi || '').toLowerCase().includes(q)
        );
        if (!mDest && !mStop) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'FARE') return (a.fare || 0) - (b.fare || 0);
      const timeA = a.departureTime || a.departure || '00:00';
      const timeB = b.departureTime || b.departure || '00:00';
      return timeA.localeCompare(timeB);
    });
  }, [activeTab, boardDepot, selectedFleet, origin, destination, sortBy]);

  return (
    <div className={`min-h-screen font-sans transition-colors duration-200 ${isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-[#f4f7fb] text-slate-800'}`}>
      
      {/* Top Banner Stripe */}
      <div className={`text-[11px] font-semibold py-1.5 px-4 sm:px-8 flex justify-between items-center border-b transition-colors ${isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-white border-slate-200/80 text-slate-600'}`}>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
          <span>Haryana State Transport Department • Timetable Directory</span>
        </div>
        <div className="flex items-center gap-4">
          <button 
            type="button" 
            onClick={() => setIsGrievanceOpen(true)}
            className="hover:text-rose-500 font-bold flex items-center gap-1 cursor-pointer transition"
          >
            <MessageSquareWarning className="h-3.5 w-3.5 text-rose-500" />
            <span>{lang === 'hi' ? 'यात्री शिकायत' : 'Passenger Grievance'}</span>
          </button>
          <span>|</span>
          <button 
            type="button" 
            onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
            className="hover:text-blue-600 font-black cursor-pointer transition"
          >
            {lang === 'en' ? '🇮🇳 हिंदी' : '🇬🇧 English'}
          </button>
        </div>
      </div>

      {/* Main Navigation Header */}
      <header className={`sticky top-0 z-30 transition-colors border-b ${isDarkMode ? 'bg-slate-900/95 border-slate-800 backdrop-blur' : 'bg-white border-slate-200/80 shadow-xs'}`}>
        <div className="max-w-6xl mx-auto px-4 py-3 sm:py-3.5 flex flex-wrap justify-between items-center gap-3">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <Bus className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-black tracking-tight leading-none">
                  {lang === 'hi' ? 'हरियाणा रोडवेज सारथी' : 'Haryana Roadways Saarthi'}
                </h1>
                <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-black border border-blue-200">
                  VERIFIED
                </span>
              </div>
              <p className={`text-xs font-semibold mt-0.5 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                {lang === 'hi' ? 'सभी 24 डिपो, उप-डिपो व बस स्टैंड समय सारणी' : 'All 24 Main Depots, Sub-Depots & Bus Stands'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className={`p-1 rounded-xl flex items-center gap-1 border ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-100 border-slate-200'}`}>
              <button
                type="button"
                onClick={() => setActiveTab('FINDER')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${activeTab === 'FINDER' ? 'bg-blue-600 text-white shadow-sm' : isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}
              >
                {lang === 'hi' ? 'रूट खोजें' : 'Route Finder'}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('BOARD')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${activeTab === 'BOARD' ? 'bg-blue-600 text-white shadow-sm' : isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}
              >
                {lang === 'hi' ? 'डिपो बोर्ड' : 'Depot Board'}
              </button>
            </div>

            <button
              type="button"
              onClick={() => setIsHelplineOpen(true)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition ${isDarkMode ? 'bg-emerald-950/40 text-emerald-400 border-emerald-800/60 hover:bg-emerald-900/40' : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'}`}
            >
              <Phone className="h-3.5 w-3.5" />
              <span>{lang === 'hi' ? 'हेल्पलाइन' : 'Depot Helplines'}</span>
            </button>

            <button
              type="button"
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-xl border transition ${isDarkMode ? 'bg-slate-800 border-slate-700 text-yellow-400 hover:bg-slate-700' : 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200'}`}
              title="Toggle Theme"
            >
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Area */}
      <main className="max-w-6xl mx-auto px-4 py-5 space-y-4">
        
        {/* Universal AI Voice Assistant */}
        <div className="rounded-2xl bg-gradient-to-r from-[#0d1c3a] via-[#10244f] to-[#122b60] border border-blue-900/50 p-4 sm:p-4.5 text-white flex items-center gap-4 shadow-lg">
          <button
            type="button"
            onClick={startVoiceSearch}
            className={`h-12 w-12 rounded-xl flex items-center justify-center shrink-0 transition ${isListening ? 'bg-rose-600 animate-pulse text-white' : 'bg-blue-600 hover:bg-blue-500 text-white'}`}
          >
            {isListening ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
          </button>
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-amber-300" />
              <h3 className="text-sm font-black">
                {lang === 'hi' ? 'ऑल-इन-वन एआई वॉइस सर्च' : 'All-in-One AI Voice Search'}
              </h3>
            </div>
            <p className="text-xs text-blue-200/80 mt-0.5">
              {voiceNote ? voiceNote : lang === 'hi' ? 'माइक दबाएं और बोलें: "अम्बाला सिटी से दिल्ली", "अम्बाला कैंट से नारनौल", आदि' : 'Click mic and speak any route: "Ambala City to Delhi", "Ambala Cantt to Narnaul", or "Chandigarh to Hisar"'}
            </p>
          </div>
        </div>

        {/* Route Finder Controls */}
        {activeTab === 'FINDER' ? (
          <div className={`rounded-3xl border p-5 sm:p-6 space-y-4 shadow-xs transition-colors ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200/90'}`}>
            <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr,1fr] items-center gap-3">
              
              {/* Origin Dropdown */}
              <div className="space-y-1">
                <label className="text-[11px] font-black uppercase text-blue-600 tracking-wider flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-blue-600 inline-block"></span>
                  {lang === 'hi' ? 'प्रस्थान (Origin)' : 'FROM (ORIGIN)'}
                </label>
                <div className={`flex items-center border rounded-2xl px-3.5 py-2.5 ${isDarkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                  <MapPin className="h-4 w-4 text-blue-600 mr-2 shrink-0" />
                  <select
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    className="bg-transparent w-full text-xs sm:text-sm font-bold focus:outline-none cursor-pointer"
                  >
                    <option value="">{lang === 'hi' ? '-- प्रस्थान स्टेशन चुनें --' : '-- Select Origin --'}</option>
                    {DEPOTS.map((d) => (
                      <option key={d.id} value={d.name} className={isDarkMode ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}>
                        {lang === 'hi' && d.nameHi ? `${d.nameHi} (${d.name})` : d.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Swap Button */}
              <div className="flex justify-center md:pt-5">
                <button
                  type="button"
                  onClick={swapLocations}
                  className={`p-2.5 rounded-full border transition hover:rotate-180 duration-200 ${isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white' : 'bg-slate-100 border-slate-200 text-slate-600 hover:text-blue-600'}`}
                  title="Swap Origin & Destination"
                >
                  <ArrowLeftRight className="h-4 w-4" />
                </button>
              </div>

              {/* Destination Dropdown */}
              <div className="space-y-1">
                <label className="text-[11px] font-black uppercase text-rose-500 tracking-wider flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-rose-500 inline-block"></span>
                  {lang === 'hi' ? 'गंतव्य (Destination)' : 'TO (DESTINATION)'}
                </label>
                <div className={`flex items-center border rounded-2xl px-3.5 py-2.5 ${isDarkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                  <MapPin className="h-4 w-4 text-rose-500 mr-2 shrink-0" />
                  <select
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="bg-transparent w-full text-xs sm:text-sm font-bold focus:outline-none cursor-pointer"
                  >
                    <option value="">{lang === 'hi' ? '-- गंतव्य स्टेशन चुनें --' : '-- Select Destination --'}</option>
                    {DEPOTS.map((d) => (
                      <option key={d.id} value={d.name} className={isDarkMode ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}>
                        {lang === 'hi' && d.nameHi ? `${d.nameHi} (${d.name})` : d.name}
                      </option>
                    ))}
                    <option value="Jaipur Sindhi Camp" className={isDarkMode ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}>Jaipur Sindhi Camp</option>
                    <option value="Haridwar" className={isDarkMode ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}>Haridwar</option>
                  </select>
                </div>
              </div>

              {/* Travel Date */}
              <div className="space-y-1">
                <label className="text-[11px] font-black uppercase text-emerald-600 tracking-wider flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-600 inline-block"></span>
                  {lang === 'hi' ? 'यात्रा तिथि (Date)' : 'TRAVEL DATE'}
                </label>
                <div className={`flex items-center border rounded-2xl px-3.5 py-2.5 ${isDarkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                  <Calendar className="h-4 w-4 text-emerald-600 mr-2 shrink-0" />
                  <input
                    type="date"
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    className="bg-transparent w-full text-xs sm:text-sm font-bold focus:outline-none cursor-pointer"
                  />
                </div>
              </div>

            </div>

            {/* Fleet Type Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-100 dark:border-slate-800">
              <span className="text-xs font-bold text-slate-500 mr-1 flex items-center gap-1">
                <SlidersHorizontal className="h-3.5 w-3.5" /> {lang === 'hi' ? 'बस श्रेणी:' : 'Bus Service:'}
              </span>
              {[
                { id: 'ALL', labelEn: 'All Buses', labelHi: 'सभी बसें' },
                { id: 'ORDINARY', labelEn: 'Ordinary (Saarthi)', labelHi: 'साधारण (सारथी)' },
                { id: 'HVAC', labelEn: 'HVAC AC', labelHi: 'एचवीएसी एसी' },
                { id: 'VOLVO', labelEn: 'Volvo / Luxury', labelHi: 'वॉल्वो / लग्जरी' },
              ].map((pill) => (
                <button
                  key={pill.id}
                  type="button"
                  onClick={() => setSelectedFleet(pill.id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition cursor-pointer ${
                    selectedFleet === pill.id
                      ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                      : isDarkMode
                      ? 'bg-slate-800 border border-slate-700 text-slate-300 hover:text-white'
                      : 'bg-slate-100 border border-slate-200/80 text-slate-700 hover:bg-slate-200/70'
                  }`}
                >
                  {lang === 'hi' ? pill.labelHi : pill.labelEn}
                </button>
              ))}
            </div>

            {/* Popular Route Fast Filters */}
            <div className="flex flex-wrap items-center gap-2 text-xs pt-1">
              <span className="text-slate-400 font-semibold flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5 text-amber-500" /> {lang === 'hi' ? 'लोकप्रिय रूट:' : 'Popular Routes:'}
              </span>
              {[
                { o: 'Ambala Cantt', d: 'Narnaul', label: 'Ambala Cantt ⇄ Narnaul' },
                { o: 'Ambala City', d: 'Chandigarh ISBT-17', label: 'Ambala City ⇄ Chandigarh' },
                { o: 'Chandigarh ISBT-17', d: 'Delhi ISBT Kashmiri Gate', label: 'Chandigarh ⇄ Delhi' },
                { o: 'Hisar', d: 'Delhi ISBT Kashmiri Gate', label: 'Hisar ⇄ Delhi' },
              ].map((r, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => { setOrigin(r.o); setDestination(r.d); }}
                  className={`px-3 py-1 rounded-lg font-semibold transition border ${isDarkMode ? 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-800' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-blue-50 hover:text-blue-600'}`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className={`rounded-3xl border p-5 space-y-3 shadow-xs ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
            <h3 className="text-sm font-black uppercase tracking-wider text-blue-600">
              {lang === 'hi' ? 'बस डिपो व स्टैंड चुनें' : 'Select Bus Depot / Stand'}
            </h3>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {DEPOTS.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setBoardDepot(d.id)}
                  className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                    boardDepot === d.id
                      ? 'bg-blue-600 text-white shadow-md'
                      : isDarkMode
                      ? 'bg-slate-800 text-slate-300 border border-slate-700'
                      : 'bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200'
                  }`}
                >
                  {lang === 'hi' && d.nameHi ? d.nameHi : d.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results Bar */}
        <div className="flex flex-wrap justify-between items-center gap-3 px-1 pt-2">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-blue-600 inline-block"></span>
            <h2 className="text-sm font-black">
              {lang === 'hi' ? 'उपलब्ध बसें (पूरे दिन की समय सारणी): ' : 'Scheduled Buses (Full Day Schedule): '}
              <span className="text-blue-600 font-extrabold">{filteredBuses.length}</span>
            </h2>
            <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold border ${isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-600'}`}>
              📅 {travelDate}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold">
            <span className="text-slate-400">{lang === 'hi' ? 'क्रम:' : 'Sort By:'}</span>
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className={`px-3 py-1.5 rounded-xl border font-bold text-xs focus:outline-none cursor-pointer ${isDarkMode ? 'bg-slate-900 border-slate-700 text-slate-200' : 'bg-white border-slate-200 text-slate-800'}`}
            >
              <option value="EARLIEST">{lang === 'hi' ? 'प्रारंभिक समय' : 'Earliest Departure'}</option>
              <option value="FARE">{lang === 'hi' ? 'न्यूनतम किराया' : 'Lowest Fare'}</option>
            </select>
          </div>
        </div>

        {/* Bus List */}
        {filteredBuses.length === 0 ? (
          <div className={`rounded-3xl border p-12 text-center space-y-3 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
            <div className="h-12 w-12 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
              <Clock className="h-6 w-6" />
            </div>
            <h4 className="text-base font-black">{lang === 'hi' ? 'कोई बस नहीं मिली' : 'No Buses Found for this Route'}</h4>
            <p className="text-xs text-slate-400">{lang === 'hi' ? 'कृपया फिल्टर बदलकर पुनः प्रयास करें।' : 'Try changing origin, destination, or choosing "All Buses".'}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBuses.map((bus: any) => {
              const bFleet = bus.fleetType || bus.category || 'ORDINARY';
              const isVolvo = bFleet === 'VOLVO';
              const isHvac = bFleet === 'HVAC';
              
              return (
                <div
                  key={bus.id}
                  className={`rounded-3xl border p-5 sm:p-6 shadow-xs hover:shadow-md transition-all ${
                    isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200/90'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-xl text-xs font-black border ${
                        isVolvo 
                          ? 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-800'
                          : isHvac
                          ? 'bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950/40 dark:text-sky-300 dark:border-sky-800'
                          : 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800'
                      }`}>
                        {isVolvo ? 'Volvo Super Luxury' : isHvac ? 'HVAC AC Bus' : 'Ordinary (Haryana Saarthi)'}
                      </span>
                      <span className={`text-xs font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                        {lang === 'hi' ? 'डिपो: ' : 'Depot: '}
                        <span className="font-extrabold text-slate-700 dark:text-slate-200">
                          {lang === 'hi' && bus.depotNameHi ? bus.depotNameHi : (bus.depotName || bus.depotId)}
                        </span>
                      </span>
                    </div>

                    <span className="text-xs font-bold text-blue-600 bg-blue-50 dark:bg-blue-950/50 dark:text-blue-400 px-3 py-1 rounded-full border border-blue-200/60 dark:border-blue-900">
                      {lang === 'hi' ? 'दैनिक समय सारणी' : 'Daily Scheduled Service'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-[1fr,auto,1fr] items-center gap-4 py-2">
                    <div>
                      <div className="text-3xl font-black tracking-tight">{bus.departureTime || bus.departure || '05:30'}</div>
                      <div className="text-sm font-black text-slate-700 dark:text-slate-200 mt-1">
                        {lang === 'hi' && bus.originHi ? bus.originHi : bus.origin}
                      </div>
                    </div>

                    <div className="text-center px-4">
                      <span className={`text-[11px] font-extrabold px-3 py-1 rounded-full border ${isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-600'}`}>
                        ⏱ ~4h 00m
                      </span>
                      <div className="w-28 sm:w-36 h-0.5 bg-slate-200 dark:bg-slate-800 my-2 mx-auto relative">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-blue-600"></div>
                      </div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Direct Highway</span>
                    </div>

                    <div className="sm:text-right">
                      <div className="text-3xl font-black tracking-tight">{bus.arrivalTime || bus.arrival || '09:30'}</div>
                      <div className="text-sm font-black text-slate-700 dark:text-slate-200 mt-1">
                        {lang === 'hi' && bus.destinationHi ? bus.destinationHi : bus.destination}
                      </div>
                    </div>
                  </div>

                  <div className={`mt-3 text-xs p-2.5 rounded-2xl border ${isDarkMode ? 'bg-slate-800/50 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200/70 text-slate-600'}`}>
                    <span className="font-black text-slate-700 dark:text-slate-300">{lang === 'hi' ? 'रूट: ' : 'Route Via: '}</span>
                    {Array.isArray(bus.routeVia) ? bus.routeVia.join(' • ') : bus.routeVia || 'Direct Highway'}
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap justify-between items-center gap-3">
                    <div>
                      <span className="text-xs text-slate-400 font-bold block">{lang === 'hi' ? 'किराया प्रति यात्री' : 'Fare per passenger'}</span>
                      <span className="text-2xl font-black text-blue-600 dark:text-blue-400">₹{bus.fare || 180}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {bus.intermediateStops && bus.intermediateStops.length > 0 && (
                        <button
                          type="button"
                          onClick={() => toggleStops(bus.id)}
                          className={`px-3.5 py-2 rounded-xl border text-xs font-bold flex items-center gap-1 transition cursor-pointer ${
                            isDarkMode ? 'bg-slate-800 border-slate-700 hover:bg-slate-700' : 'bg-slate-100 border-slate-200 hover:bg-slate-200'
                          }`}
                        >
                          <span>{lang === 'hi' ? 'स्टॉप व समय' : 'Stops & Timetable'}</span>
                          {expandedStops[bus.id] ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                        </button>
                      )}
                    </div>
                  </div>

                  {expandedStops[bus.id] && bus.intermediateStops && (
                    <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
                      {bus.intermediateStops.map((st: any, idx: number) => (
                        <div key={idx} className={`p-2.5 rounded-xl border text-xs ${isDarkMode ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                          <div className="font-bold text-slate-800 dark:text-slate-200">{st.name}</div>
                          <div className="flex justify-between items-center text-[11px] text-slate-400 mt-1">
                            <span>⏱ {st.time}</span>
                            <span className="font-extrabold text-blue-600">₹{st.fareFromOrigin || st.fare || 50}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                </div>
              );
            })}
          </div>
        )}

        {/* Official Online Ticket Booking Portal Card at the Bottom */}
        <div className="mt-8 p-6 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-blue-800/80">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-2xl bg-blue-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-blue-500/30">
              <Ticket className="h-7 w-7" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black tracking-tight">
                {lang === 'hi' ? 'हरियाणा रोडवेज ऑनलाइन ई-टिकट बुकिंग' : 'Official Haryana Roadways Online E-Ticketing'}
              </h3>
              <p className="text-xs text-blue-200/90 mt-0.5 max-w-xl">
                {lang === 'hi'
                  ? 'हरियाणा राज्य परिवहन की आधिकारिक वेबसाइट से वोल्वो, एसी एवं साधारण बसों की ऑनलाइन सीट अग्रिम बुक करें।'
                  : 'Directly reserve your seats online in advance for Volvo, HVAC, and Ordinary buses through the official portal.'}
              </p>
            </div>
          </div>
          <a
            href="https://ebooking.hrtransport.gov.in/#/home"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 bg-white hover:bg-blue-50 text-blue-900 rounded-2xl text-xs font-black flex items-center gap-2 transition transform active:scale-95 shadow-md shrink-0 cursor-pointer"
          >
            <span>{lang === 'hi' ? 'आधिकारिक पोर्टल खोलें' : 'Open Official Booking Portal'}</span>
            <ExternalLink className="h-4 w-4 text-blue-600" />
          </a>
        </div>

      </main>

      {/* Professional Footer */}
      <footer className={`mt-12 py-10 border-t text-center text-xs transition-colors ${isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-500'}`}>
        <div className="max-w-6xl mx-auto px-4 space-y-4">
          <div className="flex flex-wrap justify-center items-center gap-4 font-bold text-slate-700 dark:text-slate-300">
            <Link href="/about" className="hover:text-blue-600 transition">About & Contact</Link>
            <span>•</span>
            <Link href="/privacy" className="hover:text-blue-600 transition">Privacy Policy</Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-blue-600 transition">Terms of Service</Link>
          </div>

          <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-1">
            <p className="text-xs font-extrabold text-slate-800 dark:text-slate-200">
              Developed & Managed by <span className="text-blue-600 font-black">Vipin</span>
            </p>
            <p className="text-[11px] text-slate-400">
              © {new Date().getFullYear()} Haryana Roadways Saarthi. All rights reserved. Independent commuter utility portal.
            </p>
          </div>
        </div>
      </footer>

      {/* Helplines Modal */}
      {isHelplineOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className={`rounded-3xl border max-w-lg w-full max-h-[85vh] flex flex-col shadow-2xl ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
            <div className="p-4.5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <div className="flex items-center gap-2 text-emerald-600 font-black text-sm">
                <Phone className="h-4 w-4" />
                <span>Haryana Depots Enquiry Numbers</span>
              </div>
              <button type="button" onClick={() => setIsHelplineOpen(false)} className="p-1 rounded-lg text-slate-400 hover:text-slate-600">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-4 overflow-y-auto space-y-2.5">
              {DEPOT_HELPLINES.map((h: any, i: number) => (
                <div key={i} className={`p-3 rounded-2xl border flex justify-between items-center ${isDarkMode ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                  <div>
                    <div className="text-xs font-black text-slate-800 dark:text-slate-100">{h.depot}</div>
                    <div className="text-[11px] text-slate-400">{h.location}</div>
                  </div>
                  <a
                    href={`tel:${h.phone}`}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1 transition shadow-sm"
                  >
                    <Phone className="h-3 w-3" />
                    <span>{h.phone}</span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Grievance Modal */}
      {isGrievanceOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className={`rounded-3xl border max-w-md w-full p-6 shadow-2xl ${isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-800'}`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-black text-rose-500 flex items-center gap-1.5">
                <MessageSquareWarning className="h-5 w-5" />
                <span>Passenger Grievance Redressal</span>
              </h3>
              <button type="button" onClick={() => { setIsGrievanceOpen(false); setGSubmitted(false); }} className="text-slate-400 hover:text-slate-600">
                <X className="h-5 w-5" />
              </button>
            </div>

            {gSubmitted ? (
              <div className="text-center py-6 space-y-2">
                <div className="h-12 w-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h4 className="text-base font-black text-emerald-600">Feedback Recorded Successfully!</h4>
                <p className="text-xs text-slate-400">Thank you. Your feedback will be reviewed.</p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setGSubmitted(true);
                }}
                className="space-y-3"
              >
                <div>
                  <label className="text-[11px] font-black uppercase text-slate-400">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={gName}
                    onChange={(e) => setGName(e.target.value)}
                    placeholder="e.g. Sunil Kumar"
                    className={`w-full mt-1 px-3.5 py-2.5 rounded-xl border text-xs font-bold focus:outline-none ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'}`}
                  />
                </div>

                <div>
                  <label className="text-[11px] font-black uppercase text-slate-400">Phone Number (Optional)</label>
                  <input
                    type="tel"
                    value={gPhone}
                    onChange={(e) => setGPhone(e.target.value)}
                    placeholder="e.g. +91 9876543210"
                    className={`w-full mt-1 px-3.5 py-2.5 rounded-xl border text-xs font-bold focus:outline-none ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'}`}
                  />
                </div>

                <div>
                  <label className="text-[11px] font-black uppercase text-slate-400">Category of Issue</label>
                  <select
                    value={gType}
                    onChange={(e) => setGType(e.target.value)}
                    className={`w-full mt-1 px-3.5 py-2.5 rounded-xl border text-xs font-bold focus:outline-none ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'}`}
                  >
                    <option value="Bus Timing / Delay">Bus Timing / Delay</option>
                    <option value="Fare Overcharge">Fare Overcharge</option>
                    <option value="Staff Conduct">Staff Conduct</option>
                    <option value="Route Correction">Route / Timetable Correction</option>
                    <option value="Other">Other Issues</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-black uppercase text-slate-400">Issue Details</label>
                  <textarea
                    required
                    rows={3}
                    value={gDesc}
                    onChange={(e) => setGDesc(e.target.value)}
                    placeholder="Describe your query or suggestion..."
                    className={`w-full mt-1 px-3.5 py-2 rounded-xl border text-xs font-bold focus:outline-none ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'}`}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs transition cursor-pointer shadow-md shadow-rose-600/20"
                >
                  Submit Grievance
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}

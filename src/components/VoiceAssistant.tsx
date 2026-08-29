'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, Sparkles, MessageSquareQuote } from 'lucide-react';
import { CITIES } from '../data/busData';
import { BusSchedule, Language } from '../types/bus';

interface VoiceAssistantProps {
  lang: Language;
  onVoiceSearch: (origin: string, destination: string, category?: string) => void;
  filteredBuses: BusSchedule[];
  origin: string;
  destination: string;
}

export const VoiceAssistant: React.FC<VoiceAssistantProps> = ({
  lang,
  onVoiceSearch,
  filteredBuses,
  origin,
  destination
}) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [assistantReply, setAssistantReply] = useState('');
  const [supported, setSupported] = useState(true);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = lang === 'hi' ? 'hi-IN' : 'en-IN';

    recognition.onstart = () => {
      setIsListening(true);
      setAssistantReply(
        lang === 'hi' 
          ? 'जी, मैं सुन रहा हूँ... आप रूट, किराया या पहली/आखिरी बस के बारे में पूछ सकते हैं।' 
          : 'Listening... You can ask for a route, cheapest fare, or first/last bus.'
      );
    };

    recognition.onresult = (event: any) => {
      const speechText = event.results[0][0].transcript;
      setTranscript(speechText);
      handleConversationalQuery(speechText);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
      setAssistantReply(lang === 'hi' ? 'आवाज़ साफ़ नहीं आई, कृपया दोबारा बोलें।' : 'Could not hear properly. Please speak again.');
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
  }, [lang, filteredBuses, origin, destination]);

  const speak = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === 'hi' ? 'hi-IN' : 'en-IN';
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleConversationalQuery = (input: string) => {
    const text = input.toLowerCase();

    // 1. Rebuttal Question: "Pehli bus kitne baje hai?" / "First bus timing?"
    if (text.includes('pehli') || text.includes('first') || text.includes('earliest') || text.includes('sabse pehle') || text.includes('पहली')) {
      if (filteredBuses.length > 0) {
        const sorted = [...filteredBuses].sort((a, b) => a.departureTime.localeCompare(b.departureTime));
        const first = sorted[0];
        const reply = lang === 'hi'
          ? `पहली बस सुबह ${first.departureTime} बजे है, जो कि ${first.category} श्रेणी की है और इसका किराया ₹${first.fare} है।`
          : `The earliest bus is at ${first.departureTime}, operated as ${first.category} with a fare of ₹${first.fare}.`;
        setAssistantReply(reply);
        speak(reply);
        return;
      }
    }

    // 2. Rebuttal Question: "Aakhri bus kab hai?" / "Last bus timing?"
    if (text.includes('aakhri') || text.includes('last') || text.includes('raat') || text.includes('sabse late') || text.includes('आखिरी') || text.includes('अंतिम')) {
      if (filteredBuses.length > 0) {
        const sorted = [...filteredBuses].sort((a, b) => b.departureTime.localeCompare(a.departureTime));
        const last = sorted[0];
        const reply = lang === 'hi'
          ? `इस रूट पर आखिरी बस ${last.departureTime} बजे प्रस्थान करती है, जिसका किराया ₹${last.fare} है।`
          : `The last scheduled departure on this route is at ${last.departureTime} with fare ₹${last.fare}.`;
        setAssistantReply(reply);
        speak(reply);
        return;
      }
    }

    // 3. Rebuttal Question: "Kiraya kitna hai?" / "Fare / Ticket price?"
    if (text.includes('kiraya') || text.includes('fare') || text.includes('ticket') || text.includes('paisa') || text.includes('rate') || text.includes('किराया')) {
      if (filteredBuses.length > 0) {
        const fares = filteredBuses.map(b => b.fare);
        const minFare = Math.min(...fares);
        const maxFare = Math.max(...fares);
        const reply = lang === 'hi'
          ? `साधारण बस का न्यूनतम किराया ₹${minFare} है और वॉल्वो एसी का अधिकतम किराया ₹${maxFare} तक है।`
          : `Fares start from ₹${minFare} for Ordinary buses and go up to ₹${maxFare} for Volvo AC services.`;
        setAssistantReply(reply);
        speak(reply);
        return;
      }
    }

    // 4. Rebuttal Question: "Volvo bus hai kya?" / "AC buses available?"
    if (text.includes('volvo') || text.includes('ac') || text.includes('hvac') || text.includes('वॉल्वो') || text.includes('एसी')) {
      const luxuryBuses = filteredBuses.filter(b => b.category === 'VOLVO' || b.category === 'HVAC');
      if (luxuryBuses.length > 0) {
        const timings = luxuryBuses.map(b => b.departureTime).join(', ');
        const reply = lang === 'hi'
          ? `हाँजी, इस रूट पर एसी बसें उपलब्ध हैं। इनके समय हैं: ${timings}।`
          : `Yes, AC and Volvo buses are available at: ${timings}.`;
        setAssistantReply(reply);
        speak(reply);
        return;
      } else {
        const reply = lang === 'hi'
          ? 'माफ़ कीजिए, इस रूट पर केवल साधारण (सारथी) बसें ही उपलब्ध हैं।'
          : 'Sorry, only Ordinary Saarthi buses run on this direct section.';
        setAssistantReply(reply);
        speak(reply);
        return;
      }
    }

    // 5. New Search Request (e.g., "Ambala se Narnaul ki bus dikhao")
    let detectedOrigin = '';
    let detectedDestination = '';

    const matchedCities = CITIES.filter(c => 
      text.includes(c.en.toLowerCase()) || 
      text.includes(c.hi) ||
      text.includes(c.en.split(' ')[0].toLowerCase())
    );

    if (matchedCities.length >= 2) {
      detectedOrigin = matchedCities[0].en;
      detectedDestination = matchedCities[1].en;
    } else if (text.includes('to') || text.includes('se') || text.includes('से')) {
      const parts = text.split(/\bto\b|\bse\b|से/);
      if (parts.length >= 2) {
        const rawO = parts[0].trim();
        const rawD = parts[1].trim();
        const m1 = CITIES.find(c => rawO.includes(c.en.toLowerCase()) || rawO.includes(c.hi));
        const m2 = CITIES.find(c => rawD.includes(c.en.toLowerCase()) || rawD.includes(c.hi));
        if (m1) detectedOrigin = m1.en;
        if (m2) detectedDestination = m2.en;
      }
    }

    if (detectedOrigin && detectedDestination) {
      onVoiceSearch(detectedOrigin, detectedDestination);
      const reply = lang === 'hi'
        ? `ओके, तो ${detectedOrigin} से ${detectedDestination} तक की सभी बसें ये रही। पहली बस सुबह जल्दी और आखिरी बस रात तक उपलब्ध है।`
        : `Okay, searching all scheduled buses from ${detectedOrigin} to ${detectedDestination}. Here is the complete list.`;
      setAssistantReply(reply);
      speak(reply);
    } else {
      const reply = lang === 'hi'
        ? `स्थान समझ नहीं आया। आप बोल सकते हैं "अंबाला से नारनौल" या "पहली बस कब है?"`
        : `Could not identify the route. Try saying "Ambala City to Narnaul" or ask "When is the next bus?".`;
      setAssistantReply(reply);
      speak(reply);
    }
  };

  const toggleListening = () => {
    if (!supported || !recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      try {
        recognitionRef.current.lang = lang === 'hi' ? 'hi-IN' : 'en-IN';
        recognitionRef.current.start();
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (!supported) return null;

  return (
    <div className="bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-5 shadow-2xl border border-blue-500/40 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-4 w-full">
        <button
          onClick={toggleListening}
          className={`relative p-4 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-xl shrink-0 ${
            isListening
              ? 'bg-rose-600 text-white animate-pulse ring-4 ring-rose-500/50 scale-105'
              : 'bg-blue-600 hover:bg-blue-500 text-white'
          }`}
          title="Voice Assistant"
        >
          {isListening ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
          {isListening && (
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-rose-500"></span>
            </span>
          )}
        </button>

        <div className="flex-1">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-amber-400" />
            <h3 className="font-black text-sm sm:text-base tracking-tight">
              {lang === 'hi' ? 'AI वॉयस साथी (बातचीत करें)' : 'Interactive AI Voice Assistant'}
            </h3>
          </div>

          <p className="text-xs text-blue-200 mt-1 leading-relaxed">
            {assistantReply || (lang === 'hi'
              ? 'माइक दबाकर पूछें: "अंबाला सिटी से नारनौल", "पहली बस कब है?", या "किराया कितना है?"'
              : 'Click mic & ask: "Ambala to Narnaul", "When is the first bus?", or "What is the fare?"')}
          </p>

          {transcript && (
            <p className="text-[11px] text-amber-300 font-mono mt-1 flex items-center gap-1">
              <MessageSquareQuote className="h-3 w-3 inline" /> &ldquo;{transcript}&rdquo;
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
'use client';

import React, { useState } from 'react';
import { BUS_DATA, CITIES } from '../data/busData';
import { Clock, MapPin } from 'lucide-react';
import { Language } from '../types/bus';

export const DepotTimetable: React.FC<{ lang: Language }> = ({ lang }) => {
  const [selectedDepot, setSelectedDepot] = useState('Ambala Cantt');

  const filteredBuses = BUS_DATA.filter((b) =>
    b.originEn.toLowerCase().includes(selectedDepot.toLowerCase().split(' ')[0]) ||
    b.depotEn.toLowerCase() === selectedDepot.toLowerCase().split(' ')[0]
  );

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-black text-slate-900 dark:text-white">
            {lang === 'hi' ? 'डिपो प्रस्थान बोर्ड' : 'Depot Outgoing Board'}
          </h2>
          <p className="text-xs text-slate-500">
            {lang === 'hi' ? 'हरियाणा रोडवेज बस स्टैंड से सभी निर्धारित प्रस्थान' : 'Live scheduled departures from state transport bus stands'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-blue-600" />
          <select
            value={selectedDepot}
            onChange={(e) => setSelectedDepot(e.target.value)}
            className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-sm font-bold text-slate-900 dark:text-white focus:outline-none"
          >
            {CITIES.map((c) => (
              <option key={`depot-sel-${c.en}`} value={c.en}>
                {lang === 'hi' ? c.hi : c.en}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-400 uppercase">
              <th className="pb-3">{lang === 'hi' ? 'प्रस्थान समय' : 'Departure'}</th>
              <th className="pb-3">{lang === 'hi' ? 'गंतव्य' : 'Destination'}</th>
              <th className="pb-3">{lang === 'hi' ? 'श्रेणी' : 'Category'}</th>
              <th className="pb-3">{lang === 'hi' ? 'किराया' : 'Fare'}</th>
              <th className="pb-3 text-right">{lang === 'hi' ? 'बस नं.' : 'Bus No.'}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {filteredBuses.length > 0 ? (
              filteredBuses.map((bus) => (
                <tr key={bus.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="py-3 font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-blue-600" /> {bus.departureTime}
                  </td>
                  <td className="py-3 font-bold text-slate-800 dark:text-slate-200">
                    {lang === 'hi' ? bus.destinationHi : bus.destinationEn}
                  </td>
                  <td className="py-3">
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      bus.category === 'VOLVO' ? 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300' :
                      bus.category === 'HVAC' ? 'bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300' :
                      'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                    }`}>
                      {bus.category}
                    </span>
                  </td>
                  <td className="py-3 font-bold text-slate-700 dark:text-slate-300">₹{bus.fare}</td>
                  <td className="py-3 text-right font-mono text-xs text-slate-400">{bus.busNumber}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-8 text-center text-slate-400 font-medium">
                  {lang === 'hi' ? 'इस डिपो के लिए कोई प्रस्थान नहीं मिला।' : 'No immediate outgoing schedules found for this depot selection.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
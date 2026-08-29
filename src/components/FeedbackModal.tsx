'use client';

import React, { useState } from 'react';
import { MessageSquareWarning, X, Send, CheckCircle2, User, Phone } from 'lucide-react';
import { Language } from '../types/bus';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose, lang }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('INCORRECT_TIME');
  const [otherCategory, setOtherCategory] = useState('');
  const [details, setDetails] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const finalCategory = category === 'OTHER' ? (otherCategory || 'Other Issue') : category;
    const subject = encodeURIComponent(`[Haryana Roadways Grievance] - ${finalCategory}`);
    const body = encodeURIComponent(
      `Name: ${name}\n` +
      `Contact Number: ${phone || 'Not Provided'}\n` +
      `Category: ${finalCategory}\n\n` +
      `Details:\n${details}\n\n` +
      `Submitted via Haryana Roadways Timetable Portal`
    );

    window.location.href = `mailto:capturecine07@gmail.com?subject=${subject}&body=${body}`;

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setPhone('');
      setCategory('INCORRECT_TIME');
      setOtherCategory('');
      setDetails('');
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl relative">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white transition hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <X className="h-5 w-5" />
        </button>

        {submitted ? (
          <div className="py-12 text-center space-y-3">
            <div className="h-16 w-16 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white">
              {lang === 'hi' ? 'शिकायत दर्ज हुई' : 'Grievance Submitted'}
            </h3>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-11 w-11 rounded-2xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 flex items-center justify-center border border-rose-200 dark:border-rose-900">
                <MessageSquareWarning className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tight">
                  {lang === 'hi' ? 'शिकायत निवारण फॉर्म' : 'Grievance Redressal Form'}
                </h3>
                <p className="text-xs text-slate-500">
                  {lang === 'hi' 
                    ? 'कृपया नीचे दिए गए विवरण को भरें' 
                    : 'Please fill out the form below'}
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-black text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1 block">
                    {lang === 'hi' ? 'नाम *' : 'Name *'}
                  </label>
                  <div className="flex items-center bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2">
                    <User className="h-4 w-4 text-slate-400 mr-2 shrink-0" />
                    <input
                      type="text"
                      required
                      placeholder={lang === 'hi' ? 'उदा: राहुल' : 'e.g. Rahul Sharma'}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-transparent w-full text-xs font-bold text-slate-900 dark:text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-black text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1 block">
                    {lang === 'hi' ? 'फ़ोन नंबर (वैकल्पिक)' : 'Phone (Optional)'}
                  </label>
                  <div className="flex items-center bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2">
                    <Phone className="h-4 w-4 text-slate-400 mr-2 shrink-0" />
                    <input
                      type="tel"
                      placeholder={lang === 'hi' ? 'वैकल्पिक' : 'Optional'}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="bg-transparent w-full text-xs font-bold text-slate-900 dark:text-white focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-black text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1 block">
                  {lang === 'hi' ? 'श्रेणी चुनें *' : 'Select Category *'}
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white rounded-xl px-3.5 py-2.5 w-full focus:outline-none cursor-pointer"
                >
                  <option value="INCORRECT_TIME">
                    {lang === 'hi' ? 'गलत बस समय (Incorrect Bus Timings)' : 'Incorrect Bus Timings'}
                  </option>
                  <option value="MISSING_ROUTE">
                    {lang === 'hi' ? 'रूट या स्टॉप गायब है (Missing Route / Stop)' : 'Missing Route or Stop'}
                  </option>
                  <option value="FARE_ISSUE">
                    {lang === 'hi' ? 'किराया विसंगति (Incorrect Fare)' : 'Incorrect Fare'}
                  </option>
                  <option value="BUS_STAND_ISSUE">
                    {lang === 'hi' ? 'बस स्टैंड समस्या (Bus Stand Issue)' : 'Bus Stand Issue'}
                  </option>
                  <option value="OTHER">
                    {lang === 'hi' ? 'अन्य समस्या (Other)' : 'Other'}
                  </option>
                </select>
              </div>

              {category === 'OTHER' && (
                <div>
                  <label className="text-xs font-black text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1 block">
                    {lang === 'hi' ? 'अन्य श्रेणी का नाम *' : 'Specify Category *'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={lang === 'hi' ? 'अपनी श्रेणी का नाम लिखें' : 'Specify your category'}
                    value={otherCategory}
                    onChange={(e) => setOtherCategory(e.target.value)}
                    className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white rounded-xl px-3.5 py-2 w-full focus:outline-none"
                  />
                </div>
              )}

              <div>
                <label className="text-xs font-black text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1 block">
                  {lang === 'hi' ? 'विवरण *' : 'Details *'}
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder={
                    lang === 'hi'
                      ? 'कृपया समस्या का पूरा विवरण यहाँ लिखें...'
                      : 'Provide full details here...'
                  }
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-white rounded-xl p-3 w-full focus:outline-none focus:ring-2 focus:ring-rose-500 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-black text-sm tracking-wide shadow-lg shadow-rose-600/30 flex items-center justify-center gap-2 transition transform active:scale-95"
              >
                <Send className="h-4 w-4" />
                <span>{lang === 'hi' ? 'शिकायत दर्ज करें' : 'Submit Grievance'}</span>
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
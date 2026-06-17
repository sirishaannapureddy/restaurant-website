/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useRestaurantStore } from '../store/useRestaurantStore';
import { MapPin, Phone, Mail, Clock, Send, ShieldCheck, MessageSquare, Compass, MessageCircle } from 'lucide-react';

export default function Contact() {
  const { addToast, theme } = useRestaurantStore();
  const isDark = theme === 'dark';

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Inquiry: Seating Options');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setSubmitted(true);
    addToast('Your elegant message is wired to our hospitality director!', 'success');
  };

  return (
    <div className={`pt-4 pb-12 ${isDark ? 'bg-neutral-950 text-white' : 'bg-white text-neutral-900'}`} id="contact-page-container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-mono text-[9px] tracking-widest uppercase text-gold-400 font-extrabold block mb-1">
            Stay Linked
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold uppercase tracking-tight">
            Contact Salon
          </h1>
          <p className={`text-xs mt-3 ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>
            Acquire private bookings, ask allergen details or coordinate high-society banquet programs.
          </p>
        </div>

        {/* Dual Column Layout: Form vs Timings & Map Mock */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch mb-16">
          
          {/* Left Column: Form (5 Cols) */}
          <div className="lg:col-span-12 xl:col-span-5 h-full">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="contact-form"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  onSubmit={handleSubmit}
                  className={`p-8 rounded-3xl border flex flex-col justify-between h-full space-y-6 ${
                    isDark ? 'bg-neutral-900/40 border-neutral-900' : 'bg-neutral-50 border-neutral-200 shadow-md'
                  }`}
                  id="concierge-contact-form"
                >
                  <div className="space-y-6">
                    <h3 className="font-serif text-2xl font-bold text-white dark:text-white light:text-neutral-900">
                      Wired Concierge Request
                    </h3>
                    
                    <div className="space-y-4 font-sans text-xs">
                      <div>
                        <span className="font-mono text-[9px] uppercase tracking-wider text-neutral-400 block mb-1.5">Full Name</span>
                        <input
                          type="text"
                          required
                          placeholder="Lord/Lady Sterling"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className={`w-full font-sans text-xs px-4 py-3.5 rounded-lg border focus:outline-hidden focus:ring-1 focus:ring-gold-400 ${
                            isDark ? 'bg-neutral-950 border-neutral-850 text-white' : 'bg-white border-neutral-300 text-neutral-900'
                          }`}
                        />
                      </div>

                      <div>
                        <span className="font-mono text-[9px] uppercase tracking-wider text-neutral-400 block mb-1.5">Email address</span>
                        <input
                          type="email"
                          required
                          placeholder="client@noble.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className={`w-full font-sans text-xs px-4 py-3.5 rounded-lg border focus:outline-hidden focus:ring-1 focus:ring-gold-400 ${
                            isDark ? 'bg-neutral-950 border-neutral-850 text-white' : 'bg-white border-neutral-300 text-neutral-900'
                          }`}
                        />
                      </div>

                      <div>
                        <span className="font-mono text-[9px] uppercase tracking-wider text-neutral-400 block mb-1.5">Topic theme</span>
                        <select
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          className={`w-full font-mono text-xs px-4 py-3 rounded-lg border focus:outline-hidden ${
                            isDark ? 'bg-neutral-950 border-neutral-850 text-white' : 'bg-white border-neutral-305 text-neutral-900'
                          }`}
                        >
                          <option value="Inquiry: Seating Options">Inquiry: Seating Options</option>
                          <option value="Inquiry: Sommelier Cellars">Inquiry: Sommelier Cellars</option>
                          <option value="Inquiry: Allergen adaptive flights">Inquiry: Allergen adaptive flights</option>
                          <option value="Inquiry: Private high-society banquets">Inquiry: Private high-society banquets</option>
                        </select>
                      </div>

                      <div>
                        <span className="font-mono text-[9px] uppercase tracking-wider text-neutral-400 block mb-1.5">Detailed message</span>
                        <textarea
                          required
                          placeholder="Compose your query parameters here..."
                          rows={4}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          className={`w-full font-sans text-xs px-4 py-3.5 rounded-lg border focus:outline-hidden focus:ring-1 focus:ring-gold-400 ${
                            isDark ? 'bg-neutral-950 border-neutral-850 text-white' : 'bg-white border-neutral-300 text-neutral-900'
                          }`}
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full font-mono text-[10px] tracking-widest uppercase font-extrabold bg-gradient-to-r from-gold-400 to-gold-600 hover:from-gold-300 hover:to-gold-500 text-neutral-950 py-3.5 rounded-xl transition-transform cursor-pointer"
                  >
                    Transmit Message
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="contact-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`p-8 rounded-3xl border flex flex-col justify-center items-center text-center h-full space-y-4 ${
                    isDark ? 'bg-neutral-900/40 border-neutral-900 text-white' : 'bg-neutral-50 border-neutral-200 text-neutral-900'
                  }`}
                >
                  <ShieldCheck className="w-12 h-12 text-gold-400 animate-bounce" />
                  <h3 className="font-serif text-xl font-bold uppercase tracking-wide">Transmission secure</h3>
                  <p className={`text-xs max-w-sm leading-relaxed ${isDark ? 'text-neutral-400' : 'text-neutral-550'}`}>
                    Thank you, {name}. Your inquiry detailing &ldquo;{subject}&rdquo; has been flagged in our VIP lounge queue. Our curator lines will establish connection rapidly.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setName('');
                      setEmail('');
                      setMessage('');
                    }}
                    className="font-mono text-[9px] tracking-widest uppercase font-bold text-gold-300 border border-gold-300/20 px-6 py-2 rounded-lg mt-4 hover:bg-gold-400 hover:text-neutral-950 transition-colors"
                  >
                    Submit New Inquiry
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column: Timings & Map Mock (7 Cols) */}
          <div className="lg:col-span-12 xl:col-span-7 flex flex-col justify-between gap-6">
            
            {/* Timings summary */}
            <div className={`p-6 rounded-3xl border ${isDark ? 'bg-neutral-900/60 border-neutral-900' : 'bg-neutral-50 border-neutral-200'}`}>
              <h3 className="font-serif text-lg font-bold text-gold-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Clock className="w-4.5 h-4.5" /> Operations Timing index
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs text-neutral-300">
                <div className="p-3 bg-neutral-950/40 border border-zinc-700/15 rounded-xl">
                  <span className="block font-serif text-gold-300 font-bold mb-1 uppercase text-[10px] tracking-wider">Luncheon Sessions</span>
                  <span>Tue - Fri: 12:00 PM - 3:00 PM</span> <br />
                  <span>Sat - Sun: 1:00 PM - 4:00 PM</span>
                </div>
                <div className="p-3 bg-neutral-950/40 border border-zinc-700/15 rounded-xl">
                  <span className="block font-serif text-gold-300 font-bold mb-1 uppercase text-[10px] tracking-wider">Evening Banquets</span>
                  <span>Tue - Fri: 6:30 PM - 11:30 PM</span> <br />
                  <span>Sat - Sun: 5:30 PM - 11:30 PM</span>
                </div>
              </div>
            </div>

            {/* Immersive Mockup Map Section (Vector design style) */}
            <div className={`relative flex-1 min-h-[300px] rounded-3xl border overflow-hidden p-6 flex flex-col justify-between ${
              isDark ? 'bg-neutral-950 border-neutral-900 text-white' : 'bg-neutral-900 border-neutral-800 text-white'
            }`}>
              {/* Map grid aesthetic */}
              <div 
                className="absolute inset-0 opacity-15"
                style={{
                  backgroundImage: `radial-gradient(circle, #cca057 1.5px, transparent 1.5px)`,
                  backgroundSize: '16px 16px'
                }}
              />
              
              {/* Compass aesthetic overlay */}
              <div className="absolute top-6 right-6 border border-gold-400/25 p-2 rounded-full hidden sm:block">
                <Compass className="w-5 h-5 text-gold-300 animate-spin" style={{ animationDuration: '30s' }} />
              </div>

              {/* Central Pin */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-10 space-y-2">
                <div className="relative inline-block animate-bounce" style={{ animationDuration: '2.5s' }}>
                  <MapPin className="w-8 h-8 text-gold-400 fill-neutral-950 stroke-[2.5]" />
                  <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-gold-500"></span>
                  </span>
                </div>
                
                <div className="p-2 px-3.5 bg-neutral-950 border border-gold-400/40 text-white rounded-lg text-[9px] font-mono tracking-widest uppercase shadow-2xl">
                  L&apos;Ambroisie Paris Royale
                </div>
              </div>

              {/* Coordinates panel bottom & address info */}
              <div className="relative z-10 mt-auto grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-[9px] tracking-wider text-neutral-400 uppercase pt-4 border-t border-zinc-500/15">
                <div>
                  <span className="block text-gold-400 font-bold mb-0.5">Physical Coordinates:</span>
                  <span>45.8953° N, 2.3412° E</span>
                </div>
                <div>
                  <span className="block text-gold-400 font-bold mb-0.5">District district:</span>
                  <span>Opera 1er arrondissement</span>
                </div>
                <div>
                  <span className="block text-gold-400 font-bold mb-0.5">Valet Seating:</span>
                  <span>Free Valet in Entrance</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Premium WhatsApp Quick Contact Widget */}
      <a
        href="https://wa.me/33145612293"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-24 right-6 z-40 bg-emerald-500 hover:bg-emerald-600 text-white p-3.5 rounded-full shadow-2xl transition-transform hover:scale-110 active:scale-95 flex items-center justify-center gap-2 group cursor-pointer border border-emerald-400/20"
        aria-label="Connect via WhatsApp Quick Lounge"
      >
        <MessageCircle className="w-5 h-5 fill-white stroke-none" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 font-mono text-[9px] tracking-widest uppercase font-bold text-white whitespace-nowrap">
          Concierge Connect
        </span>
      </a>
    </div>
  );
}

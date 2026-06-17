/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useRestaurantStore } from '../store/useRestaurantStore';
import { Calendar, Users, Clock, Sparkles, Map, Check, MapPin, Coffee, Volume2 } from 'lucide-react';

const SALON_ZONES = [
  { id: 'atrium', label: 'Atrium Glasshouse', cap: 'Max 6', desc: 'Dine under star-studded Parisian night skylines framed in luxurious glass structures.', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=400' },
  { id: 'salon', label: 'Main Imperial Salon', cap: 'Max 8', desc: 'Plush velvet seating flanked by golden chandeliers and classical harp melodies.', image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=400' },
  { id: 'vault', label: 'Sommelier Wine Vault', cap: 'Max 4', desc: 'An intimate, dimly lit rustic chamber storing 600+ rare oaky vintage casks.', image: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&q=80&w=400' },
  { id: 'chef', label: 'Chef de Cuisine VIP Counter', cap: 'Max 2', desc: 'Sit adjacent to the woodfired tandoors. Fully guided by Chef Julian Marc.', image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=400' }
];

const TIME_SLOTS_LUNCH = ['12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM'];
const TIME_SLOTS_DINNER = ['6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM'];

export default function Reservations() {
  const { addReservation, reservations, theme } = useRestaurantStore();
  const isDark = theme === 'dark';

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [selectedZone, setSelectedZone] = useState('salon');
  const [guests, setGuests] = useState(2);
  const [timeSlot, setTimeSlot] = useState('7:30 PM');
  const [specialRequests, setSpecialRequests] = useState('');
  
  // Confirmation state
  const [ticketKey, setTicketKey] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !date) return;

    const zoneLabel = SALON_ZONES.find(z => z.id === selectedZone)?.label || 'Main Salon';

    addReservation({
      name,
      email,
      phone,
      date,
      timeSlot,
      guests,
      specialRequests: `${zoneLabel} Seating. ${specialRequests}`.trim()
    });

    // Capture the newly created reservation ID (last in state) or mock key
    const generatedId = `RES-${Math.floor(10000 + Math.random() * 90000)}`;
    setTicketKey(generatedId);
  };

  return (
    <div className={`pt-4 pb-12 ${isDark ? 'bg-neutral-950 text-white' : 'bg-white text-neutral-900'}`} id="reservations-page-container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-mono text-[9px] tracking-widest uppercase text-gold-400 font-extrabold block mb-1">
            Table Booking
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold uppercase tracking-tight">
            Reserve a Table
          </h1>
          <p className={`text-xs mt-3 ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>
            Secure VIP seatings at our Parisian fine-dining salon. Recommend booking 3 weeks in advance.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!ticketKey ? (
            /* Main elegant dual split reservation dashboard */
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start"
            >
              {/* Left Column: Form detail items (7 Cols) */}
              <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-8 font-sans">
                {/* Section A: Seating Zone Selector */}
                <div>
                  <label className="font-serif text-sm font-semibold mb-4 block text-gold-400 uppercase tracking-wider">
                    1. Select Dining Zone Salon
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {SALON_ZONES.map((zone) => (
                      <div
                        key={zone.id}
                        onClick={() => setSelectedZone(zone.id)}
                        className={`p-4 rounded-xl border flex gap-3.5 items-center cursor-pointer transition-all ${
                          selectedZone === zone.id
                            ? 'bg-gold-500/10 border-gold-400'
                            : isDark
                              ? 'bg-neutral-900 border-neutral-850 hover:bg-neutral-900/60'
                              : 'bg-neutral-50 border-neutral-200 hover:bg-neutral-100'
                        }`}
                      >
                        <img
                          src={zone.image}
                          alt={zone.label}
                          className="w-16 h-16 object-cover rounded-lg shrink-0 border border-gold-300/10"
                          referrerPolicy="no-referrer"
                        />
                        <div className="min-w-0">
                          <span className="block font-serif text-xs font-bold text-white dark:text-white light:text-neutral-900 truncate">
                            {zone.label}
                          </span>
                          <span className="block font-mono text-[9px] text-gold-400 mt-0.5">{zone.cap}</span>
                          <span className={`block text-[9px] line-clamp-2 mt-1 leading-normal ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
                            {zone.desc}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section B: Time, Date and Guests Selection */}
                <div className={`p-6 rounded-2xl border ${isDark ? 'bg-neutral-900/40 border-neutral-850' : 'bg-neutral-50 border-neutral-200'}`}>
                  <label className="font-serif text-sm font-semibold mb-4 block text-gold-400 uppercase tracking-wider">
                    2. Table Specification Parameters
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {/* Date Picker */}
                    <div>
                      <span className="font-mono text-[9px] uppercase tracking-wider text-neutral-400 block mb-2">
                        Select date
                      </span>
                      <div className="relative">
                        <input
                          type="date"
                          required
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          className={`w-full font-mono text-xs px-4 py-3 rounded-lg border focus:outline-hidden ${
                            isDark ? 'bg-neutral-950 border-neutral-800 text-white' : 'bg-white border-neutral-300 text-neutral-900'
                          }`}
                        />
                      </div>
                    </div>

                    {/* Guests selector */}
                    <div>
                      <span className="font-mono text-[9px] uppercase tracking-wider text-neutral-400 block mb-2">
                        Guests count
                      </span>
                      <select
                        value={guests}
                        onChange={(e) => setGuests(Number(e.target.value))}
                        className={`w-full font-mono text-xs px-4 py-3 rounded-lg border focus:outline-hidden ${
                          isDark ? 'bg-neutral-950 border-neutral-800 text-white' : 'bg-white border-neutral-300 text-neutral-900'
                        }`}
                      >
                        <option value={1}>1 Guest (Connoisseur Solo)</option>
                        <option value={2}>2 Guests (Couple Seating)</option>
                        <option value={4}>4 Guests (Family Classic)</option>
                        <option value={6}>6 Guests (Business Flight)</option>
                        <option value={8}>8 Guests (Banqueting Splendour)</option>
                        <option value={12}>10+ Guests (Private Sallette Room)</option>
                      </select>
                    </div>

                    {/* Quick Selected Time Slot */}
                    <div>
                      <span className="font-mono text-[9px] uppercase tracking-wider text-neutral-400 block mb-2">
                        Preferred Seating Time
                      </span>
                      <select
                        value={timeSlot}
                        onChange={(e) => setTimeSlot(e.target.value)}
                        className={`w-full font-mono text-xs px-4 py-3 rounded-lg border focus:outline-hidden ${
                          isDark ? 'bg-neutral-950 border-neutral-800 text-white' : 'bg-white border-neutral-300 text-neutral-900'
                        }`}
                      >
                        <optgroup label="Luncheon Flights">
                          {TIME_SLOTS_LUNCH.map(t => <option key={t} value={t}>{t}</option>)}
                        </optgroup>
                        <optgroup label="Dinner seatings">
                          {TIME_SLOTS_DINNER.map(t => <option key={t} value={t}>{t}</option>)}
                        </optgroup>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Section C: Contact Information details */}
                <div className={`p-6 rounded-2xl border space-y-4 ${isDark ? 'bg-neutral-900/40 border-neutral-850' : 'bg-neutral-50 border-neutral-200'}`}>
                  <label className="font-serif text-sm font-semibold block text-gold-400 uppercase tracking-wider mb-2">
                    3. Contact details
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={`font-sans text-xs px-4 py-3 rounded-lg border focus:outline-hidden ${
                        isDark ? 'bg-neutral-950 border-neutral-850 text-white' : 'bg-white border-neutral-300 text-neutral-900'
                      }`}
                    />
                    <input
                      type="email"
                      required
                      placeholder="Connoisseur Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`font-sans text-xs px-4 py-3 rounded-lg border focus:outline-hidden ${
                        isDark ? 'bg-neutral-950 border-neutral-850 text-white' : 'bg-white border-neutral-300 text-neutral-900'
                      }`}
                    />
                    <input
                      type="tel"
                      required
                      placeholder="Contact Telephone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={`font-sans text-xs px-4 py-3 rounded-lg border focus:outline-hidden ${
                        isDark ? 'bg-neutral-950 border-neutral-850 text-white' : 'bg-white border-neutral-300 text-neutral-900'
                      }`}
                    />
                  </div>

                  <div>
                    <span className="font-mono text-[9px] uppercase tracking-wider text-neutral-400 block mb-1">
                      Special requirements or dietary instructions
                    </span>
                    <textarea
                      placeholder="Anniversaries, proposal settings, extreme allergies to nuts/scallions..."
                      rows={3}
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      className={`w-full font-sans text-xs px-4 py-3 rounded-lg border focus:outline-hidden ${
                        isDark ? 'bg-neutral-950 border-neutral-850 text-white' : 'bg-white border-neutral-300 text-neutral-900'
                      }`}
                    />
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full font-mono text-xs tracking-widest uppercase font-extrabold bg-gradient-to-r from-gold-400 to-gold-600 hover:from-gold-300 hover:to-gold-500 text-neutral-950 py-4 rounded-xl shadow-lg transition-transform active:scale-99 cursor-pointer"
                >
                  Acquire Golden pass Table Booking
                </button>
              </form>

              {/* Right Column: Gastronomic guidelines & policies (5 Cols) */}
              <div className="lg:col-span-12 xl:col-span-5 space-y-6">
                <div className={`p-6 rounded-2xl border ${isDark ? 'bg-neutral-900/70 border-neutral-850' : 'bg-neutral-50 border-neutral-200'}`}>
                  <h4 className="font-serif text-sm font-bold text-gold-400 uppercase tracking-wider mb-3">
                    Banqueting Rules
                  </h4>
                  <ul className="space-y-3 font-mono text-[10px] uppercase text-neutral-300">
                    <li className="flex gap-2 items-start">
                      <Check className="w-3.5 h-3.5 text-gold-450 shrink-0 mt-0.5 animate-pulse" />
                      <span>Dress code holds as Elegant Evening / Smart Lounge. Avoid flip flops or caps.</span>
                    </li>
                    <li className="flex gap-2 items-start">
                      <Check className="w-3.5 h-3.5 text-gold-450 shrink-0 mt-0.5 animate-pulse" />
                      <span>Reserved table holds for exactly 20 minutes past booking hours.</span>
                    </li>
                    <li className="flex gap-2 items-start">
                      <Check className="w-3.5 h-3.5 text-gold-450 shrink-0 mt-0.5 animate-pulse" />
                      <span>Any cancellation must be wired at least 24 hours prior via telephone.</span>
                    </li>
                  </ul>
                </div>

                {/* Booking History logs inside component */}
                {reservations.length > 0 && (
                  <div className={`p-6 rounded-2xl border ${isDark ? 'bg-neutral-900/40 border-neutral-850' : 'bg-neutral-50 border-neutral-200'}`}>
                    <h4 className="font-serif text-sm font-bold text-gold-400 uppercase tracking-wider mb-4">
                      Active Seating Passes
                    </h4>
                    <div className="space-y-3 font-mono text-[11px]">
                      {reservations.map((res) => (
                        <div key={res.id} className="p-3 bg-neutral-950/50 rounded-lg border border-zinc-700/10 flex justify-between items-center text-left">
                          <div>
                            <span className="block font-bold text-neutral-200">{res.date} at {res.timeSlot}</span>
                            <span className="block text-[9px] text-neutral-500">{res.guests} Guests • {res.id}</span>
                          </div>
                          <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[9px] font-bold px-2.5 py-1 rounded">
                            {res.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            /* Success ticker Gold ticket preview! */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-xl mx-auto"
            >
              <div className="bg-gradient-to-b from-neutral-900 via-gold-950/30 to-neutral-900 border border-gold-400/40 rounded-3xl p-8 shadow-2xl relative text-center text-white overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-gold-400 to-gold-600" />
                
                {/* Visual stars */}
                <Sparkles className="w-10 h-10 text-gold-400 mx-auto mb-4 animate-bounce" />
                <h3 className="font-serif text-2xl font-black uppercase text-gold-400 tracking-wider">
                  Celestial Pass Activated
                </h3>
                <p className="font-serif italic text-xs text-neutral-400 mt-1 mb-6">
                  Table Reservation holds as securely confirmed.
                </p>

                {/* Ticket main metrics */}
                <div className="border-t border-b border-gold-400/20 py-4 my-6 space-y-3 font-mono text-left text-xs uppercase text-neutral-300">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Beneficiary:</span>
                    <span className="text-white font-bold">{name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Aesthetic Zone:</span>
                    <span className="text-white font-bold">
                      {SALON_ZONES.find((z) => z.id === selectedZone)?.label}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Date/Schedule:</span>
                    <span className="text-white font-bold">{date} • {timeSlot}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Guests Allocated:</span>
                    <span className="text-white font-bold">{guests} Portions</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Gold Pass ID:</span>
                    <span className="text-gold-400 font-bold">{ticketKey}</span>
                  </div>
                </div>

                <p className="text-[10px] text-neutral-500 leading-normal mb-8">
                  Check your inbox {email} for the sommelier flight credentials. We look forward to pacing L&apos;Ambroisie dishes at your pleasure.
                </p>

                {/* Print/Dismiss Triggers */}
                <button
                  type="button"
                  onClick={() => {
                    setName('');
                    setEmail('');
                    setPhone('');
                    setDate('');
                    setTicketKey(null);
                  }}
                  className="w-full font-mono text-[10px] tracking-widest uppercase font-extrabold text-neutral-950 bg-white hover:bg-gold-400 py-3 rounded-lg transition-transform"
                >
                  Book Another VIP Table
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

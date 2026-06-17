/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useRestaurantStore } from '../store/useRestaurantStore';
import { OFFERS_COMBOS, MENU_ITEMS } from '../data/menu';
import { OfferCombo } from '../types';
import { formatINR } from '../utils/currency';
import { Sparkles, Compass, Flame, ShoppingBag, Clock, Percent, Gift, CheckCircle } from 'lucide-react';

export default function Offers() {
  const { addToCart, addToast, theme } = useRestaurantStore();
  const isDark = theme === 'dark';

  // State
  const [activeTab, setActiveTab] = useState<'all' | 'seasonal' | 'family' | 'couple' | 'bogo'>('all');
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);

  // Live countdown states (counting down from 6 Hours 14 Mins for extreme gourmet limited deal)
  const [timeLeft, setTimeLeft] = useState({ hours: 6, minutes: 14, seconds: 55 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          // Reset timer to keep looping for demo
          return { hours: 5, minutes: 59, seconds: 59 };
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Filter combo lists
  const filteredCombos = OFFERS_COMBOS.filter((combo) => {
    return activeTab === 'all' || combo.category === activeTab;
  });

  // Handle acquiring combo items in a single click!
  const handleAcquireCombo = (combo: OfferCombo) => {
    // Look up the corresponding menu items to inject into cart!
    // Since we mapped beautiful inclusions, we will read original names and add!
    let matchingItems = MENU_ITEMS.filter((m) => combo.items.some(incl => incl.toLowerCase().includes(m.name.toLowerCase())));
    
    // If some aren't directly found, use default or add the primary illustration item
    if (matchingItems.length === 0) {
      const primaryItem = MENU_ITEMS.find((m) => m.name.toLowerCase().includes(combo.items[0]?.toLowerCase()));
      if (primaryItem) matchingItems = [primaryItem];
    }

    if (matchingItems.length > 0) {
      matchingItems.forEach((item) => {
        // Add single portion to cart
        addToCart(item, 1);
      });
      addToast(`Grand Banquet Combo "${combo.title}" loaded successfully!`, 'success');
    } else {
      addToast('Sorry, this seasonal combo is out of gourmet stock currently.', 'error');
    }
  };

  const applyPromoCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.toUpperCase() === 'MICHELIN') {
      setCouponApplied(true);
      addToast('Michelin Code Valid! Extra 10% discount holds in your checkout cart.', 'success');
    } else {
      addToast('Unknown luxury promo voucher. Try "MICHELIN" coupon code.', 'error');
    }
  };

  return (
    <div className={`pt-4 pb-12 ${isDark ? 'bg-neutral-950 text-white' : 'bg-white text-neutral-900'}`} id="offers-page-container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hot Countdown Special Section */}
        <div className="bg-gradient-to-r from-neutral-950 via-gold-950/70 to-neutral-950 rounded-3xl border border-gold-400/30 p-8 md:p-12 mb-16 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-gold-400/5 blur-3xl rounded-full pointer-events-none" />
          
          <div className="space-y-4 max-w-xl">
            <div className="inline-flex items-center gap-1 bg-amber-500/15 border border-amber-500/30 text-amber-500 px-3 py-1 rounded-full font-mono text-[9px] font-bold uppercase">
              <Clock className="w-3.5 h-3.5" /> Special Sealing Closing
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white leading-none">
              The Sommelier&apos;s <br />
              <span className="text-gold-400">Midnight Cellar Opening</span>
            </h2>
            <p className="text-xs text-neutral-400 leading-relaxed font-sans mt-2">
              Order any grand couple combo or weekend BOGO Wagyu package in the next hours and L&apos;Ambroisie will accompany your delivery with a complimentary aged vintage pairing.
            </p>
          </div>

          {/* Luxury Count Down Counter Boxes */}
          <div className="flex gap-4 items-center shrink-0">
            <div className={`w-20 h-24 rounded-2xl border flex flex-col items-center justify-center ${isDark ? 'bg-neutral-950/80 border-neutral-800' : 'bg-neutral-900 border-neutral-800 text-white'}`}>
              <span className="font-serif text-3xl font-extrabold text-gold-300">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="font-mono text-[9px] uppercase tracking-wider text-neutral-500 mt-1">HRs</span>
            </div>
            <span className="font-serif text-3xl text-gold-400 font-bold">:</span>
            <div className={`w-20 h-24 rounded-2xl border flex flex-col items-center justify-center ${isDark ? 'bg-neutral-950/80 border-neutral-800' : 'bg-neutral-900 border-neutral-800 text-white'}`}>
              <span className="font-serif text-3xl font-extrabold text-gold-300">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="font-mono text-[9px] uppercase tracking-wider text-neutral-500 mt-1">MIns</span>
            </div>
            <span className="font-serif text-3xl text-gold-400 font-bold">:</span>
            <div className={`w-20 h-24 rounded-2xl border flex flex-col items-center justify-center ${isDark ? 'bg-neutral-950/80 border-neutral-800' : 'bg-neutral-900 border-neutral-800 text-white'}`}>
              <span className="font-serif text-3xl font-extrabold text-gold-300">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <span className="font-mono text-[9px] uppercase tracking-wider text-neutral-500 mt-1">Secs</span>
            </div>
          </div>
        </div>

        {/* Categories of Offers Filter Tabs */}
        <div className="flex justify-center flex-wrap gap-2.5 mb-12">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`px-4.5 py-2.5 rounded-full font-mono text-[10px] tracking-wider uppercase font-bold border transition-all ${
              activeTab === 'all'
                ? 'bg-gold-300 border-gold-300 text-neutral-950'
                : isDark
                  ? 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
                  : 'bg-neutral-50 border-neutral-200 text-neutral-600 hover:text-neutral-950'
            }`}
          >
            All Incentives
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('seasonal')}
            className={`px-4.5 py-2.5 rounded-full font-mono text-[10px] tracking-wider uppercase font-bold border transition-all ${
              activeTab === 'seasonal'
                ? 'bg-gold-300 border-gold-300 text-neutral-950'
                : isDark
                  ? 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
                  : 'bg-neutral-50 border-neutral-200 text-neutral-600'
            }`}
          >
            Autumn Flight
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('family')}
            className={`px-4.5 py-2.5 rounded-full font-mono text-[10px] tracking-wider uppercase font-bold border transition-all ${
              activeTab === 'family'
                ? 'bg-gold-300 border-gold-300 text-neutral-950'
                : isDark
                  ? 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
                  : 'bg-neutral-50 border-neutral-200 text-neutral-600'
            }`}
          >
            Imperial Banquets
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('couple')}
            className={`px-4.5 py-2.5 rounded-full font-mono text-[10px] tracking-wider uppercase font-bold border transition-all ${
              activeTab === 'couple'
                ? 'bg-gold-300 border-gold-300 text-neutral-950'
                : isDark
                  ? 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
                  : 'bg-neutral-50 border-neutral-200 text-neutral-600'
            }`}
          >
            Lovers Nocturne
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('bogo')}
            className={`px-4.5 py-2.5 rounded-full font-mono text-[10px] tracking-wider uppercase font-bold border transition-all ${
              activeTab === 'bogo'
                ? 'bg-gold-300 border-gold-300 text-neutral-950'
                : isDark
                  ? 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
                  : 'bg-neutral-50 border-neutral-200 text-neutral-600'
            }`}
          >
            Surf & Turf BOGOs
          </button>
        </div>

        {/* Combo offers grid lists */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <AnimatePresence mode="wait">
            {filteredCombos.map((combo) => (
              <motion.div
                layout
                key={combo.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className={`relative rounded-3xl border overflow-hidden p-6 md:p-8 flex flex-col justify-between group h-full shadow-lg ${
                  isDark ? 'bg-neutral-900/60 border-neutral-850 hover:border-gold-300/20' : 'bg-neutral-50 border-neutral-200 hover:border-gold-500/30'
                }`}
                id={`offer-card-${combo.id}`}
              >
                {/* Visual discount tags */}
                <span className="absolute top-4 left-4 font-mono text-[9px] tracking-widest bg-rose-500 text-white font-extrabold px-3 py-1 rounded shadow">
                  {combo.discount}
                </span>

                <div>
                  {/* Aspect ratio food preview image */}
                  <div className="relative h-48 rounded-xl overflow-hidden mb-6 border border-gold-300/10">
                    <img
                      src={combo.image}
                      alt={combo.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm rounded-md px-2.5 py-1 text-[10px] font-mono tracking-wider font-bold text-gold-400">
                      {combo.badge}
                    </div>
                  </div>

                  {/* Pricing and descriptions */}
                  <span className="font-mono text-[10px] tracking-wider uppercase text-gold-400 font-extrabold block mb-1">
                    {combo.subtitle}
                  </span>
                  <h3 className="font-serif text-2xl font-bold uppercase truncate">{combo.title}</h3>
                  <p className={`text-xs mt-2.5 leading-relaxed mb-6 ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
                    {combo.description}
                  </p>

                  <div className="space-y-2 mb-8">
                    <span className="font-serif text-xs font-bold block text-neutral-300">Inclusions:</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 p-3 rounded-lg bg-neutral-950/40 border border-zinc-700/10 font-mono text-[10px]">
                      {combo.items.map((incl) => (
                        <div key={incl} className="flex items-center gap-1.5 truncate">
                          <CheckCircle className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                          <span className="text-neutral-200 truncate">{incl}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Pricing summary & Checkout Actions */}
                <div className="flex justify-between items-center border-t border-zinc-700/20 pt-4 mt-auto">
                  <div className="flex items-baseline gap-2.5">
                    <span className="font-serif text-2xl font-semibold text-gold-400">
                      {formatINR(combo.price)}
                    </span>
                    <span className="font-mono text-xs text-neutral-500 line-through">
                      {formatINR(combo.originalPrice)}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleAcquireCombo(combo)}
                    className="select-none font-mono text-[10.5px] tracking-widest uppercase font-extrabold bg-neutral-950 dark:bg-neutral-950 hover:bg-gold-400 hover:text-neutral-950 text-gold-300 border border-gold-300/30 px-5 py-3 rounded-xl transition-all duration-300 flex items-center gap-2 cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Load Banquet
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Promo Code Coupon Voucher Box */}
        <div className={`p-8 rounded-3xl border flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative ${
          isDark ? 'bg-neutral-900/40 border-neutral-800' : 'bg-neutral-50 border-neutral-200 shadow-sm'
        }`}>
          <div className="flex items-center gap-4 shrink-0">
            <div className="w-12 h-12 rounded-full bg-gold-400/5 border border-gold-400/15 flex items-center justify-center">
              <Gift className="w-6 h-6 text-gold-400" />
            </div>
            <div>
              <h4 className="font-serif text-lg font-bold">Have an Elite Private Voucher?</h4>
              <p className={`text-xs ${isDark ? 'text-neutral-450' : 'text-neutral-500'}`}>
                Apply bespoke high-society credentials for extreme checkout offsets.
              </p>
            </div>
          </div>

          <form onSubmit={applyPromoCode} className="flex gap-2 w-full max-w-sm">
            <input
              type="text"
              placeholder="VOUCHER (e.g. MICHELIN)"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              disabled={couponApplied}
              className={`w-full font-mono text-xs px-4 py-3 rounded-xl uppercase border text-center focus:outline-hidden focus:ring-1 focus:ring-gold-400 ${
                couponApplied ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500 text-center font-bold' : isDark ? 'bg-neutral-950 border-neutral-850 text-white' : 'bg-white border-neutral-300 text-neutral-900'
              }`}
            />
            <button
              type="submit"
              disabled={couponApplied}
              className={`font-mono text-[10px] tracking-widest font-extrabold uppercase px-6 py-3 rounded-xl transition-transform active:scale-95 duration-200 cursor-pointer shrink-0 ${
                couponApplied ? 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-bold' : 'bg-gold-400 hover:bg-gold-300 text-neutral-950'
              }`}
            >
              {couponApplied ? 'ACTIVE' : 'APPLY'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

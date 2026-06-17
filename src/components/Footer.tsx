/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Link } from 'react-router-dom';
import { useRestaurantStore } from '../store/useRestaurantStore';
import { MapPin, Phone, Mail, Instagram, Facebook, Twitter, Send } from 'lucide-react';
import React, { useState } from 'react';

export default function Footer() {
  const { theme, addToast } = useRestaurantStore();
  const [email, setEmail] = useState('');

  const isDark = theme === 'dark';

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      addToast('Please input a valid luxury subscriber email.', 'error');
      return;
    }
    addToast('You have been initiated into L`Ambroisie Connoisseur Club!', 'success');
    setEmail('');
  };

  return (
    <footer
      className={`border-t font-sans transition-colors duration-300 ${
        isDark 
          ? 'bg-neutral-950 border-neutral-900 text-neutral-400' 
          : 'bg-neutral-50 border-neutral-200 text-neutral-600'
      }`}
      id="lux-app-footer"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Presentation Column */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 group">
              <span className="w-8 h-8 border border-gold-400 flex items-center justify-center font-serif font-bold text-gold-400 rounded">
                G
              </span>
              <span className="font-serif font-black text-md tracking-widest uppercase text-gold-400">
                The Grand Table
              </span>
            </Link>
            <p className={`text-xs leading-relaxed ${isDark ? 'text-neutral-500' : 'text-neutral-500'}`}>
              Immerse yourself of true culinary transcendence. Guided by our 3-Michelin star tradition, every flavor is a meticulously curated fine-art masterpiece.
            </p>
            {/* Social profiles */}
            <div className="flex gap-4 pt-2">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-gold-400 hover:text-gold-300" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-gold-400 hover:text-gold-300" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-gold-400 hover:text-gold-300" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Timings Schedule Column */}
          <div>
            <h4 className="font-serif text-sm font-semibold uppercase tracking-widest text-gold-400 mb-4">
              Salon Hours
            </h4>
            <div className="space-y-2.5 font-mono text-xs">
              <div className="flex justify-between border-b border-zinc-500/10 pb-1">
                <span>Tue - Fri Lunch</span>
                <span className="text-neutral-150">12:00 PM - 3:00 PM</span>
              </div>
              <div className="flex justify-between border-b border-zinc-500/10 pb-1">
                <span>Tue - Fri Dinner</span>
                <span className="text-neutral-150">6:30 PM - 11:30 PM</span>
              </div>
              <div className="flex justify-between border-b border-zinc-500/10 pb-1">
                <span>Sat - Sun (Whole)</span>
                <span className="text-neutral-150">1:00 PM - 11:30 PM</span>
              </div>
              <div className="flex justify-between text-neutral-500">
                <span>Monday</span>
                <span>Salon Closed</span>
              </div>
            </div>
          </div>

          {/* Quick Nav Collections */}
          <div>
            <h4 className="font-serif text-sm font-semibold uppercase tracking-widest text-gold-400 mb-4">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/menu" className="hover:text-gold-400 transition-colors">Michelin Grand Menu</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-gold-400 transition-colors">Our Gastronomic Story</Link>
              </li>
              <li>
                <Link to="/offers" className="hover:text-gold-400 transition-colors">Combos & Fine-Pairings</Link>
              </li>
              <li>
                <Link to="/reservations" className="hover:text-gold-400 transition-colors">Reserve dining Table</Link>
              </li>
              <li>
                <Link to="/track-order" className="hover:text-gold-400 transition-colors">Active Delivery status</Link>
              </li>
            </ul>
          </div>

          {/* Subscription Newsletter column */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-semibold uppercase tracking-widest text-gold-400 mb-2">
              The Club Salon
            </h4>
            <p className="text-xs leading-relaxed text-neutral-500">
              Subscribe to obtain elite secret invitations, seasonal chef flights, and midnight cellar openings.
            </p>

            <form onSubmit={handleSubscribe} className="relative mt-4">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Connoisseur Email Address"
                className={`w-full font-sans text-xs px-4 py-3 rounded-lg border focus:outline-hidden focus:ring-1 focus:ring-gold-400/50 ${
                  isDark
                    ? 'bg-neutral-900 border-neutral-800 text-white placeholder-neutral-600 focus:border-gold-300/40'
                    : 'bg-white border-neutral-300 text-neutral-900 placeholder-neutral-400 focus:border-gold-500'
                }`}
              />
              <button
                type="submit"
                className="absolute right-1 top-1 p-2 rounded-md bg-gold-400 hover:bg-gold-300 text-neutral-950 transition-colors"
                aria-label="Submit subscriber application"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="border-t border-zinc-500/10 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
          <div className="flex items-center gap-6 flex-wrap justify-center text-neutral-500 font-mono text-[10px]">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-gold-400" />
              45 Avenue de l&apos;Opéra,Hyderabad Royale
            </span>
            <span className="flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-gold-400" />
              +91 9921 XXXXXX
            </span>
            <span className="flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-gold-400" />
              cellar@grandtable-classic.fr
            </span>
          </div>

          <p className="text-neutral-500 font-serif">
            &copy; {new Date().getFullYear()} G&apos;The Grand Table Crafted with Michelin devotion. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

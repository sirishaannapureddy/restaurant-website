/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useRestaurantStore } from '../store/useRestaurantStore';
import { FAQS_DATA } from '../data/menu';
import { Search, ChevronDown, ChevronUp, HelpCircle, MessageSquare, PhoneCall } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function FAQ() {
  const { theme } = useRestaurantStore();
  const isDark = theme === 'dark';

  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'General' | 'Reservations' | 'Menu & Dietary' | 'Delivery & Tracking' | 'Events'>('all');
  const [openFaqId, setOpenFaqId] = useState<string | null>('f1'); // Open first by default

  const faqCategories = [
    { id: 'all', label: 'All Inquiries' },
    { id: 'General', label: 'General Info' },
    { id: 'Reservations', label: 'Reservations' },
    { id: 'Menu & Dietary', label: 'Menu & Dietary' },
    { id: 'Delivery & Tracking', label: 'Delivery & Tracking' },
    { id: 'Events', label: 'Private Events' }
  ];

  // Filters & Searches FAQ items
  const filteredFaqs = useMemo(() => {
    return FAQS_DATA.filter((faq) => {
      const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
      const matchesSearch =
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <div className={`pt-4 pb-12 ${isDark ? 'bg-neutral-950 text-white' : 'bg-white text-neutral-900'}`} id="faq-page-container">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="font-mono text-[9px] tracking-widest uppercase text-gold-400 font-extrabold block mb-1">
            Answers Salon
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold uppercase tracking-tight">
            Frequently Asked
          </h1>
          <p className={`text-xs mt-3 ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>
            Answers concerning table limits, white-glove delivery, ingredients, and custom banqueting courses.
          </p>
        </div>

        {/* Categories of FAQ Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {faqCategories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => {
                setActiveCategory(cat.id as any);
                setOpenFaqId(null);
              }}
              className={`px-4 py-2 rounded-full font-mono text-[10px] tracking-wider uppercase font-semibold border transition-all ${
                activeCategory === cat.id
                  ? 'bg-gold-300 border-gold-300 text-neutral-950'
                  : isDark
                    ? 'bg-neutral-900 border-neutral-850 text-neutral-400 hover:text-white'
                    : 'bg-neutral-50 border-neutral-200 text-neutral-600'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Searching input controls */}
        <div className="relative mb-12">
          <input
            type="text"
            placeholder="Type your query parameters (e.g. valet, allergy, lobster)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full font-sans text-xs px-5 py-4 pl-12 rounded-xl border focus:outline-hidden focus:ring-1 focus:ring-gold-400/30 ${
              isDark ? 'bg-neutral-900 border-neutral-850 text-white' : 'bg-neutral-50 border-neutral-200 text-neutral-900'
            }`}
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gold-400" />
        </div>

        {/* Accordions Stack */}
        <div className="space-y-4">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-zinc-500/10 rounded-2xl">
              <span className="block text-3xl mb-3">❓</span>
              <h4 className="font-serif text-sm font-bold">Inquiry Unmatched</h4>
              <p className={`text-xs mt-1 ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>
                We couldn&apos;t scan any registered entries. Clear your filters or try general keywords.
              </p>
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = openFaqId === faq.id;

              return (
                <div
                  key={faq.id}
                  className={`rounded-xl border overflow-hidden transition-all duration-300 ${
                    isOpen
                      ? 'border-gold-400 bg-neutral-950/40 shadow-md'
                      : isDark
                        ? 'border-neutral-900 bg-neutral-900/10'
                        : 'border-neutral-200 bg-neutral-50/50'
                  }`}
                  id={`faq-item-${faq.id}`}
                >
                  {/* Click to Toggle */}
                  <button
                    type="button"
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full text-left px-5 py-4.5 flex justify-between items-center gap-4 cursor-pointer"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <HelpCircle className="w-4.5 h-4.5 text-gold-400 shrink-0" />
                      <span className="font-serif text-sm sm:text-base font-bold text-neutral-100 dark:text-neutral-100 light:text-neutral-900 leading-normal truncate">
                        {faq.question}
                      </span>
                    </div>
                    {isOpen ? (
                      <ChevronUp className="w-4.5 h-4.5 text-gold-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4.5 h-4.5 text-neutral-500 shrink-0" />
                    )}
                  </button>

                  {/* Accordion Answer drawer collapsible panel */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="overflow-hidden border-t border-zinc-500/5 bg-neutral-950/20"
                      >
                        <div className={`px-5 py-4 text-xs sm:text-sm leading-relaxed ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                          {faq.answer}
                          <div className="mt-3 flex justify-between items-center text-[10px] font-mono text-neutral-500 uppercase tracking-widest pt-3 border-t border-zinc-500/5">
                            <span>Topic Category: {faq.category}</span>
                            <span>A&A Certified</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          )}
        </div>

        {/* Still Unresolved? Call/Email Card */}
        <div className={`mt-16 text-center rounded-2xl border p-8 space-y-4 max-w-xl mx-auto ${
          isDark ? 'bg-neutral-900/40 border-neutral-900' : 'bg-neutral-50 border-neutral-200 shadow-sm'
        }`}>
          <MessageSquare className="w-6 h-6 text-gold-300 mx-auto" />
          <h3 className="font-serif text-lg font-bold">Unsolved Epistemologies?</h3>
          <p className={`text-xs max-w-sm mx-auto leading-relaxed ${isDark ? 'text-neutral-450' : 'text-neutral-550'}`}>
            Drop your inquiries directly to L&apos;Ambroisie concierge office. Our sommelier lines remain active 24/7.
          </p>

          <div className="flex gap-4 justify-center pt-2">
            <Link
              to="/contact"
              className="bg-gold-450 text-neutral-950 font-mono text-[10px] tracking-widest uppercase font-extrabold px-5 py-2.5 rounded-lg hover:bg-gold-300 transition-transform cursor-pointer"
            >
              Contact Salon Offices
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

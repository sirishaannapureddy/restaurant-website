/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useRestaurantStore } from '../store/useRestaurantStore';
import { X, Scale, Star, ShoppingBag, EyeOff } from 'lucide-react';
import { formatINR } from '../utils/currency';

export default function ComparisonModal() {
  const { compareList, toggleCompare, clearCompare, addToCart, theme } = useRestaurantStore();
  const [isOpen, setIsOpen] = useState(false);

  const isDark = theme === 'dark';

  if (compareList.length === 0) return null;

  return (
    <>
      {/* Floating Bottom Dock Bar */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-neutral-900/95 border border-gold-400/30 backdrop-blur-md rounded-full shadow-2xl px-6 py-3 flex items-center gap-6 max-w-lg w-[calc(100%-2rem)]">
        <div className="flex items-center gap-2 text-gold-400">
          <Scale className="w-4 h-4" />
          <span className="font-mono text-[10px] tracking-wider uppercase font-bold">
            Compare ({compareList.length}/3)
          </span>
        </div>

        {/* Small thumbnail listing */}
        <div className="flex gap-2 items-center flex-1">
          {compareList.map((item) => (
            <div key={item.id} className="relative group shrink-0">
              <img
                src={item.image}
                alt={item.name}
                className="w-10 h-10 object-cover rounded-full border border-gold-400/20"
                referrerPolicy="no-referrer"
              />
              <button
                type="button"
                onClick={() => toggleCompare(item)}
                className="absolute -top-1 -right-1 bg-red-500 rounded-full text-white p-0.5 hover:bg-red-600 transition-colors"
                aria-label={`Remove ${item.name} from comparison`}
              >
                <X className="w-2.5 h-2.5" />
              </button>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="bg-gold-400 hover:bg-gold-300 text-neutral-950 font-mono text-[9px] tracking-widest uppercase font-bold px-3 py-1.5 rounded-full transition-transform active:scale-95 shadow-md"
          >
            Compare
          </button>
          <button
            type="button"
            onClick={clearCompare}
            className="text-neutral-400 hover:text-neutral-200"
            aria-label="Clear choices"
          >
            <EyeOff className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Actual Comparison Full Screen Overlay */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10 overflow-auto">
            {/* Dark Tint Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-neutral-950/90 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            {/* Compare Table Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className={`relative max-w-5xl w-full rounded-2xl p-6 md:p-8 shadow-2xl z-10 border overflow-hidden ${
                isDark ? 'bg-neutral-900 border-gold-300/10 text-white' : 'bg-white border-neutral-200 text-neutral-900'
              }`}
              id="compare-modal-panel"
            >
              {/* Table Header Close Triggers */}
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="font-serif text-2xl font-bold tracking-tight">
                    Gourmet Food Comparison
                  </h3>
                  <p className={`text-xs mt-0.5 ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
                    Analyze sensory profiles, nutritional metrics, and pricing values.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className={`p-2 rounded-full border transition-all ${
                    isDark ? 'border-neutral-800 hover:border-neutral-700 bg-neutral-950 text-neutral-400 hover:text-white' : 'border-neutral-200 hover:border-neutral-300 bg-neutral-50 text-neutral-600 hover:text-neutral-900'
                  }`}
                  aria-label="Dismiss comparison grid"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Compare Multi-Column Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-zinc-800/20 md:divide-zinc-800/40">
                {compareList.map((item, index) => (
                  <div key={item.id} className="pt-4 md:pt-0 md:px-4 first:pl-0 last:pr-0">
                    {/* Image & Quick Delete */}
                    <div className="relative h-44 overflow-hidden rounded-xl mb-4 group border border-gold-400/10">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <button
                        type="button"
                        onClick={() => toggleCompare(item)}
                        className="absolute top-2 right-2 bg-black/60 hover:bg-red-500 rounded-full p-2 text-white transition-colors"
                        aria-label={`Remove ${item.name}`}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Basic Info */}
                    <h4 className="font-serif text-lg font-bold truncate">{item.name}</h4>
                    <p className="font-serif text-gold-400 text-lg font-semibold mt-1">
                      {formatINR(item.price)}
                    </p>

                    {/* Metrics Section */}
                    <div className="space-y-3 my-5 font-mono text-[11px] uppercase tracking-wider">
                      <div className="flex justify-between border-b border-zinc-500/10 py-1">
                        <span className="text-neutral-400">Gourmet Rating</span>
                        <span className="flex items-center gap-1 text-amber-500 font-bold">
                          <Star className="w-3.5 h-3.5 fill-amber-500" />
                          {item.rating.toFixed(2)} ({item.reviewsCount})
                        </span>
                      </div>
                      <div className="flex justify-between border-b border-zinc-500/10 py-1">
                        <span className="text-neutral-400">Calories</span>
                        <span className="font-bold text-neutral-200">{item.kcal} kcal</span>
                      </div>
                      <div className="flex justify-between border-b border-zinc-500/10 py-1">
                        <span className="text-neutral-400">Prep Efficiency</span>
                        <span className="font-bold text-neutral-200">{item.prepTime}</span>
                      </div>
                      <div className="flex justify-between border-b border-zinc-500/10 py-1">
                        <span className="text-neutral-400">Protein Ratio</span>
                        <span className="font-bold text-neutral-200">{item.nutritionalInfo.protein}</span>
                      </div>
                      <div className="flex justify-between border-b border-zinc-500/10 py-1">
                        <span className="text-neutral-400">Carb Count</span>
                        <span className="font-bold text-neutral-200">{item.nutritionalInfo.carbs}</span>
                      </div>
                      <div className="flex justify-between border-b border-zinc-500/10 py-1">
                        <span className="text-neutral-400">Healthy Fats</span>
                        <span className="font-bold text-neutral-200">{item.nutritionalInfo.fat}</span>
                      </div>
                    </div>

                    {/* Ingredient lists */}
                    <div className="mb-6">
                      <span className="text-xs uppercase tracking-widest text-neutral-400 block mb-1">
                        Key Composition:
                      </span>
                      <p className={`text-[11px] leading-relaxed line-clamp-2 ${isDark ? 'text-neutral-300' : 'text-neutral-600'}`}>
                        {item.ingredients.join(', ')}
                      </p>
                    </div>

                    {/* Action */}
                    <button
                      type="button"
                      onClick={() => {
                        addToCart(item);
                        setIsOpen(false);
                      }}
                      className="w-full font-mono text-[10px] tracking-widest uppercase font-bold bg-neutral-950 hover:bg-gold-400 hover:text-neutral-950 text-gold-300 border border-gold-300/30 py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 duration-300"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      Add to cart
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

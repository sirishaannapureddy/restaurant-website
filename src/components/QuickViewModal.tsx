/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { MenuItem } from '../types';
import { useRestaurantStore } from '../store/useRestaurantStore';
import { X, Heart, ShoppingBag, Clock, Flame, Star } from 'lucide-react';
import { formatINR } from '../utils/currency';

interface QuickViewModalProps {
  item: MenuItem;
  onClose: () => void;
}

export default function QuickViewModal({ item, onClose }: QuickViewModalProps) {
  const { addToCart, wishlist, toggleWishlist, theme } = useRestaurantStore();
  const isWishlisted = wishlist.includes(item.id);

  const isDark = theme === 'dark';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 30 }}
        transition={{ type: 'spring', damping: 25, stiffness: 180 }}
        className={`relative max-w-4xl w-full rounded-2xl overflow-hidden shadow-2xl z-10 border ${
          isDark ? 'bg-neutral-900 border-gold-300/20 text-white' : 'bg-white border-neutral-200 text-neutral-900'
        }`}
        id={`quickview-${item.id}`}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className={`absolute top-4 right-4 z-20 p-2 rounded-full backdrop-blur-sm transition-transform hover:scale-110 ${
            isDark ? 'bg-black/40 text-neutral-300 hover:text-white' : 'bg-neutral-100/80 text-neutral-600 hover:text-neutral-900'
          }`}
          aria-label="Close details"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid md:grid-cols-2">
          {/* Liquid Food Imagery */}
          <div className="relative h-64 md:h-full min-h-[300px] overflow-hidden group">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            {item.isBestseller && (
              <span className="absolute top-4 left-4 font-mono text-[10px] tracking-widest bg-amber-500 text-neutral-950 font-bold px-2.5 py-1 rounded-sm uppercase shadow-lg">
                Bestseller
              </span>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:hidden" />
          </div>

          {/* Detailed Info Panel */}
          <div className="p-6 md:p-8 flex flex-col justify-between">
            <div>
              {/* Star Rating & Price */}
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-1.5 font-mono text-sm text-amber-500 font-medium">
                  <Star className="w-4 h-4 fill-amber-500" />
                  <span>{item.rating.toFixed(2)}</span>
                  <span className={`font-sans text-xs ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>
                    ({item.reviewsCount} gourmet reviews)
                  </span>
                </div>
                <span className="font-serif text-2xl font-semibold text-gold-400">
                  {formatINR(item.price)}
                </span>
              </div>

              {/* Title & Tags */}
              <h3 className="font-serif text-3xl font-bold tracking-tight mb-3">
                {item.name}
              </h3>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`font-mono text-[10px] tracking-wider px-2 py-0.5 rounded-full uppercase border ${
                      isDark
                        ? 'border-neutral-800 text-neutral-400 bg-neutral-900'
                        : 'border-neutral-200 text-neutral-600 bg-neutral-100'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Description */}
              <p className={`text-sm leading-relaxed mb-6 ${isDark ? 'text-neutral-300' : 'text-neutral-600'}`}>
                {item.description}
              </p>

              {/* Nutritional Chart */}
              <div className={`p-4 rounded-xl mb-6 border ${isDark ? 'bg-neutral-950/50 border-neutral-800' : 'bg-neutral-50 border-neutral-100'}`}>
                <h4 className="font-mono text-xs tracking-wider uppercase mb-3 text-gold-400 font-bold">
                  Connoisseur Nutrition
                </h4>
                <div className="grid grid-cols-4 gap-4 text-center">
                  <div className="flex flex-col items-center">
                    <Flame className="w-4 h-4 text-amber-500 mb-1" />
                    <span className="font-mono text-xs font-bold">{item.kcal}</span>
                    <span className="text-[10px] text-neutral-400 uppercase">kcal</span>
                  </div>
                  <div>
                    <span className="block font-mono text-xs font-bold text-neutral-300">{item.nutritionalInfo.protein}</span>
                    <div className="w-full bg-neutral-800 h-1 rounded-full mt-1 overflow-hidden">
                      <div className="bg-emerald-500 h-full" style={{ width: '45%' }} />
                    </div>
                    <span className="text-[10px] text-neutral-400 uppercase">Protein</span>
                  </div>
                  <div>
                    <span className="block font-mono text-xs font-bold text-neutral-300">{item.nutritionalInfo.carbs}</span>
                    <div className="w-full bg-neutral-800 h-1 rounded-full mt-1 overflow-hidden">
                      <div className="bg-amber-500 h-full" style={{ width: '65%' }} />
                    </div>
                    <span className="text-[10px] text-neutral-400 uppercase">Carbs</span>
                  </div>
                  <div>
                    <span className="block font-mono text-xs font-bold text-neutral-300">{item.nutritionalInfo.fat}</span>
                    <div className="w-full bg-neutral-800 h-1 rounded-full mt-1 overflow-hidden">
                      <div className="bg-rose-500 h-full" style={{ width: '25%' }} />
                    </div>
                    <span className="text-[10px] text-neutral-400 uppercase">Fats</span>
                  </div>
                </div>
              </div>

              {/* Ingredients List */}
              <div className="mb-6">
                <h4 className="font-serif text-sm font-semibold mb-2">Composed Ingredients:</h4>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
                  {item.ingredients.join(', ')}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-4">
              <button
                type="button"
                onClick={() => {
                  addToCart(item);
                }}
                className="flex-1 select-none font-mono text-xs tracking-widest uppercase font-bold bg-gradient-to-r from-gold-400 to-gold-600 hover:from-gold-300 hover:to-gold-500 text-neutral-950 py-3.5 px-6 rounded-lg shadow-lg shadow-gold-950/10 flex items-center justify-center gap-2 transition-transform hover:-translate-y-0.5"
              >
                <ShoppingBag className="w-4 h-4 stroke-[2.5]" />
                Select & Add to Selection
              </button>

              <button
                type="button"
                onClick={() => toggleWishlist(item.id)}
                className={`p-3.5 rounded-lg border transition-all ${
                  isWishlisted
                    ? 'bg-rose-500/10 border-rose-500/40 text-rose-500'
                    : isDark
                      ? 'border-neutral-800 hover:border-neutral-700 text-neutral-400 hover:text-white bg-neutral-950'
                      : 'border-neutral-200 hover:border-neutral-300 text-neutral-500 hover:text-neutral-900 bg-neutral-50'
                }`}
                aria-label="Add to Wishlist"
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { MenuItem } from '../types';
import { useRestaurantStore } from '../store/useRestaurantStore';
import { Heart, Star, ShoppingBag, Eye, Scale } from 'lucide-react';
import { formatINR } from '../utils/currency';

interface FoodCardProps {
  key?: any;
  item: MenuItem;
  onQuickView: (item: MenuItem) => void;
}

export default function FoodCard({ item, onQuickView }: FoodCardProps) {
  const { addToCart, wishlist, toggleWishlist, compareList, toggleCompare, theme } = useRestaurantStore();

  const isWishlisted = wishlist.includes(item.id);
  const isCompared = compareList.some(i => i.id === item.id);
  const isDark = theme === 'dark';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className={`group relative rounded-2xl overflow-hidden shadow-lg border transition-all duration-300 hover:shadow-2xl hover:shadow-gold-950/5 hover:-translate-y-1 ${
        isDark 
          ? 'bg-neutral-900/60 border-neutral-800 hover:border-gold-300/30 text-white' 
          : 'bg-white border-neutral-200 hover:border-gold-500/40 text-neutral-900'
      }`}
      id={`food-card-${item.id}`}
    >
      {/* Top Banner Indicators */}
      <div className="absolute top-3 left-3 right-3 z-10 flex justify-between items-start pointer-events-none">
        {/* Gourmet Badges */}
        <div className="flex flex-col gap-1 pointer-events-auto">
          {item.isBestseller && (
            <span className="font-mono text-[9px] tracking-widest bg-amber-500 text-neutral-950 font-extrabold px-2 py-0.5 rounded shadow">
              BESTSELLER
            </span>
          )}
          {item.price > 599 && (
            <span className="font-mono text-[9px] tracking-widest bg-neutral-900/90 text-gold-300 font-medium border border-gold-300/30 px-2 py-0.5 rounded backdrop-blur-sm self-start">
              ELITE CHOICE
            </span>
          )}
        </div>

        {/* Favorite & Compare Triggers */}
        <div className="flex flex-col gap-1.5 pointer-events-auto">
          {/* Wishlist Heart */}
          <button
            type="button"
            onClick={() => toggleWishlist(item.id)}
            className={`p-2 rounded-full backdrop-blur-md shadow-md transition-transform hover:scale-110 active:scale-95 ${
              isWishlisted
                ? 'bg-rose-500/10 border border-rose-500/30 text-rose-500'
                : 'bg-black/40 hover:bg-black/60 text-white border border-white/10'
            }`}
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-rose-500' : ''}`} />
          </button>

          {/* Comparison Scale Tick */}
          <button
            type="button"
            onClick={() => toggleCompare(item)}
            className={`p-2 rounded-full backdrop-blur-md shadow-md transition-transform hover:scale-110 active:scale-95 ${
              isCompared
                ? 'bg-gold-500/10 border border-gold-400 text-gold-400'
                : 'bg-black/40 hover:bg-black/60 text-neutral-300 border border-white/10'
            }`}
            aria-label={isCompared ? "Remove from comparison" : "Add to comparison"}
          >
            <Scale className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Culinary Food Image with Parallax Hover */}
      <div 
        className="relative h-52 overflow-hidden cursor-pointer" 
        onClick={() => onQuickView(item)}
      >
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        {/* Shadow Mask Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
          <div className="flex gap-2">
            <span className="bg-white/95 text-neutral-950 font-mono text-[9px] tracking-widest uppercase font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" />
              Quick View
            </span>
          </div>
        </div>
      </div>

      {/* Description & Metadata Panels */}
      <div className="p-5 flex flex-col justify-between h-[190px]">
        <div>
          <div className="flex justify-between items-start gap-2 mb-1">
            <h3 
              className="font-serif text-lg font-bold truncate cursor-pointer hover:text-gold-400 transition-colors"
              onClick={() => onQuickView(item)}
            >
              {item.name}
            </h3>
            <span className="font-serif text-gold-400 font-semibold text-lg shrink-0">
              {formatINR(item.price)}
            </span>
          </div>

          <p className={`text-xs line-clamp-2 md:line-clamp-3 mb-4 leading-relaxed ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
            {item.description}
          </p>
        </div>

        {/* Action Controls & Detailed Mini stats */}
        <div className="flex justify-between items-center pt-3 border-t border-zinc-500/10 mt-auto">
          {/* Rating */}
          <div className="flex items-center gap-1 font-mono text-xs font-semibold">
            <Star className="w-3.5 h-3.5 fill-amber-500 stroke-amber-500" />
            <span className="text-amber-500">{item.rating.toFixed(1)}</span>
            <span className={`text-[10px] font-sans ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>
              ({item.reviewsCount})
            </span>
          </div>

          {/* Add to Selection */}
          <button
            type="button"
            onClick={() => addToCart(item, 1)}
            className="select-none font-mono text-[10px] tracking-widest uppercase font-bold bg-neutral-950 hover:bg-gold-400 dark:hover:bg-gold-400 hover:text-neutral-950 text-gold-300 border border-gold-300/30 px-3.5 py-2 rounded-lg flex items-center gap-1.5 transition-all duration-300"
          >
            <ShoppingBag className="w-3 h-3" />
            Add Selected
          </button>
        </div>
      </div>
    </motion.div>
  );
}

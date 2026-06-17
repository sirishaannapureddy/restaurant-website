/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useRestaurantStore } from '../store/useRestaurantStore';
import { CATEGORIES_WITH_ICONS, MENU_ITEMS } from '../data/menu';
import { MenuItem } from '../types';
import FoodCard from '../components/FoodCard';
import QuickViewModal from '../components/QuickViewModal';
import { formatINR } from '../utils/currency';
import {
  Search,
  SlidersHorizontal,
  Sparkles,
  Soup,
  Salad,
  Leaf,
  Beef,
  Flame,
  ChefHat,
  Fish,
  Coins,
  Pizza,
  Egg,
  Grid,
  ConciergeBell,
  Compass,
  CircleDot,
  Sun,
  Award,
  Globe,
  Cake,
  Cookie,
  IceCream,
  GlassWater,
  Wine,
  CupSoda,
  Coffee,
  Sunset,
  Moon,
  Smile,
  Activity,
  Layers,
  Heart,
  Eye,
  RefreshCw,
  ArrowRight
} from 'lucide-react';

const ICON_MAP: Record<string, any> = {
  Sparkles, Soup, Salad, Leaf, Beef, Flame, ChefHat, Fish, Coins, Pizza, Egg,
  Grid, ConciergeBell, Compass, CircleDot, Sun, Award, Globe, Cake, Cookie,
  IceCream, GlassWater, Wine, CupSoda, Coffee, Sunset, Moon, Smile, Activity, Layers
};

export default function Menu() {
  const { recentlyViewed, addToRecentlyViewed, theme } = useRestaurantStore();
  const [searchParams, setSearchParams] = useSearchParams();

  const isDark = theme === 'dark';

  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<MenuItem[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'rating' | 'popular'>('popular');
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  // Live Instant Search Filter for autocomplete suggestions
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    const filtered = MENU_ITEMS.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.categories.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()))
    ).slice(0, 5); // Limit suggestions to 5
    setSearchResults(filtered);
  }, [searchQuery]);

  // Sync category state with search query parameters (?category=Starters)
  useEffect(() => {
    const urlCategory = searchParams.get('category');
    if (urlCategory) {
      setActiveCategory(urlCategory);
    } else {
      setActiveCategory('All');
    }
  }, [searchParams]);

  const handleCategorySelect = (category: string) => {
    if (category === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', category);
    }
    setSearchParams(searchParams);
    
    // Trigger quick high-end skeleton simulation
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  };

  // Filter & Sort Logic
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // 1. Category search
      const matchesCategory =
        activeCategory === 'All' ||
        item.categories.some(c => c.toLowerCase() === activeCategory.toLowerCase());

      // 2. Query search
      const matchesQuery =
        !searchQuery.trim() ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        item.ingredients.some(i => i.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesQuery;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return b.reviewsCount - a.reviewsCount; // popular
    });
  }, [activeCategory, searchQuery, sortBy]);

  // Handle recently viewed listing
  const handleViewDetails = (item: MenuItem) => {
    addToRecentlyViewed(item);
    setSelectedItem(item);
  };

  // Smart Recommendations (based on active filtering category)
  const aiRecommendations = useMemo(() => {
    // Return signature items not in filtered list or general ones to match Wine pairing
    return MENU_ITEMS.filter(it => it.tags.includes('Signature') || it.isBestseller)
      .slice(0, 3);
  }, [activeCategory]);

  return (
    <div className={`pt-4 pb-12 ${isDark ? 'bg-neutral-950 text-white' : 'bg-white text-neutral-900'}`} id="menu-page-container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="font-mono text-[9px] tracking-widest uppercase text-gold-400 font-extrabold block mb-1">
            Gourmet Compendium
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold uppercase tracking-tight">
            The Grand Menu
          </h1>
          <p className={`text-xs mt-3 ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>
            Indulge your senses. Sort through our Michelin-starred culinary alignments.
          </p>
        </div>

        {/* Global search and layout controls */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8">
          {/* Searching input bar */}
          <div className="lg:col-span-2 relative">
            <div className="relative">
              <input
                type="text"
                placeholder="Search wagyu, truffle, risotto..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full font-serif text-sm backdrop-blur-md rounded-full px-6 py-4 pl-12 focus:outline-hidden focus:ring-1 focus:ring-gold-400 focus:border-gold-300 shadow-2xl transition-all ${
                  isDark
                    ? 'bg-neutral-950/80 hover:bg-neutral-900 border border-gold-400/35 text-white'
                    : 'bg-white/80 hover:bg-neutral-50 border border-gold-500/35 text-neutral-900 focus:border-gold-500'
                }`}
              />
              <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 ${isDark ? 'text-gold-300' : 'text-gold-500'}`} />
            </div>

            {/* Instant filtering popup dropdown */}
            <AnimatePresence>
              {searchQuery && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  className={`absolute top-16 left-0 right-0 border rounded-2xl shadow-2xl p-4 overflow-hidden z-30 ${
                    isDark ? 'bg-neutral-950 border-neutral-800' : 'bg-white border-neutral-200'
                  }`}
                >
                  {searchResults.length === 0 ? (
                    <p className={`text-xs font-mono py-2 ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>
                      No Michelin recipes match your parameter.
                    </p>
                  ) : (
                    <div className="space-y-2 text-left animate-in fade-in duration-200">
                      <span className="font-mono text-[9px] tracking-widest text-gold-400 uppercase font-bold block mb-2">
                        Menu Suggestions ({searchResults.length})
                      </span>
                      {searchResults.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => {
                            handleViewDetails(item);
                            setSearchQuery('');
                          }}
                          className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors ${
                            isDark ? 'hover:bg-neutral-900' : 'hover:bg-neutral-50'
                          }`}
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-10 h-10 object-cover rounded-md border border-gold-400/10"
                            referrerPolicy="no-referrer"
                          />
                          <div className="flex-1 min-w-0">
                            <span className={`block font-serif text-sm font-bold truncate ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                              {item.name}
                            </span>
                            <span className="block font-mono text-[10px] text-gold-400 font-semibold">
                              {formatINR(item.price)}
                            </span>
                          </div>
                          <button
                            type="button"
                            className="text-neutral-400 hover:text-gold-400 p-1"
                            aria-label={`View ${item.name}`}
                          >
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sorting selects */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className={`w-full font-mono text-xs px-4 py-4 rounded-xl border appearance-none focus:outline-hidden ${
                isDark ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-neutral-50 border-neutral-200 text-neutral-900'
              }`}
            >
              <option value="popular">Sort: Popularity Profile</option>
              <option value="rating">Sort: Gourmet Rating</option>
              <option value="price-asc">Sort: Price (Ascending)</option>
              <option value="price-desc">Sort: Price (Descending)</option>
            </select>
          </div>

          {/* Statistics counter */}
          <div className={`p-4 rounded-xl border flex items-center justify-between font-mono text-xs ${
            isDark ? 'bg-neutral-900/60 border-neutral-800' : 'bg-neutral-50 border-neutral-200'
          }`}>
            <span className="text-neutral-400 uppercase tracking-wider text-[10px]">Ready to Serve:</span>
            <span className="text-gold-400 font-bold">{filteredItems.length} Plates</span>
          </div>
        </div>

        {/* Categories Bar listing all 32 required filters! */}
        <div className="mb-12">
          <span className="font-mono text-[9px] tracking-widest uppercase text-neutral-400 font-semibold mb-3 block">
            Gourmet Filter Categories
          </span>
          <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-thin">
            {/* "All" categories trigger */}
            <button
              type="button"
              onClick={() => handleCategorySelect('All')}
              className={`px-4 py-2.5 rounded-full font-mono text-[10px] tracking-wider uppercase font-extrabold border transition-all shrink-0 ${
                activeCategory === 'All'
                  ? 'bg-gold-400 border-gold-400 text-neutral-950 shadow-md'
                  : isDark
                    ? 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
                    : 'bg-neutral-50 border-neutral-200 text-neutral-600 hover:text-neutral-950'
              }`}
            >
              All Selection
            </button>

            {CATEGORIES_WITH_ICONS.map((cat) => {
              const IconComp = ICON_MAP[cat.icon] || Sparkles;
              const isActive = activeCategory.toLowerCase() === cat.id.toLowerCase();

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategorySelect(cat.id)}
                  className={`px-4 py-2.5 rounded-full font-mono text-[10px] tracking-wider uppercase font-semibold border transition-all shrink-0 flex items-center gap-2 ${
                    isActive
                      ? 'bg-gold-400 border-gold-400 text-neutral-950 shadow-lg'
                      : isDark
                        ? 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
                        : 'bg-neutral-50 border-neutral-200 text-neutral-600 hover:text-neutral-950'
                  }`}
                >
                  <IconComp className="w-3.5 h-3.5" />
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dishes Grid lists */}
        <div className="min-h-[400px]">
          {loading ? (
            /* Premium Skeleton loading animations */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, idx) => (
                <div key={idx} className="animate-pulse bg-neutral-900/60 border border-neutral-800 rounded-3xl p-5 space-y-4">
                  <div className="w-full bg-neutral-800 h-44 rounded-2xl" />
                  <div className="h-5 bg-neutral-800 rounded-md w-3/4" />
                  <div className="h-4 bg-neutral-800 rounded-md w-1/2" />
                  <div className="h-3 bg-neutral-800 rounded-md w-full" />
                  <div className="flex justify-between items-center pt-3 mt-4 border-t border-neutral-800">
                    <div className="h-5 bg-neutral-800 rounded-md w-1/4" />
                    <div className="h-8 bg-neutral-800 rounded-md w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-20">
              <span className="block text-4xl mb-4">🍽️</span>
              <h3 className="font-serif text-lg font-bold mb-1">No Gastronomic Matches</h3>
              <p className={`text-xs max-w-sm mx-auto ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>
                We couldn&apos;t match any curated recipes with your search parameters. Use a filter or clear the query.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  handleCategorySelect('All');
                }}
                className="mt-6 font-mono text-[9px] tracking-widest uppercase font-extrabold text-gold-400 border border-gold-400/25 px-5 py-2 rounded-lg hover:bg-gold-400 hover:text-neutral-950 transition-colors"
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              <AnimatePresence>
                {filteredItems.map((item) => (
                  <FoodCard
                    key={item.id}
                    item={item}
                    onQuickView={handleViewDetails}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>

        {/* AI Style food suggestions section */}
        <div className={`mt-24 rounded-3xl border p-8 md:p-12 relative overflow-hidden ${
          isDark ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-neutral-50 border-neutral-200 text-neutral-900'
        }`}>
          <div className="absolute top-1/2 -left-20 w-80 h-80 bg-gold-400/5 blur-3xl rounded-full z-0" />
          <div className="absolute top-1/2 -right-20 w-80 h-80 bg-gold-400/5 blur-3xl rounded-full z-0" />

          <div className="relative z-10 text-center max-w-3xl mx-auto mb-10">
            <span className="font-mono text-[9px] tracking-widest uppercase text-gold-400 font-bold block mb-1">
              AI Connoisseur Recommendations
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-semibold uppercase tracking-tight">
              Bespoke Wine Flights & Shaved Truffle Matches
            </h3>
            <p className={`text-xs max-w-md mx-auto mt-2 leading-relaxed ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
              Our somatic algorithm has assessed your active category preference and suggests these signature companion pairings:
            </p>
          </div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {aiRecommendations.map((item) => (
              <div 
                key={item.id} 
                className={`p-5 rounded-2xl border flex items-start gap-4 transition-all hover:scale-102 cursor-pointer ${
                  isDark ? 'bg-neutral-950 border-neutral-800' : 'bg-white border-neutral-100'
                }`}
                onClick={() => handleViewDetails(item)}
              >
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-12 h-12 object-cover rounded-xl border border-gold-400/10 shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="min-w-0">
                  <h4 className="font-serif text-xs font-bold truncate">{item.name}</h4>
                  <p className="font-serif text-gold-400 text-xs font-medium mt-0.5">{formatINR(item.price)}</p>
                  <p className={`text-[10px] line-clamp-2 mt-1 ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recently Viewed Bar (Persistent storage) */}
        {recentlyViewed.length > 0 && (
          <div className="mt-20">
            <div className="border-b border-zinc-500/10 pb-3 mb-6 flex justify-between items-center font-mono">
              <span className="text-xs uppercase tracking-widest text-neutral-400">
                Recently Eyed Curations
              </span>
              <span className="text-[10px] text-neutral-500">{recentlyViewed.length} items</span>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {recentlyViewed.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleViewDetails(item)}
                  className={`p-3 rounded-xl border flex flex-col items-center text-center cursor-pointer transition-all duration-300 hover:shadow-lg ${
                    isDark ? 'bg-neutral-900 border-neutral-800 hover:border-gold-400/20' : 'bg-neutral-50 border-neutral-100 hover:border-gold-500/30'
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded-full mb-2 border border-gold-300/10"
                    referrerPolicy="no-referrer"
                  />
                  <h4 className="font-serif text-[11px] font-bold truncate w-full">{item.name}</h4>
                  <span className="font-serif text-[10px] text-gold-400 font-semibold mt-0.5">{formatINR(item.price)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Quick view overlay */}
      <AnimatePresence>
        {selectedItem && (
          <QuickViewModal
            item={selectedItem}
            onClose={() => setSelectedItem(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

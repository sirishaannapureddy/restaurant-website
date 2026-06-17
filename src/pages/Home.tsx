/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useRestaurantStore } from '../store/useRestaurantStore';
import { MENU_ITEMS, TESTIMONIALS_DATA } from '../data/menu';
import { MenuItem } from '../types';
import FoodCard from '../components/FoodCard';
import QuickViewModal from '../components/QuickViewModal';
import { formatINR } from '../utils/currency';
import {
  Star,
  Award,
  Users,
  UtensilsCrossed,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Utensils,
  Clock
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const HERO_IMAGES = [
  {
    url: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=1600',
    title: 'The Epoch of Gastronomy',
    subtitle: 'Where Masterful Senses Converge'
  },
  {
    url: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&q=80&w=1600',
    title: 'Alba Saffron Perfection',
    subtitle: 'Harvested from Prime Iranian Farms'
  },
  {
    url: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=1600',
    title: 'White Truffle Symphonies',
    subtitle: 'Shaved at Your Table Under Candlelight'
  },
  {
    url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=1600',
    title: 'Epicurean Salon Evenings',
    subtitle: 'Parisian Charm Reborn'
  }
];

export default function Home() {
  const { theme, addToCart, addToast } = useRestaurantStore();
  const navigate = useNavigate();

  const isDark = theme === 'dark';

  // State
  const [activeHero, setActiveHero] = useState(0);
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  // Auto rotating hero slideshow
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveHero((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Testimonial Navigation
  const handleNextTestimonial = () => {
    setTestimonialIdx((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
  };
  const handlePrevTestimonial = () => {
    setTestimonialIdx((prev) => (prev - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length);
  };

  // Featured Dishes selection (Bento Style mapping)
  const bentoDishes = MENU_ITEMS.slice(0, 4); 
  const trendingDishes = MENU_ITEMS.filter(i => i.isBestseller).slice(0, 4);
  const chefRecommendations = MENU_ITEMS.filter(i => i.tags.includes('Signature') || i.price > 60).slice(0, 3);

  return (
    <div className="relative" id="home-page-container">
      {/* 1. Full Screen Parallax Rotating Hero Section */}
      <section className="relative h-[calc(100vh-5rem)] min-h-[600px] overflow-hidden flex items-center justify-center">
        {/* Carousel Background */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeHero}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0 z-0"
          >
            <div className="absolute inset-0 bg-neutral-950/65 z-10" />
            <img
              src={HERO_IMAGES[activeHero].url}
              alt="Culinary artwork background"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </AnimatePresence>

        {/* Hero Content Panel */}
        <div className="relative z-25 text-center max-w-4xl px-4 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-1 bg-gold-400/10 border border-gold-400/30 px-3.5 py-1.5 rounded-full mb-6 relative hover:scale-105 duration-300 transition-transform"
          >
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span className="font-mono text-[9px] tracking-widest uppercase text-gold-300 font-bold">
              3 Michelin Stars Award Winner
            </span>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.h1
              key={activeHero}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6 }}
              className="font-serif text-5xl sm:text-7xl font-semibold tracking-tight text-white mb-4 uppercase drop-shadow-xl"
            >
              {HERO_IMAGES[activeHero].title}
            </motion.h1>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.p
              key={activeHero + '-p'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="font-serif italic text-lg sm:text-xl text-neutral-300 max-w-xl mb-12 drop-shadow-md"
            >
              {HERO_IMAGES[activeHero].subtitle}
            </motion.p>
          </AnimatePresence>


        </div>

        {/* Floating Indicator Dots */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {HERO_IMAGES.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveHero(idx)}
              className={`h-1 rounded-full transition-all duration-300 ${activeHero === idx ? 'w-8 bg-gold-400' : 'w-2 bg-neutral-600'}`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* 2. Bento-Style Featured Dishes Section */}
      <section className={`py-24 ${isDark ? 'bg-neutral-950' : 'bg-neutral-50Text'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-[10px] tracking-widest uppercase text-gold-400 font-extrabold block mb-2">
              Our Signatures
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-neutral-100 dark:text-neutral-100 light:text-neutral-900 font-bold mb-4">
              Featured Bento Compositions
            </h2>
            <p className={`text-xs max-w-lg mx-auto leading-relaxed ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>
              Every plate is a synthesis of historical heritage and high-precision modern culinary techniques.
            </p>
          </div>

          {/* Bento grid layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Bento Block 1 - Large Star */}
            <div className={`md:col-span-2 relative rounded-3xl overflow-hidden shadow-xl border min-h-[350px] flex flex-col justify-end p-8 group ${
              isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200 text-neutral-900'
            }`}>
              <div className="absolute inset-0 z-0 overflow-hidden">
                <div className="absolute inset-0 bg-neutral-950/70 z-10 transition-opacity duration-500 group-hover:bg-neutral-950/60" />
                <img
                  src={bentoDishes[1]?.image}
                  alt={bentoDishes[1]?.name || 'Gourmet steak'}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="relative z-20 max-w-md text-white">
                <span className="font-mono text-[9px] tracking-widest uppercase bg-gold-400 text-neutral-950 px-2 py-0.5 rounded font-black">
                  Elite Masterpiece
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-semibold mt-3 mb-2">{bentoDishes[1]?.name}</h3>
                <p className="text-xs text-neutral-300 mb-6 leading-relaxed line-clamp-2">{bentoDishes[1]?.description}</p>
                <div className="flex items-center gap-4">
                  <span className="font-serif text-gold-300 font-bold text-xl">{bentoDishes[1] ? formatINR(bentoDishes[1].price) : ''}</span>
                  <button
                    type="button"
                    onClick={() => {
                      if (bentoDishes[1]) addToCart(bentoDishes[1]);
                    }}
                    className="font-mono text-[9px] tracking-widest uppercase font-bold text-neutral-950 bg-white px-4 py-2 rounded-full hover:bg-gold-400 transition-colors"
                  >
                    Reserve Portion
                  </button>
                </div>
              </div>
            </div>

            {/* Bento Block 2 */}
            <div className={`relative rounded-3xl overflow-hidden shadow-xl border p-6 flex flex-col justify-between group ${
              isDark ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-neutral-200 text-neutral-900'
            }`}>
              <div className="relative h-44 rounded-xl overflow-hidden mb-4">
                <img
                  src={bentoDishes[0]?.image}
                  alt={bentoDishes[0]?.name || 'Saffron Risotto'}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <span className="font-mono text-[9px] tracking-widest uppercase text-gold-400 font-bold">Chef pick</span>
                <h4 className="font-serif text-lg font-bold mt-1 mb-1">{bentoDishes[0]?.name}</h4>
                <p className={`text-xs line-clamp-2 leading-relaxed ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>{bentoDishes[0]?.description}</p>
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className="font-serif text-gold-400 font-bold text-lg">{bentoDishes[0] ? formatINR(bentoDishes[0].price) : ''}</span>
                <button
                  type="button"
                  onClick={() => {
                    if (bentoDishes[0]) addToCart(bentoDishes[0]);
                  }}
                  className="font-mono text-[9px] tracking-widest uppercase font-bold text-gold-300 hover:text-white"
                >
                  Add Selection &rarr;
                </button>
              </div>
            </div>

            {/* Bento Block 3 */}
            <div className={`relative rounded-3xl overflow-hidden shadow-xl border p-6 flex flex-col justify-between group ${
              isDark ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-neutral-200 text-neutral-900'
            }`}>
              <div className="relative h-44 rounded-xl overflow-hidden mb-4 font-serif">
                <img
                  src={bentoDishes[2]?.image}
                  alt={bentoDishes[2]?.name || 'Classic soup'}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <span className="font-mono text-[9px] tracking-widest uppercase text-gold-400 font-bold">Trending Velvet</span>
                <h4 className="font-serif text-lg font-bold mt-1 mb-1">{bentoDishes[2]?.name}</h4>
                <p className={`text-xs line-clamp-2 leading-relaxed ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>{bentoDishes[2]?.description}</p>
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className="font-serif text-gold-400 font-bold text-lg">{bentoDishes[2] ? formatINR(bentoDishes[2].price) : ''}</span>
                <button
                  type="button"
                  onClick={() => {
                    if (bentoDishes[2]) addToCart(bentoDishes[2]);
                  }}
                  className="font-mono text-[9px] tracking-widest uppercase font-bold text-gold-300 hover:text-white"
                >
                  Add Selection &rarr;
                </button>
              </div>
            </div>

            {/* Bento Block 4 - Large Sweet */}
            <div className={`md:col-span-2 relative rounded-3xl overflow-hidden shadow-xl border min-h-[350px] flex flex-col justify-end p-8 group ${
              isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200 text-neutral-900'
            }`}>
              <div className="absolute inset-0 z-0 overflow-hidden">
                <div className="absolute inset-0 bg-neutral-950/70 z-10 transition-opacity duration-500 group-hover:bg-neutral-950/60" />
                <img
                  src={bentoDishes[3]?.image}
                  alt={bentoDishes[3]?.name || 'Caviar Foie Macaron'}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="relative z-20 max-w-md text-white">
                <span className="font-mono text-[9px] tracking-widest uppercase bg-gold-400 text-neutral-950 px-2 py-0.5 rounded font-black">
                  Appetizing Contrast
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-semibold mt-3 mb-2">{bentoDishes[3]?.name}</h3>
                <p className="text-xs text-neutral-300 mb-6 leading-relaxed line-clamp-2">{bentoDishes[3]?.description}</p>
                <div className="flex items-center gap-4">
                  <span className="font-serif text-gold-300 font-bold text-xl">{bentoDishes[3] ? formatINR(bentoDishes[3].price) : ''}</span>
                  <button
                    type="button"
                    onClick={() => {
                      if (bentoDishes[3]) addToCart(bentoDishes[3]);
                    }}
                    className="font-mono text-[9px] tracking-widest uppercase font-bold text-neutral-950 bg-white px-4 py-2 rounded-full hover:bg-gold-400 transition-colors"
                  >
                    Reserve Portion
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Chef’s Special Recommendations Section (Parallax Banner style) */}
      <section className="relative h-[480px] bg-neutral-950 overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-neutral-900/80 z-10" />
          <img
            src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=1600"
            alt="Chef Preparing Plates in Kitchen"
            className="w-full h-full object-cover opacity-50 parallax-bg"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="relative z-20 text-center max-w-4xl px-4 flex flex-col items-center">
          <UtensilsCrossed className="w-8 h-8 text-gold-400 mb-4" />
          <span className="font-mono text-[9px] tracking-widest uppercase text-gold-400 font-extrabold mb-2 block">
            Aesthetic Epicurean Vision
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6 uppercase">
            Chef de Cuisine Special Flight
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 max-w-2xl font-serif italic mb-10 leading-relaxed">
            &ldquo;We do not merely plate dishes. We invoke memory, craft sensory sculptures, and stage fine harmonies for wine-enthusiast banquets our guests never fail to remember.&rdquo;
          </p>

          <div className="flex gap-4">
            <Link
              to="/menu"
              className="bg-gold-400 hover:bg-gold-300 text-neutral-950 font-mono text-[10px] tracking-widest uppercase font-extrabold px-6 py-3.5 rounded-lg transition-transform duration-300 shadow-xl"
            >
              Examine Grand Selection
            </Link>
            <Link
              to="/reservations"
              className="font-mono text-[10px] tracking-widest uppercase font-extrabold text-white border border-white/20 px-6 py-3.5 rounded-lg hover:bg-white/10 transition-transform duration-300"
            >
              Book Salon Seating
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Trending / Bestseller Dishes Section */}
      <section className={`py-24 ${isDark ? 'bg-neutral-900/40' : 'bg-neutral-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
            <div>
              <span className="font-mono text-[10px] tracking-widest uppercase text-gold-400 font-extrabold block mb-2">
                Gastronome Favs
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-100 dark:text-neutral-100 light:text-neutral-900">
                Trending Gourmet Selections
              </h2>
            </div>
            <Link
              to="/menu"
              className="font-mono text-[10px] tracking-widest uppercase font-extrabold text-gold-400 hover:text-gold-300"
            >
              Browse Extended Catalog &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingDishes.map((item) => (
              <FoodCard
                key={item.id}
                item={item}
                onQuickView={(it) => setSelectedItem(it)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 6. Customer Reviews and Testimonial Carousel */}
      <section className={`py-24 ${isDark ? 'bg-neutral-950' : 'bg-white'}`}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="font-mono text-[10px] tracking-widest uppercase text-gold-400 font-extrabold block mb-2">
            Plaudits
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-12 text-neutral-150 dark:text-neutral-100 light:text-neutral-900">
            Praise from the Connoisseur Circle
          </h2>

          <div className="relative min-h-[300px] flex flex-col justify-center items-center">
            {/* Testimonial Panel */}
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonialIdx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                {/* Avatar */}
                <img
                  src={TESTIMONIALS_DATA[testimonialIdx].avatar}
                  alt={TESTIMONIALS_DATA[testimonialIdx].name}
                  className="w-16 h-16 rounded-full object-cover mx-auto border-2 border-gold-400"
                  referrerPolicy="no-referrer"
                />

                {/* Stars */}
                <div className="flex justify-center gap-1">
                  {[...Array(TESTIMONIALS_DATA[testimonialIdx].rating)].map((_, i) => (
                    <Star key={i} className="w-4.5 h-4.5 fill-amber-500 stroke-amber-500" />
                  ))}
                </div>

                <p className="font-serif italic text-lg sm:text-xl text-neutral-300 leading-relaxed max-w-3xl">
                  &ldquo;{TESTIMONIALS_DATA[testimonialIdx].comment}&rdquo;
                </p>

                <div>
                  <h4 className="font-serif font-bold text-md text-white">
                    {TESTIMONIALS_DATA[testimonialIdx].name}
                  </h4>
                  <span className="font-mono text-[9px] tracking-widest uppercase text-neutral-500 block mt-1">
                    {TESTIMONIALS_DATA[testimonialIdx].role}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Testimonials Controls */}
            <div className="flex gap-4 mt-12 justify-center">
              <button
                type="button"
                onClick={handlePrevTestimonial}
                className="p-2.5 rounded-full border border-neutral-800 hover:border-gold-400/30 text-neutral-400 hover:text-gold-400 transition-colors cursor-pointer"
                aria-label="Previous Review"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNextTestimonial}
                className="p-2.5 rounded-full border border-neutral-800 hover:border-gold-400/30 text-neutral-400 hover:text-gold-400 transition-colors cursor-pointer"
                aria-label="Next Review"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Statistics Section */}
      <section className="py-20 bg-neutral-950 border-t border-b border-neutral-900 font-mono text-center">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-1">
              <Users className="w-6 h-6 text-gold-300 mx-auto mb-2" />
              <div className="font-serif text-3xl sm:text-4xl font-extrabold text-white">12K+</div>
              <div className="text-[10px] tracking-widest uppercase text-neutral-400">Happy Connoisseurs</div>
            </div>
            <div className="space-y-1">
              <Utensils className="w-6 h-6 text-gold-300 mx-auto mb-2" />
              <div className="font-serif text-3xl sm:text-4xl font-extrabold text-white">45K+</div>
              <div className="text-[10px] tracking-widest uppercase text-neutral-400">Masterful Portions Served</div>
            </div>
            <div className="space-y-1">
              <Award className="w-6 h-6 text-gold-300 mx-auto mb-2" />
              <div className="font-serif text-3xl sm:text-4xl font-extrabold text-white">18+</div>
              <div className="text-[10px] tracking-widest uppercase text-neutral-400">Celestial Awards Gained</div>
            </div>
            <div className="space-y-1">
              <Clock className="w-6 h-6 text-gold-300 mx-auto mb-2" />
              <div className="font-serif text-3xl sm:text-4xl font-extrabold text-white">25 Yr</div>
              <div className="text-[10px] tracking-widest uppercase text-neutral-400">Aethelwood culinary heritage</div>
            </div>
          </div>
        </div>
      </section>

      {/* Infinite Image Carousel of Culinary Textures */}
      <section className="py-12 bg-neutral-950 overflow-hidden relative">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-neutral-950 to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-neutral-950 to-transparent z-10" />
        <div className="flex gap-4 animate-marquee whitespace-nowrap">
          {MENU_ITEMS.map((item, idx) => (
            <div key={idx} className="w-36 h-36 shrink-0 rounded-2xl overflow-hidden border border-gold-400/10 inline-block relative group">
              <img src={item.image} alt="Gourmet texture preview" className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105" referrerPolicy="no-referrer" />
            </div>
          ))}
        </div>
      </section>

      {/* Quick View Overlays */}
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

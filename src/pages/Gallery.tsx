/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useRestaurantStore } from '../store/useRestaurantStore';
import { GALLERY_ITEMS } from '../data/menu';
import { X, Eye, ChevronLeft, ChevronRight, Sliders, Image as ImageIcon } from 'lucide-react';

export default function Gallery() {
  const { theme } = useRestaurantStore();
  const isDark = theme === 'dark';

  // State
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filters = [
    { id: 'all', label: 'All Curations' },
    { id: 'food', label: 'Culinary Art' },
    { id: 'interiors', label: 'Gold Salons & Atriums' },
    { id: 'chefs', label: 'Chef de Cuisine Craft' },
    { id: 'dining', label: 'Banquets & Dining' }
  ];

  // Filter Items
  const filteredGallery = useMemo(() => {
    if (activeFilter === 'all') return GALLERY_ITEMS;
    return GALLERY_ITEMS.filter((item) => item.category === activeFilter);
  }, [activeFilter]);

  // Lightbox Navigation
  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    const prevIdx = (lightboxIndex - 1 + filteredGallery.length) % filteredGallery.length;
    setLightboxIndex(prevIdx);
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    const nextIdx = (lightboxIndex + 1) % filteredGallery.length;
    setLightboxIndex(nextIdx);
  };

  return (
    <div className={`pt-4 pb-12 ${isDark ? 'bg-neutral-950 text-white' : 'bg-white text-neutral-900'}`} id="gallery-page-container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="font-mono text-[9px] tracking-widest uppercase text-gold-400 font-extrabold block mb-1">
            Visual Senses
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold uppercase tracking-tight">
            The Gallery Salon
          </h1>
          <p className={`text-xs mt-3 ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>
            Examine our high-end plates, elegant glass dining rooms, and sommelier cellars in crystal resolution.
          </p>
        </div>

        {/* Gallery Filter Tabs */}
        <div className="flex justify-center flex-wrap gap-2.5 mb-12">
          {filters.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveFilter(tab.id)}
              className={`px-4.5 py-2.5 rounded-full font-mono text-[10px] tracking-wider uppercase font-bold border transition-all ${
                activeFilter === tab.id
                  ? 'bg-gold-300 border-gold-300 text-neutral-950 shadow-md'
                  : isDark
                    ? 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
                    : 'bg-neutral-50 border-neutral-200 text-neutral-600 hover:text-neutral-950'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Masonry-Style Custom Columns Grid with hover zoom effects */}
        <motion.div
          layout
          className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
        >
          <AnimatePresence>
            {filteredGallery.map((item, index) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="break-inside-avoid relative rounded-2xl overflow-hidden shadow-md group cursor-pointer border border-gold-400/5 group"
                onClick={() => setLightboxIndex(index)}
              >
                {/* Food Image */}
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-auto object-cover rounded-2xl transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />

                {/* Overlaid Info panel on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white rounded-2xl">
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="font-mono text-[9px] tracking-widest text-gold-400 uppercase font-bold block mb-1">
                        {item.category}
                      </span>
                      <h3 className="font-serif text-lg font-bold truncate pr-4">
                        {item.title}
                      </h3>
                      <p className="text-[10px] text-neutral-300 line-clamp-1">
                        {item.subtitle}
                      </p>
                    </div>
                    {/* Expand icon */}
                    <div className="p-2 border border-white/20 rounded-full hover:bg-white text-white hover:text-neutral-950 transition-colors">
                      <Eye className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* 2. Lightbox overlay slide-show popup */}
        <AnimatePresence>
          {lightboxIndex !== null && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md">
              <button
                type="button"
                onClick={() => setLightboxIndex(null)}
                className="absolute top-6 right-6 p-2 rounded-full border border-white/20 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Exit full screen slideshow"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Slider controls */}
              <button
                type="button"
                onClick={handlePrevImage}
                className="absolute left-6 p-3.5 rounded-full border border-white/10 text-neutral-400 hover:text-white hover:border-white/35 transition-all cursor-pointer"
                aria-label="Previous image block"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Central image wrapper */}
              <motion.div
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="max-w-4xl max-h-[75vh] px-4 text-center flex flex-col items-center"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={filteredGallery[lightboxIndex].url}
                  alt={filteredGallery[lightboxIndex].title}
                  className="max-h-[60vh] object-contain rounded-xl border border-gold-300/10 shadow-2xl mx-auto"
                  referrerPolicy="no-referrer"
                />

                <div className="mt-6 text-white text-center">
                  <span className="font-mono text-[9px] tracking-widest uppercase text-gold-400 font-extrabold">
                    {filteredGallery[lightboxIndex].category}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold mt-1.5">
                    {filteredGallery[lightboxIndex].title}
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1 max-w-lg mx-auto">
                    {filteredGallery[lightboxIndex].subtitle}
                  </p>
                </div>
              </motion.div>

              <button
                type="button"
                onClick={handleNextImage}
                className="absolute right-6 p-3.5 rounded-full border border-white/10 text-neutral-400 hover:text-white hover:border-white/35 transition-all cursor-pointer"
                aria-label="Next image block"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Bottom slide counts tracking */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-neutral-500 font-mono text-xs">
                {lightboxIndex + 1} / {filteredGallery.length} Combined Curations
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

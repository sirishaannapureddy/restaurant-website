/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useRestaurantStore } from '../store/useRestaurantStore';
import { MENU_ITEMS } from '../data/menu';
import FoodCard from '../components/FoodCard';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Wishlist() {
  const { wishlist, toggleWishlist, theme, addToast } = useRestaurantStore();
  const isDark = theme === 'dark';

  // Map the favorited IDs into full MenuItems
  const favoritedDishes = useMemo(() => {
    return MENU_ITEMS.filter((item) => wishlist.includes(item.id));
  }, [wishlist]);

  return (
    <div className={`pt-4 pb-12 ${isDark ? 'bg-neutral-950 text-white' : 'bg-white text-neutral-900'}`} id="wishlist-page-container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="font-mono text-[9px] tracking-widest uppercase text-gold-400 font-extrabold block mb-1">
            Elite Picks
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold uppercase tracking-tight">
            Your Wishlist
          </h1>
          <p className={`text-xs mt-3 ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>
            Bespoke recipes compiled for swift reference. Prepare your personal dining banquet.
          </p>
        </div>

        {/* Condition A: No bookmarked dishes */}
        {favoritedDishes.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-zinc-500/15 rounded-3xl max-w-md mx-auto p-8">
            <div className="w-16 h-16 rounded-full bg-rose-500/5 border border-rose-500/15 flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-rose-500/30" />
            </div>
            <h3 className="font-serif text-lg font-bold mb-1">Your Wishlist is Empty</h3>
            <p className={`text-xs max-w-sm mx-auto leading-relaxed ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>
              Establish bookmarks on our gourmet files by tapping on the heart icon of any grand recipe.
            </p>
            <Link
              to="/menu"
              className="mt-6 inline-flex font-mono text-[10px] tracking-widest uppercase font-extrabold bg-gold-400 text-neutral-950 px-6 py-2.5 rounded-lg hover:bg-gold-300 transition-colors cursor-pointer"
            >
              Examine Grand Dishes
            </Link>
          </div>
        ) : (
          /* Condition B: Grid display of favorites */
          <div className="space-y-8">
            <div className="flex justify-between items-center border-b border-zinc-700/20 pb-4 font-mono text-xs">
              <span className="text-neutral-400 uppercase tracking-widest">Saved Curations</span>
              <span className="text-gold-400 font-bold">{favoritedDishes.length} Items Listed</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <AnimatePresence>
                {favoritedDishes.map((item) => (
                  <div key={item.id} className="relative">
                    <FoodCard
                      item={item}
                      onQuickView={() => {}}
                    />
                    
                    {/* Floating quick delete button for direct wishlist removal */}
                    <button
                      type="button"
                      onClick={() => {
                        toggleWishlist(item.id);
                      }}
                      className="absolute bottom-16 left-3.5 bg-neutral-950/90 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/10 p-2 rounded-lg transition-all text-xs flex items-center gap-1 shadow-md hover:scale-102"
                      aria-label={`Discard ${item.name} from wishlist`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span className="font-mono text-[9px] font-bold uppercase tracking-wide">Discard</span>
                    </button>
                  </div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

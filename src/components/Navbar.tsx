/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useRestaurantStore } from '../store/useRestaurantStore';
import {
  Menu,
  X,
  ShoppingBag,
  Moon,
  Sun,
  Scale,
  Sparkles,
  ChevronDown,
  Heart,
  Grid
} from 'lucide-react';
import CartDrawer from './CartDrawer';

export default function Navbar() {
  const { cart, compareList, wishlist, theme, toggleTheme } = useRestaurantStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const navigate = useNavigate();

  const isDark = theme === 'dark';
  const cartCount = cart.reduce((acc, val) => acc + val.quantity, 0);

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Menu', path: '/menu' },
    { label: 'About', path: '/about' },
    { label: 'Offers & Combos', path: '/offers' },
    { label: 'Reservations', path: '/reservations' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'FAQ', path: '/faq' },
    { label: 'Contact', path: '/contact' },
    { label: 'Track Order', path: '/track-order' }
  ];

  // Mega Menu groupings for 32 categories!
  const megaMenuCategories = {
    plates: [
      { name: 'Starters', path: '/menu?category=Starters' },
      { name: 'Soups', path: '/menu?category=Soups' },
      { name: 'Salads', path: '/menu?category=Salads' },
      { name: 'Vegetarian', path: '/menu?category=Vegetarian' },
      { name: 'Non-Vegetarian', path: '/menu?category=Non-Vegetarian' },
      { name: 'Breakfast', path: '/menu?category=Breakfast' },
      { name: 'Lunch', path: '/menu?category=Lunch' },
      { name: 'Dinner', path: '/menu?category=Dinner' }
    ],
    mains: [
      { name: 'Chicken', path: '/menu?category=Chicken' },
      { name: 'Mutton', path: '/menu?category=Mutton' },
      { name: 'Seafood', path: '/menu?category=Seafood' },
      { name: 'Biryani', path: '/menu?category=Biryani' },
      { name: 'Pizza', path: '/menu?category=Pizza' },
      { name: 'Burgers', path: '/menu?category=Burgers' },
      { name: 'Sandwiches', path: '/menu?category=Sandwiches' },
      { name: 'Pasta', path: '/menu?category=Pasta' },
      { name: 'Noodles', path: '/menu?category=Noodles' },
      { name: 'Rice Bowls', path: '/menu?category=Rice Bowls' }
    ],
    specialized: [
      { name: 'South Indian', path: '/menu?category=South Indian' },
      { name: 'North Indian', path: '/menu?category=North Indian' },
      { name: 'Chinese', path: '/menu?category=Chinese' },
      { name: 'Continental', path: '/menu?category=Continental' },
      { name: 'Kids Special', path: '/menu?category=Kids Special' },
      { name: 'Healthy Meals', path: '/menu?category=Healthy Meals' },
      { name: 'Combo Meals', path: '/menu?category=Combo Meals' }
    ],
    dessertsAndBeverages: [
      { name: 'Desserts', path: '/menu?category=Desserts' },
      { name: 'Cakes', path: '/menu?category=Cakes' },
      { name: 'Ice Creams', path: '/menu?category=Ice Creams' },
      { name: 'Mocktails', path: '/menu?category=Mocktails' },
      { name: 'Juices', path: '/menu?category=Juices' },
      { name: 'Soft Drinks', path: '/menu?category=Soft Drinks' },
      { name: 'Coffee', path: '/menu?category=Coffee' },
      { name: 'Tea', path: '/menu?category=Tea' }
    ]
  };

  const activeLinkStyle = ({ isActive }: { isActive: boolean }) => 
    `font-semibold text-xs tracking-widest uppercase py-2 border-b-2 transition-all duration-300 ${
      isActive 
        ? 'border-gold-400 text-gold-400' 
        : 'border-transparent text-neutral-300 hover:text-gold-300 hover:border-gold-400/30'
    }`;

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isDark 
            ? 'bg-neutral-950/80 border-b border-neutral-900 shadow-xl backdrop-blur-md' 
            : 'bg-white/80 border-b border-neutral-100 shadow-md backdrop-blur-md text-neutral-900'
        }`}
        id="lux-app-header"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Gastronomical Brand Emblem */}
            <Link to="/" className="flex items-center gap-2 group shrink-0">
              <span className="w-9 h-9 border border-gold-400/50 flex items-center justify-center font-serif font-bold text-gold-400 rounded-lg group-hover:scale-115 transition-transform">
                G
              </span>
              <div className="flex flex-col">
                <span className="font-serif font-extrabold text-lg tracking-widest uppercase text-gold-400 leading-none">
                  {/* L&apos;Ambroisie */}
                  The Grand Table
                </span>
                <span className="text-[8px] font-mono tracking-widest text-neutral-400 uppercase">
                  Michelin Celestial dining
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-4 xl:gap-6 header-navigation">
              {/* Home Path */}
              <NavLink to="/" className={activeLinkStyle}>Home</NavLink>

              {/* Mega-Menu Container Link */}
              <div 
                className="relative cursor-pointer py-2 group/mega"
                onMouseEnter={() => setMegaMenuOpen(true)}
                onMouseLeave={() => setMegaMenuOpen(false)}
              >
                <div className="flex items-center gap-1 font-semibold text-xs tracking-widest text-neutral-300 group-hover/mega:text-gold-400 uppercase transition-colors">
                  <span>Grand Menu</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${megaMenuOpen ? 'rotate-180' : ''}`} />
                </div>

                {/* Celestial Grand Mega Menu */}
                {megaMenuOpen && (
                  <div className={`absolute top-full -left-44 w-[760px] rounded-2xl shadow-2xl border p-6 grid grid-cols-4 gap-6 animate-fade-in z-50 transition-all ${
                    isDark ? 'bg-neutral-950 border-neutral-800 text-white' : 'bg-neutral-50 border-neutral-200 text-neutral-900'
                  }`}>
                    {/* Column 1 - Starters & Days */}
                    <div>
                      <h4 className="font-serif text-[11px] tracking-widest uppercase text-gold-400 font-extrabold mb-3 border-b border-zinc-500/10 pb-1">
                        Courses
                      </h4>
                      <ul className="space-y-1.5 font-mono text-[9px]">
                        {megaMenuCategories.plates.map((cat) => (
                          <li key={cat.name}>
                            <Link 
                              to={cat.path} 
                              className={`block py-1 hover:text-gold-400 transition-colors ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}
                            >
                              {cat.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Column 2 - Main Dishes */}
                    <div>
                      <h4 className="font-serif text-[11px] tracking-widest uppercase text-gold-400 font-extrabold mb-3 border-b border-zinc-500/10 pb-1">
                        Mains
                      </h4>
                      <ul className="space-y-1.5 font-mono text-[9px]">
                        {megaMenuCategories.mains.map((cat) => (
                          <li key={cat.name}>
                            <Link 
                              to={cat.path} 
                              className={`block py-1 hover:text-gold-400 transition-colors ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}
                            >
                              {cat.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Column 3 - Curated Regionals */}
                    <div>
                      <h4 className="font-serif text-[11px] tracking-widest uppercase text-gold-400 font-extrabold mb-3 border-b border-zinc-500/10 pb-1">
                        Regional
                      </h4>
                      <ul className="space-y-1.5 font-mono text-[9px]">
                        {megaMenuCategories.specialized.map((cat) => (
                          <li key={cat.name}>
                            <Link 
                              to={cat.path} 
                              className={`block py-1 hover:text-gold-400 transition-colors ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}
                            >
                              {cat.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Column 4 - Shakes, Cakes & Coffee */}
                    <div>
                      <h4 className="font-serif text-[11px] tracking-widest uppercase text-gold-400 font-extrabold mb-3 border-b border-zinc-500/10 pb-1">
                        Sweets & Drinks
                      </h4>
                      <ul className="space-y-1.5 font-mono text-[9px]">
                        {megaMenuCategories.dessertsAndBeverages.map((cat) => (
                          <li key={cat.name}>
                            <Link 
                              to={cat.path} 
                              className={`block py-1 hover:text-gold-400 transition-colors ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}
                            >
                              {cat.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              {/* Other standard nav paths */}
              <NavLink to="/about" className={activeLinkStyle}>About</NavLink>
              <NavLink to="/offers" className={activeLinkStyle}>Offers</NavLink>
              <NavLink to="/reservations" className={activeLinkStyle}>Reservations</NavLink>
              <NavLink to="/gallery" className={activeLinkStyle}>Gallery</NavLink>
              <NavLink to="/faq" className={activeLinkStyle}>FAQ</NavLink>
              <NavLink to="/contact" className={activeLinkStyle}>Contact</NavLink>
              <NavLink to="/track-order" className={activeLinkStyle}>Track Order</NavLink>
            </nav>

            {/* Right Hand Actions */}
            <div className="flex items-center gap-3">
              {/* Dark/Light mode selector */}
              <button
                type="button"
                onClick={toggleTheme}
                className={`p-2 rounded-full border transition-all hover:scale-105 ${
                  isDark ? 'border-neutral-800 text-yellow-400 bg-neutral-900' : 'border-neutral-100 text-neutral-600 bg-neutral-50 hover:bg-neutral-100'
                }`}
                aria-label="Toggle visual theme color profile"
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              {/* Wishlist Hearts */}
              <Link
                to="/wishlist"
                className={`p-2 rounded-full border transition-all hover:scale-105 relative hidden sm:flex ${
                  isDark ? 'border-neutral-800 text-rose-400 bg-neutral-900' : 'border-neutral-200 text-neutral-500 bg-neutral-50'
                }`}
                aria-label="Go to elite bookmarks"
              >
                <Heart className="w-4 h-4" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[8px] font-bold text-white font-mono">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Cart Selection */}
              <button
                type="button"
                onClick={() => setCartOpen(true)}
                className="select-none font-mono text-[10px] tracking-widest uppercase font-extrabold bg-neutral-950 dark:bg-neutral-950 text-gold-300 border border-gold-400/30 px-4 py-2.5 rounded-xl hover:bg-gold-400 hover:text-neutral-950 transition-colors flex items-center gap-2 cursor-pointer shadow-lg"
              >
                <ShoppingBag className="w-4 h-4 stroke-[2]" />
                <span className="hidden sm:inline">Collection</span>
                <span className="bg-gold-500 text-neutral-950 px-2 py-0.5 rounded-full font-bold">
                  {cartCount}
                </span>
              </button>

              {/* Mobile Menu Action */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`lg:hidden p-2 rounded-full border ${
                  isDark ? 'border-neutral-800 text-neutral-400 bg-neutral-900' : 'border-neutral-200 text-neutral-600 bg-neutral-50'
                }`}
                aria-label="Toggle navigation drawer"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer Overlay */}
        {mobileMenuOpen && (
          <div className={`lg:hidden border-t px-6 py-4 space-y-2 animate-fade-in ${
            isDark ? 'bg-neutral-950 border-neutral-900 text-white' : 'bg-white border-neutral-200 text-neutral-900'
          }`}>
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) => 
                  `block py-3 font-mono text-[10px] tracking-widest uppercase border-b border-neutral-900/5 ${
                    isActive ? 'text-gold-400 font-bold' : 'text-neutral-400 hover:text-gold-300'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        )}
      </header>

      {/* Cart Drawer Component */}
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}

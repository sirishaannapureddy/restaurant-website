/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { useRestaurantStore } from '../store/useRestaurantStore';
import { X, ShoppingBag, Plus, Minus, Trash2, Clock, Truck, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { formatINR } from '../utils/currency';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { cart, updateQuantity, removeFromCart, placeOrder, theme, addToast } = useRestaurantStore();
  const navigate = useNavigate();

  const isDark = theme === 'dark';

  if (!isOpen) return null;

  // Pricing calculations
  const subtotal = cart.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0);
  const deliveryFee = subtotal === 0 ? 0 : subtotal >= 799 ? 0 : 99;
  const tax = parseFloat((subtotal * 0.05).toFixed(2));
  const total = subtotal + deliveryFee + tax;

  const handleCheckout = () => {
    if (cart.length === 0) {
      addToast('Your gourmet selection is empty!', 'error');
      return;
    }
    // Auto place simulation
    placeOrder('45 Avenue de l`Opéra, Paris Royale VIP Suburbs', '+33 6 452 795');
    onClose();
    // Redirect to Track Order page
    navigate('/track-order');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-neutral-950/85 backdrop-blur-xs transition-opacity"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex">
        {/* Drawer Panel */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 220 }}
          className={`w-screen max-w-md h-full flex flex-col shadow-2xl border-l ${
            isDark ? 'bg-neutral-950 border-gold-400/10 text-white' : 'bg-white border-neutral-200 text-neutral-900'
          }`}
          id="cart-drawer-panel"
        >
          {/* Drawer Header */}
          <div className="px-6 py-5 border-b border-zinc-500/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-gold-400" />
              <h3 className="font-serif text-xl font-bold tracking-tight">Your Selection</h3>
              <span className="font-mono text-xs bg-gold-400/10 text-gold-400 px-2 py-0.5 rounded-full font-bold">
                {cart.reduce((s, i) => s + i.quantity, 0)} items
              </span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className={`p-1.5 rounded-full transition-colors ${
                isDark ? 'text-neutral-400 hover:text-white hover:bg-neutral-900' : 'text-neutral-500 hover:text-neutral-950 hover:bg-neutral-100'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Item Grid Lists */}
          <div className="flex-1 overflow-y-auto p-6 space-y-5">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col justify-center items-center text-center px-4">
                <div className="w-16 h-16 rounded-full bg-gold-400/5 border border-gold-400/10 flex items-center justify-center mb-4">
                  <ShoppingBag className="w-8 h-8 text-gold-400/40" />
                </div>
                <h4 className="font-serif text-lg font-bold mb-1">Your Selection is Empty</h4>
                <p className={`text-xs max-w-xs ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>
                  Exquisite dishes are awaiting your selection on our Michelin-vetted grand menu.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-6 font-mono text-[10px] tracking-widest uppercase font-bold text-gold-400 border border-gold-400/20 px-6 py-2.5 rounded-lg hover:bg-gold-400 hover:text-neutral-950 transition-colors"
                >
                  Browse Culinary Art
                </button>
              </div>
            ) : (
              cart.map(({ menuItem, quantity }) => (
                <div
                  key={menuItem.id}
                  className={`flex gap-4 p-3 rounded-xl border transition-colors ${
                    isDark ? 'bg-neutral-900/40 border-neutral-950 hover:bg-neutral-900/60' : 'bg-neutral-50 border-neutral-100'
                  }`}
                  id={`cart-row-${menuItem.id}`}
                >
                  {/* Thumbnail */}
                  <img
                    src={menuItem.image}
                    alt={menuItem.name}
                    className="w-16 h-16 object-cover rounded-lg shrink-0 border border-gold-300/10"
                    referrerPolicy="no-referrer"
                  />

                  {/* Info and amount controls */}
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex justify-between items-start gap-1">
                        <h4 className="font-serif text-sm font-bold truncate text-neutral-100 dark:text-neutral-100 light:text-neutral-900">
                          {menuItem.name}
                        </h4>
                        <span className="font-serif text-gold-300 font-semibold text-sm">
                          {formatINR(menuItem.price * quantity)}
                        </span>
                      </div>
                      <p className={`text-[10px] truncate mb-2 ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
                        {formatINR(menuItem.price)} each • {menuItem.prepTime}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      {/* Controls */}
                      <div className={`flex items-center rounded-lg border overflow-hidden ${
                        isDark ? 'border-neutral-800' : 'border-neutral-200'
                      }`}>
                        <button
                          type="button"
                          onClick={() => updateQuantity(menuItem.id, quantity - 1)}
                          className={`p-1 hover:bg-neutral-800 hover:text-gold-400 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="font-mono text-xs font-bold px-3 py-0.5 min-w-[24px] text-center">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(menuItem.id, quantity + 1)}
                          className={`p-1 hover:bg-neutral-800 hover:text-gold-400 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Delete */}
                      <button
                        type="button"
                        onClick={() => removeFromCart(menuItem.id)}
                        className="text-neutral-500 hover:text-red-500 p-1 rounded transition-colors"
                        aria-label="Delete item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Checkout Calculations Panel */}
          {cart.length > 0 && (
            <div className={`p-6 border-t font-mono text-xs ${
              isDark ? 'border-neutral-800 bg-neutral-950/80' : 'border-neutral-200 bg-neutral-50/55'
            }`}>
              <div className="space-y-2 text-neutral-400 uppercase tracking-widest text-[10px] font-bold">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-neutral-100">{formatINR(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>White-Glove Delivery</span>
                  <span className="text-neutral-100">
                    {deliveryFee === 0 ? (
                      <span className="text-emerald-400">Complimentary</span>
                    ) : (
                      formatINR(deliveryFee)
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Luxe GST (5%)</span>
                  <span className="text-neutral-100">{formatINR(tax)}</span>
                </div>
                
                {deliveryFee > 0 && (
                  <p className="text-[9px] text-amber-500 font-normal lowercase tracking-wide font-sans normal-case mt-1">
                    Add {formatINR(799 - subtotal)} more of gourmet choices for complimentary shipping!
                  </p>
                )}
              </div>

              {/* Total Price */}
              <div className="flex justify-between items-center border-t border-zinc-700/30 pt-4 mt-4 mb-5">
                <span className="font-serif text-sm font-bold tracking-wide uppercase text-neutral-300">Total Indulgence</span>
                <span className="font-serif text-2xl font-bold text-gold-400">{formatINR(total)}</span>
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-2 gap-4 text-center text-[10px] tracking-wider uppercase mb-5">
                <div className={`p-2 rounded-lg border ${isDark ? 'bg-neutral-800/25 border-neutral-800' : 'bg-neutral-100 border-neutral-200'}`}>
                  <Clock className="w-3.5 h-3.5 text-gold-400 mx-auto mb-1" />
                  <span>ETA: 25-30 Mins</span>
                </div>
                <div className={`p-2 rounded-lg border ${isDark ? 'bg-neutral-800/25 border-neutral-800' : 'bg-neutral-100 border-neutral-200'}`}>
                  <Truck className="w-3.5 h-3.5 text-gold-400 mx-auto mb-1" />
                  <span>GPS Tracking</span>
                </div>
              </div>

              {/* Place Order CTA */}
              <button
                type="button"
                onClick={handleCheckout}
                className="w-full font-mono text-xs tracking-widest uppercase font-bold bg-gradient-to-r from-gold-400 to-gold-600 hover:from-gold-300 hover:to-gold-500 text-neutral-950 py-4 rounded-xl shadow-lg shadow-gold-950/20 flex items-center justify-center gap-2 transition-transform active:scale-[98] cursor-pointer"
              >
                <ShieldCheck className="w-4.5 h-4.5 stroke-[2.5]" />
                Confirm Gourmet Booking
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

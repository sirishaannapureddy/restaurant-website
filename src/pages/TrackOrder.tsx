/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { useRestaurantStore } from '../store/useRestaurantStore';
import {
  Clock,
  MapPin,
  ClipboardList,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Truck,
  RotateCw,
  XCircle,
  ShoppingBag,
  HelpCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatINR } from '../utils/currency';

const STATUS_STEPS = [
  { id: 'Order Received', label: 'Order Received', desc: 'Wired to our culinary team' },
  { id: 'Confirmed', label: 'Confirmed', desc: 'Michelin kitchen approved' },
  { id: 'Preparing', label: 'Preparing', desc: 'Mis-en-place selection' },
  { id: 'Cooking', label: 'Cooking', desc: 'Woodfired cooking session' },
  { id: 'Packed', label: 'Packed', desc: 'Silver foil insulation sealing' },
  { id: 'Out for Delivery', label: 'Out for Delivery', desc: 'With a white-glove driver' },
  { id: 'Arriving Soon', label: 'Arriving Soon', desc: 'At your gate boundary' },
  { id: 'Delivered', label: 'Delivered', desc: 'Bon Appetit!' }
];

export default function TrackOrder() {
  const { activeOrder, cancelActiveOrder, advanceOrderStatus, theme } = useRestaurantStore();
  const isDark = theme === 'dark';

  // Helper metrics for step comparison
  const getCurrentStepIndex = () => {
    if (!activeOrder) return -1;
    return STATUS_STEPS.findIndex((s) => s.id === activeOrder.status);
  };

  const currentStepIdx = getCurrentStepIndex();

  return (
    <div className={`pt-4 pb-12 ${isDark ? 'bg-neutral-950 text-white' : 'bg-white text-neutral-900'}`} id="track-order-page-container">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="font-mono text-[9px] tracking-widest uppercase text-gold-400 font-extrabold block mb-1">
            Order Telemetry
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold uppercase tracking-tight">
            Order Tracking
          </h1>
          <p className={`text-xs mt-3 ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>
            Examine your gourmet booking status and real-time culinary progression.
          </p>
        </div>

        {/* Condition A: No Active Order */}
        {!activeOrder ? (
          <div className="text-center py-20 border border-dashed border-zinc-500/15 rounded-3xl p-8 max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-gold-400/5 border border-gold-400/10 flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-8 h-8 text-gold-400/30" />
            </div>
            <h3 className="font-serif text-lg font-bold mb-1">No Active Orders Tracked</h3>
            <p className={`text-xs max-w-sm mx-auto leading-relaxed ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>
              Your gourmet queue has no pending transactions. Select premium meals from our grand menus and checkout!
            </p>
            <Link
              to="/menu"
              className="mt-8 inline-flex font-mono text-[10px] tracking-widest uppercase font-extrabold bg-gold-400 text-neutral-950 px-6 py-3 rounded-lg hover:bg-gold-300 transition-colors cursor-pointer"
            >
              Browse Extended Menu
            </Link>
          </div>
        ) : (
          /* Condition B: Active Tracker Page content */
          <div className="space-y-10">
            {/* 1. Header Stat summary card */}
            <div className={`p-6 rounded-3xl border flex flex-col md:flex-row justify-between items-start md:items-center gap-6 ${
              isDark ? 'bg-neutral-900 border-neutral-850' : 'bg-neutral-50 border-neutral-200'
            }`}>
              <div className="font-mono text-xs text-neutral-300 space-y-1">
                <span className="text-gold-400 uppercase tracking-widest font-bold block text-[10px]">Active Booking ID:</span>
                <span className="text-white font-extrabold text-lg block">{activeOrder.id}</span>
                <span className="text-neutral-400">Placed at {activeOrder.timestamp} • Destination: Paris Royale Suburbs</span>
              </div>
              
              <div className="flex gap-3">
                {/* Cancel Trigger */}
                {activeOrder.status !== 'Delivered' && (
                  <button
                    type="button"
                    onClick={cancelActiveOrder}
                    className="font-mono text-[9px] tracking-widest uppercase font-bold text-red-500 hover:text-red-400 border border-red-500/20 px-4 py-2 rounded-lg bg-red-500/5 transition-colors cursor-pointer"
                  >
                    Cancel Order
                  </button>
                )}

                {/* Manual step bypass / Developer assist */}
                {activeOrder.status !== 'Delivered' && (
                  <button
                    type="button"
                    onClick={advanceOrderStatus}
                    className="font-mono text-[9px] tracking-widest uppercase font-bold text-gold-300 hover:text-white border border-gold-400/20 px-4 py-2 rounded-lg bg-gold-400/5 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <RotateCw className="w-3.5 h-3.5" /> Fast Forward
                  </button>
                )}
              </div>
            </div>

            {/* 2. Visual Progress Bar */}
            <div className={`p-6 rounded-3xl border ${isDark ? 'bg-neutral-900/45 border-neutral-850' : 'bg-neutral-50 border-neutral-150'}`}>
              <div className="flex justify-between items-center mb-4">
                <span className="font-serif text-sm font-bold uppercase tracking-wider text-gold-300">Culinary Completion Status</span>
                <span className="font-mono text-xs text-neutral-300 font-bold">{activeOrder.progress}%</span>
              </div>
              {/* Outer bar */}
              <div className="w-full bg-neutral-950 h-3 rounded-full overflow-hidden border border-zinc-550/10">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${activeOrder.progress}%` }}
                  transition={{ duration: 0.8 }}
                  className="bg-gradient-to-r from-gold-400 to-amber-500 h-full rounded-full"
                />
              </div>

              {/* ETA Alert */}
              <div className="flex gap-2 items-center text-xs font-mono text-neutral-400 mt-4 uppercase tracking-wider">
                <Clock className="w-4 h-4 text-gold-400 animate-pulse" />
                <span>Estimated Time to Arrival:</span>
                <span className="text-white font-bold">{activeOrder.estimatedTime}</span>
              </div>
            </div>

            {/* 3. Stepper steps timeline */}
            <div className={`p-8 rounded-3xl border ${isDark ? 'bg-neutral-900/40 border-neutral-850' : 'bg-neutral-50 border-neutral-200'}`}>
              <h3 className="font-serif text-lg font-bold text-gold-400 uppercase tracking-widest mb-8">
                Timeline Progression
              </h3>

              <div className="space-y-6 relative border-l border-zinc-550/10 pl-6 ml-4">
                {STATUS_STEPS.map((step, idx) => {
                  const isCompleted = idx < currentStepIdx;
                  const isActive = idx === currentStepIdx;
                  
                  // Style configurations
                  let bulletColor = 'bg-neutral-900 border-neutral-800 text-neutral-500';
                  let titleColor = 'text-neutral-500';
                  
                  if (isCompleted) {
                    bulletColor = 'bg-emerald-500/10 border-emerald-500 text-emerald-500';
                    titleColor = 'text-neutral-300';
                  } else if (isActive) {
                    bulletColor = 'bg-gold-500/10 border-gold-400 text-gold-400 shadow-lg shadow-gold-500/20';
                    titleColor = 'text-white font-bold';
                  }

                  return (
                    <div key={step.id} className="relative text-left" id={`step-row-${idx}`}>
                      {/* Circle icon */}
                      <div className={`absolute top-0 -left-6 -translate-x-1/2 w-7 h-7 border-2 rounded-full flex items-center justify-center font-mono text-[9px] font-bold transition-all ${bulletColor}`}>
                        {isCompleted ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        ) : (
                          idx + 1
                        )}
                      </div>

                      <div className="pl-4">
                        <span className={`block font-serif text-sm tracking-wide leading-none ${titleColor}`}>
                          {step.label}
                        </span>
                        <span className={`block font-mono text-[10px] uppercase text-neutral-500 mt-1 ${isActive ? 'text-gold-400' : ''}`}>
                          {step.desc}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 4. Booking Summary detailed inclusions */}
            <div className={`p-8 rounded-3xl border ${isDark ? 'bg-neutral-900/60 border-neutral-850' : 'bg-neutral-50 border-neutral-200'}`}>
              <h3 className="font-serif text-lg font-bold text-gold-400 uppercase tracking-widest border-b border-zinc-700/20 pb-4 mb-6">
                Culinary Booking Details
              </h3>

              <div className="space-y-4 mb-6">
                {activeOrder.items.map(({ menuItem, quantity }) => (
                  <div key={menuItem.id} className="flex justify-between items-center text-sm font-mono text-neutral-300">
                    <span className="flex gap-2 items-center">
                      <span className="text-gold-300 font-bold">{quantity}x</span>
                      <span>{menuItem.name}</span>
                    </span>
                    <span className="font-serif font-semibold">{formatINR(menuItem.price * quantity)}</span>
                  </div>
                ))}
              </div>

              {/* Recipient Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono text-neutral-400 border-t border-b border-zinc-700/20 py-4 mb-6 uppercase tracking-wider">
                <div>
                  <span className="block text-gold-400 font-bold mb-0.5">Physical Destination Address:</span>
                  <span className="text-white normal-case">{activeOrder.address}</span>
                </div>
                <div>
                  <span className="block text-gold-400 font-bold mb-0.5">Contact Telephone:</span>
                  <span className="text-white">{activeOrder.phone}</span>
                </div>
              </div>

              {/* Pricing breakdown */}
              <div className="space-y-2 text-right font-mono text-xs uppercase text-neutral-400">
                <div className="flex justify-between max-w-xs ml-auto">
                  <span>Subtotal:</span>
                  <span className="text-white">{formatINR(activeOrder.subtotal)}</span>
                </div>
                <div className="flex justify-between max-w-xs ml-auto">
                  <span>White-Glove Shipping:</span>
                  <span className="text-white">
                    {activeOrder.deliveryFee === 0 ? 'Complimentary' : formatINR(activeOrder.deliveryFee)}
                  </span>
                </div>
                <div className="flex justify-between max-w-xs ml-auto">
                  <span>Luxe GST (5%):</span>
                  <span className="text-white">{formatINR(activeOrder.tax)}</span>
                </div>
                <div className="flex justify-between max-w-xs ml-auto border-t border-zinc-750/30 pt-2 mt-2 font-serif text-sm font-extrabold text-gold-400">
                  <span>Total Indulgence:</span>
                  <span>{formatINR(activeOrder.total)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

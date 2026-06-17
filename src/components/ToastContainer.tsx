/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AnimatePresence, motion } from 'motion/react';
import { useRestaurantStore } from '../store/useRestaurantStore';
import { CheckCircle, Info, XCircle, X } from 'lucide-react';

export default function ToastContainer() {
  const { toasts, removeToast } = useRestaurantStore();

  return (
    <div className="fixed bottom-5 right-5 z-[100] flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => {
          let Icon = Info;
          let bgColor = 'bg-neutral-900/95 border-gold-300/30';
          let iconColor = 'text-gold-400';

          if (toast.type === 'success') {
            Icon = CheckCircle;
            bgColor = 'bg-neutral-900/95 border-emerald-500/20';
            iconColor = 'text-emerald-400';
          } else if (toast.type === 'error') {
            Icon = XCircle;
            bgColor = 'bg-neutral-900/95 border-rose-500/20';
            iconColor = 'text-rose-400';
          }

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
              className={`pointer-events-auto p-4 rounded-lg shadow-xl border ${bgColor} flex items-start gap-3 backdrop-blur-md`}
              id={`toast-${toast.id}`}
            >
              <Icon className={`w-5 h-5 shrink-0 ${iconColor} mt-0.5`} />
              <div className="flex-1 text-sm font-medium text-neutral-200">
                {toast.message}
              </div>
              <button
                type="button"
                onClick={() => removeToast(toast.id)}
                className="text-neutral-400 hover:text-neutral-200 transition-colors"
                aria-label="Close Notification"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

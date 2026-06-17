/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { create } from 'zustand';
import { MenuItem, CartItem, OrderState, Reservation } from '../types';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface RestaurantState {
  theme: 'dark' | 'light';
  cart: CartItem[];
  wishlist: string[];
  recentlyViewed: MenuItem[];
  compareList: MenuItem[];
  toasts: Toast[];
  activeOrder: OrderState | null;
  reservations: Reservation[];
  
  // Actions
  toggleTheme: () => void;
  addToCart: (item: MenuItem, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, qty: number) => void;
  clearCart: () => void;
  
  toggleWishlist: (itemId: string) => void;
  addToRecentlyViewed: (item: MenuItem) => void;
  
  toggleCompare: (item: MenuItem) => void;
  clearCompare: () => void;
  
  addToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
  
  placeOrder: (shippingAddress: string, contactPhone: string) => void;
  cancelActiveOrder: () => void;
  advanceOrderStatus: () => void;
  
  addReservation: (reservation: Omit<Reservation, 'id' | 'status'>) => void;
  initializeStore: () => void;
}

export const useRestaurantStore = create<RestaurantState>((set, get) => {
  // Check local storage or default to dark (since it's a premium luxurious look)
  const initialTheme = (localStorage.getItem('luxury-theme') as 'dark' | 'light') || 'dark';
  if (initialTheme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  // Active status progression array
  const STATUSES: OrderState['status'][] = [
    'Order Received',
    'Confirmed',
    'Preparing',
    'Cooking',
    'Packed',
    'Out for Delivery',
    'Arriving Soon',
    'Delivered'
  ];

  let simTimer: NodeJS.Timeout | null = null;

  return {
    theme: initialTheme,
    cart: JSON.parse(localStorage.getItem('luxury-cart') || '[]'),
    wishlist: JSON.parse(localStorage.getItem('luxury-wishlist') || '[]'),
    recentlyViewed: JSON.parse(localStorage.getItem('luxury-recently-viewed') || '[]'),
    compareList: [],
    toasts: [],
    activeOrder: JSON.parse(localStorage.getItem('luxury-active-order') || 'null'),
    reservations: JSON.parse(localStorage.getItem('luxury-reservations') || '[]'),

    toggleTheme: () => {
      const nextTheme = get().theme === 'dark' ? 'light' : 'dark';
      set({ theme: nextTheme });
      localStorage.setItem('luxury-theme', nextTheme);
      if (nextTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      get().addToast(`Switched to ${nextTheme === 'dark' ? 'Classic Obsidian' : 'Cream Light'} theme`, 'info');
    },

    addToCart: (item, quantity = 1) => {
      const { cart, addToast } = get();
      const existing = cart.find(i => i.menuItem.id === item.id);
      let newCart: CartItem[];

      if (existing) {
        newCart = cart.map(i => 
          i.menuItem.id === item.id 
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      } else {
        newCart = [...cart, { menuItem: item, quantity }];
      }

      set({ cart: newCart });
      localStorage.setItem('luxury-cart', JSON.stringify(newCart));
      addToast(`Added ${quantity}x ${item.name} to your gourmet selection`, 'success');
    },

    removeFromCart: (itemId) => {
      const { cart, addToast } = get();
      const item = cart.find(i => i.menuItem.id === itemId);
      const newCart = cart.filter(i => i.menuItem.id !== itemId);
      set({ cart: newCart });
      localStorage.setItem('luxury-cart', JSON.stringify(newCart));
      if (item) {
        addToast(`Removed ${item.menuItem.name} from your selection`, 'info');
      }
    },

    updateQuantity: (itemId, qty) => {
      const { cart } = get();
      if (qty <= 0) {
        get().removeFromCart(itemId);
        return;
      }
      const newCart = cart.map(i => 
        i.menuItem.id === itemId ? { ...i, quantity: qty } : i
      );
      set({ cart: newCart });
      localStorage.setItem('luxury-cart', JSON.stringify(newCart));
    },

    clearCart: () => {
      set({ cart: [] });
      localStorage.removeItem('luxury-cart');
    },

    toggleWishlist: (itemId) => {
      const { wishlist, addToast } = get();
      const exists = wishlist.includes(itemId);
      let newWishlist: string[];

      if (exists) {
        newWishlist = wishlist.filter(id => id !== itemId);
        addToast('Removed item from your connoisseur wishlist', 'info');
      } else {
        newWishlist = [...wishlist, itemId];
        addToast('Curated item to your connoisseur wishlist', 'success');
      }

      set({ wishlist: newWishlist });
      localStorage.setItem('luxury-wishlist', JSON.stringify(newWishlist));
    },

    addToRecentlyViewed: (item) => {
      const { recentlyViewed } = get();
      const filtered = recentlyViewed.filter(i => i.id !== item.id);
      const updated = [item, ...filtered].slice(0, 6);
      set({ recentlyViewed: updated });
      localStorage.setItem('luxury-recently-viewed', JSON.stringify(updated));
    },

    toggleCompare: (item) => {
      const { compareList, addToast } = get();
      const exists = compareList.find(i => i.id === item.id);
      
      if (exists) {
        const updated = compareList.filter(i => i.id !== item.id);
        set({ compareList: updated });
        addToast(`Removed ${item.name} from comparison list`, 'info');
      } else {
        if (compareList.length >= 3) {
          addToast('Gourmet comparison is limited to 3 choices', 'error');
          return;
        }
        const updated = [...compareList, item];
        set({ compareList: updated });
        addToast(`Added ${item.name} to gourmet comparison`, 'info');
      }
    },

    clearCompare: () => {
      set({ compareList: [] });
    },

    addToast: (message, type = 'success') => {
      const id = `${Date.now()}-${Math.random()}`;
      set(state => ({
        toasts: [...state.toasts, { id, message, type }]
      }));
      setTimeout(() => {
        get().removeToast(id);
      }, 4000);
    },

    removeToast: (id) => {
      set(state => ({
        toasts: state.toasts.filter(t => t.id !== id)
      }));
    },

    placeOrder: (shippingAddress, contactPhone) => {
      const { cart, addToast } = get();
      if (cart.length === 0) return;

      const subtotal = cart.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0);
      const deliveryFee = subtotal > 799 ? 0 : 99; // complimentary over ₹799, else ₹99 delivery fee
      const tax = parseFloat((subtotal * 0.05).toFixed(2)); // 5% Indian GST
      const total = subtotal + deliveryFee + tax;

      const newOrder: OrderState = {
        id: `LUXE-${Math.floor(100000 + Math.random() * 900000)}`,
        items: [...cart],
        subtotal,
        deliveryFee,
        tax,
        total,
        status: 'Order Received',
        progress: 5,
        address: shippingAddress,
        phone: contactPhone,
        estimatedTime: '25-30 mins',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      set({
        activeOrder: newOrder,
        cart: [] // Clear cart instantly on placement
      });
      localStorage.removeItem('luxury-cart');
      localStorage.setItem('luxury-active-order', JSON.stringify(newOrder));

      addToast('Your grand order reservation has been wired to our kitchen!', 'success');

      // Setup automated ticking simulation
      if (simTimer) clearInterval(simTimer);
      
      const simulateProgression = () => {
        const order = get().activeOrder;
        if (!order) return;
        
        const currentIdx = STATUSES.indexOf(order.status);
        if (currentIdx === -1 || currentIdx === STATUSES.length - 1) {
          if (simTimer) clearInterval(simTimer);
          return;
        }

        const nextStatus = STATUSES[currentIdx + 1];
        const nextProgress = Math.min(100, Math.round(((currentIdx + 1) / (STATUSES.length - 1)) * 100));
        
        const updatedOrder: OrderState = {
          ...order,
          status: nextStatus,
          progress: nextProgress,
          estimatedTime: currentIdx >= 5 ? 'Arrived/Arriving' : `${Math.max(5, 25 - currentIdx * 3)} mins`
        };

        set({ activeOrder: updatedOrder });
        localStorage.setItem('luxury-active-order', JSON.stringify(updatedOrder));
        
        get().addToast(`Order Status Update: ${nextStatus}`, 'info');
      };

      // Progress status every 8-10 seconds for user engagement
      simTimer = setInterval(simulateProgression, 8000);
    },

    cancelActiveOrder: () => {
      if (simTimer) clearInterval(simTimer);
      set({ activeOrder: null });
      localStorage.removeItem('luxury-active-order');
      get().addToast('Active culinary order has been cleared', 'info');
    },

    advanceOrderStatus: () => {
      const order = get().activeOrder;
      if (!order) return;
      
      const currentIdx = STATUSES.indexOf(order.status);
      if (currentIdx === -1 || currentIdx === STATUSES.length - 1) return;

      const nextStatus = STATUSES[currentIdx + 1];
      const nextProgress = Math.min(100, Math.round(((currentIdx + 1) / (STATUSES.length - 1)) * 100));
      
      const updatedOrder: OrderState = {
        ...order,
        status: nextStatus,
        progress: nextProgress,
        estimatedTime: currentIdx >= 5 ? 'Arrived/Arriving' : `${Math.max(5, 20 - currentIdx * 3)} mins`
      };

      set({ activeOrder: updatedOrder });
      localStorage.setItem('luxury-active-order', JSON.stringify(updatedOrder));
      get().addToast(`Order Status manually advanced: ${nextStatus}`, 'success');
    },

    addReservation: (reservationData) => {
      const { reservations, addToast } = get();
      const newReservation: Reservation = {
        ...reservationData,
        id: `RES-${Math.floor(10000 + Math.random() * 90000)}`,
        status: 'Confirmed'
      };

      const updated = [newReservation, ...reservations];
      set({ reservations: updated });
      localStorage.setItem('luxury-reservations', JSON.stringify(updated));
      addToast(`Table Reservation Confirmed for ${reservationData.guests} guests on ${reservationData.date}`, 'success');
    },

    initializeStore: () => {
      // Re-initialize theme if needed and make sure standard local storage data is in sync
      const currentTheme = get().theme;
      if (currentTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  };
});

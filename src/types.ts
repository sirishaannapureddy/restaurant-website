/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  reviewsCount: number;
  image: string;
  categories: string[];
  isBestseller: boolean;
  kcal: number;
  prepTime: string; // e.g. "15-20 min"
  ingredients: string[];
  tags: string[]; // e.g. ["Spicy", "Gluten-Free", "Chef's Special", "Vegan"]
  nutritionalInfo: {
    protein: string;
    carbs: string;
    fat: string;
  };
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
}

export interface Reservation {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  timeSlot: string;
  guests: number;
  specialRequests?: string;
  status: 'Confirmed' | 'Pending' | 'Cancelled';
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Menu & Dietary' | 'Reservations' | 'Delivery & Tracking' | 'Events';
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  comment: string;
  rating: number;
  avatar: string;
}

export interface OfferCombo {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  price: number;
  originalPrice: number;
  discount: string; // e.g. "20% OFF"
  image: string;
  items: string[];
  category: 'seasonal' | 'festival' | 'family' | 'couple' | 'weekend' | 'bogo';
  badge: string;
}

export interface OrderState {
  id: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  tax: number;
  total: number;
  status: 'Order Received' | 'Confirmed' | 'Preparing' | 'Cooking' | 'Packed' | 'Out for Delivery' | 'Arriving Soon' | 'Delivered';
  progress: number; // 0 to 100
  address: string;
  phone: string;
  estimatedTime: string; // e.g. "25 min"
  timestamp: string;
}

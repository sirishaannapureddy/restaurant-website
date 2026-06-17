/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useRestaurantStore } from './store/useRestaurantStore';

// Layout & Global Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ToastContainer from './components/ToastContainer';
import ComparisonModal from './components/ComparisonModal';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Menu from './pages/Menu';
import Gallery from './pages/Gallery';
import Offers from './pages/Offers';
import Reservations from './pages/Reservations';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import TrackOrder from './pages/TrackOrder';
import Wishlist from './pages/Wishlist';

// Helper component that resets scroll on location state changes
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}

export default function App() {
  const { theme, initializeStore } = useRestaurantStore();

  // Initialize the store assets (persisted storage loading)
  useEffect(() => {
    initializeStore();
  }, [initializeStore]);

  // Handle high-end theme class updates on document element
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  return (
    <Router>
      <ScrollToTop />
      
      {/* Root Layout Wrap */}
      <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${
        theme === 'dark' ? 'bg-neutral-950 text-white' : 'bg-white text-neutral-900'
      }`}>
        {/* Navigation Head */}
        <Navbar />

        {/* Core Screen Outlets */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/reservations" element={<Reservations />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/track-order" element={<TrackOrder />} />
            <Route path="/wishlist" element={<Wishlist />} />
          </Routes>
        </main>

        {/* Global Footer */}
        <Footer />

        {/* Overlay Side Drawers & Toast Alarms */}
        <ComparisonModal />
        <ToastContainer />
      </div>
    </Router>
  );
}

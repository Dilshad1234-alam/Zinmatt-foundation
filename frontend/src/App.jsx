import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { DonateModalProvider } from './context/DonateModalContext';
import DonateModal from './components/ui/DonateModal';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import OurInitiatives from './pages/OurInitiatives';
import OurImpact from './pages/OurImpact';
import Gallery from './pages/Gallery';
import GetInvolved from './pages/GetInvolved';
import ContactUs from './pages/ContactUs';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';

/**
 * ScrollToTop handles:
 * 1. Scrolling smoothly to an anchor hash when present (e.g. /#initiatives)
 * 2. Instant reset of scroll position to (0, 0) upon page route navigation
 */
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const timer = setTimeout(() => {
        const id = hash.replace('#', '');
        const target = document.getElementById(id);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }, 80);
      return () => clearTimeout(timer);
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <DonateModalProvider>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/initiatives" element={<OurInitiatives />} />
          <Route path="/impact" element={<OurImpact />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/get-involved" element={<GetInvolved />} />
          <Route path="/contact" element={<ContactUs />} />
          {/* Hidden Admin Routes (No links in Navbar or Footer) */}
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
          {/* Wildcard fallback to Home */}
          <Route path="*" element={<Home />} />
        </Routes>

        {/* Global Standalone Donation Card Modal */}
        <DonateModal />
      </DonateModalProvider>
    </BrowserRouter>
  );
}

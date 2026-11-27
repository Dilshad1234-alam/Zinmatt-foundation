import React from 'react';
import { Link } from 'react-router-dom';
import BrandLogo from '../ui/BrandLogo';
import Container from '../ui/Container';
import { Mail, Phone, MapPin, Heart, ArrowUpRight } from 'lucide-react';

/**
 * Standardized Shell-Ready Footer for ZINMATT Foundation
 * Dark Charcoal (#1A1A1A / #242424) Surface with High-Contrast Typography
 */
export default function Footer() {
  const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Our Initiatives', href: '/initiatives' },
    { label: 'Our Impact', href: '/impact' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Get Involved', href: '/get-involved' },
    { label: 'Contact Us', href: '/contact' },
  ];

  return (
    <footer className="bg-[#1A1A1A] text-gray-300 pt-6 sm:pt-8 lg:pt-8 pb-8 border-t border-[#2e2e2e]">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-gray-800">
          {/* Col 1: Brand Info & Wordmark */}
          <div className="lg:col-span-4 space-y-5">
            <BrandLogo variant="white" size="lg" />
            <p className="font-sans text-gray-400 text-sm leading-relaxed max-w-sm">
              Empowering lives through education, social inclusion, elderly care, and
              community environmental cleanliness across India.
            </p>
            <div className="pt-1 flex items-center gap-3 text-xs text-gray-400">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-800/80 border border-gray-700 text-[#FCC241]">
                <Heart className="w-3 h-3 text-[#FB7336] fill-[#FB7336]" />
                Registered Non-Profit NGO
              </span>
              <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-gray-800 text-gray-300">
                80G Certified
              </span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-['Arial',_Helvetica,_sans-serif] text-white font-bold text-base tracking-wide uppercase text-sm">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              {quickLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-1 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-transparent group-hover:bg-[#FB7336] transition-colors" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Focus Areas / Initiatives */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-['Arial',_Helvetica,_sans-serif] text-white font-bold text-base tracking-wide uppercase text-sm">
              Core Pillars
            </h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: 'Free Education for Underprivileged', href: '/initiatives#pillar-01' },
                { label: 'Support for Visually Impaired Children', href: '/initiatives#pillar-02' },
                { label: 'Elderly Care & Compassion', href: '/initiatives#pillar-03' },
                { label: 'Environmental Cleanliness Drives', href: '/initiatives#pillar-04' },
              ].map((item) => (
                <li key={item.label} className="text-gray-400 hover:text-white transition-colors duration-200">
                  <Link to={item.href} className="flex items-center justify-between group">
                    <span>{item.label}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-gray-500 group-hover:text-[#FCC241] transition-colors" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact Information */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-['Arial',_Helvetica,_sans-serif] text-white font-bold text-base tracking-wide uppercase text-sm">
              Contact Us
            </h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#FB7336] mt-0.5 flex-shrink-0" />
                <span>New Delhi &amp; Pan-India Outreach Centers, India</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#FCC241] flex-shrink-0" />
                <a
                  href="mailto:contact@zinmattfoundation.org"
                  className="hover:text-white transition-colors"
                >
                  contact@zinmattfoundation.org
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#FB7336] flex-shrink-0" />
                <a href="tel:+919991234567" className="hover:text-white transition-colors">
                  +91 999 123 4567
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} ZINMATT Foundation. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-gray-400 transition-colors">
              Privacy Policy
            </a>
            <span>•</span>
            <a href="#terms" className="hover:text-gray-400 transition-colors">
              Terms of Service
            </a>
            <span>•</span>
            <a href="#tax" className="hover:text-gray-400 transition-colors">
              80G Tax Exemption Details
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}

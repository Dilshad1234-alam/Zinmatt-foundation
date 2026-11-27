import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDonateModal } from '../../context/DonateModalContext';
import BrandLogo from '../ui/BrandLogo';
import Button from '../ui/Button';
import Container from '../ui/Container';
import { Menu, X, ChevronRight } from 'lucide-react';

/**
 * Standardized Shell-Ready Navbar for ZINMATT Foundation
 * - Fixed on scroll with backdrop blur and smooth elevation
 * - Taller, more spacious modern header (h-20 sm:h-[84px] lg:h-[88px])
 * - Clean "Donate Now" action button without heart icon
 */
export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { openDonateModal } = useDonateModal();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Our Initiatives', href: '/initiatives' },
    { label: 'Our Impact', href: '/impact' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Get Involved', href: '/get-involved' },
    { label: 'Contact Us', href: '/contact' },
  ];

  const isLinkActive = (href) => {
    if (href === '/') return location.pathname === '/' && !location.hash;
    if (href === '/about') return location.pathname === '/about';
    if (href === '/initiatives') return location.pathname === '/initiatives';
    if (href === '/impact') return location.pathname === '/impact';
    if (href === '/gallery') return location.pathname === '/gallery';
    if (href === '/get-involved') return location.pathname === '/get-involved';
    if (href === '/contact') return location.pathname === '/contact';
    if (href.startsWith('/#')) return location.pathname === '/' && location.hash === href.replace('/', '');
    return false;
  };

  return (
    <>
      {/* Fixed Sticky Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full bg-white/95 backdrop-blur-md border-b transition-all duration-300 ${
          scrolled
            ? 'border-[#EEEEEE] shadow-md bg-white/98'
            : 'border-[#EEEEEE]/80 shadow-xs'
        }`}
      >
        <Container>
          <div className="flex items-center justify-between h-20 sm:h-[84px] lg:h-[88px] transition-all duration-200">
            {/* Logo - cleanly clickable without any focus/active outline border */}
            <Link to="/" className="outline-none focus:outline-none focus-visible:outline-none focus:ring-0 active:outline-none select-none">
              <BrandLogo size="lg" imageClassName="h-11 w-11 sm:h-12 sm:w-12" />
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8 2xl:gap-9">
              {navLinks.map((link) => {
                const active = isLinkActive(link.href);
                return (
                  <Link
                    key={link.label}
                    to={link.href}
                    className={`text-[15px] xl:text-[16px] font-semibold transition-colors duration-200 relative group py-2 whitespace-nowrap ${
                      active ? 'text-[#FB7336]' : 'text-[#242424] hover:text-[#FB7336]'
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#FB7336] to-[#FCC241] transition-all duration-300 ${
                        active ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* Primary CTA Button: Donate Now (Opens Global Donate Modal) */}
            <div className="hidden sm:flex items-center gap-3">
              <Button
                type="button"
                variant="primary"
                size="md"
                onClick={() => openDonateModal()}
                className="shadow-md hover:shadow-lg rounded-xl font-bold px-6 py-2.5 text-sm sm:text-base tracking-wide whitespace-nowrap cursor-pointer"
              >
                Donate Now
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-xl text-[#242424] hover:bg-[#FFF0E8] transition-colors focus:outline-none cursor-pointer"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Dropdown Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden border-t border-[#EEEEEE] py-4 px-2 space-y-1 bg-white animate-in fade-in duration-200 max-h-[calc(100vh-88px)] overflow-y-auto">
              {navLinks.map((link) => {
                const active = isLinkActive(link.href);
                return (
                  <Link
                    key={link.label}
                    to={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold transition-colors ${
                      active
                        ? 'bg-[#FFF0E8] text-[#FB7336]'
                        : 'text-[#242424] hover:bg-[#FFF9F5] hover:text-[#FB7336]'
                    }`}
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </Link>
                );
              })}
              <div className="pt-3 px-2">
                <Button
                  type="button"
                  variant="primary"
                  size="md"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openDonateModal();
                  }}
                  className="w-full justify-center rounded-xl font-bold py-3 text-base cursor-pointer"
                >
                  Donate Now
                </Button>
              </div>
            </div>
          )}
        </Container>
      </header>

      {/* Spacer to prevent page content from being obscured beneath the fixed header */}
      <div className="h-20 sm:h-[84px] lg:h-[88px] w-full shrink-0" aria-hidden="true" />
    </>
  );
}

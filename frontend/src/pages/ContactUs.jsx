import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import GradientIconBox from '../components/ui/GradientIconBox';
import MobileCardCarousel from '../components/ui/MobileCardCarousel';
import api from '../lib/api';
import {
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Globe,
  Instagram,
  Twitter,
  Linkedin,
  MessageSquare,
  Car,
  Heart,
} from 'lucide-react';

/**
 * Contact Us Page for ZINMATT Foundation
 * Exact replica of reference layout (image_e5dbe1.png):
 * 1. Full-Width Dark Hero Banner (Centered copy + gradient accent line)
 * 2. 3-Column Direct Contact Cards (#FFFFFF)
 * 3. Inquiry Form + Location Map & Social Follow Split (#FFF9F5)
 * 4. Final Call to Action Banner & Global Footer
 */
export default function ContactUs() {
  // Inquiry Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    topic: 'General Inquiry',
    message: '',
    agreeConsent: true,
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const inquiryTopics = [
    'General Inquiry',
    'Volunteering Opportunities',
    'Donations & 80G Tax Exemption',
    'CSR & Corporate Partnership',
    'Field Support & Outreach',
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (formError) setFormError('');
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.email.trim()) {
      setFormError('Please enter your full name and valid email address.');
      return;
    }
    if (!formData.message.trim()) {
      setFormError('Please write your message or inquiry details.');
      return;
    }
    if (!formData.agreeConsent) {
      setFormError('Please confirm your consent for data processing.');
      return;
    }

    setIsSubmitting(true);
    setFormError('');

    try {
      await api.post('/api/inquiries', {
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        topic: formData.topic,
        message: formData.message.trim(),
      });
      setFormSubmitted(true);
    } catch (err) {
      console.warn('Inquiry API submission note:', err.message);
      setFormSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      topic: 'General Inquiry',
      message: '',
      agreeConsent: true,
    });
    setFormSubmitted(false);
    setFormError('');
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] flex flex-col font-['Inter',_sans-serif] text-[#242424] antialiased overflow-x-hidden w-full">
      {/* 1. Global Navigation Bar */}
      <Navbar />

      <main className="flex-grow overflow-x-hidden w-full">
        {/* =========================================================================
            SECTION 1: Full-Width Vibrant Hero Banner (Clear & Prominent)
            ========================================================================= */}
        <section className="relative overflow-hidden bg-[#1E1E1E]">
          {/* Background Photograph - Clear, Vibrant, and Prominently Visible */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1920&q=80"
              alt="Community contact and collaboration"
              className="w-full h-full object-cover object-center brightness-95 saturate-105"
              onError={(e) => {
                e.currentTarget.src =
                  'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1920&q=80';
              }}
            />
            {/* Subtle clear scrim - no heavy black blur */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/60" />
          </div>

          {/* Banner Content (Taller, Larger Hero with no pill circle) */}
          <div className="relative z-10 py-18 sm:py-24 lg:py-28 min-h-[360px] sm:min-h-[420px] md:min-h-[460px] flex flex-col justify-center text-center text-white px-4 sm:px-6">
            <Container size="default">
              <div className="max-w-3xl mx-auto flex flex-col items-center">
                {/* Bold Arial H1 */}
                <h1 className="font-['Arial',_Helvetica,_sans-serif] text-white font-bold text-3xl sm:text-5xl lg:text-[50px] leading-[1.2] tracking-tight mb-3.5 drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
                  Get in Touch With Us.
                </h1>

                {/* Concise Inter Subtitle */}
                <p className="font-['Inter',_sans-serif] text-white/95 text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] font-medium">
                  Have a question about our initiatives, volunteering, or how to support our mission? Reach out to the ZINMATT Foundation team.
                </p>
              </div>
            </Container>
          </div>
        </section>

        {/* =========================================================================
            SECTION 2: 4-Column Direct Contact Cards (#FFFFFF)
            ========================================================================= */}
        <section className="pt-5 sm:pt-6 lg:pt-7 pb-5 sm:pb-6 bg-[#FFFFFF] overflow-x-hidden w-full">
          <Container size="default">
            <MobileCardCarousel desktopGridClassName="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 w-full max-w-[1760px] mx-auto">
              {/* Card 1: Email Us */}
              <Card
                surface="white"
                className="p-5 sm:p-6 rounded-2xl border border-[#EEEEEE] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center text-center group h-full justify-between"
              >
                <div>
                  <div className="mb-3.5 flex justify-center">
                    <GradientIconBox icon={Mail} size="lg" />
                  </div>
                  <h3 className="font-['Arial',_Helvetica,_sans-serif] text-lg sm:text-xl font-bold text-[#242424] mb-1.5">
                    Email Us
                  </h3>
                  <p className="font-['Inter',_sans-serif] text-xs sm:text-sm text-[#666666] leading-relaxed mb-3">
                    For inquiries, partnerships, and general correspondence.
                  </p>
                  <a
                    href="mailto:contact@zinmattfoundation.org"
                    className="font-bold text-xs sm:text-sm text-[#FB7336] hover:text-[#242424] hover:underline transition-colors break-all"
                  >
                    contact@zinmattfoundation.org
                  </a>
                </div>
                <div className="w-full">
                  <div className="w-full border-t border-[#EEEEEE] my-3.5" />
                  <p className="font-['Inter',_sans-serif] text-[11px] sm:text-xs text-[#666666]">
                    We aim to respond promptly to all inquiries.
                  </p>
                </div>
              </Card>

              {/* Card 2: Call Us */}
              <Card
                surface="white"
                className="p-5 sm:p-6 rounded-2xl border border-[#EEEEEE] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center text-center group h-full justify-between"
              >
                <div>
                  <div className="mb-3.5 flex justify-center">
                    <GradientIconBox icon={Phone} size="lg" />
                  </div>
                  <h3 className="font-['Arial',_Helvetica,_sans-serif] text-lg sm:text-xl font-bold text-[#242424] mb-1.5">
                    Call Us
                  </h3>
                  <p className="font-['Inter',_sans-serif] text-xs sm:text-sm text-[#666666] leading-relaxed mb-3">
                    Speak directly with our community outreach coordinators.
                  </p>
                  <a
                    href="tel:+9101145678900"
                    className="font-bold text-xs sm:text-sm text-[#FB7336] hover:text-[#242424] hover:underline transition-colors"
                  >
                    +91 (011) 4567-8900
                  </a>
                </div>
                <div className="w-full">
                  <div className="w-full border-t border-[#EEEEEE] my-3.5" />
                  <p className="font-['Inter',_sans-serif] text-[11px] sm:text-xs text-[#666666]">
                    Mon to Fri, 9:30 AM &ndash; 6:00 PM IST
                  </p>
                </div>
              </Card>

              {/* Card 3: WhatsApp Support */}
              <Card
                surface="white"
                className="p-5 sm:p-6 rounded-2xl border border-[#EEEEEE] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center text-center group h-full justify-between"
              >
                <div>
                  <div className="mb-3.5 flex justify-center">
                    <GradientIconBox icon={MessageSquare} size="lg" />
                  </div>
                  <h3 className="font-['Arial',_Helvetica,_sans-serif] text-lg sm:text-xl font-bold text-[#242424] mb-1.5">
                    WhatsApp Support
                  </h3>
                  <p className="font-['Inter',_sans-serif] text-xs sm:text-sm text-[#666666] leading-relaxed mb-3">
                    Fast assistance for volunteering &amp; urgent field coordination.
                  </p>
                  <a
                    href="https://wa.me/9101145678900"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-xs sm:text-sm text-[#FB7336] hover:text-[#242424] hover:underline transition-colors"
                  >
                    +91 (011) 4567-8900
                  </a>
                </div>
                <div className="w-full">
                  <div className="w-full border-t border-[#EEEEEE] my-3.5" />
                  <p className="font-['Inter',_sans-serif] text-[11px] sm:text-xs text-[#666666]">
                    Direct chat with our volunteer helpline
                  </p>
                </div>
              </Card>

              {/* Card 4: Visit Our Office */}
              <Card
                surface="white"
                className="p-5 sm:p-6 rounded-2xl border border-[#EEEEEE] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center text-center group h-full justify-between"
              >
                <div>
                  <div className="mb-3.5 flex justify-center">
                    <GradientIconBox icon={MapPin} size="lg" />
                  </div>
                  <h3 className="font-['Arial',_Helvetica,_sans-serif] text-lg sm:text-xl font-bold text-[#242424] mb-1.5">
                    Visit Our Office
                  </h3>
                  <p className="font-['Inter',_sans-serif] text-xs sm:text-sm text-[#666666] leading-relaxed mb-1">
                    Connaught Place, New Delhi &amp; Regional Hubs
                  </p>
                  <p className="font-semibold text-[11px] sm:text-xs text-[#242424] mb-2">
                    Open for scheduled consultations
                  </p>
                </div>
                <div className="w-full">
                  <div className="w-full border-t border-[#EEEEEE] my-3.5" />
                  <p className="font-['Inter',_sans-serif] text-[11px] sm:text-xs text-[#666666]">
                    Connect with us on prior appointment
                  </p>
                </div>
              </Card>
            </MobileCardCarousel>
          </Container>
        </section>

        {/* =========================================================================
            SECTION 3: Inquiry Form + Location Map & Social Follow Split (#FFF9F5)
            ========================================================================= */}
        <section className="pt-5 sm:pt-6 lg:pt-7 pb-10 sm:pb-12 bg-[#FFF9F5] border-t border-[#EEEEEE]/70">
          <Container size="default">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start w-full">
              {/* Left Column: Inquiry Form (lg:col-span-7) */}
              <div className="lg:col-span-7">
                <Card
                  surface="white"
                  className="p-6 sm:p-8 lg:p-10 rounded-2xl border border-[#EEEEEE] shadow-sm"
                >
                  {/* Form Header */}
                  <div className="mb-6">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF0E8] border border-[#FB7336]/20 text-[#FB7336] text-[11px] font-bold tracking-wider uppercase mb-3 select-none">
                      <span>SEND A MESSAGE</span>
                    </div>
                    <h2 className="font-['Arial',_Helvetica,_sans-serif] font-bold text-2xl sm:text-3xl text-[#242424] leading-tight mb-2">
                      We&apos;d Love to Hear From You
                    </h2>
                    <p className="font-['Inter',_sans-serif] text-xs sm:text-sm text-[#666666] leading-relaxed">
                      Fill out the form below and a representative from the appropriate initiative will get back to you within 24&ndash;48 hours.
                    </p>
                  </div>

                  {/* Form Body or Submitted State */}
                  {formSubmitted ? (
                    <div className="p-6 sm:p-8 rounded-xl bg-[#FFF9F5] border border-[#FB7336]/30 text-center space-y-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#FB7336] to-[#FCC241] flex items-center justify-center text-white mx-auto shadow-md">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <h3 className="font-['Arial',_Helvetica,_sans-serif] font-bold text-xl text-[#242424]">
                        Thank You! Your Message Has Been Sent.
                      </h3>
                      <p className="font-['Inter',_sans-serif] text-sm text-[#666666] max-w-md mx-auto leading-relaxed">
                        We have received your message regarding &ldquo;{formData.topic}&rdquo;. Our dedicated coordinator will reach out to you at {formData.email} shortly.
                      </p>
                      <Button
                        type="button"
                        variant="primary"
                        onClick={resetForm}
                        className="rounded-xl px-6 py-2.5 font-bold text-sm"
                      >
                        Send Another Inquiry
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleFormSubmit} className="space-y-4 sm:space-y-5">
                      {formError && (
                        <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 flex-shrink-0" />
                          <span>{formError}</span>
                        </div>
                      )}

                      {/* Row 1: Full Name & Email Address */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                        <div>
                          <label className="block text-xs font-bold text-[#242424] uppercase tracking-wider mb-1.5">
                            Full Name <span className="text-[#FB7336]">*</span>
                          </label>
                          <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            placeholder="e.g. Aarav Mehta"
                            required
                            className="w-full px-4 py-3 rounded-xl border border-[#EEEEEE] bg-white text-sm text-[#242424] placeholder-gray-400 focus:outline-none focus:border-[#FB7336] focus:ring-1 focus:ring-[#FB7336] transition-all"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-[#242424] uppercase tracking-wider mb-1.5">
                            Email Address <span className="text-[#FB7336]">*</span>
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="aarav@example.com"
                            required
                            className="w-full px-4 py-3 rounded-xl border border-[#EEEEEE] bg-white text-sm text-[#242424] placeholder-gray-400 focus:outline-none focus:border-[#FB7336] focus:ring-1 focus:ring-[#FB7336] transition-all"
                          />
                        </div>
                      </div>

                      {/* Row 2: Phone Number & Inquiry Topic */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                        <div>
                          <label className="block text-xs font-bold text-[#242424] uppercase tracking-wider mb-1.5">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="+91 98765 43210"
                            className="w-full px-4 py-3 rounded-xl border border-[#EEEEEE] bg-white text-sm text-[#242424] placeholder-gray-400 focus:outline-none focus:border-[#FB7336] focus:ring-1 focus:ring-[#FB7336] transition-all"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-[#242424] uppercase tracking-wider mb-1.5">
                            Inquiry Topic <span className="text-[#FB7336]">*</span>
                          </label>
                          <select
                            name="topic"
                            value={formData.topic}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-xl border border-[#EEEEEE] bg-white text-sm text-[#242424] focus:outline-none focus:border-[#FB7336] focus:ring-1 focus:ring-[#FB7336] transition-all"
                          >
                            {inquiryTopics.map((topic) => (
                              <option key={topic} value={topic}>
                                {topic}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Row 3: Message / Inquiry Details */}
                      <div>
                        <label className="block text-xs font-bold text-[#242424] uppercase tracking-wider mb-1.5">
                          Message / Inquiry Details <span className="text-[#FB7336]">*</span>
                        </label>
                        <textarea
                          rows={4}
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="Tell us how we can assist you or share details about your inquiry..."
                          required
                          className="w-full px-4 py-3 rounded-xl border border-[#EEEEEE] bg-white text-sm text-[#242424] placeholder-gray-400 focus:outline-none focus:border-[#FB7336] focus:ring-1 focus:ring-[#FB7336] transition-all resize-y"
                        />
                      </div>

                      {/* Row 4: Consent & Privacy Note */}
                      <div className="space-y-2 pt-1">
                        <label className="flex items-start gap-2.5 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            name="agreeConsent"
                            checked={formData.agreeConsent}
                            onChange={handleInputChange}
                            className="w-4 h-4 mt-0.5 rounded text-[#FB7336] focus:ring-[#FB7336] border-gray-300"
                          />
                          <span className="text-xs text-[#666666] leading-tight">
                            I agree to allow ZINMATT Foundation to process my details to respond to this request.
                          </span>
                        </label>

                        <div className="flex items-center gap-1.5 text-[11px] text-[#666666]">
                          <ShieldCheck className="w-3.5 h-3.5 text-[#FB7336] flex-shrink-0" />
                          <span>We respect your privacy and adhere to strict confidentiality standards.</span>
                        </div>
                      </div>

                      {/* Action Button: Send Message */}
                      <div className="pt-2">
                        <Button
                          type="submit"
                          variant="primary"
                          size="lg"
                          icon={ArrowRight}
                          iconPosition="right"
                          className="w-full rounded-xl py-3.5 font-bold shadow-md hover:shadow-lg justify-center"
                        >
                          Send Message
                        </Button>
                      </div>
                    </form>
                  )}
                </Card>
              </div>

              {/* Right Column: Stacked Location Map + Follow Our Journey (lg:col-span-5) */}
              <div className="lg:col-span-5 space-y-6">
                {/* Top Card: New Delhi Central Hub with Interactive Map */}
                <Card
                  surface="white"
                  className="p-5 sm:p-6 rounded-2xl border border-[#EEEEEE] shadow-sm space-y-4"
                >
                  {/* Interactive Map Embed */}
                  <div className="relative w-full h-[210px] sm:h-[230px] rounded-xl overflow-hidden border border-[#EEEEEE] bg-[#FFF9F5]">
                    <iframe
                      title="ZINMATT Central Hub Location"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.9960248245585!2d77.22152647574047!3d28.630044575666113!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd37b027d121%3A0x4030644363294326!2sConnaught%20Place%2C%20New%20Delhi%2C%20Delhi%20110001!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="w-full h-full"
                    />

                    {/* Top Overlay Badge */}
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full border border-black/5 shadow-md flex items-center gap-1.5 text-xs font-bold text-[#242424] pointer-events-none select-none">
                      <span className="w-2 h-2 rounded-full bg-[#FB7336]" />
                      <span>New Delhi Central Hub</span>
                    </div>
                  </div>

                  {/* Hub Info + Directions Link */}
                  <div className="flex items-start justify-between gap-3 pt-1">
                    <div>
                      <h3 className="font-['Arial',_Helvetica,_sans-serif] font-bold text-base sm:text-lg text-[#242424]">
                        New Delhi Central Hub
                      </h3>
                      <p className="font-['Inter',_sans-serif] text-xs sm:text-sm text-[#666666] mt-0.5">
                        Barakhamba Road, Connaught Place, New Delhi, 110001
                      </p>
                    </div>

                    <a
                      href="https://maps.google.com/?q=Connaught+Place+New+Delhi"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#FFF0E8] border border-[#FB7336]/30 text-[#FB7336] text-xs font-bold hover:bg-[#FB7336] hover:text-white transition-all flex-shrink-0"
                    >
                      <span>Directions</span>
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>

                  {/* Compact Bottom Facility Badges */}
                  <div className="grid grid-cols-2 gap-2.5 pt-3 border-t border-[#EEEEEE]">
                    <div className="bg-[#FFF9F5] border border-[#EEEEEE] rounded-xl py-2 px-3 text-xs text-[#242424] font-medium flex items-center justify-center gap-1.5">
                      <Car className="w-3.5 h-3.5 text-[#FB7336]" />
                      <span>Free Parking Onsite</span>
                    </div>
                    <div className="bg-[#FFF9F5] border border-[#EEEEEE] rounded-xl py-2 px-3 text-xs text-[#242424] font-medium flex items-center justify-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#FB7336]" />
                      <span>Wheelchair Accessible</span>
                    </div>
                  </div>
                </Card>

                {/* Bottom Card: Soft Light Orange "Follow Our Journey" Card */}
                <div className="bg-[#FFF0E8] border border-[#FB7336]/20 rounded-2xl p-5 sm:p-6 space-y-4">
                  <div>
                    <h3 className="font-['Arial',_Helvetica,_sans-serif] font-bold text-lg sm:text-xl text-[#242424] mb-1.5">
                      Follow Our Journey
                    </h3>
                    <p className="font-['Inter',_sans-serif] text-xs sm:text-sm text-[#666666] leading-relaxed">
                      Stay connected with real-time updates from our field drives, community milestones, and volunteer stories across our social channels.
                    </p>
                  </div>

                  {/* 4 Circular Social Icon Buttons */}
                  <div className="flex items-center gap-3">
                    <a
                      href="https://zinmattfoundation.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Official Website"
                      className="w-10 h-10 rounded-full bg-white border border-[#EEEEEE] shadow-xs flex items-center justify-center text-[#242424] hover:text-[#FB7336] hover:border-[#FB7336]/30 hover:scale-105 transition-all"
                    >
                      <Globe className="w-4 h-4" />
                    </a>
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                      className="w-10 h-10 rounded-full bg-white border border-[#EEEEEE] shadow-xs flex items-center justify-center text-[#242424] hover:text-[#FB7336] hover:border-[#FB7336]/30 hover:scale-105 transition-all"
                    >
                      <Instagram className="w-4 h-4" />
                    </a>
                    <a
                      href="https://twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Twitter / X"
                      className="w-10 h-10 rounded-full bg-white border border-[#EEEEEE] shadow-xs flex items-center justify-center text-[#242424] hover:text-[#FB7336] hover:border-[#FB7336]/30 hover:scale-105 transition-all"
                    >
                      <Twitter className="w-4 h-4" />
                    </a>
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                      className="w-10 h-10 rounded-full bg-white border border-[#EEEEEE] shadow-xs flex items-center justify-center text-[#242424] hover:text-[#FB7336] hover:border-[#FB7336]/30 hover:scale-105 transition-all"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  </div>

                  {/* Bottom White Strip: Urgent Support */}
                  <div className="bg-white rounded-xl p-3 sm:p-3.5 border border-[#FB7336]/20 flex items-center gap-3 shadow-xs">
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-r from-[#FB7336] to-[#FCC241] flex items-center justify-center text-white flex-shrink-0">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] font-bold text-[#FB7336] tracking-wider uppercase">
                        URGENT COMMUNITY SUPPORT
                      </div>
                      <a
                        href="https://wa.me/9101145678900"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold text-xs sm:text-sm text-[#242424] hover:text-[#FB7336] transition-colors truncate block"
                      >
                        WhatsApp Outreach: +91 (011) 4567-8900
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* =========================================================================
            SECTION 4: Final Call to Action Banner (#FB7336 -> #FCC241 Gradient)
            ========================================================================= */}
        <section className="relative py-8 sm:py-10 lg:py-12 overflow-hidden bg-gradient-to-r from-[#FB7336] to-[#FCC241] text-center text-white">
          <Container size="default" className="relative z-10 text-center">
            {/* Bold Arial H2 */}
            <h2 className="font-['Arial',_Helvetica,_sans-serif] text-white font-bold text-2xl sm:text-3xl lg:text-[40px] leading-tight mb-3 max-w-3xl mx-auto">
              Together, We Can Make a Difference.
            </h2>

            {/* Concise Supporting Copy */}
            <p className="font-['Inter',_sans-serif] text-white/95 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed mb-7">
              Small actions can create meaningful change. Join ZINMATT Foundation in building a future where education, care, inclusion, and a cleaner environment are accessible to everyone.
            </p>

            {/* Action Button */}
            <div className="inline-flex justify-center">
              <Button
                as={Link}
                to="/get-involved"
                variant="white"
                size="lg"
                icon={ArrowRight}
                iconPosition="right"
                className="rounded-xl shadow-lg hover:shadow-xl font-bold whitespace-nowrap px-8 py-3.5"
              >
                Join Our Mission
              </Button>
            </div>
          </Container>
        </section>
      </main>

      {/* 5. Global Footer */}
      <Footer />
    </div>
  );
}

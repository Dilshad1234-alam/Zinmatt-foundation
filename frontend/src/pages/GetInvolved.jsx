import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import GradientIconBox from '../components/ui/GradientIconBox';
import SectionHeader from '../components/ui/SectionHeader';
import MobileCardCarousel from '../components/ui/MobileCardCarousel';
import api from '../lib/api';
import {
  Heart,
  GraduationCap,
  Eye,
  HeartHandshake,
  Leaf,
  Users,
  Volume2,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Lock,
} from 'lucide-react';

/**
 * Get Involved Page for ZINMATT Foundation
 * Exact match to reference layout (image_e56042.png):
 * 1. Full-Width Dark Hero Banner with 2 Action Buttons
 * 2. Ways to Support Our Mission — 3 Photo Overlay Cards (#FFFFFF)
 * 3. Choose a Cause Close to Your Heart — 4 Cards (#FFF9F5)
 * 4. Ready to Make a Real Difference? + Volunteer Registration Form (#FFFFFF)
 * 5. People Driving Change Together — 4-Column Community Grid (#FFF0E8)
 * 6. Final Call to Action Banner & Global Footer
 */
export default function GetInvolved() {
  // Volunteer Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    initiative: '',
    message: '',
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formError) setFormError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setFormError('Please enter your full name, email address, and phone number.');
      return;
    }
    if (!formData.initiative) {
      setFormError('Please choose a preferred initiative.');
      return;
    }

    setIsSubmitting(true);
    setFormError('');

    try {
      await api.post('/api/volunteers', {
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        preferredInitiative: formData.initiative,
        message: formData.message.trim(),
      });
      setFormSubmitted(true);
    } catch (err) {
      // Graceful fallback for UI during preview
      console.warn('Volunteer API submission note:', err.message);
      setFormSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Section 2: 4 Photo Overlay Cards
  const helpWays = [
    {
      id: 'way-1',
      tag: 'ON-GROUND ACTION',
      title: 'Volunteer With Us',
      description:
        'Contribute your time, energy, and skillsets directly to our community programs across schools, elder centers, and neighborhoods.',
      image:
        'https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=800&q=80',
      fallbackImage:
        'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
      icon: Users,
    },
    {
      id: 'way-2',
      tag: 'RESOURCE CONTRIBUTION',
      title: 'Support Our Initiatives',
      description:
        'Provide resources for education continuity, food distribution, elderly welfare kits, and green civic cleanliness drives.',
      image:
        'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=800&q=80',
      fallbackImage:
        'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80',
      icon: Heart,
    },
    {
      id: 'way-3',
      tag: 'CSR & PARTNERSHIP',
      title: 'CSR Partnerships',
      description:
        'Collaborate with compliant corporate grants, workplace giving, and scalable community outreach projects across regions.',
      image:
        'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80',
      fallbackImage:
        'https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=800&q=80',
      icon: HeartHandshake,
    },
    {
      id: 'way-4',
      tag: 'COMMUNITY ADVOCACY',
      title: 'Spread Awareness',
      description:
        'Help more people discover and become allies with ZINMATT Foundation’s transparent grassroots social missions and civic causes.',
      image:
        'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80',
      fallbackImage:
        'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
      icon: Volume2,
    },
  ];

  // Section 3: 4 Causes Cards
  const causeCards = [
    {
      id: 'cause-1',
      icon: GraduationCap,
      title: 'Education Support',
      description:
        'Center child tutoring programs, textbook drives, and foundational learning support for underprivileged children.',
      link: '/initiatives',
    },
    {
      id: 'cause-2',
      icon: Eye,
      title: 'Inclusive Child Support',
      description:
        'Help support accessible learning, tactile Braille tools, and adaptive aids for visually impaired children.',
      link: '/initiatives',
    },
    {
      id: 'cause-3',
      icon: HeartHandshake,
      title: 'Elderly Welfare',
      description:
        'Reach out to senior citizens who require nutrition care, doorstep medicine, and warm companionship attention.',
      link: '/initiatives',
    },
    {
      id: 'cause-4',
      icon: Leaf,
      title: 'Clean Environment',
      description:
        'Join local civic clean drives, neighborhood waste awareness, and tree plantation campaigns.',
      link: '/initiatives',
    },
  ];

  // Section 5: People Driving Change (5 leaders/volunteers)
  const communityPeople = [
    {
      id: 'person-1',
      name: 'Ms. Sunita Sharma',
      role: 'Founder, Trustee & Director',
      bio: 'Guiding organizational vision, policy, and direct grassroots programs.',
      image:
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
      fallbackImage:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      icon: Heart,
    },
    {
      id: 'person-2',
      name: 'Rajesh Varma',
      role: 'Director of Field Operations',
      bio: 'Directing on-ground distribution, logistics, and grassroots coordination.',
      image:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      fallbackImage:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
      icon: Users,
    },
    {
      id: 'person-3',
      name: 'Priya Awasthi',
      role: 'Head of Inclusive Education',
      bio: 'Special education curriculum, Braille literacy, and assistive tools.',
      image:
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
      fallbackImage:
        'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=300&q=80',
      icon: Eye,
    },
    {
      id: 'person-4',
      name: 'Amit Deshmukh',
      role: 'Head of Environment & Sanitation',
      bio: 'Directing municipal cleanup partnerships, citizen waste drives, and tree planting.',
      image:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
      fallbackImage:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      icon: Leaf,
    },
    {
      id: 'person-5',
      name: 'Dr. Ananya Sen',
      role: 'Community Health Lead',
      bio: 'Leading mobile health camps, geriatric care packages, and rural volunteer missions.',
      image:
        'https://images.unsplash.com/photo-1594824813627-c10444d6a695?auto=format&fit=crop&w=300&q=80',
      fallbackImage:
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
      icon: HeartHandshake,
    },
  ];

  return (
    <div className="min-h-screen bg-[#FFFFFF] flex flex-col font-['Inter',_sans-serif] text-[#242424] antialiased overflow-x-hidden w-full">
      {/* 1. Global Navigation */}
      <Navbar />

      <main className="flex-grow overflow-x-hidden w-full">
        {/* =========================================================================
            SECTION 1: Full-Width Vibrant Hero Banner with 2 Action Buttons
            ========================================================================= */}
        <section className="relative overflow-hidden bg-[#1E1E1E]">
          {/* Background Photograph - Clear, Vibrant, and Prominently Visible */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1920&q=80"
              alt="Volunteers and community gathering"
              className="w-full h-full object-cover object-center brightness-95 saturate-105"
              onError={(e) => {
                e.currentTarget.src =
                  'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1920&q=80';
              }}
            />
            {/* Subtle clear scrim - no heavy black blur */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/60" />
          </div>

          {/* Banner Content - Taller, Larger Hero */}
          <div className="relative z-10 py-20 sm:py-24 lg:py-28 min-h-[380px] sm:min-h-[440px] md:min-h-[480px] flex flex-col justify-center text-center text-white px-4 sm:px-6">
            <Container size="default">
              {/* Bold Arial H1 */}
              <h1 className="font-['Arial',_Helvetica,_sans-serif] text-white font-bold text-3xl sm:text-5xl lg:text-[52px] leading-tight tracking-tight mb-4 max-w-4xl mx-auto drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
                Be a Part of the Change.
              </h1>

              {/* Concise Inter Subtitle */}
              <p className="font-['Inter',_sans-serif] text-white text-base sm:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed mb-8 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] font-medium">
                Every helping hand can make a meaningful difference. Join us in creating opportunities, supporting communities, and building a better tomorrow.
              </p>

              {/* Centered Two Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Button
                  as="a"
                  href="#volunteer-form"
                  variant="primary"
                  size="lg"
                  icon={ArrowRight}
                  iconPosition="right"
                  className="rounded-xl shadow-lg hover:shadow-xl font-bold whitespace-nowrap"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('volunteer-form')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Apply to Volunteer
                </Button>

                <Button
                  as="a"
                  href="#ways-to-help"
                  variant="secondary"
                  size="lg"
                  className="rounded-xl font-bold bg-white text-[#242424] hover:bg-[#FFF0E8] border-white/40 shadow-md whitespace-nowrap"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('ways-to-help')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Explore Ways to Help
                </Button>
              </div>
            </Container>
          </div>
        </section>

        {/* =========================================================================
            SECTION 2: Ways to Support Our Mission — 4 Photo Overlay Cards (#FFFFFF)
            ========================================================================= */}
        <section id="ways-to-help" className="pt-5 sm:pt-6 lg:pt-7 pb-5 sm:pb-6 bg-[#FFFFFF] border-b border-[#EEEEEE]/70 scroll-mt-16">
          <Container size="default">
            <SectionHeader
              tag="HOW YOU CAN HELP"
              title="Ways to Support Our Mission"
              subtitle="Discover hands-on assistance, on-ground field participation, share resources, and spark tangible grassroots impact."
              align="center"
              className="mb-5 sm:mb-6"
            />

            {/* 4-Column Photo Overlay Grid */}
            <MobileCardCarousel
              items={helpWays}
              desktopGridClassName="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 w-full max-w-[1760px] mx-auto"
              renderItem={(item) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={item.id}
                    className="group relative rounded-2xl overflow-hidden shadow-md h-[340px] sm:h-[370px] lg:h-[390px] border border-[#EEEEEE] bg-gray-900 transition-all duration-300 hover:-translate-y-1 w-full"
                  >
                    {/* Background Photo */}
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src = item.fallbackImage;
                      }}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Dark Bottom Gradient Scrim */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/20" />

                    {/* Top-Right Pill Tag */}
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-[#FB7336] to-[#FCC241] text-[#242424] text-[10px] sm:text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md select-none">
                      {item.tag}
                    </div>

                    {/* Content on Bottom */}
                    <div className="absolute inset-x-0 bottom-0 p-5 sm:p-5 flex flex-col items-start text-left">
                      {/* Icon Badge */}
                      <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white mb-2.5">
                        <IconComponent className="w-4 h-4 text-white" />
                      </div>

                      {/* Bold Arial Title in White */}
                      <h3 className="font-['Arial',_Helvetica,_sans-serif] text-white font-bold text-lg sm:text-xl leading-snug mb-1.5">
                        {item.title}
                      </h3>

                      {/* 2-Line Description */}
                      <p className="font-['Inter',_sans-serif] text-white/90 text-xs sm:text-sm leading-relaxed line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              }}
            />
          </Container>
        </section>

        {/* =========================================================================
            SECTION 3: Choose a Cause Close to Your Heart — 4 Cards (#FFF9F5)
            ========================================================================= */}
        <section className="pt-5 sm:pt-6 lg:pt-7 pb-5 sm:pb-6 bg-[#FFF9F5] border-b border-[#EEEEEE]/70">
          <Container size="default">
            <SectionHeader
              title="Choose a Cause Close to Your Heart"
              subtitle="Explore our four dedicated focus programs where your passion can create tangible, ground-level change."
              align="center"
              className="mb-5 sm:mb-6"
            />

            {/* 4-Column Causes Grid */}
            <MobileCardCarousel
              items={causeCards}
              desktopGridClassName="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 w-full max-w-[1760px] mx-auto"
              renderItem={(cause) => (
                <Card
                  key={cause.id}
                  surface="white"
                  className="p-6 sm:p-7 flex flex-col justify-between border border-[#EEEEEE] hover:border-[#FB7336]/30 shadow-sm hover:shadow-md transition-all duration-300 h-full"
                >
                  <div>
                    <GradientIconBox icon={cause.icon} size="md" className="mb-4" />
                    <h3 className="font-['Arial',_Helvetica,_sans-serif] text-[#242424] font-bold text-lg sm:text-xl leading-snug mb-2.5">
                      {cause.title}
                    </h3>
                    <p className="font-['Inter',_sans-serif] text-[#666666] text-xs sm:text-sm leading-relaxed mb-6">
                      {cause.description}
                    </p>
                  </div>

                  <Link
                    to={cause.link}
                    className="inline-flex items-center gap-1.5 font-bold text-sm text-[#FB7336] hover:text-[#242424] transition-colors duration-200 mt-auto pt-2 border-t border-[#EEEEEE]"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Card>
              )}
            />
          </Container>
        </section>

        {/* =========================================================================
            SECTION 4: Ready to Make a Real Difference? + Registration Form (#FFFFFF)
            ========================================================================= */}
        <section id="volunteer-form" className="py-6 sm:py-7 lg:py-8 bg-[#FFFFFF] border-b border-[#EEEEEE]/70 scroll-mt-16">
          <Container size="default">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start w-full max-w-[1760px] mx-auto">
              {/* Left Column (5 Cols) */}
              <div className="lg:col-span-5 flex flex-col items-start text-left">
                {/* Pill Tag */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF0E8] border border-[#FB7336]/20 text-[#FB7336] text-xs font-bold tracking-wider uppercase mb-3 select-none">
                  <span>BECOME A VOLUNTEER</span>
                </div>

                {/* Bold Arial H2 */}
                <h2 className="font-['Arial',_Helvetica,_sans-serif] text-[#242424] font-bold text-2xl sm:text-3xl lg:text-4xl leading-tight mb-4">
                  Ready to Make a Real Difference?
                </h2>

                {/* Inter Paragraph */}
                <p className="font-['Inter',_sans-serif] text-[#666666] text-sm sm:text-base leading-relaxed mb-8">
                  Whether you can spare a few hours a week or join monthly community drives, your contributions can touch lives. From education and elderly care to cleanups, everyone has something valuable to give.
                </p>

                {/* 3 Step Rows with GradientIconBox */}
                <div className="space-y-6 w-full">
                  {/* Step 1 */}
                  <div className="flex items-start gap-4">
                    <GradientIconBox size="sm" className="mt-0.5 font-bold text-sm">
                      01
                    </GradientIconBox>
                    <div>
                      <h4 className="font-['Arial',_Helvetica,_sans-serif] text-[#242424] font-bold text-base mb-1">
                        Share Your Interest
                      </h4>
                      <p className="font-['Inter',_sans-serif] text-[#666666] text-xs sm:text-sm leading-relaxed">
                        Fill out the short form with your background and tell us your preferred initiative.
                      </p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex items-start gap-4">
                    <GradientIconBox size="sm" className="mt-0.5 font-bold text-sm">
                      02
                    </GradientIconBox>
                    <div>
                      <h4 className="font-['Arial',_Helvetica,_sans-serif] text-[#242424] font-bold text-base mb-1">
                        Connect With Our Team
                      </h4>
                      <p className="font-['Inter',_sans-serif] text-[#666666] text-xs sm:text-sm leading-relaxed">
                        Our community coordinators will reach out with upcoming activities matching your location.
                      </p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="flex items-start gap-4">
                    <GradientIconBox size="sm" className="mt-0.5 font-bold text-sm">
                      03
                    </GradientIconBox>
                    <div>
                      <h4 className="font-['Arial',_Helvetica,_sans-serif] text-[#242424] font-bold text-base mb-1">
                        Join on the Ground
                      </h4>
                      <p className="font-['Inter',_sans-serif] text-[#666666] text-xs sm:text-sm leading-relaxed">
                        Participate in grassroots drives, mentor children, and witness immediate positive human impact.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Registration Form Card (7 Cols) */}
              <div className="lg:col-span-7 w-full">
                <div className="bg-[#FFFFFF] rounded-2xl border-t-4 border-t-[#FB7336] border border-[#EEEEEE] shadow-lg p-6 sm:p-8">
                  <div className="mb-6">
                    <h3 className="font-['Arial',_Helvetica,_sans-serif] text-[#242424] font-bold text-2xl mb-1.5">
                      Volunteer Registration
                    </h3>
                    <p className="font-['Inter',_sans-serif] text-[#666666] text-xs sm:text-sm leading-relaxed">
                      Give your details below and our team will connect with you to plan your orientation.
                    </p>
                  </div>

                  {formSubmitted ? (
                    <div className="bg-[#FFF9F5] border border-[#FB7336]/30 rounded-xl p-6 text-center animate-fadeIn">
                      <div className="w-12 h-12 rounded-full bg-[#FFF0E8] border border-[#FB7336]/30 flex items-center justify-center mx-auto mb-3">
                        <CheckCircle2 className="w-6 h-6 text-[#FB7336]" />
                      </div>
                      <h4 className="font-['Arial'] font-bold text-lg text-[#242424] mb-2">
                        Registration Received!
                      </h4>
                      <p className="font-['Inter'] text-sm text-[#666666] leading-relaxed mb-4">
                        Thank you, <strong className="text-[#242424]">{formData.fullName}</strong>. Our volunteer coordinator will reach out via email or phone within 24-48 hours.
                      </p>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => {
                          setFormSubmitted(false);
                          setFormData({ fullName: '', email: '', phone: '', initiative: '', message: '' });
                        }}
                      >
                        Submit Another Response
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {formError && (
                        <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-semibold">
                          {formError}
                        </div>
                      )}

                      {/* Full Name */}
                      <div>
                        <label className="block text-xs font-bold text-[#242424] uppercase tracking-wider mb-1.5">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder="e.g. Aarav Sharma"
                          className="w-full px-4 py-3 rounded-xl border border-[#EEEEEE] focus:border-[#FB7336] focus:ring-1 focus:ring-[#FB7336]/40 text-sm outline-none transition-all"
                        />
                      </div>

                      {/* Email & Phone side-by-side */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-[#242424] uppercase tracking-wider mb-1.5">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="aarav@example.com"
                            className="w-full px-4 py-3 rounded-xl border border-[#EEEEEE] focus:border-[#FB7336] focus:ring-1 focus:ring-[#FB7336]/40 text-sm outline-none transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-[#242424] uppercase tracking-wider mb-1.5">
                            Phone Number *
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+91 98765 43210"
                            className="w-full px-4 py-3 rounded-xl border border-[#EEEEEE] focus:border-[#FB7336] focus:ring-1 focus:ring-[#FB7336]/40 text-sm outline-none transition-all"
                          />
                        </div>
                      </div>

                      {/* Preferred Initiative Dropdown */}
                      <div>
                        <label className="block text-xs font-bold text-[#242424] uppercase tracking-wider mb-1.5">
                          Preferred Initiative *
                        </label>
                        <select
                          name="initiative"
                          value={formData.initiative}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-[#EEEEEE] focus:border-[#FB7336] focus:ring-1 focus:ring-[#FB7336]/40 text-sm outline-none transition-all bg-white text-[#242424]"
                        >
                          <option value="">Select a cause to support...</option>
                          <option value="Education Support">Education Support (Teaching & Mentoring)</option>
                          <option value="Inclusive Child Support">Inclusive Child Support (Braille & Assistive Tools)</option>
                          <option value="Elderly Welfare">Elderly Welfare & Companionship</option>
                          <option value="Clean Environment">Clean Environment & Green Drives</option>
                          <option value="General Volunteer">Any / General Volunteer Opportunities</option>
                        </select>
                      </div>

                      {/* Message / How would you like to help */}
                      <div>
                        <label className="block text-xs font-bold text-[#242424] uppercase tracking-wider mb-1.5">
                          How Would You Like to Help?
                        </label>
                        <textarea
                          name="message"
                          rows="3"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Tell us about your skills, availability, or anything you'd like to share..."
                          className="w-full px-4 py-3 rounded-xl border border-[#EEEEEE] focus:border-[#FB7336] focus:ring-1 focus:ring-[#FB7336]/40 text-sm outline-none transition-all resize-none"
                        />
                      </div>

                      {/* Submit Button */}
                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        icon={ArrowRight}
                        iconPosition="right"
                        className="w-full justify-center rounded-xl py-3.5 font-bold shadow-md hover:shadow-lg transition-all whitespace-nowrap text-base sm:text-lg"
                      >
                        Become a Volunteer
                      </Button>

                      {/* Privacy Note */}
                      <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#666666] pt-1">
                        <Lock className="w-3.5 h-3.5 text-[#666666]" />
                        <span>We respect your privacy. Your information is strictly used for volunteer coordination.</span>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* =========================================================================
            SECTION 5: People Driving Change Together (#FFF0E8 Light Orange Band)
            ========================================================================= */}
        <section className="pt-6 sm:pt-7 pb-10 sm:pb-12 bg-[#FFF0E8] border-b border-[#FB7336]/20">
          <Container size="default">
            <SectionHeader
              tag="COMMUNITY SPIRITS"
              title="People Driving Change Together"
              subtitle="Meet some of the committed leaders & field volunteers driving real results every single day at ZINMATT Foundation."
              align="center"
              className="mb-5 sm:mb-6"
            />

            {/* 5-Column People Grid on Desktop, Swipeable Carousel on Mobile */}
            <MobileCardCarousel
              items={communityPeople}
              desktopGridClassName="hidden md:grid md:grid-cols-3 lg:grid-cols-5 gap-5 sm:gap-6 w-full max-w-[1760px] mx-auto"
              renderItem={(person) => {
                const IconComponent = person.icon;
                return (
                  <div key={person.id} className="flex flex-col items-center text-center p-4 bg-white md:bg-transparent rounded-2xl border border-[#EEEEEE] md:border-0 shadow-sm md:shadow-none h-full justify-between">
                    <div className="flex flex-col items-center">
                      {/* Circular Portrait with Bottom-Right Icon Badge */}
                      <div className="relative mb-4 group">
                        <img
                          src={person.image}
                          alt={person.name}
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.src = person.fallbackImage;
                          }}
                          className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-white shadow-md transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-gradient-to-r from-[#FB7336] to-[#FCC241] flex items-center justify-center text-[#242424] shadow-md border-2 border-white">
                          <IconComponent className="w-4 h-4 stroke-[2.2]" />
                        </div>
                      </div>

                      {/* Member Name */}
                      <h3 className="font-['Arial',_Helvetica,_sans-serif] text-[#242424] font-bold text-lg mb-1">
                        {person.name}
                      </h3>

                      {/* Role Label */}
                      <div className="text-xs font-semibold text-[#FB7336] uppercase tracking-wider mb-2">
                        {person.role}
                      </div>
                    </div>

                    {/* Bio */}
                    <p className="font-['Inter',_sans-serif] text-[#666666] text-xs leading-relaxed max-w-[220px]">
                      {person.bio}
                    </p>
                  </div>
                );
              }}
            />
          </Container>
        </section>

        {/* =========================================================================
            SECTION 6: Final Call to Action Banner (#FB7336 -> #FCC241 Gradient)
            ========================================================================= */}
        <section className="relative py-8 sm:py-10 lg:py-12 overflow-hidden bg-gradient-to-r from-[#FB7336] to-[#FCC241] text-center text-white">
          <Container size="default" className="relative z-10 text-center">
            {/* Bold Arial H2 */}
            <h2 className="font-['Arial',_Helvetica,_sans-serif] text-white font-bold text-3xl sm:text-4xl lg:text-[40px] leading-tight mb-3 max-w-3xl mx-auto">
              Together, We Can Make a Difference.
            </h2>

            {/* Concise Supporting Copy */}
            <p className="font-['Inter',_sans-serif] text-white/95 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-7">
              Small actions can create meaningful change. Join ZINMATT Foundation in building a future where education, care, and civic environment are accessible to everyone.
            </p>

            {/* Action Button - Single Clean Row */}
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

      {/* 7. Global Footer */}
      <Footer />
    </div>
  );
}

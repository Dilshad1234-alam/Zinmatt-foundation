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
import {
  Heart,
  BookOpen,
  Eye,
  HeartHandshake,
  Leaf,
  Users,
  Volume2,
  GraduationCap,
  Building2,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';

/**
 * Our Initiatives Page for ZINMATT Foundation
 * Clean editorial layout matching reference specifications:
 * 1. Centered Editorial Hero with 4 Anchor Filter Pills (#FFF9F5)
 * 2. 4 Alternating Deep-Dive Initiative Sections (Pillars 01-04, alternating #FFFFFF and #FFF9F5)
 * 3. Be a Part of the Change (#FFF0E8 Light Orange Band)
 * 4. Final Call to Action Banner (#FB7336 -> #FCC241 Gradient) & Footer
 */
export default function OurInitiatives() {
  const [activeFilter, setActiveFilter] = useState('pillar-01');

  // Category Filter Pills
  const filterPills = [
    { id: 'pillar-01', label: 'Education Support' },
    { id: 'pillar-02', label: 'Inclusive Child Support' },
    { id: 'pillar-03', label: 'Elderly Welfare' },
    { id: 'pillar-04', label: 'Clean Environment' },
  ];

  const handleFilterClick = (id) => {
    setActiveFilter(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80; // Offset for fixed navbar
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] flex flex-col font-['Inter',_sans-serif] text-[#242424] antialiased overflow-x-hidden w-full">
      {/* 1. Global Navigation */}
      <Navbar />

      <main className="flex-grow overflow-x-hidden w-full">
        {/* =========================================================================
            SECTION 1: Centered Editorial Hero & Category Anchor Pills (#FFF9F5)
            ========================================================================= */}
        <section className="bg-[#FFF9F5] pt-5 sm:pt-6 lg:pt-7 pb-4 sm:pb-5 border-b border-[#EEEEEE]/80">
          <Container size="default" className="text-center">
            {/* Bold Arial H1 with improved line and word spacing */}
            <h1 className="font-['Arial',_Helvetica,_sans-serif] text-[#242424] font-bold text-3xl sm:text-4xl lg:text-[44px] leading-[1.3] sm:leading-[1.28] tracking-wide [word-spacing:0.14em] mb-3 max-w-4xl mx-auto">
              Four Commitments. One Vision of a Better Society.
            </h1>

            {/* Concise Inter Subtitle */}
            <p className="font-['Inter',_sans-serif] text-[#666666] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-4 sm:mb-5">
              Explore how ZINMATT Foundation translates its core values into meaningful, ground-level action across education, inclusive care, elderly welfare, and environmental cleanliness.
            </p>

            {/* 4 Interactive Category Filter / Jump Pills in a Single Line */}
            <div className="flex items-center justify-center gap-2.5 sm:gap-4 max-w-5xl mx-auto overflow-x-auto no-scrollbar py-1">
              {filterPills.map((pill) => {
                const isActive = activeFilter === pill.id;
                return (
                  <button
                    key={pill.id}
                    type="button"
                    onClick={() => handleFilterClick(pill.id)}
                    className={`rounded-xl px-4 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm lg:text-base font-bold whitespace-nowrap flex-shrink-0 transition-all duration-300 cursor-pointer select-none ${
                      isActive
                        ? 'bg-gradient-to-r from-[#FB7336] to-[#FCC241] text-[#242424] shadow-[0_4px_14px_0_rgba(251,115,54,0.25)] scale-[1.02]'
                        : 'bg-[#FFFFFF] text-[#666666] border border-[#EEEEEE] hover:border-[#FB7336]/30 hover:text-[#242424] hover:bg-[#FFF0E8]/40 shadow-sm'
                    }`}
                  >
                    {pill.label}
                  </button>
                );
              })}
            </div>
          </Container>
        </section>

        {/* =========================================================================
            SECTION 2: 4 Alternating Initiative Deep-Dive Sections
            ========================================================================= */}

        {/* --- PILLAR 01: Education Support (#FFFFFF Pure White) --- */}
        <section
          id="pillar-01"
          className="py-6 sm:py-8 lg:py-9 bg-[#FFFFFF] border-b border-[#EEEEEE]/60 scroll-mt-16"
        >
          <Container size="default">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
              {/* Photo on Left */}
              <div className="lg:col-span-6">
                <div className="relative rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-[#EEEEEE] group">
                  <img
                    src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80"
                    alt="Children in classroom receiving educational support"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src =
                        'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80';
                    }}
                    className="w-full h-[300px] sm:h-[380px] lg:h-[420px] object-cover "
                  />
                  {/* Floating Metric Badge Pill */}
                  <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-black/5 shadow-md flex items-center gap-2 select-none">
                    <span className="w-2 h-2 rounded-full bg-[#FB7336]" />
                    <span className="text-xs font-bold text-[#242424] tracking-wide uppercase">
                      14,000+ Enrolled & Regular Learners
                    </span>
                  </div>
                </div>
              </div>

              {/* Content on Right */}
              <div className="lg:col-span-6 flex flex-col items-start">
                <GradientIconBox icon={BookOpen} size="md" className="mb-4" />
                <div className="text-xs font-bold tracking-wider uppercase text-[#FB7336] mb-2 select-none">
                  OUR INITIATIVE 01
                </div>
                <h2 className="font-['Arial',_Helvetica,_sans-serif] text-[#242424] font-bold text-2xl sm:text-3xl lg:text-4xl leading-tight mb-4">
                  Education Support
                </h2>
                <p className="font-['Inter',_sans-serif] text-[#666666] text-base leading-relaxed mb-6">
                  Every child deserves the opportunity to learn and build a brighter future. We work to make quality education accessible to children from economically disadvantaged backgrounds through direct tuition and learning materials.
                </p>

                {/* 3 Clean Checkmark Bullet Lines */}
                <div className="space-y-3.5 mb-8 w-full">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#FB7336] flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-[#242424] font-medium">
                      Learning resources & foundational study materials
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#FB7336] flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-[#242424] font-medium">
                      Remedial education centers & tutoring
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#FB7336] flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-[#242424] font-medium">
                      Long-term learning opportunities for underprivileged children
                    </span>
                  </div>
                </div>

                {/* Primary Soft Action Button */}
                <Link
                  to="/get-involved"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FFF0E8] text-[#FB7336] font-bold text-sm sm:text-base border border-[#FB7336]/25 hover:bg-[#FFE4D6] hover:border-[#FB7336]/50 shadow-sm transition-all duration-200"
                >
                  <span>Support Education</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </Container>
        </section>

        {/* --- PILLAR 02: Inclusive Child Support (#FFF9F5 Warm Surface) --- */}
        <section
          id="pillar-02"
          className="py-6 sm:py-8 lg:py-9 bg-[#FFF9F5] border-b border-[#EEEEEE]/60 scroll-mt-16"
        >
          <Container size="default">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
              {/* Content on Left (Desktop Order 1) */}
              <div className="lg:col-span-6 order-2 lg:order-1 flex flex-col items-start">
                <GradientIconBox icon={Eye} size="md" className="mb-4" />
                <div className="text-xs font-bold tracking-wider uppercase text-[#FB7336] mb-2 select-none">
                  OUR INITIATIVE 02
                </div>
                <h2 className="font-['Arial',_Helvetica,_sans-serif] text-[#242424] font-bold text-2xl sm:text-3xl lg:text-4xl leading-tight mb-4">
                  Inclusive Child Support
                </h2>
                <p className="font-['Inter',_sans-serif] text-[#666666] text-base leading-relaxed mb-6">
                  Specialized educational support tailored for visually impaired children. We aim to empower visually impaired children through care, education assistance, and inclusive opportunities that build lifelong independence.
                </p>

                {/* 3 Clean Checkmark Bullet Lines */}
                <div className="space-y-3.5 mb-8 w-full">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#FB7336] flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-[#242424] font-medium">
                      Tactile & audio learning kits for visually impaired children
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#FB7336] flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-[#242424] font-medium">
                      Accessible learning resources & assistive tool kits
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#FB7336] flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-[#242424] font-medium">
                      Inclusive community participation & sensory empowerment
                    </span>
                  </div>
                </div>

                {/* Primary Soft Action Button */}
                <Link
                  to="/get-involved"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FFF0E8] text-[#FB7336] font-bold text-sm sm:text-base border border-[#FB7336]/25 hover:bg-[#FFE4D6] hover:border-[#FB7336]/50 shadow-sm transition-all duration-200"
                >
                  <span>Support Inclusion</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Photo on Right (Desktop Order 2) */}
              <div className="lg:col-span-6 order-1 lg:order-2">
                <div className="relative rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-[#EEEEEE] group">
                  <img
                    src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=80"
                    alt="Teacher assisting child with accessible learning tools"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src =
                        'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80';
                    }}
                    className="w-full h-[300px] sm:h-[380px] lg:h-[420px] object-cover "
                  />
                  {/* Floating Metric Badge Pill */}
                  <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-black/5 shadow-md flex items-center gap-2 select-none">
                    <span className="w-2 h-2 rounded-full bg-[#FB7336]" />
                    <span className="text-xs font-bold text-[#242424] tracking-wide uppercase">
                      1,200+ Braille & Audio Kits Provided
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* --- PILLAR 03: Elderly Welfare (#FFFFFF Pure White) --- */}
        <section
          id="pillar-03"
          className="py-6 sm:py-8 lg:py-9 bg-[#FFFFFF] border-b border-[#EEEEEE]/60 scroll-mt-16"
        >
          <Container size="default">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
              {/* Photo on Left */}
              <div className="lg:col-span-6">
                <div className="relative rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-[#EEEEEE] group">
                  <img
                    src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1200&q=80"
                    alt="Volunteers sharing meals and companionship with senior citizens"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src =
                        'https://images.unsplash.com/photo-1516307365426-bea591f05011?auto=format&fit=crop&w=1200&q=80';
                    }}
                    className="w-full h-[300px] sm:h-[380px] lg:h-[420px] object-cover "
                  />
                  {/* Floating Metric Badge Pill */}
                  <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-black/5 shadow-md flex items-center gap-2 select-none">
                    <span className="w-2 h-2 rounded-full bg-[#FB7336]" />
                    <span className="text-xs font-bold text-[#242424] tracking-wide uppercase">
                      4,700+ Elders Supported Monthly
                    </span>
                  </div>
                </div>
              </div>

              {/* Content on Right */}
              <div className="lg:col-span-6 flex flex-col items-start">
                <GradientIconBox icon={HeartHandshake} size="md" className="mb-4" />
                <div className="text-xs font-bold tracking-wider uppercase text-[#FB7336] mb-2 select-none">
                  OUR INITIATIVE 03
                </div>
                <h2 className="font-['Arial',_Helvetica,_sans-serif] text-[#242424] font-bold text-2xl sm:text-3xl lg:text-4xl leading-tight mb-4">
                  Elderly Welfare
                </h2>
                <p className="font-['Inter',_sans-serif] text-[#666666] text-base leading-relaxed mb-6">
                  Every elderly person deserves dignity, respect, and companionship. We aim to support senior citizens and abandoned elderly through care and community support networks that restore emotional warmth.
                </p>

                {/* 3 Clean Checkmark Bullet Lines */}
                <div className="space-y-3.5 mb-8 w-full">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#FB7336] flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-[#242424] font-medium">
                      Community care and provision of nutritional daily food kits
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#FB7336] flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-[#242424] font-medium">
                      Regular companionship visits & support for lonely elders
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#FB7336] flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-[#242424] font-medium">
                      Personalized social activities restoring dignity & emotional health
                    </span>
                  </div>
                </div>

                {/* Primary Soft Action Button */}
                <Link
                  to="/get-involved"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FFF0E8] text-[#FB7336] font-bold text-sm sm:text-base border border-[#FB7336]/25 hover:bg-[#FFE4D6] hover:border-[#FB7336]/50 shadow-sm transition-all duration-200"
                >
                  <span>Support Elderly Care</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </Container>
        </section>

        {/* --- PILLAR 04: Clean Environment (#FFF9F5 Warm Surface) --- */}
        <section
          id="pillar-04"
          className="py-6 sm:py-8 lg:py-9 bg-[#FFF9F5] border-b border-[#EEEEEE]/60 scroll-mt-16"
        >
          <Container size="default">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
              {/* Content on Left (Desktop Order 1) */}
              <div className="lg:col-span-6 order-2 lg:order-1 flex flex-col items-start">
                <GradientIconBox icon={Leaf} size="md" className="mb-4" />
                <div className="text-xs font-bold tracking-wider uppercase text-[#FB7336] mb-2 select-none">
                  OUR INITIATIVE 04
                </div>
                <h2 className="font-['Arial',_Helvetica,_sans-serif] text-[#242424] font-bold text-2xl sm:text-3xl lg:text-4xl leading-tight mb-4">
                  Clean Environment
                </h2>
                <p className="font-['Inter',_sans-serif] text-[#666666] text-base leading-relaxed mb-6">
                  A cleaner environment creates a healthier future. We aim to encourage cleanliness, environmental awareness, and responsible community participation through youth mobilization and tree planting.
                </p>

                {/* 3 Clean Checkmark Bullet Lines */}
                <div className="space-y-3.5 mb-8 w-full">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#FB7336] flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-[#242424] font-medium">
                      Youth-led community cleanliness drives & waste sorting
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#FB7336] flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-[#242424] font-medium">
                      Civic environmental awareness campaigns in schools & neighborhoods
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#FB7336] flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-[#242424] font-medium">
                      Tree planting and environmental responsibility initiatives
                    </span>
                  </div>
                </div>

                {/* Primary Soft Action Button */}
                <Link
                  to="/get-involved"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FFF0E8] text-[#FB7336] font-bold text-sm sm:text-base border border-[#FB7336]/25 hover:bg-[#FFE4D6] hover:border-[#FB7336]/50 shadow-sm transition-all duration-200"
                >
                  <span>Join Cleanliness Drives</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Photo on Right (Desktop Order 2) */}
              <div className="lg:col-span-6 order-1 lg:order-2">
                <div className="relative rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-[#EEEEEE] group">
                  <img
                    src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80"
                    alt="Volunteers planting saplings and taking care of community greenery"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src =
                        'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=1200&q=80';
                    }}
                    className="w-full h-[300px] sm:h-[380px] lg:h-[420px] object-cover "
                  />
                  {/* Floating Metric Badge Pill */}
                  <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-black/5 shadow-md flex items-center gap-2 select-none">
                    <span className="w-2 h-2 rounded-full bg-[#FB7336]" />
                    <span className="text-xs font-bold text-[#242424] tracking-wide uppercase">
                      360+ Clean Drives Completed
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* =========================================================================
            SECTION 3: Be a Part of the Change (#FFF0E8 Light Orange Band)
            ========================================================================= */}
        <section className="py-5 sm:py-6 lg:py-7 bg-[#FFF0E8] border-b border-[#FB7336]/15">
          <Container size="default">
            {/* Centered Section Header */}
            <SectionHeader
              tag="GET INVOLVED"
              title="Be a Part of the Change."
              subtitle="Every helping hand can make a meaningful difference across our focus programs."
              align="center"
              className="mb-4 sm:mb-5"
            />

            {/* 5-Column Grid of Clean, Prominent White Cards on Desktop, Swipeable Carousel on Mobile */}
            <MobileCardCarousel desktopGridClassName="hidden md:grid md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5 mb-6 sm:mb-7 max-w-7xl mx-auto w-full">
              {/* Card 1: Volunteer */}
              <Card
                surface="white"
                className="text-center flex flex-col items-center justify-start p-6 sm:p-7 min-h-[250px] sm:min-h-[270px] border border-[#EEEEEE] hover:border-[#FB7336]/30 shadow-sm hover:shadow-md transition-all duration-300 h-full"
              >
                <GradientIconBox icon={Users} size="md" className="mb-4" />
                <h3 className="font-['Arial',_Helvetica,_sans-serif] text-[#242424] font-bold text-lg sm:text-xl mb-2.5 leading-snug">
                  Volunteer With Us
                </h3>
                <p className="font-['Inter',_sans-serif] text-[#666666] text-xs sm:text-sm leading-relaxed">
                  Contribute your time, skills, and energy directly to our grassroots field missions.
                </p>
              </Card>

              {/* Card 2: Sponsor a Child */}
              <Card
                surface="white"
                className="text-center flex flex-col items-center justify-start p-6 sm:p-7 min-h-[250px] sm:min-h-[270px] border border-[#EEEEEE] hover:border-[#FB7336]/30 shadow-sm hover:shadow-md transition-all duration-300 h-full"
              >
                <GradientIconBox icon={GraduationCap} size="md" className="mb-4" />
                <h3 className="font-['Arial',_Helvetica,_sans-serif] text-[#242424] font-bold text-lg sm:text-xl mb-2.5 leading-snug">
                  Sponsor a Child
                </h3>
                <p className="font-['Inter',_sans-serif] text-[#666666] text-xs sm:text-sm leading-relaxed">
                  Fund foundational learning kits, uniforms, and schooling to keep children in class.
                </p>
              </Card>

              {/* Card 3: Support Our Initiatives */}
              <Card
                surface="white"
                className="text-center flex flex-col items-center justify-start p-6 sm:p-7 min-h-[250px] sm:min-h-[270px] border border-[#EEEEEE] hover:border-[#FB7336]/30 shadow-sm hover:shadow-md transition-all duration-300 h-full"
              >
                <GradientIconBox icon={Heart} size="md" className="mb-4" />
                <h3 className="font-['Arial',_Helvetica,_sans-serif] text-[#242424] font-bold text-lg sm:text-xl mb-2.5 leading-snug">
                  Support Causes
                </h3>
                <p className="font-['Inter',_sans-serif] text-[#666666] text-xs sm:text-sm leading-relaxed">
                  Provide continuous resources for Braille kits, elderly meals, and green drives.
                </p>
              </Card>

              {/* Card 4: CSR & Partnerships */}
              <Card
                surface="white"
                className="text-center flex flex-col items-center justify-start p-6 sm:p-7 min-h-[250px] sm:min-h-[270px] border border-[#EEEEEE] hover:border-[#FB7336]/30 shadow-sm hover:shadow-md transition-all duration-300 h-full"
              >
                <GradientIconBox icon={Building2} size="md" className="mb-4" />
                <h3 className="font-['Arial',_Helvetica,_sans-serif] text-[#242424] font-bold text-lg sm:text-xl mb-2.5 leading-snug">
                  CSR Partnerships
                </h3>
                <p className="font-['Inter',_sans-serif] text-[#666666] text-xs sm:text-sm leading-relaxed">
                  Collaborate for compliant corporate CSR grants and scalable community projects.
                </p>
              </Card>

              {/* Card 5: Spread Awareness */}
              <Card
                surface="white"
                className="text-center flex flex-col items-center justify-start p-6 sm:p-7 min-h-[250px] sm:min-h-[270px] border border-[#EEEEEE] hover:border-[#FB7336]/30 shadow-sm hover:shadow-md transition-all duration-300 h-full"
              >
                <GradientIconBox icon={Volume2} size="md" className="mb-4" />
                <h3 className="font-['Arial',_Helvetica,_sans-serif] text-[#242424] font-bold text-lg sm:text-xl mb-2.5 leading-snug">
                  Spread Awareness
                </h3>
                <p className="font-['Inter',_sans-serif] text-[#666666] text-xs sm:text-sm leading-relaxed">
                  Champion our mission and share inspiring grassroots stories with your network.
                </p>
              </Card>
            </MobileCardCarousel>

            {/* Centered Button Row */}
            <div className="flex flex-wrap items-center justify-center gap-3.5">
              <Button as={Link} to="/get-involved" variant="primary" size="md">
                Become a Volunteer
              </Button>
              <Button as={Link} to="/contact" variant="secondary" size="md">
                Contact Us
              </Button>
            </div>
          </Container>
        </section>

        {/* =========================================================================
            SECTION 4: Final Call to Action Banner (#FB7336 -> #FCC241 Gradient)
            ========================================================================= */}
        <section className="relative py-10 sm:py-12 lg:py-14 overflow-hidden bg-gradient-to-r from-[#FB7336] to-[#FCC241] text-center text-white">
          <Container size="default" className="relative z-10 text-center">
            {/* Bold Arial H2 */}
            <h2 className="font-['Arial',_Helvetica,_sans-serif] text-white font-bold text-3xl sm:text-4xl lg:text-[42px] leading-tight mb-3 max-w-3xl mx-auto">
              Together, We Can Make a Difference.
            </h2>

            {/* Concise Supporting Copy */}
            <p className="font-['Inter',_sans-serif] text-white/95 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-8">
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

      {/* 5. Global Footer */}
      <Footer />
    </div>
  );
}

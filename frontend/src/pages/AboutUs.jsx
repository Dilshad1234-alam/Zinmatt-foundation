import React from 'react';
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
  Eye,
  HeartHandshake,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Award,
  Target,
  CheckCircle2,
  Download,
  FileText,
  TrendingUp,
  BookOpen,
  MapPin,
} from 'lucide-react';

export default function AboutUs() {
  // =========================================================================
  // Section A Data: Organizational Architecture (Vision, Mission & Philosophy)
  // =========================================================================
  const architecture = [
    {
      id: 'arch-vision',
      tag: 'LONG-TERM ASPIRATION',
      title: 'Our Vision',
      description:
        'An equitable, compassionate society where poverty never denies a child high-quality education, elderly citizens live with cherished dignity, and communities take collective pride in ecological cleanliness.',
      icon: Eye,
      linkText: 'Explore Our Initiatives',
      linkTo: '/our-initiatives',
    },
    {
      id: 'arch-mission',
      tag: 'DAILY COMMITMENT',
      title: 'Our Mission',
      description:
        'To deliver direct, zero-bureaucracy grassroots interventions across marginalized urban settlements and rural villages—providing free schooling, assistive visual tools, nutritious senior meals, and civic sanitation drives.',
      icon: Target,
      linkText: 'View Measurable Impact',
      linkTo: '/our-impact',
    },
    {
      id: 'arch-philosophy',
      tag: 'OPERATIONAL ETHOS',
      title: 'Guiding Philosophy',
      description:
        'Human dignity precedes all assistance. We do not offer passive charity; we partner with local communities, listen to residents first, maintain total fiscal transparency, and build sustainable self-reliance from within.',
      icon: HeartHandshake,
      linkText: 'Partner With Us',
      linkTo: '/get-involved',
    },
    {
      id: 'arch-principles',
      tag: 'FOUNDATIONAL ETHICS',
      title: 'Core Principles',
      description:
        'Radical financial transparency, 80G compliant governance, and zero overhead compromise. Every program is audited externally to ensure direct, verified assistance reaches the families who need it most.',
      icon: ShieldCheck,
      linkText: 'Our Governance',
      linkTo: '/get-involved',
    },
  ];

  // =========================================================================
  // Section B Data: How It All Began (4 Milestones / Evolution)
  // =========================================================================
  const timelineMilestones = [
    {
      id: 'mile-2018',
      year: '2018',
      phase: 'Phase 01',
      title: 'The Spark',
      description:
        'Started with just 12 underprivileged street children in a makeshift learning center, providing slate pencils, basic notebooks, and daily nutritious snacks.',
      metric: '12 Children Enrolled • 1 Local Center',
      icon: Sparkles,
    },
    {
      id: 'mile-2020',
      year: '2020',
      phase: 'Phase 02',
      title: 'Expanding Care',
      description:
        'Recognized the acute vulnerability faced by abandoned elderly citizens during crises; launched doorstep ration packages, warm blankets, and mobile health visits.',
      metric: '1,500+ Ration Kits • 350+ Seniors Aided',
      icon: HeartHandshake,
    },
    {
      id: 'mile-2022',
      year: '2022',
      phase: 'Phase 03',
      title: 'Inclusive Learning',
      description:
        'Initiated specialized Braille literacy cells, tactile STEM diagrams, audio-assisted learning, and white mobility cane distribution for visually impaired children.',
      metric: '400+ Braille Kits • 8 District Camps',
      icon: BookOpen,
    },
    {
      id: 'mile-2024',
      year: '2024',
      phase: 'Phase 04',
      title: 'Sustainable Footprint',
      description:
        'Scaled youth civic drives, riverbank cleanup operations, 80G tax exemptions, and formal institutional CSR partnerships touching thousands every single month.',
      metric: '15,000+ Lives Touched • 7 States Active',
      icon: TrendingUp,
    },
  ];

  // =========================================================================
  // Section C Data: Action Pillars Driving Measurable Change (4x2 Cards)
  // =========================================================================
  const actionPillars = [
    {
      id: 'pillar-01',
      number: 'Pillar 01',
      title: 'Foundational Child Literacy',
      description: 'Free learning kits, evening tuition centers, and back-to-school counseling.',
      image:
        'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
      fallbackImage:
        'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
      bullets: [
        'Free school kits & certified tutors',
        'Mainstream school re-enrollment',
      ],
      progressLabel: '15,000+ Students Educated',
      progressPercent: '94%',
    },
    {
      id: 'pillar-02',
      number: 'Pillar 02',
      title: 'Visually Impaired Assistive Care',
      description: 'Braille reading kits, audio libraries, and smart mobility white canes.',
      image:
        'https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=800&q=80',
      fallbackImage:
        'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=800&q=80',
      bullets: [
        'Custom Braille & tactile STEM kits',
        'Digital screen-reader audio labs',
      ],
      progressLabel: '1,200+ Kits Dispatched',
      progressPercent: '88%',
    },
    {
      id: 'pillar-03',
      number: 'Pillar 03',
      title: 'Elderly Welfare & Companionship',
      description: 'Doorstep health checkups, monthly chronic medicine, and daily hot meals.',
      image:
        'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&w=800&q=80',
      fallbackImage:
        'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=800&q=80',
      bullets: [
        'Weekly doctor visits & medicines',
        'Community nutrition & companionship',
      ],
      progressLabel: '2,400+ Seniors Supported',
      progressPercent: '91%',
    },
    {
      id: 'pillar-04',
      number: 'Pillar 04',
      title: 'Environmental & Cleanliness Drives',
      description: 'Neighborhood plastic collection, riverbank cleanups, and native tree planting.',
      image:
        'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
      fallbackImage:
        'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=800&q=80',
      bullets: [
        'Plastic recovery & recycling drives',
        '12,000+ native saplings planted',
      ],
      progressLabel: '45+ Tonnes Recycled',
      progressPercent: '86%',
    },
    {
      id: 'pillar-05',
      number: 'Pillar 05',
      title: 'Women Livelihoods & Training',
      description: 'Certified garment tailoring, digital literacy, and self-help starter micro-grants.',
      image:
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
      fallbackImage:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
      bullets: [
        'Tailoring & handcraft workshops',
        'Micro-grants for independence',
      ],
      progressLabel: '850+ Women Independent',
      progressPercent: '90%',
    },
    {
      id: 'pillar-06',
      number: 'Pillar 06',
      title: 'Community Nutrition & Relief',
      description: 'Daily nutritious meals and emergency disaster relief rations for poor families.',
      image:
        'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80',
      fallbackImage:
        'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80',
      bullets: [
        'Daily community hot food kitchens',
        'Disaster response dry ration kits',
      ],
      progressLabel: '65,000+ Meals Served',
      progressPercent: '96%',
    },
    {
      id: 'pillar-07',
      number: 'Pillar 07',
      title: 'Slum Healthcare & Medical Camps',
      description: 'Doorstep mobile clinic camps, basic diagnostics, and free prescription glasses.',
      image:
        'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=800&q=80',
      fallbackImage:
        'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&w=800&q=80',
      bullets: [
        'Free generic medicines & checkups',
        'Vision testing & free spectacles',
      ],
      progressLabel: '8,200+ Patients Aided',
      progressPercent: '92%',
    },
    {
      id: 'pillar-08',
      number: 'Pillar 08',
      title: 'Youth Career & Digital Skills',
      description: 'Practical computer labs, workplace digital training, and job interview coaching.',
      image:
        'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
      fallbackImage:
        'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80',
      bullets: [
        'Computer lab skill certifications',
        'Mock interviews & job placement',
      ],
      progressLabel: '1,600+ Youth Placed',
      progressPercent: '89%',
    },
  ];

  // =========================================================================
  // Section D Data: Compliance & Governance (2x2 Cards)
  // =========================================================================
  const complianceCards = [
    {
      id: 'comp-1',
      title: 'Section 8 Registered',
      description:
        'Incorporated under Ministry of Corporate Affairs (MCA), Govt. of India as a licensed non-profit.',
      badge: 'CIN Verified',
      icon: Award,
      code: 'Govt. Licensed NGO',
    },
    {
      id: 'comp-2',
      title: '80G Tax Exemption',
      description:
        'All donations qualify for 50% tax deduction under Section 80G with instant digital receipts.',
      badge: '50% Tax Relief',
      icon: ShieldCheck,
      code: '80G Certified',
    },
    {
      id: 'comp-3',
      title: 'NITI Aayog Darpan',
      description:
        'Vetted and active on central Govt. of India NGO-Darpan portal for transparent public monitoring.',
      badge: 'ID: DL/2021/029',
      icon: Target,
      code: 'NITI Aayog Vetted',
    },
    {
      id: 'comp-4',
      title: 'External Statutory Audit',
      description:
        'Audited by independent Chartered Accountants with public quarterly balance sheets.',
      badge: '100% Clean Audit',
      icon: CheckCircle2,
      code: 'Audited Statements',
    },
  ];

  // =========================================================================
  // Bottom Team Members (5 Core Leaders)
  // =========================================================================
  const teamMembers = [
    {
      id: 'tm-1',
      name: 'Ms. Sunita Sharma',
      role: 'Founder & Managing Trustee',
      location: 'Delhi HQ',
      points: ['10+ Yrs Grassroots Leadership', 'Strategic Vision & Governance'],
      image:
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'tm-2',
      name: 'Rajesh Varma',
      role: 'Director of Field Operations',
      location: 'Pan-India Operations',
      points: ['Grassroots Logistics & Aid', '7+ States Volunteer Network'],
      image:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'tm-3',
      name: 'Priya Awasthi',
      role: 'Head of Inclusive Education',
      location: 'Learning Centers',
      points: ['Braille & Special Curriculums', '15,000+ Students Mentored'],
      image:
        'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'tm-4',
      name: 'Amit Deshmukh',
      role: 'Head of Environment Drives',
      location: 'Cleanliness Cell',
      points: ['Civic Cleanups & Recycling', '12,000+ Native Trees Planted'],
      image:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'tm-5',
      name: 'Dr. Ananya Sen',
      role: 'Head of Healthcare & Elder Care',
      location: 'Mobile Medical Camps',
      points: ['Geriatric Healthcare & Visits', 'Free Medicine & Diagnostics'],
      image:
        'https://images.unsplash.com/photo-1594824813590-7815d3876e53?auto=format&fit=crop&w=400&q=80',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FFFFFF] flex flex-col font-sans antialiased text-[#666666] selection:bg-[#FFF0E8] selection:text-[#FB7336] overflow-x-hidden w-full">
      {/* Navbar */}
      <Navbar />

      <main className="flex-1 w-full overflow-x-hidden">
        {/* ========================================================================= */}
        {/* 1. TOP HERO: CENTERED EDITORIAL HEADER + WIDE PHOTO (#FFF9F5)              */}
        {/* ========================================================================= */}
        <section className="w-full bg-[#FFF9F5] pt-5 pb-3 sm:pt-5 sm:pb-4 border-b border-[#EEEEEE]">
          <Container size="full" className="px-4 sm:px-6 lg:px-8">
            {/* Centered Editorial Header */}
            <div className="text-center max-w-4xl mx-auto space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              {/* Bold Arial H1 */}
              <h1 className="font-['Arial',_Helvetica,_sans-serif] text-[#242424] font-bold text-3xl sm:text-4xl lg:text-[46px] leading-tight tracking-tight">
                Creating Opportunities. Spreading Hope.
              </h1>

              {/* Concise Inter Subtitle */}
              <p className="font-sans text-[#666666] text-sm sm:text-base lg:text-[17px] leading-relaxed max-w-3xl mx-auto">
                ZINMATT Foundation is committed to building a more inclusive, compassionate, and responsible society through education, care, and environmental action.
              </p>
            </div>

            {/* Full-Width Wide Rounded Classroom/Community Photograph */}
            <div className="relative rounded-xl overflow-hidden shadow-lg border border-[#EEEEEE] bg-gray-100 w-full">
              <img
                src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=2000&q=85"
                alt="Children in classroom studying happily with ZINMATT Foundation educational support"
                loading="lazy"
                className="w-full h-[300px] sm:h-[400px] md:h-[480px] lg:h-[560px] xl:h-[600px] object-cover object-center"
                onError={(e) => {
                  e.currentTarget.src =
                    'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=2000&q=85';
                }}
              />
            </div>
          </Container>
        </section>

        {/* ========================================================================= */}
        {/* SECTION A: OUR VISION, MISSION & GUIDING PHILOSOPHY (#FFFFFF)              */}
        {/* ========================================================================= */}
        <section className="w-full pt-4 sm:pt-6 lg:pt-8 pb-4 sm:pb-5 lg:pb-6 bg-[#FFFFFF]">
          <Container>
            <SectionHeader
              tag="ORGANIZATIONAL ARCHITECTURE"
              title="Our Vision, Mission & Guiding Philosophy"
              subtitle="A structured blueprint balancing ambitious long-term systemic transformation with day-to-day compassion, transparency, and accountability."
              align="center"
            />

            <MobileCardCarousel
              items={architecture}
              desktopGridClassName="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 w-full"
              renderItem={(item) => (
                <Card
                  key={item.id}
                  surface="white"
                  className="p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between border border-[#EEEEEE] h-full"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <GradientIconBox icon={item.icon} size="md" />
                      <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#FB7336] bg-[#FFF0E8] px-2.5 py-1 rounded-full">
                        {item.tag}
                      </span>
                    </div>

                    <h3 className="font-['Arial',_Helvetica,_sans-serif] text-lg sm:text-xl font-bold text-[#242424]">
                      {item.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#666666] leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-5">
                    <div className="w-full h-px bg-[#EEEEEE] mb-3.5" />
                    <Link
                      to={item.linkTo}
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#FB7336] hover:text-[#e05e24] group transition-colors"
                    >
                      <span>{item.linkText}</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </Card>
              )}
            />
          </Container>
        </section>

        {/* ========================================================================= */}
        {/* SECTION B: HOW IT ALL BEGAN (#FFF9F5 Milestones & Evolution)              */}
        {/* ========================================================================= */}
        <section className="w-full py-5 sm:py-6 lg:py-7 bg-[#FFF9F5] border-y border-[#EEEEEE]">
          <Container>
            {/* Centered Section Header with Fieldwork Badge */}
            <div className="text-center max-w-3xl mx-auto mb-4 sm:mb-5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF0E8] border border-[#FB7336]/20 text-[#FB7336] text-xs font-semibold tracking-wider uppercase mb-2 select-none">
                <span>MILESTONES &amp; EVOLUTION</span>
              </div>
              <h2 className="font-['Arial',_Helvetica,_sans-serif] text-[#242424] font-bold text-3xl sm:text-[36px] lg:text-[40px] leading-tight tracking-tight">
                How It All Began
              </h2>
              <p className="font-sans text-[#666666] text-sm sm:text-base leading-relaxed mt-2 max-w-2xl mx-auto">
                From an informal weekend teaching circle under a banyan tree to a multi-state humanitarian initiative reaching tens of thousands.
              </p>

              {/* Centered Pill Badge */}
              <div className="mt-3 inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border border-[#EEEEEE] shadow-sm select-none">
                <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-[#FB7336] to-[#FCC241] animate-pulse" />
                <span className="font-['Arial'] font-bold text-xs sm:text-sm text-[#242424]">
                  7+ Years of Continuous Fieldwork
                </span>
              </div>
            </div>

            {/* 4-Column Timeline Cards */}
            <MobileCardCarousel
              items={timelineMilestones}
              desktopGridClassName="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 w-full"
              renderItem={(item) => (
                <Card
                  key={item.id}
                  surface="white"
                  className="p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between border border-[#EEEEEE] relative overflow-hidden h-full"
                >
                  <div className="space-y-3.5">
                    {/* Top Row: Year + Phase Badge */}
                    <div className="flex items-center justify-between">
                      <span className="font-['Arial'] font-bold text-2xl sm:text-3xl bg-gradient-to-r from-[#FB7336] to-[#FCC241] bg-clip-text text-transparent">
                        {item.year}
                      </span>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#FB7336] bg-[#FFF0E8] px-2.5 py-0.5 rounded-full">
                        {item.phase}
                      </span>
                    </div>

                    <h3 className="font-['Arial',_Helvetica,_sans-serif] text-lg font-bold text-[#242424] pt-1">
                      {item.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#666666] leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Bottom Milestone Summary */}
                  <div className="pt-4 mt-4 border-t border-[#EEEEEE]/80">
                    <div className="text-[11px] sm:text-xs font-semibold text-[#FB7336] flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 text-[#FB7336]" />
                      <span>{item.metric}</span>
                    </div>
                  </div>
                </Card>
              )}
            />
          </Container>
        </section>

        {/* ========================================================================= */}
        {/* SECTION C: ACTION PILLARS DRIVING MEASURABLE CHANGE (#FFFFFF)              */}
        {/* ========================================================================= */}
        <section className="w-full pt-6 sm:pt-8 pb-3 sm:pb-4 lg:pb-4 bg-[#FFFFFF]">
          <Container>
            <SectionHeader
              tag="ACTION PILLARS"
              title="Action Pillars Driving Measurable Change"
              subtitle="Holistic, interconnected grassroots programs designed to lift families out of despair and create enduring dignity."
              align="center"
            />

            <MobileCardCarousel
              items={actionPillars}
              desktopGridClassName="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 w-full"
              renderItem={(pillar) => (
                <Card
                  key={pillar.id}
                  surface="white"
                  padding="none"
                  className="rounded-2xl border border-[#EEEEEE] shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between h-full"
                >
                  <div>
                    {/* Top Landscape Image with Floating Pillar Badge - TALLER IMAGE */}
                    <div className="relative h-48 sm:h-52 md:h-56 w-full bg-gray-100 overflow-hidden">
                      <img
                        src={pillar.image}
                        alt={pillar.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        onError={(e) => {
                          e.currentTarget.src = pillar.fallbackImage;
                        }}
                      />
                      {/* Top-Left Floating Badge */}
                      <div className="absolute top-3 left-3 inline-flex items-center px-2.5 py-0.5 rounded-full bg-white/95 backdrop-blur-md shadow-md border border-[#EEEEEE]">
                        <span className="font-['Arial'] font-bold text-[11px] bg-gradient-to-r from-[#FB7336] to-[#FCC241] bg-clip-text text-transparent">
                          {pillar.number}
                        </span>
                      </div>
                    </div>

                    {/* Card Body - CONCISE TEXT */}
                    <div className="p-4 space-y-2">
                      <h3 className="font-['Arial',_Helvetica,_sans-serif] text-base font-bold text-[#242424] leading-snug line-clamp-1">
                        {pillar.title}
                      </h3>

                      <p className="text-xs text-[#666666] leading-relaxed line-clamp-2">
                        {pillar.description}
                      </p>

                      {/* Bullet Highlights */}
                      <div className="space-y-1 pt-0.5">
                        {pillar.bullets.map((bullet, idx) => (
                          <div key={idx} className="flex items-center gap-1.5 text-[11px] sm:text-xs text-[#242424]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#FB7336] flex-shrink-0" />
                            <span className="truncate">{bullet}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Progress Accent Bar */}
                  <div className="px-4 pb-3.5 pt-1">
                    <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-semibold text-[#666666] mb-1">
                      <span className="truncate pr-2">{pillar.progressLabel}</span>
                      <span className="text-[#FB7336] font-bold">{pillar.progressPercent}</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-[#FFF0E8] overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#FB7336] to-[#FCC241]"
                        style={{ width: pillar.progressPercent }}
                      />
                    </div>
                  </div>
                </Card>
              )}
            />
          </Container>
        </section>

        {/* ========================================================================= */}
        {/* SECTION D: ETHICAL GOVERNANCE & FINANCIAL TRANSPARENCY (#FFF0E8)           */}
        {/* ========================================================================= */}
        <section className="w-full py-4 sm:py-5 lg:py-5 bg-[#FFF0E8] border-y border-[#FB7336]/20">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center w-full">
              {/* Left Column (5 Cols): Narrative + Where Every ₹100 Goes Card + Action Buttons */}
              <div className="lg:col-span-5 space-y-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#FB7336]/30 text-[#FB7336] text-xs font-semibold tracking-wider uppercase mb-2 select-none shadow-xs">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>UNCOMPROMISING TRUST</span>
                  </div>
                  <h2 className="font-['Arial',_Helvetica,_sans-serif] text-[#242424] font-bold text-2xl sm:text-3xl lg:text-[32px] leading-tight tracking-tight">
                    Ethical Governance &amp; <span className="bg-gradient-to-r from-[#FB7336] to-[#FCC241] bg-clip-text text-transparent">Financial Transparency</span>
                  </h2>
                </div>

                <p className="text-xs sm:text-sm text-[#666666] leading-relaxed">
                  Every rupee is audited by independent Chartered Accountants. We uphold radical honesty, ensuring 88% of funds directly power on-ground humanitarian aid.
                </p>

                {/* Elevated "Where Every ₹100 Goes" Card */}
                <div className="rounded-2xl p-4 sm:p-5 bg-white border border-[#EEEEEE] shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="font-['Arial'] font-bold text-sm sm:text-base text-[#242424]">
                      Where Every ₹100 Goes
                    </div>
                    <span className="text-[11px] font-bold text-[#FB7336] bg-[#FFF0E8] px-2.5 py-0.5 rounded-full border border-[#FB7336]/20">
                      Audited FY 2023-24
                    </span>
                  </div>

                  {/* Segmented Gradient Bar */}
                  <div className="h-3.5 w-full rounded-full overflow-hidden flex bg-gray-100 shadow-inner">
                    <div
                      className="h-full bg-gradient-to-r from-[#FB7336] to-[#FCC241]"
                      style={{ width: '88%' }}
                      title="88% Direct Program Aid"
                    />
                    <div
                      className="h-full bg-[#242424]"
                      style={{ width: '8%' }}
                      title="8% Field Audit & Operations"
                    />
                    <div
                      className="h-full bg-[#FCC241]"
                      style={{ width: '4%' }}
                      title="4% Admin & Reserves"
                    />
                  </div>

                  {/* 3 Metric Pills */}
                  <div className="grid grid-cols-3 gap-2 pt-0.5 text-center">
                    <div className="p-2 rounded-xl bg-[#FFF9F5] border border-[#FB7336]/20">
                      <div className="font-['Arial'] font-bold text-base text-[#FB7336] leading-none">88%</div>
                      <div className="text-[10px] text-[#666666] font-medium leading-tight mt-1">Direct Aid</div>
                    </div>
                    <div className="p-2 rounded-xl bg-gray-50 border border-[#EEEEEE]">
                      <div className="font-['Arial'] font-bold text-base text-[#242424] leading-none">8%</div>
                      <div className="text-[10px] text-[#666666] font-medium leading-tight mt-1">Field Ops</div>
                    </div>
                    <div className="p-2 rounded-xl bg-gray-50 border border-[#EEEEEE]">
                      <div className="font-['Arial'] font-bold text-base text-[#666666] leading-none">4%</div>
                      <div className="text-[10px] text-[#666666] font-medium leading-tight mt-1">Admin</div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-0.5">
                  <Button
                    variant="primary"
                    size="sm"
                    icon={Download}
                    iconPosition="left"
                    onClick={() => window.open('#', '_blank')}
                    className="shadow-sm hover:shadow"
                  >
                    Annual Report 2023-24 (PDF)
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    icon={FileText}
                    iconPosition="left"
                    onClick={() => window.open('#', '_blank')}
                    className="bg-white hover:bg-gray-50"
                  >
                    Audited Statements
                  </Button>
                </div>
              </div>

              {/* Right Column (7 Cols): 2x2 Grid of Enhanced Compliance Cards */}
              <div className="lg:col-span-7">
                <MobileCardCarousel
                  items={complianceCards}
                  desktopGridClassName="hidden md:grid md:grid-cols-2 gap-3.5 sm:gap-4 w-full"
                  renderItem={(card) => (
                    <Card
                      key={card.id}
                      surface="white"
                      className="p-4 sm:p-5 rounded-2xl shadow-sm border border-[#EEEEEE] hover:border-[#FB7336]/40 hover:shadow-md transition-all duration-300 flex flex-col justify-between group h-full"
                    >
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between">
                          <GradientIconBox icon={card.icon} size="sm" />
                          <span className="text-[10px] sm:text-[11px] font-bold text-[#FB7336] bg-[#FFF0E8] border border-[#FB7336]/20 px-2 py-0.5 rounded-full">
                            {card.badge}
                          </span>
                        </div>

                        <div>
                          <h3 className="font-['Arial',_Helvetica,_sans-serif] text-base font-bold text-[#242424] group-hover:text-[#FB7336] transition-colors">
                            {card.title}
                          </h3>
                          <p className="text-xs text-[#666666] leading-relaxed mt-1">
                            {card.description}
                          </p>
                        </div>
                      </div>

                      <div className="pt-2.5 mt-2 border-t border-[#EEEEEE] flex items-center justify-between text-[11px]">
                        <span className="text-emerald-700 flex items-center gap-1 font-semibold">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Statutory Verified</span>
                        </span>
                        <span className="text-[10px] text-gray-400 font-medium">{card.code}</span>
                      </div>
                    </Card>
                  )}
                />
              </div>
            </div>
          </Container>
        </section>

        {/* ========================================================================= */}
        {/* 6. MEET THE PEOPLE DRIVING CHANGE (#FFFFFF Kept Intact)                    */}
        {/* ========================================================================= */}
        <section className="w-full pt-4 sm:pt-5 lg:pt-6 pb-6 sm:pb-8 lg:pb-8 bg-[#FFFFFF]">
          <Container>
            <SectionHeader
              tag="OUR TEAM &amp; VOLUNTEERS"
              title="Meet the People Driving Change"
              align="center"
            />

            <MobileCardCarousel
              items={teamMembers}
              desktopGridClassName="hidden md:grid md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5 w-full text-center"
              renderItem={(member) => (
                <div
                  key={member.id}
                  className="rounded-2xl p-4 sm:p-5 border border-[#EEEEEE] bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-[#FB7336]/40 transition-all duration-300 space-y-3 flex flex-col items-center justify-between group h-full"
                >
                  {/* Top Pinpoint Location Badge */}
                  <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FFF0E8] border border-[#FB7336]/25 text-[#FB7336] text-[10px] font-bold uppercase tracking-wider select-none">
                    <MapPin className="w-3 h-3 text-[#FB7336]" />
                    <span>{member.location}</span>
                  </div>

                  {/* Circular Portrait with Warm Ring */}
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-3 border-[#FFF0E8] ring-2 ring-[#FB7336]/35 overflow-hidden shadow-sm flex-shrink-0 bg-gray-100 group-hover:scale-105 transition-transform duration-300">
                    <img
                      src={member.image}
                      alt={member.name}
                      loading="lazy"
                      className="w-full h-full object-cover object-top"
                      onError={(e) => {
                        e.currentTarget.src =
                          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80';
                      }}
                    />
                  </div>

                  {/* Name & Role */}
                  <div className="space-y-0.5">
                    <h3 className="font-['Arial',_Helvetica,_sans-serif] text-sm sm:text-base font-bold text-[#242424] group-hover:text-[#FB7336] transition-colors line-clamp-1">
                      {member.name}
                    </h3>
                    <div className="text-[11px] font-semibold text-[#FB7336] line-clamp-1">
                      {member.role}
                    </div>
                  </div>

                  {/* Pinpoint Key Highlights */}
                  <div className="w-full pt-2.5 border-t border-[#EEEEEE] space-y-1 text-left">
                    {member.points.map((pt, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-[11px] text-[#666666]">
                        <CheckCircle2 className="w-3 h-3 text-[#FB7336] flex-shrink-0" />
                        <span className="truncate">{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            />
          </Container>
        </section>

        {/* ========================================================================= */}
        {/* 7. FINAL CALL TO ACTION BANNER (Bottom Band Kept Intact)                   */}
        {/* ========================================================================= */}
        <section className="relative w-full py-12 sm:py-14 lg:py-16 bg-gradient-to-r from-[#FB7336] to-[#FCC241] overflow-hidden text-center shadow-inner">
          {/* Ambient Background Light Glows */}
          <div className="absolute -top-28 -left-28 w-80 h-80 rounded-full bg-white/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-28 -right-28 w-80 h-80 rounded-full bg-white/15 blur-3xl pointer-events-none" />

          <Container>
            <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6 relative z-10">
              {/* White Contrast Arial H2 */}
              <h2 className="font-['Arial',_Helvetica,_sans-serif] font-bold text-2xl sm:text-3xl lg:text-[42px] text-white leading-tight drop-shadow-sm">
                Together, We Can Make a Difference.
              </h2>

              {/* Supporting Copy */}
              <p className="font-sans text-white/95 text-sm sm:text-base lg:text-[17px] max-w-2xl mx-auto leading-relaxed font-medium">
                Small actions can create meaningful change. Join ZINMATT Foundation in building a future where education, care, and civic environment are accessible to everyone.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
                <Link to="/get-involved">
                  <Button variant="white" size="lg">
                    Join Our Mission
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="bg-white/90 hover:bg-white text-[#242424] border-white/40 shadow-sm"
                  >
                    Contact Our Team
                  </Button>
                </Link>
              </div>
            </div>
          </Container>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

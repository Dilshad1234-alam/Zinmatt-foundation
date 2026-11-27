import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../lib/api';
import { useDonateModal } from '../context/DonateModalContext';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import GradientIconBox from '../components/ui/GradientIconBox';
import SectionHeader from '../components/ui/SectionHeader';
import MobileCarousel from '../components/ui/MobileCarousel';
import {
  Heart,
  GraduationCap,
  Eye,
  HeartHandshake,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Users,
  Share2,
  ShieldCheck,
  Calendar,
  BookOpen,
  Award,
  Leaf,
  PhoneCall,
} from 'lucide-react';

export default function Home() {
  const [galleryFilter, setGalleryFilter] = useState('All');
  const { openDonateModal } = useDonateModal();
  const [homeConfig, setHomeConfig] = useState(null);

  // Load live published configuration from MongoDB with localStorage fallback
  useEffect(() => {
    let isMounted = true;
    api
      .get('/api/home-config')
      .then((res) => {
        if (isMounted && res) {
          const cfg = res.config || res;
          setHomeConfig(cfg);
        }
      })
      .catch((err) => {
        console.warn('[Home Config Load Fallback]', err);
        try {
          const cached = localStorage.getItem('zinmatt_home_page_config');
          const cachedSections = localStorage.getItem('zinmatt_home_sections');
          if (cached) {
            const parsed = JSON.parse(cached);
            setHomeConfig({
              ...parsed,
              sectionOrder: cachedSections ? JSON.parse(cachedSections) : parsed.sectionOrder,
            });
          }
        } catch {}
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Section Visibility and Custom Ordering (All 7 Sections)
  const defaultSectionOrder = [
    { id: 'hero', number: 1, name: '1. Hero Banner', enabled: true },
    { id: 'about', number: 2, name: '2. About ZINMATT', enabled: true },
    { id: 'initiatives', number: 3, name: '3. What We Do (Initiatives)', enabled: true },
    { id: 'pillars', number: 4, name: '4. Core Commitments (Values)', enabled: true },
    { id: 'get_involved', number: 5, name: '5. Be a Part of the Change', enabled: true },
    { id: 'trust_strip', number: 6, name: '6. Orange Gradient Trust Strip', enabled: true },
    { id: 'stories', number: 7, name: '7. Moments of Impact & Community', enabled: true },
  ];

  const orderToRender =
    homeConfig?.sectionOrder && Array.isArray(homeConfig.sectionOrder) && homeConfig.sectionOrder.length > 0
      ? homeConfig.sectionOrder.map((s) => s.id)
      : defaultSectionOrder.map((s) => s.id);

  const isSectionVisible = (secId) => {
    if (!homeConfig?.sectionOrder || !Array.isArray(homeConfig.sectionOrder)) return true;
    const item = homeConfig.sectionOrder.find((s) => s.id === secId);
    if (!item) return true;
    return item.enabled !== false && item.visible !== false;
  };

  // Icon Resolver Helper for dynamic icon strings from DB
  const iconMap = {
    GraduationCap,
    Eye,
    HeartHandshake,
    Sparkles,
    Users,
    Award,
    Share2,
    Leaf,
    Heart,
    BookOpen,
    ShieldCheck,
    Calendar,
  };

  const resolveIcon = (icon) => {
    if (typeof icon === 'function') return icon;
    if (typeof icon === 'string' && iconMap[icon]) return iconMap[icon];
    return Sparkles;
  };

  // =========================================================================
  // DEFAULT STATIC DATA (Guarantees zero blank screen while loading)
  // =========================================================================

  // Highlight Strip Metrics (Optional Band)
  const highlightMetrics = [
    {
      id: 'hl-1',
      metric: '15,000+',
      label: 'Children Supported',
      description: 'Foundational literacy, learning kits & tablets',
      icon: GraduationCap,
    },
    {
      id: 'hl-2',
      metric: '2,400+',
      label: 'Educational Aids',
      description: 'Tactile kits & Braille reading systems',
      icon: Eye,
    },
    {
      id: 'hl-3',
      metric: '2,100+',
      label: 'Elderly Assisted',
      description: 'Geriatric health screenings & food supplies',
      icon: HeartHandshake,
    },
    {
      id: 'hl-4',
      metric: '340+',
      label: 'Cleanliness Drives',
      description: 'Neighborhood cleanups & community tree planting',
      icon: Leaf,
    },
  ];

  // Section 3 Default Initiatives
  const defaultInitiatives = [
    {
      id: 'init-1',
      badge: 'Active Program',
      title: 'Education Support',
      image:
        'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80',
      bullets: [
        'Learning material & textbook distribution',
        'Remedial after-school tutoring hubs',
        'Digital literacy & tablet classrooms',
      ],
      link: '/initiatives',
      linkLabel: 'Learn More',
    },
    {
      id: 'init-2',
      badge: 'Specialized Care',
      title: 'Inclusive Child Support',
      image:
        'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80',
      bullets: [
        'Tactile & Braille curriculum toolkits',
        'Assistive audio device distribution',
        'Specialized mobility & confidence mentoring',
      ],
      link: '/initiatives',
      linkLabel: 'Learn More',
    },
    {
      id: 'init-3',
      badge: 'Compassion Drive',
      title: 'Elderly Welfare',
      image:
        'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&w=800&q=80',
      bullets: [
        'Monthly ration & dietary essentials',
        'Routine geriatric health screenings',
        'Doorstep emotional companionship visits',
      ],
      link: '/initiatives',
      linkLabel: 'Learn More',
    },
    {
      id: 'init-4',
      badge: 'Civic Action',
      title: 'Clean Environment',
      image:
        'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
      bullets: [
        'Neighborhood waste clean-up drives',
        'Waste segregation & recycling workshops',
        'Urban indigenous sapling planting',
      ],
      link: '/initiatives',
      linkLabel: 'Learn More',
    },
  ];

  // Section 3 Default 5-Photo Strip
  const defaultInitiativePhotoStrip = [
    {
      id: 'strip-1',
      image:
        'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80',
      alt: 'Classroom study and interactive peer learning',
    },
    {
      id: 'strip-2',
      image:
        'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=600&q=80',
      alt: 'Community nutrition and food distribution',
    },
    {
      id: 'strip-3',
      image:
        'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=600&q=80',
      alt: 'Volunteers sharing warmth and care with senior citizens',
    },
    {
      id: 'strip-4',
      image:
        'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=600&q=80',
      alt: 'ZINMATT grassroots field team organizing resources',
    },
    {
      id: 'strip-5',
      image:
        'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=600&q=80',
      alt: 'Volunteers participating in riverbank ecological cleanup',
    },
  ];

  // Section 4 Default Core Values (4 Cards)
  const defaultCoreValues = [
    {
      id: 'education',
      title: 'Free Education for Children',
      description:
        'Every child deserves access to foundational education. We provide uniforms, school bags, tuition support, and digital tablets to break cycles of poverty.',
      icon: GraduationCap,
      link: '/initiatives',
      linkLabel: 'Learn commitment',
    },
    {
      id: 'visually_impaired',
      title: 'Supporting Visually Impaired',
      description:
        'Visual impairment must never cap a child’s dreams. We distribute customized tactile kits, Braille readers, and audio materials for independent learning.',
      icon: Eye,
      link: '/initiatives',
      linkLabel: 'Learn commitment',
    },
    {
      id: 'elderly',
      title: 'Elderly Care & Dignity',
      description:
        'Restoring dignity to neglected seniors through doorstep medical screenings, subsidized medications, healthy rations, and affectionate companionship.',
      icon: HeartHandshake,
      link: '/initiatives',
      linkLabel: 'Learn commitment',
    },
    {
      id: 'environment',
      title: 'Environmental Cleanliness',
      description:
        'Clean public spaces create healthier futures. We mobilize citizen cleanups, community waste segregation, and tree plantations across neighborhoods.',
      icon: Sparkles,
      link: '/initiatives',
      linkLabel: 'Learn commitment',
    },
  ];

  // Section 5 Default Help Cards (5 Cards)
  const defaultHelpCards = [
    {
      id: 'help-1',
      title: 'Volunteer With Us',
      description:
        'Contribute your time, skills, and energy to make a direct on-ground impact in classrooms, clinics, and cleanups.',
      image:
        'https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=800&q=80',
      icon: Users,
      link: '/get-involved',
      linkLabel: 'Learn More',
    },
    {
      id: 'help-2',
      title: 'Sponsor a Child',
      description:
        'Fund tuition, learning kits, school bags, and digital tablets to keep vulnerable children in formal schooling.',
      image:
        'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
      icon: GraduationCap,
      link: '/get-involved',
      linkLabel: 'Learn More',
    },
    {
      id: 'help-3',
      title: 'Support Our Causes',
      description:
        'Sponsor monthly elder medicines, Braille kits for visually impaired youth, or clean environment drives.',
      image:
        'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=800&q=80',
      icon: Heart,
      link: '/get-involved',
      linkLabel: 'Learn More',
    },
    {
      id: 'help-4',
      title: 'CSR & Partnerships',
      description:
        'Collaborate with us for compliant corporate CSR grants, employee giving drives, and community projects.',
      image:
        'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=800&q=80',
      icon: Award,
      link: '/contact',
      linkLabel: 'Learn More',
    },
    {
      id: 'help-5',
      title: 'Spread Awareness',
      description:
        'Amplify the voices of visually impaired children and isolated elders by sharing field stories across your network.',
      image:
        'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80',
      icon: Share2,
      link: '/contact',
      linkLabel: 'Learn More',
    },
  ];

  // Section 7 Default Story Items (5 Cards)
  const defaultStoryItems = [
    {
      id: 'story-1',
      category: 'Education',
      tag: 'Education Support',
      title: 'First-Generation Med-Spur Readiness',
      description:
        'Empowering first-generation rural students with foundational literacy, digital tablets, and certified instructors.',
      image:
        'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
      linkLabel: 'View Story',
    },
    {
      id: 'story-2',
      category: 'Inclusive Learning',
      tag: 'Specialized Aid',
      title: 'Innovating Through Touch & Sound',
      description:
        'Specialized tactile learning and Braille reading kits introduced to visually impaired students across our Delhi centers.',
      image:
        'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
      linkLabel: 'View Story',
    },
    {
      id: 'story-3',
      category: 'Elderly Care',
      tag: 'Elderly Welfare',
      title: 'Affectionate Friendship & Nutrition',
      description:
        'Weekly dietary baskets, routine health monitoring, and heartfelt companionship delivered to vulnerable senior citizens.',
      image:
        'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=800&q=80',
      linkLabel: 'View Story',
    },
    {
      id: 'story-4',
      category: 'Cleanliness',
      tag: 'Environment Drive',
      title: 'Riverbank Cleanliness Drive',
      description:
        'Mobilizing over 200 community volunteers to clean and protect local river ecosystems and plant native trees.',
      image:
        'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
      linkLabel: 'View Story',
    },
    {
      id: 'story-5',
      category: 'Education',
      tag: 'Digital Learning',
      title: 'Milestone Classroom Graduation',
      description:
        'Celebrating foundational academic milestones and scholarship distributions for dedicated evening study students.',
      image:
        'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80',
      linkLabel: 'View Story',
    },
  ];

  // Dynamic Content Bindings
  const rawHeadline =
    homeConfig?.hero?.headline || 'Building a Better Tomorrow, One Life at a Time.';
  const highlightText = homeConfig?.hero?.highlightText || '';

  // Calculate Hero Headline text splitting
  let headlinePart1 = rawHeadline;
  let headlinePart2 = '';
  let headlinePart3 = '';

  if (highlightText && rawHeadline.includes(highlightText)) {
    const idx = rawHeadline.indexOf(highlightText);
    headlinePart1 = rawHeadline.slice(0, idx);
    headlinePart2 = highlightText;
    headlinePart3 = rawHeadline.slice(idx + highlightText.length);
  } else {
    const commaIdx = rawHeadline.indexOf(',');
    if (commaIdx !== -1) {
      headlinePart1 = rawHeadline.slice(0, commaIdx + 1);
      headlinePart2 = rawHeadline.slice(commaIdx + 1).trim();
    }
  }

  // Section 3: Initiatives & Photo Strip
  const displayedInitiatives =
    homeConfig?.initiativesShowcase?.cards &&
    homeConfig.initiativesShowcase.cards.length > 0
      ? homeConfig.initiativesShowcase.cards.map((c, i) => ({
          id: c.id || `init-${i}`,
          badge: c.badge || 'Active Program',
          title: c.title || '',
          image:
            c.imageUrl ||
            c.image ||
            defaultInitiatives[i % defaultInitiatives.length]?.image ||
            'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80',
          bullets:
            Array.isArray(c.bullets) && c.bullets.length > 0
              ? c.bullets
              : defaultInitiatives[i % defaultInitiatives.length]?.bullets || [],
          linkLabel: c.linkLabel || 'Learn More',
          link: c.link || '/initiatives',
        }))
      : defaultInitiatives;

  const displayedPhotoStrip =
    homeConfig?.initiativesShowcase?.photoStrip &&
    homeConfig.initiativesShowcase.photoStrip.length > 0
      ? homeConfig.initiativesShowcase.photoStrip.map((img, i) => ({
          id: `strip-${i}`,
          image: img,
          alt: `Field highlight photo ${i + 1}`,
        }))
      : defaultInitiativePhotoStrip;

  // Section 4: Core Values
  const displayedCoreValues =
    homeConfig?.coreValues?.cards && homeConfig.coreValues.cards.length > 0
      ? homeConfig.coreValues.cards.map((v, i) => ({
          id: v.id || `val-${i}`,
          title: v.title || defaultCoreValues[i % defaultCoreValues.length]?.title || '',
          description:
            v.description ||
            defaultCoreValues[i % defaultCoreValues.length]?.description ||
            '',
          linkLabel: v.linkLabel || 'Learn commitment',
          icon: resolveIcon(v.icon || defaultCoreValues[i % defaultCoreValues.length]?.icon),
          link: v.link || '/initiatives',
        }))
      : defaultCoreValues;

  // Section 5: Get Involved Cards
  const displayedHelpCards =
    homeConfig?.getInvolvedSection?.cards &&
    homeConfig.getInvolvedSection.cards.length > 0
      ? homeConfig.getInvolvedSection.cards.map((c, i) => ({
          id: c.id || `help-${i}`,
          title: c.title || defaultHelpCards[i % defaultHelpCards.length]?.title || '',
          description:
            c.description ||
            defaultHelpCards[i % defaultHelpCards.length]?.description ||
            '',
          image:
            c.imageUrl ||
            c.image ||
            defaultHelpCards[i % defaultHelpCards.length]?.image ||
            'https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=800&q=80',
          icon: resolveIcon(c.icon || defaultHelpCards[i % defaultHelpCards.length]?.icon),
          linkLabel: c.linkLabel || 'Learn More',
          link: c.link || '/get-involved',
        }))
      : defaultHelpCards;

  // Section 7: Categories and Stories
  const displayedCategories =
    homeConfig?.storiesSection?.filterCategories &&
    homeConfig.storiesSection.filterCategories.length > 0
      ? homeConfig.storiesSection.filterCategories
      : ['All', 'Education', 'Inclusive Learning', 'Elderly Care', 'Cleanliness'];

  const displayedStoryItems =
    homeConfig?.storiesSection?.cards && homeConfig.storiesSection.cards.length > 0
      ? homeConfig.storiesSection.cards.map((s, i) => ({
          id: s.id || `story-${i}`,
          category: s.category || 'Education',
          tag: s.tag || 'Community Story',
          title: s.title || defaultStoryItems[i % defaultStoryItems.length]?.title || '',
          description:
            s.description ||
            defaultStoryItems[i % defaultStoryItems.length]?.description ||
            '',
          image:
            s.imageUrl ||
            s.image ||
            defaultStoryItems[i % defaultStoryItems.length]?.image ||
            'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
          linkLabel: s.linkLabel || 'View Story',
        }))
      : defaultStoryItems;

  const filteredStories =
    galleryFilter === 'All'
      ? displayedStoryItems
      : displayedStoryItems.filter(
          (item) => item.category?.toLowerCase() === galleryFilter.toLowerCase()
        );

  // =========================================================================
  // SUB-SECTION RENDERERS (All 7 Sections + Highlights)
  // =========================================================================

  // 1. HERO SECTION (image_f26e06.jpg)
  const renderHeroSection = () => {
    const heroBadges =
      homeConfig?.hero?.trustBadges && homeConfig.hero.trustBadges.length > 0
        ? homeConfig.hero.trustBadges
        : ['80G Compliant', 'Transparent Reporting', 'Community-First'];

    return (
      <section
        key="sec-hero"
        id="hero"
        className="relative w-full min-h-[460px] sm:min-h-[500px] lg:min-h-[520px] flex items-center bg-gray-950 overflow-hidden"
      >
        <img
          src={
            homeConfig?.hero?.heroImage ||
            homeConfig?.hero?.imageUrl ||
            'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=2000&q=85'
          }
          alt="Elder and child smiling warmly together, supported by ZINMATT Foundation"
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover object-[85%_30%] sm:object-[85%_25%] lg:object-[90%_25%] transition-transform duration-1000 scale-100"
          onError={(e) => {
            e.currentTarget.src =
              'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=2000&q=85';
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/85 via-50% to-black/30 lg:to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/25 pointer-events-none" />

        <div className="relative z-10 w-full py-12 sm:py-16 lg:py-20">
          <Container>
            <div className="max-w-3xl lg:max-w-[780px] space-y-4 sm:space-y-5">
              {/* Small Accent Tag */}
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#FCC241] text-xs font-bold uppercase tracking-wider select-none shadow-sm">
                <span>{homeConfig?.hero?.accentTag || 'MAKING A DIFFERENCE TOGETHER'}</span>
              </div>

              {/* Bold Arial Hero H1 with Signature Brand Gradient Accent */}
              <h1 className="font-['Arial',_Helvetica,_sans-serif] text-white font-bold text-3xl sm:text-5xl lg:text-6xl leading-[1.15] tracking-tight drop-shadow-md">
                {headlinePart1 && <span className="block">{headlinePart1}</span>}
                {headlinePart2 && (
                  <span className="block mt-1 sm:mt-1.5 bg-gradient-to-r from-[#FB7336] via-[#FBA836] to-[#FCC241] bg-clip-text text-transparent">
                    {headlinePart2}
                  </span>
                )}
                {headlinePart3 && <span className="block mt-1">{headlinePart3}</span>}
              </h1>

              {/* Crisp Concise Subtext */}
              <p className="font-sans text-white/90 text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl font-normal drop-shadow-sm">
                {homeConfig?.hero?.description ||
                  homeConfig?.hero?.subheadline ||
                  'Empowering children with education, supporting visually impaired youth, caring for elders, and building cleaner communities across India.'}
              </p>

              {/* Action Buttons Row */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-3.5 pt-1 w-full sm:w-auto">
                <Button
                  variant="primary"
                  size="lg"
                  iconPosition="left"
                  onClick={() => openDonateModal()}
                  className="w-full sm:w-auto justify-center shadow-xl shadow-[#FB7336]/30 hover:shadow-2xl hover:scale-[1.02] transition-all cursor-pointer"
                >
                  {homeConfig?.hero?.primaryBtnLabel ||
                    homeConfig?.hero?.primaryCtaLabel ||
                    'Support Our Cause'}
                </Button>

                <Button
                  variant="secondary"
                  size="lg"
                  icon={ArrowRight}
                  iconPosition="right"
                  className="w-full sm:w-auto justify-center bg-white/95 hover:bg-white text-[#242424] border-white/40 shadow-sm hover:scale-[1.02] transition-all backdrop-blur-sm"
                  onClick={() => {
                    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  {homeConfig?.hero?.secondaryBtnLabel ||
                    homeConfig?.hero?.secondaryCtaLabel ||
                    'Explore Our Mission'}
                </Button>
              </div>

              {/* Overlapping 4-Avatar Supporter/Volunteer Cluster */}
              <div className="flex items-center gap-3 pt-1 select-none">
                <div className="flex items-center -space-x-2.5">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80"
                    alt="ZINMATT Supporter"
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border-2 border-white object-cover shadow-md ring-1 ring-black/10"
                    onError={(e) => {
                      e.currentTarget.src =
                        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80';
                    }}
                  />
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80"
                    alt="ZINMATT Volunteer"
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border-2 border-white object-cover shadow-md ring-1 ring-black/10"
                    onError={(e) => {
                      e.currentTarget.src =
                        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80';
                    }}
                  />
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80"
                    alt="ZINMATT Field Worker"
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border-2 border-white object-cover shadow-md ring-1 ring-black/10"
                    onError={(e) => {
                      e.currentTarget.src =
                        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80';
                    }}
                  />
                  <img
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80"
                    alt="ZINMATT Community Member"
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border-2 border-white object-cover shadow-md ring-1 ring-black/10"
                    onError={(e) => {
                      e.currentTarget.src =
                        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80';
                    }}
                  />
                </div>
                <div className="text-left">
                  <div className="font-['Arial'] font-bold text-xs sm:text-sm text-white leading-tight">
                    {homeConfig?.hero?.supportersTitle || '+2,500 Supporters & Volunteers'}
                  </div>
                  <div className="text-[11px] text-white/80 font-medium">
                    {homeConfig?.hero?.supportersSubtitle || 'Standing with our grassroots mission'}
                  </div>
                </div>
              </div>

              {/* Tight, Crisp Trust Line */}
              <div className="pt-3 sm:pt-4 border-t border-white/20 flex flex-wrap items-center gap-y-2 gap-x-4 sm:gap-x-6 text-xs sm:text-sm text-white/90">
                {heroBadges.map((badge, idx) => {
                  const Icon = idx === 0 ? ShieldCheck : idx === 1 ? CheckCircle2 : Award;
                  return (
                    <div key={idx} className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-[#FCC241] flex-shrink-0" />
                      <span className="font-semibold text-white">{badge}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </Container>
        </div>
      </section>
    );
  };

  // 2. ABOUT SECTION (image_f26e21.jpg)
  const renderAboutSection = () => {
    const archImages =
      homeConfig?.aboutPreview?.archImages && homeConfig.aboutPreview.archImages.length > 0
        ? homeConfig.aboutPreview.archImages
        : [
            'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=800&q=80',
          ];

    return (
      <section key="sec-about" id="about" className="w-full py-6 sm:py-8 lg:py-8 bg-[#FFFFFF]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: 3 Vertical Staggered Pill-Rounded Photo Capsules */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center">
              <div className="relative w-full max-w-sm sm:max-w-md mx-auto py-2 sm:py-4">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-0">
                  <div className="w-56 sm:w-72 h-56 sm:h-72 rounded-full bg-[#FFF0E8] blur-2xl opacity-70" />
                </div>

                <div className="relative z-10 grid grid-cols-3 gap-2.5 sm:gap-4 items-center w-full">
                  {/* Pill 1 */}
                  <div className="h-44 sm:h-64 md:h-72 rounded-full overflow-hidden border-2 sm:border-4 border-white shadow-md bg-gray-100 group">
                    <img
                      src={
                        archImages[0] ||
                        'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80'
                      }
                      alt="Children learning happily in supported classroom"
                      loading="lazy"
                      className="w-full h-full object-cover object-center"
                      onError={(e) => {
                        e.currentTarget.src =
                          'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80';
                      }}
                    />
                  </div>

                  {/* Pill 2 */}
                  <div className="h-52 sm:h-72 md:h-80 rounded-full overflow-hidden border-2 sm:border-4 border-white shadow-xl bg-gray-100 -mt-2 sm:-mt-4 group">
                    <img
                      src={
                        archImages[1] ||
                        'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80'
                      }
                      alt="Volunteer assisting a child with specialized learning tools"
                      loading="lazy"
                      className="w-full h-full object-cover object-center"
                      onError={(e) => {
                        e.currentTarget.src =
                          'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80';
                      }}
                    />
                  </div>

                  {/* Pill 3 */}
                  <div className="h-44 sm:h-64 md:h-72 rounded-full overflow-hidden border-2 sm:border-4 border-white shadow-md bg-gray-100 mt-2 sm:mt-4 group">
                    <img
                      src={
                        archImages[2] ||
                        'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=800&q=80'
                      }
                      alt="Healthcare and empathetic support for elderly citizens"
                      loading="lazy"
                      className="w-full h-full object-cover object-center"
                      onError={(e) => {
                        e.currentTarget.src =
                          'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&w=800&q=80';
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4 sm:mt-6 z-10 w-full text-center">
                <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-[#FFF0E8] border border-[#FB7336]/30 text-[#FB7336] text-[11px] sm:text-xs font-bold shadow-sm select-none max-w-full">
                  <span className="truncate">
                    {homeConfig?.aboutPreview?.operationsBadge ||
                      'Direct Grassroots Field Operations • 12+ States'}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Editorial Typography & Action Row */}
            <div className="lg:col-span-6 space-y-5 sm:space-y-6">
              <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#FB7336] select-none">
                {homeConfig?.aboutPreview?.accentTag || 'ABOUT ZINMATT FOUNDATION'}
              </div>

              <h2 className="font-['Arial',_Helvetica,_sans-serif] text-[#242424] font-bold text-3xl sm:text-[36px] lg:text-[40px] leading-tight tracking-tight">
                {homeConfig?.aboutPreview?.heading ||
                  'Creating Opportunities. Spreading Hope. Building a Better Society.'}
              </h2>

              <div className="space-y-4 text-base sm:text-[17px] text-[#666666] leading-relaxed">
                <p>
                  {homeConfig?.aboutPreview?.paragraph1 ||
                    homeConfig?.aboutPreview?.descriptionParagraph1 ||
                    'ZINMATT Foundation was born out of a relentless belief that sustainable change begins at the grassroots level. By working directly with underserved communities, we dismantle barriers to free education for out-of-school children, deliver specialized tactile learning tools and audio libraries for visually impaired youth, restore dignity to neglected elders through doorstep healthcare, and lead civic cleanliness drives for thriving neighborhoods.'}
                </p>
                <p>
                  {homeConfig?.aboutPreview?.paragraph2 ||
                    homeConfig?.aboutPreview?.descriptionParagraph2 ||
                    'Every initiative is built on radical financial transparency, community empowerment, and direct field action ensuring measurable, lasting transformation for thousands of families across India.'}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6 pt-2 sm:pt-3 w-full">
                <Link to="/about" className="w-full sm:w-auto">
                  <Button
                    variant="primary"
                    size="md"
                    icon={ArrowRight}
                    iconPosition="right"
                    className="w-full sm:w-auto justify-center shadow-md shadow-[#FB7336]/20 hover:shadow-lg"
                  >
                    {homeConfig?.aboutPreview?.ctaLabel || 'Learn More About Us'}
                  </Button>
                </Link>

                <a
                  href={`tel:${(homeConfig?.aboutPreview?.phoneNumber || '+911145678900').replace(/[^0-9+]/g, '')}`}
                  className="inline-flex items-center justify-center sm:justify-start gap-3.5 group text-left transition-transform hover:translate-x-0.5"
                >
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#FFF0E8] text-[#FB7336] flex items-center justify-center transition-all duration-300 group-hover:bg-[#FB7336] group-hover:text-white flex-shrink-0 shadow-sm">
                    <PhoneCall className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-[#666666] font-medium leading-none">
                      {homeConfig?.aboutPreview?.phoneLabel || 'Call Us:'}
                    </div>
                    <div className="font-['Arial'] font-bold text-base text-[#242424] mt-1.5 group-hover:text-[#FB7336] transition-colors leading-none">
                      {homeConfig?.aboutPreview?.phoneNumber || '+91 (011) 4567-8900'}
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>
    );
  };

  // 3. INITIATIVES SECTION (image_f26e25.jpg)
  const renderInitiativesSection = () => (
    <section
      key="sec-initiatives"
      id="initiatives"
      className="w-full py-6 sm:py-8 lg:py-8 bg-[#FFFFFF] overflow-x-hidden"
    >
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-4 sm:mb-5">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FFF0E8] border border-[#FB7336]/20 text-[#FB7336] text-xs font-bold uppercase tracking-wider mb-2.5 select-none">
            {homeConfig?.initiativesShowcase?.pillTag || 'OUR INITIATIVES'}
          </div>
          <h2 className="font-['Arial',_Helvetica,_sans-serif] text-[#242424] font-bold text-3xl sm:text-[38px] leading-tight">
            {homeConfig?.initiativesShowcase?.heading || 'What We Do'}
          </h2>
          <p className="text-[#666666] text-sm sm:text-base mt-2">
            {homeConfig?.initiativesShowcase?.subheading ||
              'Four core pillars of hope, scaled for measurable impact across underserved communities in India.'}
          </p>
        </div>

        {/* MOBILE VIEW */}
        <MobileCarousel
          items={displayedInitiatives}
          renderItem={(item) => (
            <div className="w-full rounded-2xl bg-[#FFFFFF] border border-[#EEEEEE] overflow-hidden shadow-sm flex flex-col justify-between h-full">
              <div>
                <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src =
                        'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  {item.badge && (
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-[#242424] text-[11px] font-bold px-2.5 py-1 rounded-md shadow-sm border border-[#EEEEEE]">
                      {item.badge}
                    </div>
                  )}
                </div>

                <div className="p-4 space-y-3">
                  <h3 className="font-['Arial',_Helvetica,_sans-serif] text-lg font-bold text-[#242424] leading-snug">
                    {item.title}
                  </h3>

                  <ul className="space-y-2 text-xs sm:text-[13px] text-[#666666]">
                    {item.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FB7336] mt-1.5 flex-shrink-0" />
                        <span className="leading-snug">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-4 pt-0">
                <Link to={item.link} className="block w-full">
                  <Button
                    variant="primary"
                    size="md"
                    icon={ArrowRight}
                    iconPosition="right"
                    className="w-full justify-center rounded-xl shadow-md shadow-[#FB7336]/20 font-bold text-sm"
                  >
                    {item.linkLabel || 'Learn More'}
                  </Button>
                </Link>
              </div>
            </div>
          )}
        />

        {/* DESKTOP VIEW */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedInitiatives.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-[#EEEEEE] bg-white overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.src =
                        'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-[#242424] text-[11px] font-bold px-2.5 py-1 rounded-md shadow-sm border border-[#EEEEEE]">
                    {item.badge}
                  </div>
                </div>

                <div className="p-4 sm:p-5 space-y-3">
                  <h3 className="font-['Arial',_Helvetica,_sans-serif] text-lg font-bold text-[#242424] leading-snug">
                    {item.title}
                  </h3>

                  <ul className="space-y-1.5 text-xs sm:text-[13px] text-[#666666]">
                    {item.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FB7336] mt-1.5 flex-shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-4 sm:p-5 pt-0">
                <Link
                  to={item.link}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FB7336] group-hover:text-[#242424] transition-colors"
                >
                  <span>{item.linkLabel || 'Learn More'}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* 5-Photo Strip (image_f26e25.jpg bottom) */}
        <div className="overflow-x-hidden w-full mt-4 sm:mt-5">
          <MobileCarousel
            items={displayedPhotoStrip}
            renderItem={(photo) => (
              <div className="rounded-xl overflow-hidden aspect-[4/3] w-full border border-[#EEEEEE] shadow-sm bg-gray-100">
                <img
                  src={photo.image}
                  alt={photo.alt}
                  loading="lazy"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src =
                      'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80';
                  }}
                />
              </div>
            )}
          />

          <div className="hidden md:grid md:grid-cols-5 gap-3">
            {displayedPhotoStrip.map((photo) => (
              <div
                key={photo.id}
                className="rounded-xl overflow-hidden aspect-[4/3] w-full border border-[#EEEEEE] shadow-sm hover:shadow-md transition-all duration-300 group bg-gray-100"
              >
                <img
                  src={photo.image}
                  alt={photo.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.src =
                      'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80';
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );

  // 4. CORE VALUES SECTION (image_f26e3f.jpg top)
  const renderPillarsSection = () => (
    <section
      key="sec-pillars"
      className="w-full py-6 sm:py-8 lg:py-8 bg-[#FFF9F5] border-y border-[#EEEEEE] overflow-x-hidden"
    >
      <Container>
        <SectionHeader
          tag={homeConfig?.coreValues?.sectionTag || 'CORE COMMITMENTS'}
          title={homeConfig?.coreValues?.heading || 'Our Core Values'}
          subtitle={
            homeConfig?.coreValues?.subheading ||
            'Four meaningful commitments. One vision of an equitable and compassionate society.'
          }
          align="center"
          className="mb-4 sm:mb-5"
        />

        <MobileCarousel
          items={displayedCoreValues}
          renderItem={(val) => (
            <Card
              surface="white"
              className="w-full p-5 sm:p-6 flex flex-col justify-between group shadow-sm rounded-2xl h-full"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#FFF0E8] border border-[#FB7336]/25 flex items-center justify-center text-[#FB7336] transition-transform duration-300 group-hover:scale-110">
                  <val.icon className="w-6 h-6 text-[#FB7336]" />
                </div>

                <h3 className="font-['Arial',_Helvetica,_sans-serif] text-lg font-bold text-[#242424] leading-snug">
                  {val.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#666666] leading-relaxed">
                  {val.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#EEEEEE] mt-5">
                <Link
                  to={val.link}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FB7336] group-hover:text-[#242424] transition-colors"
                >
                  <span>{val.linkLabel || 'Learn commitment'}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </Card>
          )}
        />

        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {displayedCoreValues.map((val) => (
            <Card
              key={val.id}
              surface="white"
              className="p-5 sm:p-6 flex flex-col justify-between group h-full shadow-sm hover:shadow-xl transition-all duration-300 rounded-2xl"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#FFF0E8] border border-[#FB7336]/25 flex items-center justify-center text-[#FB7336] transition-transform duration-300 group-hover:scale-110">
                  <val.icon className="w-6 h-6 text-[#FB7336]" />
                </div>

                <h3 className="font-['Arial',_Helvetica,_sans-serif] text-lg font-bold text-[#242424] leading-snug">
                  {val.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#666666] leading-relaxed">
                  {val.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#EEEEEE] mt-5">
                <Link
                  to={val.link}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FB7336] group-hover:text-[#242424] transition-colors"
                >
                  <span>{val.linkLabel || 'Learn commitment'}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );

  // 5. BE A PART OF THE CHANGE / GET INVOLVED (image_f26e3f.jpg bottom)
  const renderHelpSection = () => (
    <section
      key="sec-help"
      id="get-involved"
      className="w-full py-6 sm:py-8 lg:py-8 bg-[#FFFFFF] overflow-x-hidden"
    >
      <Container>
        <SectionHeader
          tag={homeConfig?.getInvolvedSection?.pillTag || 'GET INVOLVED'}
          title={homeConfig?.getInvolvedSection?.heading || 'Be a Part of the Change.'}
          subtitle={
            homeConfig?.getInvolvedSection?.subheading ||
            'From volunteering your time to making a direct gift of education, there are so many ways to empower our community and leave an imprint on real lives.'
          }
          align="center"
          className="mb-4 sm:mb-5"
        />

        <MobileCarousel
          items={displayedHelpCards}
          className="mb-4 sm:mb-5"
          renderItem={(card) => (
            <div className="relative rounded-2xl overflow-hidden min-h-[320px] shadow-md group flex flex-col justify-between p-5 border border-[#EEEEEE] bg-gray-900 w-full h-full">
              <img
                src={card.image}
                alt={card.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  e.currentTarget.src =
                    'https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=800&q=80';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/20 pointer-events-none" />

              <div className="relative z-10 self-end">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#FB7336] to-[#FCC241] flex items-center justify-center text-[#242424] shadow-md">
                  <card.icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#242424]" />
                </div>
              </div>

              <div className="relative z-10 space-y-1.5">
                <h3 className="font-['Arial',_Helvetica,_sans-serif] text-base sm:text-lg font-bold text-white leading-snug">
                  {card.title}
                </h3>
                <p className="text-xs text-white/90 leading-relaxed line-clamp-3">
                  {card.description}
                </p>
                <div className="pt-1.5">
                  <Link
                    to={card.link}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#FCC241] group-hover:text-white transition-colors"
                  >
                    <span>{card.linkLabel || 'Learn More'}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          )}
        />

        <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5 mb-4 sm:mb-5">
          {displayedHelpCards.map((card) => (
            <div
              key={card.id}
              className="relative rounded-2xl overflow-hidden min-h-[300px] sm:min-h-[340px] shadow-md group flex flex-col justify-between p-5 border border-[#EEEEEE] bg-gray-900"
            >
              <img
                src={card.image}
                alt={card.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  e.currentTarget.src =
                    'https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=800&q=80';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/20 pointer-events-none" />

              <div className="relative z-10 self-end">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#FB7336] to-[#FCC241] flex items-center justify-center text-[#242424] shadow-md">
                  <card.icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#242424]" />
                </div>
              </div>

              <div className="relative z-10 space-y-1.5">
                <h3 className="font-['Arial',_Helvetica,_sans-serif] text-base sm:text-lg font-bold text-white leading-snug">
                  {card.title}
                </h3>
                <p className="text-xs text-white/90 leading-relaxed line-clamp-3">
                  {card.description}
                </p>
                <div className="pt-1.5">
                  <Link
                    to={card.link}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#FCC241] group-hover:text-white transition-colors"
                  >
                    <span>{card.linkLabel || 'Learn More'}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 w-full">
          <Link to="/get-involved" className="w-full sm:w-auto">
            <Button variant="primary" size="lg" iconPosition="left" className="w-full sm:w-auto justify-center">
              Join As A Volunteer
            </Button>
          </Link>
          <Button
            variant="secondary"
            size="lg"
            icon={ArrowRight}
            iconPosition="right"
            onClick={() => openDonateModal({ frequency: 'monthly' })}
            className="w-full sm:w-auto justify-center cursor-pointer"
          >
            Give Monthly Support
          </Button>
        </div>
      </Container>
    </section>
  );

  // 6. ORANGE GRADIENT TRUST STRIP (image_f26e5b.jpg top)
  const renderTrustStripSection = () => {
    const headline =
      homeConfig?.trustStrip?.headline ||
      homeConfig?.ctaHeadline ||
      'Every Contribution Can Change a Life Today.';
    const subheadline =
      homeConfig?.trustStrip?.subheadline ||
      'Your generous donation directly funds free schooling and digital kits for underprivileged children, assistive Braille materials for visually impaired youth, nutritious daily meals and medical care for isolated elders, and cleaner green communities across India.';
    const buttonText =
      homeConfig?.trustStrip?.buttonText || homeConfig?.ctaButtonText || 'Start Donate';
    const highlights =
      homeConfig?.trustStrip?.trustStripHighlights &&
      homeConfig.trustStrip.trustStripHighlights.length > 0
        ? homeConfig.trustStrip.trustStripHighlights
        : [
            '80G Tax Exemption Available',
            '100% Direct Grassroots Impact',
            'Transparent Audited Reporting',
          ];

    return (
      <section
        key="sec-trust-strip"
        className="relative w-full py-5 sm:py-12 lg:py-16 bg-gradient-to-r from-[#FB7336] via-[#FBA036] to-[#FCC241] overflow-hidden text-center shadow-inner"
      >
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-white/15 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-white/20 blur-3xl pointer-events-none" />

        <Container>
          <div className="max-w-4xl mx-auto space-y-5 sm:space-y-6 relative z-10 px-2 sm:px-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/35 text-white text-xs sm:text-sm font-bold uppercase tracking-wider select-none shadow-sm">
              <span>SUPPORT OUR GRASSROOTS MISSION</span>
            </div>

            <h2 className="font-['Arial',_Helvetica,_sans-serif] font-bold text-3xl sm:text-4xl lg:text-[46px] xl:text-[50px] text-white leading-snug sm:leading-[1.3] lg:leading-[1.35] tracking-tight drop-shadow-md">
              {headline}
            </h2>

            <p className="font-sans text-white/95 text-base sm:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed font-medium drop-shadow-sm">
              {subheadline}
            </p>

            <div className="pt-2 sm:pt-3">
              <Button
                variant="white"
                size="lg"
                icon={ArrowRight}
                iconPosition="right"
                onClick={() => openDonateModal()}
                className="w-full sm:w-auto justify-center px-9 py-4 text-base sm:text-lg font-bold shadow-xl hover:shadow-xl transition-all duration-300 rounded-xl cursor-pointer"
              >
                {buttonText}
              </Button>
            </div>

            <div className="pt-3 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-white/90 font-medium select-none">
              {highlights.map((hl, idx) => (
                <React.Fragment key={idx}>
                  {idx > 0 && <span className="hidden sm:inline text-white/40">•</span>}
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                    <span>{hl}</span>
                  </span>
                </React.Fragment>
              ))}
            </div>
          </div>
        </Container>
      </section>
    );
  };

  // 7. STORIES & GALLERY HIGHLIGHTS SECTION (image_f26e5b.jpg bottom)
  const renderStoriesSection = () => (
    <section
      key="sec-stories"
      id="gallery"
      className="w-full py-6 sm:py-8 lg:py-8 bg-[#FFF9F5] border-t border-[#EEEEEE] overflow-x-hidden"
    >
      <Container>
        <SectionHeader
          tag={homeConfig?.storiesSection?.pillTag || 'STORIES & COMMUNITY'}
          title={homeConfig?.storiesSection?.heading || 'Moments of Impact & Community'}
          subtitle={
            homeConfig?.storiesSection?.subheading ||
            'Glimpses from the field across education, child care, elderly support, and cleanup drives.'
          }
          align="center"
          className="mb-3 sm:mb-4"
        />

        <div className="w-full overflow-x-auto no-scrollbar pb-1 mb-4 sm:mb-5">
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-max mx-auto sm:justify-center px-1">
            {displayedCategories.map((cat) => {
              const isActive = galleryFilter === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={(e) => {
                    setGalleryFilter(cat);
                    e.currentTarget.scrollIntoView({
                      behavior: 'smooth',
                      block: 'nearest',
                      inline: 'center',
                    });
                  }}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap flex-shrink-0 transition-all duration-300 focus:outline-none cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-[#FB7336] to-[#FCC241] text-[#242424] shadow-[0_2px_10px_rgba(251,115,54,0.25)] scale-[1.02]'
                      : 'bg-white border border-[#EEEEEE] text-[#666666] hover:bg-[#FFF0E8] hover:text-[#FB7336] hover:border-[#FB7336]/30 shadow-sm'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        <MobileCarousel
          items={filteredStories.slice(0, 5)}
          resetKey={galleryFilter}
          renderItem={(item) => (
            <div className="rounded-2xl border border-[#EEEEEE] bg-white overflow-hidden shadow-sm flex flex-col group w-full h-full justify-between">
              <div>
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.src =
                        'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-md text-[11px] font-bold text-[#FB7336] border border-[#EEEEEE] shadow-sm">
                    {item.tag}
                  </div>
                </div>

                <div className="p-4 sm:p-5 space-y-2">
                  <h3 className="font-['Arial',_Helvetica,_sans-serif] font-bold text-base sm:text-lg text-[#242424] leading-snug line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#666666] leading-relaxed mt-1.5 line-clamp-3">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="p-4 sm:p-5 pt-0 border-t border-[#EEEEEE] mt-3 flex items-center justify-between text-xs font-bold text-[#FB7336] group-hover:text-[#242424] transition-colors">
                <Link to="/gallery" className="inline-flex items-center gap-1.5">
                  <span>{item.linkLabel || 'View Story'}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          )}
        />

        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-5">
          {filteredStories.slice(0, 5).map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-[#EEEEEE] bg-white overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group justify-between"
            >
              <div>
                <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-gray-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.src =
                        'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-md text-[11px] font-bold text-[#FB7336] border border-[#EEEEEE] shadow-sm">
                    {item.tag}
                  </div>
                </div>

                <div className="p-4 sm:p-5 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-['Arial',_Helvetica,_sans-serif] font-bold text-base sm:text-lg text-[#242424] leading-snug line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#666666] leading-relaxed mt-1.5 line-clamp-3">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-5 pt-0 border-t border-[#EEEEEE] mt-3 flex items-center justify-between text-xs font-bold text-[#FB7336] group-hover:text-[#242424] transition-colors">
                <Link to="/gallery" className="inline-flex items-center gap-1.5">
                  <span>{item.linkLabel || 'View Story'}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );

  // Optional Highlight Strip (Impact Metrics)
  const renderImpactSection = () => (
    <section key="sec-impact" className="w-full py-4 sm:py-5 lg:py-5 bg-[#FFF0E8] border-y border-[#FB7336]/20">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {highlightMetrics.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-5 border border-[#EEEEEE] shadow-sm hover:bg-white transition-all duration-300"
            >
              <GradientIconBox icon={item.icon} size="md" className="flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <div className="font-['Arial',_Helvetica,_sans-serif] font-bold text-2xl sm:text-3xl text-[#242424] leading-tight">
                  {item.metric}
                </div>
                <div className="font-['Arial'] font-bold text-sm text-[#242424] mt-0.5 truncate">
                  {item.label}
                </div>
                <p className="text-xs text-[#666666] mt-0.5 leading-snug">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );

  const renderSectionById = (id) => {
    switch (id) {
      case 'hero':
        return renderHeroSection();
      case 'about':
        return renderAboutSection();
      case 'initiatives':
        return renderInitiativesSection();
      case 'pillars':
        return renderPillarsSection();
      case 'get_involved':
        return renderHelpSection();
      case 'help':
        return (
          <React.Fragment key="sec-help-fragment">
            {renderHelpSection()}
            {!orderToRender.includes('trust_strip') && renderTrustStripSection()}
          </React.Fragment>
        );
      case 'trust_strip':
        return renderTrustStripSection();
      case 'impact':
        return renderImpactSection();
      case 'stories':
        return renderStoriesSection();
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] flex flex-col font-sans antialiased text-[#666666] selection:bg-[#FFF0E8] selection:text-[#FB7336] overflow-x-hidden w-full">
      {/* 1. Navbar */}
      <Navbar />

      <main className="flex-1 w-full overflow-x-hidden">
        {orderToRender.map((secId) => {
          if (!isSectionVisible(secId)) return null;
          return <React.Fragment key={secId}>{renderSectionById(secId)}</React.Fragment>;
        })}
      </main>

      {/* Footer */}
      <div id="contact" className="w-full">
        <Footer />
      </div>
    </div>
  );
}

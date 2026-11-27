import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import SectionHeader from '../components/ui/SectionHeader';
import MobileCardCarousel from '../components/ui/MobileCardCarousel';
import api from '../lib/api';
import {
  Heart,
  ArrowRight,
  Maximize2,
  X,
  MapPin,
} from 'lucide-react';

/**
 * Gallery Page for ZINMATT Foundation
 * Exact match to reference layout (image_e4f9eb.jpg):
 * 1. Full-Width Dark Banner with left-aligned title & gradient accent bar
 * 2. Interactive Category Filter Pills & 3x3 Photo Grid with modal preview
 * 3. Snapshots From the Field (3 tall highlight cards with location tags)
 * 4. Final Call to Action Banner & Global Footer
 */
export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [visibleCount, setVisibleCount] = useState(12);
  const [activeModalItem, setActiveModalItem] = useState(null);

  // Category Filter Pills
  const filterPills = [
    { id: 'all', label: 'All' },
    { id: 'education', label: 'Education' },
    { id: 'inclusive', label: 'Inclusive Learning' },
    { id: 'elderly', label: 'Elderly Care' },
    { id: 'cleanliness', label: 'Cleanliness Drives' },
    { id: 'volunteers', label: 'Volunteers' },
  ];

  // Gallery Photos (Default Initial Curated Moments)
  const defaultGalleryItems = [
    {
      id: 'gal-1',
      category: 'education',
      badge: 'EDUCATION',
      title: 'Classroom Learning Session',
      description: 'Foundational literacy classes across grassroots centers.',
      image:
        'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
      fallbackImage:
        'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'gal-2',
      category: 'inclusive',
      badge: 'INCLUSIVE LEARNING',
      title: 'Inclusive Study Support',
      description: 'Tactile Braille study kits and audio-assisted learning.',
      image:
        'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
      fallbackImage:
        'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'gal-3',
      category: 'elderly',
      badge: 'ELDERLY CARE',
      title: 'Senior Citizen Care Drive',
      description: 'Nutritional meal packages and healthcare visits.',
      image:
        'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=800&q=80',
      fallbackImage:
        'https://images.unsplash.com/photo-1516307365426-bea591f05011?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'gal-4',
      category: 'cleanliness',
      badge: 'CLEANLINESS DRIVES',
      title: 'Neighborhood Greening',
      description: 'Civic waste transformation and community parks.',
      image:
        'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
      fallbackImage:
        'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'gal-5',
      category: 'volunteers',
      badge: 'VOLUNTEERS',
      title: 'Volunteer Orientation Hub',
      description: 'Field coordination planning healthy distribution.',
      image:
        'https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=800&q=80',
      fallbackImage:
        'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'gal-6',
      category: 'education',
      badge: 'EDUCATION',
      title: 'Art & Creativity Day',
      description: 'Expressive workshops bringing joy through paints.',
      image:
        'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80',
      fallbackImage:
        'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'gal-7',
      category: 'inclusive',
      badge: 'INCLUSIVE LEARNING',
      title: 'Audio & Sensory Assistance',
      description: 'Digital audiobooks and tactile sensory tools.',
      image:
        'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
      fallbackImage:
        'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'gal-8',
      category: 'elderly',
      badge: 'ELDERLY CARE',
      title: 'Warm Companionship Circle',
      description: 'Emotional companionship and elderly tea circles.',
      image:
        'https://images.unsplash.com/photo-1516307365426-bea591f05011?auto=format&fit=crop&w=800&q=80',
      fallbackImage:
        'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'gal-9',
      category: 'cleanliness',
      badge: 'CLEANLINESS DRIVES',
      title: 'Civic Tree Plantation',
      description: 'Restoring urban greenery through sapling plantation.',
      image:
        'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80',
      fallbackImage:
        'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'gal-10',
      category: 'volunteers',
      badge: 'VOLUNTEERS',
      title: 'Community Nutrition Kitchen',
      description: 'Daily hot meal preparation for underprivileged youth.',
      image:
        'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80',
      fallbackImage:
        'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'gal-11',
      category: 'education',
      badge: 'EDUCATION',
      title: 'STEM Science Workshop',
      description: 'Hands-on experiments awakening scientific curiosity.',
      image:
        'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80',
      fallbackImage:
        'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'gal-12',
      category: 'elderly',
      badge: 'ELDERLY CARE',
      title: 'Elderly Health Checkups',
      description: 'Routine blood pressure and geriatric screenings.',
      image:
        'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
      fallbackImage:
        'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'gal-13',
      category: 'inclusive',
      badge: 'INCLUSIVE LEARNING',
      title: 'Braille Literacy Workshop',
      description: 'Hands-on tactile training helping visually impaired youth excel.',
      image:
        'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
      fallbackImage:
        'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'gal-14',
      category: 'cleanliness',
      badge: 'CLEANLINESS DRIVES',
      title: 'Urban Waterfront Restoration',
      description: 'Community volunteers revitalizing riverbanks and civic pathways.',
      image:
        'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80',
      fallbackImage:
        'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'gal-15',
      category: 'volunteers',
      badge: 'VOLUNTEERS',
      title: 'Community Relief Operations',
      description: 'Grassroots volunteer squads mobilizing aid and warm meals.',
      image:
        'https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=800&q=80',
      fallbackImage:
        'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'gal-16',
      category: 'education',
      badge: 'EDUCATION',
      title: 'Digital Literacy Hub',
      description: 'Foundational computer and digital learning tools for children.',
      image:
        'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
      fallbackImage:
        'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80',
    },
  ];

  const [galleryItems, setGalleryItems] = useState(defaultGalleryItems);

  useEffect(() => {
    api.get('/api/gallery')
      .then((res) => {
        if (res && res.items && res.items.length > 0) {
          const mapped = res.items.map((item) => {
            const rawCat = (item.category || '').toLowerCase();
            let cat = 'education';
            if (rawCat.includes('elder')) cat = 'elderly';
            else if (rawCat.includes('clean') || rawCat.includes('green') || rawCat.includes('ecolog')) cat = 'cleanliness';
            else if (rawCat.includes('inclus') || rawCat.includes('visual') || rawCat.includes('braille')) cat = 'inclusive';
            else if (rawCat.includes('volunt') || rawCat.includes('communit')) cat = 'volunteers';
            return {
              id: item._id,
              category: cat,
              badge: (item.category || 'COMMUNITY').toUpperCase(),
              title: item.title,
              description: item.description || 'Verified on-ground grassroots moment.',
              image: item.imageUrl,
              fallbackImage: item.imageUrl,
            };
          });
          setGalleryItems([...mapped, ...defaultGalleryItems]);
        }
      })
      .catch(() => null);
  }, []);

  // Snapshots From the Field (3 Highlight Cards)
  const fieldSnapshots = [
    {
      id: 'snap-1',
      badge: 'EDUCATION INITIATIVE',
      locationTag: 'NEW DELHI HUB',
      locationPin: 'East Delhi Outreach Center',
      title: 'Learning & Book Distribution',
      description:
        'Equipped over 800 rural primary students with curriculum books, stationery, and learning materials.',
      image:
        'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
      fallbackImage:
        'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'snap-2',
      badge: 'ELDERLY WELFARE',
      locationTag: 'VARANASI CLUSTER',
      locationPin: 'Assi Ghat Senior Circle',
      title: 'Care & Companionship Drives',
      description:
        'Weekly companionship routines, medical screenings, and home-delivered nutrition for vulnerable elders.',
      image:
        'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=800&q=80',
      fallbackImage:
        'https://images.unsplash.com/photo-1516307365426-bea591f05011?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'snap-3',
      badge: 'CLEAN DRIVES',
      locationTag: 'YAMUNA RIVERFRONT',
      locationPin: 'Central Riverbank Outpost',
      title: 'Green & Clean Community Action',
      description:
        'Revitalizing public parks and riverbanks across neighborhood outposts through weekly clean-ups.',
      image:
        'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
      fallbackImage:
        'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80',
    },
  ];

  // Filter items based on activeFilter
  const filteredItems =
    activeFilter === 'all'
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeFilter);

  const displayedItems = filteredItems.slice(0, visibleCount);

  return (
    <div className="min-h-screen bg-[#FFFFFF] flex flex-col font-['Inter',_sans-serif] text-[#242424] antialiased overflow-x-hidden w-full">
      {/* 1. Global Navigation */}
      <Navbar />

      <main className="flex-grow overflow-x-hidden w-full">
        {/* =========================================================================
            SECTION 1: Full-Width Vibrant Hero Banner (Clear, Taller & No Heavy Blur)
            ========================================================================= */}
        <section className="relative overflow-hidden bg-[#1E1E1E]">
          {/* Background Photograph - Clear, Vibrant, and Prominently Visible */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1920&q=80"
              alt="Stories of change"
              className="w-full h-full object-cover object-center brightness-95 saturate-105"
              onError={(e) => {
                e.currentTarget.src =
                  'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1920&q=80';
              }}
            />
            {/* Subtle clear gradient scrim - dark on left for text legibility, transparent/light on right to show photo clearly */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/30" />
          </div>

          {/* Banner Content (Taller, Larger Hero with no pill circle) */}
          <div className="relative z-10 py-16 sm:py-20 lg:py-24 min-h-[340px] sm:min-h-[400px] md:min-h-[440px] flex flex-col justify-center text-left text-white px-4 sm:px-6">
            <Container size="default">
              <div className="max-w-3xl">
                {/* Bold Arial H1 */}
                <h1 className="font-['Arial',_Helvetica,_sans-serif] text-white font-bold text-3xl sm:text-5xl lg:text-[50px] leading-[1.2] tracking-tight mb-3 drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
                  Stories &amp; Moments of Change.
                </h1>

                {/* Concise Inter Subtitle */}
                <p className="font-['Inter',_sans-serif] text-white/95 text-base sm:text-lg lg:text-xl leading-relaxed mb-5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] font-medium max-w-2xl">
                  Glimpses of our community engagement across free education, inclusive learning, elderly care, and environmental cleanliness.
                </p>
              </div>
            </Container>
          </div>
        </section>

        {/* =========================================================================
            SECTION 2: Category Filter Pills & 4-Column Photo Grid (#FFFFFF)
            ========================================================================= */}
        <section className="pt-4 sm:pt-5 pb-3 sm:pb-4 bg-[#FFFFFF] border-b border-[#EEEEEE]/70">
          <Container size="default">
            {/* Centered Row of Filter Pills (Single-Line Horizontal Swipe on Mobile, Centered on Desktop) */}
            <div className="w-full overflow-x-auto no-scrollbar pb-1 mb-5 sm:mb-6">
              <div className="flex items-center gap-2 sm:gap-3 min-w-max mx-auto sm:justify-center px-1">
                {filterPills.map((pill) => {
                  const isActive = activeFilter === pill.id;
                  return (
                    <button
                      key={pill.id}
                      type="button"
                      onClick={(e) => {
                        setActiveFilter(pill.id);
                        setVisibleCount(12);
                        e.currentTarget.scrollIntoView({
                          behavior: 'smooth',
                          block: 'nearest',
                          inline: 'center',
                        });
                      }}
                      className={`rounded-xl px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-bold whitespace-nowrap flex-shrink-0 transition-all duration-300 cursor-pointer select-none ${isActive
                          ? 'bg-gradient-to-r from-[#FB7336] to-[#FCC241] text-[#242424] shadow-[0_4px_14px_0_rgba(251,115,54,0.25)] scale-[1.02]'
                          : 'bg-[#FFFFFF] text-[#666666] border border-[#EEEEEE] hover:border-[#FB7336]/30 hover:text-[#242424] hover:bg-[#FFF0E8]/40 shadow-sm'
                        }`}
                    >
                      {pill.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4 Cards per Line (4 Across Lines 1, 2, and 3) */}
            <MobileCardCarousel
              items={displayedItems}
              resetKey={activeFilter}
              desktopGridClassName="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 w-full max-w-[1760px] mx-auto mb-4 sm:mb-5"
              renderItem={(item) => (
                <div
                  key={item.id}
                  onClick={() => setActiveModalItem(item)}
                  className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-lg border border-[#EEEEEE] bg-gray-900 cursor-pointer h-64 sm:h-72 lg:h-[280px] transition-all duration-300 hover:-translate-y-1 w-full"
                >
                  {/* Photo */}
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = item.fallbackImage;
                    }}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Dark Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent transition-opacity duration-300" />

                  {/* Content Overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 flex items-end justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      {/* Category Badge */}
                      <span className="inline-block px-2.5 py-0.5 rounded-md bg-gradient-to-r from-[#FB7336] to-[#FCC241] text-[#242424] text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-1.5 select-none shadow-sm">
                        {item.badge}
                      </span>

                      {/* Card Title */}
                      <h3 className="font-['Arial',_Helvetica,_sans-serif] text-white font-bold text-base sm:text-lg leading-snug truncate mb-1">
                        {item.title}
                      </h3>

                      {/* Concise Description */}
                      <p className="font-['Inter',_sans-serif] text-white/80 text-xs sm:text-sm line-clamp-1">
                        {item.description}
                      </p>
                    </div>

                    {/* Subtle Lightbox Expand Button */}
                    <button
                      type="button"
                      aria-label="Expand image"
                      className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white hover:bg-white/40 transition-colors flex-shrink-0"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            />

            {/* Expandable "Load More Moments" Button */}
            {visibleCount < filteredItems.length && (
              <div className="flex justify-center pt-0 pb-1">
                <Button
                  variant="secondary"
                  size="md"
                  onClick={() => setVisibleCount((prev) => prev + 4)}
                  className="rounded-xl border border-[#EEEEEE] px-7 py-2 shadow-sm hover:border-[#FB7336]/40 text-sm font-bold"
                >
                  Load More Moments
                </Button>
              </div>
            )}
          </Container>
        </section>

        {/* =========================================================================
            SECTION 3: Snapshots From the Field (3 Highlight Cards) (#FFF9F5)
            ========================================================================= */}
        <section className="pt-3 sm:pt-4 pb-8 sm:pb-10 bg-[#FFF9F5] border-b border-[#EEEEEE]/70">
          <Container size="default">
            {/* Section Header */}
            <SectionHeader
              tag="COMMUNITY HIGHLIGHTS"
              title="Snapshots From the Field"
              subtitle="Key ground-level milestones and heartfelt engagements captured across our active hubs."
              align="center"
              className="mb-5 sm:mb-6"
            />

            {/* 3-Column Highlight Cards Grid */}
            <MobileCardCarousel
              items={fieldSnapshots}
              desktopGridClassName="hidden md:grid md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto w-full"
              renderItem={(card) => (
                <div
                  key={card.id}
                  className="relative rounded-2xl overflow-hidden shadow-md group h-[360px] sm:h-[400px] border border-[#EEEEEE] bg-gray-900 transition-all duration-300 hover:-translate-y-1 w-full"
                >
                  {/* Full-bleed Photo */}
                  <img
                    src={card.image}
                    alt={card.title}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = card.fallbackImage;
                    }}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Dark Bottom Gradient Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/20" />

                  {/* Top-Right Location Tag Pill */}
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-white text-[11px] font-bold tracking-wider uppercase select-none">
                    {card.locationTag}
                  </div>

                  {/* Bottom Content */}
                  <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col items-start text-left">
                    {/* Category Tag */}
                    <span className="inline-block px-2.5 py-0.5 rounded-md bg-[#FFF0E8] border border-[#FB7336]/30 text-[#FB7336] text-[10px] font-bold uppercase tracking-wider mb-2 select-none">
                      {card.badge}
                    </span>

                    {/* Bold Arial Title */}
                    <h3 className="font-['Arial',_Helvetica,_sans-serif] text-white font-bold text-xl leading-snug mb-2">
                      {card.title}
                    </h3>

                    {/* 2-Line Description */}
                    <p className="font-['Inter',_sans-serif] text-white/85 text-xs sm:text-sm leading-relaxed line-clamp-2 mb-3">
                      {card.description}
                    </p>

                    {/* Bottom Location Pin Caption */}
                    <div className="flex items-center gap-1.5 text-xs text-[#FCC241] font-medium pt-2 border-t border-white/15 w-full">
                      <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>{card.locationPin}</span>
                    </div>
                  </div>
                </div>
              )}
            />
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

      {/* Lightbox Modal Preview */}
      {activeModalItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={() => setActiveModalItem(null)}
        >
          <div
            className="relative bg-[#FFFFFF] rounded-2xl overflow-hidden max-w-2xl w-full shadow-2xl border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Image */}
            <div className="relative w-full h-[280px] sm:h-[380px] bg-black">
              <img
                src={activeModalItem.image}
                alt={activeModalItem.title}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => setActiveModalItem(null)}
                aria-label="Close modal"
                className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-black/60 text-white hover:bg-black/80 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Details */}
            <div className="p-5 sm:p-6 text-left">
              <span className="inline-block px-2.5 py-0.5 rounded-md bg-gradient-to-r from-[#FB7336] to-[#FCC241] text-[#242424] text-xs font-bold uppercase tracking-wider mb-2">
                {activeModalItem.badge}
              </span>
              <h3 className="font-['Arial',_Helvetica,_sans-serif] text-[#242424] font-bold text-xl sm:text-2xl leading-snug mb-2">
                {activeModalItem.title}
              </h3>
              <p className="font-['Inter',_sans-serif] text-[#666666] text-sm sm:text-base leading-relaxed">
                {activeModalItem.description}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 5. Global Footer */}
      <Footer />
    </div>
  );
}

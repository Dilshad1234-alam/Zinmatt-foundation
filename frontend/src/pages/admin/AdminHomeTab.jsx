import React, { useState } from 'react';
import {
  ChevronRight,
  Clock,
  History,
  Layout,
  RotateCcw,
  Heart,
  Navigation,
  Image as ImageIcon,
  Users,
  ArrowRight,
  Check,
  Sparkles,
  SlidersHorizontal,
  GripVertical,
  Info,
  RefreshCw,
  CheckCircle2,
  TrendingUp,
  BookOpen,
  Eye,
  HeartHandshake,
  ShieldCheck,
  Award,
  Share2,
  Layers,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import GradientIconBox from '../../components/ui/GradientIconBox';

export default function AdminHomeTab({
  setActiveNav,
  autoSavedTime,
  showToast,
  homeData = {},
  setHomeData,
  sectionVisibility = [],
  toggleSection,
  resetSectionsDefault,
  lastPublishedTime,
  discardUnsavedChanges,
  handleSaveAndPublishHome,
}) {
  // Quick navigation pill filter
  const [activeSectionFilter, setActiveSectionFilter] = useState('all');

  // Safe fallback getters
  const hero = homeData.hero || {};
  const about = homeData.aboutPreview || {};
  const initiatives = homeData.initiativesShowcase || {};
  const initCards = initiatives.cards || [];
  const coreValues = homeData.coreValues || {};
  const valueCards = coreValues.cards || [];
  const getInvolved = homeData.getInvolvedSection || {};
  const helpCards = getInvolved.cards || [];
  const trustStrip = homeData.trustStrip || {};
  const stories = homeData.storiesSection || {};
  const storyCards = stories.cards || [];

  // Updaters
  const updateHero = (field, val) => {
    setHomeData((prev) => ({
      ...prev,
      hero: { ...(prev.hero || {}), [field]: val },
    }));
  };

  const updateHeroBadge = (index, val) => {
    setHomeData((prev) => {
      const badges = [...(prev.hero?.trustBadges || ['80G Compliant', 'Transparent Reporting', 'Community-First'])];
      badges[index] = val;
      return {
        ...prev,
        hero: { ...(prev.hero || {}), trustBadges: badges },
      };
    });
  };

  const updateAbout = (field, val) => {
    setHomeData((prev) => ({
      ...prev,
      aboutPreview: { ...(prev.aboutPreview || {}), [field]: val },
    }));
  };

  const updateAboutArchImage = (index, val) => {
    setHomeData((prev) => {
      const archImages = [...(prev.aboutPreview?.archImages || [])];
      archImages[index] = val;
      return {
        ...prev,
        aboutPreview: { ...(prev.aboutPreview || {}), archImages },
      };
    });
  };

  const updateInitiatives = (field, val) => {
    setHomeData((prev) => ({
      ...prev,
      initiativesShowcase: { ...(prev.initiativesShowcase || {}), [field]: val },
    }));
  };

  const updateInitiativeCard = (index, field, val) => {
    setHomeData((prev) => {
      const cards = [...(prev.initiativesShowcase?.cards || [])];
      if (cards[index]) {
        cards[index] = { ...cards[index], [field]: val };
      }
      return {
        ...prev,
        initiativesShowcase: { ...(prev.initiativesShowcase || {}), cards },
      };
    });
  };

  const updateInitiativeCardBullet = (cardIndex, bulletIndex, val) => {
    setHomeData((prev) => {
      const cards = [...(prev.initiativesShowcase?.cards || [])];
      if (cards[cardIndex]) {
        const bullets = [...(cards[cardIndex].bullets || [])];
        bullets[bulletIndex] = val;
        cards[cardIndex] = { ...cards[cardIndex], bullets };
      }
      return {
        ...prev,
        initiativesShowcase: { ...(prev.initiativesShowcase || {}), cards },
      };
    });
  };

  const updateCoreValues = (field, val) => {
    setHomeData((prev) => ({
      ...prev,
      coreValues: { ...(prev.coreValues || {}), [field]: val },
    }));
  };

  const updateCoreValueCard = (index, field, val) => {
    setHomeData((prev) => {
      const cards = [...(prev.coreValues?.cards || [])];
      if (cards[index]) {
        cards[index] = { ...cards[index], [field]: val };
      }
      return {
        ...prev,
        coreValues: { ...(prev.coreValues || {}), cards },
      };
    });
  };

  const updateGetInvolved = (field, val) => {
    setHomeData((prev) => ({
      ...prev,
      getInvolvedSection: { ...(prev.getInvolvedSection || {}), [field]: val },
    }));
  };

  const updateGetInvolvedCard = (index, field, val) => {
    setHomeData((prev) => {
      const cards = [...(prev.getInvolvedSection?.cards || [])];
      if (cards[index]) {
        cards[index] = { ...cards[index], [field]: val };
      }
      return {
        ...prev,
        getInvolvedSection: { ...(prev.getInvolvedSection || {}), cards },
      };
    });
  };

  const updateTrustStrip = (field, val) => {
    setHomeData((prev) => ({
      ...prev,
      trustStrip: { ...(prev.trustStrip || {}), [field]: val },
      ...(field === 'headline' ? { ctaHeadline: val } : {}),
      ...(field === 'buttonText' ? { ctaButtonText: val } : {}),
    }));
  };

  const updateTrustStripHighlight = (index, val) => {
    setHomeData((prev) => {
      const highlights = [
        ...(prev.trustStrip?.trustStripHighlights || [
          '80G Tax Exemption Available',
          '100% Direct Grassroots Impact',
          'Transparent Audited Reporting',
        ]),
      ];
      highlights[index] = val;
      return {
        ...prev,
        trustStrip: { ...(prev.trustStrip || {}), trustStripHighlights: highlights },
      };
    });
  };

  const updateStories = (field, val) => {
    setHomeData((prev) => ({
      ...prev,
      storiesSection: { ...(prev.storiesSection || {}), [field]: val },
    }));
  };

  const updateStoryCard = (index, field, val) => {
    setHomeData((prev) => {
      const cards = [...(prev.storiesSection?.cards || [])];
      if (cards[index]) {
        cards[index] = { ...cards[index], [field]: val };
      }
      return {
        ...prev,
        storiesSection: { ...(prev.storiesSection || {}), cards },
      };
    });
  };

  const filterTabs = [
    { id: 'all', label: 'All 7 Sections' },
    { id: 'hero', label: '1. Hero' },
    { id: 'about', label: '2. About' },
    { id: 'initiatives', label: '3. Initiatives' },
    { id: 'pillars', label: '4. Core Values' },
    { id: 'get_involved', label: '5. Get Involved' },
    { id: 'trust_strip', label: '6. Trust Strip' },
    { id: 'stories', label: '7. Stories' },
  ];

  return (
    <div className="space-y-6 animate-fade-in w-full">
      {/* Top Sub-bar: Breadcrumb & Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#EEEEEE]">
        <div className="flex items-center gap-2 text-xs text-[#666666] flex-wrap font-medium">
          <span
            className="hover:text-[#242424] cursor-pointer"
            onClick={() => setActiveNav('dashboard')}
          >
            Site Management
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-[#242424]">Home Page</span>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="font-semibold text-[#FB7336]">
            All 7 Home Sections CMS & Builder
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs text-[#666666]">
          <div className="flex items-center gap-1.5 text-gray-500">
            <Clock className="w-3.5 h-3.5 text-emerald-600" />
            <span>{autoSavedTime}</span>
          </div>
          <span className="text-gray-300">•</span>
          <button
            type="button"
            onClick={() => showToast('Revision Log: v2.5 (Saved in MongoDB) by Lead Admin')}
            className="font-medium text-[#242424] hover:text-[#FB7336] flex items-center gap-1 transition-colors"
          >
            <History className="w-3.5 h-3.5 text-[#666666]" />
            View Revision Log
          </button>
        </div>
      </div>

      {/* Section Quick Jump Filter Strip */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {filterTabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveSectionFilter(tab.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeSectionFilter === tab.id
                ? 'bg-[#242424] text-white shadow-sm'
                : 'bg-white text-[#666666] border border-[#EEEEEE] hover:bg-[#FFF9F5] hover:text-[#FB7336]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 2-Column Content Builder */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
        {/* ===================================================================
            LEFT COLUMN (lg:col-span-8 stacked cards)
        =================================================================== */}
        <div className="lg:col-span-8 space-y-6">
          {/* ===============================================================
              SECTION 1: HERO BANNER (image_f26e06.jpg)
          =============================================================== */}
          {(activeSectionFilter === 'all' || activeSectionFilter === 'hero') && (
            <div className="bg-white rounded-2xl border border-[#EEEEEE] p-6 sm:p-7 shadow-sm space-y-5">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-3">
                  <GradientIconBox icon={Layout} size="sm" />
                  <div>
                    <h2 className="font-['Arial',_Helvetica,_sans-serif] font-bold text-lg text-[#242424]">
                      Section 1: Hero Banner
                    </h2>
                    <p className="text-xs text-[#666666]">
                      Primary above-the-fold engagement unit on root URL (image_f26e06.jpg)
                    </p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-semibold border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live on Production
                </span>
              </div>

              {/* Accent Tag */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#666666]">Small Accent Tag</label>
                <input
                  type="text"
                  value={hero.accentTag || ''}
                  onChange={(e) => updateHero('accentTag', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#EEEEEE] bg-[#FFFDFB] text-xs font-semibold tracking-wider text-[#242424] uppercase focus:outline-none focus:border-[#FB7336] focus:ring-1 focus:ring-[#FB7336]/20 transition-all"
                />
              </div>

              {/* Headline & Highlight text */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#666666]">Main Headline</label>
                  <input
                    type="text"
                    value={hero.headline || ''}
                    onChange={(e) => updateHero('headline', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#EEEEEE] bg-[#FFFDFB] text-xs font-bold text-[#242424] focus:outline-none focus:border-[#FB7336] focus:ring-1 focus:ring-[#FB7336]/20 transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#666666]">
                    Highlight Text (Gradient Accent)
                  </label>
                  <input
                    type="text"
                    value={hero.highlightText || ''}
                    onChange={(e) => updateHero('highlightText', e.target.value)}
                    placeholder="e.g. One Life at a Time."
                    className="w-full px-4 py-2.5 rounded-xl border border-[#EEEEEE] bg-[#FFFDFB] text-xs font-bold text-[#FB7336] focus:outline-none focus:border-[#FB7336] focus:ring-1 focus:ring-[#FB7336]/20 transition-all"
                  />
                </div>
              </div>

              {/* Hero Description */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#666666]">Hero Description</label>
                <textarea
                  rows={3}
                  value={hero.description || ''}
                  onChange={(e) => updateHero('description', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#EEEEEE] bg-[#FFFDFB] text-xs text-[#444444] focus:outline-none focus:border-[#FB7336] focus:ring-1 focus:ring-[#FB7336]/20 resize-none leading-relaxed transition-all"
                />
              </div>

              {/* Button Labels */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#666666]">Primary Button Label</label>
                  <input
                    type="text"
                    value={hero.primaryBtnLabel || ''}
                    onChange={(e) => updateHero('primaryBtnLabel', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#EEEEEE] bg-[#FFFDFB] text-xs font-semibold text-[#242424] focus:outline-none focus:border-[#FB7336] focus:ring-1 focus:ring-[#FB7336]/20 transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#666666]">
                    Secondary Button Label
                  </label>
                  <input
                    type="text"
                    value={hero.secondaryBtnLabel || ''}
                    onChange={(e) => updateHero('secondaryBtnLabel', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#EEEEEE] bg-[#FFFDFB] text-xs font-semibold text-[#242424] focus:outline-none focus:border-[#FB7336] focus:ring-1 focus:ring-[#FB7336]/20 transition-all"
                  />
                </div>
              </div>

              {/* Hero Image */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#666666]">Hero Background Image URL</label>
                <div className="flex items-center gap-3">
                  <img
                    src={hero.heroImage || hero.imageUrl || '/hero-banner.jpg'}
                    alt="Hero Thumbnail"
                    className="w-14 h-11 rounded-lg object-cover border border-[#EEEEEE] shadow-xs shrink-0"
                    onError={(e) => {
                      e.target.src =
                        'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=160&q=80';
                    }}
                  />
                  <input
                    type="text"
                    value={hero.heroImage || hero.imageUrl || ''}
                    onChange={(e) => {
                      updateHero('heroImage', e.target.value);
                      updateHero('imageUrl', e.target.value);
                    }}
                    placeholder="https://..."
                    className="w-full px-4 py-2.5 rounded-xl border border-[#EEEEEE] bg-[#FFFDFB] text-xs font-mono text-[#242424] focus:outline-none focus:border-[#FB7336] focus:ring-1 focus:ring-[#FB7336]/20 transition-all"
                  />
                </div>
              </div>

              {/* Supporters Cluster */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#EEEEEE]">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#666666]">Supporters Cluster Title</label>
                  <input
                    type="text"
                    value={hero.supportersTitle || ''}
                    onChange={(e) => updateHero('supportersTitle', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#EEEEEE] bg-[#FFFDFB] text-xs font-semibold text-[#242424] focus:outline-none focus:border-[#FB7336] transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#666666]">
                    Supporters Cluster Subtitle
                  </label>
                  <input
                    type="text"
                    value={hero.supportersSubtitle || ''}
                    onChange={(e) => updateHero('supportersSubtitle', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#EEEEEE] bg-[#FFFDFB] text-xs text-[#242424] focus:outline-none focus:border-[#FB7336] transition-all"
                  />
                </div>
              </div>

              {/* Trust Badges */}
              <div className="space-y-2 pt-2 border-t border-[#EEEEEE]">
                <label className="text-xs font-semibold text-[#666666]">3 Trust Badges</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {(hero.trustBadges || ['80G Compliant', 'Transparent Reporting', 'Community-First']).map(
                    (b, idx) => (
                      <input
                        key={idx}
                        type="text"
                        value={b}
                        onChange={(e) => updateHeroBadge(idx, e.target.value)}
                        className="px-3 py-2 rounded-xl border border-[#EEEEEE] bg-[#FFFDFB] text-xs font-medium text-[#242424] focus:outline-none focus:border-[#FB7336] transition-all"
                      />
                    )
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ===============================================================
              SECTION 2: ABOUT ZINMATT PREVIEW (image_f26e21.jpg)
          =============================================================== */}
          {(activeSectionFilter === 'all' || activeSectionFilter === 'about') && (
            <div className="bg-white rounded-2xl border border-[#EEEEEE] p-6 sm:p-7 shadow-sm space-y-5">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-3">
                  <GradientIconBox icon={Users} size="sm" />
                  <div>
                    <h2 className="font-['Arial',_Helvetica,_sans-serif] font-bold text-lg text-[#242424]">
                      Section 2: About ZINMATT Preview
                    </h2>
                    <p className="text-xs text-[#666666]">
                      Story capsule, 3 arch photos, and grassroots credentials (image_f26e21.jpg)
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveNav('about')}
                  className="text-xs font-bold text-[#FB7336] hover:underline flex items-center gap-1 cursor-pointer transition-colors"
                >
                  Edit About Page <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#666666]">Accent Tag</label>
                  <input
                    type="text"
                    value={about.accentTag || ''}
                    onChange={(e) => updateAbout('accentTag', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#EEEEEE] bg-[#FFFDFB] text-xs font-semibold uppercase text-[#FB7336] focus:outline-none focus:border-[#FB7336] transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#666666]">Section Heading</label>
                  <input
                    type="text"
                    value={about.heading || ''}
                    onChange={(e) => updateAbout('heading', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#EEEEEE] bg-[#FFFDFB] text-xs font-bold text-[#242424] focus:outline-none focus:border-[#FB7336] transition-all"
                  />
                </div>
              </div>

              {/* Paragraphs */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#666666]">Paragraph 1 (Main Narrative)</label>
                <textarea
                  rows={3}
                  value={about.paragraph1 || about.descriptionParagraph1 || ''}
                  onChange={(e) => {
                    updateAbout('paragraph1', e.target.value);
                    updateAbout('descriptionParagraph1', e.target.value);
                  }}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#EEEEEE] bg-[#FFFDFB] text-xs text-[#444444] focus:outline-none focus:border-[#FB7336] resize-none leading-relaxed transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#666666]">
                  Paragraph 2 (Financial Transparency & Direct Impact)
                </label>
                <textarea
                  rows={2}
                  value={about.paragraph2 || about.descriptionParagraph2 || ''}
                  onChange={(e) => {
                    updateAbout('paragraph2', e.target.value);
                    updateAbout('descriptionParagraph2', e.target.value);
                  }}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#EEEEEE] bg-[#FFFDFB] text-xs text-[#444444] focus:outline-none focus:border-[#FB7336] resize-none leading-relaxed transition-all"
                />
              </div>

              {/* Action row fields */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#666666]">Button CTA Label</label>
                  <input
                    type="text"
                    value={about.ctaLabel || ''}
                    onChange={(e) => updateAbout('ctaLabel', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#EEEEEE] bg-[#FFFDFB] text-xs font-semibold text-[#242424] focus:outline-none focus:border-[#FB7336] transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#666666]">Phone Callout Label</label>
                  <input
                    type="text"
                    value={about.phoneLabel || 'Call Us:'}
                    onChange={(e) => updateAbout('phoneLabel', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#EEEEEE] bg-[#FFFDFB] text-xs font-semibold text-[#242424] focus:outline-none focus:border-[#FB7336] transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#666666]">Official Phone Number</label>
                  <input
                    type="text"
                    value={about.phoneNumber || ''}
                    onChange={(e) => updateAbout('phoneNumber', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#EEEEEE] bg-[#FFFDFB] text-xs font-bold text-[#FB7336] focus:outline-none focus:border-[#FB7336] transition-all"
                  />
                </div>
              </div>

              {/* Badge & Arch Images */}
              <div className="space-y-3 pt-2 border-t border-[#EEEEEE]">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#666666]">
                    Bottom Operations Badge Label
                  </label>
                  <input
                    type="text"
                    value={about.operationsBadge || ''}
                    onChange={(e) => updateAbout('operationsBadge', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#EEEEEE] bg-[#FFFDFB] text-xs font-medium text-[#242424] focus:outline-none focus:border-[#FB7336] transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-[#666666]">
                    3 Arch Capsule Photo URLs
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {(about.archImages || []).map((img, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex items-center gap-2">
                          <img
                            src={img}
                            alt={`Arch ${idx + 1}`}
                            className="w-9 h-9 rounded-full object-cover border border-[#EEEEEE] shrink-0"
                            onError={(e) => {
                              e.target.src =
                                'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=100&q=80';
                            }}
                          />
                          <input
                            type="text"
                            value={img}
                            onChange={(e) => updateAboutArchImage(idx, e.target.value)}
                            placeholder={`Arch Image ${idx + 1}`}
                            className="w-full px-3 py-1.5 rounded-xl border border-[#EEEEEE] bg-[#FFFDFB] text-[11px] font-mono text-[#242424] focus:outline-none focus:border-[#FB7336]"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ===============================================================
              SECTION 3: WHAT WE DO / INITIATIVES SHOWCASE (image_f26e25.jpg)
          =============================================================== */}
          {(activeSectionFilter === 'all' || activeSectionFilter === 'initiatives') && (
            <div className="bg-white rounded-2xl border border-[#EEEEEE] p-6 sm:p-7 shadow-sm space-y-5">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-3">
                  <GradientIconBox icon={BookOpen} size="sm" />
                  <div>
                    <h2 className="font-['Arial',_Helvetica,_sans-serif] font-bold text-lg text-[#242424]">
                      Section 3: What We Do (4 Core Initiatives)
                    </h2>
                    <p className="text-xs text-[#666666]">
                      Pill tag, header copy, 4 cards with bullets & 5-photo strip (image_f26e25.jpg)
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#FFF0E8] text-[#FB7336] text-[11px] font-bold">
                  {initCards.length} Cards Configured
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#666666]">Pill Tag</label>
                  <input
                    type="text"
                    value={initiatives.pillTag || ''}
                    onChange={(e) => updateInitiatives('pillTag', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#EEEEEE] bg-[#FFFDFB] text-xs font-semibold uppercase text-[#FB7336] focus:outline-none focus:border-[#FB7336] transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#666666]">Section Heading</label>
                  <input
                    type="text"
                    value={initiatives.heading || ''}
                    onChange={(e) => updateInitiatives('heading', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#EEEEEE] bg-[#FFFDFB] text-xs font-bold text-[#242424] focus:outline-none focus:border-[#FB7336] transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#666666]">Subheading</label>
                <input
                  type="text"
                  value={initiatives.subheading || ''}
                  onChange={(e) => updateInitiatives('subheading', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#EEEEEE] bg-[#FFFDFB] text-xs text-[#444444] focus:outline-none focus:border-[#FB7336] transition-all"
                />
              </div>

              {/* 4 Cards Editor */}
              <div className="space-y-4 pt-2 border-t border-[#EEEEEE]">
                <h3 className="text-xs font-bold text-[#242424] uppercase tracking-wider">
                  Initiative Cards & Bullet Points
                </h3>
                <div className="space-y-4">
                  {initCards.map((card, cIdx) => (
                    <div
                      key={card.id || cIdx}
                      className="p-4 rounded-xl border border-[#EEEEEE] bg-[#FFFDFB] space-y-3"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                        <div className="sm:col-span-3">
                          <label className="text-[11px] font-semibold text-[#666666]">Badge</label>
                          <input
                            type="text"
                            value={card.badge || ''}
                            onChange={(e) => updateInitiativeCard(cIdx, 'badge', e.target.value)}
                            className="w-full px-3 py-1.5 rounded-lg border border-[#EEEEEE] text-xs font-semibold"
                          />
                        </div>
                        <div className="sm:col-span-4">
                          <label className="text-[11px] font-semibold text-[#666666]">Title</label>
                          <input
                            type="text"
                            value={card.title || ''}
                            onChange={(e) => updateInitiativeCard(cIdx, 'title', e.target.value)}
                            className="w-full px-3 py-1.5 rounded-lg border border-[#EEEEEE] text-xs font-bold text-[#242424]"
                          />
                        </div>
                        <div className="sm:col-span-5">
                          <label className="text-[11px] font-semibold text-[#666666]">Image URL</label>
                          <div className="flex items-center gap-2">
                            <img
                              src={card.imageUrl || card.image}
                              alt={card.title}
                              className="w-7 h-7 rounded object-cover shrink-0 border border-[#EEEEEE]"
                              onError={(e) => {
                                e.target.src =
                                  'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=80&q=80';
                              }}
                            />
                            <input
                              type="text"
                              value={card.imageUrl || card.image || ''}
                              onChange={(e) => {
                                updateInitiativeCard(cIdx, 'imageUrl', e.target.value);
                                updateInitiativeCard(cIdx, 'image', e.target.value);
                              }}
                              className="w-full px-3 py-1.5 rounded-lg border border-[#EEEEEE] text-[11px] font-mono"
                            />
                          </div>
                        </div>
                      </div>

                      {/* 3 Bullets */}
                      <div className="space-y-1.5 pt-2 border-t border-[#F0F0F0]">
                        <label className="text-[11px] font-semibold text-[#666666]">
                          Bullet Points (3 items)
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          {(card.bullets || ['', '', '']).slice(0, 3).map((b, bIdx) => (
                            <input
                              key={bIdx}
                              type="text"
                              value={b}
                              onChange={(e) =>
                                updateInitiativeCardBullet(cIdx, bIdx, e.target.value)
                              }
                              placeholder={`Bullet ${bIdx + 1}`}
                              className="px-3 py-1.5 rounded-lg border border-[#EEEEEE] bg-white text-xs"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ===============================================================
              SECTION 4: 4 CORE VALUES GRID (image_f26e3f.jpg top)
          =============================================================== */}
          {(activeSectionFilter === 'all' || activeSectionFilter === 'pillars') && (
            <div className="bg-white rounded-2xl border border-[#EEEEEE] p-6 sm:p-7 shadow-sm space-y-5">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-3">
                  <GradientIconBox icon={Sparkles} size="sm" />
                  <div>
                    <h2 className="font-['Arial',_Helvetica,_sans-serif] font-bold text-lg text-[#242424]">
                      Section 4: 4 Core Values / Commitments Grid
                    </h2>
                    <p className="text-xs text-[#666666]">
                      Dynamic commitments grid with icons & descriptions (image_f26e3f.jpg)
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#FFF0E8] text-[#FB7336] text-[11px] font-bold">
                  {valueCards.length} Values
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#666666]">Section Tag</label>
                  <input
                    type="text"
                    value={coreValues.sectionTag || 'CORE COMMITMENTS'}
                    onChange={(e) => updateCoreValues('sectionTag', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#EEEEEE] bg-[#FFFDFB] text-xs font-semibold uppercase text-[#FB7336] focus:outline-none focus:border-[#FB7336] transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#666666]">Section Heading</label>
                  <input
                    type="text"
                    value={coreValues.heading || 'Our Core Values'}
                    onChange={(e) => updateCoreValues('heading', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#EEEEEE] bg-[#FFFDFB] text-xs font-bold text-[#242424] focus:outline-none focus:border-[#FB7336] transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#666666]">Subheading</label>
                <input
                  type="text"
                  value={coreValues.subheading || ''}
                  onChange={(e) => updateCoreValues('subheading', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#EEEEEE] bg-[#FFFDFB] text-xs text-[#444444] focus:outline-none focus:border-[#FB7336] transition-all"
                />
              </div>

              <div className="space-y-3 pt-2 border-t border-[#EEEEEE]">
                {valueCards.map((card, idx) => (
                  <div
                    key={card.id || idx}
                    className="p-4 rounded-xl border border-[#EEEEEE] bg-[#FFFDFB] space-y-2.5"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                      <div className="sm:col-span-5">
                        <label className="text-[11px] font-semibold text-[#666666]">Title</label>
                        <input
                          type="text"
                          value={card.title || ''}
                          onChange={(e) => updateCoreValueCard(idx, 'title', e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg border border-[#EEEEEE] text-xs font-bold text-[#242424]"
                        />
                      </div>
                      <div className="sm:col-span-4">
                        <label className="text-[11px] font-semibold text-[#666666]">
                          Link Label
                        </label>
                        <input
                          type="text"
                          value={card.linkLabel || 'Learn commitment'}
                          onChange={(e) => updateCoreValueCard(idx, 'linkLabel', e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg border border-[#EEEEEE] text-xs font-semibold text-[#FB7336]"
                        />
                      </div>
                      <div className="sm:col-span-3">
                        <label className="text-[11px] font-semibold text-[#666666]">Icon</label>
                        <input
                          type="text"
                          value={card.icon || ''}
                          onChange={(e) => updateCoreValueCard(idx, 'icon', e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg border border-[#EEEEEE] text-xs font-mono"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-[#666666]">Description</label>
                      <textarea
                        rows={2}
                        value={card.description || ''}
                        onChange={(e) => updateCoreValueCard(idx, 'description', e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg border border-[#EEEEEE] text-xs text-[#444444] resize-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ===============================================================
              SECTION 5: BE A PART OF THE CHANGE / GET INVOLVED (image_f26e3f.jpg bottom)
          =============================================================== */}
          {(activeSectionFilter === 'all' || activeSectionFilter === 'get_involved') && (
            <div className="bg-white rounded-2xl border border-[#EEEEEE] p-6 sm:p-7 shadow-sm space-y-5">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-3">
                  <GradientIconBox icon={HeartHandshake} size="sm" />
                  <div>
                    <h2 className="font-['Arial',_Helvetica,_sans-serif] font-bold text-lg text-[#242424]">
                      Section 5: Be a Part of the Change (5 Cards)
                    </h2>
                    <p className="text-xs text-[#666666]">
                      5 visual overlay pathway cards with icons & direct links (image_f26e3f.jpg)
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#FFF0E8] text-[#FB7336] text-[11px] font-bold">
                  {helpCards.length} Cards
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#666666]">Pill Tag</label>
                  <input
                    type="text"
                    value={getInvolved.pillTag || 'GET INVOLVED'}
                    onChange={(e) => updateGetInvolved('pillTag', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#EEEEEE] bg-[#FFFDFB] text-xs font-semibold uppercase text-[#FB7336] focus:outline-none focus:border-[#FB7336] transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#666666]">Section Heading</label>
                  <input
                    type="text"
                    value={getInvolved.heading || 'Be a Part of the Change.'}
                    onChange={(e) => updateGetInvolved('heading', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#EEEEEE] bg-[#FFFDFB] text-xs font-bold text-[#242424] focus:outline-none focus:border-[#FB7336] transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#666666]">Subheading</label>
                <input
                  type="text"
                  value={getInvolved.subheading || ''}
                  onChange={(e) => updateGetInvolved('subheading', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#EEEEEE] bg-[#FFFDFB] text-xs text-[#444444] focus:outline-none focus:border-[#FB7336] transition-all"
                />
              </div>

              <div className="space-y-3 pt-2 border-t border-[#EEEEEE]">
                {helpCards.map((card, idx) => (
                  <div
                    key={card.id || idx}
                    className="p-4 rounded-xl border border-[#EEEEEE] bg-[#FFFDFB] space-y-2.5"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                      <div className="sm:col-span-4">
                        <label className="text-[11px] font-semibold text-[#666666]">Title</label>
                        <input
                          type="text"
                          value={card.title || ''}
                          onChange={(e) => updateGetInvolvedCard(idx, 'title', e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg border border-[#EEEEEE] text-xs font-bold text-[#242424]"
                        />
                      </div>
                      <div className="sm:col-span-5">
                        <label className="text-[11px] font-semibold text-[#666666]">Image URL</label>
                        <div className="flex items-center gap-2">
                          <img
                            src={card.imageUrl || card.image}
                            alt={card.title}
                            className="w-7 h-7 rounded object-cover shrink-0 border border-[#EEEEEE]"
                            onError={(e) => {
                              e.target.src =
                                'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=80&q=80';
                            }}
                          />
                          <input
                            type="text"
                            value={card.imageUrl || card.image || ''}
                            onChange={(e) => {
                              updateGetInvolvedCard(idx, 'imageUrl', e.target.value);
                              updateGetInvolvedCard(idx, 'image', e.target.value);
                            }}
                            className="w-full px-3 py-1.5 rounded-lg border border-[#EEEEEE] text-[11px] font-mono"
                          />
                        </div>
                      </div>
                      <div className="sm:col-span-3">
                        <label className="text-[11px] font-semibold text-[#666666]">
                          Link Label
                        </label>
                        <input
                          type="text"
                          value={card.linkLabel || 'LEARN MORE'}
                          onChange={(e) => updateGetInvolvedCard(idx, 'linkLabel', e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg border border-[#EEEEEE] text-xs font-semibold text-[#FB7336]"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-[#666666]">Description</label>
                      <textarea
                        rows={2}
                        value={card.description || ''}
                        onChange={(e) => updateGetInvolvedCard(idx, 'description', e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg border border-[#EEEEEE] text-xs text-[#444444] resize-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ===============================================================
              SECTION 6: ORANGE GRADIENT TRUST STRIP (image_f26e5b.jpg top)
          =============================================================== */}
          {(activeSectionFilter === 'all' || activeSectionFilter === 'trust_strip') && (
            <div className="bg-white rounded-2xl border border-[#EEEEEE] p-6 sm:p-7 shadow-sm space-y-5">
              <div className="flex items-center gap-3">
                <GradientIconBox icon={Award} size="sm" />
                <div>
                  <h2 className="font-['Arial',_Helvetica,_sans-serif] font-bold text-lg text-[#242424]">
                    Section 6: Orange Gradient Trust Strip
                  </h2>
                  <p className="text-xs text-[#666666]">
                    Full-width gradient callout with 3 trust highlights (image_f26e5b.jpg)
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#666666]">CTA Headline</label>
                  <input
                    type="text"
                    value={trustStrip.headline || homeData.ctaHeadline || ''}
                    onChange={(e) => updateTrustStrip('headline', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#EEEEEE] bg-[#FFFDFB] text-xs font-semibold text-[#242424] focus:outline-none focus:border-[#FB7336] transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#666666]">Button Text</label>
                  <input
                    type="text"
                    value={trustStrip.buttonText || homeData.ctaButtonText || 'Start Donate'}
                    onChange={(e) => updateTrustStrip('buttonText', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#EEEEEE] bg-[#FFFDFB] text-xs font-semibold text-[#242424] focus:outline-none focus:border-[#FB7336] transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#666666]">Subheadline / Supporting Copy</label>
                <textarea
                  rows={2}
                  value={trustStrip.subheadline || ''}
                  onChange={(e) => updateTrustStrip('subheadline', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#EEEEEE] bg-[#FFFDFB] text-xs text-[#444444] resize-none leading-relaxed"
                />
              </div>

              {/* 3 Highlights */}
              <div className="space-y-2 pt-2 border-t border-[#EEEEEE]">
                <label className="text-xs font-semibold text-[#666666]">
                  3 Trust Highlights in Strip
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {(
                    trustStrip.trustStripHighlights || [
                      '80G Tax Exemption Available',
                      '100% Direct Grassroots Impact',
                      'Transparent Audited Reporting',
                    ]
                  ).map((h, hIdx) => (
                    <input
                      key={hIdx}
                      type="text"
                      value={h}
                      onChange={(e) => updateTrustStripHighlight(hIdx, e.target.value)}
                      className="px-3 py-2 rounded-xl border border-[#EEEEEE] bg-[#FFFDFB] text-xs font-medium text-[#242424]"
                    />
                  ))}
                </div>
              </div>

              {/* Real-time Component Preview */}
              <div className="pt-3 border-t border-[#EEEEEE] space-y-2.5">
                <span className="text-[11px] font-bold tracking-wider text-[#888888] uppercase block">
                  REAL-TIME STRIP PREVIEW
                </span>
                <div className="rounded-2xl p-6 sm:p-7 bg-gradient-to-r from-[#FB7336] via-[#FB8936] to-[#FCC241] shadow-md text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-5 relative overflow-hidden">
                  <div className="space-y-1.5 max-w-lg z-10">
                    <div className="flex items-center gap-2">
                      <Heart className="w-5 h-5 text-white/90 fill-white/20 shrink-0" />
                      <h3 className="font-['Arial',_Helvetica,_sans-serif] font-bold text-lg text-white">
                        {trustStrip.headline || 'Every Contribution Can Change a Life Today.'}
                      </h3>
                    </div>
                    <p className="text-xs text-white/90 font-medium">
                      {trustStrip.subheadline ||
                        'Your generous donation directly funds free schooling and elder care.'}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="px-5 py-2.5 rounded-xl bg-white text-[#242424] font-bold text-xs shadow-md hover:bg-[#FFF9F5] transition-all shrink-0 cursor-pointer"
                  >
                    {trustStrip.buttonText || 'Start Donate'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ===============================================================
              SECTION 7: MOMENTS OF IMPACT & COMMUNITY (image_f26e5b.jpg bottom)
          =============================================================== */}
          {(activeSectionFilter === 'all' || activeSectionFilter === 'stories') && (
            <div className="bg-white rounded-2xl border border-[#EEEEEE] p-6 sm:p-7 shadow-sm space-y-5">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-3">
                  <GradientIconBox icon={Eye} size="sm" />
                  <div>
                    <h2 className="font-['Arial',_Helvetica,_sans-serif] font-bold text-lg text-[#242424]">
                      Section 7: Moments of Impact & Community
                    </h2>
                    <p className="text-xs text-[#666666]">
                      Pill tag, header, category filters, and 5 story cards (image_f26e5b.jpg)
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#FFF0E8] text-[#FB7336] text-[11px] font-bold">
                  {storyCards.length} Story Cards
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#666666]">Pill Tag</label>
                  <input
                    type="text"
                    value={stories.pillTag || 'STORIES & COMMUNITY'}
                    onChange={(e) => updateStories('pillTag', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#EEEEEE] bg-[#FFFDFB] text-xs font-semibold uppercase text-[#FB7336] focus:outline-none focus:border-[#FB7336] transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#666666]">Section Heading</label>
                  <input
                    type="text"
                    value={stories.heading || 'Moments of Impact & Community'}
                    onChange={(e) => updateStories('heading', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#EEEEEE] bg-[#FFFDFB] text-xs font-bold text-[#242424] focus:outline-none focus:border-[#FB7336] transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#666666]">Subheading</label>
                <input
                  type="text"
                  value={stories.subheading || ''}
                  onChange={(e) => updateStories('subheading', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#EEEEEE] bg-[#FFFDFB] text-xs text-[#444444] focus:outline-none focus:border-[#FB7336] transition-all"
                />
              </div>

              <div className="space-y-3 pt-2 border-t border-[#EEEEEE]">
                {storyCards.map((card, idx) => (
                  <div
                    key={card.id || idx}
                    className="p-4 rounded-xl border border-[#EEEEEE] bg-[#FFFDFB] space-y-2.5"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                      <div className="sm:col-span-3">
                        <label className="text-[11px] font-semibold text-[#666666]">Tag</label>
                        <input
                          type="text"
                          value={card.tag || ''}
                          onChange={(e) => updateStoryCard(idx, 'tag', e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg border border-[#EEEEEE] text-xs font-semibold text-[#FB7336]"
                        />
                      </div>
                      <div className="sm:col-span-3">
                        <label className="text-[11px] font-semibold text-[#666666]">
                          Category
                        </label>
                        <input
                          type="text"
                          value={card.category || ''}
                          onChange={(e) => updateStoryCard(idx, 'category', e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg border border-[#EEEEEE] text-xs"
                        />
                      </div>
                      <div className="sm:col-span-6">
                        <label className="text-[11px] font-semibold text-[#666666]">Title</label>
                        <input
                          type="text"
                          value={card.title || ''}
                          onChange={(e) => updateStoryCard(idx, 'title', e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg border border-[#EEEEEE] text-xs font-bold text-[#242424]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                      <div className="sm:col-span-8">
                        <label className="text-[11px] font-semibold text-[#666666]">
                          Image URL
                        </label>
                        <div className="flex items-center gap-2">
                          <img
                            src={card.imageUrl || card.image}
                            alt={card.title}
                            className="w-7 h-7 rounded object-cover shrink-0 border border-[#EEEEEE]"
                            onError={(e) => {
                              e.target.src =
                                'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=80&q=80';
                            }}
                          />
                          <input
                            type="text"
                            value={card.imageUrl || card.image || ''}
                            onChange={(e) => {
                              updateStoryCard(idx, 'imageUrl', e.target.value);
                              updateStoryCard(idx, 'image', e.target.value);
                            }}
                            className="w-full px-3 py-1.5 rounded-lg border border-[#EEEEEE] text-[11px] font-mono"
                          />
                        </div>
                      </div>
                      <div className="sm:col-span-4">
                        <label className="text-[11px] font-semibold text-[#666666]">
                          Link Label
                        </label>
                        <input
                          type="text"
                          value={card.linkLabel || 'View Story'}
                          onChange={(e) => updateStoryCard(idx, 'linkLabel', e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg border border-[#EEEEEE] text-xs font-semibold text-[#FB7336]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-[#666666]">Description</label>
                      <textarea
                        rows={2}
                        value={card.description || ''}
                        onChange={(e) => updateStoryCard(idx, 'description', e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg border border-[#EEEEEE] text-xs text-[#444444] resize-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ===================================================================
            RIGHT COLUMN (lg:col-span-4 stacked cards)
        =================================================================== */}
        <div className="lg:col-span-4 space-y-6">
          {/* Card 1: Section Order & Visibility */}
          <div className="bg-white rounded-2xl border border-[#EEEEEE] p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-['Arial',_Helvetica,_sans-serif] font-bold text-base text-[#242424]">
                  Section Order & Visibility
                </h3>
                <p className="text-xs text-[#666666]">
                  Toggle any of the 7 sections on or off to update public layout
                </p>
              </div>
              <SlidersHorizontal className="w-4 h-4 text-[#888888] shrink-0" />
            </div>

            <div className="space-y-2">
              {sectionVisibility.map((sec) => (
                <div
                  key={sec.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-[#FFF9F5] border border-[#EEEEEE] hover:border-[#FB7336]/30 transition-all"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <GripVertical className="w-4 h-4 text-gray-400 cursor-grab shrink-0" />
                    <span className="text-xs font-semibold text-[#242424] truncate">
                      {sec.name || sec.label}
                    </span>
                  </div>

                  {/* Custom Toggle Switch */}
                  <button
                    type="button"
                    onClick={() => toggleSection(sec.id)}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      sec.enabled !== false && sec.visible !== false
                        ? 'bg-gradient-to-r from-[#FB7336] to-[#FCC241]'
                        : 'bg-gray-200'
                    }`}
                    role="switch"
                    aria-checked={sec.enabled !== false && sec.visible !== false}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        sec.enabled !== false && sec.visible !== false
                          ? 'translate-x-5'
                          : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-[#EEEEEE] flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-1.5 text-[#888888]">
                <Info className="w-3.5 h-3.5 shrink-0" />
                <span>Drag or toggle to customize homepage</span>
              </div>
              <button
                type="button"
                onClick={resetSectionsDefault}
                className="font-bold text-[#FB7336] hover:underline cursor-pointer"
              >
                Reset Default
              </button>
            </div>
          </div>

          {/* Card 2: Publishing & Sync */}
          <div className="bg-white rounded-2xl border border-[#EEEEEE] p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200 shrink-0">
                <RefreshCw className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-['Arial',_Helvetica,_sans-serif] font-bold text-base text-[#242424]">
                  Publishing & Sync
                </h3>
                <p className="text-xs text-[#666666]">Global MongoDB orchestrator</p>
              </div>
            </div>

            {/* Status banner */}
            <div className="p-3 rounded-xl bg-[#F0FDF4] border border-emerald-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-xs font-bold text-emerald-800">Synced & Live in MongoDB</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-mono font-bold">
                Public v2.5
              </span>
            </div>

            <div className="space-y-2 text-xs border-y border-[#EEEEEE] py-3 text-[#666666]">
              <div className="flex items-center justify-between">
                <span>Last published:</span>
                <span className="font-semibold text-[#242424]">{lastPublishedTime}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Published by:</span>
                <span className="font-semibold text-[#242424]">Lead Admin (ZINMATT)</span>
              </div>
              <div className="flex items-center justify-between">
                <span>CDN Edge status:</span>
                <span className="font-semibold text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> All 48 Nodes Warm
                </span>
              </div>
            </div>

            <div className="space-y-2">
              {handleSaveAndPublishHome && (
                <button
                  type="button"
                  onClick={handleSaveAndPublishHome}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#FB7336] to-[#FCC241] text-[#242424] font-bold text-xs shadow-sm hover:shadow-md hover:brightness-105 active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer transition-all"
                >
                  <Check className="w-4 h-4 stroke-[2.5]" />
                  Save & Publish Live
                </button>
              )}

              <button
                type="button"
                onClick={discardUnsavedChanges}
                className="w-full py-2.5 rounded-xl border border-[#FFDDD0] bg-[#FFF5F0] text-[#E04F16] font-semibold text-xs hover:bg-[#FFEAE0] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Discard Unsaved Changes
              </button>
            </div>

            <div className="p-3 rounded-xl bg-[#FFF9F5] border border-[#EEEEEE] text-[11px] text-[#666666] flex items-start gap-2 leading-relaxed">
              <Info className="w-4 h-4 text-[#FB7336] shrink-0 mt-0.5" />
              <span>
                Changes saved here propagate to global edge caches within 60 seconds across all regions.
              </span>
            </div>
          </div>

          {/* Card 3: Homepage Performance */}
          <div className="bg-white rounded-2xl border border-[#EEEEEE] p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-['Arial',_Helvetica,_sans-serif] font-bold text-base text-[#242424]">
                Homepage Performance
              </h3>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                <TrendingUp className="w-3 h-3" />
                +18.4%
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-[#FFF9F5] border border-[#EEEEEE] space-y-1">
                <span className="text-[11px] font-medium text-[#666666] block">Hero CTR</span>
                <span className="font-['Arial',_Helvetica,_sans-serif] font-black text-xl text-[#242424] block">
                  4.82%
                </span>
                <span className="text-[10px] text-emerald-600 font-medium block">Avg. 3.10%</span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FFF9F5] border border-[#EEEEEE] space-y-1">
                <span className="text-[11px] font-medium text-[#666666] block">Bounce Rate</span>
                <span className="font-['Arial',_Helvetica,_sans-serif] font-black text-xl text-[#242424] block">
                  28.4%
                </span>
                <span className="text-[10px] text-emerald-600 font-medium block">↓ 4.2% this wk</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

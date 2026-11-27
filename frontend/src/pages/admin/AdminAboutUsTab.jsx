import React from 'react';
import {
  ChevronRight,
  History,
  Layout,
  Image as ImageIcon,
  Target,
  Eye,
  Compass,
  MoreVertical,
  Layers,
  BookOpen,
  Heart,
  Sprout,
  Edit3,
  Camera,
  Users,
  Trash2,
  Plus,
  SlidersHorizontal,
  CheckCircle2,
  RotateCcw,
} from 'lucide-react';
import GradientIconBox from '../../components/ui/GradientIconBox';

export default function AdminAboutUsTab({
  setActiveNav,
  aboutAutoSavedTime,
  showToast,
  aboutData,
  handleAboutFieldChange,
  aboutPillars,
  setEditingPillar,
  teamMembers,
  setEditingTeamMember,
  handleDeleteTeamMember,
  setTeamForm,
  setIsAddTeamModalOpen,
  aboutSectionVisibility,
  toggleAboutSection,
  aboutLastPublishedTime,
  discardAboutUnsavedChanges,
}) {
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
          <span className="text-[#242424]">About Us</span>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="font-semibold text-[#FB7336]">
            Story, Vision & Team
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs text-[#666666]">
          <div className="flex items-center gap-1.5 text-gray-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>{aboutAutoSavedTime}</span>
          </div>
          <span className="text-gray-300">•</span>
          <button
            type="button"
            onClick={() => showToast('Revision Log: v2.4 (Today 11:45 AM) by Lead Admin')}
            className="font-medium text-[#242424] hover:text-[#FB7336] flex items-center gap-1 transition-colors"
          >
            <History className="w-3.5 h-3.5 text-[#666666]" />
            View Revision Log
          </button>
        </div>
      </div>

      {/* 2-Column Content Builder */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
        {/* ===================================================================
            LEFT COLUMN (lg:col-span-8 stacked cards)
        =================================================================== */}
        <div className="lg:col-span-8 space-y-6">
          {/* Card 1: Page Banner & Who We Are */}
          <div className="bg-white rounded-2xl border border-[#EEEEEE] p-6 sm:p-7 shadow-sm space-y-5">
            {/* Header */}
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-3">
                <GradientIconBox icon={Layout} size="sm" />
                <div>
                  <h2 className="font-['Arial',_Helvetica,_sans-serif] font-bold text-lg text-[#242424]">
                    Page Banner & Who We Are
                  </h2>
                  <p className="text-xs text-[#666666]">
                    Primary storytelling module at the top of the public About page
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-semibold border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live on Production
              </span>
            </div>

            {/* Small Accent Label */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold tracking-wider text-[#666666] uppercase">
                SMALL ACCENT LABEL
              </label>
              <input
                type="text"
                value={aboutData.smallAccentLabel}
                onChange={(e) => handleAboutFieldChange('smallAccentLabel', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#EEEEEE] bg-[#FFFDFB] text-xs font-semibold tracking-wider text-[#242424] uppercase focus:outline-none focus:border-[#FB7336] focus:ring-1 focus:ring-[#FB7336]/20 transition-all"
              />
            </div>

            {/* Page Headline */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold tracking-wider text-[#666666] uppercase">
                PAGE HEADLINE
              </label>
              <input
                type="text"
                value={aboutData.pageHeadline}
                onChange={(e) => handleAboutFieldChange('pageHeadline', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[#EEEEEE] bg-[#FFFDFB] text-base sm:text-lg font-['Arial',_Helvetica,_sans-serif] font-bold text-[#242424] focus:outline-none focus:border-[#FB7336] focus:ring-1 focus:ring-[#FB7336]/20 transition-all"
              />
            </div>

            {/* Foundation Story */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-bold tracking-wider text-[#666666] uppercase">
                  FOUNDATION STORY
                </label>
                <span className="text-[11px] text-[#888888] font-mono">
                  {aboutData.foundationStory.length} / 600 characters
                </span>
              </div>
              <textarea
                rows={4}
                maxLength={600}
                value={aboutData.foundationStory}
                onChange={(e) => handleAboutFieldChange('foundationStory', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[#EEEEEE] bg-[#FFFDFB] text-xs sm:text-sm text-[#444444] focus:outline-none focus:border-[#FB7336] focus:ring-1 focus:ring-[#FB7336]/20 resize-none leading-relaxed transition-all"
              />
            </div>

            {/* Banner Image Strip */}
            <div className="p-3.5 rounded-xl border border-[#EEEEEE] bg-[#FFF9F5] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0 w-full sm:w-auto">
                <img
                  src="/about-classroom.jpg"
                  alt="Banner thumbnail"
                  className="w-14 h-11 rounded-lg object-cover border border-[#EEEEEE] shadow-xs shrink-0"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=160&q=80';
                  }}
                />
                <div className="min-w-0">
                  <p className="font-semibold text-xs text-[#242424] truncate">
                    community_outreach_banner.webp
                  </p>
                  <p className="text-[11px] text-[#888888] font-mono">
                    1920 × 1080 • 960 KB • Asset Pipeline: Optimized WebP
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => showToast('Banner image selector opened (mock preview)')}
                className="px-3.5 py-2 rounded-xl bg-[#FFF0E8] text-[#FB7336] text-xs font-bold border border-[#FB7336]/20 hover:bg-[#FB7336] hover:text-white transition-colors flex items-center gap-1.5 shrink-0"
              >
                <ImageIcon className="w-3.5 h-3.5" />
                Change Banner Image
              </button>
            </div>
          </div>

          {/* Card 2: Vision & Mission Statements */}
          <div className="bg-white rounded-2xl border border-[#EEEEEE] p-6 sm:p-7 shadow-sm space-y-5">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FFF0E8] text-[#FB7336] flex items-center justify-center border border-[#FB7336]/20 shadow-xs">
                  <Target className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <h2 className="font-['Arial',_Helvetica,_sans-serif] font-bold text-lg text-[#242424]">
                    Vision & Mission Statements
                  </h2>
                  <p className="text-xs text-[#666666]">
                    Guiding ethos presented side-by-side on the public narrative
                  </p>
                </div>
              </div>
              <span className="text-xs font-semibold text-[#888888] bg-[#F5F5F5] px-2.5 py-1 rounded-lg border border-[#EEEEEE]">
                2 Cards Linked
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Our Vision */}
              <div className="p-5 rounded-2xl bg-[#FFF9F5] border border-[#EEEEEE] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#FB7336] to-[#FCC241] flex items-center justify-center text-[#242424] shadow-xs">
                      <Eye className="w-4 h-4 stroke-[2.5]" />
                    </div>
                    <h3 className="font-['Arial',_Helvetica,_sans-serif] font-bold text-base text-[#242424]">
                      Our Vision
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => showToast('Vision card settings')}
                    className="p-1 text-gray-400 hover:text-[#242424] rounded-lg"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-[11px] text-[#888888] font-medium">
                  Target horizon & human aspiration
                </p>
                <textarea
                  rows={4}
                  value={aboutData.visionText}
                  onChange={(e) => handleAboutFieldChange('visionText', e.target.value)}
                  className="w-full p-3 rounded-xl border border-[#EEEEEE] bg-white text-xs leading-relaxed text-[#444444] resize-none focus:outline-none focus:border-[#FB7336] focus:ring-1 focus:ring-[#FB7336]/20 transition-all"
                />
              </div>

              {/* Our Mission */}
              <div className="p-5 rounded-2xl bg-[#FFF9F5] border border-[#EEEEEE] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#FB7336] to-[#FCC241] flex items-center justify-center text-[#242424] shadow-xs">
                      <Compass className="w-4 h-4 stroke-[2.5]" />
                    </div>
                    <h3 className="font-['Arial',_Helvetica,_sans-serif] font-bold text-base text-[#242424]">
                      Our Mission
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => showToast('Mission card settings')}
                    className="p-1 text-gray-400 hover:text-[#242424] rounded-lg"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-[11px] text-[#888888] font-medium">
                  Operational action & resource delivery
                </p>
                <textarea
                  rows={4}
                  value={aboutData.missionText}
                  onChange={(e) => handleAboutFieldChange('missionText', e.target.value)}
                  className="w-full p-3 rounded-xl border border-[#EEEEEE] bg-white text-xs leading-relaxed text-[#444444] resize-none focus:outline-none focus:border-[#FB7336] focus:ring-1 focus:ring-[#FB7336]/20 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Card 3: Core Values Pillars */}
          <div className="bg-white rounded-2xl border border-[#EEEEEE] p-6 sm:p-7 shadow-sm space-y-5">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FFF0E8] text-[#FB7336] flex items-center justify-center border border-[#FB7336]/20 shadow-xs">
                  <Layers className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <h2 className="font-['Arial',_Helvetica,_sans-serif] font-bold text-lg text-[#242424]">
                    Core Values Pillars
                  </h2>
                  <p className="text-xs text-[#666666]">
                    Modular foundation catalysts displayed across the dynamic Bento grid
                  </p>
                </div>
              </div>
              <span className="rounded-full bg-[#FFF0E8] text-[#FB7336] text-xs font-semibold px-2.5 py-1 border border-[#FB7336]/20">
                {aboutPillars.length} of 4 Active
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {aboutPillars.map((pillar) => {
                const IconComponent =
                  pillar.icon === 'BookOpen'
                    ? BookOpen
                    : pillar.icon === 'Eye'
                    ? Eye
                    : pillar.icon === 'Heart'
                    ? Heart
                    : Sprout;

                return (
                  <div
                    key={pillar.id}
                    className="p-4 sm:p-5 rounded-2xl bg-[#FFF9F5] border border-[#EEEEEE] hover:border-[#FB7336]/40 transition-all space-y-3 relative group"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-[#FFF0E8] text-[#FB7336] flex items-center justify-center shrink-0 border border-[#FB7336]/20">
                          <IconComponent className="w-4 h-4 stroke-[2.2]" />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-[#242424]">
                            {pillar.title}
                          </h4>
                          <span className="text-[10px] text-[#888888] font-medium">
                            {pillar.tag}
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setEditingPillar({ ...pillar })}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-[#FB7336] hover:bg-white transition-colors cursor-pointer"
                        title="Edit Pillar"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-xs text-[#555555] leading-relaxed line-clamp-2">
                      {pillar.description}
                    </p>

                    <div className="pt-2 border-t border-[#EEEEEE] flex items-center justify-between text-xs">
                      <span className="font-semibold text-[#242424] flex items-center gap-1.5">
                        <span>🎯</span>
                        <span>{pillar.metric}</span>
                      </span>
                      <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                        {pillar.status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Card 4: Classroom & Field Storyboard */}
          <div className="bg-white rounded-2xl border border-[#EEEEEE] p-6 sm:p-7 shadow-sm space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FFF0E8] text-[#FB7336] flex items-center justify-center border border-[#FB7336]/20 shadow-xs">
                  <Camera className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <h2 className="font-['Arial',_Helvetica,_sans-serif] font-bold text-lg text-[#242424]">
                    Classroom & Field Storyboard
                  </h2>
                  <p className="text-xs text-[#666666]">
                    Select photo vantage displayed under the Foundation Story block
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveNav('gallery')}
                className="px-3.5 py-1.5 rounded-xl bg-[#FFF0E8] text-[#FB7336] text-xs font-bold border border-[#FB7336]/20 hover:bg-[#FB7336] hover:text-white transition-colors cursor-pointer"
              >
                Manage Gallery (32)
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Photo 1 */}
              <div className="relative h-44 rounded-2xl overflow-hidden group border border-[#EEEEEE]">
                <img
                  src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&q=80"
                  alt="Joyful Learning Center"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-4 text-white">
                  <h4 className="font-bold text-sm text-white">
                    Joyful Learning Center
                  </h4>
                  <p className="text-xs text-white/80">
                    Primary Education Hub • Karnataka
                  </p>
                </div>
              </div>

              {/* Photo 2 */}
              <div className="relative h-44 rounded-2xl overflow-hidden group border border-[#EEEEEE]">
                <img
                  src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=80"
                  alt="Community Support Camp"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-4 text-white">
                  <h4 className="font-bold text-sm text-white">
                    Community Support Camp
                  </h4>
                  <p className="text-xs text-white/80">
                    Elder Care & Nutrition • Weekly Drive
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================================
            RIGHT COLUMN (lg:col-span-4 stacked cards)
        =================================================================== */}
        <div className="lg:col-span-4 space-y-6">
          {/* Card 1: Team & Leadership */}
          <div className="bg-white rounded-2xl border border-[#EEEEEE] p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#FFF0E8] text-[#FB7336] flex items-center justify-center shrink-0">
                  <Users className="w-4 h-4 stroke-[2.2]" />
                </div>
                <h3 className="font-['Arial',_Helvetica,_sans-serif] font-bold text-base text-[#242424]">
                  Team & Leadership
                </h3>
              </div>
              <button
                type="button"
                onClick={() => showToast('Team roster management')}
                className="font-bold text-xs text-[#FB7336] hover:underline cursor-pointer"
              >
                Manage All
              </button>
            </div>

            <div className="space-y-2.5">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="p-3 rounded-xl bg-[#FFF9F5] border border-[#EEEEEE] flex items-center justify-between gap-3 hover:border-[#FB7336]/30 transition-all"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-r from-[#FB7336] to-[#FCC241] flex items-center justify-center text-[#242424] font-bold text-xs shrink-0 shadow-xs">
                      {member.initials}
                    </div>
                    <div className="min-w-0 truncate">
                      <p className="font-bold text-xs text-[#242424] truncate">
                        {member.name}
                      </p>
                      <p className="text-[11px] text-[#888888] truncate font-medium">
                        {member.role}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => setEditingTeamMember({ ...member })}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-[#FB7336] hover:bg-white transition-colors cursor-pointer"
                      title="Edit Member"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteTeamMember(member.id, member.name)}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-white transition-colors cursor-pointer"
                      title="Remove Member"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => {
                setTeamForm({ name: '', role: '', initials: '' });
                setIsAddTeamModalOpen(true);
              }}
              className="w-full py-2.5 rounded-xl bg-[#FFF0E8] text-[#FB7336] font-bold text-xs border border-[#FB7336]/20 hover:bg-[#FB7336] hover:text-white transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[2.2]" />
              Add Team Member
            </button>
          </div>

          {/* Card 2: Section Visibility */}
          <div className="bg-white rounded-2xl border border-[#EEEEEE] p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-['Arial',_Helvetica,_sans-serif] font-bold text-base text-[#242424]">
                  Section Visibility
                </h3>
                <p className="text-xs text-[#666666]">
                  Toggle public display of sections on /about-us
                </p>
              </div>
              <SlidersHorizontal className="w-4 h-4 text-[#888888] shrink-0" />
            </div>

            <div className="space-y-2">
              {aboutSectionVisibility.map((sec) => (
                <div
                  key={sec.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-[#FFF9F5] border border-[#EEEEEE] hover:border-[#FB7336]/30 transition-all"
                >
                  <div className="min-w-0 pr-2">
                    <p className="text-xs font-semibold text-[#242424] truncate">
                      {sec.name}
                    </p>
                    <p className="text-[10px] text-[#888888] truncate">
                      {sec.subtitle}
                    </p>
                  </div>

                  {/* Toggle Switch */}
                  <button
                    type="button"
                    onClick={() => toggleAboutSection(sec.id)}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      sec.enabled
                        ? 'bg-gradient-to-r from-[#FB7336] to-[#FCC241]'
                        : 'bg-gray-200'
                    }`}
                    role="switch"
                    aria-checked={sec.enabled}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        sec.enabled ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Card 3: Publishing & Sync */}
          <div className="bg-white rounded-2xl border border-[#EEEEEE] p-6 shadow-sm space-y-4">
            {/* Status banner */}
            <div className="p-3 rounded-xl bg-[#F0FDF4] border border-emerald-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-xs font-bold text-emerald-800">
                  Synced & Live on Public v2.4
                </span>
              </div>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>

            <div className="space-y-2 text-xs border-y border-[#EEEEEE] py-3 text-[#666666]">
              <div className="flex items-center justify-between">
                <span>Last published:</span>
                <span className="font-semibold text-[#242424]">{aboutLastPublishedTime}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Published by:</span>
                <span className="font-semibold text-[#242424]">Lead Admin (ZINMATT)</span>
              </div>
              <div className="flex items-center justify-between">
                <span>CDN Edge Status:</span>
                <span className="font-semibold text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 99.98% Cache Warm
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={discardAboutUnsavedChanges}
              className="w-full py-2.5 rounded-xl border border-[#FFDDD0] bg-[#FFF5F0] text-[#E04F16] font-semibold text-xs hover:bg-[#FFEAE0] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Discard Unsaved Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

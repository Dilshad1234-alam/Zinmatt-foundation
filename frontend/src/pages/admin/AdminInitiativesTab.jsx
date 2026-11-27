import React from 'react';
import {
  ChevronRight,
  GraduationCap,
  Eye,
  Heart,
  Sprout,
  Edit3,
  ArrowUpDown,
} from 'lucide-react';

export default function AdminInitiativesTab({
  setActiveNav,
  initiativeFilter,
  setInitiativeFilter,
  initiatives,
  toggleInitiativeVisibility,
  setEditingInitiative,
  handleReorderInitiatives,
  handleSaveInitiativeOrder,
}) {
  return (
    <div className="space-y-6 animate-fade-in w-full">
      {/* Top Sub-bar: Breadcrumb & Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#EEEEEE]">
        <div className="flex items-center gap-2 text-xs text-[#666666] flex-wrap font-medium">
          <span
            className="hover:text-[#242424] cursor-pointer"
            onClick={() => setActiveNav('dashboard')}
          >
            Site Management
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-[#242424]">Our Initiatives</span>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="font-semibold text-[#FB7336]">
            Core Causes
          </span>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 bg-white p-1 rounded-full border border-[#EEEEEE] shadow-xs">
          <button
            type="button"
            onClick={() => setInitiativeFilter('all')}
            className={`px-3.5 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              initiativeFilter === 'all'
                ? 'bg-[#242424] text-white shadow-xs'
                : 'text-gray-500 hover:text-[#242424]'
            }`}
          >
            All ({initiatives.length})
          </button>
          <button
            type="button"
            onClick={() => setInitiativeFilter('published')}
            className={`px-3.5 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              initiativeFilter === 'published'
                ? 'bg-[#242424] text-white shadow-xs'
                : 'text-gray-500 hover:text-[#242424]'
            }`}
          >
            Published ({initiatives.filter((i) => i.visible !== false).length})
          </button>
          <button
            type="button"
            onClick={() => setInitiativeFilter('drafts')}
            className={`px-3.5 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              initiativeFilter === 'drafts'
                ? 'bg-[#242424] text-white shadow-xs'
                : 'text-gray-500 hover:text-[#242424]'
            }`}
          >
            Drafts ({initiatives.filter((i) => i.visible === false).length})
          </button>
        </div>
      </div>

      {/* 2x2 Core Causes Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        {initiatives
          .filter((item) => {
            if (initiativeFilter === 'published') return item.visible !== false;
            if (initiativeFilter === 'drafts') return item.visible === false;
            return true;
          })
          .map((item) => {
            const isLive = item.visible !== false;
            const IconComponent =
              item.icon === 'GraduationCap'
                ? GraduationCap
                : item.icon === 'Eye'
                ? Eye
                : item.icon === 'Heart'
                ? Heart
                : Sprout;

            return (
              <div
                key={item.id || item._id}
                className="bg-white rounded-2xl border border-[#EEEEEE] p-5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-4"
              >
                {/* Top Photo & Live Badge */}
                <div className="relative h-48 w-full rounded-xl overflow-hidden bg-gray-100 border border-[#EEEEEE]">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src =
                        'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=80';
                    }}
                  />
                  <div className="absolute top-3 right-3">
                    {isLive ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-sm text-emerald-700 text-[11px] font-bold shadow-sm border border-emerald-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Live
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-sm text-amber-700 text-[11px] font-bold shadow-sm border border-amber-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                        Draft
                      </span>
                    )}
                  </div>
                </div>

                {/* Title & Description */}
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#FB7336] to-[#FCC241] flex items-center justify-center text-[#242424] shadow-xs shrink-0">
                      <IconComponent className="w-5 h-5 stroke-[2.2]" />
                    </div>
                    <h3 className="font-['Arial',_Helvetica,_sans-serif] font-bold text-lg text-[#242424]">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-xs text-[#666666] leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>

                {/* Tag Pills */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {(item.tags || [item.tag]).map((tag, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-full bg-[#FFF0E8] text-[#FB7336] text-[11px] font-semibold border border-[#FB7336]/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Card Footer: Edit Button + Visibility Toggle */}
                <div className="pt-3 border-t border-[#EEEEEE] flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setEditingInitiative({ ...item })}
                    className="px-3.5 py-1.5 rounded-xl bg-[#FFF0E8] text-[#FB7336] text-xs font-semibold border border-[#FB7336]/20 hover:bg-[#FB7336] hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    Edit Content
                  </button>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-[#666666]">
                      Visible
                    </span>
                    <button
                      type="button"
                      onClick={() => toggleInitiativeVisibility(item.id || item._id)}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        isLive
                          ? 'bg-gradient-to-r from-[#FB7336] to-[#FCC241]'
                          : 'bg-gray-200'
                      }`}
                      role="switch"
                      aria-checked={isLive}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          isLive ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      {/* Bottom Sync & Reorder Strip */}
      <div className="bg-white rounded-2xl border border-[#EEEEEE] p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 w-full">
        <div className="flex items-center gap-2.5 text-xs">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse shrink-0" />
          <span className="font-semibold text-[#242424]">
            All 4 Core Initiatives are synced with the public website
          </span>
          <span className="text-[#888888] hidden md:inline">
            • Last updated: Today, 11:45 AM
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleReorderInitiatives}
            className="px-3.5 py-1.5 rounded-xl border border-[#EEEEEE] bg-white text-[#242424] text-xs font-semibold hover:bg-[#FFF9F5] shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <ArrowUpDown className="w-3.5 h-3.5 text-[#666666]" />
            Reorder Cards
          </button>
          <button
            type="button"
            onClick={handleSaveInitiativeOrder}
            className="font-bold text-xs text-[#FB7336] hover:underline cursor-pointer"
          >
            Save Order
          </button>
        </div>
      </div>
    </div>
  );
}

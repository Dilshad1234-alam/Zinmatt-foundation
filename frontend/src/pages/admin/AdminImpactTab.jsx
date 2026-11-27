import React from 'react';
import {
  ChevronRight,
  TrendingUp,
  GraduationCap,
  BookOpen,
  Heart,
  Sparkles,
  Plus,
  Edit3,
  Trash2,
  RotateCcw,
  ShieldCheck,
} from 'lucide-react';

export default function AdminImpactTab({
  setImpactDisplayMode,
  impactDisplayMode,
  impactMetrics,
  toggleMetricEnabled,
  handleMetricChange,
  impactQuotes,
  setIsAddQuoteModalOpen,
  setEditingQuote,
  handleDeleteQuote,
  impactReportingControls,
  toggleReportingControl,
  handleDiscardImpactChanges,
}) {
  const getMetricIcon = (iconName) => {
    switch (iconName) {
      case 'GraduationCap':
        return GraduationCap;
      case 'BookOpen':
        return BookOpen;
      case 'Heart':
        return Heart;
      case 'Sparkles':
        return Sparkles;
      default:
        return TrendingUp;
    }
  };

  return (
    <div className="space-y-6">
      {/* Sub-bar: Breadcrumb & Mode Strip */}
      <div className="bg-white rounded-2xl border border-[#EEEEEE] p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs text-[#666666] flex-wrap">
          <span className="hover:text-[#242424] transition-colors cursor-pointer">
            Site Management
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-[#888888] shrink-0" />
          <span className="hover:text-[#242424] transition-colors cursor-pointer">
            Our Impact
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-[#888888] shrink-0" />
          <span className="font-bold text-[#FB7336]">
            Verified Metrics & Voices
          </span>
        </div>

        {/* Right: Display Mode Selector & Status Pill */}
        <div className="flex items-center gap-3 self-end sm:self-auto flex-wrap">
          <div className="flex items-center gap-2 text-xs">
            <span className="font-semibold text-[#242424]">Display Mode:</span>
            <div className="inline-flex rounded-xl bg-[#FFF9F5] border border-[#EEEEEE] p-1 shadow-xs">
              <button
                type="button"
                onClick={() => setImpactDisplayMode('numbers')}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  impactDisplayMode === 'numbers'
                    ? 'bg-gradient-to-r from-[#FB7336] to-[#FCC241] text-[#242424] shadow-xs'
                    : 'text-[#666666] hover:text-[#242424]'
                }`}
              >
                Verified Numbers
              </button>
              <button
                type="button"
                onClick={() => setImpactDisplayMode('goals')}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  impactDisplayMode === 'goals'
                    ? 'bg-gradient-to-r from-[#FB7336] to-[#FCC241] text-[#242424] shadow-xs'
                    : 'text-[#666666] hover:text-[#242424]'
                }`}
              >
                Commitment Goals
              </button>
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>100% Verified Only</span>
          </div>
        </div>
      </div>

      {/* Two-Column Grid Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (lg:col-span-8) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Card 1: Verified Impact Counters */}
          <div className="bg-white rounded-2xl border border-[#EEEEEE] p-5 sm:p-6 shadow-sm space-y-5">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#EEEEEE] gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#FB7336] to-[#FCC241] flex items-center justify-center text-[#242424] shadow-xs shrink-0">
                  <TrendingUp className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <h3 className="font-['Arial',_Helvetica,_sans-serif] font-bold text-lg text-[#242424]">
                    Verified Impact Counters
                  </h3>
                  <p className="text-xs text-[#666666] mt-0.5">
                    Real-time indicators displayed across high-visibility public channels
                  </p>
                </div>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200 self-start sm:self-auto shrink-0 shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Synced to Homepage & Impact Page</span>
              </div>
            </div>

            {/* 2x2 Metric Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {impactMetrics.map((metric) => {
                const Icon = getMetricIcon(metric.icon);
                return (
                  <div
                    key={metric.id}
                    className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                      metric.enabled
                        ? 'bg-[#FFF9F5] border-[#EEEEEE] hover:border-[#FB7336]/40 shadow-xs'
                        : 'bg-[#FAFAFA] border-gray-200 opacity-60'
                    } space-y-3.5`}
                  >
                    {/* Card Top: Icon + Title + Visibility Toggle */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#FB7336] to-[#FCC241] flex items-center justify-center text-[#242424] shadow-xs shrink-0">
                          <Icon className="w-4 h-4 stroke-[2.2]" />
                        </div>
                        <h4 className="font-['Arial',_Helvetica,_sans-serif] font-bold text-sm text-[#242424] truncate">
                          {metric.title}
                        </h4>
                      </div>

                      <button
                        type="button"
                        onClick={() => toggleMetricEnabled(metric.id)}
                        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                          metric.enabled
                            ? 'bg-gradient-to-r from-[#FB7336] to-[#FCC241]'
                            : 'bg-gray-200'
                        }`}
                        role="switch"
                        aria-checked={metric.enabled}
                        title={metric.enabled ? 'Click to hide' : 'Click to show'}
                      >
                        <span
                          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                            metric.enabled ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>

                    {/* Editable Value */}
                    <div className="space-y-1">
                      <label className="block text-[11px] font-semibold text-[#888888]">
                        Editable Value (Verified / Goal)
                      </label>
                      <input
                        type="text"
                        value={metric.value}
                        onChange={(e) =>
                          handleMetricChange(metric.id, 'value', e.target.value)
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#EEEEEE] bg-white font-['Arial',_Helvetica,_sans-serif] font-bold text-base text-[#242424] focus:outline-none focus:border-[#FB7336] shadow-xs transition-all"
                      />
                    </div>

                    {/* Short Subtitle */}
                    <div className="space-y-1">
                      <label className="block text-[11px] font-semibold text-[#888888]">
                        Short Subtitle
                      </label>
                      <input
                        type="text"
                        value={metric.subtitle}
                        onChange={(e) =>
                          handleMetricChange(metric.id, 'subtitle', e.target.value)
                        }
                        className="w-full px-3.5 py-2 rounded-xl border border-[#EEEEEE] bg-white text-xs text-[#242424] focus:outline-none focus:border-[#FB7336] shadow-xs transition-all"
                      />
                    </div>

                    {/* Goal Progress Bar */}
                    <div className="pt-2 border-t border-[#EEEEEE]/80 space-y-1.5">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-medium text-[#666666]">
                          Goal: {metric.goal}
                        </span>
                        <span className="font-bold text-[#FB7336]">
                          {metric.progress}% Reached
                        </span>
                      </div>
                      <div className="w-full bg-[#EEEEEE] h-1.5 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#FB7336] to-[#FCC241] transition-all duration-300"
                          style={{ width: `${Math.min(metric.progress, 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Card 2: Voices of Hope */}
          <div className="bg-white rounded-2xl border border-[#EEEEEE] p-5 sm:p-6 shadow-sm space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#EEEEEE]">
              <div>
                <h3 className="font-['Arial',_Helvetica,_sans-serif] font-bold text-lg text-[#242424]">
                  Voices of Hope ({impactQuotes.length} Quotes)
                </h3>
                <p className="text-xs text-[#666666] mt-0.5">
                  Curated beneficiary & volunteer stories featured on public page
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsAddQuoteModalOpen(true)}
                className="px-3.5 py-1.5 rounded-xl bg-[#FFF0E8] text-[#FB7336] text-xs font-semibold border border-[#FB7336]/20 hover:bg-[#FB7336] hover:text-white transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Quote</span>
              </button>
            </div>

            {/* Quotes List */}
            <div className="space-y-3">
              {impactQuotes.map((q) => (
                <div
                  key={q.id}
                  className="p-3.5 sm:p-4 rounded-xl bg-[#FFF9F5] border border-[#EEEEEE] flex flex-col md:flex-row md:items-center justify-between gap-3 hover:border-[#FB7336]/30 transition-all group"
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <img
                      src={q.avatar}
                      alt={q.name}
                      loading="lazy"
                      className="w-11 h-11 rounded-full object-cover shrink-0 border border-[#EEEEEE] shadow-xs"
                    />
                    <div className="min-w-0 flex-1 space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-sm text-[#242424]">
                          {q.name}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-[#FFF0E8] text-[#FB7336] text-[10px] font-semibold border border-[#FB7336]/20">
                          {q.role}
                        </span>
                      </div>
                      <p className="text-xs text-[#666666] italic line-clamp-1">
                        "{q.quote}"
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
                    <button
                      type="button"
                      onClick={() => setEditingQuote({ ...q })}
                      className="p-1.5 rounded-lg border border-[#EEEEEE] bg-white text-[#666666] hover:text-[#FB7336] hover:border-[#FB7336] shadow-xs transition-colors cursor-pointer"
                      title="Edit Quote"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteQuote(q.id, q.name)}
                      className="p-1.5 rounded-lg border border-[#EEEEEE] bg-white text-gray-400 hover:text-red-500 hover:border-red-300 shadow-xs transition-colors cursor-pointer"
                      title="Delete Quote"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (lg:col-span-4) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Right Card 1: Reporting Controls */}
          <div className="bg-white rounded-2xl border border-[#EEEEEE] p-5 sm:p-6 shadow-sm space-y-4">
            <div>
              <h3 className="font-['Arial',_Helvetica,_sans-serif] font-bold text-base text-[#242424]">
                Reporting Controls
              </h3>
              <p className="text-xs text-[#666666] mt-0.5">
                Configure public ledger presentation
              </p>
            </div>

            <div className="space-y-3">
              {/* Control 1 */}
              <div className="p-3.5 rounded-xl bg-[#FFF9F5] border border-[#EEEEEE] flex items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-[#242424]">
                    Enable Count-Up Animation
                  </p>
                  <p className="text-[11px] text-[#888888]">
                    Smooth numeric odometer on load
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => toggleReportingControl('countUpAnimation')}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    impactReportingControls.countUpAnimation
                      ? 'bg-gradient-to-r from-[#FB7336] to-[#FCC241]'
                      : 'bg-gray-200'
                  }`}
                  role="switch"
                  aria-checked={impactReportingControls.countUpAnimation}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      impactReportingControls.countUpAnimation
                        ? 'translate-x-5'
                        : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Control 2 */}
              <div className="p-3.5 rounded-xl bg-[#FFF9F5] border border-[#EEEEEE] flex items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-[#242424]">
                    Show Commitments Instead
                  </p>
                  <p className="text-[11px] text-[#888888]">
                    Display qualitative goals
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => toggleReportingControl('showCommitments')}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    impactReportingControls.showCommitments
                      ? 'bg-gradient-to-r from-[#FB7336] to-[#FCC241]'
                      : 'bg-gray-200'
                  }`}
                  role="switch"
                  aria-checked={impactReportingControls.showCommitments}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      impactReportingControls.showCommitments
                        ? 'translate-x-5'
                        : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Control 3 */}
              <div className="p-3.5 rounded-xl bg-[#FFF9F5] border border-[#EEEEEE] flex items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-[#242424]">
                    Show Community Voices
                  </p>
                  <p className="text-[11px] text-[#888888]">
                    Display quote carousel on public page
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => toggleReportingControl('showCommunityVoices')}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    impactReportingControls.showCommunityVoices
                      ? 'bg-gradient-to-r from-[#FB7336] to-[#FCC241]'
                      : 'bg-gray-200'
                  }`}
                  role="switch"
                  aria-checked={impactReportingControls.showCommunityVoices}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      impactReportingControls.showCommunityVoices
                        ? 'translate-x-5'
                        : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Right Card 2: Publishing & Sync */}
          <div className="bg-white rounded-2xl border border-[#EEEEEE] p-5 sm:p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#EEEEEE]">
              <h3 className="font-['Arial',_Helvetica,_sans-serif] font-bold text-base text-[#242424]">
                Publishing & Sync
              </h3>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Synced & Live</span>
              </span>
            </div>

            {/* Metadata summary */}
            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between py-1 border-b border-[#F5F5F5]">
                <span className="text-[#888888]">Last verified:</span>
                <span className="font-semibold text-[#242424]">Today, 11:45 AM</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-[#F5F5F5]">
                <span className="text-[#888888]">Updated by:</span>
                <span className="font-semibold text-[#242424]">Lead Admin (ZINMATT)</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-[#888888]">Public Page Status:</span>
                <span className="font-semibold text-emerald-700">Live v2.4 (Edge Warm)</span>
              </div>
            </div>

            {/* Discard Unsaved Changes */}
            <button
              type="button"
              onClick={handleDiscardImpactChanges}
              className="w-full py-2.5 rounded-xl bg-[#FFF0E8] text-[#FB7336] text-xs font-semibold border border-[#FB7336]/20 hover:bg-[#FB7336] hover:text-white transition-colors flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Discard Unsaved Changes</span>
            </button>
          </div>

          {/* Right Card 3: Audit Badge Card */}
          <div className="bg-white rounded-2xl border border-[#EEEEEE] p-4 sm:p-5 shadow-sm flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-200 shadow-xs">
              <ShieldCheck className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div className="space-y-0.5">
              <h4 className="font-['Arial',_Helvetica,_sans-serif] font-bold text-xs text-[#242424]">
                100% Third-Party Audited Data
              </h4>
              <p className="text-[11px] text-[#666666]">
                All public metrics cross-verified with field logs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

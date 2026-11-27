import React from 'react';
import {
  Users,
  TrendingUp,
  Heart,
  Mail,
  Camera,
  Check,
  Eye,
  CheckCircle2,
  CornerDownLeft,
  ChevronRight,
  Plus,
  ArrowRight,
} from 'lucide-react';

export default function DashboardOverviewTab({
  stats = {},
  filteredRecords = [],
  activeFilter = 'all',
  setActiveFilter,
  setSelectedRecord,
  toggleRecordStatus,
  setIsUploadModalOpen,
  setActiveNav,
  donations = [],
  galleryPhotos = [],
  initiatives = [],
  setEditingInitiative,
}) {
  return (
    <>
      {/* 1. 4-Column KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 w-full">
        {/* KPI 1: Volunteers */}
        <div className="bg-[#FFFFFF] rounded-2xl border border-[#EEEEEE] p-5 sm:p-6 shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm font-medium text-[#666666]">
              Volunteers
            </span>
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#FB7336] to-[#FCC241] flex items-center justify-center text-[#242424] shadow-sm">
              <Users className="w-5 h-5 stroke-[2.2]" />
            </div>
          </div>
          <div className="mt-3">
            <span className="font-['Arial',_Helvetica,_sans-serif] font-black text-2xl sm:text-3xl text-[#242424]">
              {stats.volunteers ? stats.volunteers.toLocaleString('en-IN') : '1,248'}
            </span>
          </div>
          <div className="mt-2.5">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FFF0E8] text-[#FB7336] text-[11px] font-semibold">
              <TrendingUp className="w-3 h-3" />
              <span>+{stats.recentVolunteers || 24} this week</span>
            </span>
          </div>
        </div>

        {/* KPI 2: Core Causes */}
        <div className="bg-[#FFFFFF] rounded-2xl border border-[#EEEEEE] p-5 sm:p-6 shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm font-medium text-[#666666]">
              Core Causes
            </span>
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#FB7336] to-[#FCC241] flex items-center justify-center text-[#242424] shadow-sm">
              <Heart className="w-5 h-5 stroke-[2.2]" />
            </div>
          </div>
          <div className="mt-3">
            <span className="font-['Arial',_Helvetica,_sans-serif] font-black text-2xl sm:text-3xl text-[#242424]">
              {stats.coreCauses || 4}
            </span>
          </div>
          <div className="mt-2.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E8F8EE] text-[#1B8044] text-[11px] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1B8044]" />
              <span>All Active</span>
            </span>
          </div>
        </div>

        {/* KPI 3: Enquiries */}
        <div className="bg-[#FFFFFF] rounded-2xl border border-[#EEEEEE] p-5 sm:p-6 shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm font-medium text-[#666666]">
              Enquiries
            </span>
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#FB7336] to-[#FCC241] flex items-center justify-center text-[#242424] shadow-sm">
              <Mail className="w-5 h-5 stroke-[2.2]" />
            </div>
          </div>
          <div className="mt-3">
            <span className="font-['Arial',_Helvetica,_sans-serif] font-black text-2xl sm:text-3xl text-[#242424]">
              {stats.enquiries || 18}
            </span>
          </div>
          <div className="mt-2.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FEF6E7] text-[#D97706] text-[11px] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D97706]" />
              <span>{stats.unreadEnquiries || 5} Unread</span>
            </span>
          </div>
        </div>

        {/* KPI 4: Gallery Moments */}
        <div className="bg-[#FFFFFF] rounded-2xl border border-[#EEEEEE] p-5 sm:p-6 shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm font-medium text-[#666666]">
              Gallery Moments
            </span>
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#FB7336] to-[#FCC241] flex items-center justify-center text-[#242424] shadow-sm">
              <Camera className="w-5 h-5 stroke-[2.2]" />
            </div>
          </div>
          <div className="mt-3">
            <span className="font-['Arial',_Helvetica,_sans-serif] font-black text-2xl sm:text-3xl text-[#242424]">
              {stats.galleryMoments || 342}
            </span>
          </div>
          <div className="mt-2.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#F3F4F6] text-[#4B5563] text-[11px] font-semibold">
              <Check className="w-3 h-3 text-[#1B8044]" />
              <span>Published</span>
            </span>
          </div>
        </div>
      </div>

      {/* 2. Middle Split Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left (8 Cols): Recent Volunteers & Enquiries Table */}
        <div className="lg:col-span-8 bg-[#FFFFFF] rounded-2xl border border-[#EEEEEE] p-6 shadow-[0_2px_10px_rgba(0,0,0,0.03)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#EEEEEE]">
            <div>
              <h2 className="font-['Arial',_Helvetica,_sans-serif] font-bold text-lg text-[#242424]">
                Recent Volunteers & Enquiries
              </h2>
              <p className="text-xs text-[#666666] mt-0.5">
                Review latest incoming community applications & questions
              </p>
            </div>

            {/* Filter Pills */}
            <div className="inline-flex items-center p-1 rounded-xl bg-[#F5F5F5] border border-[#EEEEEE] self-start sm:self-auto">
              {['all', 'volunteers', 'enquiries'].map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize transition-all cursor-pointer ${
                    activeFilter === f
                      ? 'bg-[#242424] text-white shadow-sm'
                      : 'text-[#666666] hover:text-[#242424]'
                  }`}
                >
                  {f === 'all' ? 'All' : f}
                </button>
              ))}
            </div>
          </div>

          {/* Responsive Table */}
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-[#888888] font-semibold uppercase tracking-wider text-[11px] border-b border-[#F5F5F5]">
                  <th className="pb-3 pr-4">Applicant / Sender</th>
                  <th className="pb-3 px-4">Initiative</th>
                  <th className="pb-3 px-4">Type</th>
                  <th className="pb-3 px-4">Status</th>
                  <th className="pb-3 pl-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F5F5F5]">
                {filteredRecords.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="py-8 text-center text-gray-400">
                      No records found matching current filter.
                    </td>
                  </tr>
                ) : (
                  filteredRecords.slice(0, 6).map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-[#FFFDFB] transition-colors group"
                    >
                      {/* Applicant */}
                      <td className="py-3.5 pr-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#FFF0E8] text-[#FB7336] font-bold text-xs flex items-center justify-center flex-shrink-0">
                            {item.initials}
                          </div>
                          <div className="min-w-0">
                            <div className="font-semibold text-sm text-[#242424] truncate">
                              {item.name}
                            </div>
                            <div className="text-[11px] text-[#888888] truncate font-mono">
                              {item.email}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Initiative Badge */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="inline-block px-2.5 py-1 rounded-full bg-[#FFF0E8] text-[#FB7336] text-[11px] font-medium border border-[#FB7336]/15">
                          {item.initiative}
                        </span>
                      </td>

                      {/* Type */}
                      <td className="py-3.5 px-4 text-[#666666] font-medium whitespace-nowrap">
                        {item.type}
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        {item.status === 'Approved' || item.status === 'Resolved' ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#E8F8EE] text-[#1B8044] text-[11px] font-semibold">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#1B8044]" />
                            <span>{item.status}</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FEF6E7] text-[#D97706] text-[11px] font-semibold">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#D97706]" />
                            <span>{item.status}</span>
                          </span>
                        )}
                      </td>

                      {/* Action Buttons */}
                      <td className="py-3.5 pl-4 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => setSelectedRecord(item)}
                            title="View Record Details"
                            className="p-1.5 rounded-lg text-[#666666] hover:text-[#242424] hover:bg-[#F5F5F5] transition-colors cursor-pointer"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          <button
                            type="button"
                            onClick={() => toggleRecordStatus(item)}
                            title={
                              item.type === 'Volunteer'
                                ? 'Toggle Approval'
                                : 'Acknowledge / Reply'
                            }
                            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                              item.status === 'Approved'
                                ? 'text-[#1B8044] hover:bg-[#E8F8EE]'
                                : 'text-[#D97706] hover:bg-[#FEF6E7]'
                            }`}
                          >
                            {item.type === 'Volunteer' ? (
                              <CheckCircle2 className="w-4 h-4" />
                            ) : (
                              <CornerDownLeft className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right (4 Cols): Stacked Quick Actions & Recent Field Photos */}
        <div className="lg:col-span-4 space-y-6">
          {/* Card 1: Quick Actions */}
          <div className="bg-[#FFFFFF] rounded-2xl border border-[#EEEEEE] p-6 shadow-[0_2px_10px_rgba(0,0,0,0.03)]">
            <h3 className="font-['Arial',_Helvetica,_sans-serif] font-bold text-base text-[#242424]">
              Quick Actions
            </h3>
            <p className="text-xs text-[#666666] mt-0.5 mb-4">
              Frequently used shortcuts
            </p>

            <div className="space-y-3">
              <button
                type="button"
                onClick={() => setIsUploadModalOpen(true)}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-[#FFF9F5] border border-[#EEEEEE] hover:border-[#FB7336]/40 hover:bg-[#FFF0E8]/50 transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-r from-[#FB7336] to-[#FCC241] flex items-center justify-center text-[#242424] shadow-sm">
                    <Camera className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-[#242424] group-hover:text-[#FB7336] transition-colors">
                    Upload Gallery Photos
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-[#888888] group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                type="button"
                onClick={() => setActiveNav('donations')}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-[#FFF9F5] border border-[#EEEEEE] hover:border-[#FB7336]/40 hover:bg-[#FFF0E8]/50 transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-r from-[#FB7336] to-[#FCC241] flex items-center justify-center text-[#242424] shadow-sm">
                    <Heart className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-[#242424] group-hover:text-[#FB7336] transition-colors">
                    Manage Donations ({donations.length})
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-[#888888] group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                type="button"
                onClick={() => setActiveNav('contact')}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-[#FFF9F5] border border-[#EEEEEE] hover:border-[#FB7336]/40 hover:bg-[#FFF0E8]/50 transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-r from-[#FB7336] to-[#FCC241] flex items-center justify-center text-[#242424] shadow-sm">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-[#242424] group-hover:text-[#FB7336] transition-colors">
                    Check Messages
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full bg-[#FB7336] text-white text-[10px] font-bold">
                    {stats.unreadEnquiries || 5} unread
                  </span>
                  <ChevronRight className="w-4 h-4 text-[#888888] group-hover:translate-x-0.5 transition-transform" />
                </div>
              </button>
            </div>
          </div>

          {/* Card 2: Recent Field Photos */}
          <div className="bg-[#FFFFFF] rounded-2xl border border-[#EEEEEE] p-6 shadow-[0_2px_10px_rgba(0,0,0,0.03)]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-['Arial',_Helvetica,_sans-serif] font-bold text-base text-[#242424]">
                Recent Field Photos
              </h3>
              <button
                type="button"
                onClick={() => setActiveNav('gallery')}
                className="text-xs font-semibold text-[#FB7336] hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                <span>Manage ({galleryPhotos.length})</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="grid grid-cols-4 gap-2.5">
              {galleryPhotos.slice(0, 3).map((photo) => (
                <div
                  key={photo.id}
                  className="relative aspect-square rounded-xl overflow-hidden border border-[#EEEEEE] group"
                >
                  <img
                    src={photo.url}
                    alt={photo.caption || photo.title || 'Field photo'}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
              ))}

              <button
                type="button"
                onClick={() => setIsUploadModalOpen(true)}
                className="aspect-square rounded-xl border-2 border-dashed border-[#EEEEEE] hover:border-[#FB7336] hover:bg-[#FFF9F5] flex flex-col items-center justify-center text-[#FB7336] transition-all group cursor-pointer"
              >
                <Plus className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-bold mt-1">Upload</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Bottom Section — Our 4 Core Initiatives */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="font-['Arial',_Helvetica,_sans-serif] font-bold text-lg sm:text-xl text-[#242424]">
              Our 4 Core Initiatives
            </h2>
            <p className="text-xs sm:text-sm text-[#666666]">
              Real-time field execution status across registered impact programs
            </p>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F8EE] text-[#1B8044] text-xs font-semibold self-start sm:self-auto">
            <span className="w-2 h-2 rounded-full bg-[#1B8044] animate-pulse" />
            <span>Live Progress Cycle 2025</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 w-full">
          {initiatives.map((item) => (
            <div
              key={item.id}
              className="bg-[#FFFFFF] rounded-2xl border border-[#EEEEEE] overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:-translate-y-1 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/95 backdrop-blur-sm text-[#FB7336] font-bold text-[11px] shadow-sm">
                  {item.tag}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-['Arial',_Helvetica,_sans-serif] font-bold text-base text-[#242424]">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#666666] mt-0.5">
                    {item.subtitle}
                  </p>

                  <div className="mt-4 flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#242424]">
                      {item.beneficiaries}
                    </span>
                    <span className="font-bold text-[#FB7336]">
                      {item.targetPercent}% Target
                    </span>
                  </div>

                  <div className="mt-1.5 w-full h-2 rounded-full bg-[#F3F4F6] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#FB7336] to-[#FCC241] transition-all duration-500"
                      style={{ width: `${item.targetPercent}%` }}
                    />
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-[#F5F5F5] flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setEditingInitiative(item)}
                    className="text-xs font-semibold text-[#FB7336] hover:text-[#e05e22] transition-colors inline-flex items-center gap-1 group cursor-pointer"
                  >
                    <span>Edit Initiative</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

import React from 'react';
import {
  Search,
  Download,
  Mail,
  Check,
  Eye,
  CheckCircle2,
  Phone,
  MapPin,
  Navigation,
  ShieldCheck,
  Bell,
  MessageSquare,
} from 'lucide-react';

export default function AdminContactUsTab({
  allInquiries = [],
  unreadCount = 0,
  repliedCount = 0,
  archivedCount = 0,
  inquiryFilter = 'all',
  setInquiryFilter,
  inquirySearchQuery = '',
  setInquirySearchQuery,
  inquiryPage = 1,
  setInquiryPage,
  handleExportInquiriesCSV,
  paginatedInquiries = [],
  filteredInquiries = [],
  totalInquiryPages = 1,
  toggleInquiryStatus,
  setSelectedInquiry,
  publicContactInfo = {},
  setPublicContactInfo,
  setMapPinForm,
  setIsMapPinModalOpen,
  socialChannels = {},
  setSocialChannels,
  securityAlerts = {},
  setSecurityAlerts,
  handleDiscardContactChanges,
}) {
  return (
    <div className="space-y-6 animate-fade-in w-full">
      {/* Filter Sub-Bar: Status Tabs + Search + Export CSV */}
      <div className="bg-[#FFFFFF] p-3 sm:p-4 rounded-2xl border border-[#EEEEEE] shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 sm:gap-4">
        {/* Status Tabs */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {[
            { key: 'all', label: `All Enquiries (${allInquiries.length || 42})` },
            { key: 'unread', label: `Unread (${unreadCount || 5})` },
            { key: 'replied', label: `Replied (${repliedCount || 32})` },
            { key: 'archived', label: `Archived${archivedCount ? ` (${archivedCount})` : ''}` },
          ].map((tab) => {
            const isActive = inquiryFilter === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => {
                  setInquiryFilter(tab.key);
                  setInquiryPage(1);
                }}
                className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#242424] text-white shadow-xs'
                    : 'bg-white border border-[#EEEEEE] text-[#666666] hover:bg-[#FFF9F5] hover:text-[#242424]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Right: Search & Export CSV */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="relative flex-1 md:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by sender or topic..."
              value={inquirySearchQuery}
              onChange={(e) => {
                setInquirySearchQuery(e.target.value);
                setInquiryPage(1);
              }}
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#EEEEEE] bg-[#FFFDFB] text-xs text-[#242424] placeholder-gray-400 focus:outline-none focus:border-[#FB7336]"
            />
          </div>

          <button
            type="button"
            onClick={handleExportInquiriesCSV}
            className="px-3.5 sm:px-4 py-2 rounded-xl border border-[#EEEEEE] bg-white text-[#242424] text-xs font-semibold hover:bg-[#FFF9F5] hover:border-[#FB7336]/40 transition-colors shadow-xs inline-flex items-center gap-1.5 shrink-0 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-[#666666]" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Two-Column Grid: Left (lg:col-span-8) & Right (lg:col-span-4) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
        {/* ===================================================================
            LEFT COLUMN (lg:col-span-8 stacked cards)
        =================================================================== */}
        <div className="lg:col-span-8 space-y-6">
          {/* CARD 1: Contact Form Messages */}
          <div className="bg-[#FFFFFF] rounded-2xl border border-[#EEEEEE] p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#EEEEEE]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#FB7336] to-[#FCC241] p-0.5 shadow-xs flex items-center justify-center shrink-0">
                  <div className="w-full h-full bg-[#FFFFFF] rounded-[10px] flex items-center justify-center">
                    <Mail className="w-5 h-5 text-[#FB7336]" />
                  </div>
                </div>
                <div>
                  <h2 className="font-['Arial',_Helvetica,_sans-serif] font-bold text-base sm:text-lg text-[#242424]">
                    Contact Form Messages
                  </h2>
                  <p className="text-xs text-[#666666]">
                    Real-time philanthropic &amp; public inbound registry
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-[#E8F8EE] text-[#0F8454] border border-[#BDE8CB]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0F8454] animate-pulse" />
                  Synced from Contact Us form
                </span>
              </div>
            </div>

            {/* Enquiries Table */}
            <div className="overflow-x-auto -mx-5 sm:mx-0">
              <table className="w-full text-left text-xs min-w-[620px]">
                <thead>
                  <tr className="border-b border-[#EEEEEE] text-[#666666] font-semibold text-[11px] uppercase tracking-wider bg-[#FFFDFB]">
                    <th className="py-3 px-4">SENDER</th>
                    <th className="py-3 px-4">TOPIC</th>
                    <th className="py-3 px-4">DATE</th>
                    <th className="py-3 px-4">STATUS</th>
                    <th className="py-3 px-4 text-right">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F5F5F5]">
                  {paginatedInquiries.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="py-8 text-center text-gray-400">
                        No contact enquiries match your current search or filter.
                      </td>
                    </tr>
                  ) : (
                    paginatedInquiries.map((enq) => {
                      const isUnread = enq.status === 'Unread' || enq.status === 'Pending';
                      const isReplied = enq.status === 'Replied';

                      // Topic Badge color mapping
                      const topicKey = (enq.topic || enq.initiative || '').toLowerCase();
                      let topicBadgeStyle = 'bg-gray-100 text-gray-700';
                      if (topicKey.includes('volunt')) {
                        topicBadgeStyle = 'bg-[#FFF0E8] text-[#FB7336] border border-[#FB7336]/20';
                      } else if (topicKey.includes('edu')) {
                        topicBadgeStyle = 'bg-[#E0F2FE] text-[#0284C7] border border-[#BAE6FD]';
                      } else if (topicKey.includes('partner') || topicKey.includes('communit')) {
                        topicBadgeStyle = 'bg-[#EDE9FE] text-[#7C3AED] border border-[#DDD6FE]';
                      } else if (topicKey.includes('elder') || topicKey.includes('care')) {
                        topicBadgeStyle = 'bg-[#FFF8E6] text-[#D97706] border border-[#FDE68A]';
                      } else {
                        topicBadgeStyle = 'bg-[#F1F5F9] text-[#475569] border border-[#E2E8F0]';
                      }

                      return (
                        <tr
                          key={enq.id}
                          onClick={() => setSelectedInquiry(enq)}
                          className="hover:bg-[#FFF9F5]/70 transition-colors cursor-pointer group"
                        >
                          {/* SENDER */}
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-9 h-9 rounded-full font-bold text-xs flex items-center justify-center shrink-0 ${
                                  enq.avatarBg || 'bg-[#FFF0E8] text-[#FB7336]'
                                }`}
                              >
                                {enq.initials}
                              </div>
                              <div className="min-w-0">
                                <p className="font-semibold text-xs text-[#242424] group-hover:text-[#FB7336] transition-colors truncate">
                                  {enq.name}
                                </p>
                                <p className="text-[11px] text-[#888888] truncate font-mono">
                                  {enq.email}
                                </p>
                              </div>
                            </div>
                          </td>

                          {/* TOPIC */}
                          <td className="py-3.5 px-4">
                            <span className={`inline-block px-2.5 py-1 rounded-md text-[11px] font-medium ${topicBadgeStyle}`}>
                              {enq.topic || enq.initiative || 'General Enquiry'}
                            </span>
                          </td>

                          {/* DATE */}
                          <td className="py-3.5 px-4 text-[#666666] whitespace-nowrap text-[11px]">
                            {enq.date}
                          </td>

                          {/* STATUS */}
                          <td className="py-3.5 px-4">
                            {isUnread ? (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#FEF3C7] text-[#D97706] border border-[#FDE68A]">
                                Unread
                              </span>
                            ) : isReplied ? (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#DCFCE7] text-[#16A34A] border border-[#BBF7D0]">
                                Replied
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#F3F4F6] text-[#4B5563] border border-[#E5E7EB]">
                                Archived
                              </span>
                            )}
                          </td>

                          {/* ACTION */}
                          <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                type="button"
                                onClick={() => toggleInquiryStatus(enq)}
                                className={`p-1.5 rounded-lg border text-xs font-semibold transition-colors cursor-pointer ${
                                  isUnread
                                    ? 'border-[#EEEEEE] bg-white text-[#666666] hover:bg-[#FFF9F5] hover:text-[#FB7336]'
                                    : 'border-[#BBF7D0] bg-[#DCFCE7]/60 text-[#16A34A] hover:bg-[#DCFCE7]'
                                }`}
                                title={isUnread ? 'Mark as Replied' : 'Mark as Unread'}
                              >
                                <Check className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => setSelectedInquiry(enq)}
                                className="p-1.5 rounded-lg border border-[#EEEEEE] bg-white text-gray-500 hover:text-[#FB7336] hover:border-[#FB7336] transition-colors cursor-pointer"
                                title="View / Reply to Message"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Table Footer with Pagination */}
            <div className="pt-3 border-t border-[#EEEEEE] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#666666]">
              <p>
                Showing{' '}
                <span className="font-semibold text-[#242424]">
                  {paginatedInquiries.length}
                </span>{' '}
                of{' '}
                <span className="font-semibold text-[#242424]">
                  {filteredInquiries.length}
                </span>{' '}
                enquiries
              </p>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  disabled={inquiryPage <= 1}
                  onClick={() => setInquiryPage((p) => Math.max(1, p - 1))}
                  className="px-2.5 py-1 rounded-lg border border-[#EEEEEE] bg-white text-[#666666] hover:bg-[#FFF9F5] disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
                >
                  &lt; Prev
                </button>
                {Array.from({ length: totalInquiryPages }, (_, i) => i + 1).map((pg) => (
                  <button
                    key={pg}
                    type="button"
                    onClick={() => setInquiryPage(pg)}
                    className={`w-7 h-7 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      inquiryPage === pg
                        ? 'bg-[#FB7336] text-white shadow-xs'
                        : 'bg-white border border-[#EEEEEE] text-[#666666] hover:bg-[#FFF9F5]'
                    }`}
                  >
                    {pg}
                  </button>
                ))}
                <button
                  type="button"
                  disabled={inquiryPage >= totalInquiryPages}
                  onClick={() => setInquiryPage((p) => Math.min(totalInquiryPages, p + 1))}
                  className="px-2.5 py-1 rounded-lg border border-[#EEEEEE] bg-white text-[#666666] hover:bg-[#FFF9F5] disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
                >
                  Next &gt;
                </button>
              </div>
            </div>
          </div>

          {/* CARD 2: Verified Public Contact Info */}
          <div className="bg-[#FFFFFF] rounded-2xl border border-[#EEEEEE] p-5 sm:p-6 shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#EEEEEE]">
              <div>
                <h2 className="font-['Arial',_Helvetica,_sans-serif] font-bold text-base sm:text-lg text-[#242424]">
                  Verified Public Contact Info
                </h2>
                <p className="text-xs text-[#666666] mt-0.5">
                  Configure verified phone numbers, official email, and physical office coordinates displayed across public headers and footers.
                </p>
              </div>
              <span className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-[#E8F8EE] text-[#0F8454] border border-[#BDE8CB] shrink-0">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Verified Details Only
              </span>
            </div>

            <div className="space-y-4">
              {/* Top 2 Inputs: Email & Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-[#666666] uppercase tracking-wider mb-1.5">
                    OFFICIAL EMAIL ADDRESS
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      value={publicContactInfo?.email || ''}
                      onChange={(e) =>
                        setPublicContactInfo({ ...publicContactInfo, email: e.target.value })
                      }
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#EEEEEE] bg-[#FFFDFB] text-xs font-medium text-[#242424] focus:outline-none focus:border-[#FB7336]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#666666] uppercase tracking-wider mb-1.5">
                    OFFICIAL CONTACT NUMBER
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={publicContactInfo?.phone || ''}
                      onChange={(e) =>
                        setPublicContactInfo({ ...publicContactInfo, phone: e.target.value })
                      }
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#EEEEEE] bg-[#FFFDFB] text-xs font-medium text-[#242424] focus:outline-none focus:border-[#FB7336]"
                    />
                  </div>
                </div>
              </div>

              {/* Official Office Address */}
              <div>
                <label className="block text-[11px] font-bold text-[#666666] uppercase tracking-wider mb-1.5">
                  OFFICIAL OFFICE ADDRESS
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={publicContactInfo?.address || ''}
                    onChange={(e) =>
                      setPublicContactInfo({ ...publicContactInfo, address: e.target.value })
                    }
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#EEEEEE] bg-[#FFFDFB] text-xs font-medium text-[#242424] focus:outline-none focus:border-[#FB7336]"
                  />
                </div>
              </div>

              {/* Map Pin Box */}
              <div className="p-3.5 sm:p-4 rounded-xl border border-[#EEEEEE] bg-[#FFFDFB] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#FFF0E8] flex items-center justify-center text-[#FB7336] shrink-0">
                    <Navigation className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#242424]">
                      {publicContactInfo?.coordinates || '28.4817° N, 77.0815° E (Delhi NCR HQ)'}
                    </p>
                    <p className="text-[11px] text-[#0F8454] font-medium flex items-center gap-1.5 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0F8454] inline-block" />
                      {publicContactInfo?.gpsLabel || 'Active GPS Pin on Public Map'}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setMapPinForm({
                      coordinates: publicContactInfo?.coordinates || '28.4817° N, 77.0815° E (Delhi NCR HQ)',
                      landmark: publicContactInfo?.address || '',
                    });
                    setIsMapPinModalOpen(true);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-[#FFF0E8] border border-[#FB7336]/30 text-[#FB7336] hover:bg-[#FFE6D9] text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer self-end sm:self-auto"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Update Map Pin</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================================
            RIGHT COLUMN (lg:col-span-4 stacked cards)
        =================================================================== */}
        <div className="lg:col-span-4 space-y-6">
          {/* CARD 1: Connected Channels */}
          <div className="bg-[#FFFFFF] rounded-2xl border border-[#EEEEEE] p-5 sm:p-6 shadow-xs space-y-4">
            <div>
              <h3 className="font-['Arial',_Helvetica,_sans-serif] font-bold text-base text-[#242424]">
                Connected Channels
              </h3>
              <p className="text-xs text-[#666666] mt-0.5">
                Public footer and outreach links
              </p>
            </div>

            <div className="space-y-3 pt-1">
              {/* Instagram */}
              <div className="flex items-center justify-between p-3 rounded-xl border border-[#EEEEEE] bg-[#FFFDFB] hover:bg-white transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#FD1D1D] via-[#E1306C] to-[#C13584] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                    ig
                  </div>
                  <div>
                    <p className="font-semibold text-xs text-[#242424]">Instagram</p>
                    <p className="text-[11px] text-[#888888] font-mono">
                      {socialChannels?.instagram?.handle || '@zinmattfoundation'}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setSocialChannels((prev) => ({
                      ...prev,
                      instagram: { ...prev.instagram, enabled: !prev.instagram?.enabled },
                    }))
                  }
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    socialChannels?.instagram?.enabled
                      ? 'bg-gradient-to-r from-[#FB7336] to-[#FCC241]'
                      : 'bg-gray-200'
                  }`}
                  role="switch"
                  aria-checked={socialChannels?.instagram?.enabled}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      socialChannels?.instagram?.enabled ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Facebook */}
              <div className="flex items-center justify-between p-3 rounded-xl border border-[#EEEEEE] bg-[#FFFDFB] hover:bg-white transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#1877F2] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                    fb
                  </div>
                  <div>
                    <p className="font-semibold text-xs text-[#242424]">Facebook</p>
                    <p className="text-[11px] text-[#888888] font-mono">
                      {socialChannels?.facebook?.handle || '/zinmattfoundation'}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setSocialChannels((prev) => ({
                      ...prev,
                      facebook: { ...prev.facebook, enabled: !prev.facebook?.enabled },
                    }))
                  }
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    socialChannels?.facebook?.enabled
                      ? 'bg-gradient-to-r from-[#FB7336] to-[#FCC241]'
                      : 'bg-gray-200'
                  }`}
                  role="switch"
                  aria-checked={socialChannels?.facebook?.enabled}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      socialChannels?.facebook?.enabled ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* LinkedIn */}
              <div className="flex items-center justify-between p-3 rounded-xl border border-[#EEEEEE] bg-[#FFFDFB] hover:bg-white transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#0A66C2] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                    in
                  </div>
                  <div>
                    <p className="font-semibold text-xs text-[#242424]">LinkedIn</p>
                    <p className="text-[11px] text-[#888888] font-mono">
                      {socialChannels?.linkedin?.handle || 'company/zinmatt-foundation'}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setSocialChannels((prev) => ({
                      ...prev,
                      linkedin: { ...prev.linkedin, enabled: !prev.linkedin?.enabled },
                    }))
                  }
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    socialChannels?.linkedin?.enabled
                      ? 'bg-gradient-to-r from-[#FB7336] to-[#FCC241]'
                      : 'bg-gray-200'
                  }`}
                  role="switch"
                  aria-checked={socialChannels?.linkedin?.enabled}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      socialChannels?.linkedin?.enabled ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* YouTube */}
              <div className="flex items-center justify-between p-3 rounded-xl border border-[#EEEEEE] bg-[#FFFDFB] hover:bg-white transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#FF0000] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                    yt
                  </div>
                  <div>
                    <p className="font-semibold text-xs text-[#242424]">YouTube</p>
                    <p className="text-[11px] text-[#888888] font-mono">
                      {socialChannels?.youtube?.handle || '@zinmattfoundation'}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setSocialChannels((prev) => ({
                      ...prev,
                      youtube: { ...prev.youtube, enabled: !prev.youtube?.enabled },
                    }))
                  }
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    socialChannels?.youtube?.enabled
                      ? 'bg-gradient-to-r from-[#FB7336] to-[#FCC241]'
                      : 'bg-gray-200'
                  }`}
                  role="switch"
                  aria-checked={socialChannels?.youtube?.enabled}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      socialChannels?.youtube?.enabled ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* CARD 2: Security & Alerts */}
          <div className="bg-[#FFFFFF] rounded-2xl border border-[#EEEEEE] p-5 sm:p-6 shadow-xs space-y-4">
            <div>
              <h3 className="font-['Arial',_Helvetica,_sans-serif] font-bold text-base text-[#242424]">
                Security &amp; Alerts
              </h3>
              <p className="text-xs text-[#666666] mt-0.5">
                Spam filtering &amp; instant routing
              </p>
            </div>

            <div className="space-y-3 pt-1">
              {/* Spam Protection */}
              <div className="flex items-center justify-between p-3 rounded-xl border border-[#EEEEEE] bg-[#FFFDFB] hover:bg-white transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-xs text-[#242424]">
                      Spam Protection (reCAPTCHA v3)
                    </p>
                    <p className="text-[11px] text-[#666666]">
                      Active &amp; filtering bot traffic
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setSecurityAlerts((prev) => ({
                      ...prev,
                      spamProtection: !prev.spamProtection,
                    }))
                  }
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    securityAlerts?.spamProtection
                      ? 'bg-gradient-to-r from-[#FB7336] to-[#FCC241]'
                      : 'bg-gray-200'
                  }`}
                  role="switch"
                  aria-checked={securityAlerts?.spamProtection}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      securityAlerts?.spamProtection ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Email Alerts */}
              <div className="flex items-center justify-between p-3 rounded-xl border border-[#EEEEEE] bg-[#FFFDFB] hover:bg-white transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#FFF0E8] text-[#FB7336] flex items-center justify-center shrink-0">
                    <Bell className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-xs text-[#242424]">
                      Email Alerts for New Messages
                    </p>
                    <p className="text-[11px] text-[#666666]">
                      Notify admin@zinmatt.org instantly
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setSecurityAlerts((prev) => ({
                      ...prev,
                      emailAlerts: !prev.emailAlerts,
                    }))
                  }
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    securityAlerts?.emailAlerts
                      ? 'bg-gradient-to-r from-[#FB7336] to-[#FCC241]'
                      : 'bg-gray-200'
                  }`}
                  role="switch"
                  aria-checked={securityAlerts?.emailAlerts}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      securityAlerts?.emailAlerts ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Auto-Acknowledgement Reply */}
              <div className="flex items-center justify-between p-3 rounded-xl border border-[#EEEEEE] bg-[#FFFDFB] hover:bg-white transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-xs text-[#242424]">
                      Auto-Acknowledgement Reply
                    </p>
                    <p className="text-[11px] text-[#666666]">
                      Send humanitarian receipt note
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setSecurityAlerts((prev) => ({
                      ...prev,
                      autoReply: !prev.autoReply,
                    }))
                  }
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    securityAlerts?.autoReply
                      ? 'bg-gradient-to-r from-[#FB7336] to-[#FCC241]'
                      : 'bg-gray-200'
                  }`}
                  role="switch"
                  aria-checked={securityAlerts?.autoReply}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      securityAlerts?.autoReply ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* CARD 3: Publishing & Sync */}
          <div className="bg-[#FFFFFF] rounded-2xl border border-[#EEEEEE] p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#EEEEEE]">
              <h3 className="font-['Arial',_Helvetica,_sans-serif] font-bold text-base text-[#242424]">
                Publishing &amp; Sync
              </h3>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-[#E8F8EE] text-[#0F8454] border border-[#BDE8CB]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0F8454] inline-block" />
                Synced &amp; Live
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between text-[#666666]">
                <span>Last updated:</span>
                <span className="font-semibold text-[#242424]">Today, 11:45 AM IST</span>
              </div>
              <div className="flex items-center justify-between text-[#666666]">
                <span>Updated by:</span>
                <span className="font-semibold text-[#242424]">Lead Admin (Arun Verma)</span>
              </div>
              <div className="flex items-center justify-between text-[#666666]">
                <span>Public Route:</span>
                <span className="px-2 py-0.5 rounded-md bg-[#FFF0E8] text-[#FB7336] font-mono text-[11px] font-semibold">
                  /contact-us
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleDiscardContactChanges}
              className="w-full mt-2 py-2.5 rounded-xl border border-[#FB7336]/30 bg-[#FFF0E8] text-[#FB7336] hover:bg-[#FFE6D9] text-xs font-bold transition-colors cursor-pointer"
            >
              Discard Unsaved Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

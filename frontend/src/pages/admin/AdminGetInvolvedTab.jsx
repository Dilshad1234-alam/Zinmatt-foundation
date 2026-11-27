import React from 'react';
import {
  Search,
  Download,
  Users,
  Check,
  Eye,
  Sparkles,
  Heart,
  Edit3,
  SlidersHorizontal,
  CheckCircle2,
  RotateCcw,
} from 'lucide-react';

const DEFAULT_VOLUNTEERS = [
  {
    id: 'vol-1',
    _id: 'vol-1',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@gmail.com',
    phone: '+91 98112 43210',
    initials: 'AS',
    initiative: 'Free Education',
    preferredCause: 'Free Education',
    type: 'Volunteer',
    status: 'Approved',
    date: 'Oct 15, 2024',
    message: 'Experienced elementary math tutor offering 8 hours/week for weekend rural learning centers in Delhi NCR.',
  },
  {
    id: 'vol-2',
    _id: 'vol-2',
    name: 'Priyanka Nair',
    email: 'priyanka.nair@outlook.com',
    phone: '+91 98200 98765',
    initials: 'PN',
    initiative: 'Visually Impaired Support',
    preferredCause: 'Visually Impaired Support',
    type: 'Volunteer',
    status: 'Pending',
    date: 'Oct 14, 2024',
    message: 'Audiobook voiceover artist offering to record high-school study guides and literature in Hindi and English.',
  },
  {
    id: 'vol-3',
    _id: 'vol-3',
    name: 'Devendra Patil',
    email: 'd.patil@rediffmail.com',
    phone: '+91 97654 32190',
    initials: 'DP',
    initiative: 'Elderly Care',
    preferredCause: 'Elderly Care',
    type: 'Volunteer',
    status: 'Approved',
    date: 'Oct 12, 2024',
    message: 'Retired physician assistant eager to assist weekly geriatric vital sign screenings and medication counselling.',
  },
  {
    id: 'vol-4',
    _id: 'vol-4',
    name: 'Ananya Sen',
    email: 'ananya.sen@techcorp.in',
    phone: '+91 99001 22334',
    initials: 'AS',
    initiative: 'Clean Environment',
    preferredCause: 'Clean Environment',
    type: 'Volunteer',
    status: 'Approved',
    date: 'Oct 11, 2024',
    message: 'Environmental science educator willing to lead Sunday riverbank cleanup operations and sapling drives.',
  },
  {
    id: 'vol-5',
    _id: 'vol-5',
    name: 'Vikram Joshi',
    email: 'vikram.joshi@gmail.com',
    phone: '+91 98101 55667',
    initials: 'VJ',
    initiative: 'Free Education',
    preferredCause: 'Free Education',
    type: 'Volunteer',
    status: 'Pending',
    date: 'Oct 09, 2024',
    message: 'Software engineer wanting to run basic digital literacy and scratch programming workshops for children.',
  },
];

const DEFAULT_PARTICIPATION_CARDS = [
  {
    id: 'card-1',
    title: 'Volunteer With Us',
    subtitle: 'Contribute your time, skills, and empathy directly on-ground',
    icon: 'Users',
  },
  {
    id: 'card-2',
    title: 'Support Our Initiatives',
    subtitle: 'Participate in resource distribution and community cleanliness drives',
    icon: 'Heart',
  },
  {
    id: 'card-3',
    title: 'Spread Awareness',
    subtitle: 'Help amplify humanitarian stories and invite changemakers to our cause',
    icon: 'Sparkles',
  },
];

const DEFAULT_REGISTRATION_SETTINGS = {
  acceptApplications: true,
  autoSendWelcomeEmail: true,
  requireVerification: true,
};

export default function AdminGetInvolvedTab({
  records = [],
  filteredVolunteers = [],
  volunteerStatusFilter = 'all',
  setVolunteerStatusFilter = () => {},
  volunteerSearchQuery = '',
  setVolunteerSearchQuery = () => {},
  volunteerPaginationPage = 1,
  setVolunteerPaginationPage = () => {},
  handleExportVolunteerCSV = () => {},
  toggleRecordStatus = () => {},
  setSelectedRecord = () => {},
  participationCards = [],
  setEditingParticipationCard = () => {},
  volunteerRegistrationSettings = {},
  toggleVolunteerRegSetting = () => {},
  handleDiscardVolunteerSettings = () => {},
}) {
  // Determine effective display data with robust fallbacks
  const effectiveVolunteers =
    Array.isArray(filteredVolunteers) && filteredVolunteers.length > 0
      ? filteredVolunteers
      : volunteerSearchQuery || (volunteerStatusFilter && volunteerStatusFilter !== 'all')
      ? []
      : DEFAULT_VOLUNTEERS;

  const effectiveCards =
    Array.isArray(participationCards) && participationCards.length > 0
      ? participationCards
      : DEFAULT_PARTICIPATION_CARDS;

  const effectiveSettings = {
    ...DEFAULT_REGISTRATION_SETTINGS,
    ...(volunteerRegistrationSettings || {}),
  };

  const totalVolunteersCount =
    records && records.length > 0
      ? records.filter((r) => r.type === 'Volunteer').length
      : 128;
  const activeVolunteersCount =
    records && records.length > 0
      ? records.filter((r) => r.type === 'Volunteer' && r.status === 'Approved').length
      : 106;
  const pendingVolunteersCount =
    records && records.length > 0
      ? records.filter((r) => r.type === 'Volunteer' && r.status === 'Pending').length
      : 14;

  return (
    <div className="space-y-6 animate-fade-in w-full">
      {/* Filter Sub-Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Status Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full no-scrollbar">
          {[
            { id: 'all', label: `All Applications (${totalVolunteersCount || 128})` },
            { id: 'pending', label: `Pending (${pendingVolunteersCount || 14})` },
            { id: 'approved', label: `Approved (${activeVolunteersCount || 106})` },
            { id: 'archived', label: 'Archived (8)' },
          ].map((tab) => {
            const isActive = volunteerStatusFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setVolunteerStatusFilter(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                  isActive
                    ? 'bg-[#242424] text-white shadow-xs'
                    : 'bg-white text-[#666666] border border-[#EEEEEE] hover:bg-[#FFF9F5] hover:text-[#242424]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Right: Search & Export CSV */}
        <div className="flex items-center gap-2.5 self-end md:self-auto shrink-0">
          <div className="relative w-52 sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#888888]" />
            <input
              type="text"
              placeholder="Search by name or cause..."
              value={volunteerSearchQuery}
              onChange={(e) => setVolunteerSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-2 rounded-full border border-[#EEEEEE] bg-white text-xs text-[#242424] placeholder-gray-400 focus:outline-none focus:border-[#FB7336] shadow-xs"
            />
          </div>

          <button
            type="button"
            onClick={handleExportVolunteerCSV}
            className="px-3.5 py-2 rounded-xl border border-[#EEEEEE] bg-white text-[#242424] text-xs font-semibold hover:bg-[#FFF9F5] shadow-xs inline-flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-[#666666]" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Stacked Card 1: Volunteer Requests Table */}
      <div className="bg-white rounded-2xl border border-[#EEEEEE] p-5 sm:p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#EEEEEE] gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#FB7336] to-[#FCC241] flex items-center justify-center text-[#242424] shadow-xs shrink-0">
              <Users className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <h3 className="font-['Arial',_Helvetica,_sans-serif] font-bold text-base text-[#242424]">
                Volunteer Requests
              </h3>
              <p className="text-xs text-[#666666] mt-0.5">
                Review and authorize grassroots community applicants
              </p>
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200 self-start sm:self-auto shrink-0 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Synced from Get Involved form</span>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#EEEEEE] text-[11px] font-bold text-[#888888] tracking-wider uppercase">
                <th className="py-3 px-3">Applicant</th>
                <th className="py-3 px-3">Preferred Cause</th>
                <th className="py-3 px-3">Applied Date</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EEEEEE] text-xs">
              {effectiveVolunteers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-[#888888]">
                    No volunteer applications found matching the selected filter.
                  </td>
                </tr>
              ) : (
                effectiveVolunteers.map((vol) => {
                  const isApproved = vol.status === 'Approved';
                  return (
                    <tr
                      key={vol.id || vol._id}
                      className="hover:bg-[#FFF9F5]/60 transition-colors group"
                    >
                      {/* Applicant */}
                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-[#FFF0E8] text-[#FB7336] font-bold text-xs flex items-center justify-center shrink-0 border border-[#FB7336]/20">
                            {vol.initials || 'AS'}
                          </div>
                          <div className="min-w-0">
                            <p className="font-bold text-xs text-[#242424] truncate">
                              {vol.name}
                            </p>
                            <p className="text-[11px] text-[#888888] truncate">
                              {vol.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Preferred Cause */}
                      <td className="py-3.5 px-3">
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#FFF0E8] text-[#FB7336] text-[11px] font-semibold border border-[#FB7336]/20">
                          {vol.initiative || vol.preferredCause || 'Free Education'}
                        </span>
                      </td>

                      {/* Applied Date */}
                      <td className="py-3.5 px-3 text-[#666666] font-medium text-[11px] whitespace-nowrap">
                        {vol.date || 'Oct 15, 2024'}
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-3">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
                            isApproved
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : 'bg-amber-50 text-amber-700 border-amber-200'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isApproved ? 'bg-emerald-500' : 'bg-amber-500'
                            }`}
                          />
                          <span>{vol.status || 'Pending'}</span>
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-3 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => toggleRecordStatus(vol)}
                            className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                              isApproved
                                ? 'border-emerald-200 text-emerald-600 bg-emerald-50 hover:bg-emerald-100'
                                : 'border-[#EEEEEE] text-gray-400 hover:text-emerald-600 hover:border-emerald-300'
                            }`}
                            title={isApproved ? 'Mark as Pending' : 'Approve Application'}
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={() => setSelectedRecord(vol)}
                            className="p-1.5 rounded-lg border border-[#EEEEEE] bg-white text-gray-500 hover:text-[#FB7336] hover:border-[#FB7336] transition-colors cursor-pointer"
                            title="View Full Application"
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

        {/* Table Footer / Pagination */}
        <div className="pt-4 border-t border-[#EEEEEE] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#888888]">
          <span>Showing {effectiveVolunteers.length} of {totalVolunteersCount || 128} applications</span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setVolunteerPaginationPage((p) => Math.max(p - 1, 1))}
              disabled={volunteerPaginationPage === 1}
              className="px-2.5 py-1 rounded-lg border border-[#EEEEEE] bg-white text-[#242424] disabled:opacity-40 hover:bg-[#FFF9F5] cursor-pointer text-xs font-semibold"
            >
              &lt; Prev
            </button>
            {[1, 2, 3].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => setVolunteerPaginationPage(num)}
                className={`w-7 h-7 rounded-lg text-xs font-semibold flex items-center justify-center transition-all cursor-pointer ${
                  volunteerPaginationPage === num
                    ? 'bg-[#FB7336] text-white shadow-xs'
                    : 'bg-white text-[#666666] border border-[#EEEEEE] hover:bg-[#FFF9F5]'
                }`}
              >
                {num}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setVolunteerPaginationPage((p) => p + 1)}
              className="px-2.5 py-1 rounded-lg border border-[#EEEEEE] bg-white text-[#242424] hover:bg-[#FFF9F5] cursor-pointer text-xs font-semibold"
            >
              Next &gt;
            </button>
          </div>
        </div>
      </div>

      {/* Stacked Card 2: Participation Cards on Public Page */}
      <div className="bg-white rounded-2xl border border-[#EEEEEE] p-5 sm:p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#EEEEEE]">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-[#FB7336]" />
            <h3 className="font-['Arial',_Helvetica,_sans-serif] font-bold text-base text-[#242424]">
              Participation Cards on Public Page
            </h3>
          </div>

          <a
            href="/get-involved"
            target="_blank"
            rel="noreferrer"
            className="font-bold text-xs text-[#FB7336] hover:underline inline-flex items-center gap-1"
          >
            <span>Edit Section</span>
            <span>&rarr;</span>
          </a>
        </div>

        <div className="space-y-3">
          {effectiveCards.map((card) => (
            <div
              key={card.id}
              className="p-3.5 rounded-xl border border-[#EEEEEE] bg-[#FFF9F5] flex items-center justify-between gap-3 hover:border-[#FB7336]/30 transition-all"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-lg bg-[#FFF0E8] text-[#FB7336] flex items-center justify-center shrink-0 border border-[#FB7336]/20">
                  {card.icon === 'Users' ? (
                    <Users className="w-4 h-4" />
                  ) : card.icon === 'Heart' ? (
                    <Heart className="w-4 h-4" />
                  ) : (
                    <Sparkles className="w-4 h-4" />
                  )}
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-xs text-[#242424]">
                    {card.title}
                  </h4>
                  <p className="text-[11px] text-[#666666] mt-0.5 truncate">
                    {card.subtitle}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setEditingParticipationCard({ ...card })}
                className="p-1.5 rounded-lg border border-[#EEEEEE] bg-white text-[#666666] hover:text-[#FB7336] hover:border-[#FB7336] shadow-xs transition-colors shrink-0 cursor-pointer"
                title="Edit Card"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Stacked Card 3: Registration Settings */}
      <div className="bg-white rounded-2xl border border-[#EEEEEE] p-5 sm:p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-[#EEEEEE]">
          <SlidersHorizontal className="w-4 h-4 text-[#FB7336]" />
          <h3 className="font-['Arial',_Helvetica,_sans-serif] font-bold text-base text-[#242424]">
            Registration Settings
          </h3>
        </div>

        <div className="space-y-3">
          {/* Setting 1 */}
          <div className="p-3.5 rounded-xl bg-[#FFF9F5] border border-[#EEEEEE] flex items-center justify-between gap-3">
            <div className="space-y-0.5">
              <p className="text-xs font-bold text-[#242424]">
                Accept Volunteer Applications
              </p>
              <p className="text-[11px] text-[#888888]">
                Public form open on /get-involved
              </p>
            </div>
            <button
              type="button"
              onClick={() => toggleVolunteerRegSetting('acceptApplications')}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                effectiveSettings.acceptApplications
                  ? 'bg-gradient-to-r from-[#FB7336] to-[#FCC241]'
                  : 'bg-gray-200'
              }`}
              role="switch"
              aria-checked={effectiveSettings.acceptApplications}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  effectiveSettings.acceptApplications
                    ? 'translate-x-5'
                    : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Setting 2 */}
          <div className="p-3.5 rounded-xl bg-[#FFF9F5] border border-[#EEEEEE] flex items-center justify-between gap-3">
            <div className="space-y-0.5">
              <p className="text-xs font-bold text-[#242424]">
                Auto-Send Welcome Email
              </p>
              <p className="text-[11px] text-[#888888]">
                Send orientation guide &amp; WhatsApp invite
              </p>
            </div>
            <button
              type="button"
              onClick={() => toggleVolunteerRegSetting('autoSendWelcomeEmail')}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                effectiveSettings.autoSendWelcomeEmail
                  ? 'bg-gradient-to-r from-[#FB7336] to-[#FCC241]'
                  : 'bg-gray-200'
              }`}
              role="switch"
              aria-checked={effectiveSettings.autoSendWelcomeEmail}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  effectiveSettings.autoSendWelcomeEmail
                    ? 'translate-x-5'
                    : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Setting 3 */}
          <div className="p-3.5 rounded-xl bg-[#FFF9F5] border border-[#EEEEEE] flex items-center justify-between gap-3">
            <div className="space-y-0.5">
              <p className="text-xs font-bold text-[#242424]">
                Require Police / ID Verification
              </p>
              <p className="text-[11px] text-[#888888]">
                For on-ground child welfare activities
              </p>
            </div>
            <button
              type="button"
              onClick={() => toggleVolunteerRegSetting('requireVerification')}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                effectiveSettings.requireVerification
                  ? 'bg-gradient-to-r from-[#FB7336] to-[#FCC241]'
                  : 'bg-gray-200'
              }`}
              role="switch"
              aria-checked={effectiveSettings.requireVerification}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  effectiveSettings.requireVerification
                    ? 'translate-x-5'
                    : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Stacked Card 4: Community Snapshot */}
      <div className="bg-white rounded-2xl border border-[#EEEEEE] p-5 sm:p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#EEEEEE]">
          <h3 className="font-['Arial',_Helvetica,_sans-serif] font-bold text-base text-[#242424]">
            Community Snapshot
          </h3>
          <span className="px-2.5 py-0.5 rounded-full bg-[#FFF0E8] text-[#FB7336] text-xs font-semibold border border-[#FB7336]/20">
            Active Cohort
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Metric 1 */}
          <div className="p-4 rounded-xl bg-[#FFF9F5] border border-[#EEEEEE] space-y-1">
            <p className="font-['Arial',_Helvetica,_sans-serif] font-bold text-2xl text-[#242424]">
              {totalVolunteersCount || 128}
            </p>
            <p className="text-xs text-[#666666]">Total Applied</p>
            <p className="text-[11px] font-semibold text-emerald-600 pt-1">
              +12% this month
            </p>
          </div>

          {/* Metric 2 */}
          <div className="p-4 rounded-xl bg-[#FFF9F5] border border-[#EEEEEE] space-y-1">
            <p className="font-['Arial',_Helvetica,_sans-serif] font-bold text-2xl text-[#242424]">
              {activeVolunteersCount || 106}
            </p>
            <p className="text-xs text-[#666666]">Active Volunteers</p>
            <p className="text-[11px] font-semibold text-emerald-600 pt-1">
              Verified on-ground
            </p>
          </div>

          {/* Metric 3 */}
          <div className="p-4 rounded-xl bg-[#FFF9F5] border border-[#EEEEEE] space-y-1">
            <p className="font-['Arial',_Helvetica,_sans-serif] font-bold text-2xl text-[#242424]">
              {pendingVolunteersCount || 14}
            </p>
            <p className="text-xs text-[#666666]">Pending Review</p>
            <p className="text-[11px] font-semibold text-amber-600 pt-1">
              Action needed
            </p>
          </div>

          {/* Metric 4 */}
          <div className="p-4 rounded-xl bg-[#FFF9F5] border border-[#EEEEEE] space-y-1">
            <p className="font-['Arial',_Helvetica,_sans-serif] font-bold text-2xl text-[#242424]">
              94%
            </p>
            <p className="text-xs text-[#666666]">Retention Rate</p>
            <p className="text-[11px] font-semibold text-[#FB7336] pt-1">
              6-month active
            </p>
          </div>
        </div>
      </div>

      {/* Stacked Card 5: Sync & Status Footer Card */}
      <div className="bg-white rounded-2xl border border-[#EEEEEE] p-5 sm:p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#EEEEEE]">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Synced &amp; Live</span>
          </span>
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
        </div>

        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between py-1 border-b border-[#F5F5F5]">
            <span className="text-[#888888]">Last sync:</span>
            <span className="font-semibold text-[#242424]">Today, 11:45 AM IST</span>
          </div>
          <div className="flex items-center justify-between py-1 border-b border-[#F5F5F5]">
            <span className="text-[#888888]">Admin:</span>
            <span className="font-semibold text-[#242424]">Lead Admin (Aarav Verma)</span>
          </div>
          <div className="flex items-center justify-between py-1">
            <span className="text-[#888888]">Public Route:</span>
            <span className="font-mono text-[#FB7336] font-semibold">/get-involved</span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleDiscardVolunteerSettings}
          className="w-full py-2.5 rounded-xl bg-[#FFF0E8] text-[#FB7336] text-xs font-semibold border border-[#FB7336]/20 hover:bg-[#FB7336] hover:text-white transition-colors flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Discard Unsaved Changes</span>
        </button>
      </div>
    </div>
  );
}

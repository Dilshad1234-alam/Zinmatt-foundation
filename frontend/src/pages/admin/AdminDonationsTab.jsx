import React from 'react';
import { Check, Trash2 } from 'lucide-react';

export default function AdminDonationsTab({
  donationFilter = 'all',
  setDonationFilter,
  filteredDonations = [],
  toggleDonationStatus,
  handleDeleteDonation,
}) {
  return (
    <div className="bg-[#FFFFFF] rounded-2xl border border-[#EEEEEE] p-6 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#EEEEEE]">
        <div>
          <h2 className="font-['Arial',_Helvetica,_sans-serif] font-bold text-xl text-[#242424]">
            Donations &amp; Philanthropic Pledges
          </h2>
          <p className="text-xs text-[#666666] mt-1">
            Review and verify statutory 80G tax-exempt donor contributions
          </p>
        </div>

        {/* Filter Pills */}
        <div className="inline-flex items-center p-1 rounded-xl bg-[#F5F5F5] border border-[#EEEEEE] self-start sm:self-auto">
          {['all', 'verified', 'pending', 'cancelled'].map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setDonationFilter(f)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize transition-all cursor-pointer ${
                donationFilter === f
                  ? 'bg-[#242424] text-white shadow-sm'
                  : 'text-[#666666] hover:text-[#242424]'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Responsive Donations Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="text-[#888888] font-semibold uppercase tracking-wider text-[11px] border-b border-[#F5F5F5]">
              <th className="pb-3 pr-4">Donor Particulars</th>
              <th className="pb-3 px-4">Reference ID</th>
              <th className="pb-3 px-4">Cause &amp; Frequency</th>
              <th className="pb-3 px-4">Amount</th>
              <th className="pb-3 px-4">80G / PAN</th>
              <th className="pb-3 px-4">Status</th>
              <th className="pb-3 pl-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F5F5F5]">
            {filteredDonations.length === 0 ? (
              <tr>
                <td colSpan="7" className="py-8 text-center text-gray-400">
                  No donation records found.
                </td>
              </tr>
            ) : (
              filteredDonations.map((don) => (
                <tr key={don._id} className="hover:bg-[#FFFDFB] transition-colors">
                  <td className="py-3.5 pr-4">
                    <div className="font-semibold text-sm text-[#242424]">
                      {don.fullName}
                    </div>
                    <div className="text-[11px] text-[#888888] font-mono">
                      {don.email} • {don.phone}
                    </div>
                  </td>

                  <td className="py-3.5 px-4 font-mono font-bold text-xs text-[#FB7336]">
                    {don.referenceId}
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="font-medium text-[#242424]">{don.cause}</div>
                    <span className="text-[10px] uppercase font-bold text-gray-500">
                      {don.frequency}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 font-bold text-sm text-[#242424]">
                    ₹{Number(don.amount).toLocaleString('en-IN')}
                  </td>

                  <td className="py-3.5 px-4">
                    {don.panNumber ? (
                      <span className="px-2 py-0.5 rounded-lg bg-[#E8F8EE] text-[#1B8044] font-mono font-semibold text-[10px]">
                        {don.panNumber}
                      </span>
                    ) : (
                      <span className="text-gray-400 text-[11px]">Not Provided</span>
                    )}
                  </td>

                  <td className="py-3.5 px-4">
                    {don.status === 'verified' ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#E8F8EE] text-[#1B8044] text-[11px] font-semibold">
                        <Check className="w-3 h-3 text-[#1B8044]" />
                        <span>Verified</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FEF6E7] text-[#D97706] text-[11px] font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D97706]" />
                        <span>Pending</span>
                      </span>
                    )}
                  </td>

                  <td className="py-3.5 pl-4 text-right">
                    <div className="inline-flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => toggleDonationStatus(don)}
                        title="Toggle Verification"
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                          don.status === 'verified'
                            ? 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                            : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                        }`}
                      >
                        {don.status === 'verified' ? 'Mark Pending' : 'Verify'}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteDonation(don._id)}
                        title="Delete Record"
                        className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
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
  );
}

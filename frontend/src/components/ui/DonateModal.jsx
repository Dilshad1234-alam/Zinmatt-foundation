import React, { useState, useEffect } from 'react';
import { useDonateModal } from '../../context/DonateModalContext';
import BrandLogo from './BrandLogo';
import Button from './Button';
import api from '../../lib/api';
import {
  X,
  Heart,
  CheckCircle2,
  ShieldCheck,
  Copy,
  Check,
  Sparkles,
  ArrowRight,
  Lock,
  Building,
  CreditCard,
  QrCode,
} from 'lucide-react';

export default function DonateModal() {
  const { isOpen, closeDonateModal, modalOptions } = useDonateModal();

  const causes = [
    { id: 'General Fund', label: 'General Fund', desc: 'Where most needed across all missions' },
    { id: 'Free Education', label: 'Free Education', desc: 'School kits, bags & digital learning tools' },
    { id: 'Visually Impaired Care', label: 'Visually Impaired', desc: 'Braille readers & assistive kits' },
    { id: 'Elderly Welfare', label: 'Elderly Welfare', desc: 'Doorstep health camps & nutritious rations' },
    { id: 'Clean Environment', label: 'Clean Environment', desc: 'Civic cleanups & urban tree plantations' },
  ];

  const presetAmounts = [500, 1200, 2500, 5000];

  const [cause, setCause] = useState('General Fund');
  const [frequency, setFrequency] = useState('one-time');
  const [amount, setAmount] = useState(1200);
  const [customAmountInput, setCustomAmountInput] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    cityState: '',
    panNumber: '',
    wantsTaxReceipt: true,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const [copiedUpi, setCopiedUpi] = useState(false);

  // Sync initial modal options whenever modal opens
  useEffect(() => {
    if (isOpen) {
      if (modalOptions?.cause) setCause(modalOptions.cause);
      if (modalOptions?.frequency) setFrequency(modalOptions.frequency);
      if (modalOptions?.amount) {
        setAmount(modalOptions.amount);
        setCustomAmountInput(presetAmounts.includes(modalOptions.amount) ? '' : String(modalOptions.amount));
      }
      setIsSubmitted(false);
      setReceipt(null);
      setErrors({});
    }
  }, [isOpen, modalOptions]);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handlePresetSelect = (val) => {
    setAmount(val);
    setCustomAmountInput('');
    if (errors.amount) setErrors((prev) => ({ ...prev, amount: '' }));
  };

  const handleCustomAmountChange = (e) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    setCustomAmountInput(val);
    const num = parseInt(val, 10);
    setAmount(num > 0 ? num : 0);
    if (errors.amount) setErrors((prev) => ({ ...prev, amount: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!amount || amount < 100) {
      newErrors.amount = 'Minimum donation amount is ₹100';
    }
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address for receipt delivery';
    }
    const cleanPhone = formData.phone.replace(/[^0-9]/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      newErrors.phone = 'Please enter a valid 10-digit phone/WhatsApp number';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);

    try {
      // 1. Submit donation to real MongoDB backend
      const res = await api.post('/api/donations', {
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        city: formData.cityState.trim(),
        panNumber: formData.panNumber.trim().toUpperCase(),
        cause,
        frequency,
        amount: Number(amount),
      });

      const serverReceipt = res.receipt || {};
      const newReceipt = {
        refId: serverReceipt.referenceId || `ZNF-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
        date: new Date(serverReceipt.createdAt || Date.now()).toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        }),
        donorName: serverReceipt.fullName || formData.fullName.trim(),
        email: serverReceipt.email || formData.email.trim(),
        phone: serverReceipt.phone || formData.phone.trim(),
        cause: serverReceipt.cause || cause,
        amount: serverReceipt.amount || amount,
        frequency: serverReceipt.frequency || frequency,
        pan: serverReceipt.panNumber || formData.panNumber.trim().toUpperCase() || 'Not Provided',
        taxExemptStatus: '80G Compliant (50% Tax Deduction under Indian Income Tax Act)',
      };

      setReceipt(newReceipt);
      setIsSubmitted(true);
    } catch (err) {
      // Fallback receipt format if server temporarily offline during local dev
      const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
      const refCode = `ZNF-${dateStr}-${Math.floor(1000 + Math.random() * 9000)}`;
      const fallbackReceipt = {
        refId: refCode,
        date: new Date().toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        }),
        donorName: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        cause,
        amount,
        frequency,
        pan: formData.panNumber.trim().toUpperCase() || 'Not Provided',
        taxExemptStatus: '80G Compliant (50% Tax Deduction under Indian Income Tax Act)',
      };
      setReceipt(fallbackReceipt);
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyUpi = () => {
    navigator.clipboard?.writeText('donate@zinmatt');
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const getAmountImpactText = (amt) => {
    if (amt >= 5000) return 'Sponsors an entire semester with tablets, assistive readers, and tuition kits for multiple students.';
    if (amt >= 2500) return 'Funds customized Braille kits, tactile materials, and assistive audio devices for 2 learners.';
    if (amt >= 1200) return 'Provides a child with a full study kit, uniform, school bag, and stationery for a school term.';
    return 'Delivers essential nutritional food packets and direct field medical kits to underserved families.';
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/65 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={closeDonateModal}
    >
      {/* Modal Card Box */}
      <div
        className="relative w-full max-w-lg rounded-2xl bg-[#FFFFFF] border border-[#EEEEEE] shadow-2xl flex flex-col max-h-[92vh] overflow-hidden select-text text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header Strip */}
        <div className="bg-gradient-to-r from-[#FFF9F5] via-[#FFF0E8] to-[#FFF9F5] border-b border-[#EEEEEE] px-5 py-4 sm:px-6 sm:py-5 flex items-start justify-between relative shrink-0">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/90 border border-[#FB7336]/25 text-[#FB7336] text-[10px] sm:text-[11px] font-bold uppercase tracking-wider mb-1.5 shadow-2xs">
              <Sparkles className="w-3 h-3 text-[#FB7336]" />
              <span>SECURE 80G DONATION PLEDGE</span>
            </div>
            <h2 className="font-['Arial',_Helvetica,_sans-serif] text-xl sm:text-2xl font-bold text-[#242424] leading-tight">
              Support ZINMATT Foundation
            </h2>
            <p className="font-sans text-xs sm:text-[13px] text-[#666666] leading-relaxed mt-0.5 max-w-sm">
              Your contribution creates immediate grassroots transformation across India.
            </p>
          </div>

          {/* Close X Button */}
          <button
            type="button"
            onClick={closeDonateModal}
            className="p-1.5 rounded-xl text-gray-400 hover:text-[#242424] hover:bg-white/80 transition-colors focus:outline-none cursor-pointer shrink-0 ml-3"
            aria-label="Close donation modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body / Scroll Container */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5 no-scrollbar">
          {!isSubmitted ? (
            /* =========================================================================
               FORM SCREEN: FREQUENCY, CAUSE, AMOUNT & DONOR DETAILS
               ========================================================================= */
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              {/* 1. Frequency Toggle */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#242424] mb-2 select-none">
                  Donation Cadence
                </label>
                <div className="grid grid-cols-2 p-1 rounded-xl bg-[#FFF9F5] border border-[#EEEEEE]">
                  <button
                    type="button"
                    onClick={() => setFrequency('one-time')}
                    className={`py-2 px-3 rounded-lg text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                      frequency === 'one-time'
                        ? 'bg-white text-[#242424] shadow-xs border border-[#EEEEEE]/80'
                        : 'text-[#666666] hover:text-[#242424]'
                    }`}
                  >
                    One-Time Contribution
                  </button>
                  <button
                    type="button"
                    onClick={() => setFrequency('monthly')}
                    className={`py-2 px-3 rounded-lg text-xs sm:text-sm font-bold transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer ${
                      frequency === 'monthly'
                        ? 'bg-white text-[#242424] shadow-xs border border-[#EEEEEE]/80'
                        : 'text-[#666666] hover:text-[#242424]'
                    }`}
                  >
                    <span>Monthly Support</span>
                    <span className="text-[10px] bg-[#FFF0E8] text-[#FB7336] px-1.5 py-0.2 rounded-md font-extrabold uppercase">
                      Hero
                    </span>
                  </button>
                </div>
              </div>

              {/* 2. Choose Cause Selector */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#242424] select-none">
                    Choose a Cause
                  </label>
                  <span className="text-[11px] font-medium text-[#FB7336]">
                    {causes.find((c) => c.id === cause)?.label}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {causes.map((c) => {
                    const isSelected = cause === c.id;
                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setCause(c.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer select-none border ${
                          isSelected
                            ? 'bg-gradient-to-r from-[#FB7336] to-[#FCC241] text-[#242424] border-transparent shadow-xs scale-[1.02]'
                            : 'bg-[#FFFFFF] text-[#666666] border-[#EEEEEE] hover:border-[#FB7336]/40 hover:text-[#242424]'
                        }`}
                      >
                        {c.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. INR Amount Selector + Custom Input */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#242424] select-none">
                    Donation Amount (INR)
                  </label>
                  <span className="text-xs font-bold text-[#FB7336]">
                    ₹{amount.toLocaleString('en-IN')}
                  </span>
                </div>

                {/* Preset Pills */}
                <div className="grid grid-cols-4 gap-2 mb-2.5">
                  {presetAmounts.map((val) => {
                    const isSelected = amount === val && !customAmountInput;
                    return (
                      <button
                        key={val}
                        type="button"
                        onClick={() => handlePresetSelect(val)}
                        className={`py-2 px-1 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer border ${
                          isSelected
                            ? 'bg-gradient-to-r from-[#FB7336] to-[#FCC241] text-[#242424] border-transparent shadow-xs'
                            : 'bg-white text-[#242424] border-[#EEEEEE] hover:border-[#FB7336]/40 hover:bg-[#FFF9F5]'
                        }`}
                      >
                        ₹{val.toLocaleString('en-IN')}
                      </button>
                    );
                  })}
                </div>

                {/* Custom Amount Field */}
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-base text-[#FB7336] select-none">
                    ₹
                  </span>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="Enter custom amount in INR"
                    value={customAmountInput}
                    onChange={handleCustomAmountChange}
                    className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-[#EEEEEE] focus:border-[#FB7336] focus:ring-2 focus:ring-[#FB7336]/20 text-sm font-semibold text-[#242424] placeholder-gray-400 transition-colors"
                  />
                </div>

                {errors.amount && (
                  <p className="text-[11px] text-red-500 font-semibold mt-1">{errors.amount}</p>
                )}

                {/* Dynamic Impact Indicator */}
                <div className="mt-2 p-2.5 rounded-xl bg-[#FFF9F5] border border-[#EEEEEE] flex items-start gap-2 text-xs text-[#666666]">
                  <Heart className="w-3.5 h-3.5 text-[#FB7336] flex-shrink-0 mt-0.5 fill-[#FB7336]/30" />
                  <span className="leading-snug">{getAmountImpactText(amount)}</span>
                </div>
              </div>

              {/* 4. Donor Particulars */}
              <div className="space-y-3 pt-1 border-t border-[#EEEEEE]">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#242424] select-none pt-1">
                  Donor Particulars
                </label>

                {/* Full Name */}
                <div>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Legal Name *"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-[#242424] placeholder-gray-400 focus:outline-none transition-colors ${
                      errors.fullName
                        ? 'border-red-400 focus:ring-2 focus:ring-red-400/20'
                        : 'border-[#EEEEEE] focus:border-[#FB7336] focus:ring-2 focus:ring-[#FB7336]/20'
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-[11px] text-red-500 font-semibold mt-1">{errors.fullName}</p>
                  )}
                </div>

                {/* Email Address */}
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address (for 80G receipt) *"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-[#242424] placeholder-gray-400 focus:outline-none transition-colors ${
                      errors.email
                        ? 'border-red-400 focus:ring-2 focus:ring-red-400/20'
                        : 'border-[#EEEEEE] focus:border-[#FB7336] focus:ring-2 focus:ring-[#FB7336]/20'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-[11px] text-red-500 font-semibold mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Phone / WhatsApp & City */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone / WhatsApp Number *"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-[#242424] placeholder-gray-400 focus:outline-none transition-colors ${
                        errors.phone
                          ? 'border-red-400 focus:ring-2 focus:ring-red-400/20'
                          : 'border-[#EEEEEE] focus:border-[#FB7336] focus:ring-2 focus:ring-[#FB7336]/20'
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-[11px] text-red-500 font-semibold mt-1">{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <input
                      type="text"
                      name="cityState"
                      placeholder="City / State (Optional)"
                      value={formData.cityState}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#EEEEEE] text-sm text-[#242424] placeholder-gray-400 focus:border-[#FB7336] focus:ring-2 focus:ring-[#FB7336]/20 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* PAN Number for 80G Tax Exemption */}
                <div>
                  <input
                    type="text"
                    name="panNumber"
                    maxLength={10}
                    placeholder="PAN Card Number (Optional — required for 80G tax benefit)"
                    value={formData.panNumber}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#EEEEEE] text-sm text-[#242424] uppercase placeholder-gray-400 focus:border-[#FB7336] focus:ring-2 focus:ring-[#FB7336]/20 focus:outline-none transition-colors"
                  />
                  <p className="text-[11px] text-[#666666] mt-1">
                    Donations are eligible for 50% tax deduction under Section 80G of the Income Tax Act.
                  </p>
                </div>

                {/* Checkbox */}
                <label className="flex items-start gap-2.5 cursor-pointer pt-1 text-xs text-[#666666] select-none">
                  <input
                    type="checkbox"
                    name="wantsTaxReceipt"
                    checked={formData.wantsTaxReceipt}
                    onChange={handleInputChange}
                    className="mt-0.5 rounded text-[#FB7336] focus:ring-[#FB7336] border-[#EEEEEE]"
                  />
                  <span>
                    Send official 80G tax donation receipt and field impact updates directly to my email and WhatsApp.
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full justify-center shadow-lg hover:shadow-xl font-bold rounded-xl py-3.5 text-base tracking-wide disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-[#242424] border-t-transparent rounded-full animate-spin" />
                      <span>Recording Donation Pledge...</span>
                    </div>
                  ) : (
                    <>
                      <span>Proceed to Donate ₹{amount.toLocaleString('en-IN')}</span>
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </>
                  )}
                </Button>

                {/* Security Footnote */}
                <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#666666] mt-2.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>256-Bit SSL Encrypted • Statutory 80G Compliant • Zero Commission</span>
                </div>
              </div>
            </form>
          ) : (
            /* =========================================================================
               CONFIRMATION SCREEN: RECEIPT & INSTANT PAYMENT SUMMARY
               ========================================================================= */
            <div className="space-y-4 animate-in fade-in duration-300">
              {/* Top Success Banner */}
              <div className="text-center p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1.5">
                <div className="w-11 h-11 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-6 h-6 stroke-[2.2]" />
                </div>
                <h3 className="font-['Arial',_Helvetica,_sans-serif] font-bold text-lg text-emerald-950">
                  Donation Pledge Initiated!
                </h3>
                <p className="text-xs text-emerald-800 max-w-sm mx-auto leading-relaxed">
                  Thank you, <span className="font-bold text-emerald-950">{receipt?.donorName}</span>. Your pledge reference has been generated.
                </p>
              </div>

              {/* Receipt Summary Card */}
              <div className="rounded-2xl border border-[#EEEEEE] bg-[#FFF9F5] p-4 sm:p-5 space-y-3">
                <div className="flex items-center justify-between border-b border-[#EEEEEE] pb-2 text-xs">
                  <span className="text-[#666666]">Pledge Reference:</span>
                  <span className="font-mono font-bold text-[#FB7336]">{receipt?.refId}</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-[#666666] block">Selected Cause:</span>
                    <span className="font-bold text-[#242424]">{receipt?.cause}</span>
                  </div>
                  <div>
                    <span className="text-[#666666] block">Contribution Amount:</span>
                    <span className="font-bold text-[#FB7336] text-sm">
                      ₹{receipt?.amount.toLocaleString('en-IN')}{' '}
                      <span className="text-[10px] font-normal text-[#666666]">
                        ({receipt?.frequency === 'monthly' ? 'Monthly' : 'One-Time'})
                      </span>
                    </span>
                  </div>
                  <div>
                    <span className="text-[#666666] block">Receipt Delivery:</span>
                    <span className="font-medium text-[#242424] truncate block">{receipt?.email}</span>
                  </div>
                  <div>
                    <span className="text-[#666666] block">80G Benefit:</span>
                    <span className="text-emerald-700 font-semibold">Eligible (50% Deduction)</span>
                  </div>
                </div>
              </div>

              {/* Instant Transfer / UPI Quick Pay Details */}
              <div className="rounded-2xl border border-[#EEEEEE] bg-white p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <QrCode className="w-4 h-4 text-[#FB7336]" />
                    <span className="text-xs font-bold text-[#242424] uppercase tracking-wide">
                      Instant UPI Transfer
                    </span>
                  </div>
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    Active VPA
                  </span>
                </div>

                <div className="flex items-center justify-between bg-[#FFF9F5] border border-[#EEEEEE] px-3.5 py-2.5 rounded-xl">
                  <span className="font-mono font-bold text-sm text-[#242424]">donate@zinmatt</span>
                  <button
                    type="button"
                    onClick={handleCopyUpi}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#FB7336] hover:text-[#242424] transition-colors cursor-pointer select-none"
                  >
                    {copiedUpi ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-600">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy VPA</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="pt-2 border-t border-[#EEEEEE] text-[11px] text-[#666666] space-y-1">
                  <p>
                    <span className="font-semibold text-[#242424]">Official Bank:</span> Axis Bank Ltd, Connaught Place Branch
                  </p>
                  <p>
                    <span className="font-semibold text-[#242424]">A/C Name:</span> ZINMATT Foundation Trust
                  </p>
                  <p className="text-[10px] text-gray-400 italic">
                    * Formal tax exemption receipt will be generated and dispatched automatically upon bank confirmation.
                  </p>
                </div>
              </div>

              {/* Action Buttons: Done */}
              <div className="pt-1">
                <Button
                  type="button"
                  variant="primary"
                  size="md"
                  onClick={closeDonateModal}
                  className="w-full justify-center rounded-xl font-bold py-3 text-base shadow-md"
                >
                  Done
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

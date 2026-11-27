import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BrandLogo from '../../components/ui/BrandLogo';
import { Lock, Mail, Eye, EyeOff, ShieldCheck, ArrowRight, AlertCircle } from 'lucide-react';
import api from '../../lib/api';

/**
 * Hidden Admin Login Page (Authorized Access Only)
 * URL: /admin-login (Hidden from public Navbar and Footer)
 */
export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim() || !password.trim()) {
      setErrorMessage('Please enter both your authorized administrative email and password.');
      return;
    }

    setIsLoading(true);

    try {
      // 1. Authenticate with backend API
      const data = await api.post('/api/admin/login', {
        email: email.trim(),
        password,
        rememberMe,
      });

      if (data && data.success) {
        localStorage.setItem(
          'zinmatt_admin_user',
          JSON.stringify(data.user || { email: email.trim(), name: 'ZINMATT Admin', role: 'Super Admin' })
        );
        navigate('/admin');
        return;
      }
    } catch (err) {
      if (err.status === 401 || err.status === 403) {
        setErrorMessage(err.message || 'Invalid administrative credentials. Access denied.');
      } else {
        setErrorMessage(
          err.message || 'Unable to connect to administration server. Please verify backend service.'
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF9F5] flex flex-col justify-center items-center px-4 py-8 font-['Inter',_sans-serif] text-[#242424] antialiased">
      {/* Decorative Warm Background Glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#FB7336]/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-[#FCC241]/10 blur-3xl" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Brand Header */}
        <div className="flex flex-col items-center mb-6 text-center">
          <BrandLogo size="lg" className="mb-4" />
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF0E8] border border-[#FB7336]/20 text-[#FB7336] text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Authorized Access Only</span>
          </div>
          <h1 className="font-['Arial',_Helvetica,_sans-serif] font-black text-2xl sm:text-3xl text-[#242424] mt-3 tracking-tight">
            ZINMATT Foundation Admin
          </h1>
          <p className="text-xs sm:text-sm text-[#666666] mt-1.5 max-w-xs">
            Sign in to access the philanthropic management console, volunteers, and field records.
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-[#FFFFFF] rounded-2xl border border-[#EEEEEE] shadow-[0_12px_32px_rgba(0,0,0,0.06)] p-6 sm:p-8">
          {errorMessage && (
            <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Address */}
            <div>
              <label className="block text-xs font-semibold text-[#242424] mb-1.5">
                Authorized Email Address <span className="text-[#FB7336]">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#888888]">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@zinmattfoundation.org"
                  required
                  autoFocus
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#EEEEEE] bg-[#FFFDFB] text-sm text-[#242424] placeholder-gray-400 focus:outline-none focus:border-[#FB7336] focus:ring-2 focus:ring-[#FB7336]/15 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-[#242424]">
                  Console Password <span className="text-[#FB7336]">*</span>
                </label>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#888888]">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="w-full pl-10 pr-11 py-3 rounded-xl border border-[#EEEEEE] bg-[#FFFDFB] text-sm text-[#242424] placeholder-gray-400 focus:outline-none focus:border-[#FB7336] focus:ring-2 focus:ring-[#FB7336]/15 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#888888] hover:text-[#242424] transition-colors focus:outline-none"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-[#EEEEEE] text-[#FB7336] focus:ring-[#FB7336]/30 accent-[#FB7336]"
                />
                <span className="text-xs text-[#666666]">Keep me signed in</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#FB7336] to-[#FCC241] text-[#242424] font-bold text-sm tracking-wide shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 hover:opacity-95 active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed group"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-[#242424] border-t-transparent rounded-full animate-spin" />
                  <span>Verifying Credentials...</span>
                </div>
              ) : (
                <>
                  <span>Sign In to Console</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Security Notice */}
        <p className="text-center text-[11px] text-[#888888] mt-6 leading-relaxed">
          Access to this philanthropic administrative console is strictly monitored and restricted to authorized foundation personnel only.
        </p>
      </div>
    </div>
  );
}

import React from 'react';

/**
 * Standardized Card Component
 * - #FFFFFF background (or optional surface variant)
 * - rounded-2xl (18px border-radius)
 * - 1px solid #EEEEEE border
 * - consistent padding (p-6 sm:p-7)
 * - subtle shadow
 * - gentle hover elevation (hover:-translate-y-1 transition-all duration-300)
 */
export default function Card({
  children,
  surface = 'white', // 'white' (#FFFFFF) | 'warm' (#FFF9F5) | 'light-orange' (#FFF0E8)
  hoverable = true,
  className = '',
  padding = 'default', // 'none' | 'sm' | 'default' (p-6 sm:p-7) | 'lg'
  ...props
}) {
  const surfaceClasses = {
    white: 'bg-[#FFFFFF]',
    warm: 'bg-[#FFF9F5]',
    'light-orange': 'bg-[#FFF0E8]',
  };

  const paddingClasses = {
    none: 'p-0',
    sm: 'p-4 sm:p-5',
    default: 'p-6 sm:p-7',
    lg: 'p-8 sm:p-10',
  };

  const hoverClasses = hoverable
    ? 'hover:-translate-y-1 hover:shadow-[0_12px_24px_-6px_rgba(0,0,0,0.06),0_6px_12px_-4px_rgba(0,0,0,0.04)] hover:border-[#FB7336]/20'
    : '';

  return (
    <div
      className={`rounded-2xl border border-[#EEEEEE] shadow-[0_2px_10px_rgba(0,0,0,0.03)] transition-all duration-300 ${
        surfaceClasses[surface] || surfaceClasses.white
      } ${paddingClasses[padding] || paddingClasses.default} ${hoverClasses} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

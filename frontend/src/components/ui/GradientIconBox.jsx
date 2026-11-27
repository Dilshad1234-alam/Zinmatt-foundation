import React from 'react';

/**
 * GradientIconBox Component
 * Standardized 48px × 48px (h-12 w-12 rounded-xl) icon wrapper
 * using the #FB7336 → #FCC241 gradient background for Lucide icons.
 */
export default function GradientIconBox({
  icon: Icon,
  children,
  size = 'md', // 'sm' (40x40), 'md' (48x48), 'lg' (56x56)
  className = '',
  iconClassName = '',
  ...props
}) {
  const sizeMap = {
    sm: { box: 'w-10 h-10 rounded-lg', icon: 'w-5 h-5' },
    md: { box: 'w-12 h-12 rounded-xl', icon: 'w-6 h-6' }, // 48px x 48px
    lg: { box: 'w-14 h-14 rounded-2xl', icon: 'w-7 h-7' },
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  return (
    <div
      className={`inline-flex items-center justify-center flex-shrink-0 bg-gradient-to-r from-[#FB7336] to-[#FCC241] shadow-[0_4px_12px_0_rgba(251,115,54,0.25)] text-[#242424] ${currentSize.box} ${className}`}
      {...props}
    >
      {Icon ? (
        <Icon className={`${currentSize.icon} stroke-[2.2] text-[#242424] ${iconClassName}`} />
      ) : (
        children
      )}
    </div>
  );
}

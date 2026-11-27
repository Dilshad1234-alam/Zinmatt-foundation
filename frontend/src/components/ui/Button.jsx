import React from 'react';

/**
 * Standardized Button Component
 * - rounded-xl (12px radius)
 * - smooth hover transition
 * - variant="primary": exact #FB7336 → #FCC241 linear gradient, #242424 bold text, subtle shadow
 * - variant="secondary": #FFFFFF background, 1px solid #EEEEEE border, #242424 text, #FFF0E8 hover
 * - variant="white": high-contrast #FFFFFF button with #242424 text (for gradient CTA banners)
 */
export default function Button({
  children,
  variant = 'primary', // 'primary' | 'secondary' | 'white'
  size = 'md', // 'sm' | 'md' | 'lg'
  className = '',
  icon: Icon,
  iconPosition = 'left',
  disabled = false,
  as: Component = 'button',
  ...props
}) {
  const baseClasses =
    'inline-flex items-center justify-center font-bold rounded-xl transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-[#FB7336]/40 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none select-none cursor-pointer';

  const sizeClasses = {
    sm: 'text-sm px-4 py-2 gap-1.5 font-semibold',
    md: 'text-base px-6 py-3 gap-2 font-bold',
    lg: 'text-lg px-8 py-3.5 gap-2.5 font-bold',
  };

  const variantClasses = {
    // Exact primary brand gradient (#FB7336 to #FCC241), #242424 bold text, subtle shadow
    primary:
      'bg-gradient-to-r from-[#FB7336] to-[#FCC241] text-[#242424] shadow-[0_4px_14px_0_rgba(251,115,54,0.22)] hover:shadow-[0_6px_20px_0_rgba(251,115,54,0.35)] hover:brightness-105',
    // Secondary: Pure White #FFFFFF background, 1px solid #EEEEEE border, #242424 text, and #FFF0E8 hover state
    secondary:
      'bg-[#FFFFFF] border border-[#EEEEEE] text-[#242424] hover:bg-[#FFF0E8] hover:border-[#FB7336]/30 shadow-sm',
    // White: High-contrast #FFFFFF button with #242424 text (for gradient CTA banners)
    white:
      'bg-[#FFFFFF] text-[#242424] shadow-md hover:bg-[#FFF9F5] hover:shadow-lg',
  };

  return (
    <Component
      className={`${baseClasses} ${sizeClasses[size] || sizeClasses.md} ${
        variantClasses[variant] || variantClasses.primary
      } ${className}`}
      disabled={disabled}
      {...props}
    >
      {Icon && iconPosition === 'left' && (
        <Icon className={size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-5 h-5' : 'w-4.5 h-4.5'} />
      )}
      <span className="inline-flex items-center gap-2 whitespace-nowrap">{children}</span>
      {Icon && iconPosition === 'right' && (
        <Icon className={size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-5 h-5' : 'w-4.5 h-4.5'} />
      )}
    </Component>
  );
}

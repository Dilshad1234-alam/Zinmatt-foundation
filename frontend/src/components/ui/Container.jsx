import React from 'react';

/**
 * Standardized responsive page container for ZINMATT Foundation
 * Expansive wide layout: w-full max-w-[1760px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10
 * Removes artificial narrow borders and large empty side gutters on desktop
 */
export default function Container({
  children,
  className = '',
  size = 'default', // 'default' (1760px), 'narrow' (5xl), 'wide' (1840px), 'full'
  ...props
}) {
  const sizeClasses = {
    narrow: 'max-w-5xl',
    default: 'max-w-[1760px]',
    wide: 'max-w-[1840px]',
    full: 'max-w-full',
  };

  const selectedSize = sizeClasses[size] || sizeClasses.default;

  return (
    <div
      className={`w-full ${selectedSize} mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

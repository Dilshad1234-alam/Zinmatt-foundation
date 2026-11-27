import React from 'react';

/**
 * Standardized SectionHeader Component
 * - Optional uppercase tag (#FB7336 / #FFF0E8 pill)
 * - Arial H2 (#242424) (32px–40px desktop)
 * - Inter subtitle (#666666) (16px–18px)
 */
export default function SectionHeader({
  tag,
  tagIcon: TagIcon,
  title,
  subtitle,
  align = 'center', // 'left' | 'center' | 'right'
  className = '',
  titleClassName = '',
  subtitleClassName = '',
  ...props
}) {
  const alignMap = {
    left: 'text-left items-start',
    center: 'text-center items-center mx-auto',
    right: 'text-right items-end ml-auto',
  };

  return (
    <div
      className={`flex flex-col mb-4 sm:mb-5 max-w-4xl ${
        alignMap[align] || alignMap.center
      } ${className}`}
      {...props}
    >
      {/* Optional Uppercase Tag / Pill Badge */}
      {tag && (
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF0E8] border border-[#FB7336]/20 text-[#FB7336] text-xs font-semibold tracking-wider uppercase mb-2 sm:mb-3 select-none">
          {TagIcon && <TagIcon className="w-3.5 h-3.5" />}
          <span>{tag}</span>
        </div>
      )}

      {/* Mandatory Arial Heading (#242424) */}
      {title && (
        <h2
          className={`font-['Arial',_Helvetica,_sans-serif] text-[#242424] font-bold text-3xl sm:text-[36px] lg:text-[40px] leading-snug tracking-tight ${titleClassName}`}
        >
          {title}
        </h2>
      )}

      {/* Inter Subtitle (#666666) */}
      {subtitle && (
        <p
          className={`font-sans text-[#666666] text-sm sm:text-base leading-relaxed mt-2 sm:mt-2.5 max-w-3xl ${subtitleClassName}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

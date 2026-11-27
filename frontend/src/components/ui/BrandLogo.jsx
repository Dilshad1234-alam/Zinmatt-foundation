import React, { useState } from 'react';

/**
 * BrandLogo Component
 * Renders /zinmatt-logo.png in its original proportions with clear space
 * alongside the ZINMATT Foundation Arial wordmark (never recolor, crop, or distort).
 */
export default function BrandLogo({
  className = '',
  imageClassName = '',
  size = 'md', // 'sm', 'md', 'lg'
  variant = 'default', // 'default' (dark text), 'white' (light text on dark footers)
  showWordmark = true,
  wordmarkClassName = '',
}) {
  const [imageError, setImageError] = useState(false);

  const dimensionMap = {
    sm: { img: 'h-8 w-8', text: 'text-base', sub: 'text-[11px]' },
    md: { img: 'h-10 w-10', text: 'text-lg sm:text-xl', sub: 'text-xs' },
    lg: { img: 'h-12 w-12', text: 'text-xl sm:text-2xl', sub: 'text-sm' },
  };

  const currentSize = dimensionMap[size] || dimensionMap.md;
  const isWhite = variant === 'white';

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Logo Emblem Container with preserved proportions and clear space */}
      <div className="relative flex items-center justify-center flex-shrink-0">
        {!imageError ? (
          <img
            src="/zinmatt-logo1.png"
            alt="ZINMATT Foundation Emblem"
            className={`${currentSize.img} object-contain transition-transform duration-200 hover:scale-105 ${imageClassName}`}
            onError={() => setImageError(true)}
          />
        ) : (
          /* High-Fidelity SVG Fallback matching Brand Identity */
          <div
            className={`${currentSize.img} rounded-xl bg-gradient-to-r from-[#FB7336] to-[#FCC241] p-[2px] shadow-sm flex items-center justify-center`}
          >
            <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
              <svg
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-4/5 h-4/5"
              >
                <circle cx="20" cy="20" r="18" fill="url(#brandGrad)" />
                <path
                  d="M13 14H27L17 26H27"
                  stroke="#FFFFFF"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="27" cy="14" r="2" fill="#FFFFFF" />
                <defs>
                  <linearGradient id="brandGrad" x1="0" y1="0" x2="40" y2="40">
                    <stop offset="0%" stopColor="#FB7336" />
                    <stop offset="100%" stopColor="#FCC241" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* Mandatory Arial Wordmark */}
      {showWordmark && (
        <div className={`flex flex-col leading-none font-['Arial',_Helvetica,_sans-serif] ${wordmarkClassName}`}>
          <div className="flex items-center gap-1.5">
            <span
              className={`font-black tracking-tight ${currentSize.text} ${
                isWhite ? 'text-[#FCC241]' : 'text-[#FB7336]'
              }`}
            >
              ZINMATT
            </span>
            <span
              className={`font-normal tracking-wide uppercase ${currentSize.sub} ${
                isWhite ? 'text-[#FCC241]' : 'text-[#FB7336]'
              }`}
            >
              Foundation
            </span>
          </div>
          <span
            className={`text-[10px] font-medium tracking-wider uppercase mt-0.5 ${
              isWhite ? 'text-gray-400' : 'text-[#666666]'
            }`}
          >
            Empowering Lives
          </span>
        </div>
      )}
    </div>
  );
}

import React, { useState, useRef, useEffect } from 'react';

/**
 * Standardized Mobile Card Carousel for ZINMATT Foundation
 * On mobile viewports (< md): Renders a horizontal touch-swipe track with
 * centered gradient pagination dots.
 * On desktop (md:): Renders the specified desktop grid cleanly.
 */
export default function MobileCardCarousel({
  items,
  renderItem,
  children,
  desktopGridClassName = '',
  className = '',
  itemClassName = 'w-[88vw] max-w-[360px] shrink-0 snap-center',
  keyExtractor = (item, index) => item?.id || index,
  resetKey,
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef(null);

  const count = items ? items.length : React.Children.count(children);

  // Smoothly reset carousel to slide 0 when category filter or dependencies change
  useEffect(() => {
    if (resetKey !== undefined) {
      setActiveIndex(0);
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      }
    }
  }, [resetKey]);

  const handleScroll = (e) => {
    const container = e.currentTarget;
    if (!container || !container.children.length) return;
    const scrollLeft = container.scrollLeft;
    const firstChild = container.children[0];
    const itemWidth = firstChild ? firstChild.offsetWidth + 16 : 300; // 16px is gap-4
    if (itemWidth > 0) {
      const newIndex = Math.round(scrollLeft / itemWidth);
      setActiveIndex(Math.min(Math.max(newIndex, 0), count - 1));
    }
  };

  const scrollToSlide = (index) => {
    if (scrollContainerRef.current && scrollContainerRef.current.children[index]) {
      scrollContainerRef.current.children[index].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
      setActiveIndex(index);
    }
  };

  if (count === 0) return null;

  // Build slides for mobile track
  const mobileSlides = items
    ? items.map((item, index) => (
        <div key={keyExtractor(item, index)} className={itemClassName}>
          {renderItem ? renderItem(item, index) : item}
        </div>
      ))
    : React.Children.map(children, (child, index) => (
        <div key={child?.key || index} className={itemClassName}>
          {child}
        </div>
      ));

  return (
    <div className={`w-full ${className}`}>
      {/* Mobile Track (< md) */}
      <div className="block md:hidden w-full">
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-1 pb-3 no-scrollbar"
        >
          {mobileSlides}
        </div>

        {/* Centered Pagination Dots */}
        {count > 1 && (
          <div className="flex items-center justify-center gap-2 mt-3 select-none">
            {Array.from({ length: count }).map((_, index) => {
              const isActive = activeIndex === index;
              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => scrollToSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  className={`transition-all duration-300 rounded-full focus:outline-none cursor-pointer ${
                    isActive
                      ? 'w-6 h-2 bg-gradient-to-r from-[#FB7336] to-[#FCC241]'
                      : 'w-2 h-2 bg-[#D4D4D4] hover:bg-gray-400'
                  }`}
                />
              );
            })}
          </div>
        )}
      </div>

      {/* Desktop Grid (md:) */}
      {desktopGridClassName && (
        <div className={desktopGridClassName}>
          {items && renderItem
            ? items.map((item, index) => renderItem(item, index))
            : children}
        </div>
      )}
    </div>
  );
}

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Star, CheckCircle2, ChevronLeft, ChevronRight, Quote, Award, Play, Pause } from 'lucide-react';
import { TESTIMONIALS } from '../data/products';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const CustomerTestimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);
  const [withTransition, setWithTransition] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const { ref, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.1 });
  const trackRef = useRef<HTMLDivElement>(null);

  // Floating animation class assignment per column
  const floatingStyles = [
    'animate-float',
    'animate-float-delayed',
    'animate-float-reverse',
  ];

  // Dynamically calculate cardsPerView based on viewport
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCardsPerView(1);
      } else if (window.innerWidth < 1024) {
        setCardsPerView(2);
      } else {
        setCardsPerView(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Cloned items for infinite horizontal loop
  const extendedTestimonials = [
    ...TESTIMONIALS,
    ...TESTIMONIALS.slice(0, 3),
  ];

  const handleNext = useCallback(() => {
    setWithTransition(true);
    setCurrentIndex((prev) => prev + 1);
  }, []);

  const handlePrev = useCallback(() => {
    if (currentIndex === 0) {
      setWithTransition(false);
      setCurrentIndex(TESTIMONIALS.length);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setWithTransition(true);
          setCurrentIndex(TESTIMONIALS.length - 1);
        });
      });
    } else {
      setWithTransition(true);
      setCurrentIndex((prev) => prev - 1);
    }
  }, [currentIndex]);

  // Seamless jump from clone back to initial index after transition completes
  const handleTransitionEnd = () => {
    if (currentIndex >= TESTIMONIALS.length) {
      setWithTransition(false);
      setCurrentIndex(0);
    }
  };

  // Automatic horizontal carousel rotation timer
  useEffect(() => {
    if (isPaused || isHovered) return;

    const timer = setInterval(() => {
      handleNext();
    }, 4200);

    return () => clearInterval(timer);
  }, [isPaused, isHovered, handleNext]);

  // Touch handlers for mobile horizontal swiping
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    setIsHovered(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (diff > 45) {
      handleNext();
    } else if (diff < -45) {
      handlePrev();
    }

    setTouchStartX(null);
    setIsHovered(false);
  };

  const handleDotClick = (idx: number) => {
    setWithTransition(true);
    setCurrentIndex(idx);
  };

  const activeDotIndex = currentIndex % TESTIMONIALS.length;
  const slideWidthPercent = 100 / cardsPerView;
  const trackOffset = currentIndex * slideWidthPercent;

  return (
    <section
      ref={ref}
      id="reviews"
      className="relative w-full py-14 sm:py-20 lg:py-28 bg-[#F6F4F1] overflow-hidden"
    >
      {/* Ambient Floating Decorative Orbs in the background */}
      <div className="absolute top-12 left-10 w-72 h-72 rounded-full bg-[#8B6B4D]/5 blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-[#C9B596]/10 blur-3xl pointer-events-none animate-float-slow" />

      {/* Floating Oversized Decorative Quote Watermark */}
      <div className="absolute -top-6 right-1/4 opacity-[0.04] pointer-events-none select-none text-[#1A1A1A] animate-float-slow">
        <Quote className="w-80 h-80" strokeWidth={1} />
      </div>

      <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6">
        {/* Header with Fade-In & Slide-Down Reveal */}
        <div
          className={`flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-5 sm:gap-6 transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
          }`}
        >
          <div>
            {/* Floating Trust Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-[#EAE7E3] text-[#8B6B4D] mb-3 shadow-2xs animate-float-slow">
              <Award className="w-3.5 h-3.5 text-[#8B6B4D]" />
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.22em] font-medium font-sans">
                4.9/5 Rating from 2,400+ Homes
              </span>
            </div>

            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-[44px] font-semibold text-[#1A1A1A] tracking-tight leading-tight">
              Words From Our Discerning Clients
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#6E6E6E] font-light max-w-xl">
              Discover how our Scandinavian craftsmanship brings calm, elegance, and enduring luxury into architectural residences worldwide.
            </p>
          </div>

          {/* Carousel Controls: Play/Pause indicator and Arrow buttons */}
          <div className="flex items-center gap-2.5 sm:gap-3 self-end md:self-auto">
            {/* Auto-rotating Status & Pause Toggle */}
            <button
              onClick={() => setIsPaused((prev) => !prev)}
              aria-label={isPaused ? 'Resume auto-rotating reviews' : 'Pause auto-rotating reviews'}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#EAE7E3] text-[#6E6E6E] hover:text-[#1A1A1A] hover:border-[#8B6B4D] text-[11px] font-sans transition-all duration-300 shadow-2xs cursor-pointer"
            >
              {isPaused ? (
                <>
                  <Play className="w-3 h-3 text-[#8B6B4D] fill-[#8B6B4D]" />
                  <span className="text-[10px] sm:text-[11px] font-medium">Play</span>
                </>
              ) : (
                <>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8B6B4D] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8B6B4D]"></span>
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-medium hidden sm:inline">Auto-rotating</span>
                  <Pause className="w-3 h-3 text-[#6E6E6E] ml-0.5" />
                </>
              )}
            </button>

            {/* Previous Arrow */}
            <button
              onClick={handlePrev}
              aria-label="Previous testimonial"
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white border border-[#EAE7E3] text-[#1A1A1A] hover:bg-[#8B6B4D] hover:text-white hover:border-[#8B6B4D] transition-all duration-300 flex items-center justify-center cursor-pointer shadow-xs hover:shadow-md transform hover:-translate-x-0.5 active:scale-95"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Next Arrow */}
            <button
              onClick={handleNext}
              aria-label="Next testimonial"
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white border border-[#EAE7E3] text-[#1A1A1A] hover:bg-[#8B6B4D] hover:text-white hover:border-[#8B6B4D] transition-all duration-300 flex items-center justify-center cursor-pointer shadow-xs hover:shadow-md transform hover:translate-x-0.5 active:scale-95"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Carousel Viewport with Hover Pause and Touch Navigation */}
        <div
          className="relative w-full overflow-hidden py-4 -my-4"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Animated Horizontal Slide Track */}
          <div
            ref={trackRef}
            onTransitionEnd={handleTransitionEnd}
            className="flex flex-row -mx-2.5 sm:-mx-3.5"
            style={{
              transform: `translate3d(-${trackOffset}%, 0, 0)`,
              transition: withTransition
                ? 'transform 700ms cubic-bezier(0.2, 0.8, 0.2, 1)'
                : 'none',
            }}
          >
            {extendedTestimonials.map((item, index) => {
              const floatClass = floatingStyles[index % floatingStyles.length];

              return (
                <div
                  key={`${item.id}-${index}`}
                  className="shrink-0 px-2.5 sm:px-3.5 py-3"
                  style={{ width: `${slideWidthPercent}%` }}
                >
                  <div
                    id={`testimonial-card-${item.id}-${index}`}
                    className={`relative bg-white rounded-[22px] sm:rounded-[28px] p-5 sm:p-7 border border-[#EAE7E3]/80 shadow-[0_8px_32px_rgba(0,0,0,0.04)] hover:shadow-[0_24px_50px_rgba(139,107,77,0.14)] transition-all duration-500 flex flex-col justify-between h-full hover-pause ${floatClass}`}
                  >
                    {/* Floating Decorative Mini Quote Pin */}
                    <div className="absolute -top-3 sm:-top-3.5 right-5 sm:right-8 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#8B6B4D] text-white flex items-center justify-center shadow-md animate-float-slow">
                      <Quote className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    </div>

                    <div>
                      {/* Top User Info & Verified Badge */}
                      <div className="flex items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-5">
                        <div className="flex items-center gap-3 sm:gap-3.5">
                          <div className="relative">
                            <img
                              src={item.avatar}
                              alt={item.name}
                              referrerPolicy="no-referrer"
                              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-[#EAE7E3] shadow-xs"
                            />
                            <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#3D8B5A] border-2 border-white" />
                          </div>
                          <div>
                            <h3 className="text-sm sm:text-base font-semibold text-[#1A1A1A] leading-tight line-clamp-1">
                              {item.name}
                            </h3>
                            <p className="text-[11px] sm:text-xs text-[#6E6E6E] font-light mt-0.5 line-clamp-1">
                              {item.role} • {item.location}
                            </p>
                          </div>
                        </div>

                        {item.verified && (
                          <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] text-[#3D8B5A] bg-[#3D8B5A]/10 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full font-medium shrink-0">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Verified</span>
                          </span>
                        )}
                      </div>

                      {/* Rating Stars */}
                      <div className="flex items-center gap-1 text-amber-500 mb-3 sm:mb-4">
                        {[...Array(item.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-400 text-amber-400" />
                        ))}
                        <span className="text-xs font-semibold text-[#1A1A1A] ml-1.5">5.0</span>
                      </div>

                      {/* Quote Text */}
                      <blockquote className="text-xs sm:text-[14px] text-[#2C2C2C] font-light leading-relaxed mb-5 sm:mb-6 italic line-clamp-4">
                        "{item.quote}"
                      </blockquote>
                    </div>

                    {/* Acquired Piece Footer with Thumbnail */}
                    <div className="pt-3.5 sm:pt-4 border-t border-[#EAE7E3]/70 flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#F8F7F5] overflow-hidden border border-[#EAE7E3] shrink-0 p-1 flex items-center justify-center group-hover:scale-105 transition-transform">
                          <img
                            src={item.productImage}
                            alt={item.productPurchased}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="min-w-0">
                          <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-[#8B6B4D] block font-sans font-medium">
                            Acquired Piece
                          </span>
                          <span className="text-xs font-semibold text-[#1A1A1A] truncate block">
                            {item.productPurchased}
                          </span>
                        </div>
                      </div>

                      <span className="text-[10px] sm:text-[11px] text-[#6E6E6E] font-light bg-[#F8F7F5] px-2 py-0.5 rounded-full border border-[#EAE7E3]/60 shrink-0 ml-2">
                        Verified Buyer
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex justify-center items-center gap-2 mt-8 sm:mt-10">
          {TESTIMONIALS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => handleDotClick(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                activeDotIndex === idx
                  ? 'w-8 bg-[#8B6B4D]'
                  : 'w-2 bg-[#EAE7E3] hover:bg-[#8B6B4D]/40'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

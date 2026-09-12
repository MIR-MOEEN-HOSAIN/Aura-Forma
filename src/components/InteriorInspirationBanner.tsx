import React from 'react';
import { ArrowRight, Sparkles, Calendar } from 'lucide-react';
import { ASSET_IMAGES } from '../data/products';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface InteriorInspirationBannerProps {
  onBookConsultation: () => void;
}

export const InteriorInspirationBanner: React.FC<InteriorInspirationBannerProps> = ({
  onBookConsultation,
}) => {
  const { ref, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.15 });

  return (
    <section
      ref={ref}
      id="inspiration"
      className="relative w-full py-14 sm:py-20 lg:py-28 bg-[#F8F7F5] overflow-hidden"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div
          className={`relative rounded-[24px] sm:rounded-[32px] overflow-hidden min-h-[420px] sm:min-h-[500px] flex items-center justify-center p-4 sm:p-8 lg:p-14 shadow-[0_20px_60px_rgba(0,0,0,0.14)] transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          {/* Background Photography with Zoom Effect */}
          <img
            src={ASSET_IMAGES.dreamHomeBanner}
            alt="Exquisite modern penthouse interior with floor-to-ceiling windows"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-1000 ease-out"
          />

          {/* Gradients */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/35" />
          <div className="absolute inset-0 bg-black/25" />

          {/* Centered Floating Luxury Glass Card Overlay */}
          <div
            className={`relative z-10 max-w-2xl text-center bg-black/45 backdrop-blur-xl rounded-[20px] sm:rounded-[28px] p-5 sm:p-8 lg:p-12 border border-white/20 shadow-2xl text-white animate-float-slow hover-pause transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            {/* Floating Top Pill */}
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] sm:text-[11px] uppercase tracking-[0.16em] sm:tracking-[0.2em] font-medium font-sans mb-3 sm:mb-5 shadow-xs">
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#C9B596]" />
              <span>Complimentary Atelier Service</span>
            </div>

            <h2 className="font-serif-luxury text-2xl sm:text-4xl lg:text-[46px] font-semibold text-white tracking-tight leading-tight mb-3 sm:mb-4">
              Design Your Dream Home
            </h2>

            <p className="text-xs sm:text-base text-white/90 font-light max-w-lg mx-auto leading-relaxed mb-6 sm:mb-8">
              Personalized furniture collections for every lifestyle. Collaborate 1-on-1 with our Copenhagen architectural consultants for tailored 3D space curation.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                id="banner-consultation-btn"
                onClick={onBookConsultation}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3 sm:py-4 bg-[#8B6B4D] hover:bg-[#6F533B] text-white text-[11px] sm:text-xs uppercase tracking-[0.16em] sm:tracking-[0.18em] font-medium rounded-full shadow-[0_10px_30px_rgba(139,107,77,0.4)] transition-all duration-300 hover:shadow-[0_14px_40px_rgba(139,107,77,0.6)] cursor-pointer group transform hover:-translate-y-0.5"
              >
                <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>Book Design Consultation</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { ArrowUpRight, Compass } from 'lucide-react';
import { CATEGORIES } from '../data/products';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface CategoryShowcaseProps {
  onSelectCategory: (categoryName: string) => void;
}

export const CategoryShowcase: React.FC<CategoryShowcaseProps> = ({ onSelectCategory }) => {
  const { ref, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.1 });

  return (
    <section
      ref={ref}
      id="categories"
      className="relative w-full py-14 sm:py-20 lg:py-28 bg-[#F6F4F1] overflow-hidden"
    >
      {/* Subtle floating background ambient orb */}
      <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-[#8B6B4D]/5 blur-3xl pointer-events-none animate-float-slow" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        {/* Section Header with Fade & Slide Down */}
        <div
          className={`text-center max-w-2xl mx-auto mb-10 sm:mb-14 transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#EAE7E3] text-[#8B6B4D] mb-3 shadow-2xs animate-float-slow">
            <Compass className="w-3.5 h-3.5 text-[#8B6B4D]" />
            <span className="text-[11px] uppercase tracking-[0.25em] font-medium font-sans">
              Curated Environments
            </span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-[44px] font-semibold text-[#1A1A1A] tracking-tight leading-tight">
            Most Recommend Spaces For You
          </h2>
          <p className="mt-2.5 sm:mt-3 text-sm sm:text-base text-[#6E6E6E] font-light leading-relaxed">
            Explore bespoke architectural room concepts tailored to serene living, organic textures, and functional Scandinavian poise.
          </p>
        </div>

        {/* Asymmetrical Magazine Grid with Staggered Slide In */}
        <div className="grid grid-cols-12 gap-4 sm:gap-6">
          {CATEGORIES.map((cat, idx) => (
            <div
              key={cat.id}
              id={`cat-card-${cat.id}`}
              onClick={() => onSelectCategory(cat.name)}
              className={`group relative overflow-hidden rounded-[22px] sm:rounded-[28px] cursor-pointer min-h-[270px] sm:min-h-[350px] lg:min-h-[420px] shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_24px_50px_rgba(0,0,0,0.18)] transition-all duration-700 ease-out ${cat.span} ${
                isVisible
                  ? 'opacity-100 translate-y-0 scale-100'
                  : 'opacity-0 translate-y-12 scale-95'
              }`}
              style={{
                transitionDelay: `${idx * 120}ms`,
              }}
            >
              {/* Background Editorial Image with Parallax-style Zoom on Hover */}
              <img
                src={cat.image}
                alt={cat.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-110"
              />

              {/* Ambient Gradients */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10 transition-opacity duration-500 group-hover:from-black/90" />

              {/* Floating Top Tag */}
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10 animate-float-slow">
                <span className="inline-flex items-center px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] sm:text-[11px] font-medium tracking-wider uppercase border border-white/30 shadow-xs">
                  {cat.count}
                </span>
              </div>

              {/* Bottom Content & Interactive CTA Button with Slide & Lift */}
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7 z-10 flex flex-col justify-end">
                <h3 className="font-serif-luxury text-xl sm:text-2xl lg:text-[30px] text-white font-medium mb-1.5 sm:mb-2 transition-transform duration-500 group-hover:-translate-y-1">
                  {cat.name} Furnitures
                </h3>

                <p className="text-xs sm:text-sm text-white/80 line-clamp-2 max-w-md font-light mb-3.5 sm:mb-5 opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                  {cat.description}
                </p>

                {/* Pill Button with Slide & Color Shift */}
                <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white text-[#1A1A1A] text-[11px] sm:text-xs font-medium uppercase tracking-[0.12em] sm:tracking-[0.14em] self-start transition-all duration-300 group-hover:bg-[#8B6B4D] group-hover:text-white shadow-md transform group-hover:translate-x-1">
                  <span>View all products</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

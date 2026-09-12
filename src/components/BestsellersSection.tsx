import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, ShoppingBag, Eye, Heart, Star, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface BestsellersSectionProps {
  products: Product[];
  wishlist: Product[];
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export const BestsellersSection: React.FC<BestsellersSectionProps> = ({
  products,
  wishlist,
  onToggleWishlist,
  onAddToCart,
  onQuickView,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { ref, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.1 });

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 380;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const isWishlisted = (id: string) => wishlist.some((item) => item.id === id);

  return (
    <section
      ref={ref}
      id="bestsellers"
      className="relative w-full py-14 sm:py-20 lg:py-28 bg-[#F8F7F5] overflow-hidden"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        {/* Header with Fade & Slide Reveal */}
        <div
          className={`flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-14 gap-5 sm:gap-6 transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
          }`}
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#EAE7E3] text-[#8B6B4D] mb-3 shadow-2xs animate-float-slow">
              <Sparkles className="w-3.5 h-3.5 text-[#8B6B4D]" />
              <span className="text-[11px] uppercase tracking-[0.25em] font-medium font-sans">
                Timeless Icons
              </span>
            </div>

            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-[44px] font-semibold text-[#1A1A1A] tracking-tight leading-tight">
              Our Most Coveted Pieces
            </h2>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3 self-end sm:self-auto">
            <button
              onClick={() => scroll('left')}
              aria-label="Scroll left"
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white border border-[#EAE7E3] text-[#1A1A1A] hover:bg-[#8B6B4D] hover:text-white hover:border-[#8B6B4D] transition-all duration-300 flex items-center justify-center cursor-pointer shadow-xs hover:shadow-md transform hover:-translate-x-0.5 active:scale-95"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              aria-label="Scroll right"
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white border border-[#EAE7E3] text-[#1A1A1A] hover:bg-[#8B6B4D] hover:text-white hover:border-[#8B6B4D] transition-all duration-300 flex items-center justify-center cursor-pointer shadow-xs hover:shadow-md transform hover:translate-x-0.5 active:scale-95"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Carousel Track with Smooth Snapping & Staggered Reveal */}
        <div
          ref={scrollContainerRef}
          className={`flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-6 pt-2 -mx-4 px-4 sm:-mx-6 sm:px-6 transition-all duration-700 delay-150 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {products.map((product) => {
            const wishActive = isWishlisted(product.id);

            return (
              <div
                key={product.id}
                id={`bestseller-item-${product.id}`}
                className="group snap-start shrink-0 w-[260px] sm:w-[320px] md:w-[360px] bg-white rounded-[22px] sm:rounded-[26px] p-4 sm:p-6 border border-[#EAE7E3]/80 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_45px_rgba(139,107,77,0.12)] transition-all duration-700 hover:-translate-y-2 flex flex-col justify-between"
              >
                {/* Image Stage */}
                <div
                  className="relative aspect-4/3 w-full rounded-xl sm:rounded-2xl overflow-hidden bg-[#F8F7F5] flex items-center justify-center cursor-pointer mb-4 sm:mb-5 border border-[#EAE7E3]/50"
                  onClick={() => onQuickView(product)}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain p-3 sm:p-4 transition-transform duration-700 ease-out group-hover:scale-110"
                  />

                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(product);
                    }}
                    aria-label="Wishlist toggle"
                    className={`absolute top-2.5 right-2.5 sm:top-3 sm:right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer transform hover:scale-110 active:scale-95 ${
                      wishActive
                        ? 'bg-[#8B6B4D] text-white shadow-xs'
                        : 'bg-white/90 text-[#1A1A1A] hover:bg-white hover:text-[#8B6B4D]'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${wishActive ? 'fill-current' : ''}`} />
                  </button>

                  {/* Hover Quick View Slide Up */}
                  <div className="absolute inset-x-3 sm:inset-x-4 bottom-2.5 sm:bottom-3 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out flex items-center justify-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onQuickView(product);
                      }}
                      className="w-full py-2 sm:py-2.5 bg-[#1A1A1A]/90 hover:bg-[#1A1A1A] text-white text-[11px] sm:text-xs uppercase tracking-wider font-medium rounded-lg sm:rounded-xl backdrop-blur-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-lg transform hover:scale-[1.02] active:scale-95"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Quick View</span>
                    </button>
                  </div>
                </div>

                {/* Details */}
                <div>
                  <div className="flex items-center gap-1 text-amber-500 mb-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="text-xs font-semibold text-[#1A1A1A]">{product.rating}</span>
                    <span className="text-xs text-[#6E6E6E]">({product.reviewsCount})</span>
                  </div>

                  <h3
                    onClick={() => onQuickView(product)}
                    className="font-serif-luxury text-lg sm:text-xl font-medium text-[#1A1A1A] hover:text-[#8B6B4D] transition-colors leading-snug cursor-pointer line-clamp-1"
                  >
                    {product.name}
                  </h3>

                  <p className="text-xs text-[#6E6E6E] line-clamp-1 font-light mt-0.5 mb-3 sm:mb-4">
                    {product.subtitle}
                  </p>
                </div>

                {/* Price & Add to Bag */}
                <div className="flex items-center justify-between pt-2.5 sm:pt-3 border-t border-[#EAE7E3]/60">
                  <span className="font-serif-luxury text-lg sm:text-xl font-bold text-[#1A1A1A]">
                    ${product.price.toLocaleString()}
                  </span>

                  <button
                    onClick={() => onAddToCart(product)}
                    className="px-3.5 sm:px-4 py-1.5 sm:py-2 bg-[#F8F7F5] hover:bg-[#8B6B4D] text-[#1A1A1A] hover:text-white rounded-full text-[11px] sm:text-xs font-medium uppercase tracking-[0.12em] sm:tracking-[0.14em] transition-all duration-300 flex items-center gap-1.5 cursor-pointer border border-[#EAE7E3] transform hover:scale-105 active:scale-95"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

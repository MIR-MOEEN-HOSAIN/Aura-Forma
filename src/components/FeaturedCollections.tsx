import React, { useState } from 'react';
import { Heart, Star, ShoppingBag, Eye, ArrowRight, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface FeaturedCollectionsProps {
  products: Product[];
  wishlist: Product[];
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product, color?: string) => void;
  onQuickView: (product: Product) => void;
  onViewAllClick: () => void;
}

export const FeaturedCollections: React.FC<FeaturedCollectionsProps> = ({
  products,
  wishlist,
  onToggleWishlist,
  onAddToCart,
  onQuickView,
  onViewAllClick,
}) => {
  const [selectedColors, setSelectedColors] = useState<Record<string, string>>({});
  const { ref, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.1 });

  const isWishlisted = (id: string) => wishlist.some((item) => item.id === id);

  const handleColorSelect = (productId: string, colorName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedColors((prev) => ({ ...prev, [productId]: colorName }));
  };

  return (
    <section
      ref={ref}
      id="new-arrivals"
      className="relative w-full py-14 sm:py-20 lg:py-28 bg-[#F8F7F5] overflow-hidden"
    >
      {/* Decorative ambient subtle background blur */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#C9B596]/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        {/* Section Header with Fade In & Slide Down Animation */}
        <div
          className={`text-center max-w-2xl mx-auto mb-10 sm:mb-14 transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#EAE7E3] text-[#8B6B4D] mb-3 shadow-2xs animate-float-slow">
            <Sparkles className="w-3.5 h-3.5 text-[#8B6B4D]" />
            <span className="text-[11px] uppercase tracking-[0.25em] font-medium font-sans">
              Curated Selection
            </span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-[44px] font-semibold text-[#1A1A1A] tracking-tight leading-tight">
            Our New Collections
          </h2>
          <p className="mt-2.5 sm:mt-3 text-sm sm:text-base text-[#6E6E6E] font-light leading-relaxed">
            Architectural pieces handcrafted using wood sourced from responsibly certified Scandinavian forests.
          </p>
        </div>

        {/* Product Grid with Staggered Slide In & Lift */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {products.map((product, index) => {
            const activeColorName = selectedColors[product.id] || product.colors[0]?.name;
            const wishActive = isWishlisted(product.id);

            return (
              <div
                key={product.id}
                id={`featured-card-${product.id}`}
                className={`group relative bg-white rounded-[22px] sm:rounded-[26px] p-4 sm:p-6 border border-[#EAE7E3]/70 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_45px_rgba(139,107,77,0.12)] transition-all duration-700 ease-out hover:-translate-y-2 flex flex-col justify-between ${
                  isVisible
                    ? 'opacity-100 translate-y-0 scale-100'
                    : 'opacity-0 translate-y-12 scale-95'
                }`}
                style={{
                  transitionDelay: `${index * 140}ms`,
                }}
              >
                {/* Top Badge & Color Swatches Bar */}
                <div className="flex items-center justify-between gap-2 mb-3.5 sm:mb-4 z-10">
                  {/* Floating Status Badge */}
                  {product.badge ? (
                    <span className="inline-flex items-center text-[10px] sm:text-[11px] font-medium tracking-wider uppercase px-2.5 sm:px-3 py-1 rounded-full bg-[#F8F7F5] text-[#1A1A1A] border border-[#EAE7E3] animate-float-slow">
                      {product.badge}
                    </span>
                  ) : (
                    <span className="text-xs text-[#6E6E6E] uppercase tracking-wider">
                      {product.category}
                    </span>
                  )}

                  {/* Color Swatch Dots */}
                  <div className="flex items-center gap-1.5 bg-[#F8F7F5] px-2 py-1 rounded-full border border-[#EAE7E3]">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={(e) => handleColorSelect(product.id, c.name, e)}
                        title={c.name}
                        aria-label={`Select color ${c.name}`}
                        className={`w-3.5 h-3.5 rounded-full transition-transform duration-200 cursor-pointer ${
                          activeColorName === c.name
                            ? 'ring-2 ring-[#8B6B4D] ring-offset-1 scale-115'
                            : 'hover:scale-110 opacity-80'
                        }`}
                        style={{ backgroundColor: c.hex }}
                      />
                    ))}
                  </div>
                </div>

                {/* Product Image Stage with Zoom & Lens Effect */}
                <div
                  className="relative aspect-4/3 sm:aspect-1/1 w-full rounded-xl sm:rounded-2xl overflow-hidden bg-[#F8F7F5] flex items-center justify-center cursor-pointer mb-4 sm:mb-6 border border-[#EAE7E3]/50"
                  onClick={() => onQuickView(product)}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain p-3 sm:p-4 transition-transform duration-700 ease-out group-hover:scale-110"
                  />

                  {/* Floating Wishlist Button */}
                  <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 flex flex-col gap-2">
                    <button
                      id={`wishlist-btn-${product.id}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleWishlist(product);
                      }}
                      aria-label={wishActive ? 'Remove from wishlist' : 'Add to wishlist'}
                      className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm cursor-pointer transform hover:scale-110 active:scale-95 ${
                        wishActive
                          ? 'bg-[#8B6B4D] text-white shadow-md'
                          : 'bg-white/90 text-[#1A1A1A] hover:bg-white hover:text-[#8B6B4D] shadow-xs'
                      }`}
                    >
                      <Heart
                        className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${wishActive ? 'fill-current' : ''}`}
                        strokeWidth={2}
                      />
                    </button>
                  </div>

                  {/* Quick View Button with Slide In / Out Animation */}
                  <div className="absolute inset-x-3 sm:inset-x-4 bottom-2.5 sm:bottom-3 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out flex items-center justify-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onQuickView(product);
                      }}
                      className="w-full py-2 sm:py-2.5 bg-[#1A1A1A]/90 hover:bg-[#1A1A1A] text-white text-[11px] sm:text-xs uppercase tracking-[0.16em] font-medium rounded-lg sm:rounded-xl backdrop-blur-md transition-colors shadow-lg flex items-center justify-center gap-2 cursor-pointer transform hover:scale-[1.02] active:scale-95"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Quick View</span>
                    </button>
                  </div>
                </div>

                {/* Product Meta Details */}
                <div className="flex flex-col flex-grow">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <div className="flex text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < Math.floor(product.rating)
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-[11px] sm:text-[12px] text-[#6E6E6E] font-medium">
                      {product.rating} ({product.reviewsCount})
                    </span>
                  </div>

                  <h3
                    onClick={() => onQuickView(product)}
                    className="font-serif-luxury text-lg sm:text-[21px] font-medium text-[#1A1A1A] hover:text-[#8B6B4D] transition-colors leading-snug cursor-pointer mb-1 line-clamp-1"
                  >
                    {product.name}
                  </h3>

                  <p className="text-xs text-[#6E6E6E] line-clamp-1 font-light mb-3 sm:mb-4">
                    {product.subtitle}
                  </p>

                  {/* Price & Bag Add Bar */}
                  <div className="flex items-center justify-between pt-2.5 sm:pt-3 border-t border-[#EAE7E3]/60 mt-auto">
                    <div className="flex items-baseline gap-2">
                      <span className="font-serif-luxury text-lg sm:text-xl font-bold text-[#1A1A1A]">
                        ${product.price.toLocaleString()}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-[#6E6E6E] line-through font-sans">
                          ${product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>

                    <button
                      id={`add-bag-btn-${product.id}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(product, activeColorName);
                      }}
                      aria-label={`Add ${product.name} to bag`}
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#F8F7F5] hover:bg-[#8B6B4D] text-[#1A1A1A] hover:text-white transition-all duration-300 flex items-center justify-center cursor-pointer group/bag border border-[#EAE7E3] transform hover:rotate-12 active:scale-95 shadow-2xs hover:shadow-md"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover/bag:scale-110" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom See More Button with Hover Slide */}
        <div
          className={`mt-10 sm:mt-14 text-center transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <button
            id="see-more-collection-btn"
            onClick={onViewAllClick}
            className="inline-flex items-center gap-2.5 px-7 sm:px-8 py-3 sm:py-3.5 rounded-full border border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white text-xs uppercase tracking-[0.16em] sm:tracking-[0.18em] font-medium transition-all duration-300 cursor-pointer shadow-xs hover:shadow-md group transform hover:-translate-y-0.5"
          >
            <span>See More Collection</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
};

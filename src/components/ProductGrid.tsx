import React, { useState } from 'react';
import { Heart, ShoppingBag, Eye, Star, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface ProductGridProps {
  products: Product[];
  wishlist: Product[];
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product, color?: string) => void;
  onQuickView: (product: Product) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  wishlist,
  onToggleWishlist,
  onAddToCart,
  onQuickView,
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [selectedColorMap, setSelectedColorMap] = useState<Record<string, string>>({});
  const { ref, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.1 });

  const filterCategories = ['All', 'Living Room', 'Dining', 'Bedroom', 'Workspace', 'Outdoor'];

  const filteredProducts =
    activeFilter === 'All'
      ? products
      : products.filter((p) => p.category === activeFilter);

  const isWishlisted = (id: string) => wishlist.some((item) => item.id === id);

  return (
    <section
      ref={ref}
      id="shop"
      className="relative w-full py-14 sm:py-20 lg:py-28 bg-[#F8F7F5] overflow-hidden"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        {/* Section Header with Category Tabs */}
        <div
          className={`flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-5 sm:gap-6 transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
          }`}
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#EAE7E3] text-[#8B6B4D] mb-3 shadow-2xs animate-float-slow">
              <Sparkles className="w-3.5 h-3.5 text-[#8B6B4D]" />
              <span className="text-[11px] uppercase tracking-[0.25em] font-medium font-sans">
                Masterpieces of Form
              </span>
            </div>

            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-[44px] font-semibold text-[#1A1A1A] tracking-tight leading-tight">
              Signature Collection
            </h2>
          </div>

          {/* Filter Pills with smooth interactive state */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 sm:pb-2">
            {filterCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-medium uppercase tracking-[0.12em] sm:tracking-[0.14em] transition-all duration-300 whitespace-nowrap cursor-pointer transform hover:scale-105 active:scale-95 ${
                  activeFilter === cat
                    ? 'bg-[#1A1A1A] text-white shadow-sm'
                    : 'bg-white text-[#6E6E6E] hover:text-[#1A1A1A] border border-[#EAE7E3] hover:border-[#1A1A1A]/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Responsive Grid with Staggered Slide In & Lift */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {filteredProducts.map((product, index) => {
            const activeColor = selectedColorMap[product.id] || product.colors[0]?.name;
            const wishActive = isWishlisted(product.id);

            return (
              <div
                key={product.id}
                id={`product-grid-card-${product.id}`}
                className={`group relative bg-white rounded-[22px] sm:rounded-[26px] p-4 sm:p-6 border border-[#EAE7E3]/80 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_45px_rgba(139,107,77,0.12)] transition-all duration-700 ease-out hover:-translate-y-2 flex flex-col justify-between ${
                  isVisible
                    ? 'opacity-100 translate-y-0 scale-100'
                    : 'opacity-0 translate-y-12 scale-95'
                }`}
                style={{
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                {/* Top Info Bar */}
                <div className="flex items-center justify-between gap-2 mb-3.5 sm:mb-4">
                  <span className="text-[10px] sm:text-[11px] font-medium tracking-wider uppercase px-2.5 sm:px-3 py-1 rounded-full bg-[#F8F7F5] text-[#1A1A1A] border border-[#EAE7E3] animate-float-slow">
                    {product.badge || product.category}
                  </span>

                  <button
                    onClick={() => onToggleWishlist(product)}
                    aria-label="Wishlist toggle"
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer transform hover:scale-110 active:scale-95 ${
                      wishActive
                        ? 'bg-[#8B6B4D] text-white shadow-xs'
                        : 'bg-[#F8F7F5] text-[#6E6E6E] hover:text-[#8B6B4D]'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${wishActive ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Product Image Box with Zoom and Slide Overlays */}
                <div
                  className="relative aspect-4/3 sm:aspect-1/1 w-full rounded-xl sm:rounded-2xl overflow-hidden bg-[#F8F7F5] flex items-center justify-center cursor-pointer mb-3.5 sm:mb-5 border border-[#EAE7E3]/50"
                  onClick={() => onQuickView(product)}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain p-3 sm:p-4 transition-transform duration-700 ease-out group-hover:scale-110"
                  />

                  {/* Hover Buttons Slide Up from Bottom */}
                  <div className="absolute inset-x-3 sm:inset-x-4 bottom-2.5 sm:bottom-3 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onQuickView(product);
                      }}
                      className="flex-1 py-2 sm:py-2.5 bg-white/95 hover:bg-white text-[#1A1A1A] text-[11px] sm:text-xs uppercase tracking-[0.14em] font-medium rounded-lg sm:rounded-xl shadow-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-[#EAE7E3] transform hover:scale-[1.02] active:scale-95"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Quick View</span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(product, activeColor);
                      }}
                      className="py-2 sm:py-2.5 px-3 sm:px-4 bg-[#8B6B4D] hover:bg-[#6F533B] text-white text-[11px] sm:text-xs uppercase tracking-[0.14em] font-medium rounded-lg sm:rounded-xl shadow-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer transform hover:scale-[1.02] active:scale-95"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>

                {/* Product Info Details */}
                <div className="flex flex-col flex-grow">
                  <div className="flex items-center justify-between mb-1 sm:mb-1.5">
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="text-xs font-semibold text-[#1A1A1A]">
                        {product.rating}
                      </span>
                      <span className="text-xs text-[#6E6E6E]">({product.reviewsCount})</span>
                    </div>

                    {/* Color Dots */}
                    <div className="flex items-center gap-1">
                      {product.colors.slice(0, 3).map((c) => (
                        <span
                          key={c.name}
                          className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full border border-black/10"
                          style={{ backgroundColor: c.hex }}
                          title={c.name}
                        />
                      ))}
                    </div>
                  </div>

                  <h3
                    onClick={() => onQuickView(product)}
                    className="font-serif-luxury text-lg sm:text-[21px] font-medium text-[#1A1A1A] hover:text-[#8B6B4D] transition-colors leading-snug cursor-pointer mb-1 line-clamp-1"
                  >
                    {product.name}
                  </h3>

                  <p className="text-xs text-[#6E6E6E] font-light line-clamp-1 mb-3 sm:mb-4">
                    {product.subtitle}
                  </p>

                  {/* Price & CTA Row */}
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
                      onClick={() => onAddToCart(product, activeColor)}
                      className="text-[11px] sm:text-xs font-medium uppercase tracking-[0.12em] sm:tracking-[0.14em] text-[#8B6B4D] hover:text-[#6F533B] flex items-center gap-1 cursor-pointer transition-colors group/cta transform hover:translate-x-1"
                    >
                      <span>Add to Bag</span>
                      <span className="transition-transform group-hover/cta:translate-x-1">→</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { X, Star, ShoppingBag, Heart, Truck, ShieldCheck, Check, Share2 } from 'lucide-react';
import { Product } from '../types';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, selectedColor: string, quantity: number) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
}) => {
  if (!product) return null;

  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || 'Standard');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState<string>(product.image);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const handleAdd = () => {
    onAddToCart(product, selectedColor, quantity);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative bg-white rounded-[28px] max-w-4xl w-full overflow-hidden shadow-2xl z-10 border border-[#EAE7E3] animate-scale-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md border border-[#EAE7E3] flex items-center justify-center text-[#1A1A1A] hover:bg-[#8B6B4D] hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Product Imagery */}
          <div className="bg-[#F8F7F5] p-8 flex flex-col justify-between items-center border-b md:border-b-0 md:border-r border-[#EAE7E3]">
            <div className="relative aspect-square w-full flex items-center justify-center">
              <img
                src={activeImage}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain p-4 transition-all duration-500"
              />

              {product.badge && (
                <span className="absolute top-2 left-2 text-[11px] font-medium tracking-wider uppercase px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[#1A1A1A] border border-[#EAE7E3]">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Gallery Thumbnail Toggles */}
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setActiveImage(product.image)}
                className={`w-14 h-14 rounded-xl overflow-hidden bg-white border p-1 cursor-pointer transition-all ${
                  activeImage === product.image ? 'border-[#8B6B4D] ring-2 ring-[#8B6B4D]/20' : 'border-[#EAE7E3]'
                }`}
              >
                <img
                  src={product.image}
                  alt="Product primary angle"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain"
                />
              </button>

              {product.secondaryImage && (
                <button
                  onClick={() => setActiveImage(product.secondaryImage!)}
                  className={`w-14 h-14 rounded-xl overflow-hidden bg-white border p-1 cursor-pointer transition-all ${
                    activeImage === product.secondaryImage ? 'border-[#8B6B4D] ring-2 ring-[#8B6B4D]/20' : 'border-[#EAE7E3]'
                  }`}
                >
                  <img
                    src={product.secondaryImage}
                    alt="Product editorial context"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </button>
              )}
            </div>
          </div>

          {/* Right: Product Details */}
          <div className="p-8 sm:p-10 flex flex-col justify-between">
            <div>
              {/* Category & Rating */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs uppercase tracking-[0.2em] text-[#8B6B4D] font-medium font-sans">
                  {product.category}
                </span>

                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="text-xs font-semibold text-[#1A1A1A]">{product.rating}</span>
                  <span className="text-xs text-[#6E6E6E]">({product.reviewsCount} reviews)</span>
                </div>
              </div>

              {/* Title & Subtitle */}
              <h3 className="font-serif-luxury text-2xl sm:text-3xl font-medium text-[#1A1A1A] leading-tight mb-2">
                {product.name}
              </h3>
              <p className="text-xs text-[#6E6E6E] font-light leading-relaxed mb-5">
                {product.subtitle}
              </p>

              {/* Pricing */}
              <div className="flex items-baseline gap-3 mb-6 pb-6 border-b border-[#EAE7E3]">
                <span className="font-serif-luxury text-3xl font-bold text-[#1A1A1A]">
                  ${product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-[#6E6E6E] line-through font-sans">
                    ${product.originalPrice.toLocaleString()}
                  </span>
                )}
                <span className="text-xs text-[#3D8B5A] bg-[#3D8B5A]/10 px-2.5 py-0.5 rounded-full font-medium ml-auto">
                  In Stock & Ready To Ship
                </span>
              </div>

              {/* Color Finish Picker */}
              <div className="mb-6">
                <label className="text-xs uppercase tracking-wider font-semibold text-[#1A1A1A] block mb-2">
                  Finish / Upholstery: <span className="text-[#8B6B4D] font-normal">{selectedColor}</span>
                </label>
                <div className="flex items-center gap-2.5">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`group relative flex items-center justify-center p-1 rounded-full border transition-all cursor-pointer ${
                        selectedColor === color.name ? 'border-[#8B6B4D] scale-110' : 'border-transparent hover:border-[#EAE7E3]'
                      }`}
                    >
                      <span
                        className="w-6 h-6 rounded-full border border-black/10 block shadow-2xs"
                        style={{ backgroundColor: color.hex }}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Specs & Dimensions Tabs */}
              <div className="space-y-2.5 text-xs text-[#6E6E6E] mb-6 p-4 rounded-xl bg-[#F8F7F5] border border-[#EAE7E3]">
                <div>
                  <strong className="text-[#1A1A1A] font-medium">Dimensions: </strong>
                  {product.dimensions}
                </div>
                <div>
                  <strong className="text-[#1A1A1A] font-medium">Craft Materials: </strong>
                  {product.materials}
                </div>
                <div>
                  <strong className="text-[#1A1A1A] font-medium">Delivery: </strong>
                  {product.leadTime}
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="space-y-3 pt-4 border-t border-[#EAE7E3]">
              <div className="flex gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-[#EAE7E3] rounded-full bg-[#F8F7F5] px-3 py-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-white text-[#1A1A1A]"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-xs font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-white text-[#1A1A1A]"
                  >
                    +
                  </button>
                </div>

                {/* Add to Bag Button */}
                <button
                  id="modal-add-to-bag-btn"
                  onClick={handleAdd}
                  className={`flex-grow py-3.5 px-6 rounded-full text-xs uppercase tracking-[0.16em] font-medium transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                    addedAnimation
                      ? 'bg-[#3D8B5A] text-white'
                      : 'bg-[#8B6B4D] hover:bg-[#6F533B] text-white'
                  }`}
                >
                  {addedAnimation ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Bag • ${(product.price * quantity).toLocaleString()}</span>
                    </>
                  )}
                </button>

                {/* Wishlist Button */}
                <button
                  onClick={() => onToggleWishlist(product)}
                  className={`w-12 h-12 rounded-full border border-[#EAE7E3] flex items-center justify-center transition-colors cursor-pointer shrink-0 ${
                    isWishlisted ? 'bg-[#8B6B4D] text-white' : 'bg-[#F8F7F5] text-[#1A1A1A] hover:bg-white'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>

              <div className="flex items-center justify-center gap-4 text-[11px] text-[#6E6E6E] font-light pt-1">
                <span className="flex items-center gap-1">
                  <Truck className="w-3 h-3 text-[#8B6B4D]" /> Free White-Glove
                </span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-[#8B6B4D]" /> 25-Year Guarantee
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

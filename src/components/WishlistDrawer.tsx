import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Product } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: Product[];
  onRemoveFromWishlist: (productId: string) => void;
  onAddToCart: (product: Product) => void;
  onMoveAllToCart: () => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlist,
  onRemoveFromWishlist,
  onAddToCart,
  onMoveAllToCart,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#F8F7F5] shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-6 bg-white border-b border-[#EAE7E3] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Heart className="w-5 h-5 text-[#8B6B4D] fill-[#8B6B4D]" />
              <h3 className="font-serif-luxury text-xl font-medium text-[#1A1A1A]">
                Saved Atelier Pieces
              </h3>
              <span className="text-xs bg-[#F8F7F5] text-[#6E6E6E] px-2.5 py-0.5 rounded-full border border-[#EAE7E3]">
                {wishlist.length}
              </span>
            </div>
            <button
              onClick={onClose}
              aria-label="Close wishlist"
              className="p-1.5 rounded-full text-[#6E6E6E] hover:text-[#1A1A1A] hover:bg-[#F8F7F5] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="flex-grow overflow-y-auto p-6 space-y-4">
            {wishlist.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-white border border-[#EAE7E3] flex items-center justify-center text-[#6E6E6E] mb-4">
                  <Heart className="w-7 h-7" strokeWidth={1.5} />
                </div>
                <h4 className="font-serif-luxury text-xl text-[#1A1A1A] mb-1">Your wishlist is empty</h4>
                <p className="text-xs text-[#6E6E6E] font-light max-w-xs mb-6">
                  Save your favorite architectural pieces to review later or share with your interior designer.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-[#8B6B4D] text-white text-xs uppercase tracking-wider rounded-full hover:bg-[#6F533B] transition-colors cursor-pointer"
                >
                  Explore Catalog
                </button>
              </div>
            ) : (
              wishlist.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl p-4 border border-[#EAE7E3] flex gap-4 shadow-2xs"
                >
                  <div className="w-20 h-20 bg-[#F8F7F5] rounded-xl overflow-hidden shrink-0 flex items-center justify-center p-1.5 border border-[#EAE7E3]/60">
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="flex-grow flex flex-col justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-serif-luxury text-base font-medium text-[#1A1A1A] leading-tight">
                          {product.name}
                        </h4>
                        <span className="text-[11px] text-[#6E6E6E] font-light block mt-0.5">
                          {product.category}
                        </span>
                      </div>
                      <button
                        onClick={() => onRemoveFromWishlist(product.id)}
                        aria-label="Remove from wishlist"
                        className="text-[#6E6E6E] hover:text-red-600 transition-colors p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <span className="font-serif-luxury text-base font-bold text-[#1A1A1A]">
                        ${product.price.toLocaleString()}
                      </span>

                      <button
                        onClick={() => onAddToCart(product)}
                        className="px-3.5 py-1.5 bg-[#8B6B4D] hover:bg-[#6F533B] text-white rounded-full text-xs font-medium uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Move To Bag</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {wishlist.length > 0 && (
            <div className="p-6 bg-white border-t border-[#EAE7E3]">
              <button
                onClick={onMoveAllToCart}
                className="w-full py-3.5 bg-[#1A1A1A] hover:bg-[#8B6B4D] text-white text-xs uppercase tracking-[0.16em] font-medium rounded-full transition-colors cursor-pointer"
              >
                Move All To Bag
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

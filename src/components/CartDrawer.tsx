import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Truck, Check } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'success'>('cart');

  if (!isOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 1500;
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const shippingCost = cart.length === 0 || isFreeShipping ? 0 : 150;
  const total = Math.max(0, subtotal - discountAmount + shippingCost);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'AURA10' || promoCode.trim().toUpperCase() === 'LUXURY') {
      const discount = Math.round(subtotal * 0.1);
      setDiscountAmount(discount);
      setPromoApplied(true);
    }
  };

  const handleCheckout = () => {
    setCheckoutStep('success');
  };

  const handleCloseAndReset = () => {
    if (checkoutStep === 'success') {
      onClearCart();
      setCheckoutStep('cart');
      setPromoApplied(false);
      setDiscountAmount(0);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={handleCloseAndReset}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#F8F7F5] shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-6 bg-white border-b border-[#EAE7E3] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#8B6B4D]" />
              <h3 className="font-serif-luxury text-xl font-medium text-[#1A1A1A]">
                Your Shopping Bag
              </h3>
              <span className="text-xs bg-[#F8F7F5] text-[#6E6E6E] px-2.5 py-0.5 rounded-full border border-[#EAE7E3]">
                {cart.reduce((total, i) => total + i.quantity, 0)} items
              </span>
            </div>
            <button
              onClick={handleCloseAndReset}
              aria-label="Close cart"
              className="p-1.5 rounded-full text-[#6E6E6E] hover:text-[#1A1A1A] hover:bg-[#F8F7F5] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Checkout Success Screen */}
          {checkoutStep === 'success' ? (
            <div className="p-8 flex-grow flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-[#3D8B5A]/10 text-[#3D8B5A] flex items-center justify-center mb-6">
                <Check className="w-8 h-8" />
              </div>
              <span className="text-xs uppercase tracking-[0.2em] text-[#8B6B4D] font-medium font-sans">
                Order Confirmed
              </span>
              <h4 className="font-serif-luxury text-2xl font-semibold text-[#1A1A1A] mt-2 mb-3">
                Thank You For Your Commission
              </h4>
              <p className="text-sm text-[#6E6E6E] font-light leading-relaxed max-w-xs mb-8">
                Your bespoke order #AF-89214 has been placed. Our white-glove concierge will contact you within 24 hours to schedule your installation window.
              </p>
              <button
                onClick={handleCloseAndReset}
                className="px-8 py-3.5 bg-[#1A1A1A] text-white text-xs uppercase tracking-[0.16em] font-medium rounded-full hover:bg-[#8B6B4D] transition-colors cursor-pointer"
              >
                Continue Exploring
              </button>
            </div>
          ) : (
            <>
              {/* Delivery Progress Bar */}
              <div className="p-4 bg-white/70 border-b border-[#EAE7E3] text-xs">
                {isFreeShipping ? (
                  <div className="flex items-center gap-2 text-[#3D8B5A] font-medium">
                    <Truck className="w-4 h-4" />
                    <span>Complimentary White-Glove Delivery unlocked!</span>
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[#6E6E6E]">
                      <span>Add <strong className="text-[#1A1A1A]">${amountToFreeShipping.toLocaleString()}</strong> for Free White-Glove Delivery</span>
                      <span>{Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100)}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#EAE7E3] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#8B6B4D] transition-all duration-500 rounded-full"
                        style={{ width: `${Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Items List */}
              <div className="flex-grow overflow-y-auto p-6 space-y-4">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-white border border-[#EAE7E3] flex items-center justify-center text-[#6E6E6E] mb-4">
                      <ShoppingBag className="w-7 h-7" strokeWidth={1.5} />
                    </div>
                    <h4 className="font-serif-luxury text-xl text-[#1A1A1A] mb-1">Your bag is empty</h4>
                    <p className="text-xs text-[#6E6E6E] font-light max-w-xs mb-6">
                      Explore our handcrafted Scandinavian collection to find your next heirloom.
                    </p>
                    <button
                      onClick={onClose}
                      className="px-6 py-2.5 bg-[#8B6B4D] text-white text-xs uppercase tracking-wider rounded-full hover:bg-[#6F533B] transition-colors cursor-pointer"
                    >
                      Browse New Arrivals
                    </button>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item.product.id}
                      className="bg-white rounded-2xl p-4 border border-[#EAE7E3] flex gap-4 shadow-2xs"
                    >
                      {/* Thumbnail */}
                      <div className="w-20 h-20 bg-[#F8F7F5] rounded-xl overflow-hidden shrink-0 flex items-center justify-center p-1.5 border border-[#EAE7E3]/60">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-contain"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-grow flex flex-col justify-between">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h4 className="font-serif-luxury text-base font-medium text-[#1A1A1A] leading-tight">
                              {item.product.name}
                            </h4>
                            <span className="text-[11px] text-[#6E6E6E] font-light block mt-0.5">
                              Finish: {item.selectedColor}
                            </span>
                          </div>
                          <button
                            onClick={() => onRemoveItem(item.product.id)}
                            aria-label="Remove item"
                            className="text-[#6E6E6E] hover:text-red-600 transition-colors p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="flex items-center justify-between mt-3">
                          <span className="font-serif-luxury text-base font-bold text-[#1A1A1A]">
                            ${(item.product.price * item.quantity).toLocaleString()}
                          </span>

                          <div className="flex items-center border border-[#EAE7E3] rounded-full bg-[#F8F7F5] px-1 py-0.5">
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                              aria-label="Decrease quantity"
                              className="w-6 h-6 rounded-full flex items-center justify-center text-[#1A1A1A] hover:bg-white transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-6 text-center text-xs font-semibold text-[#1A1A1A]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                              aria-label="Increase quantity"
                              className="w-6 h-6 rounded-full flex items-center justify-center text-[#1A1A1A] hover:bg-white transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Summary & Checkout Footer */}
              {cart.length > 0 && (
                <div className="p-6 bg-white border-t border-[#EAE7E3] space-y-4">
                  {/* Promo code field */}
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo Code (try AURA10)"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-grow px-3.5 py-2 text-xs rounded-xl bg-[#F8F7F5] border border-[#EAE7E3] focus:outline-none focus:border-[#8B6B4D]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#1A1A1A] text-white text-xs uppercase tracking-wider rounded-xl hover:bg-[#8B6B4D] transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>

                  {promoApplied && (
                    <div className="text-[11px] text-[#3D8B5A] flex items-center justify-between font-medium">
                      <span>AURA10 applied (10% VIP Atelier Courtesy)</span>
                      <span>-${discountAmount.toLocaleString()}</span>
                    </div>
                  )}

                  {/* Calculations */}
                  <div className="space-y-1.5 text-xs text-[#6E6E6E] pt-2 border-t border-[#EAE7E3]/60">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="text-[#1A1A1A] font-medium">${subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>White-Glove Placement & Assembly</span>
                      <span className="text-[#1A1A1A] font-medium">
                        {shippingCost === 0 ? 'COMPLIMENTARY' : `$${shippingCost}`}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm font-semibold text-[#1A1A1A] pt-2 border-t border-[#EAE7E3]">
                      <span>Estimated Total</span>
                      <span className="font-serif-luxury text-lg">${total.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <button
                    id="cart-checkout-btn"
                    onClick={handleCheckout}
                    className="w-full py-4 bg-[#8B6B4D] hover:bg-[#6F533B] text-white text-xs uppercase tracking-[0.18em] font-medium rounded-full shadow-[0_8px_24px_rgba(139,107,77,0.3)] transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Proceed To White-Glove Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="flex items-center justify-center gap-2 text-[11px] text-[#6E6E6E] font-light">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#8B6B4D]" />
                    <span>256-Bit SSL Encrypted • 60-Day Trial Guarantee</span>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

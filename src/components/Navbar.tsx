import React, { useState, useEffect } from 'react';
import { Search, Heart, ShoppingBag, User, Menu, X, ArrowRight } from 'lucide-react';
import { CartItem, Product } from '../types';

interface NavbarProps {
  cart: CartItem[];
  wishlist: Product[];
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
  onOpenConsultation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cart,
  wishlist,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  onOpenConsultation,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Shop', href: '#shop' },
    { name: 'Collections', href: '#new-arrivals' },
    { name: 'Categories', href: '#categories' },
    { name: 'Craft & Story', href: '#why-us' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Journal', href: '#inspiration' },
  ];

  return (
    <>
      <header
        id="main-navbar"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#F8F7F5]/90 backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.06)] border-b border-[#EAE7E3]/80 py-3.5'
            : 'bg-gradient-to-b from-black/50 via-black/20 to-transparent py-5'
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Brand Logo - Compact and elegant on desktop to give generous breathing room to Home menu */}
          <a
            href="#hero"
            id="nav-brand-logo"
            className="flex items-center gap-2 xl:gap-2.5 group mr-3 sm:mr-6 lg:mr-8 xl:mr-12 shrink-0"
          >
            <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-colors duration-300 shrink-0 ${
              isScrolled ? 'bg-[#8B6B4D] text-white' : 'bg-white/90 text-[#1A1A1A] backdrop-blur-sm'
            }`}>
              <span className="font-serif-luxury text-sm sm:text-base font-bold tracking-tighter">A</span>
            </div>
            <div className="flex flex-col">
              <span
                className={`font-serif-luxury text-base sm:text-[17px] xl:text-[19px] font-medium tracking-[0.11em] xl:tracking-[0.14em] transition-colors duration-300 leading-tight ${
                  isScrolled ? 'text-[#1A1A1A]' : 'text-white'
                }`}
              >
                AURA & FORMA
              </span>
              <span
                className={`text-[8px] sm:text-[8.5px] uppercase tracking-[0.22em] font-sans transition-colors duration-300 leading-none mt-0.5 ${
                  isScrolled ? 'text-[#6E6E6E]' : 'text-white/80'
                }`}
              >
                Atelier Copenhagen
              </span>
            </div>
          </a>

          {/* Center Navigation Links (Desktop) - Scaled for laptops so it never feels crowded */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                id={`nav-link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                className={`relative py-1 text-[13px] xl:text-[14px] tracking-wide transition-colors duration-300 whitespace-nowrap group ${
                  isScrolled
                    ? 'text-[#1A1A1A] hover:text-[#8B6B4D]'
                    : 'text-white/90 hover:text-white'
                }`}
              >
                {link.name}
                <span
                  className={`absolute bottom-0 left-0 w-0 h-[1.5px] transition-all duration-300 group-hover:w-full ${
                    isScrolled ? 'bg-[#8B6B4D]' : 'bg-white'
                  }`}
                />
              </a>
            ))}
          </nav>

          {/* Right Action Icons - Perfectly aligned with matching geometry and optical centering */}
          <div className="flex items-center gap-1 sm:gap-2 lg:gap-3 shrink-0">
            {/* Search Trigger */}
            <button
              id="nav-search-button"
              onClick={onOpenSearch}
              aria-label="Search Collection"
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer ${
                isScrolled
                  ? 'text-[#1A1A1A] hover:bg-[#EAE7E3]/60'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              <Search className="w-5 h-5" strokeWidth={1.75} />
            </button>

            {/* Wishlist Trigger */}
            <button
              id="nav-wishlist-button"
              onClick={onOpenWishlist}
              aria-label="View Wishlist"
              className={`relative w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer ${
                isScrolled
                  ? 'text-[#1A1A1A] hover:bg-[#EAE7E3]/60'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              <Heart className="w-5 h-5" strokeWidth={1.75} />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#8B6B4D] text-white text-[10px] font-medium rounded-full flex items-center justify-center animate-scale-in">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Trigger */}
            <button
              id="nav-cart-button"
              onClick={onOpenCart}
              aria-label="Open Shopping Bag"
              className={`relative w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer ${
                isScrolled
                  ? 'text-[#1A1A1A] hover:bg-[#EAE7E3]/60'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              <ShoppingBag className="w-5 h-5" strokeWidth={1.75} />
              {totalCartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#8B6B4D] text-white text-[10px] font-medium rounded-full flex items-center justify-center animate-scale-in">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* Consultation CTA (Desktop) */}
            <button
              id="nav-consultation-cta"
              onClick={onOpenConsultation}
              className={`hidden md:inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.12em] px-3.5 xl:px-4 py-2 rounded-full transition-all duration-300 cursor-pointer ml-1 ${
                isScrolled
                  ? 'bg-[#1A1A1A] text-white hover:bg-[#8B6B4D]'
                  : 'bg-white/20 text-white backdrop-blur-md hover:bg-white hover:text-[#1A1A1A] border border-white/30'
              }`}
            >
              <span>Consultation</span>
            </button>

            {/* Mobile Hamburger Menu (Three-line button) - Uniform 36x36/40x40 circle perfectly aligned */}
            <button
              id="nav-mobile-menu-button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className={`lg:hidden w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                isScrolled ? 'text-[#1A1A1A] hover:bg-[#EAE7E3]/60' : 'text-white hover:bg-white/10'
              }`}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" strokeWidth={2} />
              ) : (
                <Menu className="w-5 h-5" strokeWidth={2} />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden flex justify-end transition-opacity duration-300"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="w-[85%] max-w-sm h-full bg-[#F8F7F5] shadow-2xl p-8 flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#EAE7E3]">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-[#8B6B4D] text-white flex items-center justify-center">
                    <span className="font-serif-luxury text-sm font-bold">A</span>
                  </div>
                  <span className="font-serif-luxury text-lg tracking-[0.15em] font-medium text-[#1A1A1A]">
                    AURA & FORMA
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 rounded-full text-[#6E6E6E] hover:text-[#1A1A1A]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-8 flex flex-col space-y-5">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-lg font-serif-luxury text-[#1A1A1A] hover:text-[#8B6B4D] transition-colors py-1 flex items-center justify-between"
                  >
                    <span>{link.name}</span>
                    <ArrowRight className="w-4 h-4 text-[#8B6B4D]/60" />
                  </a>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-[#EAE7E3] space-y-4">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenConsultation();
                }}
                className="w-full py-3.5 bg-[#8B6B4D] text-white text-xs uppercase tracking-[0.18em] font-medium rounded-full hover:bg-[#6F533B] transition-colors shadow-sm cursor-pointer"
              >
                Book Design Consultation
              </button>
              <p className="text-[12px] text-center text-[#6E6E6E]">
                Copenhagen • London • New York • Stockholm
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

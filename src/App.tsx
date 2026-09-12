import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeaturedCollections } from './components/FeaturedCollections';
import { CategoryShowcase } from './components/CategoryShowcase';
import { ProductGrid } from './components/ProductGrid';
import { WhyChooseUs } from './components/WhyChooseUs';
import { CustomerTestimonials } from './components/CustomerTestimonials';
import { BestsellersSection } from './components/BestsellersSection';
import { FaqSection } from './components/FaqSection';
import { InteriorInspirationBanner } from './components/InteriorInspirationBanner';
import { NewsletterSection } from './components/NewsletterSection';
import { Footer } from './components/Footer';

import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { SearchModal } from './components/SearchModal';
import { ConsultationModal } from './components/ConsultationModal';
import { Toast } from './components/Toast';

import { PRODUCTS } from './data/products';
import { Product, CartItem } from './types';

export default function App() {
  // State for Cart, Wishlist, and Modals
  const [cart, setCart] = useState<CartItem[]>([
    {
      product: PRODUCTS[0], // Preload with 1 Avondale Sofa for an active showroom experience
      quantity: 1,
      selectedColor: PRODUCTS[0].colors[0].name,
    },
  ]);

  const [wishlist, setWishlist] = useState<Product[]>([PRODUCTS[1]]); // Preload with Pershing chair

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Toast feedback state
  const [toast, setToast] = useState<{ message: string; type: 'cart' | 'wishlist' } | null>(null);

  const showToast = (message: string, type: 'cart' | 'wishlist') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3200);
  };

  // Cart operations
  const handleAddToCart = (product: Product, selectedColor?: string, quantity: number = 1) => {
    const color = selectedColor || product.colors[0]?.name || 'Standard';
    setCart((prev) => {
      const existing = prev.find(
        (item) => item.product.id === product.id && item.selectedColor === color
      );
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.selectedColor === color
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity, selectedColor: color }];
    });
    showToast(`Added "${product.name}" to your shopping bag`, 'cart');
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
    } else {
      setCart((prev) =>
        prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
      );
    }
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Wishlist operations
  const handleToggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        showToast(`Removed "${product.name}" from wishlist`, 'wishlist');
        return prev.filter((item) => item.id !== product.id);
      } else {
        showToast(`Saved "${product.name}" to your wishlist`, 'wishlist');
        return [...prev, product];
      }
    });
  };

  const handleRemoveFromWishlist = (productId: string) => {
    setWishlist((prev) => prev.filter((item) => item.id !== productId));
  };

  const handleMoveAllToCart = () => {
    wishlist.forEach((product) => {
      handleAddToCart(product);
    });
    setWishlist([]);
    setIsWishlistOpen(false);
    setIsCartOpen(true);
  };

  // Filtered collections
  const newArrivals = PRODUCTS.filter((p) => p.featuredInNewArrivals);
  const bestsellers = PRODUCTS.filter((p) => p.isBestseller);

  // Keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const scrollToShop = () => {
    const shopEl = document.getElementById('shop');
    shopEl?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToCategories = () => {
    const catEl = document.getElementById('categories');
    catEl?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F8F7F5] text-[#1A1A1A] flex flex-col antialiased selection:bg-[#8B6B4D]/20 selection:text-[#1A1A1A]">
      {/* Floating Sticky Glassmorphic Navbar */}
      <Navbar
        cart={cart}
        wishlist={wishlist}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenConsultation={() => setIsConsultationOpen(true)}
      />

      {/* Main Content Sections with exact spacing rhythm */}
      <main className="w-full max-w-[1440px] mx-auto flex-grow flex flex-col">
        {/* 1. Full-Width Luxury Hero */}
        <Hero
          onExploreClick={scrollToShop}
          onShowroomClick={scrollToCategories}
          onQuickViewPiece={(product) => setQuickViewProduct(product)}
        />

        {/* 2. Featured Collections ("Our New Collections") */}
        <FeaturedCollections
          products={newArrivals}
          wishlist={wishlist}
          onToggleWishlist={handleToggleWishlist}
          onAddToCart={handleAddToCart}
          onQuickView={(product) => setQuickViewProduct(product)}
          onViewAllClick={scrollToShop}
        />

        {/* 3. Category Showcase ("Most Recommend Spaces For You") */}
        <CategoryShowcase
          onSelectCategory={(catName) => {
            scrollToShop();
          }}
        />

        {/* 4. Signature Product Grid (6 Core Furniture Types) */}
        <ProductGrid
          products={PRODUCTS.slice(0, 6)}
          wishlist={wishlist}
          onToggleWishlist={handleToggleWishlist}
          onAddToCart={handleAddToCart}
          onQuickView={(product) => setQuickViewProduct(product)}
        />

        {/* 5. Why Choose Us Section ("The Aura & Forma Standard") */}
        <WhyChooseUs />

        {/* 6. Customer Testimonials ("Editorial Reviews") */}
        <CustomerTestimonials />

        {/* 7. Bestsellers Horizontal Carousel */}
        <BestsellersSection
          products={bestsellers}
          wishlist={wishlist}
          onToggleWishlist={handleToggleWishlist}
          onAddToCart={handleAddToCart}
          onQuickView={(product) => setQuickViewProduct(product)}
        />

        {/* 8. Interior Inspiration Banner ("Design Your Dream Home") */}
        <InteriorInspirationBanner
          onBookConsultation={() => setIsConsultationOpen(true)}
        />

        {/* 9. FAQ Accordion Section */}
        <FaqSection />

        {/* 10. Newsletter Subscription Section */}
        <NewsletterSection />
      </main>

      {/* 11. Dark Luxury Footer */}
      <Footer />

      {/* Slide-out Drawers & Modals */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onRemoveFromWishlist={handleRemoveFromWishlist}
        onAddToCart={(product) => handleAddToCart(product)}
        onMoveAllToCart={handleMoveAllToCart}
      />

      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        isWishlisted={
          quickViewProduct ? wishlist.some((w) => w.id === quickViewProduct.id) : false
        }
        onToggleWishlist={handleToggleWishlist}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={PRODUCTS}
        onSelectProduct={(product) => setQuickViewProduct(product)}
      />

      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />

      {/* Toast Feedback */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

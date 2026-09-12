import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ShieldCheck, Truck, Award, Headphones, ChevronDown, Sparkles, Compass, Play, Pause } from 'lucide-react';
import { ASSET_IMAGES, PRODUCTS } from '../data/products';

interface HeroProps {
  onExploreClick: () => void;
  onShowroomClick: () => void;
  onQuickViewPiece?: (product: (typeof PRODUCTS)[0]) => void;
}

const TYPING_PHRASES = [
  'Timeless Scandinavian Craft',
  'Quiet Architectural Warmth',
  'Solid Hardwoods & Bouclé',
  'Bespoke European Luxury',
  'Sustainable Heirloom Living',
];

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onShowroomClick, onQuickViewPiece }) => {
  // Parallax Scroll State
  const [scrollY, setScrollY] = useState(0);

  // Background Architectural Video State
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);

  // Mouse Hover Spotlight & 3D Tilt Coordinates
  const heroRef = useRef<HTMLElement | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, normalizedX: 0, normalizedY: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Typewriter Text Reveal State
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(80);

  // Featured Piece for the floating atelier widget (Avondale Sofa)
  const featuredHeroPiece = PRODUCTS[0];

  // Pause video if user prefers reduced motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches && videoRef.current) {
      videoRef.current.pause();
      setIsVideoPlaying(false);
    }
  }, []);

  const toggleVideoPlayback = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().catch(() => {});
      setIsVideoPlaying(true);
    } else {
      videoRef.current.pause();
      setIsVideoPlaying(false);
    }
  };

  // Parallax Scroll Listener
  useEffect(() => {
    let animationFrameId: number;
    const handleScroll = () => {
      animationFrameId = requestAnimationFrame(() => {
        setScrollY(window.scrollY);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Mouse Hover Handler for Hero Section
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    // Normalized coordinates from -1 to 1 for 3D tilt effects
    const normalizedX = (x / rect.width) * 2 - 1;
    const normalizedY = (y / rect.height) * 2 - 1;

    setMousePos({ x, y, normalizedX, normalizedY });
  };

  // Typewriter Effect
  useEffect(() => {
    const currentPhrase = TYPING_PHRASES[phraseIndex];

    const timer = setTimeout(() => {
      if (!isDeleting) {
        // Typing forward
        setDisplayedText(currentPhrase.substring(0, displayedText.length + 1));

        if (displayedText.length + 1 === currentPhrase.length) {
          // Pause at end of phrase
          setTypingSpeed(2200);
          setIsDeleting(true);
        } else {
          setTypingSpeed(65 + Math.random() * 30);
        }
      } else {
        // Backspacing
        setDisplayedText(currentPhrase.substring(0, displayedText.length - 1));

        if (displayedText.length - 1 === 0) {
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % TYPING_PHRASES.length);
          setTypingSpeed(400); // Pause before next word starts
        } else {
          setTypingSpeed(35);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, phraseIndex, typingSpeed]);

  return (
    <section
      ref={heroRef}
      id="hero"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full min-h-[92vh] lg:h-[95vh] flex items-center justify-center overflow-hidden bg-[#121212]"
    >
      {/* 1. Parallax Scrolling Background Architectural Video & Photography */}
      <div
        className="absolute inset-0 z-0 will-change-transform pointer-events-none"
        style={{
          transform: `translate3d(0, ${scrollY * 0.38}px, 0) scale(${1.08 + Math.min(scrollY * 0.0004, 0.1)})`,
          transition: 'transform 0.1s cubic-bezier(0.1, 0.9, 0.2, 1)',
        }}
      >
        {/* Base Photography Poster for immediate display while video initializes */}
        <img
          src={ASSET_IMAGES.heroLivingRoom}
          alt="Luxury Scandinavian living room interior with designer furniture"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Subtle, looping architectural interior video */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          poster={ASSET_IMAGES.heroLivingRoom}
          onLoadedData={() => setIsVideoLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ${
            isVideoLoaded ? 'opacity-85' : 'opacity-0'
          }`}
        >
          <source
            src="https://videos.pexels.com/video-files/7578552/7578552-hd_1920_1080_30fps.mp4"
            type="video/mp4"
          />
          <source
            src="https://videos.pexels.com/video-files/7578546/7578546-hd_1920_1080_30fps.mp4"
            type="video/mp4"
          />
        </video>

        {/* Cinematic dark luxury gradient overlays for crisp text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/35" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.55)_100%)]" />
      </div>

      {/* 2. Interactive Mouse Spotlight Glow Effect */}
      <div
        className="absolute inset-0 z-1 pointer-events-none transition-opacity duration-700 ease-out"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(750px circle at ${mousePos.x}px ${mousePos.y}px, rgba(139, 107, 77, 0.18), transparent 70%)`,
        }}
      />

      {/* 3. Hero Content with Scroll-based gentle elevation & fade */}
      <div
        className="relative z-10 w-full max-w-[1280px] mx-auto px-4 sm:px-6 pt-24 pb-10 sm:pt-28 sm:pb-16 lg:pt-32 lg:pb-20 flex flex-col justify-between h-full"
        style={{
          transform: `translate3d(0, ${scrollY * 0.12}px, 0)`,
          opacity: Math.max(0, 1 - scrollY / 700),
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center my-auto">
          {/* Main Typography Column */}
          <div className="lg:col-span-8 text-left">
            {/* Small Label with gentle pulsing indicator */}
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-white/12 backdrop-blur-md border border-white/20 text-white mb-4 sm:mb-6 shadow-sm hover:bg-white/20 transition-all duration-300">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#8B6B4D] animate-ping" />
              <span className="text-[11px] sm:text-[12px] uppercase tracking-[0.2em] sm:tracking-[0.22em] font-medium font-sans flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#C9B596]" />
                Curated Luxury Furniture
              </span>
            </div>

            {/* Large Hero Title with Typing Effect / Text Reveal */}
            <h1 className="font-serif-luxury text-3xl sm:text-5xl lg:text-[62px] xl:text-[66px] font-bold text-white leading-[1.12] sm:leading-[1.08] tracking-tight mb-4 sm:mb-6 drop-shadow-sm min-h-[105px] sm:min-h-[145px] lg:min-h-[185px]">
              <span>Transform Your Living Space With </span>
              <br className="hidden sm:inline" />
              <span className="relative inline-block text-[#E6D5C3] font-serif-luxury underline decoration-[#8B6B4D]/60 underline-offset-8">
                {displayedText}
                {/* Blinking Luxury Cursor */}
                <span className="inline-block w-[3px] h-[0.88em] bg-[#C9B596] ml-1.5 align-middle animate-blink shadow-[0_0_8px_rgba(201,181,150,0.8)]" />
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-sm sm:text-lg md:text-xl text-white/85 font-light max-w-2xl leading-relaxed mb-6 sm:mb-8 lg:mb-10 font-sans">
              Handcrafted Scandinavian heirlooms designed for serenity, enduring comfort, and architectural harmony. Sourced from certified FSC® forests and finished with organic vegetal dyes.
            </p>

            {/* Action Buttons with Interactive Hover Effects */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-5 mb-8 sm:mb-10 lg:mb-14">
              {/* Primary Explore CTA with Shimmer and Magnetic Hover */}
              <button
                id="hero-explore-button"
                onClick={onExploreClick}
                className="relative overflow-hidden inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 bg-[#8B6B4D] hover:bg-[#6F533B] text-white text-xs sm:text-sm uppercase tracking-[0.16em] sm:tracking-[0.18em] font-medium rounded-full transition-all duration-300 shadow-[0_8px_30px_rgba(139,107,77,0.4)] hover:shadow-[0_14px_44px_rgba(139,107,77,0.6)] transform hover:-translate-y-1 hover:scale-[1.02] cursor-pointer group"
              >
                {/* Shimmer Light Streak */}
                <div className="absolute inset-0 -translate-x-full group-hover:animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
                <span className="relative z-10">Explore Collection</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5 relative z-10" />
              </button>

              {/* Secondary Showroom CTA with Glassmorphic Border Glow */}
              <button
                id="hero-showroom-button"
                onClick={onShowroomClick}
                className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm uppercase tracking-[0.16em] sm:tracking-[0.18em] font-medium rounded-full backdrop-blur-md border border-white/25 hover:border-white/70 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(255,255,255,0.15)] transform hover:-translate-y-0.5 cursor-pointer group"
              >
                <Compass className="w-4 h-4 text-[#C9B596] transition-transform duration-500 group-hover:rotate-45" />
                <span>View Showroom</span>
              </button>
            </div>

            {/* Trust Indicators with Mobile-Optimized Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 lg:gap-6 pt-4 sm:pt-6 border-t border-white/15">
              <div className="flex items-center gap-2 sm:gap-3 text-white/90 group p-1.5 sm:p-2 rounded-xl transition-colors hover:bg-white/5 cursor-default">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/15 group-hover:border-[#8B6B4D] group-hover:bg-[#8B6B4D]/30 transition-all duration-300">
                  <Truck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C9B596] group-hover:scale-110 transition-transform" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[11px] sm:text-xs md:text-sm font-medium tracking-wide truncate">Free Delivery</span>
                  <span className="text-[10px] sm:text-[11px] text-white/60 font-light truncate">White-glove placement</span>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3 text-white/90 group p-1.5 sm:p-2 rounded-xl transition-colors hover:bg-white/5 cursor-default">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/15 group-hover:border-[#8B6B4D] group-hover:bg-[#8B6B4D]/30 transition-all duration-300">
                  <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C9B596] group-hover:scale-110 transition-transform" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[11px] sm:text-xs md:text-sm font-medium tracking-wide truncate">Premium Quality</span>
                  <span className="text-[10px] sm:text-[11px] text-white/60 font-light truncate">Solid FSC® hardwoods</span>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3 text-white/90 group p-1.5 sm:p-2 rounded-xl transition-colors hover:bg-white/5 cursor-default">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/15 group-hover:border-[#8B6B4D] group-hover:bg-[#8B6B4D]/30 transition-all duration-300">
                  <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C9B596] group-hover:scale-110 transition-transform" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[11px] sm:text-xs md:text-sm font-medium tracking-wide truncate">Secure Payment</span>
                  <span className="text-[10px] sm:text-[11px] text-white/60 font-light truncate">256-bit encrypted</span>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3 text-white/90 group p-1.5 sm:p-2 rounded-xl transition-colors hover:bg-white/5 cursor-default">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/15 group-hover:border-[#8B6B4D] group-hover:bg-[#8B6B4D]/30 transition-all duration-300">
                  <Headphones className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C9B596] group-hover:scale-110 transition-transform" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[11px] sm:text-xs md:text-sm font-medium tracking-wide truncate">5-Star Support</span>
                  <span className="text-[10px] sm:text-[11px] text-white/60 font-light truncate">Personal concierge</span>
                </div>
              </div>
            </div>
          </div>

          {/* 4. Interactive Floating Atelier Feature Showcase (Hover 3D Tilt Effect) */}
          <div className="hidden lg:block lg:col-span-4">
            <div
              className="relative group animate-float hover-pause transition-transform duration-300 ease-out cursor-pointer"
              style={{
                transform: isHovered
                  ? `perspective(1000px) rotateX(${mousePos.normalizedY * -8}deg) rotateY(${mousePos.normalizedX * 8}deg) translateZ(20px)`
                  : 'none',
              }}
              onClick={() => onQuickViewPiece && onQuickViewPiece(featuredHeroPiece)}
            >
              {/* Floating Glassmorphic Atelier Card */}
              <div className="bg-white/15 backdrop-blur-xl rounded-[28px] p-6 border border-white/25 shadow-[0_20px_50px_rgba(0,0,0,0.35)] group-hover:border-white/50 group-hover:bg-white/20 transition-all duration-500">
                {/* Hotspot Ping Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B6B4D]/40 backdrop-blur-md border border-white/20 text-white text-[11px] font-medium tracking-wider uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C9B596] animate-pulse" />
                    <span>Featured in Atelier</span>
                  </div>

                  <span className="text-xs text-white/70 font-mono tracking-wider">
                    EST. 2018
                  </span>
                </div>

                {/* Product Imagery Thumbnail with Zoom Hover */}
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-white/10 p-3 mb-4 flex items-center justify-center border border-white/10 group-hover:border-white/30 transition-all">
                  <img
                    src={featuredHeroPiece.image}
                    alt={featuredHeroPiece.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Glowing hover badge */}
                  <span className="absolute bottom-2.5 right-2.5 text-[10px] font-medium tracking-wider uppercase px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20">
                    Touch To Inspect
                  </span>
                </div>

                {/* Card Title and Details */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-serif-luxury text-xl font-medium text-white group-hover:text-[#E6D5C3] transition-colors">
                      {featuredHeroPiece.name}
                    </h3>
                    <p className="text-xs text-white/70 font-light mt-0.5 line-clamp-1">
                      Alabaster Bouclé • Solid Nordic Oak
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-serif-luxury text-lg font-bold text-white block">
                      ${featuredHeroPiece.price.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-[#C9B596] uppercase tracking-wider block">
                      In Showroom
                    </span>
                  </div>
                </div>

                {/* Hover Reveal Quick Inspect Bar */}
                <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between text-xs text-white/80 group-hover:text-white transition-colors">
                  <span className="text-[11px] font-light">60-Day In-Home Trial</span>
                  <span className="text-xs font-medium text-[#C9B596] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Quick view</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Subtle Scroll Down Prompt with Parallax bounce */}
        <div className="hidden lg:flex justify-center items-center mt-4">
          <a
            href="#new-arrivals"
            aria-label="Scroll down to featured collections"
            className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/25 hover:border-white/50 transition-all animate-bounce cursor-pointer group"
          >
            <ChevronDown className="w-5 h-5 text-white/80 group-hover:text-white transition-colors" />
          </a>
        </div>
      </div>

      {/* Architectural Ambient Video Control Pill */}
      <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-20 pointer-events-auto">
        <button
          onClick={toggleVideoPlayback}
          aria-label={isVideoPlaying ? 'Pause architectural background reel' : 'Play architectural background reel'}
          className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md border border-white/20 hover:border-white/40 text-white/80 hover:text-white transition-all duration-300 shadow-md cursor-pointer"
        >
          <span className="relative flex h-2 w-2">
            {isVideoPlaying && (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C9B596] opacity-75" />
            )}
            <span
              className={`relative inline-flex rounded-full h-2 w-2 ${
                isVideoPlaying ? 'bg-[#C9B596]' : 'bg-white/40'
              }`}
            />
          </span>
          <span className="text-[10px] sm:text-[11px] font-sans font-medium uppercase tracking-[0.16em] text-white/90">
            {isVideoPlaying ? 'Atelier Reel' : 'Reel Paused'}
          </span>
          {isVideoPlaying ? (
            <Pause className="w-3 h-3 text-white/70 group-hover:text-white transition-colors" />
          ) : (
            <Play className="w-3 h-3 text-[#C9B596] fill-[#C9B596] group-hover:scale-110 transition-transform" />
          )}
        </button>
      </div>
    </section>
  );
};

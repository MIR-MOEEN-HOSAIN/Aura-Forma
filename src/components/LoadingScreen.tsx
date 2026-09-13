import React, { useState, useEffect } from 'react';
import { ArrowRight, Compass, Sparkles } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
  minDurationMs?: number;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  onComplete,
  minDurationMs = 2000,
}) => {
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState('Initializing Atelier Heritage...');
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    const intervalTime = 35; // Update every 35ms for silky-smooth progress
    const totalDuration = minDurationMs;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const rawProgress = Math.min(100, Math.floor((elapsed / totalDuration) * 100));

      setProgress(rawProgress);

      // Status updates aligned with progress
      if (rawProgress < 25) {
        setStatusMessage('Initializing Atelier Heritage...');
      } else if (rawProgress < 55) {
        setStatusMessage('Curating Architectural Collections...');
      } else if (rawProgress < 85) {
        setStatusMessage('Calibrating Scandinavian Showroom & Lighting...');
      } else if (rawProgress < 100) {
        setStatusMessage('Finalizing Spaces & Materials...');
      } else {
        setStatusMessage('Redirecting to Landing Page...');
      }

      if (rawProgress >= 100) {
        clearInterval(interval);
        // Start smooth exit transition
        setTimeout(() => {
          triggerExit();
        }, 300);
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [minDurationMs]);

  const triggerExit = () => {
    setIsExiting(true);
    // Wait for the fade and scale transition to finish
    setTimeout(() => {
      onComplete();
      // Ensure landing page scrolls to top
      const heroElement = document.getElementById('hero');
      if (heroElement) {
        heroElement.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 650);
  };

  return (
    <div
      id="brand-loading-screen"
      role="status"
      aria-label="Loading Aura & Forma Atelier"
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#121110] text-[#F8F7F5] overflow-hidden transition-all duration-700 ease-out select-none ${
        isExiting
          ? 'opacity-0 scale-[1.03] pointer-events-none'
          : 'opacity-100 scale-100'
      }`}
    >
      {/* Background Architectural Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(139,107,77,0.18)_0%,rgba(18,17,16,0.95)_65%,#121110_100%)] pointer-events-none" />

      {/* Subtle Geometric Framing Lines */}
      <div className="absolute inset-6 sm:inset-10 border border-white/5 pointer-events-none rounded-2xl" />
      <div className="absolute top-10 left-10 hidden sm:flex items-center gap-2 text-white/30 text-[10px] uppercase tracking-[0.25em] font-mono">
        <span>Atelier Showroom</span>
        <span>•</span>
        <span>Copenhagen</span>
      </div>
      <div className="absolute top-10 right-10 hidden sm:flex items-center gap-1.5 text-white/30 text-[10px] uppercase tracking-[0.25em] font-mono">
        <Sparkles className="w-3 h-3 text-[#C9B596]/60" />
        <span>Nordic Modernism</span>
      </div>

      {/* Center Branding Showcase */}
      <div className="relative z-10 flex flex-col items-center max-w-md px-6 text-center">
        {/* Company Logo Emblem with Animated Radiant Ring */}
        <div className="relative mb-8 flex items-center justify-center">
          {/* Subtle pulsating back-glow */}
          <div className="absolute w-28 h-28 rounded-full bg-[#8B6B4D]/25 blur-xl animate-pulse" />

          {/* Outer rotating architectural compass/dashed ring */}
          <div className="absolute w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-dashed border-[#C9B596]/30 animate-[spin_20s_linear_infinite]" />

          {/* Concentric hairline ring */}
          <div className="absolute w-20 h-20 sm:w-24 sm:h-24 rounded-full border border-[#C9B596]/20" />

          {/* Core Brand Monogram Seal */}
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#2A2621] via-[#1E1B17] to-[#12110F] p-0.5 shadow-2xl border border-[#C9B596]/50 flex items-center justify-center group">
            <div className="w-full h-full rounded-full bg-gradient-to-br from-[#38322B] to-[#1A1815] flex items-center justify-center">
              <span className="font-serif-luxury text-2xl sm:text-3xl font-bold tracking-tight text-[#E8D9C5] drop-shadow-md">
                A
              </span>
            </div>
          </div>
        </div>

        {/* Company Typography */}
        <h1 className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl font-medium tracking-[0.22em] text-[#F8F7F5] mb-2 drop-shadow-sm">
          AURA & FORMA
        </h1>
        <p className="text-[10px] sm:text-xs uppercase tracking-[0.32em] text-[#C9B596] font-sans font-light mb-8">
          Atelier Copenhagen • Est. 2018
        </p>

        {/* Luxury Progress Bar */}
        <div className="w-64 sm:w-72 flex flex-col gap-2 mb-6">
          <div className="relative h-1 w-full bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
            <div
              className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-[#8B6B4D] via-[#C9B596] to-[#EAE0D3] rounded-full transition-all duration-100 ease-out shadow-[0_0_12px_rgba(201,181,150,0.6)]"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-white/50 font-mono tracking-widest px-0.5">
            <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.14em] text-[#C9B596]/80">
              {statusMessage}
            </span>
            <span className="text-white/70 font-semibold">{progress}%</span>
          </div>
        </div>

        {/* Quick Skip / Direct Redirect Button */}
        <button
          onClick={triggerExit}
          type="button"
          aria-label="Directly proceed to landing page"
          className="group inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 active:bg-white/15 border border-white/15 hover:border-[#C9B596]/60 text-white/80 hover:text-white transition-all duration-300 cursor-pointer text-xs uppercase tracking-[0.18em] shadow-lg mt-2"
        >
          <span>Enter Landing Page</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#C9B596] group-hover:translate-x-1 transition-transform duration-200" />
        </button>
      </div>

      {/* Footer Credentials */}
      <div className="absolute bottom-6 sm:bottom-8 text-center text-[10px] uppercase tracking-[0.2em] text-white/25">
        Nordic Craftsmanship & Architectural Furniture
      </div>
    </div>
  );
};

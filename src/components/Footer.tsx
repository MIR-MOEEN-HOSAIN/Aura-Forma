import React from 'react';
import { ArrowUp, Globe, MapPin, Mail, Phone } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="w-full bg-[#121212] text-[#BEBEBE] pt-14 sm:pt-20 pb-10 sm:pb-12 border-t border-white/10">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        {/* Top Branding Row */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-8 sm:pb-14 mb-8 sm:mb-14 border-b border-white/10 gap-6 sm:gap-8">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#8B6B4D] text-white flex items-center justify-center shrink-0">
              <span className="font-serif-luxury text-lg font-bold">A</span>
            </div>
            <div>
              <span className="font-serif-luxury text-xl sm:text-2xl font-medium tracking-[0.2em] text-white block">
                AURA & FORMA
              </span>
              <span className="text-[10px] uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[#BEBEBE]/70">
                Atelier Copenhagen • Est. 2018
              </span>
            </div>
          </div>

          <p className="text-xs sm:text-sm font-light text-[#BEBEBE]/80 max-w-md">
            Dedicated to creating timeless, sustainable furniture that enriches contemporary architectural spaces with warmth and tranquility.
          </p>

          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="self-start lg:self-auto flex items-center gap-2 text-[11px] sm:text-xs uppercase tracking-[0.16em] text-white/80 hover:text-white px-3.5 sm:px-4 py-2 rounded-full border border-white/20 hover:border-white transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 4 Columns Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 pb-10 sm:pb-16">
          {/* Col 1: Company */}
          <div>
            <h4 className="font-serif-luxury text-base sm:text-lg text-white font-medium mb-3.5 sm:mb-5 tracking-wide">
              Company
            </h4>
            <ul className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm font-light">
              <li>
                <a href="#why-us" className="hover:text-white transition-colors">Our Atelier Story</a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-white transition-colors">Artisanal Craft</a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-white transition-colors">Sustainability & FSC®</a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-white transition-colors">Editorial Press</a>
              </li>
              <li>
                <a href="#inspiration" className="hover:text-white transition-colors">Careers at Aura</a>
              </li>
            </ul>
          </div>

          {/* Col 2: Shop */}
          <div>
            <h4 className="font-serif-luxury text-base sm:text-lg text-white font-medium mb-3.5 sm:mb-5 tracking-wide">
              Shop Collections
            </h4>
            <ul className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm font-light">
              <li>
                <a href="#new-arrivals" className="hover:text-white transition-colors">New Arrivals</a>
              </li>
              <li>
                <a href="#shop" className="hover:text-white transition-colors">Living Room Seating</a>
              </li>
              <li>
                <a href="#shop" className="hover:text-white transition-colors">Dining & Entertaining</a>
              </li>
              <li>
                <a href="#shop" className="hover:text-white transition-colors">Architectural Workspace</a>
              </li>
              <li>
                <a href="#shop" className="hover:text-white transition-colors">Bedroom Sanctuaries</a>
              </li>
              <li>
                <a href="#categories" className="hover:text-white transition-colors">Outdoor & Terrace</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Support */}
          <div>
            <h4 className="font-serif-luxury text-base sm:text-lg text-white font-medium mb-3.5 sm:mb-5 tracking-wide">
              Support & Care
            </h4>
            <ul className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm font-light">
              <li>
                <a href="#faq" className="hover:text-white transition-colors">Client FAQ</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">White-Glove Delivery</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">60-Day In-Home Trial</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">25-Year Warranty</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">Natural Timber Care</a>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Showrooms */}
          <div>
            <h4 className="font-serif-luxury text-base sm:text-lg text-white font-medium mb-3.5 sm:mb-5 tracking-wide">
              Showrooms & Concierge
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm font-light">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#8B6B4D] shrink-0 mt-0.5" />
                <span>Bredgade 34, 1260 Copenhagen, Denmark</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#8B6B4D] shrink-0 mt-0.5" />
                <span>54 Bond Street, New York, NY 10012</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#8B6B4D] shrink-0" />
                <a href="mailto:concierge@aura-forma.com" className="hover:text-white transition-colors">
                  concierge@aura-forma.com
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#8B6B4D] shrink-0" />
                <span>+45 33 12 90 88</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 sm:pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-light text-[#BEBEBE]/70 text-center sm:text-left">
          <div>
            © {new Date().getFullYear()} Aura & Forma ApS. All rights reserved.
          </div>

          <div className="flex items-center flex-wrap justify-center gap-x-4 sm:gap-x-6 gap-y-2">
            <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white transition-colors cursor-pointer">Terms of Service</span>
            <span className="hover:text-white transition-colors cursor-pointer">Accessibility</span>
            <div className="flex items-center gap-1 text-white/80">
              <Globe className="w-3.5 h-3.5" />
              <span>USD ($)</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

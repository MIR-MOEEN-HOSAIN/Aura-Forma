import React, { useState } from 'react';
import { Mail, CheckCircle, ArrowRight } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <section id="newsletter" className="w-full py-14 sm:py-20 lg:py-24 bg-[#F6F4F1] border-t border-[#EAE7E3]/60">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-[24px] sm:rounded-[32px] p-5 sm:p-10 lg:p-14 border border-[#EAE7E3] shadow-[0_8px_32px_rgba(0,0,0,0.03)] text-center max-w-3xl mx-auto">
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#F8F7F5] border border-[#EAE7E3] text-[#8B6B4D] flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <Mail className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={1.5} />
          </div>

          <span className="text-[11px] sm:text-xs uppercase tracking-[0.22em] sm:tracking-[0.25em] text-[#8B6B4D] font-medium font-sans">
            The Atelier Gazette
          </span>

          <h2 className="font-serif-luxury text-2xl sm:text-4xl lg:text-[42px] font-semibold text-[#1A1A1A] tracking-tight leading-tight mt-1.5 sm:mt-2 mb-2 sm:mb-3">
            Stay Inspired
          </h2>

          <p className="text-xs sm:text-base text-[#6E6E6E] font-light max-w-lg mx-auto mb-6 sm:mb-8 leading-relaxed">
            Receive exclusive collections, interior inspiration, and private invitations to seasonal showroom viewings.
          </p>

          {subscribed ? (
            <div className="p-4 sm:p-5 rounded-2xl bg-[#3D8B5A]/10 border border-[#3D8B5A]/30 text-[#3D8B5A] flex items-center justify-center gap-2.5 max-w-md mx-auto animate-fade-in">
              <CheckCircle className="w-5 h-5 shrink-0" />
              <p className="text-xs sm:text-sm font-medium">
                Thank you. You are now welcomed to the Aura & Forma circle.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-2.5 sm:gap-3">
              <div className="relative flex-grow">
                <input
                  type="email"
                  id="newsletter-email-input"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-4 sm:px-5 py-3 sm:py-3.5 rounded-full bg-[#F8F7F5] border border-[#EAE7E3] text-xs sm:text-sm text-[#1A1A1A] placeholder-[#6E6E6E]/60 focus:outline-none focus:border-[#8B6B4D] focus:ring-1 focus:ring-[#8B6B4D] transition-all"
                />
              </div>

              <button
                type="submit"
                id="newsletter-submit-btn"
                className="px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-[#1A1A1A] hover:bg-[#8B6B4D] text-white text-[11px] sm:text-xs uppercase tracking-[0.14em] sm:tracking-[0.16em] font-medium transition-colors cursor-pointer shrink-0 shadow-sm flex items-center justify-center gap-2"
              >
                <span>Subscribe</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}

          <p className="text-[10px] sm:text-[11px] text-[#6E6E6E] mt-3 sm:mt-4 font-light">
            We respect your privacy. Unsubscribe seamlessly at any time.
          </p>
        </div>
      </div>
    </section>
  );
};

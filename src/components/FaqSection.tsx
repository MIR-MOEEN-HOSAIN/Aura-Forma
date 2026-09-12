import React, { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import { FAQS } from '../data/products';

export const FaqSection: React.FC = () => {
  const [openFaqId, setOpenFaqId] = useState<string | null>(FAQS[0]?.id || null);

  const toggleFaq = (id: string) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="w-full py-14 sm:py-20 lg:py-28 bg-[#F6F4F1]">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#EAE7E3] text-[#8B6B4D] text-xs uppercase tracking-[0.2em] font-medium font-sans mb-3 shadow-2xs">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Assistance & Guidance</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-[42px] font-semibold text-[#1A1A1A] tracking-tight leading-tight">
            You've Got Questions & We've Got Answers
          </h2>
          <p className="mt-2.5 sm:mt-3 text-sm sm:text-base text-[#6E6E6E] font-light leading-relaxed">
            Everything you need to know about our handcrafted pieces, bespoke materials, and white-glove delivery experience.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5 sm:space-y-4">
          {FAQS.map((faq) => {
            const isOpen = openFaqId === faq.id;

            return (
              <div
                key={faq.id}
                id={`faq-item-${faq.id}`}
                className="bg-white rounded-[18px] sm:rounded-[20px] border border-[#EAE7E3]/90 overflow-hidden transition-all duration-300 shadow-[0_2px_12px_rgba(0,0,0,0.02)]"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full p-4 sm:p-6 lg:p-7 text-left flex items-center justify-between gap-3 sm:gap-4 cursor-pointer group"
                >
                  <span className="font-serif-luxury text-base sm:text-xl font-medium text-[#1A1A1A] group-hover:text-[#8B6B4D] transition-colors leading-snug">
                    {faq.question}
                  </span>
                  <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-[#EAE7E3] flex items-center justify-center shrink-0 transition-colors duration-300 ${
                    isOpen ? 'bg-[#8B6B4D] text-white border-[#8B6B4D]' : 'bg-[#F8F7F5] text-[#1A1A1A]'
                  }`}>
                    {isOpen ? (
                      <Minus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    ) : (
                      <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    )}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-6 lg:px-7 pb-5 sm:pb-6 pt-1 text-xs sm:text-sm text-[#6E6E6E] font-light leading-relaxed border-t border-[#EAE7E3]/50">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Need more help banner */}
        <div className="mt-8 sm:mt-12 p-4 sm:p-6 rounded-2xl bg-[#EFECE6]/60 border border-[#EAE7E3] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h3 className="text-sm font-semibold text-[#1A1A1A]">Still have a specific architectural query?</h3>
            <p className="text-xs text-[#6E6E6E] mt-0.5 font-light">Our dedicated atelier concierge team responds within 2 hours.</p>
          </div>
          <a
            href="#newsletter"
            className="w-full sm:w-auto text-center px-5 py-2.5 rounded-full bg-[#1A1A1A] text-white hover:bg-[#8B6B4D] text-xs uppercase tracking-[0.14em] font-medium transition-colors cursor-pointer"
          >
            Contact Concierge
          </a>
        </div>
      </div>
    </section>
  );
};

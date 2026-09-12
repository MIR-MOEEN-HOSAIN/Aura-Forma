import React from 'react';
import { Hammer, Truck, Leaf, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const WhyChooseUs: React.FC = () => {
  const { ref, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.1 });

  const features = [
    {
      id: 'feature-craft',
      icon: Hammer,
      title: 'Handcrafted Quality',
      subtitle: 'Artisanal Joinery',
      description: 'Every frame is hand-mortised by multi-generational Scandinavian craftsmen using solid kiln-dried timber built to outlast trends.',
    },
    {
      id: 'feature-delivery',
      icon: Truck,
      title: 'Free White-Glove Delivery',
      subtitle: 'Room of Choice',
      description: 'Our two-person concierge delivers directly inside your home, completes full assembly, and removes all sustainable packaging.',
    },
    {
      id: 'feature-eco',
      icon: Leaf,
      title: 'Sustainable Materials',
      subtitle: 'FSC® & OEKO-TEX®',
      description: '100% responsibly harvested European hardwoods and chemical-free, non-toxic vegetal-tanned Italian leathers.',
    },
    {
      id: 'feature-support',
      icon: ShieldCheck,
      title: 'Lifetime Guarantee',
      subtitle: '25-Year Warranty',
      description: 'Uncompromising structural durability backed by our 25-year structural warranty and a 60-day in-home trial period.',
    },
  ];

  return (
    <section
      ref={ref}
      id="why-us"
      className="relative w-full py-14 sm:py-20 lg:py-28 bg-[#F8F7F5] overflow-hidden"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        {/* Section Header with Fade & Slide Down */}
        <div
          className={`text-center max-w-2xl mx-auto mb-10 sm:mb-14 transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#EAE7E3] text-[#8B6B4D] mb-3 shadow-2xs animate-float-slow">
            <Sparkles className="w-3.5 h-3.5 text-[#8B6B4D]" />
            <span className="text-[11px] uppercase tracking-[0.25em] font-medium font-sans">
              The Aura & Forma Standard
            </span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-[44px] font-semibold text-[#1A1A1A] tracking-tight leading-tight">
            What We Can Offer You
          </h2>
          <p className="mt-2.5 sm:mt-3 text-sm sm:text-base text-[#6E6E6E] font-light leading-relaxed">
            High-quality, meticulously selected and functional furniture designed to elevate your space with quiet luxury.
          </p>
        </div>

        {/* 4 Feature Cards with Staggered Slide In */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                id={item.id}
                className={`group bg-white rounded-[22px] sm:rounded-[26px] p-5 sm:p-7 border border-[#EAE7E3]/80 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_45px_rgba(139,107,77,0.12)] transition-all duration-700 ease-out hover:-translate-y-2 flex flex-col justify-between ${
                  isVisible
                    ? 'opacity-100 translate-y-0 scale-100'
                    : 'opacity-0 translate-y-12 scale-95'
                }`}
                style={{
                  transitionDelay: `${index * 110}ms`,
                }}
              >
                <div>
                  {/* Floating Icon Box */}
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#F8F7F5] border border-[#EAE7E3] text-[#8B6B4D] flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-[#8B6B4D] group-hover:text-white transition-all duration-300 shadow-2xs group-hover:scale-105">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 animate-float-slow" strokeWidth={1.5} />
                  </div>

                  <span className="text-[11px] uppercase tracking-[0.16em] text-[#8B6B4D] font-medium font-sans block mb-1">
                    {item.subtitle}
                  </span>

                  <h3 className="font-serif-luxury text-lg sm:text-xl font-medium text-[#1A1A1A] mb-2 sm:mb-3 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#6E6E6E] font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 sm:pt-6 sm:mt-6 border-t border-[#EAE7E3]/60 flex items-center text-xs font-medium uppercase tracking-wider text-[#1A1A1A] group-hover:text-[#8B6B4D] transition-colors cursor-pointer">
                  <span>Learn more</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

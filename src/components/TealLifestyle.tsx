import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Award, Compass, Search } from "lucide-react";
import { LIFESTYLE_TEAL_IMAGE, LISTING_BEDROOM_IMAGE, PARTNER_LOGOS } from "../data";

export default function TealLifestyle() {
  const [carouselIndex, setCarouselIndex] = useState(0);

  // Carousel controls
  const handlePrev = () => {
    setCarouselIndex((prev) => (prev === 0 ? PARTNER_LOGOS.length - 3 : prev - 1));
  };

  const handleNext = () => {
    setCarouselIndex((prev) => (prev >= PARTNER_LOGOS.length - 3 ? 0 : prev + 1));
  };

  return (
    <section className="relative overflow-hidden w-full" id="lifestyle">
      {/* 1. Full-bleed contrasting emerald lifestyle banner */}
      <div className="relative w-full h-[600px] md:h-[680px] bg-[#0B3C33] flex items-center justify-center">
        
        {/* Full-bleed background image with emerald overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={LIFESTYLE_TEAL_IMAGE}
            alt="Dramatic luxury twilight pool pavilion"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
            id="lifestyle-bg-image"
          />
          {/* Emerald-deep vignette tint layer */}
          <div className="absolute inset-0 bg-[#0B3C33]/55 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B3C33] via-transparent to-[#0B3C33]/30" />
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full h-full flex flex-col justify-center items-start">
          
          <div className="max-w-2xl text-left space-y-6">
            <span className="text-[10px] font-sans tracking-[0.35em] text-[#C8A467] uppercase block font-semibold">
              EXPERIENTIAL SOVEREIGNTY
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#F5EFE3] leading-[1.1] tracking-wide">
              Where Nature <br />
              Meets Your <span className="font-serif-italics text-[#C8A467]">Secure Investment</span>
            </h2>
            <p className="text-sm text-[#F5EFE3]/80 font-sans font-light leading-relaxed max-w-md">
              A premium gated landscape layout crafted in nature's lap. Our signature layout plots are beautifully integrated with botanical parks, 60-ft paved highways, and high-yielding soil conditions, making them Coimbatore's premier investment hubs.
            </p>
          </div>

          {/* Floating small card overlay showing a featured listing image */}
          <div className="absolute right-4 bottom-8 sm:right-6 md:right-12 lg:right-24 md:bottom-16 z-20 w-72 bg-[#F2EBDD] p-4 rounded-xl border border-[#C8A467] shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500 hidden sm:block">
            <span className="text-[9px] font-sans text-[#B08A4E] tracking-widest uppercase font-bold block mb-2">
              FEATURED PLOT DETAIL
            </span>
            <div className="aspect-[3/4] rounded-lg overflow-hidden border border-[#C8A467]/30">
              <img
                src={LISTING_BEDROOM_IMAGE}
                alt="Bespoke layout parcel detail"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="mt-3 text-left">
              <p className="font-serif text-sm text-[#241811] italic font-medium">"The Emerald Crest Layout"</p>
              <p className="text-[10px] text-[#241811]/60 font-sans mt-0.5">Featuring wide tarred avenues & premium secure boundaries</p>
            </div>
          </div>

        </div>
      </div>

      {/* 2. Partner / Brand Logo Carousel directly below the full-bleed section */}
      <div className="bg-[#06221D] text-[#F5EFE3] py-12 border-t border-[#C8A467]/20 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            
            {/* Title */}
            <div className="text-left flex-shrink-0">
              <span className="text-[9px] font-sans tracking-[0.2em] text-[#C8A467] uppercase block font-semibold mb-1">
                SECURED COMPLIANCE
              </span>
              <h3 className="font-serif text-lg text-[#F5EFE3] tracking-wide">
                Our Registered <span className="font-serif-italics text-[#C8A467]">Alliances</span>
              </h3>
            </div>

            {/* Slider container */}
            <div className="flex items-center gap-4 flex-grow max-w-2xl justify-between">
              
              {/* Left Arrow */}
              <button
                onClick={handlePrev}
                className="p-2 border border-[#C8A467]/30 hover:border-[#C8A467] hover:bg-white/5 rounded-full transition-all text-[#C8A467] cursor-pointer focus:outline-none"
                aria-label="Previous partner logo"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Logos view window */}
              <div className="overflow-hidden relative w-full h-12 flex items-center">
                <div
                  className="flex gap-4 md:gap-8 transition-transform duration-500 ease-in-out w-full"
                  style={{
                    transform: `translateX(-${carouselIndex * 33.33}%)`
                  }}
                  id="partner-carousel-strip"
                >
                  {PARTNER_LOGOS.map((partner) => (
                    <div
                      key={partner.id}
                      className="min-w-[33.33%] flex-shrink-0 flex items-center justify-center border-r border-[#C8A467]/10 last:border-0"
                    >
                      <div className="flex items-center gap-2 text-center opacity-85 hover:opacity-100 transition-opacity">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#C8A467]" />
                        <span className="font-sans text-[10px] tracking-[0.15em] text-[#F5EFE3] font-semibold uppercase whitespace-nowrap">
                          {partner.name}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Arrow */}
              <button
                onClick={handleNext}
                className="p-2 border border-[#C8A467]/30 hover:border-[#C8A467] hover:bg-white/5 rounded-full transition-all text-[#C8A467] cursor-pointer focus:outline-none"
                aria-label="Next partner logo"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

import React from "react";
import { ArrowRight } from "lucide-react";
import { INTERIOR_ARCH_IMAGE } from "../data";

interface ClosingCTAProps {
  onBookVisit: () => void;
}

export default function ClosingCTA({ onBookVisit }: ClosingCTAProps) {
  return (
    <section className="relative bg-gradient-to-br from-[#2E1E14] to-[#3D2A1C] text-[#F5EFE3] py-24 overflow-hidden border-b border-[#C8A467]/10" id="contact-banner">
      
      {/* Decorative radial lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(200,164,103,0.1),transparent_50%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Headline & Button */}
          <div className="lg:col-span-7 space-y-6 text-left" id="cta-left-content">
            <span className="text-[10px] font-sans tracking-[0.3em] text-[#C8A467] uppercase block font-semibold">
              THE ENDURING SEARCH
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-tight text-[#F5EFE3]">
              Share your requirements, <br />
              we'll <span className="font-serif-italics text-[#C8A467]">find your plot</span>
            </h2>
            <p className="text-sm text-[#F5EFE3]/80 font-sans max-w-lg leading-relaxed font-light">
              Looking for a custom acreage, specific commercial corner, or high-yield residential plot? Many of our premium DTCP & TNRERA approved layouts are kept off-market for priority portfolio clients. Register your details with our team to find your ideal land plot.
            </p>
            <div className="pt-4">
              <button
                onClick={onBookVisit}
                className="px-8 py-4 bg-[#B08A4E] hover:bg-[#C8A467] active:bg-[#B08A4E] text-[#2E1E14] font-bold text-xs tracking-[0.18em] uppercase rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 cursor-pointer font-sans"
                id="cta-trigger-button"
              >
                <span>COMMISSION LAYOUT SEARCH</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right: Beautiful image showing a key/interior detail */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end" id="cta-right-content">
            <div className="relative w-full max-w-sm">
              {/* Outer gold-rimmed design frame */}
              <div className="absolute -inset-3 border border-[#C8A467]/20 rounded-xl transform -rotate-1 pointer-events-none" />
              
              {/* Image box */}
              <div className="relative aspect-square rounded-xl overflow-hidden border border-[#C8A467]/30 shadow-2xl">
                <img
                  src={INTERIOR_ARCH_IMAGE}
                  alt="Kuberaa premium layout development displaying broad pathways & serene sunset landscapes"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  id="cta-property-image"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2E1E14]/40 via-transparent to-transparent" />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Reused gold diamond divider graphic placed at bottom center */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-20" id="cta-reused-divider">
        <div className="relative w-14 h-14 bg-gradient-to-br from-[#C8A467] via-[#B08A4E] to-[#E5C793] rotate-45 border-2 border-[#2E1E14] shadow-2xl flex items-center justify-center">
          <div className="w-10 h-10 border border-[#F2EBDD]/60 flex items-center justify-center">
            <div className="w-2.5 h-2.5 rotate-45 bg-[#F2EBDD]" />
          </div>
        </div>
      </div>

    </section>
  );
}

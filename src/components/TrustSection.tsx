import React from "react";
import { Clock, ShieldCheck, MapPin, Award } from "lucide-react";
import { TRUST_DATA, INTERIOR_ARCH_IMAGE } from "../data";

export default function TrustSection() {
  // Helper to map icon name to component
  const renderIcon = (name: string) => {
    switch (name) {
      case "Clock":
        return <Clock className="w-5 h-5 text-[#B08A4E]" />;
      case "ShieldCheck":
        return <ShieldCheck className="w-5 h-5 text-[#B08A4E]" />;
      case "MapPin":
        return <MapPin className="w-5 h-5 text-[#B08A4E]" />;
      case "Award":
        return <Award className="w-5 h-5 text-[#B08A4E]" />;
      default:
        return <Award className="w-5 h-5 text-[#B08A4E]" />;
    }
  };

  // Group the data into left (first 2) and right (last 2)
  const leftBlocks = TRUST_DATA.slice(0, 2);
  const rightBlocks = TRUST_DATA.slice(2, 4);

  return (
    <section className="bg-[#F2EBDD] py-24 relative overflow-hidden border-b border-[#C8A467]/15" id="trust">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center mb-16">
          <span className="text-[10px] font-sans tracking-[0.3em] text-[#B08A4E] uppercase block font-semibold mb-2">
            STATION OF TRUST
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-[#241811]">
            Our Unwritten <span className="font-serif-italics text-[#B08A4E]">Covenant</span>
          </h2>
          <div className="w-12 h-[1px] bg-[#B08A4E] mx-auto mt-4" />
        </div>

        {/* 3-Column Symmetrical Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center" id="trust-grid-container">
          
          {/* Left Column: 2 Trust Blocks */}
          <div className="lg:col-span-4 space-y-12" id="trust-left-column">
            {leftBlocks.map((item) => (
              <div key={item.id} className="flex gap-4 items-start text-left group" id={`trust-block-${item.id}`}>
                <div className="flex-shrink-0 w-10 h-10 rounded-full border border-[#C8A467]/30 bg-white/40 flex items-center justify-center shadow-inner group-hover:border-[#B08A4E] transition-colors duration-300">
                  {renderIcon(item.iconName)}
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-sans text-xs tracking-[0.18em] font-bold text-[#241811] uppercase">
                    {item.title}
                  </h3>
                  <p className="font-sans text-xs text-[#241811]/70 leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Center Column: Ornate Scalloped / Arched Frame */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center" id="trust-center-frame">
            <div className="relative w-full max-w-[280px] sm:max-w-[320px]">
              
              {/* Ornate Gold Frame Background and Border Layer */}
              <div className="absolute inset-0 border-2 border-[#C8A467] rounded-t-[140px] rounded-b-xl -m-3 pointer-events-none" />
              <div className="absolute inset-0 border border-[#B08A4E]/30 rounded-t-[132px] rounded-b-lg -m-1.5 pointer-events-none" />
              
              {/* Ornate Scalloped corner decals (inline SVGs) */}
              <div className="absolute -top-6 -left-6 text-[#C8A467] w-8 h-8 pointer-events-none">
                <svg viewBox="0 0 100 100" fill="currentColor">
                  <circle cx="50" cy="50" r="10" />
                  <path d="M 50 50 L 50 0 M 50 50 L 0 50" stroke="currentColor" strokeWidth="6" />
                  <path d="M 50 50 Q 20 20 0 50 Q 20 80 50 50 Q 80 80 50 50 Q 80 20 50 50" stroke="currentColor" strokeWidth="3" fill="none" />
                </svg>
              </div>
              <div className="absolute -top-6 -right-6 text-[#C8A467] w-8 h-8 pointer-events-none transform rotate-90">
                <svg viewBox="0 0 100 100" fill="currentColor">
                  <circle cx="50" cy="50" r="10" />
                  <path d="M 50 50 L 50 0 M 50 50 L 0 50" stroke="currentColor" strokeWidth="6" />
                  <path d="M 50 50 Q 20 20 0 50 Q 20 80 50 50 Q 80 80 50 50 Q 80 20 50 50" stroke="currentColor" strokeWidth="3" fill="none" />
                </svg>
              </div>

              {/* Main Image in Arch Container */}
              <div className="relative arch-frame aspect-[3/4] border-2 border-[#C8A467] bg-[#2E1E14]/10 shadow-[0_15px_35px_rgba(36,24,17,0.15)] group overflow-hidden">
                <img
                  src={INTERIOR_ARCH_IMAGE}
                  alt="Kuberaa luxury layout plot development showing structural arches & avenue entries"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  id="trust-arch-image"
                />
                {/* Subtle bronze shade */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#2E1E14]/30 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Bottom Gold Ornament */}
              <div className="flex justify-center mt-3 pointer-events-none">
                <div className="w-3 h-3 rotate-45 bg-[#C8A467]" />
              </div>

              {/* Italic Caption below */}
              <p className="text-center text-xs font-serif-italics text-[#241811]/80 mt-4 leading-relaxed px-4">
                "Our hand-crafted layout entrance, showcasing custom stone-clad walls, elegant entry archways, and premium blacktop layout streets."
              </p>

            </div>
          </div>

          {/* Right Column: 2 Trust Blocks */}
          <div className="lg:col-span-4 space-y-12" id="trust-right-column">
            {rightBlocks.map((item) => (
              <div key={item.id} className="flex gap-4 items-start text-left group" id={`trust-block-${item.id}`}>
                <div className="flex-shrink-0 w-10 h-10 rounded-full border border-[#C8A467]/30 bg-white/40 flex items-center justify-center shadow-inner group-hover:border-[#B08A4E] transition-colors duration-300">
                  {renderIcon(item.iconName)}
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-sans text-xs tracking-[0.18em] font-bold text-[#241811] uppercase">
                    {item.title}
                  </h3>
                  <p className="font-sans text-xs text-[#241811]/70 leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}

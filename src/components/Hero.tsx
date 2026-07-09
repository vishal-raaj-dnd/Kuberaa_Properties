import React from "react";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { HERO_IMAGE } from "../data";

interface HeroProps {
  onBookVisit: () => void;
}

export default function Hero({ onBookVisit }: HeroProps) {
  return (
    <header className="relative bg-gradient-to-b from-[#2E1E14] via-[#332217] to-[#3D2A1C] text-[#F5EFE3] pt-32 pb-24 overflow-hidden" id="hero-section">
      {/* Decorative subtle texture/glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_30%,rgba(200,164,103,0.15),transparent_45%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Side: Oversized Headline & Copy */}
          <div className="lg:col-span-6 space-y-8 text-left" id="hero-left-content">
            {/* Upper kicker tag */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-2"
            >
              <div className="w-8 h-[1px] bg-[#C8A467]" />
              <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-[#C8A467] font-semibold">
                KUBERAA PREMIUM LANDSCAPES
              </span>
            </motion.div>

            {/* Headline - 3 lines with mixed italics */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-serif text-5xl md:text-6xl xl:text-7xl leading-[1.1] tracking-wide text-[#F5EFE3]"
              id="hero-headline"
            >
              Every <span className="font-serif-italics text-[#C8A467]">Plot</span> <br />
              Tells a <br />
              <span className="font-serif-italics text-[#C8A467]">Generational</span> Story
            </motion.h1>

            {/* Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-sm md:text-base text-[#F5EFE3]/80 font-sans max-w-lg leading-relaxed font-light"
              id="hero-description"
            >
              Kuberaa Properties specializes exclusively in premier commercial, residential, and high-growth investment layout plots. Fully DTCP and TNRERA approved, with clear legal titles and outstanding planned infrastructure.
            </motion.p>

            {/* Gold Pill CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="pt-2"
            >
              <button
                onClick={onBookVisit}
                className="group px-8 py-4 bg-[#B08A4E] hover:bg-[#C8A467] active:bg-[#B08A4E] text-[#2E1E14] font-bold text-xs tracking-[0.18em] uppercase rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 cursor-pointer font-sans"
                id="hero-cta-button"
              >
                <span>Initiate Consultation</span>
                <span className="w-5 h-5 rounded-full bg-[#2E1E14]/10 group-hover:bg-[#2E1E14]/20 flex items-center justify-center transition-all duration-300">
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#2E1E14]" />
                </span>
              </button>
            </motion.div>
          </div>

          {/* Right Side: Floating Building Image */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-end" id="hero-right-content">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, type: "spring", stiffness: 40 }}
              className="relative w-full max-w-lg lg:max-w-none"
            >
              {/* Gold frame background accent */}
              <div className="absolute -inset-2 rounded-2xl border border-[#C8A467]/30 transform rotate-1 pointer-events-none" />
              
              {/* Main Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-[#C8A467]/20 group">
                <img
                  src={HERO_IMAGE}
                  alt="Aurelius Travertine Estate at sunset"
                  className="w-full aspect-[4/3] object-cover transition-transform duration-1000 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  id="hero-main-image"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2E1E14]/60 via-transparent to-transparent opacity-80" />
                
                {/* Floating location tag */}
                <div className="absolute bottom-6 left-6 bg-[#2E1E14]/90 backdrop-blur-md px-4 py-2 rounded-lg border border-[#C8A467]/40">
                  <p className="text-[9px] font-sans text-[#C8A467] tracking-widest uppercase font-semibold">COIMBATORE CORRIDOR</p>
                  <p className="font-serif text-xs text-[#F5EFE3]">DTCP & TNRERA Registered</p>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Wide gold-gradient diamond/rhombus shape as a decorative section divider */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-20" id="hero-decorative-divider">
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#C8A467] via-[#B08A4E] to-[#E5C793] rotate-45 border-2 border-[#2E1E14] shadow-2xl flex items-center justify-center">
          {/* Nested smaller diamond */}
          <div className="w-12 h-12 sm:w-14 sm:h-14 border border-[#F2EBDD]/60 flex items-center justify-center">
            <span className="font-serif text-[#F2EBDD] font-light text-base sm:text-lg">K</span>
          </div>
        </div>
      </div>

    </header>
  );
}

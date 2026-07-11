import React from "react";
import Stats from "./Stats";
import TrustSection from "./TrustSection";
import { INTERIOR_ARCH_IMAGE, HERO_IMAGE } from "../data";

export default function AboutPage() {
  return (
    <div className="pt-24 bg-[#F2EBDD]" id="about-page">
      {/* 1. Page Header Banner */}
      <div className="bg-[#2E1E14] text-[#F5EFE3] py-20 border-b border-[#C8A467]/15 relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: `url(${HERO_IMAGE})` }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="text-[10px] font-sans tracking-[0.3em] text-[#C8A467] uppercase block font-semibold mb-2">
            KUBERAA HERITAGE
          </span>
          <h1 className="font-serif text-4xl md:text-5xl text-[#F5EFE3]">
            Crafting Sovereign <span className="font-serif-italics text-[#C8A467]">Layout Lands</span>
          </h1>
          <p className="font-sans text-sm text-[#F5EFE3]/70 font-light max-w-2xl mx-auto mt-4 leading-relaxed">
            For over a decade, we have quietly built landmark layout developments in Coimbatore and Chennai, combining verified legal titles with elite modern infrastructure.
          </p>
        </div>
      </div>

      {/* 2. Editorial Narrative Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Image in premium borders */}
          <div className="lg:col-span-6 relative">
            <div className="absolute inset-0 border border-[#C8A467]/40 rounded-lg -m-4 pointer-events-none" />
            <div className="relative rounded-lg overflow-hidden border border-[#C8A467]/80 bg-[#2E1E14]/10 shadow-[0_15px_30px_rgba(36,24,17,0.1)]">
              <img
                src={INTERIOR_ARCH_IMAGE}
                alt="Kuberaa Properties premium land layout infrastructure"
                className="w-full aspect-[4/3] object-cover"
              />
            </div>
            <div className="absolute bottom-4 right-4 bg-[#2E1E14] border border-[#C8A467] text-[#C8A467] py-2 px-4 text-[9px] uppercase tracking-widest font-sans font-bold">
              EST. 2014
            </div>
          </div>

          {/* Right Column: Narrative text */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <span className="text-[10px] font-sans tracking-[0.2em] text-[#B08A4E] uppercase font-bold">
              OUR MISSION
            </span>
            <h2 className="font-serif text-3xl text-[#241811] leading-tight">
              A Legacy Built on <span className="font-serif-italics text-[#B08A4E]">Absolute Clarity</span> and Uncompromised Quality
            </h2>
            <div className="w-12 h-[1px] bg-[#B08A4E] my-4" />
            <p className="font-sans text-xs text-[#241811]/85 leading-relaxed font-light">
              At Kuberaa Properties, we recognize that acquiring land is more than a financial transaction; it is the foundation of your legacy. That is why we focus exclusively on layout land developments that offer verified legal security. 
            </p>
            <p className="font-sans text-xs text-[#241811]/85 leading-relaxed font-light">
              Every layout is meticulously planned, ensuring broad tar roads, underground drainage, secure gated boundaries, and natural green spaces are complete before any plot is registered. With 100% DTCP and TNRERA sanctions, we guarantee immediate registration, secure ownership, and a dispute-free asset for generations to come.
            </p>
          </div>

        </div>
      </section>

      {/* 3. Stats Strip (Reused) */}
      <Stats />

      {/* 4. Trust Section (Reused) */}
      <TrustSection />

      {/* 5. Infrastructure Quality Standards */}
      <section className="py-24 bg-[#241811] text-[#F5EFE3] border-t border-[#C8A467]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[10px] font-sans tracking-[0.3em] text-[#C8A467] uppercase block font-semibold mb-2">
              DEVELOPMENT BLUEPRINT
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#F5EFE3]">
              Premium Layout <span className="font-serif-italics text-[#C8A467]">Infrastructure Standards</span>
            </h2>
            <div className="w-12 h-[1px] bg-[#C8A467] mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Standard 1 */}
            <div className="bg-[#2E1E14]/40 border border-[#C8A467]/10 p-8 rounded-lg space-y-4 hover:border-[#C8A467]/30 transition-all duration-300">
              <div className="text-[#C8A467] font-serif text-3xl font-light">01</div>
              <h3 className="font-sans text-xs tracking-wider font-bold text-[#F5EFE3] uppercase">Avenue Tar Roads</h3>
              <p className="font-sans text-xs text-[#F5EFE3]/70 font-light leading-relaxed">
                Engineered with high-grade blacktop tar or concrete bases. Layout main roads are minimum 40 feet to 60 feet wide to handle high volumes and heavy vehicles comfortably.
              </p>
            </div>

            {/* Standard 2 */}
            <div className="bg-[#2E1E14]/40 border border-[#C8A467]/10 p-8 rounded-lg space-y-4 hover:border-[#C8A467]/30 transition-all duration-300">
              <div className="text-[#C8A467] font-serif text-3xl font-light">02</div>
              <h3 className="font-sans text-xs tracking-wider font-bold text-[#F5EFE3] uppercase">Utility Integration</h3>
              <p className="font-sans text-xs text-[#F5EFE3]/70 font-light leading-relaxed">
                Underground pipe connectivity for water, solar-powered street lighting systems, storm water harvesting, and ready connection nodes to electric grids.
              </p>
            </div>

            {/* Standard 3 */}
            <div className="bg-[#2E1E14]/40 border border-[#C8A467]/10 p-8 rounded-lg space-y-4 hover:border-[#C8A467]/30 transition-all duration-300">
              <div className="text-[#C8A467] font-serif text-3xl font-light">03</div>
              <h3 className="font-sans text-xs tracking-wider font-bold text-[#F5EFE3] uppercase">Gated Parks & Spaces</h3>
              <p className="font-sans text-xs text-[#F5EFE3]/70 font-light leading-relaxed">
                Dedicated public park areas, children play arenas, secure compound archways, and lush tree plantations bordering each layout to foster a green environment.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

import React from "react";
import { GALLERY_DATA } from "../data";

export default function BentoGallery() {
  return (
    <section className="bg-[#F2EBDD] py-24 border-b border-[#C8A467]/15" id="craftsmanship">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16 max-w-xl mx-auto">
          <span className="text-[10px] font-sans tracking-[0.3em] text-[#B08A4E] uppercase block font-semibold mb-2">
            CHRONICLES OF CREATION
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-[#241811]">
            Our Craft is <span className="font-serif-italics text-[#B08A4E]">Slow & Deliberate</span>
          </h2>
          <p className="text-xs text-[#241811]/70 font-sans mt-3 leading-relaxed">
            Every tract of soil is rigorously surveyed, and every plot is fully developed with wide tar roads, high-grade stormwater drains, solar avenue lights, and compound walls before listing.
          </p>
          <div className="w-12 h-[1px] bg-[#B08A4E] mx-auto mt-5" />
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-12 gap-4 md:gap-6" id="bento-gallery-grid">
          {GALLERY_DATA.map((item) => (
            <div
              key={item.id}
              className={`${item.sizeClass} overflow-hidden rounded-xl bg-[#2E1E14]/5 border border-[#C8A467]/20 relative group shadow-sm hover:shadow-md transition-all duration-500`}
            >
              {/* Overlay for rich photo filtration */}
              <div className="absolute inset-0 bg-[#241811]/10 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-0 z-10" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2E1E14]/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

              {/* High resolution Image */}
              <img
                src={item.image}
                alt={item.alt}
                className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                referrerPolicy="no-referrer"
                loading="lazy"
              />

              {/* Decorative corner accents on hover */}
              <div className="absolute top-4 left-4 w-3 h-3 border-t border-l border-[#C8A467] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 pointer-events-none" />
              <div className="absolute bottom-4 right-4 w-3 h-3 border-b border-r border-[#C8A467] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 pointer-events-none" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

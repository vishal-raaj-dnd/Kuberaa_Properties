import React from "react";
import { Star, Quote } from "lucide-react";
import { TESTIMONIALS_DATA } from "../data";

export default function Testimonials() {
  return (
    <section className="bg-[#F2EBDD] py-24 border-b border-[#C8A467]/15" id="testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <span className="text-[10px] font-sans tracking-[0.3em] text-[#B08A4E] uppercase block font-semibold mb-3">
            VERIFIED VOICES
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-[#241811] leading-snug">
            “People we’ve secured <span className="font-serif-italics">plots</span> for, and <span className="font-serif-italics">would gladly meet again</span>”
          </h2>
          
          {/* Star rating summary line */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mt-5 text-xs text-[#241811]/70 font-sans">
            <div className="flex gap-1 text-[#B08A4E]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#B08A4E] stroke-[#B08A4E]" />
              ))}
            </div>
            <span>
              <strong className="text-[#241811] font-bold">5.0 Star Average</strong> across our family registry of 1,200+ layout plots
            </span>
          </div>
          <div className="w-12 h-[1px] bg-[#B08A4E] mx-auto mt-6" />
        </div>

        {/* 3-Column Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="testimonials-grid">
          {TESTIMONIALS_DATA.map((item) => (
            <div
              key={item.id}
              className="bg-white/40 border border-[#C8A467]/25 rounded-2xl p-8 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow duration-300 relative group"
              id={`testimonial-card-${item.id}`}
            >
              {/* Corner brackets aesthetic */}
              <div className="absolute top-4 left-4 w-2.5 h-2.5 border-t border-l border-[#C8A467]/40 pointer-events-none" />
              <div className="absolute bottom-4 right-4 w-2.5 h-2.5 border-b border-r border-[#C8A467]/40 pointer-events-none" />

              <div className="space-y-5 relative z-10">
                {/* Large decorative quote glyph */}
                <div className="text-[#C8A467] opacity-25 group-hover:opacity-45 transition-opacity">
                  <Quote className="w-10 h-10 transform -scale-x-100" />
                </div>

                {/* Italic serif pull-quote */}
                <h3 className="font-serif text-xl font-semibold italic text-[#241811] leading-snug">
                  "{item.quote}"
                </h3>

                {/* Testimonial body text */}
                <p className="font-sans text-xs text-[#241811]/80 leading-relaxed font-light">
                  {item.text}
                </p>
              </div>

              {/* Rating + Profile Footer */}
              <div className="pt-6 mt-6 border-t border-[#C8A467]/15 flex justify-between items-center relative z-10">
                <div>
                  <div className="font-sans text-[11px] tracking-[0.15em] font-bold text-[#241811] uppercase">
                    {item.author}
                  </div>
                  <div className="font-sans text-[9px] tracking-wide text-[#241811]/50 mt-0.5">
                    {item.role}
                  </div>
                </div>

                {/* 5-star rating stars */}
                <div className="flex gap-0.5 text-[#B08A4E]">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-[#B08A4E] stroke-[#B08A4E]" />
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

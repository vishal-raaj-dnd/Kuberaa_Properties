import React from "react";
import { STATS_DATA } from "../data";

export default function Stats() {
  return (
    <section className="bg-[#2E1E14] text-[#F5EFE3] pt-24 pb-20 border-b border-[#C8A467]/10" id="heritage">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Subtle Section Title */}
        <div className="text-center mb-16">
          <span className="text-[10px] font-sans tracking-[0.3em] text-[#C8A467] uppercase block font-semibold mb-2">
            STORY IN METRICS
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-[#F5EFE3]">
            Twelve Years of <span className="font-serif-italics text-[#C8A467]">Quiet Sovereignty</span>
          </h2>
          <div className="w-12 h-[1px] bg-[#C8A467] mx-auto mt-4" />
        </div>

        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 divide-y sm:divide-y-0 lg:divide-x divide-[#C8A467]/15">
          {STATS_DATA.map((item, index) => (
            <div
              key={item.id}
              className={`text-center space-y-3 ${
                index > 0 ? "pt-8 sm:pt-0" : ""
              } ${index % 2 === 1 ? "sm:pl-4 lg:pl-0" : ""}`}
              id={`stat-column-${index}`}
            >
              {/* Huge Serif Numeral */}
              <div className="font-serif text-5xl md:text-6xl text-[#C8A467] tracking-tight leading-none font-medium">
                {item.number}
              </div>

              {/* Upper-case wide tracking sans-serif label */}
              <div className="font-sans text-[11px] tracking-[0.25em] text-[#F5EFE3] font-bold uppercase">
                {item.label}
              </div>

              {/* Caption */}
              <p className="font-sans text-xs text-[#F5EFE3]/70 font-light max-w-xs mx-auto leading-relaxed">
                {item.caption}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

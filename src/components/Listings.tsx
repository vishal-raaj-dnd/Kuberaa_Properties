import React, { useState, useEffect } from "react";
import { Heart, Sparkles, MapPin } from "lucide-react";
import { LISTINGS_DATA, HERO_IMAGE, INTERIOR_ARCH_IMAGE, LIFESTYLE_TEAL_IMAGE, LISTING_BEDROOM_IMAGE, RNPW_IMAGE, SCREENSHOT_IMAGE } from "../data";

interface ListingsProps {
  onBookVisit: (propertyName?: string) => void;
}

export default function Listings({ onBookVisit }: ListingsProps) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showAll, setShowAll] = useState(false);

  // Load initial favorites from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("kuberaa_favorites");
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load favorites", e);
    }
  }, []);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    let updated;
    if (favorites.includes(id)) {
      updated = favorites.filter((favId) => favId !== id);
    } else {
      updated = [...favorites, id];
    }
    setFavorites(updated);
    try {
      localStorage.setItem("kuberaa_favorites", JSON.stringify(updated));
    } catch (err) {
      console.error("Failed to save favorites", err);
    }
  };

  // Additional mock listings for when "See All" is clicked
  const extendedListings = [
    ...LISTINGS_DATA,
    {
      id: "list-4",
      name: "Pine Valley Foothill Plots",
      price: "₹ 32 Lakhs onwards",
      tag: "Investment Plot" as const,
      image: SCREENSHOT_IMAGE,
      location: "Kodaikanal Valley View",
      specs: ["1,800 - 3,600 sq.ft.", "DTCP Approved", "Hill Station Living"]
    },
    {
      id: "list-5",
      name: "The Grand Boulevard Layout",
      price: "₹ 55 Lakhs onwards",
      tag: "Residential Plot" as const,
      image: RNPW_IMAGE,
      location: "Sulur Airforce Corridor, Coimbatore",
      specs: ["1,200 - 2,400 sq.ft.", "Gated Community", "TNRERA Registered"]
    },
    {
      id: "list-6",
      name: "Trichy Bypass Logistics Zoned",
      price: "₹ 2.4 Crore onwards",
      tag: "Commercial Plot" as const,
      image: HERO_IMAGE,
      location: "National Highway, Trichy",
      specs: ["5,000 - 15,000 sq.ft.", "Heavy Truck Access", "DTCP Approved"]
    }
  ];

  const currentListings = showAll ? extendedListings : LISTINGS_DATA;

  return (
    <section className="bg-[#F2EBDD] py-24 border-b border-[#C8A467]/15" id="estates">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[10px] font-sans tracking-[0.3em] text-[#B08A4E] uppercase block font-semibold mb-2">
            CURATED SELECTIONS
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-[#241811] leading-tight">
            Available <span className="font-serif-italics text-[#B08A4E]">This Week</span>
          </h2>
          <p className="text-xs text-[#241811]/60 font-sans mt-2 max-w-md mx-auto">
            Premium layout plots finalized for immediate registration, fully approved by DTCP and TNRERA authorities.
          </p>
          <div className="w-12 h-[1px] bg-[#B08A4E] mx-auto mt-4" />
        </div>

        {/* 3-Column Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-8 justify-items-center mb-16">
          {currentListings.map((item) => {
            const isLiked = favorites.includes(item.id);
            return (
              <div
                key={item.id}
                onClick={() => onBookVisit(item.name)}
                className="w-full max-w-[340px] group cursor-pointer flex flex-col justify-between"
                id={`listing-card-${item.id}`}
              >
                {/* 1. Dark brown arched "niche"-style frame */}
                <div className="relative w-full aspect-[4/5] bg-[#2E1E14] rounded-t-[180px] rounded-b-2xl pt-8 px-6 pb-6 shadow-xl border border-[#C8A467]/20 flex flex-col items-center justify-between overflow-hidden">
                  
                  {/* Subtle golden radial glow background */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(200,164,103,0.18),transparent_65%)] pointer-events-none" />
                  
                  {/* Premium property image "floating" inside */}
                  <div className="relative w-full h-[80%] rounded-t-[140px] rounded-b-lg overflow-hidden border border-[#C8A467]/30 shadow-lg mt-2">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                    
                    {/* Floating gold specification badges inside */}
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-[#2E1E14]/90 px-3 py-1 rounded-full border border-[#C8A467]/30 flex gap-2 text-[9px] text-[#F5EFE3] font-sans font-medium">
                      <span>{item.specs[0]}</span>
                      <span className="text-[#C8A467]">•</span>
                      <span>{item.specs[1]}</span>
                    </div>
                  </div>

                  {/* Gold pedestal representing physical support structure */}
                  <div className="w-4/5 flex flex-col items-center mt-3 relative z-10">
                    <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#C8A467] to-transparent" />
                    <div className="h-[3px] w-1/3 bg-[#B08A4E]/30 rounded-full mt-1" />
                  </div>
                </div>

                {/* 2. Listing Details Below the niche */}
                <div className="mt-5 px-2 flex justify-between items-start text-left">
                  <div className="space-y-1.5">
                    {/* Location tag */}
                    <div className="flex items-center gap-1 text-[#B08A4E] text-[10px] tracking-wider uppercase font-semibold">
                      <MapPin className="w-3 h-3 flex-shrink-0" />
                      <span>{item.location}</span>
                    </div>

                    {/* Property Name */}
                    <h3 className="font-serif text-xl text-[#241811] leading-tight group-hover:text-[#B08A4E] transition-colors duration-300">
                      {item.name}
                    </h3>

                    {/* Tag + Price */}
                    <div className="flex items-center gap-3">
                      <span className="px-2.5 py-0.5 bg-[#2E1E14]/5 text-[#241811]/70 rounded-full text-[10px] tracking-wider font-sans uppercase border border-[#C8A467]/15 font-medium">
                        {item.tag}
                      </span>
                      <span className="font-serif text-sm text-[#241811]/90 font-medium">
                        {item.price}
                      </span>
                    </div>
                  </div>

                  {/* Heart Wishlist Icon Toggle */}
                  <button
                    onClick={(e) => toggleFavorite(item.id, e)}
                    className="p-2.5 rounded-full bg-white/60 hover:bg-white hover:text-red-500 border border-[#C8A467]/25 text-[#241811]/70 transition-all duration-300 shadow-sm cursor-pointer"
                    aria-label={`Mark ${item.name} as favorite`}
                  >
                    <Heart
                      className={`w-4 h-4 transition-transform active:scale-125 ${
                        isLiked ? "fill-red-500 text-red-500 stroke-red-500" : "hover:scale-105"
                      }`}
                    />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* See All centered pill button */}
        <div className="text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-8 py-3 border-2 border-[#B08A4E] hover:bg-[#B08A4E] hover:text-[#2E1E14] text-[#B08A4E] text-xs font-bold tracking-[0.18em] uppercase rounded-full transition-all duration-300 shadow-sm cursor-pointer font-sans"
            id="listings-see-all-button"
          >
            {showAll ? "Display Featured Layouts" : "See All Premium Layouts"}
          </button>
        </div>

      </div>
    </section>
  );
}

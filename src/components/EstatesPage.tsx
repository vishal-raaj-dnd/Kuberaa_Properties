import React, { useState, useEffect } from "react";
import { Search, Heart, MapPin } from "lucide-react";
import { LISTINGS_DATA, HERO_IMAGE, RNPW_IMAGE, SCREENSHOT_IMAGE } from "../data";
import BentoGallery from "./BentoGallery";
import TealLifestyle from "./TealLifestyle";

interface EstatesPageProps {
  onBookVisit: (propertyName?: string) => void;
}

export default function EstatesPage({ onBookVisit }: EstatesPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");
  const [favorites, setFavorites] = useState<string[]>([]);

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

  // Build the complete list of listings
  const allListings = [
    ...LISTINGS_DATA,
    {
      id: "list-4",
      name: "Pine Valley Foothill Plots",
      price: "₹ 32 Lakhs onwards",
      tag: "Investment Plot",
      image: SCREENSHOT_IMAGE,
      location: "Kodaikanal Valley View",
      specs: ["1,800 - 3,600 sq.ft.", "DTCP Approved", "Hill Station Living"]
    },
    {
      id: "list-5",
      name: "The Grand Boulevard Layout",
      price: "₹ 55 Lakhs onwards",
      tag: "Residential Plot",
      image: RNPW_IMAGE,
      location: "Sulur Airforce Corridor, Coimbatore",
      specs: ["1,200 - 2,400 sq.ft.", "Gated Community", "TNRERA Registered"]
    },
    {
      id: "list-6",
      name: "Trichy Bypass Logistics Zoned",
      price: "₹ 2.4 Crore onwards",
      tag: "Commercial Plot",
      image: HERO_IMAGE,
      location: "National Highway, Trichy",
      specs: ["5,000 - 15,000 sq.ft.", "Heavy Truck Access", "DTCP Approved"]
    }
  ];

  // Filter listings based on category and search query
  const filteredListings = allListings.filter((item) => {
    const matchesTag = selectedTag === "All" || item.tag === selectedTag;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tag.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTag && matchesSearch;
  });

  const categories = ["All", "Residential Plot", "Commercial Plot", "Investment Plot"];

  return (
    <div className="pt-24 bg-[#F2EBDD]" id="estates-page">
      
      {/* 1. Header Banner */}
      <div className="bg-[#2E1E14] text-[#F5EFE3] py-16 border-b border-[#C8A467]/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[10px] font-sans tracking-[0.3em] text-[#C8A467] uppercase block font-semibold mb-2">
            LAYOUT PORTFOLIO
          </span>
          <h1 className="font-serif text-4xl md:text-5xl text-[#F5EFE3]">
            Premium Available <span className="font-serif-italics text-[#C8A467]">Estates & Plots</span>
          </h1>
          <p className="font-sans text-xs text-[#F5EFE3]/60 max-w-md mx-auto mt-2">
            Secure, premium layout plots finalized for immediate registration and backed by official sanctions.
          </p>
          <div className="w-12 h-[1px] bg-[#C8A467] mx-auto mt-4" />
        </div>
      </div>

      {/* 2. Interactive Search and Filtering Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6">
        <div className="flex flex-col md:flex-row gap-6 justify-between items-center bg-[#2E1E14]/5 border border-[#C8A467]/20 p-6 rounded-2xl">
          
          {/* Category Filter Buttons */}
          <div className="flex flex-wrap gap-2.5 justify-center md:justify-start w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedTag(cat)}
                className={`px-4 py-2 text-[10px] tracking-wider uppercase font-semibold font-sans rounded-full border transition-all duration-300 cursor-pointer ${
                  selectedTag === cat
                    ? "bg-[#B08A4E] text-[#2E1E14] border-[#B08A4E] shadow-sm"
                    : "bg-transparent text-[#2E1E14]/70 border-[#C8A467]/30 hover:border-[#B08A4E] hover:text-[#B08A4E]"
                }`}
              >
                {cat === "All" ? "All Plots" : cat}
              </button>
            ))}
          </div>

          {/* Search Bar Input */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search by location or name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/70 border border-[#C8A467]/30 focus:border-[#B08A4E] focus:bg-white text-[#241811] text-xs font-sans rounded-full pl-10 pr-4 py-3 shadow-inner outline-none transition-all"
            />
            <Search className="w-4 h-4 text-[#B08A4E] absolute left-3.5 top-3.5" />
          </div>

        </div>
      </div>

      {/* 3. Listings Grid */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredListings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-8 justify-items-center">
            {filteredListings.map((item) => {
              const isLiked = favorites.includes(item.id);
              return (
                <div
                  key={item.id}
                  onClick={() => onBookVisit(item.name)}
                  className="w-full max-w-[340px] group cursor-pointer flex flex-col justify-between"
                  id={`estates-card-${item.id}`}
                >
                  <div className="relative w-full aspect-[4/5] bg-[#2E1E14] rounded-t-[180px] rounded-b-2xl pt-8 px-6 pb-6 shadow-xl border border-[#C8A467]/20 flex flex-col items-center justify-between overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(200,164,103,0.18),transparent_65%)] pointer-events-none" />
                    
                    <div className="relative w-full h-[80%] rounded-t-[140px] rounded-b-lg overflow-hidden border border-[#C8A467]/30 shadow-lg mt-2">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />
                      
                      <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-[#2E1E14]/90 px-3 py-1 rounded-full border border-[#C8A467]/30 flex gap-2 text-[9px] text-[#F5EFE3] font-sans font-medium">
                        <span>{item.specs[0]}</span>
                        <span className="text-[#C8A467]">•</span>
                        <span>{item.specs[1]}</span>
                      </div>
                    </div>

                    <div className="w-4/5 flex flex-col items-center mt-3 relative z-10">
                      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#C8A467] to-transparent" />
                      <div className="h-[3px] w-1/3 bg-[#B08A4E]/30 rounded-full mt-1" />
                    </div>
                  </div>

                  <div className="mt-5 px-2 flex justify-between items-start text-left">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-1 text-[#B08A4E] text-[10px] tracking-wider uppercase font-semibold">
                        <MapPin className="w-3 h-3 flex-shrink-0" />
                        <span>{item.location}</span>
                      </div>

                      <h3 className="font-serif text-xl text-[#241811] leading-tight group-hover:text-[#B08A4E] transition-colors duration-300">
                        {item.name}
                      </h3>

                      <div className="flex items-center gap-3">
                        <span className="px-2.5 py-0.5 bg-[#2E1E14]/5 text-[#241811]/70 rounded-full text-[10px] tracking-wider font-sans uppercase border border-[#C8A467]/15 font-medium">
                          {item.tag}
                        </span>
                        <span className="font-serif text-sm text-[#241811]/90 font-medium">
                          {item.price}
                        </span>
                      </div>
                    </div>

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
        ) : (
          <div className="text-center py-24 bg-[#2E1E14]/5 border border-dashed border-[#C8A467]/30 rounded-2xl">
            <p className="font-serif text-2xl text-[#241811]/60">No properties match your filter criteria.</p>
            <p className="font-sans text-xs text-[#241811]/40 mt-2">Try adjusting your search query or selecting a different category.</p>
          </div>
        )}
      </section>

      {/* 4. Asymmetric Bento Photo Gallery (Reused) */}
      <BentoGallery />

      {/* 5. Teal Lifestyle Section (Reused) */}
      <TealLifestyle />

    </div>
  );
}

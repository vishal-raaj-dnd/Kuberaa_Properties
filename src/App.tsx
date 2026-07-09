import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import BentoGallery from "./components/BentoGallery";
import TrustSection from "./components/TrustSection";
import Listings from "./components/Listings";
import TealLifestyle from "./components/TealLifestyle";
import Testimonials from "./components/Testimonials";
import ClosingCTA from "./components/ClosingCTA";
import Footer from "./components/Footer";
import InquiryModal from "./components/InquiryModal";

export default function App() {
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<string | undefined>(undefined);

  const handleOpenInquiry = (propertyName?: string) => {
    setSelectedProperty(propertyName);
    setIsInquiryOpen(true);
  };

  const handleCloseInquiry = () => {
    setIsInquiryOpen(false);
    setSelectedProperty(undefined);
  };

  return (
    <div className="relative min-h-screen bg-[#F2EBDD] font-sans antialiased text-[#241811] selection:bg-[#B08A4E]/30" id="brochure-root">
      
      {/* 1. Sticky Navigation Bar */}
      <Navbar onBookVisit={() => handleOpenInquiry()} />

      {/* 2. Hero Section */}
      <Hero onBookVisit={() => handleOpenInquiry()} />

      {/* 3. Stats Strip */}
      <Stats />

      {/* 4. Asymmetric Bento Photo Gallery */}
      <BentoGallery />

      {/* 5. Two-Column Trust Section (Cream background, Arched center frame) */}
      <TrustSection />

      {/* 6. "Available This Week" Listings Section (Cream, Arched Pedestals, Wishlist) */}
      <Listings onBookVisit={handleOpenInquiry} />

      {/* 7. Full-bleed dramatic Emerald/Teal Lifestyle Section (Carousel & Floating Card) */}
      <TealLifestyle />

      {/* 8. Testimonials Section (Pull-quotes, Rating, Author Profile) */}
      <Testimonials />

      {/* 9. Closing CTA Banner (Reused Gold Diamond Divider) */}
      <ClosingCTA onBookVisit={() => handleOpenInquiry()} />

      {/* 10. Footer (4 Columns, Copyright, RERA Disclaimer, Regulatory Compliance) */}
      <Footer />

      {/* 11. Interactive Concierge Booking Modal */}
      <InquiryModal
        isOpen={isInquiryOpen}
        onClose={handleCloseInquiry}
        preselectedProperty={selectedProperty}
      />

    </div>
  );
}

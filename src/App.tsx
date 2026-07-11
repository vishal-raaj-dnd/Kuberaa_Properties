import React, { useState, useEffect } from "react";
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

// New page imports
import AboutPage from "./components/AboutPage";
import EstatesPage from "./components/EstatesPage";
import TestimonialsPage from "./components/TestimonialsPage";
import ContactPage from "./components/ContactPage";

export default function App() {
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<string | undefined>(undefined);
  const [currentHash, setCurrentHash] = useState(window.location.hash || "#/");

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash || "#/");
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handleOpenInquiry = (propertyName?: string) => {
    setSelectedProperty(propertyName);
    setIsInquiryOpen(true);
  };

  const handleCloseInquiry = () => {
    setIsInquiryOpen(false);
    setSelectedProperty(undefined);
  };

  const renderPageContent = () => {
    switch (currentHash) {
      case "#/about":
        return <AboutPage />;
      case "#/estates":
        return <EstatesPage onBookVisit={handleOpenInquiry} />;
      case "#/testimonials":
        return <TestimonialsPage />;
      case "#/contact":
        return <ContactPage />;
      case "#/":
      case "":
      case "#/home":
      default:
        return (
          <>
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
          </>
        );
    }
  };

  return (
    <div className="relative min-h-screen bg-[#F2EBDD] font-sans antialiased text-[#241811] selection:bg-[#B08A4E]/30" id="brochure-root">
      
      {/* 1. Sticky Navigation Bar */}
      <Navbar onBookVisit={() => handleOpenInquiry()} />

      {/* Dynamic Content based on Hash Routing */}
      {renderPageContent()}

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

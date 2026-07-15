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

// Page imports
import AboutPage from "./components/AboutPage";
import EstatesPage from "./components/EstatesPage";
import TestimonialsPage from "./components/TestimonialsPage";
import ContactPage from "./components/ContactPage";

// Auth & Dashboard
import SignInPage from "./components/SignInPage";
import ClientDashboard from "./components/ClientDashboard";
import { AuthProvider } from "./context/AuthContext";

export default function App() {
  const [isInquiryOpen, setIsInquiryOpen]     = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<string | undefined>(undefined);
  const [currentHash, setCurrentHash]           = useState(window.location.hash || "#/");

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

  // Dashboard page — rendered without the standard Navbar/Footer chrome
  if (currentHash === "#/dashboard") {
    return (
      <AuthProvider>
        <ClientDashboard />
      </AuthProvider>
    );
  }

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
      case "#/signin":
        return <SignInPage />;
      case "#/":
      case "":
      case "#/home":
      default:
        return (
          <>
            {/* Hero Section */}
            <Hero onBookVisit={() => handleOpenInquiry()} />

            {/* Stats Strip */}
            <Stats />

            {/* Asymmetric Bento Photo Gallery */}
            <BentoGallery />

            {/* Two-Column Trust Section */}
            <TrustSection />

            {/* "Available This Week" Listings Section */}
            <Listings onBookVisit={handleOpenInquiry} />

            {/* Full-bleed dramatic Emerald/Teal Lifestyle Section */}
            <TealLifestyle />

            {/* Testimonials Section */}
            <Testimonials />

            {/* Closing CTA Banner */}
            <ClosingCTA onBookVisit={() => handleOpenInquiry()} />
          </>
        );
    }
  };

  return (
    <AuthProvider>
      <div
        className="relative min-h-screen bg-[#F2EBDD] font-sans antialiased text-[#241811] selection:bg-[#B08A4E]/30"
        id="brochure-root"
      >
        {/* Sticky Navigation Bar */}
        <Navbar onBookVisit={() => handleOpenInquiry()} />

        {/* Dynamic Content based on Hash Routing */}
        {renderPageContent()}

        {/* Footer — hide on signin page */}
        {currentHash !== "#/signin" && <Footer />}

        {/* Interactive Concierge Booking Modal */}
        <InquiryModal
          isOpen={isInquiryOpen}
          onClose={handleCloseInquiry}
          preselectedProperty={selectedProperty}
        />
      </div>
    </AuthProvider>
  );
}

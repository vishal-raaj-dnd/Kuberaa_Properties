import React, { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";

interface NavbarProps {
  onBookVisit: () => void;
}

export default function Navbar({ onBookVisit }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "HERITAGE", href: "#heritage" },
    { label: "CRAFTSMANSHIP", href: "#craftsmanship" },
    { label: "TRUST", href: "#trust" },
    { label: "AVAILABLE ESTATES", href: "#estates" },
    { label: "TESTIMONIALS", href: "#testimonials" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-[#2E1E14]/95 backdrop-blur-md shadow-lg border-b border-[#C8A467]/20 py-3"
          : "bg-[#2E1E14]/40 backdrop-blur-[2px] py-5"
      }`}
      id="main-navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Left */}
          <div className="flex-shrink-0 flex items-center gap-1.5" id="navbar-logo">
            <span className="text-[#C8A467] font-serif font-bold text-2xl tracking-wide">Kuberaa</span>
            <span className="text-[#F5EFE3] font-sans text-[10px] tracking-[0.25em] font-light mt-1.5 uppercase hidden sm:inline-block">Properties</span>
          </div>

          {/* Navigation Links Center (Desktop) */}
          <div className="hidden lg:flex space-x-8" id="navbar-links-desktop">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[#F5EFE3]/80 hover:text-[#C8A467] transition-all duration-200 text-[10px] tracking-[0.2em] font-sans font-medium hover:translate-y-[-1px]"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Book Visit Button Right */}
          <div className="hidden sm:flex items-center" id="navbar-cta-container">
            <button
              onClick={onBookVisit}
              className="px-5 py-2 bg-[#B08A4E] hover:bg-[#C8A467] text-[#2E1E14] text-[10px] tracking-[0.15em] uppercase font-bold rounded-full shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-1.5 cursor-pointer font-sans"
              id="navbar-book-visit-desktop"
            >
              <span>Book a visit</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#F5EFE3] hover:text-[#C8A467] p-2 transition-colors focus:outline-none"
              aria-label="Toggle mobile menu"
              id="navbar-mobile-toggle"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden bg-[#2E1E14] border-t border-[#C8A467]/20 absolute top-full left-0 right-0 shadow-xl py-6 px-4 space-y-4" id="navbar-mobile-menu">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-[#F5EFE3]/90 hover:text-[#C8A467] transition-colors text-xs tracking-[0.25em] font-sans font-medium py-2 border-b border-[#F5EFE3]/5"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => {
                setIsOpen(false);
                onBookVisit();
              }}
              className="w-full text-center py-3 bg-[#B08A4E] hover:bg-[#C8A467] text-[#2E1E14] text-xs tracking-[0.2em] uppercase font-bold rounded-full transition-all flex items-center justify-center gap-2 cursor-pointer font-sans"
              id="navbar-book-visit-mobile"
            >
              <span>Book a visit</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

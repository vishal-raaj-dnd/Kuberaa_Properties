import React, { useState, useEffect, useRef } from "react";
import { Menu, X, ArrowRight, LogIn, LogOut, LayoutDashboard, ChevronDown } from "lucide-react";
import { useAuth } from "../context/AuthContext";

interface NavbarProps {
  onBookVisit: () => void;
}

export default function Navbar({ onBookVisit }: NavbarProps) {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen]         = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [currentHash, setCurrentHash] = useState(window.location.hash || "#/");
  useEffect(() => {
    const handleHashChange = () => setCurrentHash(window.location.hash || "#/");
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Close user dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { label: "HOME",              href: "#/"            },
    { label: "ABOUT US",          href: "#/about"       },
    { label: "AVAILABLE ESTATES", href: "#/estates"     },
    { label: "TESTIMONIALS",      href: "#/testimonials"},
    { label: "CONTACT US",        href: "#/contact"     },
  ];

  const isActive = (href: string) => {
    if (href === "#/") return currentHash === "#/" || currentHash === "" || currentHash === "#/home";
    return currentHash.startsWith(href);
  };

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

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-1.5" id="navbar-logo">
            <a href="#/" className="flex items-center gap-1.5">
              <span className="text-[#C8A467] font-serif font-bold text-2xl tracking-wide">Kuberaa</span>
              <span className="text-[#F5EFE3] font-sans text-[10px] tracking-[0.25em] font-light mt-1.5 uppercase hidden sm:inline-block">Properties</span>
            </a>
          </div>

          {/* Desktop nav links */}
          <div className="hidden lg:flex space-x-8" id="navbar-links-desktop">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`transition-all duration-200 text-[10px] tracking-[0.2em] font-sans font-medium hover:translate-y-[-1px] ${
                  isActive(link.href)
                    ? "text-[#C8A467] border-b border-[#C8A467]/40 pb-1"
                    : "text-[#F5EFE3]/80 hover:text-[#C8A467]"
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop right buttons */}
          <div className="hidden sm:flex items-center gap-3" id="navbar-cta-container">

            {user ? (
              /* ── Logged-in: Avatar + Dropdown ── */
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setUserMenuOpen(p => !p)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#C8A467]/30 hover:border-[#C8A467]/60 bg-[#2E1E14]/60 transition-all cursor-pointer"
                  id="navbar-user-menu-trigger"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#B08A4E] to-[#C8A467] flex items-center justify-center">
                    <span className="font-sans font-bold text-[10px] text-[#2E1E14]">{user.avatarInitials}</span>
                  </div>
                  <span className="font-sans text-[11px] text-[#F5EFE3] font-medium max-w-[90px] truncate">{user.name.split(" ")[0]}</span>
                  <ChevronDown className={`w-3 h-3 text-[#F5EFE3]/50 transition-transform ${userMenuOpen ? "rotate-180" : ""}`} />
                </button>

                {/* Dropdown */}
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-[#2E1E14] border border-[#C8A467]/20 rounded-xl shadow-xl overflow-hidden py-1" id="navbar-user-dropdown">
                    <a
                      href="#/dashboard"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-3 text-[11px] font-sans text-[#F5EFE3]/70 hover:text-[#C8A467] hover:bg-white/5 transition-colors"
                    >
                      <LayoutDashboard className="w-3.5 h-3.5" /> My Dashboard
                    </a>
                    <div className="border-t border-[#C8A467]/10 my-1" />
                    <button
                      onClick={() => { setUserMenuOpen(false); logout(); }}
                      className="w-full flex items-center gap-2.5 px-4 py-3 text-[11px] font-sans text-[#F5EFE3]/50 hover:text-red-400 hover:bg-red-900/10 transition-colors cursor-pointer"
                      id="navbar-logout"
                    >
                      <LogOut className="w-3.5 h-3.5" /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* ── Guest: Sign In button ── */
              <a
                href="#/signin"
                className="flex items-center gap-1.5 px-4 py-2 border border-[#C8A467]/40 hover:border-[#C8A467] text-[#C8A467] text-[10px] tracking-[0.15em] uppercase font-bold rounded-full transition-all duration-300 hover:bg-[#C8A467]/10 font-sans"
                id="navbar-signin"
              >
                <LogIn className="w-3 h-3" />
                <span>Sign In</span>
              </a>
            )}

            {/* Book a visit (always visible) */}
            <button
              onClick={onBookVisit}
              className="px-5 py-2 bg-[#B08A4E] hover:bg-[#C8A467] text-[#2E1E14] text-[10px] tracking-[0.15em] uppercase font-bold rounded-full shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-1.5 cursor-pointer font-sans"
              id="navbar-book-visit-desktop"
            >
              <span>Book a visit</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Mobile hamburger */}
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
                className={`transition-colors text-xs tracking-[0.25em] font-sans font-medium py-2 border-b border-[#F5EFE3]/5 ${
                  isActive(link.href) ? "text-[#C8A467]" : "text-[#F5EFE3]/90 hover:text-[#C8A467]"
                }`}
              >
                {link.label}
              </a>
            ))}

            {/* Auth section in mobile */}
            {user ? (
              <>
                <div className="flex items-center gap-3 py-2 border-b border-[#C8A467]/10">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#B08A4E] to-[#C8A467] flex items-center justify-center">
                    <span className="font-sans font-bold text-[10px] text-[#2E1E14]">{user.avatarInitials}</span>
                  </div>
                  <div>
                    <p className="font-sans text-xs text-[#F5EFE3] font-bold">{user.name}</p>
                    <p className="font-sans text-[10px] text-[#F5EFE3]/40">{user.email}</p>
                  </div>
                </div>
                <a
                  href="#/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 text-xs text-[#C8A467] font-sans font-medium tracking-widest uppercase"
                >
                  <LayoutDashboard className="w-3.5 h-3.5" /> My Dashboard
                </a>
                <button
                  onClick={() => { setIsOpen(false); logout(); }}
                  className="flex items-center gap-2 text-xs text-[#F5EFE3]/40 hover:text-red-400 font-sans font-medium tracking-widest uppercase cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" /> Sign Out
                </button>
              </>
            ) : (
              <a
                href="#/signin"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 py-2.5 border border-[#C8A467]/30 text-[#C8A467] text-xs tracking-widest uppercase font-bold rounded-full transition-all font-sans"
                id="navbar-signin-mobile"
              >
                <LogIn className="w-3.5 h-3.5" /> Sign In
              </a>
            )}

            <button
              onClick={() => { setIsOpen(false); onBookVisit(); }}
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

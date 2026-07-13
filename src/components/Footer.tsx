import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#241811] text-[#F5EFE3] pt-20 pb-12 border-t border-[#C8A467]/10" id="brochure-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 pb-16 border-b border-[#C8A467]/10">
          
          {/* Column 1: Brand & Tagline */}
          <div className="space-y-4 text-left" id="footer-col-brand">
            <div className="flex items-center gap-1.5">
              <span className="text-[#C8A467] font-serif font-bold text-2xl tracking-wide">Kuberaa</span>
              <span className="text-[#F5EFE3] font-sans text-[10px] tracking-[0.25em] font-light mt-1.5 uppercase">Properties</span>
            </div>
            <p className="font-sans text-xs text-[#F5EFE3]/60 leading-relaxed font-light">
              Coimbatore and Chennai's premier developer of high-yielding, securely approved layout plots. Specializing exclusively in commercial, residential, and investment layout land plots with DTCP & TNRERA approvals.
            </p>
            <div className="pt-2">
              <span className="inline-block px-3 py-1 border border-[#C8A467]/30 text-[#C8A467] rounded-full text-[9px] font-sans tracking-widest font-semibold uppercase">
                Approved Layouts • India
              </span>
            </div>
          </div>

          {/* Column 2: Discover Links */}
          <div className="space-y-4 text-left" id="footer-col-discover">
            <h4 className="font-sans text-[10px] tracking-[0.2em] text-[#C8A467] uppercase font-bold">
              DISCOVER
            </h4>
            <ul className="space-y-2.5 font-sans text-xs text-[#F5EFE3]/75 font-light">
              <li>
                <a href="#heritage" className="hover:text-[#C8A467] transition-colors">Our Layout History</a>
              </li>
              <li>
                <a href="#craftsmanship" className="hover:text-[#C8A467] transition-colors">Infrastructure Quality</a>
              </li>
              <li>
                <a href="#estates" className="hover:text-[#C8A467] transition-colors">Premium Available Plots</a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-[#C8A467] transition-colors">Client Testimonials</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Services Links */}
          <div className="space-y-4 text-left" id="footer-col-services">
            <h4 className="font-sans text-[10px] tracking-[0.2em] text-[#C8A467] uppercase font-bold">
              LAYOUT STANDARDS
            </h4>
            <ul className="space-y-2.5 font-sans text-xs text-[#F5EFE3]/75 font-light">
              <li>
                <span className="text-[#F5EFE3]/90 font-medium">DTCP Sanctioned</span> — Immediate Registration
              </li>
              <li>
                <span className="text-[#F5EFE3]/90 font-medium">TNRERA Registered</span> — Guaranteed Transparency
              </li>
              <li>
                <span className="text-[#F5EFE3]/90 font-medium">Premium Tar Roads</span> — 40ft & 60ft Avenues
              </li>
              <li>
                <span className="text-[#F5EFE3]/90 font-medium">Water Lines & Parks</span> — Standard Layout Infrastructure
              </li>
            </ul>
          </div>

          {/* Column 4: Office/Contact Addresses */}
          <div className="space-y-4 text-left" id="footer-col-contact">
            <h4 className="font-sans text-[10px] tracking-[0.2em] text-[#C8A467] uppercase font-bold">
              OFFICES & STEWARDSHIP
            </h4>
            <div className="space-y-3 font-sans text-xs text-[#F5EFE3]/70 font-light leading-relaxed">
              <div>
                <p className="text-[10px] uppercase font-bold text-[#C8A467] tracking-wider mb-0.5">COIMBATORE HEADQUARTERS</p>
                <p>Kuberaa Towers, Saravanampatti Main Road, Coimbatore - 641035</p>
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-[#C8A467] tracking-wider mb-0.5">CHENNAI CORRIDOR</p>
                <p>Sovereign House, ECR Corridor, Neelankarai, Chennai - 600115</p>
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-[#C8A467] tracking-wider mb-0.5">INQUIRIES & BOOKINGS</p>
                <p className="font-bold text-[#C8A467] text-sm tracking-wide flex flex-col gap-0.5">
                  <span>+91 94423 25093</span>
                  <span>+91 97866 28200</span>
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright, Terms, & RERA Note */}
        <div className="pt-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6" id="footer-bottom-bar">
          
          <div className="space-y-2 text-left max-w-xl">
            <p className="font-sans text-[10px] text-[#F5EFE3]/50">
              © {new Date().getFullYear()} Kuberaa Properties Private Limited. All rights reserved across the territories of India.
            </p>
            
            {/* Note on RERA registration - mandatory brochure component */}
            <p className="font-sans text-[9px] text-[#F5EFE3]/35 leading-relaxed">
              Approval Disclaimer: All layout plots developed and sold by Kuberaa Properties are strictly approved by DTCP and registered under the Tamil Nadu Real Estate Regulatory Authority (TNRERA). 
              Approved Layout Numbers: DTCP No. 42/2023, TNRERA Registration No: TN/11/Layout/1234/2023. 
              Plans, layout road maps, and public park demarcations are tentative and subject to change under town planning authority oversight.
            </p>
          </div>

          {/* Privacy and terms links */}
          <div className="flex gap-6 font-sans text-[10px] tracking-wider text-[#C8A467] font-semibold uppercase" id="footer-bottom-links">
            <a href="#estates" className="hover:underline">Premium Layouts</a>
            <span className="text-[#F5EFE3]/15">|</span>
            <span className="cursor-not-allowed opacity-60">Privacy Covenant</span>
            <span className="text-[#F5EFE3]/15">|</span>
            <span className="cursor-not-allowed opacity-60">Terms of Registry</span>
          </div>

        </div>

      </div>
    </footer>
  );
}

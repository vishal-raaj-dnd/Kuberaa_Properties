import React, { useState } from "react";
import { User, Mail, Phone, Home, Calendar, Send, CheckCircle, MapPin, Clock } from "lucide-react";
import { LISTINGS_DATA } from "../data";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    property: LISTINGS_DATA[0].name,
    date: "",
    notes: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.date) return;

    // Simulate saving inquiry
    try {
      const existing = localStorage.getItem("kuberaa_inquiries") || "[]";
      const parsed = JSON.parse(existing);
      parsed.push({
        ...formData,
        id: "inq_" + Date.now(),
        timestamp: new Date().toISOString()
      });
      localStorage.setItem("kuberaa_inquiries", JSON.stringify(parsed));
    } catch (err) {
      console.error("Failed to save contact inquiry", err);
    }
    
    setIsSubmitted(true);

    // Redirect to WhatsApp with message draft
    const phoneNumber = "919442325093";
    const message = `Hello Kuberaa Properties,

I would like to book a site layout tour. Here are my details:
- Name: ${formData.name}
- Email: ${formData.email}
- Phone: ${formData.phone}
- Preferred Layout: ${formData.property}
- Preferred Date: ${formData.date}
${formData.notes ? `- Special Requests: ${formData.notes}` : ""}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="pt-24 bg-[#F2EBDD]" id="contact-page">
      
      {/* 1. Page Header */}
      <div className="bg-[#2E1E14] text-[#F5EFE3] py-16 border-b border-[#C8A467]/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[10px] font-sans tracking-[0.3em] text-[#C8A467] uppercase block font-semibold mb-2">
            OFFICE REGISTRY & COORDINATES
          </span>
          <h1 className="font-serif text-4xl md:text-5xl text-[#F5EFE3]">
            Initiate Your <span className="font-serif-italics text-[#C8A467]">Land Ownership Journey</span>
          </h1>
          <p className="font-sans text-xs text-[#F5EFE3]/60 max-w-md mx-auto mt-2">
            Connect with our Senior Plot Consultants or visit our corporate hubs to inspect DTCP legal binders and plan maps.
          </p>
          <div className="w-12 h-[1px] bg-[#C8A467] mx-auto mt-4" />
        </div>
      </div>

      {/* 2. Main Layout (Offices & Contact Form) */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Office Cards & Map Placeholders */}
          <div className="lg:col-span-5 space-y-8">
            <span className="text-[10px] font-sans tracking-[0.2em] text-[#B08A4E] uppercase font-bold block text-left">
              OUR OFFICES
            </span>
            
            {/* Coimbatore Headquarters Card */}
            <div className="bg-white/40 border border-[#C8A467]/25 rounded-2xl p-8 text-left space-y-4 hover:shadow-md transition-all duration-300 relative group">
              <div className="absolute top-4 left-4 w-2 h-2 border-t border-l border-[#C8A467]/40 pointer-events-none" />
              <div className="absolute bottom-4 right-4 w-2 h-2 border-b border-r border-[#C8A467]/40 pointer-events-none" />
              
              <div className="flex items-center gap-3 text-[#B08A4E]">
                <MapPin className="w-5 h-5" />
                <h3 className="font-sans text-xs tracking-widest font-bold text-[#241811] uppercase">COIMBATORE HEADQUARTERS</h3>
              </div>
              <p className="font-sans text-xs text-[#241811]/80 leading-relaxed font-light pl-8">
                Kuberaa Towers, Saravanampatti Main Road, Coimbatore - 641035
              </p>
              <div className="flex items-center gap-2 pl-8 text-[11px] text-[#241811]/60 font-sans">
                <Clock className="w-3.5 h-3.5 text-[#B08A4E]" />
                <span>Monday - Saturday: 9:00 AM - 7:00 PM</span>
              </div>
            </div>

            {/* Chennai Corridor Card */}
            <div className="bg-white/40 border border-[#C8A467]/25 rounded-2xl p-8 text-left space-y-4 hover:shadow-md transition-all duration-300 relative group">
              <div className="absolute top-4 left-4 w-2 h-2 border-t border-l border-[#C8A467]/40 pointer-events-none" />
              <div className="absolute bottom-4 right-4 w-2 h-2 border-b border-r border-[#C8A467]/40 pointer-events-none" />
              
              <div className="flex items-center gap-3 text-[#B08A4E]">
                <MapPin className="w-5 h-5" />
                <h3 className="font-sans text-xs tracking-widest font-bold text-[#241811] uppercase">CHENNAI CORRIDOR HUB</h3>
              </div>
              <p className="font-sans text-xs text-[#241811]/80 leading-relaxed font-light pl-8">
                Sovereign House, ECR Corridor, Neelankarai, Chennai - 600115
              </p>
              <div className="flex items-center gap-2 pl-8 text-[11px] text-[#241811]/60 font-sans">
                <Clock className="w-3.5 h-3.5 text-[#B08A4E]" />
                <span>Monday - Saturday: 9:00 AM - 7:00 PM</span>
              </div>
            </div>

            {/* Direct Inquiries & Lines */}
            <div className="border border-[#C8A467]/35 rounded-2xl p-8 text-left space-y-5 bg-[#2E1E14] text-[#F5EFE3]">
              <h4 className="font-sans text-[10px] tracking-[0.25em] text-[#C8A467] uppercase font-bold">DIRECT COMMUNICATIONS</h4>
              
              <div className="space-y-4 font-sans text-xs">
                <div className="flex justify-between border-b border-[#C8A467]/10 pb-2">
                  <span className="text-[#F5EFE3]/50">General Inquiry:</span>
                  <span className="font-bold text-[#C8A467]">+91 94423 25093</span>
                </div>
                <div className="flex justify-between border-b border-[#C8A467]/10 pb-2">
                  <span className="text-[#F5EFE3]/50">Site Coordination:</span>
                  <span className="font-bold text-[#C8A467]">+91 97866 28200</span>
                </div>
                <div className="flex justify-between pb-2">
                  <span className="text-[#F5EFE3]/50">Official Email:</span>
                  <span className="text-[#C8A467] font-semibold">contact@kuberaaproperties.com</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Embedded Inquiry / Booking Form */}
          <div className="lg:col-span-7 bg-[#2E1E14] text-[#F5EFE3] rounded-2xl border border-[#C8A467]/25 p-8 shadow-xl">
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                <CheckCircle className="w-16 h-16 text-[#C8A467] animate-pulse" />
                <h3 className="font-serif text-3xl text-[#C8A467]">Booking Initiated</h3>
                <p className="font-sans text-xs text-[#F5EFE3]/80 font-light max-w-sm">
                  Your request has been added to our private client registry. A senior layout consultant will contact you in under two hours to schedule your layout visit.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-2.5 mt-4 bg-transparent border border-[#C8A467]/30 hover:border-[#C8A467] text-[#C8A467] text-[10px] tracking-widest font-bold uppercase rounded-lg font-sans transition-colors cursor-pointer"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="text-left mb-8">
                  <span className="text-[10px] font-sans tracking-[0.25em] text-[#C8A467] uppercase block font-semibold mb-1">
                    LAND REGISTRY BOOKINGS
                  </span>
                  <h3 className="font-serif text-2xl text-[#F5EFE3]">Schedule Layout Private Inspection</h3>
                  <div className="w-12 h-[1px] bg-[#C8A467] mt-2.5" />
                </div>

                {/* Name */}
                <div className="space-y-2 text-left">
                  <label className="block font-sans text-[10px] tracking-wider uppercase font-bold text-[#C8A467]">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#B08A4E] absolute left-3 top-3.5" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Maharishi Dev"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#241811] border border-[#C8A467]/20 focus:border-[#C8A467] text-[#F5EFE3] text-xs font-sans rounded-lg pl-10 pr-4 py-3.5 outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Email and Phone Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2 text-left">
                    <label className="block font-sans text-[10px] tracking-wider uppercase font-bold text-[#C8A467]">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-[#B08A4E] absolute left-3 top-3.5" />
                      <input
                        type="email"
                        required
                        placeholder="e.g. client@domain.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-[#241811] border border-[#C8A467]/20 focus:border-[#C8A467] text-[#F5EFE3] text-xs font-sans rounded-lg pl-10 pr-4 py-3.5 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 text-left">
                    <label className="block font-sans text-[10px] tracking-wider uppercase font-bold text-[#C8A467]">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-[#B08A4E] absolute left-3 top-3.5" />
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-[#241811] border border-[#C8A467]/20 focus:border-[#C8A467] text-[#F5EFE3] text-xs font-sans rounded-lg pl-10 pr-4 py-3.5 outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Plot Selection and Preferred Date Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2 text-left">
                    <label className="block font-sans text-[10px] tracking-wider uppercase font-bold text-[#C8A467]">
                      Layout Site Preference *
                    </label>
                    <div className="relative">
                      <Home className="w-4 h-4 text-[#B08A4E] absolute left-3 top-3.5" />
                      <select
                        value={formData.property}
                        onChange={(e) => setFormData({ ...formData, property: e.target.value })}
                        className="w-full bg-[#241811] border border-[#C8A467]/20 focus:border-[#C8A467] text-[#F5EFE3] text-xs font-sans rounded-lg pl-10 pr-4 py-3.5 outline-none transition-all appearance-none"
                      >
                        {LISTINGS_DATA.map((item) => (
                          <option key={item.id} value={item.name} className="bg-[#2E1E14]">
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2 text-left">
                    <label className="block font-sans text-[10px] tracking-wider uppercase font-bold text-[#C8A467]">
                      Preferred Visit Date *
                    </label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 text-[#B08A4E] absolute left-3 top-3.5" />
                      <input
                        type="date"
                        required
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full bg-[#241811] border border-[#C8A467]/20 focus:border-[#C8A467] text-[#F5EFE3] text-xs font-sans rounded-lg pl-10 pr-4 py-3.5 outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Special Instructions */}
                <div className="space-y-2 text-left">
                  <label className="block font-sans text-[10px] tracking-wider uppercase font-bold text-[#C8A467]">
                    Special Inquiries / Demarcation Requests
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Corner plots, road widths, licensing requests..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full bg-[#241811] border border-[#C8A467]/20 focus:border-[#C8A467] text-[#F5EFE3] text-xs font-sans rounded-lg px-4 py-3.5 outline-none transition-all resize-none"
                  />
                </div>

                {/* Submit */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-4 px-6 bg-[#B08A4E] hover:bg-[#C8A467] text-[#2E1E14] font-bold text-[10px] tracking-widest uppercase rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer font-sans"
                  >
                    <span>Initiate Booking Request</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                  <p className="text-[9px] text-center text-[#F5EFE3]/40 font-sans mt-3 tracking-wide">
                    IN SUBMITTING, YOU REGISTER SECURELY TO THE KUBERAA STEWARDSHIP AGREEMENT.
                  </p>
                </div>

              </form>
            )}
          </div>

        </div>
      </section>

    </div>
  );
}

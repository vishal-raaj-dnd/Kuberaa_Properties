import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Calendar, User, Mail, Phone, Home, Check } from "lucide-react";
import { LISTINGS_DATA } from "../data";

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedProperty?: string;
}

export default function InquiryModal({ isOpen, onClose, preselectedProperty }: InquiryModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    property: preselectedProperty || LISTINGS_DATA[0].name,
    date: "",
    notes: ""
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.date) {
      setError("Please fill in all mandatory fields to initiate stewardship.");
      return;
    }
    setError("");
    setIsSubmitted(true);
    // Persist inquiry in local storage to demonstrate a real interactive system
    try {
      const existing = localStorage.getItem("kuberaa_inquiries") || "[]";
      const parsed = JSON.parse(existing);
      parsed.push({
        ...formData,
        id: "inq_" + Date.now(),
        timestamp: new Date().toISOString()
      });
      localStorage.setItem("kuberaa_inquiries", JSON.stringify(parsed));
    } catch (e) {
      console.error("Local storage persistence failed", e);
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      property: LISTINGS_DATA[0].name,
      date: "",
      notes: ""
    });
    setIsSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#241811]/80 backdrop-blur-sm"
            id="modal-backdrop"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="relative w-full max-w-xl overflow-hidden rounded-2xl bg-[#F2EBDD] border-2 border-[#C8A467] text-[#241811] shadow-2xl z-10"
            id="modal-container"
          >
            {/* Header branding band */}
            <div className="bg-[#2E1E14] text-[#F5EFE3] px-6 py-4 flex justify-between items-center border-b border-[#C8A467]">
              <div>
                <span className="text-xs tracking-[0.25em] font-sans text-[#C8A467] uppercase block">
                  Covenant of Land Ownership
                </span>
                <span className="text-lg font-serif font-medium">Kuberaa Concierge</span>
              </div>
              <button
                onClick={onClose}
                className="text-[#F5EFE3]/70 hover:text-[#C8A467] transition-colors p-1 rounded-full hover:bg-white/5"
                aria-label="Close modal"
                id="close-modal-button"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Inner Content */}
            <div className="p-6 md:p-8 max-h-[80vh] overflow-y-auto">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-5" id="concierge-inquiry-form">
                  <div className="text-center mb-6">
                    <div className="inline-block w-2.5 h-2.5 rotate-45 bg-[#C8A467] mb-2" />
                    <h3 className="font-serif text-2xl tracking-wide">Request a Site Layout Tour</h3>
                    <p className="text-xs text-[#241811]/70 font-sans mt-1 max-w-md mx-auto leading-relaxed">
                      Please register your details below. Your appointed Senior Plot Consultant will call you in under two hours to coordinate a private site visit or share legal DTCP/TNRERA documents.
                    </p>
                  </div>

                  {error && (
                    <div className="bg-red-50 text-red-800 text-xs px-3 py-2 rounded-lg border border-red-200">
                      {error}
                    </div>
                  )}

                  {/* Name field */}
                  <div>
                    <label className="block text-[10px] font-sans uppercase tracking-[0.15em] text-[#241811]/60 mb-1.5 font-semibold">
                      Your Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B08A4E]" />
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Maharishi Dev"
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#C8A467]/40 bg-white/50 focus:bg-white focus:outline-none focus:border-[#B08A4E] transition-all text-sm font-sans"
                      />
                    </div>
                  </div>

                  {/* Contact Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-sans uppercase tracking-[0.15em] text-[#241811]/60 mb-1.5 font-semibold">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B08A4E]" />
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="name@exclusive.com"
                          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#C8A467]/40 bg-white/50 focus:bg-white focus:outline-none focus:border-[#B08A4E] transition-all text-sm font-sans"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-sans uppercase tracking-[0.15em] text-[#241811]/60 mb-1.5 font-semibold">
                        Telephone Number *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B08A4E]" />
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+91 XXXXX XXXXX"
                          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#C8A467]/40 bg-white/50 focus:bg-white focus:outline-none focus:border-[#B08A4E] transition-all text-sm font-sans"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Selection Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-sans uppercase tracking-[0.15em] text-[#241811]/60 mb-1.5 font-semibold">
                        Select Layout Plot *
                      </label>
                      <div className="relative">
                        <Home className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B08A4E]" />
                        <select
                          value={formData.property}
                          onChange={(e) => setFormData({ ...formData, property: e.target.value })}
                          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#C8A467]/40 bg-white/50 focus:bg-white focus:outline-none focus:border-[#B08A4E] transition-all text-sm font-sans appearance-none"
                        >
                          {LISTINGS_DATA.map((item) => (
                            <option key={item.id} value={item.name}>
                              {item.name} ({item.tag})
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-sans uppercase tracking-[0.15em] text-[#241811]/60 mb-1.5 font-semibold">
                        Preferred Date *
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B08A4E]" />
                        <input
                          type="date"
                          required
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#C8A467]/40 bg-white/50 focus:bg-white focus:outline-none focus:border-[#B08A4E] transition-all text-sm font-sans"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-[10px] font-sans uppercase tracking-[0.15em] text-[#241811]/60 mb-1.5 font-semibold">
                      Special Plot Demarcations or Requests
                    </label>
                    <textarea
                      rows={2}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="e.g. Corner plot preference, commercial zoning inquiries, DTCP approval copies requested..."
                      className="w-full px-4 py-2.5 rounded-lg border border-[#C8A467]/40 bg-white/50 focus:bg-white focus:outline-none focus:border-[#B08A4E] transition-all text-sm font-sans resize-none"
                    />
                  </div>

                  {/* Gold Pill CTA Submit */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3 px-6 bg-[#B08A4E] hover:bg-[#C8A467] active:bg-[#B08A4E] text-[#2E1E14] font-semibold text-sm rounded-full transition-all duration-300 tracking-[0.15em] uppercase shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer font-sans"
                      id="submit-inquiry-button"
                    >
                      <span>Inquire Privately</span>
                      <div className="w-1.5 h-1.5 rounded-full bg-[#2E1E14]" />
                    </button>
                    <p className="text-[10px] text-center text-[#241811]/50 font-sans mt-3">
                      By submitting, you consent to our private client registry covenant. No marketing spam.
                    </p>
                  </div>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-8 px-4 text-center space-y-6"
                  id="success-parchment-view"
                >
                  <div className="w-16 h-16 bg-emerald-50 rounded-full border border-emerald-200 flex items-center justify-center mx-auto text-emerald-700 shadow-inner">
                    <Check className="w-8 h-8 stroke-[2.5]" />
                  </div>

                  <div className="space-y-2">
                    <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-[#B08A4E] font-bold">
                      Reservation Pending
                    </span>
                    <h3 className="font-serif text-3xl text-[#241811]">The Covenant is Signed</h3>
                    <div className="w-24 h-[1px] bg-[#C8A467] mx-auto my-3" />
                  </div>

                  <div className="bg-white/40 border border-[#C8A467]/30 p-5 rounded-xl font-serif text-sm italic text-[#241811]/80 max-w-md mx-auto shadow-sm leading-relaxed">
                    "We acknowledge with gratitude your interest in <span className="font-semibold font-sans not-italic text-xs bg-[#2E1E14] text-[#F5EFE3] px-2 py-0.5 rounded-full">{formData.property}</span>. 
                    Your dedicated senior consultant, <span className="font-sans not-italic font-semibold text-[#2E1E14]">Mr. S. Raghavan</span>, has been 
                    assigned to your file. A formal communication to arrange your private site layout tour is being prepared."
                  </div>

                  <div className="text-xs font-sans text-[#241811]/60 space-y-1">
                    <p>Stewardship Helpline: <span className="font-semibold text-[#2E1E14]">+91 94423 25093, +91 97866 28200</span></p>
                    <p>Client Reference ID: <span className="font-mono text-[10px] bg-[#2E1E14]/5 px-2 py-0.5 rounded">KUB-{(Math.random() * 10000).toFixed(0)}</span></p>
                  </div>

                  <button
                    onClick={handleReset}
                    className="py-2.5 px-8 bg-[#2E1E14] text-[#F5EFE3] hover:bg-[#3D2A1C] transition-all text-xs uppercase tracking-widest rounded-full font-sans cursor-pointer"
                    id="return-to-brochure-button"
                  >
                    Return to Brochure
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

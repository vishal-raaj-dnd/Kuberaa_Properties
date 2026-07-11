import React, { useState } from "react";
import { Star, Quote, Send, Sparkles } from "lucide-react";
import { TESTIMONIALS_DATA } from "../data";

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState(TESTIMONIALS_DATA);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [quote, setQuote] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !text || !quote) return;

    const newTestimonial = {
      id: `custom-test-${Date.now()}`,
      quote,
      text,
      rating,
      author: name,
      role: role || "Verified Plot Buyer"
    };

    // Prepend new review
    setTestimonials([newTestimonial, ...testimonials]);
    setIsSubmitted(true);

    // Reset form after a delay
    setTimeout(() => {
      setName("");
      setRole("");
      setQuote("");
      setText("");
      setRating(5);
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <div className="pt-24 bg-[#F2EBDD]" id="testimonials-page">
      
      {/* 1. Page Header */}
      <div className="bg-[#2E1E14] text-[#F5EFE3] py-16 border-b border-[#C8A467]/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[10px] font-sans tracking-[0.3em] text-[#C8A467] uppercase block font-semibold mb-2">
            CLIENT VOUCHERS
          </span>
          <h1 className="font-serif text-4xl md:text-5xl text-[#F5EFE3]">
            Landowner <span className="font-serif-italics text-[#C8A467]">Registry & Voices</span>
          </h1>
          <p className="font-sans text-xs text-[#F5EFE3]/60 max-w-md mx-auto mt-2">
            Read stories from individuals and entities who successfully registered plots and realized secure value with us.
          </p>
          <div className="w-12 h-[1px] bg-[#C8A467] mx-auto mt-4" />
        </div>
      </div>

      {/* 2. Review List Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Rating summary stats */}
        <div className="flex flex-col items-center mb-12 text-center">
          <div className="flex gap-1 text-[#B08A4E] mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-[#B08A4E] stroke-[#B08A4E]" />
            ))}
          </div>
          <span className="text-xs font-sans text-[#241811]/70">
            Based on <strong className="text-[#241811] font-bold">100% genuine buyer experiences</strong> across Coimbatore and Chennai layouts.
          </span>
        </div>

        {/* Grid of Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-white/40 border border-[#C8A467]/25 rounded-2xl p-8 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow duration-300 relative group animate-fade-in"
              id={`testimonials-card-${item.id}`}
            >
              {/* Decorative brackets */}
              <div className="absolute top-4 left-4 w-2.5 h-2.5 border-t border-l border-[#C8A467]/40 pointer-events-none" />
              <div className="absolute bottom-4 right-4 w-2.5 h-2.5 border-b border-r border-[#C8A467]/40 pointer-events-none" />

              <div className="space-y-4 relative z-10">
                <div className="text-[#C8A467] opacity-25 group-hover:opacity-45 transition-opacity">
                  <Quote className="w-8 h-8 transform -scale-x-100" />
                </div>

                <h3 className="font-serif text-lg font-semibold italic text-[#241811] leading-snug">
                  "{item.quote}"
                </h3>

                <p className="font-sans text-xs text-[#241811]/80 leading-relaxed font-light">
                  {item.text}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#C8A467]/15 flex justify-between items-center relative z-10">
                <div>
                  <div className="font-sans text-[11px] tracking-[0.15em] font-bold text-[#241811] uppercase">
                    {item.author}
                  </div>
                  <div className="font-sans text-[9px] tracking-wide text-[#241811]/50 mt-0.5">
                    {item.role}
                  </div>
                </div>

                <div className="flex gap-0.5 text-[#B08A4E]">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-[#B08A4E] stroke-[#B08A4E]" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Leave a Testimonial Form Section */}
      <section className="py-20 bg-[#2E1E14] text-[#F5EFE3] border-t border-[#C8A467]/15">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <span className="text-[10px] font-sans tracking-[0.3em] text-[#C8A467] uppercase block font-semibold mb-2">
              SHARE YOUR COVENANT
            </span>
            <h2 className="font-serif text-3xl text-[#F5EFE3]">
              Submit Your <span className="font-serif-italics text-[#C8A467]">Verified Experience</span>
            </h2>
            <p className="font-sans text-xs text-[#F5EFE3]/60 mt-2">
              Are you a client of Kuberaa Properties? Share your story with our network of prospective landowners.
            </p>
            <div className="w-12 h-[1px] bg-[#C8A467] mx-auto mt-4" />
          </div>

          <div className="bg-[#241811] border border-[#C8A467]/20 p-8 rounded-2xl relative shadow-xl overflow-hidden">
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
                <div className="w-12 h-12 bg-[#B08A4E]/25 border border-[#B08A4E] rounded-full flex items-center justify-center text-[#C8A467] animate-bounce">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-2xl text-[#C8A467]">Thank You For Vouching!</h3>
                <p className="font-sans text-xs text-[#F5EFE3]/70 font-light max-w-sm">
                  Your testimonial has been verified and registered on this page with our collection of verified landowner records.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* 2-Column Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2 text-left">
                    <label className="block font-sans text-[10px] tracking-wider uppercase font-bold text-[#C8A467]">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Anand Kumar"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#2E1E14] border border-[#C8A467]/20 focus:border-[#C8A467] text-[#F5EFE3] text-xs font-sans rounded-lg px-4 py-3 outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-2 text-left">
                    <label className="block font-sans text-[10px] tracking-wider uppercase font-bold text-[#C8A467]">
                      Designation / Role
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. IT Consultant, Plot Owner"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full bg-[#2E1E14] border border-[#C8A467]/20 focus:border-[#C8A467] text-[#F5EFE3] text-xs font-sans rounded-lg px-4 py-3 outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Rating selection */}
                <div className="space-y-2 text-left">
                  <label className="block font-sans text-[10px] tracking-wider uppercase font-bold text-[#C8A467]">
                    Overall Experience Rating
                  </label>
                  <div className="flex gap-1.5 items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(null)}
                        className="text-[#B08A4E] transition-transform duration-200 hover:scale-110 cursor-pointer"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            (hoverRating !== null ? star <= hoverRating : star <= rating)
                              ? "fill-[#B08A4E] stroke-[#B08A4E]"
                              : "stroke-[#C8A467]/40"
                          }`}
                        />
                      </button>
                    ))}
                    <span className="font-sans text-[10px] text-[#F5EFE3]/50 ml-2 tracking-wider uppercase font-medium">
                      {(hoverRating !== null ? hoverRating : rating)} / 5 stars
                    </span>
                  </div>
                </div>

                {/* Review summary/quote */}
                <div className="space-y-2 text-left">
                  <label className="block font-sans text-[10px] tracking-wider uppercase font-bold text-[#C8A467]">
                    Review Summary (Quote Headline)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Gated security & clear DTCP paperwork made it effortless"
                    value={quote}
                    onChange={(e) => setQuote(e.target.value)}
                    className="w-full bg-[#2E1E14] border border-[#C8A467]/20 focus:border-[#C8A467] text-[#F5EFE3] text-xs font-sans rounded-lg px-4 py-3 outline-none transition-all"
                  />
                </div>

                {/* Review body */}
                <div className="space-y-2 text-left">
                  <label className="block font-sans text-[10px] tracking-wider uppercase font-bold text-[#C8A467]">
                    Detailed Testimony
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe your plot buying journey, infrastructure standards, title clearance, or registration assistance..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full bg-[#2E1E14] border border-[#C8A467]/20 focus:border-[#C8A467] text-[#F5EFE3] text-xs font-sans rounded-lg px-4 py-3 outline-none transition-all resize-none"
                  />
                </div>

                {/* Submit button */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#B08A4E] hover:bg-[#C8A467] text-[#2E1E14] text-[10px] tracking-widest font-bold uppercase rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2 cursor-pointer font-sans"
                  >
                    <span>Register Testimonial</span>
                    <Send className="w-3 h-3" />
                  </button>
                </div>

              </form>
            )}
          </div>
        </div>
      </section>

    </div>
  );
}

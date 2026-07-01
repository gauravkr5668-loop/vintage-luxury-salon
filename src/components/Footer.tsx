import React from "react";
import { Star, Instagram, Phone, MapPin, Clock, ArrowUp, Sparkles } from "lucide-react";

export default function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="footer" className="bg-charcoal text-ivory/80 pt-20 pb-12 border-t border-gold/15 relative overflow-hidden">
      {/* Decorative lines */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-gold/10">
          
          {/* Brand Info */}
          <div className="space-y-6">
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold tracking-widest text-white">VINTAGE</span>
              <span className="font-sans text-[10px] tracking-[0.3em] text-gold uppercase font-medium">Luxury Unisex Salon</span>
            </div>
            
            <p className="font-sans text-xs text-ivory/60 leading-relaxed max-w-xs">
              A private, award-winning sanctuary dedicated to silent luxury, expert geometry contouring, and editorial beauty refinement in North Delhi.
            </p>

            {/* Google Rating */}
            <div className="flex items-center space-x-3 bg-white/5 border border-gold/10 p-3 w-fit">
              <Star size={16} className="fill-gold text-gold" />
              <div>
                <span className="font-sans text-xs font-semibold text-white block">⭐ 4.8 Google Rating</span>
                <span className="font-sans text-[9px] uppercase tracking-wider text-ivory/50 block">363+ Verified Client Reviews</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-sm text-white uppercase tracking-widest mb-6">Explore Menu</h3>
            <ul className="space-y-3.5 font-sans text-xs">
              <li><a href="#services" className="hover:text-gold transition-colors">Signature Services</a></li>
              <li><a href="#about" className="hover:text-gold transition-colors">Our Heritage Story</a></li>
              <li><a href="#ai-consultation" className="hover:text-gold transition-colors flex items-center gap-1.5">AI Consultation <span className="text-[10px] bg-gold/15 text-gold px-1.5 py-0.5 font-semibold">NEW</span></a></li>
              <li><a href="#gallery" className="hover:text-gold transition-colors">Luxury Gallery</a></li>
              <li><a href="#reviews" className="hover:text-gold transition-colors">Customer Reviews</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h3 className="font-serif text-sm text-white uppercase tracking-widest mb-6">The Salon Hub</h3>
            
            <div className="flex items-start space-x-3 font-sans text-xs">
              <MapPin size={16} className="text-gold shrink-0 mt-0.5" />
              <p className="leading-relaxed text-ivory/70">
                Sant Nagar, Rani Bagh,<br />
                Pitampura, Delhi - 110034
              </p>
            </div>

            <div className="flex items-center space-x-3 font-sans text-xs">
              <Phone size={14} className="text-gold shrink-0" />
              <a href="tel:9899000879" className="hover:text-gold transition-colors">9899000879</a>
            </div>

            <div className="flex items-center space-x-3 font-sans text-xs">
              <Instagram size={14} className="text-gold shrink-0" />
              <a
                href="https://instagram.com/vintage_luxury_unisex_salon"
                target="_blank"
                rel="noreferrer"
                className="hover:text-gold transition-colors"
              >
                Vintage Luxury Unisex Salon
              </a>
            </div>
          </div>

          {/* Hours & Booking */}
          <div className="space-y-6">
            <h3 className="font-serif text-sm text-white uppercase tracking-widest mb-6">Reservation Slots</h3>
            
            <div className="flex items-start space-x-3 font-sans text-xs">
              <Clock size={16} className="text-gold shrink-0 mt-0.5" />
              <div>
                <span className="font-medium text-white block">Open Daily</span>
                <span className="text-ivory/60 block mt-1">10:00 AM – 8:00 PM</span>
                <span className="text-[10px] uppercase text-gold/80 block mt-1">Prior Reservation Advised</span>
              </div>
            </div>

            <a
              href="#booking"
              className="inline-flex items-center gap-2 border border-gold/40 hover:border-gold text-gold hover:text-white px-5 py-2.5 font-sans text-[11px] uppercase tracking-widest transition-colors font-medium"
            >
              <Sparkles size={12} />
              Book Ritual Slot
            </a>
          </div>

        </div>

        {/* Lower row */}
        <div className="pt-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="font-sans text-[10px] tracking-wider text-ivory/40 uppercase">
            © 2026 Vintage Luxury Salon. Sant Nagar, Rani Bagh, Pitampura, Delhi. All Rights Reserved.
          </p>

          <button
            onClick={handleScrollToTop}
            className="flex items-center space-x-1.5 font-sans text-[10px] uppercase tracking-widest text-gold hover:text-white transition-colors"
            aria-label="Scroll to top"
          >
            <span>Top of Page</span>
            <ArrowUp size={12} />
          </button>
        </div>

      </div>
    </footer>
  );
}

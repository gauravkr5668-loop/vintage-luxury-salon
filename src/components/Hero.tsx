import React from "react";
import { motion } from "motion/react";
import { Star, ArrowDown, MapPin, Sparkles } from "lucide-react";
import { salonImages } from "../images";

interface HeroProps {
  onBookClick: () => void;
  onConsultClick: () => void;
}

export default function Hero({ onBookClick, onConsultClick }: HeroProps) {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center bg-ivory overflow-hidden pt-20">
      {/* Dynamic Ambient Background / Parallax Effect */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/35 via-charcoal/15 to-ivory/85 z-10" />
        <img
          src={salonImages.interior1}
          alt="Vintage Luxury Salon Interior"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-105 animate-[pulse_8s_infinite_alternate]"
        />
      </div>

      {/* Floating Trust badge */}
      <div className="absolute top-28 left-4 sm:left-12 z-20 hidden md:block">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="bg-ivory/90 backdrop-blur-md px-4 py-3 border border-gold/20 flex items-center space-x-3 shadow-md"
        >
          <div className="bg-emerald/10 p-2 rounded-full">
            <Sparkles size={16} className="text-gold" />
          </div>
          <div>
            <div className="flex items-center">
              <span className="font-sans text-xs font-semibold text-charcoal">⭐ 4.8 Google Rating</span>
            </div>
            <p className="font-sans text-[10px] uppercase tracking-wider text-charcoal/60">363+ Verified Reviews</p>
          </div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-ivory flex flex-col items-center pt-12 sm:pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-4"
        >
          <span className="font-sans text-[11px] sm:text-xs tracking-[0.4em] uppercase text-gold font-medium bg-charcoal/60 px-4 py-1.5 backdrop-blur-sm inline-block rounded-full">
            Luxury Unisex Salon • Pitampura, Delhi
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.1 }}
          className="font-serif text-4xl sm:text-6xl md:text-8xl font-medium tracking-tight leading-[0.95] text-white mb-6"
        >
          Where Beauty <br />
          <span className="italic font-normal text-gold text-3xl sm:text-5xl md:text-7xl block mt-2">
            Becomes Ritual
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="font-sans text-sm sm:text-lg max-w-2xl text-ivory/90 font-light tracking-wide mb-10 leading-relaxed drop-shadow"
        >
          Experience bespoke hair artistry, luxury skin treatments, and bridal beauty in an elegant sanctuary designed around you.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 w-full justify-center max-w-md"
        >
          <button
            id="hero-book-btn"
            onClick={onBookClick}
            className="bg-gold hover:bg-emerald hover:text-ivory text-charcoal font-sans text-xs uppercase tracking-widest px-8 py-4 rounded-none transition-all duration-500 font-medium tracking-wider shadow-lg shadow-black/20"
          >
            Reserve Appointment
          </button>
          <button
            id="hero-consult-btn"
            onClick={onConsultClick}
            className="border border-white hover:bg-white hover:text-charcoal text-white font-sans text-xs uppercase tracking-widest px-8 py-4 rounded-none transition-all duration-500 font-medium backdrop-blur-sm"
          >
            AI Beauty Advisor ✨
          </button>
        </motion.div>

        {/* Mobile Trust Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 flex items-center space-x-6 text-xs text-ivory/80 font-sans tracking-wider md:hidden"
        >
          <div className="flex items-center space-x-1">
            <Star size={14} className="fill-gold text-gold" />
            <span>4.8 Rating</span>
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-gold/50" />
          <span>363+ Happy Clients</span>
        </motion.div>
      </div>

      {/* Smooth scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center">
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-gold"
        >
          <a href="#services" className="flex flex-col items-center space-y-1 group" aria-label="Scroll down">
            <span className="font-sans text-[9px] uppercase tracking-[0.3em] text-ivory/70 group-hover:text-gold transition-colors">
              Discover
            </span>
            <ArrowDown size={14} className="text-gold/70 group-hover:text-gold transition-colors" />
          </a>
        </motion.span>
      </div>

      {/* Elegant Curved Transition at the bottom of hero */}
      <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto translate-y-[2px]"
        >
          <path
            d="M0 120H1440V40C1440 40 1080 0 720 0C360 0 0 40 0 40V120Z"
            fill="#FBF9F4"
          />
        </svg>
      </div>
    </section>
  );
}

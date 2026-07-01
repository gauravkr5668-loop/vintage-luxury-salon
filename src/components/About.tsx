import React from "react";
import { motion } from "motion/react";
import { salonImages } from "../images";
import { Sparkles, Heart, Award } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-24 bg-softwhite relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Magazine Editorial Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Overlapping Images (Editorial Collage) */}
          <div className="lg:col-span-6 relative">
            
            {/* Main Reception Photo (with Vintage Logo) */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative z-20 shadow-2xl border border-gold/10 overflow-hidden"
            >
              <div className="aspect-[4/3] w-full overflow-hidden zoom-container">
                <img
                  src={salonImages.reception}
                  alt="Vintage Luxury Salon Reception Logo"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover zoom-image"
                />
              </div>
              <div className="absolute bottom-4 left-4 right-4 bg-charcoal/80 backdrop-blur-md p-4 text-center border border-gold/20">
                <p className="font-serif text-sm italic text-gold">The Entrance to Unrivaled Elegance</p>
                <p className="font-sans text-[10px] uppercase tracking-widest text-ivory/80 mt-1">Our White Tiered Reception & Cascading Chandelier</p>
              </div>
            </motion.div>

            {/* Backgound Accent Box */}
            <div className="absolute -top-6 -left-6 w-32 h-32 border-l border-t border-gold/30 pointer-events-none z-0 hidden sm:block" />
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-ivory pointer-events-none z-10 hidden sm:block shadow-md border border-gold/5" />
            
            {/* Small floating card detail */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="absolute -bottom-10 left-12 z-30 bg-emerald text-ivory p-5 hidden sm:block shadow-xl max-w-[200px]"
            >
              <span className="font-serif text-3xl text-gold block">12+</span>
              <span className="font-sans text-[10px] uppercase tracking-widest text-ivory/80 block mt-1">Years of Creative Stylist Mastery</span>
            </motion.div>
          </div>

          {/* Right Column: Narrative Copy */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <span className="font-sans text-xs tracking-[0.3em] uppercase text-gold font-medium mb-3">
              The Brand Story
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-medium tracking-tight text-charcoal leading-tight mb-6">
              More Than a Salon.<br />
              <span className="italic font-normal text-gold">It is an Experience.</span>
            </h2>
            
            <p className="font-sans text-sm text-charcoal/70 leading-relaxed mb-6">
              Founded on the pillars of bespoke craftsmanship and quiet luxury, <strong>Vintage Luxury Salon</strong> has rewritten the boundaries of unisex styling in Pitampura and Rani Bagh, Delhi. We believe beauty is not an assembly line; it is a personalized ritual of self-appreciation.
            </p>

            <p className="font-sans text-sm text-charcoal/70 leading-relaxed mb-8">
              Every detail—from our custom white stepped reception crest, soft neon glow backdrops, and signature deep emerald styling seats, to our advanced French hair and German skin formulas—is carefully orchestrated. When you enter, you leave the noise of the city behind for an oasis of absolute calm and precision artistry.
            </p>

            {/* Icons highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-gold/15">
              <div className="flex flex-col">
                <div className="flex items-center space-x-2 text-emerald mb-2">
                  <Award size={18} className="text-gold" />
                  <span className="font-serif text-sm font-medium text-charcoal">Master Stylists</span>
                </div>
                <p className="font-sans text-xs text-charcoal/60 leading-relaxed">
                  Trained across premium European standards for precise haircuts and bespoke colors.
                </p>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center space-x-2 text-emerald mb-2">
                  <Sparkles size={18} className="text-gold" />
                  <span className="font-serif text-sm font-medium text-charcoal">Quiet Luxury</span>
                </div>
                <p className="font-sans text-xs text-charcoal/60 leading-relaxed">
                  Deep velvet textures, warm golden lighting, and cascading crystals for serene comfort.
                </p>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center space-x-2 text-emerald mb-2">
                  <Heart size={18} className="text-gold" />
                  <span className="font-serif text-sm font-medium text-charcoal">Hygiene First</span>
                </div>
                <p className="font-sans text-xs text-charcoal/60 leading-relaxed">
                  Medical-grade tool sterilizations and disposable kits with zero compromise.
                </p>
              </div>
            </div>

          </div>

        </div>
        
      </div>
    </section>
  );
}

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SERVICES_CATALOG } from "../data";
import { ArrowUpRight } from "lucide-react";

interface ServicesProps {
  onServiceSelect: (serviceName: string) => void;
}

export default function Services({ onServiceSelect }: ServicesProps) {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Hair", "Skin", "Bridal", "Nails", "Wellness"];

  const filteredServices = activeCategory === "All"
    ? SERVICES_CATALOG
    : SERVICES_CATALOG.filter(s => s.category.toLowerCase() === activeCategory.toLowerCase() || (activeCategory === "Nails" && s.id.includes("nail")) || (activeCategory === "Wellness" && (s.category.toLowerCase() === "wellness" || s.id.includes("waxing"))));

  return (
    <section id="services" className="py-24 bg-ivory relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="font-sans text-xs tracking-[0.3em] uppercase text-gold font-medium">
            Our Signature Services
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-medium tracking-tight mt-2 text-charcoal">
            Crafted For Your Elegance
          </h2>
          <div className="w-12 h-[1px] bg-gold mx-auto mt-4" />
          <p className="font-sans text-sm text-charcoal/60 mt-4 max-w-xl mx-auto leading-relaxed">
            From seamless precision cuts to botanical skin restoration, explore our curated menus designed to celebrate your unique natural grace.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-6 mb-16 max-w-2xl mx-auto">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`font-sans text-xs uppercase tracking-widest px-5 py-2.5 transition-all duration-300 rounded-none border ${
                activeCategory === category
                  ? "bg-charcoal text-ivory border-charcoal shadow-sm"
                  : "bg-transparent text-charcoal/70 border-gold/20 hover:border-gold hover:text-charcoal"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Circular Services Grid (Inspired by Reference Image Circular Layout) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service, idx) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6, delay: idx * 0.05 }}
                key={service.id}
                className="flex flex-col items-center text-center group cursor-pointer"
                onClick={() => onServiceSelect(service.name)}
              >
                {/* Circular image treatment with gold rotating border */}
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden mb-6 border border-gold/20 p-1 bg-ivory shadow-md transition-all duration-500 group-hover:border-gold group-hover:shadow-xl">
                  <div className="w-full h-full rounded-full overflow-hidden relative">
                    {/* Dark overlay on hover */}
                    <div className="absolute inset-0 bg-charcoal/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 flex items-center justify-center">
                      <div className="bg-ivory/90 p-3 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <ArrowUpRight size={20} className="text-emerald" />
                      </div>
                    </div>
                    
                    <img
                      src={service.image}
                      alt={service.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-[1.5s]"
                    />
                  </div>
                </div>

                <span className="font-sans text-[10px] uppercase tracking-widest text-gold font-medium mb-1.5 block">
                  {service.category}
                </span>
                
                <h3 className="font-serif text-xl font-medium tracking-wide text-charcoal group-hover:text-gold transition-colors duration-300">
                  {service.name}
                </h3>
                
                <p className="font-sans text-xs text-charcoal/60 mt-2 max-w-xs leading-relaxed">
                  {service.description}
                </p>

                <div className="mt-3 font-sans text-xs font-semibold text-emerald tracking-wider bg-emerald/5 px-3 py-1 border border-emerald/10">
                  {service.price}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>

      {/* Decorative leafy elements or accents in background */}
      <div className="absolute left-0 bottom-10 w-48 h-48 opacity-[0.03] pointer-events-none select-none">
        <svg viewBox="0 0 100 100" fill="currentColor" className="text-emerald w-full h-full">
          <path d="M10,90 C30,70 50,70 90,10 C70,30 70,50 10,90 Z" />
        </svg>
      </div>
    </section>
  );
}

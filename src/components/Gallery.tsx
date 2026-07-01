import React from "react";
import { motion } from "motion/react";
import { salonImages } from "../images";
import { ZoomIn } from "lucide-react";

export default function Gallery() {
  const collageItems = [
    {
      id: "g1",
      src: salonImages.interior1,
      alt: "Vintage Luxury Salon Styling Area",
      span: "md:col-span-8 md:row-span-2",
      label: "Emerald Styling Suite",
      desc: "Plush velvet seating & custom geometric mirror frames",
    },
    {
      id: "g2",
      src: salonImages.reception,
      alt: "White Tiered Reception Area",
      span: "md:col-span-4 md:row-span-1",
      label: "Crystalline Arrival",
      desc: "White tiered desk and polished gold emblem crest",
    },
    {
      id: "g3",
      src: salonImages.bridalMakeup,
      alt: "HD Bridal Makeup Transformation",
      span: "md:col-span-4 md:row-span-2",
      label: "Bridal Suite Artistry",
      desc: "Bespoke traditional HD bridal makeovers",
    },
    {
      id: "g4",
      src: salonImages.interior2,
      alt: "Backlit Styling Mirrors",
      span: "md:col-span-8 md:row-span-1",
      label: "Aura Stations",
      desc: "Exquisite gold-grey damask wallpapers and glowing arches",
    },
    {
      id: "g5",
      src: salonImages.hairColor,
      alt: "Luxury Balayage Hair Colouring",
      span: "md:col-span-4 md:row-span-1",
      label: "Master Coloring",
      desc: "Hand-painted balayage techniques using premium global pigments",
    },
    {
      id: "g6",
      src: salonImages.facials,
      alt: "Signature Facials & Skin Treatments",
      span: "md:col-span-8 md:row-span-1",
      label: "Skin Luminosity",
      desc: "Multi-layered medical-grade botanical glow therapies",
    },
  ];

  return (
    <section id="gallery" className="py-24 bg-softwhite relative overflow-hidden border-b border-gold/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="font-sans text-xs tracking-[0.3em] uppercase text-gold font-medium">
            Luxury Gallery
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-medium tracking-tight mt-2 text-charcoal">
            Visual Story of Craftsmanship
          </h2>
          <div className="w-12 h-[1px] bg-gold mx-auto mt-4" />
          <p className="font-sans text-sm text-charcoal/60 mt-4 max-w-xl mx-auto leading-relaxed">
            Step inside our actual sanctuary in Pitampura and Rani Bagh, Delhi, and view the precise visual details of our premium interiors, masterworks, and tranquil environment.
          </p>
        </div>

        {/* Editorial Collage Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 md:grid-rows-4 gap-6 min-h-[1200px] md:min-h-[1400px]">
          {collageItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.08 }}
              className={`${item.span} relative overflow-hidden group border border-gold/10 shadow-lg flex flex-col justify-end bg-charcoal/10 zoom-container`}
            >
              <img
                src={item.src}
                alt={item.alt}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover zoom-image absolute inset-0 z-0"
              />
              {/* Overlay with luxury gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-transparent opacity-60 group-hover:opacity-85 transition-opacity duration-500 z-10" />
              
              {/* Caption and content */}
              <div className="relative z-20 p-6 sm:p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 text-ivory">
                <span className="font-sans text-[10px] uppercase tracking-widest text-gold font-semibold mb-1 block">
                  {item.label}
                </span>
                <h3 className="font-serif text-lg sm:text-2xl font-medium text-white mb-2 leading-tight">
                  {item.alt}
                </h3>
                <p className="font-sans text-xs text-ivory/80 font-light opacity-0 group-hover:opacity-100 transition-opacity duration-500 leading-relaxed max-w-md">
                  {item.desc}
                </p>
              </div>

              {/* Zoom Icon floating */}
              <div className="absolute top-6 right-6 bg-ivory/95 text-emerald p-2.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 shadow-md">
                <ZoomIn size={16} />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

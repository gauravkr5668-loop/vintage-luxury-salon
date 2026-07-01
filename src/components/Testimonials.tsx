import React from "react";
import { motion } from "motion/react";
import { TESTIMONIALS } from "../data";
import { Star, Quote, ChevronRight } from "lucide-react";

export default function Testimonials() {
  return (
    <section id="reviews" className="py-24 bg-softwhite border-t border-b border-gold/10 relative overflow-hidden">
      {/* Decorative floral background or circular shadow blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Master Google Trust Header block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16 pb-12 border-b border-gold/10">
          
          <div className="lg:col-span-5">
            <span className="font-sans text-xs tracking-[0.3em] uppercase text-gold font-medium block mb-2">
              Google Customer Reviews
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-medium tracking-tight text-charcoal leading-tight">
              A Legacy of Trust & Beauty
            </h2>
            <div className="w-12 h-[1px] bg-gold mt-4" />
          </div>

          <div className="lg:col-span-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center space-x-4">
              <span className="font-serif text-5xl sm:text-6xl font-semibold text-charcoal">4.8</span>
              <div>
                <div className="flex items-center text-gold space-x-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} className="fill-gold" />
                  ))}
                </div>
                <p className="font-sans text-[11px] uppercase tracking-widest text-charcoal/50 mt-1.5 font-medium">
                  363+ Verified Google Reviews
                </p>
              </div>
            </div>

            <div className="text-left max-w-sm">
              <p className="font-sans text-xs text-charcoal/60 leading-relaxed italic">
                "Our commitment is simple: We design custom, editorial styling that brings out your most radiant self. Every Google review represents an authentic story of transformation."
              </p>
            </div>
          </div>

        </div>

        {/* Testimonials Grid (Bento columns layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.08 }}
              key={testimonial.id}
              className="bg-ivory border border-gold/15 p-8 flex flex-col justify-between shadow-md relative min-h-[250px] hover:shadow-xl hover:border-gold transition-all duration-300 group"
            >
              {/* Quotation Watermark */}
              <div className="absolute top-4 right-6 text-gold/10 group-hover:text-gold/20 transition-colors duration-300">
                <Quote size={50} />
              </div>

              <div className="space-y-4">
                {/* Rating stars */}
                <div className="flex items-center text-gold space-x-0.5">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={14} className="fill-gold text-gold" />
                  ))}
                </div>

                <p className="font-sans text-xs text-charcoal/85 leading-relaxed italic relative z-10">
                  "{testimonial.text}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-gold/10 flex items-center justify-between">
                <div>
                  <h4 className="font-serif text-sm font-semibold text-charcoal tracking-wide">
                    {testimonial.name}
                  </h4>
                  <span className="font-sans text-[10px] uppercase tracking-widest text-gold font-semibold mt-1 block">
                    Verified Customer
                  </span>
                </div>
                
                {/* Tag pill */}
                <div className="bg-emerald/5 border border-emerald/10 text-emerald font-sans text-[9px] uppercase tracking-wider px-2.5 py-1">
                  {testimonial.tag}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

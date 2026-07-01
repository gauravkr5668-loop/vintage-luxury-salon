import React from "react";
import { motion } from "motion/react";
import { WHY_CHOOSE_US } from "../data";
import { Sparkles, Users, Layers, Shield, Heart, Award, Gem } from "lucide-react";

export default function WhyChooseUs() {
  const icons = [
    <Sparkles size={20} className="text-gold" />,
    <Users size={20} className="text-gold" />,
    <Layers size={20} className="text-gold" />,
    <Shield size={20} className="text-gold" />,
    <Heart size={20} className="text-gold" />,
    <Award size={20} className="text-gold" />,
    <Gem size={20} className="text-gold" />,
  ];

  return (
    <section id="why-choose-us" className="py-24 bg-ivory/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="font-sans text-xs tracking-[0.3em] uppercase text-emerald font-medium">
            The Vintage Standard
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-medium tracking-tight mt-2 text-charcoal">
            Uncompromising Luxury
          </h2>
          <div className="w-12 h-[1px] bg-gold mx-auto mt-4" />
          <p className="font-sans text-sm text-charcoal/60 mt-4 max-w-xl mx-auto leading-relaxed">
            Every styling session at Vintage Luxury Salon is guided by our steadfast commitment to perfection, health, and personalized elegance.
          </p>
        </div>

        {/* Bento/Clean Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {WHY_CHOOSE_US.map((item, index) => {
            // Give specific cards larger grid footprint or unique visual styles
            const isSpecial = index === 0 || index === 5;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className={`p-8 border border-gold/15 bg-softwhite hover:border-gold transition-all duration-500 shadow-md flex flex-col justify-between group ${
                  isSpecial ? "md:col-span-2 lg:col-span-1 border-t-2 border-t-emerald" : ""
                }`}
              >
                <div>
                  {/* Icon Area */}
                  <div className="w-12 h-12 bg-ivory rounded-none border border-gold/10 flex items-center justify-center mb-6 group-hover:bg-emerald group-hover:border-emerald transition-colors duration-500">
                    <span className="group-hover:scale-110 transition-transform duration-500 group-hover:text-ivory">
                      {icons[index % icons.length]}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-medium text-charcoal mb-3 group-hover:text-gold transition-colors duration-300">
                    {item.title}
                  </h3>

                  <p className="font-sans text-xs text-charcoal/60 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="w-6 h-[1px] bg-gold/30 mt-6 group-hover:w-12 transition-all duration-500" />
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

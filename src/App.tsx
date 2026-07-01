import React, { useState } from "react";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import Services from "./components/Services";
import About from "./components/About";
import AIConsultation from "./components/AIConsultation";
import Gallery from "./components/Gallery";
import WhyChooseUs from "./components/WhyChooseUs";
import Testimonials from "./components/Testimonials";
import BookingForm from "./components/BookingForm";
import Footer from "./components/Footer";
import { Sparkles, ArrowRight, Star, Info } from "lucide-react";
import { motion } from "motion/react";

export default function App() {
  const [preselectedService, setPreselectedService] = useState<string>("");

  const handleServiceSelect = (serviceName: string) => {
    setPreselectedService(serviceName);
    scrollToSection("booking");
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div id="app-root" className="min-h-screen bg-ivory text-charcoal font-sans selection:bg-gold/30 selection:text-charcoal relative">
      
      {/* Upper Announcement Bar / Quiet Luxury Greeting */}
      <div className="bg-emerald text-ivory/80 text-[10px] sm:text-xs font-sans uppercase tracking-[0.2em] py-2.5 px-4 text-center border-b border-gold/15 flex items-center justify-center gap-2 relative z-50">
        <Sparkles size={11} className="text-gold animate-pulse" />
        <span>Experience Quiet Luxury in Rani Bagh, Pitampura, Delhi</span>
        <div className="hidden sm:flex items-center space-x-1.5 ml-4 text-gold font-medium">
          <Star size={11} className="fill-gold" />
          <span>4.8 Rating (363+ Google Reviews)</span>
        </div>
      </div>

      {/* Sticky Navigation */}
      <Navigation
        onBookClick={() => scrollToSection("booking")}
        onConsultClick={() => scrollToSection("ai-consultation")}
      />

      {/* Main Sections */}
      <main>
        {/* Cinematic Hero Section */}
        <Hero
          onBookClick={() => scrollToSection("booking")}
          onConsultClick={() => scrollToSection("ai-consultation")}
        />

        {/* Elegant Category-Filtered Services */}
        <Services onServiceSelect={handleServiceSelect} />

        {/* Brand Narrative / Editorial About */}
        <About />

        {/* Highly Interactive AI Beauty & Consultation (Image understanding + Grounded Search) */}
        <AIConsultation
          onAddServiceToBooking={handleServiceSelect}
          onScrollToBooking={() => scrollToSection("booking")}
        />

        {/* Luxury Gallery Collage */}
        <Gallery />

        {/* Why Choose Us Grid */}
        <WhyChooseUs />

        {/* Google Testimonials Rating Block */}
        <Testimonials />

        {/* Luxury Reservation Form & Hotline */}
        <BookingForm preselectedService={preselectedService} />
      </main>

      {/* Luxury Footer */}
      <Footer />

    </div>
  );
}

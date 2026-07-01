import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Instagram, Phone, Star } from "lucide-react";

interface NavigationProps {
  onBookClick: () => void;
  onConsultClick: () => void;
}

export default function Navigation({ onBookClick, onConsultClick }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { name: "Services", href: "#services" },
    { name: "About", href: "#about" },
    { name: "AI Consultation", href: "#ai-consultation" },
    { name: "Gallery", href: "#gallery" },
    { name: "Reviews", href: "#reviews" },
  ];

  return (
    <>
      <header
        id="navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-ivory/95 backdrop-blur-md shadow-sm border-b border-gold/10 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Left Nav (Desktop) */}
            <nav className="hidden lg:flex space-x-8">
              {menuItems.slice(0, 3).map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="font-sans text-xs uppercase tracking-widest text-charcoal/80 hover:text-gold transition-colors duration-300"
                >
                  {item.name}
                </a>
              ))}
            </nav>

            {/* Brand Logo in Center */}
            <a href="#" className="flex flex-col items-center select-none text-center group">
              <span className="font-serif text-lg sm:text-xl md:text-2xl font-semibold tracking-widest text-charcoal group-hover:text-gold transition-colors duration-300">
                VINTAGE
              </span>
              <span className="font-sans text-[8px] sm:text-[9px] tracking-[0.3em] text-gold uppercase font-medium -mt-1">
                Luxury Salon
              </span>
            </a>

            {/* Right Nav (Desktop) */}
            <div className="hidden lg:flex items-center space-x-8">
              <nav className="flex space-x-8">
                {menuItems.slice(3).map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="font-sans text-xs uppercase tracking-widest text-charcoal/80 hover:text-gold transition-colors duration-300"
                  >
                    {item.name}
                  </a>
                ))}
              </nav>

              <button
                id="nav-consult-btn"
                onClick={onConsultClick}
                className="font-sans text-[11px] uppercase tracking-widest text-emerald font-medium hover:text-gold transition-colors"
              >
                AI Stylist
              </button>

              <button
                id="nav-book-btn"
                onClick={onBookClick}
                className="font-sans text-xs uppercase tracking-widest bg-charcoal text-ivory px-5 py-2.5 rounded-none font-medium hover:bg-gold hover:text-charcoal transition-all duration-300 shadow-lg shadow-charcoal/5"
              >
                Book Experience
              </button>
            </div>

            {/* Mobile Menu Trigger */}
            <div className="flex items-center space-x-4 lg:hidden">
              <button
                id="mobile-book-btn-direct"
                onClick={onBookClick}
                className="font-sans text-[10px] uppercase tracking-wider bg-charcoal text-ivory px-3 py-1.5 font-medium hover:bg-gold hover:text-charcoal transition-all"
              >
                Book
              </button>
              <button
                id="mobile-menu-trigger"
                onClick={() => setIsOpen(!isOpen)}
                className="text-charcoal hover:text-gold transition-colors"
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-[60px] z-40 bg-ivory/98 backdrop-blur-lg lg:hidden"
          >
            <div className="flex flex-col h-full justify-between p-8">
              <nav className="flex flex-col space-y-6 pt-8">
                {menuItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="font-serif text-2xl tracking-wide text-charcoal hover:text-gold transition-colors"
                  >
                    {item.name}
                  </a>
                ))}
                <button
                  id="mobile-nav-consult-btn"
                  onClick={() => {
                    setIsOpen(false);
                    onConsultClick();
                  }}
                  className="text-left font-serif text-2xl tracking-wide text-emerald hover:text-gold transition-colors"
                >
                  AI Consultation ✨
                </button>
              </nav>

              <div className="space-y-6 pb-12 border-t border-gold/20 pt-8">
                <div className="flex items-center justify-between text-xs tracking-wider text-charcoal/60 font-sans">
                  <div className="flex items-center space-x-1">
                    <Star size={14} className="fill-gold text-gold" />
                    <span>4.8 Rating</span>
                  </div>
                  <span>Pitampura, Delhi</span>
                </div>

                <button
                  id="mobile-drawer-book-btn"
                  onClick={() => {
                    setIsOpen(false);
                    onBookClick();
                  }}
                  className="w-full text-center bg-charcoal text-ivory py-4 uppercase font-sans text-xs tracking-widest font-medium hover:bg-gold hover:text-charcoal transition-all shadow-md"
                >
                  Book Appointment
                </button>

                <div className="flex justify-center space-x-6 text-charcoal/60">
                  <a
                    href="https://instagram.com/vintage_luxury_unisex_salon"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-gold transition-colors"
                  >
                    <Instagram size={20} />
                  </a>
                  <a href="tel:9899000879" className="hover:text-gold transition-colors flex items-center space-x-2">
                    <Phone size={18} />
                    <span className="font-sans text-xs font-medium">9899000879</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SERVICES_CATALOG } from "../data";
import { Calendar, Clock, Sparkles, Phone, User, CheckCircle2, ChevronRight, AlertCircle, X } from "lucide-react";
import { BookingForm as FormType, BookingResult } from "../types";

interface BookingFormProps {
  preselectedService: string;
}

export default function BookingForm({ preselectedService }: BookingFormProps) {
  const [formData, setFormData] = useState<FormType>({
    name: "",
    phone: "",
    service: "",
    date: "",
    time: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successResult, setSuccessResult] = useState<BookingResult | null>(null);

  // Sync preselected service from navigation or AI consultation recommendation
  useEffect(() => {
    if (preselectedService) {
      setFormData((prev) => ({ ...prev, service: preselectedService }));
    }
  }, [preselectedService]);

  const servicesList = SERVICES_CATALOG.map((s) => s.name);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate
    if (!formData.name || !formData.phone || !formData.service || !formData.date || !formData.time) {
      setError("Please complete all fields of this booking experience.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to make a reservation");
      }

      setSuccessResult(data.booking);
      // Reset form
      setFormData({
        name: "",
        phone: "",
        service: "",
        date: "",
        time: "",
      });
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An error occurred. Please contact us directly at 9899000879.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="booking" className="py-24 bg-emerald text-ivory relative overflow-hidden">
      {/* Background textures */}
      <div className="absolute inset-0 bg-[radial-gradient(#C5A880_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />
      <div className="absolute -right-32 -bottom-32 w-96 h-96 bg-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left Side text (cols: 5) */}
          <div className="lg:col-span-5 text-left">
            <span className="font-sans text-xs tracking-[0.3em] uppercase text-gold font-medium block mb-2">
              Bespoke Reservations
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-medium tracking-tight leading-tight mb-6">
              Begin Your Private Ritual
            </h2>
            <div className="w-12 h-[1px] bg-gold mt-4 mb-6" />
            
            <p className="font-sans text-xs sm:text-sm text-ivory/80 leading-relaxed mb-6">
              Reserve your exclusive time slot at our Rani Bagh / Pitampura boutique. Our slots are structured to provide full dedicated attention without rushed overlaps.
            </p>

            {/* Direct hotline */}
            <div className="p-6 bg-softwhite/5 border border-gold/20 flex flex-col gap-3">
              <p className="font-sans text-xs uppercase tracking-widest text-gold font-semibold">Immediate Assistance Hotline</p>
              <p className="font-serif text-lg">Call or WhatsApp: <a href="tel:9899000879" className="text-gold underline hover:text-white transition-colors">9899000879</a></p>
              <p className="font-sans text-[10px] text-ivory/60 uppercase">Open Daily: 10:00 AM – 8:00 PM</p>
            </div>
          </div>

          {/* Right Side card (cols: 7) */}
          <div className="lg:col-span-7">
            <div className="bg-ivory text-charcoal border border-gold/25 p-8 sm:p-12 shadow-2xl relative">
              
              <AnimatePresence mode="wait">
                {!successResult ? (
                  /* Form Card */
                  <motion.form
                    key="booking-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleBookingSubmit}
                    className="space-y-6"
                  >
                    <div className="text-center sm:text-left mb-6">
                      <h3 className="font-serif text-2xl text-charcoal">Request Appointment</h3>
                      <p className="font-sans text-[10px] uppercase tracking-widest text-gold mt-1">Vintage Luxury Reservation Engine</p>
                    </div>

                    {error && (
                      <div className="bg-red-50 text-red-600 p-3.5 text-xs font-sans flex items-start gap-2 border border-red-100">
                        <AlertCircle size={14} className="mt-0.5 shrink-0" />
                        <span>{error}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Name */}
                      <div className="space-y-2">
                        <label htmlFor="name" className="font-sans text-[10px] uppercase tracking-widest text-gold font-semibold block">
                          Full Name
                        </label>
                        <div className="relative">
                          <User size={14} className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gold/60" />
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="e.g. Priya Sharma"
                            className="w-full bg-softwhite border border-gold/15 py-3 pl-10 pr-4 font-sans text-xs focus:border-gold outline-none text-charcoal"
                            required
                          />
                        </div>
                      </div>

                      {/* Phone */}
                      <div className="space-y-2">
                        <label htmlFor="phone" className="font-sans text-[10px] uppercase tracking-widest text-gold font-semibold block">
                          Phone Number
                        </label>
                        <div className="relative">
                          <Phone size={14} className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gold/60" />
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="e.g. 9899000879"
                            className="w-full bg-softwhite border border-gold/15 py-3 pl-10 pr-4 font-sans text-xs focus:border-gold outline-none text-charcoal"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* Service */}
                    <div className="space-y-2">
                      <label htmlFor="service" className="font-sans text-[10px] uppercase tracking-widest text-gold font-semibold block">
                        Selected Service Menu
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        className="w-full bg-softwhite border border-gold/15 py-3 px-4 font-sans text-xs focus:border-gold outline-none text-charcoal cursor-pointer"
                        required
                      >
                        <option value="" disabled>-- Select a signature menu --</option>
                        {servicesList.map((service, idx) => (
                          <option key={idx} value={service}>
                            {service}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Date */}
                      <div className="space-y-2">
                        <label htmlFor="date" className="font-sans text-[10px] uppercase tracking-widest text-gold font-semibold block">
                          Preferred Date
                        </label>
                        <div className="relative">
                          <Calendar size={14} className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gold/60" />
                          <input
                            type="date"
                            id="date"
                            name="date"
                            value={formData.date}
                            onChange={handleInputChange}
                            className="w-full bg-softwhite border border-gold/15 py-3 pl-10 pr-4 font-sans text-xs focus:border-gold outline-none text-charcoal cursor-pointer"
                            required
                          />
                        </div>
                      </div>

                      {/* Time */}
                      <div className="space-y-2">
                        <label htmlFor="time" className="font-sans text-[10px] uppercase tracking-widest text-gold font-semibold block">
                          Preferred Time
                        </label>
                        <div className="relative">
                          <Clock size={14} className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gold/60" />
                          <input
                            type="time"
                            id="time"
                            name="time"
                            value={formData.time}
                            onChange={handleInputChange}
                            className="w-full bg-softwhite border border-gold/15 py-3 pl-10 pr-4 font-sans text-xs focus:border-gold outline-none text-charcoal cursor-pointer"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      id="submit-booking-btn"
                      type="submit"
                      disabled={loading}
                      className="w-full bg-emerald hover:bg-gold text-ivory hover:text-charcoal py-4 font-sans text-xs uppercase tracking-widest font-semibold transition-all duration-300 flex items-center justify-center gap-2 mt-4"
                    >
                      {loading ? (
                        <>
                          <motion.span
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                            className="inline-block w-4 h-4 border-2 border-ivory border-t-transparent rounded-full"
                          />
                          <span>Reserving Slot...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Booking Request</span>
                          <ChevronRight size={14} />
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  /* Success Screen */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-8 text-center"
                  >
                    <div className="w-16 h-16 bg-emerald/10 text-emerald rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 size={36} className="text-emerald" />
                    </div>

                    <h3 className="font-serif text-3xl text-charcoal mb-2">Reservation Confirmed</h3>
                    <p className="font-sans text-xs text-charcoal/60 uppercase tracking-wider mb-6">
                      Bespoke Experience code: <span className="font-semibold text-emerald font-mono text-sm">{successResult.id}</span>
                    </p>

                    <div className="bg-ivory/50 border border-gold/10 p-6 text-left max-w-md mx-auto space-y-3.5 mb-8 text-xs font-sans">
                      <div className="flex justify-between border-b border-gold/5 pb-2">
                        <span className="text-charcoal/50 uppercase tracking-widest">Client Name</span>
                        <span className="font-semibold text-charcoal">{successResult.name}</span>
                      </div>
                      <div className="flex justify-between border-b border-gold/5 pb-2">
                        <span className="text-charcoal/50 uppercase tracking-widest">Salon Service</span>
                        <span className="font-semibold text-charcoal">{successResult.service}</span>
                      </div>
                      <div className="flex justify-between border-b border-gold/5 pb-2">
                        <span className="text-charcoal/50 uppercase tracking-widest">Date / Time</span>
                        <span className="font-semibold text-charcoal">{successResult.date} at {successResult.time}</span>
                      </div>
                      <div className="flex justify-between pb-0">
                        <span className="text-charcoal/50 uppercase tracking-widest">Venue Location</span>
                        <span className="font-semibold text-emerald">Sant Nagar, Rani Bagh, Pitampura, Delhi</span>
                      </div>
                    </div>

                    <p className="font-sans text-[11px] text-charcoal/60 leading-relaxed max-w-sm mx-auto mb-8">
                      We have synchronized your request with our master stylists. You will receive an immediate confirmation SMS or WhatsApp on <span className="font-medium text-charcoal">{successResult.phone}</span> shortly.
                    </p>

                    <button
                      onClick={() => setSuccessResult(null)}
                      className="border border-gold/30 hover:border-gold text-charcoal font-sans text-xs uppercase tracking-widest px-6 py-3 font-semibold transition-colors"
                    >
                      Book Another slot
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

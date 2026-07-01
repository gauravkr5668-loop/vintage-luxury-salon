import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Upload, Sparkles, Check, ToggleLeft, ToggleRight, Trash2, Camera, Compass, RefreshCw, Star, Info } from "lucide-react";
import { AIConsultationResponse } from "../types";

interface AIConsultationProps {
  onAddServiceToBooking: (service: string) => void;
  onScrollToBooking: () => void;
}

const AVAILABLE_CONSULT_SERVICES = [
  "Hair Styling",
  "Hair Colour",
  "Hair Spa",
  "Skin Treatments",
  "Facials",
  "Bridal Makeup",
  "Nail Services",
  "Waxing",
  "Spa & Wellness"
];

export default function AIConsultation({ onAddServiceToBooking, onScrollToBooking }: AIConsultationProps) {
  const [started, setStarted] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [includeTrends, setIncludeTrends] = useState(true);
  
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AIConsultationResponse | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const loadingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const loadingMessages = [
    "Establishing secure link with Vintage Luxury Stylist Hub...",
    "Analyzing your unique facial contour and symmetry...",
    "Determining optimal hair texture volume and framing recommendations...",
    "Querying Google Search for Rani Bagh & Pitampura trend indexes...",
    "Synthesizing customized organic pigments and skin remedies...",
    "Assembling your bespoke, quiet luxury styling portfolio..."
  ];

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file (PNG, JPG, JPEG).");
      return;
    }
    setError(null);
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const toggleService = (service: string) => {
    if (selectedServices.includes(service)) {
      setSelectedServices(selectedServices.filter((s) => s !== service));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const startLoadingAnimation = () => {
    setLoadingStep(0);
    loadingIntervalRef.current = setInterval(() => {
      setLoadingStep((prev) => {
        if (prev < loadingMessages.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 3000);
  };

  const stopLoadingAnimation = () => {
    if (loadingIntervalRef.current) {
      clearInterval(loadingIntervalRef.current);
      loadingIntervalRef.current = null;
    }
  };

  const handleConsultSubmit = async () => {
    if (!imagePreview) {
      setError("Please upload a portrait photograph first.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);
    startLoadingAnimation();

    try {
      // Get pure base64
      const base64Data = imagePreview.split(",")[1];
      const mimeType = imageFile?.type || "image/jpeg";

      const response = await fetch("/api/consult", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image: base64Data,
          mimeType: mimeType,
          services: selectedServices,
          includeTrends: includeTrends,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.details || "Failed to analyze image");
      }

      setResult(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error occurred during consultation.");
    } finally {
      stopLoadingAnimation();
      setLoading(false);
    }
  };

  const handleBookService = (serviceName: string) => {
    onAddServiceToBooking(serviceName);
    onScrollToBooking();
  };

  return (
    <section id="ai-consultation" className="py-24 bg-ivory border-t border-b border-gold/10 relative overflow-hidden">
      {/* Background Decorative Rings */}
      <div className="absolute right-0 top-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-20 bottom-10 w-96 h-96 bg-emerald/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="font-sans text-xs tracking-[0.3em] uppercase text-emerald font-medium inline-flex items-center gap-1.5">
            <Sparkles size={12} className="text-gold" />
            AI Haute Couture Consultation
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-medium tracking-tight mt-2 text-charcoal">
            The Digital Mirror
          </h2>
          <div className="w-12 h-[1px] bg-gold mx-auto mt-4" />
          <p className="font-sans text-sm text-charcoal/60 mt-4 max-w-xl mx-auto leading-relaxed">
            Upload your portrait and unlock an extraordinary bespoke analysis powered by Google Gemini. Discover exact styling silhouettes and luxury skincare regimens custom-fit to your natural form.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!started ? (
            <motion.div
              key="welcome-screen"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.6 }}
              className="bg-softwhite border border-gold/15 shadow-xl max-w-2xl mx-auto p-8 sm:p-14 text-center relative overflow-hidden"
            >
              {/* Corner delicate geometric accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-l border-t border-gold/30 pointer-events-none" />
              <div className="absolute top-0 right-0 w-8 h-8 border-r border-t border-gold/30 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-l border-b border-gold/30 pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-r border-b border-gold/30 pointer-events-none" />

              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-8">
                <Sparkles size={28} className="text-gold" />
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-medium text-charcoal mb-4">
                Welcome to Vintage Luxury Salon
              </h3>
              
              <p className="font-sans text-sm sm:text-base text-charcoal/70 leading-relaxed max-w-md mx-auto mb-10 whitespace-pre-line">
                I’m your personal AI Beauty Advisor. Tell me your beauty goals, and I’ll recommend the treatments, styles, and services best suited to you. It only takes about a minute.
              </p>

              <button
                id="start-consultation-btn"
                onClick={() => setStarted(true)}
                className="inline-flex items-center gap-2.5 bg-emerald text-ivory hover:bg-gold hover:text-charcoal px-8 py-4 font-sans text-xs uppercase tracking-widest font-semibold transition-all duration-300 shadow-md cursor-pointer"
              >
                <span>Start Consultation</span>
                <Sparkles size={14} />
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="consultation-interface"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.6 }}
              className="bg-softwhite border border-gold/15 shadow-xl max-w-5xl mx-auto overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12">
                
                {/* Left side: Interactive Setup Panel (cols: 5) */}
                <div className="lg:col-span-5 p-6 sm:p-10 border-b lg:border-b-0 lg:border-r border-gold/10">
                  <h3 className="font-serif text-2xl text-charcoal mb-6">Configure Profile</h3>

                  {/* Step 1: Upload portrait */}
                  <div className="mb-8">
                    <span className="font-sans text-[11px] uppercase tracking-widest text-gold font-medium mb-3 block">
                      1. Upload Portrait Photo
                    </span>
                    
                    <div
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                      onClick={() => !imagePreview && fileInputRef.current?.click()}
                      className={`border-2 border-dashed rounded-none transition-all duration-300 flex flex-col items-center justify-center p-6 text-center cursor-pointer min-h-[220px] relative ${
                        imagePreview
                          ? "border-gold bg-softwhite"
                          : "border-gold/20 bg-ivory/50 hover:border-gold hover:bg-gold/5"
                      }`}
                    >
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        className="hidden"
                      />

                      {imagePreview ? (
                        <div className="w-full h-full flex flex-col items-center justify-center">
                          <div className="w-28 h-28 rounded-full overflow-hidden border border-gold/30 mb-4 shadow-md relative">
                            <img
                              src={imagePreview}
                              alt="Uploaded Portrait Preview"
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-charcoal/30 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                              <Camera size={18} className="text-white" />
                            </div>
                          </div>
                          <p className="font-sans text-xs font-medium text-charcoal">Portrait Selected</p>
                          <p className="font-sans text-[10px] text-charcoal/50 mt-1 uppercase">Ready for Analysis</p>
                          
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeImage();
                            }}
                            className="mt-4 flex items-center space-x-1 text-xs text-red-500 hover:text-red-700 transition-colors"
                          >
                            <Trash2 size={12} />
                            <span>Remove Photo</span>
                          </button>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <div className="p-4 bg-gold/10 rounded-full mb-4">
                            <Upload size={24} className="text-gold" />
                          </div>
                          <p className="font-sans text-xs font-medium text-charcoal mb-1">
                            Drag & Drop or Click to Upload
                          </p>
                          <p className="font-sans text-[10px] text-charcoal/50 max-w-[200px] leading-relaxed">
                            PNG, JPG or JPEG. For best accuracy, upload a front-facing portrait with clear lighting.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Step 2: Select Services */}
                  <div className="mb-8">
                    <span className="font-sans text-[11px] uppercase tracking-widest text-gold font-medium mb-3 block">
                      2. Focus Areas (Optional)
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {AVAILABLE_CONSULT_SERVICES.map((service) => {
                        const isSelected = selectedServices.includes(service);
                        return (
                          <button
                            key={service}
                            onClick={() => toggleService(service)}
                            className={`font-sans text-[10px] uppercase tracking-wider px-3 py-1.5 transition-all duration-200 border ${
                              isSelected
                                ? "bg-emerald text-ivory border-emerald"
                                : "bg-transparent text-charcoal/60 border-gold/15 hover:border-gold/50"
                            }`}
                          >
                            <span className="flex items-center gap-1">
                              {isSelected && <Check size={10} />}
                              {service}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step 3: Delhi Trend Matcher Toggle */}
                  <div className="mb-8 border-t border-b border-gold/10 py-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-sans text-xs font-semibold text-charcoal flex items-center gap-1.5">
                          <Compass size={14} className="text-gold" />
                          Delhi Trend Matcher
                        </span>
                        <p className="font-sans text-[10px] text-charcoal/50 leading-relaxed mt-0.5">
                          Grounds analysis with real-time popular styles in Pitampura/Rani Bagh via Google Search.
                        </p>
                      </div>
                      <button
                        onClick={() => setIncludeTrends(!includeTrends)}
                        className="text-emerald hover:text-gold transition-colors focus:outline-none"
                        aria-label="Toggle Trends"
                      >
                        {includeTrends ? (
                          <ToggleRight size={32} className="text-emerald fill-emerald/10" />
                        ) : (
                          <ToggleLeft size={32} className="text-charcoal/40" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Error messages */}
                  {error && (
                    <div className="mb-6 bg-red-50 text-red-600 p-3.5 text-xs font-sans flex items-start gap-2 border border-red-100">
                      <Info size={14} className="mt-0.5 shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  {/* Action Submit */}
                  <button
                    id="submit-consult-btn"
                    onClick={handleConsultSubmit}
                    disabled={loading || !imagePreview}
                    className={`w-full py-4 font-sans text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
                      loading || !imagePreview
                        ? "bg-charcoal/20 text-charcoal/40 cursor-not-allowed border border-transparent"
                        : "bg-emerald text-ivory hover:bg-gold hover:text-charcoal shadow-md"
                    }`}
                  >
                    {loading ? (
                      <>
                        <RefreshCw size={14} className="animate-spin" />
                        <span>Analyzing...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles size={14} />
                        <span>Generate Custom Portfolio</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Right side: Results & Loading states (cols: 7) */}
                <div className="lg:col-span-7 bg-ivory/30 p-6 sm:p-10 flex flex-col justify-center min-h-[400px]">
                  
                  <AnimatePresence mode="wait">
                    {loading ? (
                      /* Loading State */
                      <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center py-12 text-center"
                      >
                        {/* Glowing spinner ring */}
                        <div className="relative w-20 h-20 mb-8 flex items-center justify-center">
                          <div className="absolute inset-0 border-4 border-gold/10 rounded-full" />
                          <div className="absolute inset-0 border-4 border-t-emerald border-l-emerald rounded-full animate-spin" />
                          <Sparkles size={24} className="text-gold animate-pulse" />
                        </div>

                        <h4 className="font-serif text-xl font-medium text-charcoal mb-3">AI Consultation in Progress</h4>
                        
                        {/* Staggered text change */}
                        <div className="min-h-[40px] px-6">
                          <motion.p
                            key={loadingStep}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="font-sans text-xs text-charcoal/60 leading-relaxed max-w-sm mx-auto italic"
                          >
                            "{loadingMessages[loadingStep]}"
                          </motion.p>
                        </div>
                      </motion.div>
                    ) : result ? (
                      /* Result State */
                      <motion.div
                        key="results"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="space-y-8"
                      >
                        <div className="border-b border-gold/15 pb-4 flex items-center justify-between">
                          <div>
                            <h4 className="font-serif text-2xl text-charcoal">Your Custom Portfolio</h4>
                            <p className="font-sans text-[10px] uppercase tracking-widest text-gold mt-1">Generated by Vintage Luxury AI</p>
                          </div>
                          <button
                            onClick={() => {
                              setResult(null);
                              removeImage();
                            }}
                            className="font-sans text-[10px] uppercase tracking-widest text-charcoal/60 hover:text-gold transition-colors flex items-center gap-1 border border-gold/20 px-3 py-1.5"
                          >
                            <RefreshCw size={10} />
                            New Scan
                          </button>
                        </div>

                        {/* Face shape Analysis */}
                        <div className="space-y-2 bg-white p-5 border-l-2 border-gold shadow-sm">
                          <span className="font-sans text-[10px] uppercase tracking-widest text-gold font-semibold block">
                            Facial Contour Analysis
                          </span>
                          <p className="font-sans text-xs text-charcoal/80 leading-relaxed">
                            {result.faceShapeAnalysis}
                          </p>
                        </div>

                        {/* Styling recommendations */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2 bg-white p-5 border-t border-gold/20 shadow-sm">
                            <span className="font-sans text-[10px] uppercase tracking-widest text-gold font-semibold block">
                              Couture Haircut & Styling
                            </span>
                            <p className="font-sans text-xs text-charcoal/80 leading-relaxed">
                              {result.haircutRecommendation}
                            </p>
                          </div>

                          <div className="space-y-2 bg-white p-5 border-t border-gold/20 shadow-sm">
                            <span className="font-sans text-[10px] uppercase tracking-widest text-gold font-semibold block">
                              Bespoke Hair Colour Formulation
                            </span>
                            <p className="font-sans text-xs text-charcoal/80 leading-relaxed">
                              {result.hairColorRecommendation}
                            </p>
                          </div>
                        </div>

                        {/* Skin & Facial Treatments */}
                        <div className="space-y-2 bg-white p-5 border-t border-gold/20 shadow-sm">
                          <span className="font-sans text-[10px] uppercase tracking-widest text-gold font-semibold block">
                            Bespoke Skin & Facial Skincare Plan
                          </span>
                          <p className="font-sans text-xs text-charcoal/80 leading-relaxed">
                            {result.skinRecommendation}
                          </p>
                        </div>

                        {/* Trend insights */}
                        <div className="space-y-2 bg-emerald/5 p-5 border border-emerald/10 shadow-sm rounded-none">
                          <span className="font-sans text-[10px] uppercase tracking-widest text-emerald font-semibold flex items-center gap-1 block">
                            <Star size={10} className="fill-gold text-gold" />
                            Pitampura & Rani Bagh Trend Matcher
                          </span>
                          <p className="font-sans text-xs text-charcoal/85 leading-relaxed italic">
                            "{result.trendingMatch}"
                          </p>
                        </div>

                        {/* Suggested Services Menu Booking */}
                        <div className="bg-white p-5 border border-gold/15">
                          <span className="font-sans text-[10px] uppercase tracking-widest text-gold font-semibold block mb-3">
                            Curated Luxury Menu Recommendations
                          </span>
                          <div className="flex flex-col gap-2.5">
                            {result.servicesOfChoice.map((service, index) => (
                              <div key={index} className="flex items-center justify-between border-b border-gold/5 pb-2.5 last:border-0 last:pb-0">
                                <span className="font-serif text-sm text-charcoal font-medium">{service}</span>
                                <button
                                  onClick={() => handleBookService(service)}
                                  className="font-sans text-[9px] uppercase tracking-widest bg-charcoal text-ivory px-3 py-1.5 font-medium hover:bg-gold hover:text-charcoal transition-colors"
                                >
                                  Select & Book
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>

                      </motion.div>
                    ) : (
                      /* Initial Empty State */
                      <motion.div
                        key="empty"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-12 max-w-sm mx-auto"
                      >
                        <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                          <Camera size={24} className="text-gold" />
                        </div>
                        <h4 className="font-serif text-xl text-charcoal mb-2">Bespoke Portfolio Preview</h4>
                        <p className="font-sans text-xs text-charcoal/50 leading-relaxed">
                          Upload your picture and configure your profile options on the left to begin your editorial beauty consultation.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}

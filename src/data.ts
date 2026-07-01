import { ServiceItem, TestimonialItem } from "./types";
import { salonImages } from "./images";

export const SERVICES_CATALOG: ServiceItem[] = [
  {
    id: "hair-styling",
    name: "Couture Hair Styling",
    category: "Hair",
    price: "From ₹1,200",
    description: "Bespoke cuts, blowouts, and advanced texturing tailored to elevate your facial symmetry.",
    image: salonImages.hairStyling,
  },
  {
    id: "hair-color",
    name: "Editorial Hair Colour",
    category: "Hair",
    price: "From ₹4,500",
    description: "Balayage, ombre, global highlights, and ammonia-free options using premium French pigments.",
    image: salonImages.hairColor,
  },
  {
    id: "hair-spa",
    name: "Therapeutic Hair Spa",
    category: "Hair",
    price: "From ₹2,500",
    description: "Deep conditioning steam treatments, scalp detoxification, and structural keratin replenishment.",
    image: salonImages.hairSpa,
  },
  {
    id: "skin-treatments",
    name: "Advanced Skin Treatments",
    category: "Skin",
    price: "From ₹3,500",
    description: "High-performance hydration therapies, botanical peels, and deep-pore structural restoration.",
    image: salonImages.skinTreatments,
  },
  {
    id: "facials",
    name: "Signature Glow Facials",
    category: "Skin",
    price: "From ₹2,800",
    description: "Multi-layered cleansing and vitamin-infused rituals to reveal authentic luminosity.",
    image: salonImages.facials,
  },
  {
    id: "bridal-makeup",
    name: "HD Bridal Makeup",
    category: "Bridal",
    price: "From ₹18,000",
    description: "High-definition, long-lasting bespoke bridal transformations and luxury draping.",
    image: salonImages.bridalMakeup,
  },
  {
    id: "nail-services",
    name: "Luxury Nail Services",
    category: "Nails",
    price: "From ₹1,500",
    description: "Delicate extensions, gel overlays, therapeutic manicures, and custom minimal nail art.",
    image: salonImages.nailServices,
  },
  {
    id: "waxing",
    name: "Bespoke Waxing Treatments",
    category: "Waxing",
    price: "From ₹800",
    description: "Gentle organic liposoluble waxes designed to respect skin barriers and minimize discomfort.",
    image: salonImages.waxing,
  },
  {
    id: "spa-wellness",
    name: "Spa & Wellness Rituals",
    category: "Wellness",
    price: "From ₹3,000",
    description: "Relaxing foot pedicures, Swedish massage therapies, and calming body treatments.",
    image: salonImages.spaWellness,
  },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "t1",
    name: "Priya Sharma",
    rating: 5,
    text: "Absolutely loved the experience at Vintage Luxury Salon! The HD bridal makeup was flawless and looked natural under the lights. The team made me feel like royalty on my big day.",
    tag: "HD Bridal Makeup",
  },
  {
    id: "t2",
    name: "Rohan Malhotra",
    rating: 5,
    text: "The premium ambience here is outstanding. The styling stations are spacious, and the staff's attention to detail is remarkable. Got an excellent haircut and hair spa. Highly recommend Rani Bagh's absolute best!",
    tag: "Haircut & Ambience",
  },
  {
    id: "t3",
    name: "Ananya Mehra",
    rating: 5,
    text: "The global hair color balayage they recommended perfectly matches my style. The staff are so experienced and professional. Excellent hygiene protocols and incredibly relaxing pedicure.",
    tag: "Hair Colour & Care",
  },
  {
    id: "t4",
    name: "Meenakshi Gupta",
    rating: 5,
    text: "I went in for their signature glow facial and skin treatment. The results are amazing—my skin feels deeply hydrated and luminous. A true quiet luxury experience in Pitampura.",
    tag: "Skin Treatments",
  },
  {
    id: "t5",
    name: "Vikram Chawla",
    rating: 5,
    text: "Amazing staff, premium products, and impeccable hygiene. It is extremely hard to find this level of boutique elegance in North Delhi. They treat styling like an editorial art.",
    tag: "Premium Quality",
  },
];

export const WHY_CHOOSE_US = [
  {
    title: "Luxury Interiors",
    description: "Immerse yourself in rich emerald green velvet, gold-gilded accents, and cascading crystal chandeliers designed for your absolute serenity.",
  },
  {
    title: "Experienced Professionals",
    description: "Our certified master stylists and medical-grade skin therapists undergo rigorous continuous training in advanced global techniques.",
  },
  {
    title: "Premium Products",
    description: "We use only ultra-luxury, original global brands (such as L'Oréal Professionnel, Kérastase, and Dermalogica) to ensure flawless results.",
  },
  {
    title: "Hygiene First",
    description: "Surgical-grade sanitation of styling tools, single-use disposable kits, and hospital-grade air purification in all treatment rooms.",
  },
  {
    title: "Personalized Beauty Care",
    description: "No templates here. Every treatment begins with a meticulous diagnosis of your hair structure, skin biology, and lifestyle.",
  },
  {
    title: "Bridal Specialists",
    description: "Renowned across Pitampura and Rani Bagh for exquisite, photo-ready HD and airbrush bridal makeup that preserves your individual grace.",
  },
  {
    title: "Affordable Luxury",
    description: "Bringing the highest standards of luxury salon services to Delhi without the pretentious markup, ensuring world-class care is accessible.",
  },
];

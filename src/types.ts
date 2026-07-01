export interface AIConsultationRequest {
  image: string; // Base64
  mimeType: string;
  services: string[];
  includeTrends: boolean;
}

export interface AIConsultationResponse {
  faceShapeAnalysis: string;
  haircutRecommendation: string;
  hairColorRecommendation: string;
  skinRecommendation: string;
  servicesOfChoice: string[];
  trendingMatch: string;
}

export interface BookingForm {
  name: string;
  phone: string;
  service: string;
  date: string;
  time: string;
}

export interface BookingResult {
  id: string;
  name: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  status: string;
}

export interface ServiceItem {
  id: string;
  name: string;
  category: string;
  price: string;
  description: string;
  image: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  rating: number;
  text: string;
  tag: string;
}

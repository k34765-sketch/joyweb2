
export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  description: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  id: string;
  name: string;
  company: string;
  content: string;
  rating: number;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface SiteSettings {
  siteName: string;
  primaryColor: string;
  accentColor: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  instagramUrl: string;
  kakaoUrl: string;
  blogUrl: string;
  metaTitle: string;
  metaDescription: string;
}

export interface SiteData {
  settings: SiteSettings;
  portfolio: PortfolioItem[];
  services: ServiceItem[];
  testimonials: Testimonial[];
  faq: FAQItem[];
}

export type ActiveTab = 'home' | 'services' | 'portfolio' | 'process' | 'contact' | 'admin' | 'terms' | 'privacy';

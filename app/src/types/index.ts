export interface Program {
  id: string;
  title: string;
  description: string;
  targetAudience: string;
  level: string;
  duration: string;
  schedule: string;
  method: string;
  capacity: string;
  priceInfo: string;
  facilities: string[];
  status: "open" | "closed" | "coming_soon";
  category: string;
  image?: string;
  isNewClass?: boolean;
}

export interface Facility {
  id: string;
  name: string;
  description: string;
  icon: string;
  isActive: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface RegistrationData {
  id?: string;
  registrationNumber: string;
  fullName: string;
  whatsapp: string;
  email?: string;
  placeOfBirth: string;
  birthDate: string;
  gender: "male" | "female";
  domicile: string;
  education: string;
  occupation?: string;
  selectedProgram: string;
  japaneseLevel: string;
  preferredSchedule: string;
  purpose: string;
  referralSource: string;
  message?: string;
  guardianName?: string;
  guardianPhone?: string;
  consentPrivacy: boolean;
  consentWhatsapp: boolean;
  intakeName?: string;
  intakeStartDate?: string;
  status: "new" | "contacted" | "consultation" | "waiting_docs" | "registered" | "not_proceeding" | "completed";
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  authorName: string;
  authorPhoto?: string;
  rating: number;
  text: string;
  date: string;
  reply?: string;
}

export interface GoogleReviewsData {
  averageRating: number;
  totalReviews: number;
  reviews: Review[];
}

export interface LegalInfo {
  status: string;
  licenseNumber?: string;
  nib?: string;
  issuingAgency?: string;
  issueDate?: string;
  verificationUrl?: string;
  documents?: string[];
}

export interface SiteSettings {
  siteName: string;
  siteUrl: string;
  whatsappNumber: string;
  classOpeningDate: string;
  registrationStatus: "soon" | "open" | "limited" | "closed" | "ongoing" | "completed";
  announcementText: string;
  googleMapsLat: number;
  googleMapsLng: number;
  googleMapsUrl: string;
  address: string;
  operatingHours: string;
  metaTitle: string;
  metaDescription: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "super_admin" | "admin_registration" | "editor" | "viewer";
  avatar?: string;
}

export interface NavLink {
  label: string;
  href: string;
  isActive?: boolean;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  image: string;
  level: "N5" | "N4";
  publishedDate: string;
  readTime: string;
  category: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  caption: string;
  date: string;
  category: string;
}

export interface LearningStep {
  id: string;
  number: number;
  title: string;
  description: string;
}

export interface Advantage {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface MethodTab {
  id: string;
  label: string;
  labelJp: string;
  items: string[];
}

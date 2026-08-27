/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ProjectType = "Playero" | "Campestre" | "Urbano" | "Industrial" | string;

export type ProjectStatus = "Pre-venta" | "Inmediata" | "Vendido" | "En Obras";

export interface Project {
  id: string;
  title: string;
  location: string;
  region: string;
  province?: string;
  district?: string;
  projectType: ProjectType;
  surface?: number;
  priceSoles: number;
  priceDollars?: number;
  status: ProjectStatus;
  imageUrl: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  mapsUrl?: string;
  description: string;
  features: string[];
  featured?: boolean;
  totalLots: number;
  availableLots: number;
  images?: { url: string; title: string }[];
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  buttonText: string;
  imageUrl: string;
  frameImageUrl?: string | null;
  overlayImageUrl?: string | null;
  overlayBadgeText?: string | null;
  badgeText?: string;
  isActive: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  stars: number;
  quote: string;
  projectPurchased: string;
  avatarUrl: string;
}

export interface Inquiry {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  projectInterest: string;
  message: string;
  status: "Pendiente" | "Contactado" | "Archivado";
  createdAt: string;
  notes?: string;
}

export interface DashboardStats {
  totalProjects: number;
  totalLeads: number;
  pendingLeads: number;
  totalLotsSold: number;
  monthlyLeadsTrend: { month: string; leads: number }[];
  projectTypeDistribution: { name: string; value: number }[];
}

export type ChannelType = "address" | "phone" | "email" | "whatsapp";

export interface SiteSettings {
  logoUrl: string | null;
  faviconUrl: string | null;
  siteName: string | null;
  siteTagline: string | null;
  browserTitle: string;
  footerTagline: string | null;
  footerDescription: string;
  footerLegalText?: string | null;
  footerRuc?: string | null;
}

export interface GuaranteeSection {
  eyebrow: string;
  heading: string;
  description: string;
  backgroundImageUrl: string;
}

export interface GuaranteeItem {
  id: string;
  icon: string;
  title: string;
  description: string;
  sortOrder: number;
  isActive: boolean;
}

export interface GuaranteesData {
  section: GuaranteeSection;
  items: GuaranteeItem[];
}

export interface ContactFormBullet {
  text: string;
}

export interface ContactFormConfig {
  slug: string;
  formTitle: string;
  formSubtitle: string;
  submitLabel: string;
  successTitle: string;
  successMessage: string;
  defaultMessage: string;
  defaultProjectInterest: string;
  sectionEyebrow?: string | null;
  sectionHeading?: string | null;
  sectionDescription?: string | null;
  bullets?: ContactFormBullet[] | null;
  pageEyebrow?: string | null;
  pageHeading?: string | null;
  pageDescription?: string | null;
}

export interface CorporateChannel {
  id: string;
  channelType: ChannelType;
  label: string;
  value: string;
  extraInfo?: string | null;
  sortOrder: number;
  isActive: boolean;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  sortOrder: number;
  isActive: boolean;
}

export interface AboutPageContent {
  heroEyebrow: string;
  heroHeading: string;
  heroDescription: string;
  heroBackgroundImageUrl: string;
  missionHeading: string;
  missionDescription: string;
  visionHeading: string;
  visionDescription: string;
  valuesEyebrow: string;
  valuesHeading: string;
  valuesDescription: string;
  advisorsEyebrow: string;
  advisorsHeading: string;
  advisorsDescription: string;
}

export interface AboutValue {
  id: string;
  icon: string;
  title: string;
  description: string;
  sortOrder: number;
  isActive: boolean;
}

export interface ExpertAdvisor {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  sortOrder: number;
  isActive: boolean;
}

export interface AboutData {
  page: AboutPageContent;
  values: AboutValue[];
  advisors: ExpertAdvisor[];
}

export interface HomeAlertModal {
  isEnabled: boolean;
  title: string;
  description: string;
  imageUrl: string | null;
  videoUrl: string | null;
  buttonText: string | null;
  buttonLink: string | null;
  updatedAt: string;
}

export interface HomePageContent {
  stat1Value: string;
  stat1Label: string;
  stat2Value: string;
  stat2Label: string;
  stat3Value: string;
  stat3Label: string;
  stat4Value: string;
  stat4Label: string;
  catalogEyebrow: string;
  catalogHeading: string;
  catalogDescription: string;
  catalogCtaText: string;
  testimonialsEyebrow: string;
  testimonialsHeading: string;
  testimonialsDescription: string;
  contactBackgroundImageUrl: string | null;
  heroSecondaryCtaText: string;
  heroSecondaryCtaLink: string;
}

export interface CatalogPageContent {
  eyebrow: string;
  heading: string;
  description: string;
}

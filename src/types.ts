export interface Listing {
  id: string;
  name: string;
  price: string;
  tag: "Commercial Plot" | "Residential Plot" | "Investment Plot";
  image: string;
  location: string;
  specs: string[]; // e.g., ["3 Beds", "3 Baths", "3,200 sqft"]
}

export interface Testimonial {
  id: string;
  quote: string;
  text: string;
  rating: number;
  author: string;
  role: string;
}

export interface StatItem {
  id: string;
  number: string;
  label: string;
  caption: string;
}

export interface TrustItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface GalleryItem {
  id: string;
  image: string;
  sizeClass: string; // Tailwind grids span classes
  alt: string;
}

export interface BrandPartner {
  id: string;
  name: string;
  logoUrl?: string; // If using SVGs, we can draw them directly
}

// ── Auth & Dashboard Types ─────────────────────────────────────────────────────

export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string; // plain text for demo; never do this in production
  phone: string;
  role: "client" | "admin";
  avatarInitials: string;
  joinedAt: string;
}

export type DocStatus = "done" | "in-progress" | "pending";

export interface DocumentStep {
  id: string;
  title: string;
  subtitle: string;
  date: string;       // ISO date or empty string
  status: DocStatus;
  badge?: string;     // e.g., "DTCP Filed"
}

export interface SiteVisit {
  id: string;
  property: string;
  location: string;
  date: string;
  time: string;
  consultant: string;
  status: "upcoming" | "completed" | "cancelled";
}

export interface PaymentMilestone {
  id: string;
  label: string;
  amount: string;
  date: string;
  mode: string;
  status: "paid" | "due" | "overdue";
}

export interface OwnedProperty {
  id: string;
  name: string;
  plotNumber: string;
  area: string;
  location: string;
  tag: "Residential Plot" | "Commercial Plot" | "Investment Plot";
  dtcpRef: string;
  tneraRef: string;
  purchaseDate: string;
  purchasePrice: string;
  image: string;
}

export interface DashboardData {
  user: User;
  documents: DocumentStep[];
  visits: SiteVisit[];
  payments: PaymentMilestone[];
  properties: OwnedProperty[];
}

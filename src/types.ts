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

import { Listing, Testimonial, StatItem, TrustItem, GalleryItem } from "./types";
import heroVilla from "./assets/images/hero_villa_1783614707797.jpg";
import interiorArch from "./assets/images/interior_arch_1783614721746.jpg";
import lifestyleTeal from "./assets/images/lifestyle_teal_1783614736112.jpg";
import listingBedroom from "./assets/images/listing_bedroom_1783614753869.png";
import rnpw from "./assets/images/RNPWjdmGT8U-SD.jpg";
import screenshot from "./assets/images/Screenshot 2026-07-09 223718.png";

export const HERO_IMAGE = heroVilla;
export const INTERIOR_ARCH_IMAGE = interiorArch;
export const LIFESTYLE_TEAL_IMAGE = lifestyleTeal;
export const LISTING_BEDROOM_IMAGE = listingBedroom;
export const RNPW_IMAGE = rnpw;
export const SCREENSHOT_IMAGE = screenshot;

export const STATS_DATA: StatItem[] = [
  {
    id: "stat-1",
    number: "1,200+",
    label: "Plots Delivered",
    caption: "Premium planned layouts designed for families & businesses"
  },
  {
    id: "stat-2",
    number: "12 Yrs",
    label: "Experience",
    caption: "Over a decade of landmark layout developments"
  },
  {
    id: "stat-3",
    number: "100%",
    label: "Approved Layouts",
    caption: "Every single layout is DTCP & TNRERA sanctioned"
  },
  {
    id: "stat-4",
    number: "0",
    label: "Disputes",
    caption: "Upholding absolute legal clarity & clear titles"
  }
];

export const GALLERY_DATA: GalleryItem[] = [
  {
    id: "gal-1",
    image: HERO_IMAGE,
    sizeClass: "col-span-12 md:col-span-8 row-span-2 aspect-[16/10] md:aspect-auto",
    alt: "Gated entry of an elite residential plot layout under golden hour sun"
  },
  {
    id: "gal-2",
    image: INTERIOR_ARCH_IMAGE,
    sizeClass: "col-span-6 md:col-span-4 aspect-square",
    alt: "Sleek commercial plot layouts featuring well-planned concrete roads & tree lines"
  },
  {
    id: "gal-3",
    image: LIFESTYLE_TEAL_IMAGE,
    sizeClass: "col-span-6 md:col-span-4 aspect-square",
    alt: "Planned avenue tree plantations and beautifully paved footpaths in premium layout"
  },
  {
    id: "gal-4",
    image: LISTING_BEDROOM_IMAGE,
    sizeClass: "col-span-12 md:col-span-4 row-span-2 aspect-[4/3] md:aspect-auto",
    alt: "Panoramic elevated view of commercial layout plot plots ready for construction"
  },
  {
    id: "gal-5",
    image: RNPW_IMAGE,
    sizeClass: "col-span-6 md:col-span-4 aspect-square",
    alt: "Lush landscape development & compound wall architecture of residential layout"
  },
  {
    id: "gal-6",
    image: SCREENSHOT_IMAGE,
    sizeClass: "col-span-6 md:col-span-4 aspect-square",
    alt: "Sublime evening light over gated premium investment plot layouts with blacktop roads"
  }
];

export const TRUST_DATA: TrustItem[] = [
  {
    id: "trust-1",
    title: "DTCP SANCITONED",
    description: "Strict compliance with State Town and Country Planning authorities ensuring robust layout standards, broad roads, and parks.",
    iconName: "ShieldCheck"
  },
  {
    id: "trust-2",
    title: "TNRERA REGISTERED",
    description: "Every layout plot we market is fully registered with Tamil Nadu Real Estate Regulatory Authority for 100% security.",
    iconName: "Award"
  },
  {
    id: "trust-3",
    title: "100% Clear Titles",
    description: "Independently audited legal document trails, verified encumbrance records, and immediate registry-ready documentation.",
    iconName: "Clock"
  },
  {
    id: "trust-4",
    title: "Premium Infrastructure",
    description: "All layouts are delivered with wide tar roads, solar street lighting, underground water lines, and rich botanical plantations.",
    iconName: "MapPin"
  }
];

export const LISTINGS_DATA: Listing[] = [
  {
    id: "list-1",
    name: "The Emerald Crest Plots",
    price: "₹ 45 Lakhs onwards",
    tag: "Residential Plot",
    image: LISTING_BEDROOM_IMAGE,
    location: "Saravanampatti, Coimbatore",
    specs: ["1,200 - 2,400 sq.ft.", "DTCP Approved", "TNRERA Registered"]
  },
  {
    id: "list-2",
    name: "The Sovereign Commercial Hub",
    price: "₹ 1.8 Crore onwards",
    tag: "Commercial Plot",
    image: HERO_IMAGE,
    location: "ECR Premium Corridor, Chennai",
    specs: ["4,000 - 8,000 sq.ft.", "60 ft. Concrete Roads", "Commercial Zoned"]
  },
  {
    id: "list-3",
    name: "Golden Oak Investment Layout",
    price: "₹ 24 Lakhs onwards",
    tag: "Investment Plot",
    image: RNPW_IMAGE,
    location: "Avinashi Road Extension, Coimbatore",
    specs: ["1,500 - 3,000 sq.ft.", "High ROI Zone", "Fully Gated & Secured"]
  }
];

export const PARTNER_LOGOS = [
  { id: "partner-1", name: "DTCP Approved" },
  { id: "partner-2", name: "TNRERA Sanctioned" },
  { id: "partner-3", name: "HDFC Approved" },
  { id: "partner-4", name: "LIC HFL Approved" },
  { id: "partner-5", name: "SBI Approved" },
  { id: "partner-6", name: "Kuberaa Trust Guild" }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: "test-1",
    quote: "A clean title and seamless register.",
    text: "Buying an investment plot through Kuberaa Properties was absolute bliss. They handled the DTCP approval verification and TNRERA document presentation with absolute precision. No headaches.",
    rating: 5,
    author: "R. Karthikeyan",
    role: "Director, Karthik Tech Solutions"
  },
  {
    id: "test-2",
    quote: "Best commercial layout in Coimbatore.",
    text: "We acquired two commercial plots at their Saravanampatti layout. The wide 60ft tar roads, continuous drainage, and immediate access to the highway make this the perfect asset for our new tech center.",
    rating: 5,
    author: "Subramanian Swamy",
    role: "Founder, Swamy Builders"
  },
  {
    id: "test-3",
    quote: "Secured our family's future retirement.",
    text: "We purchased a residential layout plot in their peaceful Ooty-adjacent foothills layout. It is gated, beautiful, with pure water connections already in place. Exactly what they promised.",
    rating: 5,
    author: "Dr. Ananya Ramakrishnan",
    role: "Senior Paediatrician, KG Hospital"
  }
];

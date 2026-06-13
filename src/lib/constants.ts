export const SITE = {
  name: "91-11 Productions",
  founder: "Sanat Arora",
  tagline: "Built to Make Brands Unforgettable.",
  description:
    "91-11 is a creative production house crafting cinematic visuals and emotionally driven stories designed to make brands unforgettable.",
  email: "sanat@91-11.com",
  phone: "+91 8076545494",
  instagram: "@9111productions",
  instagramUrl: "https://instagram.com/9111productions",
} as const;

/** Drop files into public/founder/ — IMG_7993.jpg and timeline-1.mp4 */
export const FOUNDER = {
  name: "Sanat Arora",
  image: "/founder/IMG_7993.jpg",
  heroImage: "/founder/img_1111.JPG",
  video: "/founder/Timeline 1 (2).mp4",
  roles: ["Visual Storyteller.", "Filmmaker.", "Founder of 91-11 Productions."],
  openingQuote: "Cinema begins long before the camera starts rolling.",
  story: [
    "Sanat has been deeply connected to the art of shooting and visual storytelling since childhood.",
    "Fascinated by emotion, composition, movement, and cinema from an early age, he built 91-11 as a space where brands become stories — not content.",
    "Every project is approached as cinema: intentional frames, emotional depth, and visuals designed to endure.",
  ],
  philosophy: [
    "Filmmaking is not content creation.",
    "It is the architecture of emotion.",
    "Every frame must earn its place.",
    "Every story must feel unforgettable.",
  ],
  timeline: [
    { year: "Early Years", title: "Passion for Storytelling", desc: "Drawn to cameras, composition, and the language of cinema from childhood." },
    { year: "Exploration", title: "Visual Discovery", desc: "Years of shooting, experimenting, and refining a cinematic eye." },
    { year: "2023", title: "91-11 Founded", desc: "A production house built to craft immersive, intentional visual stories." },
    { year: "Today", title: "The Vision", desc: "Creating work that makes brands unforgettable — frame by frame." },
  ],
} as const;

export const NAV_LINKS = [
  { label: "About", href: "/#about" },
  { label: "Work", href: "/#work" },
  { label: "Services", href: "/#services" },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "Founder", href: "/founder" },
  { label: "Contact", href: "/#contact" },
] as const;

export const PROJECT_CATEGORIES = [
  "All",
  "Brand",
  "Creator",
  "Fashion Brand",
  "Actress",
] as const;

export const CATEGORY_MAP: Record<string, string[]> = {
  All: [],
  "Brand": ["Brand"],
  "Creator": ["Creator"],
  "Fashion Brand": ["Fashion Brand"],
  "Actress": ["Actress"],
};

export const SERVICES = [
  {
    title: "Brand Films",
    tagline: "Stories that outlive campaigns.",
    description: "Narrative-driven films that communicate your brand’s purpose, culture, and identity. Designed to build emotional connection and long-term brand recall through cinematic storytelling."
  },
  {
    title: "Commercial Advertisements",
    tagline: "Attention crafted with intention.",
    description: "High-impact advertising campaigns crafted for digital, television, and social platforms. From concept development to final delivery, we create commercials that capture attention and drive action."
  },
  {
    title: "Events",
    tagline: "Capturing moments that define occasions.",
    description: "Comprehensive event coverage that transforms moments into compelling visual stories. From corporate gatherings and launches to large-scale experiences, we document every detail with precision."
  },
  {
    title: "Creative Direction",
    tagline: "Where vision becomes visual language.",
    description: "Strategic creative leadership that shapes the visual language of your project. We oversee concepts, mood boards, storytelling, talent, styling, and execution to ensure every frame aligns with your vision."
  },
  {
    title: "Post Production",
    tagline: "Refinement in every frame.",
    description: "End-to-end editing services including color grading, sound design, motion graphics, visual effects, and final mastering. We refine raw footage into polished cinematic content."
  },
  {
    title: "BTS Production",
    tagline: "Revealing the craft behind the spectacle.",
    description: "Behind-the-scenes content that showcases the process, people, and effort behind a production. Perfect for building audience engagement, authenticity, and brand transparency."
  },
  {
    title: "Product Visuals",
    tagline: "Elevating products through precision and artistry.",
    description: "Premium product-focused photography and films designed to highlight craftsmanship, functionality, and detail. Created to elevate perception and increase purchase intent."
  },
  {
    title: "E-Commerce Visuals",
    tagline: "Built to convert. Designed to impress.",
    description: "Clean, conversion-focused content optimized for online stores, marketplaces, and digital catalogs. Consistent visuals that enhance customer confidence and improve product presentation."
  },
  {
    title: "Personal Branding",
    tagline: "Presence with purpose. Influence with impact.",
    description: "Content designed to establish authority, credibility, and a distinctive personal identity. Ideal for founders, creators, executives, artists, and public figures looking to grow their presence."
  },
  {
    title: "Documentary Storytelling",
    tagline: "Truth, framed with intention.",
    description: "Authentic, human-centered storytelling that uncovers real experiences, journeys, and perspectives. We create documentaries that inform, inspire, and leave a lasting impact."
  },
  {
    title: "Short Form Content",
    tagline: "Engineered for attention. Designed for retention.",
    description: "Fast-paced, platform-native content built for Instagram, YouTube Shorts, TikTok, and emerging digital platforms. Optimized for engagement, retention, and audience growth."
  }
] as const;

export const PARTNERS = [
  "Brands",
  "Artists",
  "Creators",
  "Fashion Houses",
  "Startups",
  "Agencies",
  "Musicians",
  "Luxury Labels",
  "Filmmakers",
  "Visionaries",
] as const;

export const TESTIMONIALS = [
  {
    quote:
      "Working with Sannat was a breeze. Him and his team have a great work ethic and are highly organised. He's great at reading the room, adapting to the person he's speaking with, and making the whole process feel effortless. The quality of work was great, but what stood out to me even more was the seamless execution from start to finish. I highly recommend 91-11 productions!",
    author: "Devika Khandelwal",
    brand: "",
  },
  {
    quote:
      "You guys are such a hardworking team. Really loved seeing how smoothly everything was managed. Thank you so much! 🫶",
    author: "Nivedita",
    brand: "Savana",
  },
] as const;

export const PROJECT_TYPES = [
  "Brand Film",
  "Commercial",
  "Event Coverage",
  "Creative Direction",
  "Product Film",
  "Documentary",
  "Artist Shoot",
  "Personal Branding",
  "Reels / Short Form",
  "Other",
] as const;

export const BUDGET_RANGES = [
  "Under ₹2L",
  "₹2L – ₹5L",
  "₹5L – ₹10L",
  "₹10L – ₹25L",
  "₹25L+",
  "To be discussed",
] as const;

export const HERO_VIDEO =
  "https://res.cloudinary.com/demo/video/upload/f_auto,q_auto:good/v1694456750/samples/sea-turtle.mp4";

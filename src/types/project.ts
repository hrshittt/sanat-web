export type ProjectCategory =
  | "Brand Films"
  | "Commercial Advertisements"
  | "Events"
  | "Creative Direction"
  | "BTS Production"
  | "Product Films"
  | "E-commerce Visuals"
  | "Artist Shoots"
  | "Personal Branding"
  | "Documentary Storytelling"
  | "Reels & Short Form Content";

export interface ProjectProduction {
  director: string;
  cinematography: string;
  edit: string;
  duration: string;
  format: string;
}

export interface Project {
  slug: string;
  title: string;
  category: ProjectCategory | string;
  tagline: string;
  year: string;
  client: string;
  heroVideo: string;
  poster: string;
  overview: string;
  gallery: string[];
  bts: string[];
  production: ProjectProduction;
  featured?: boolean;
  order?: number;
}

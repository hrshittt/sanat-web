import { createClient } from "@sanity/client";
import { FEATURED_PROJECTS } from "./projects";
import type { Project } from "@/types/project";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-06-01";

export const sanityConfigured = Boolean(projectId);

export const sanityClient = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
    })
  : null;

const PROJECTS_QUERY = `*[_type == "project"] | order(order asc) {
  "slug": slug.current,
  title,
  category,
  tagline,
  year,
  client,
  heroVideo,
  "poster": poster.asset->url,
  overview,
  "gallery": gallery[].asset->url,
  "bts": bts[].asset->url,
  production,
  featured,
  order
}`;

export async function fetchProjects(): Promise<Project[]> {
  if (!sanityClient) return FEATURED_PROJECTS;

  try {
    const data = await sanityClient.fetch<Project[]>(PROJECTS_QUERY);
    return data?.length ? data : FEATURED_PROJECTS;
  } catch {
    return FEATURED_PROJECTS;
  }
}

export async function fetchProjectBySlug(slug: string): Promise<Project | null> {
  if (!sanityClient) {
    return FEATURED_PROJECTS.find((p) => p.slug === slug) ?? null;
  }

  const query = `*[_type == "project" && slug.current == $slug][0] {
    "slug": slug.current,
    title,
    category,
    tagline,
    year,
    client,
    heroVideo,
    "poster": poster.asset->url,
    overview,
    "gallery": gallery[].asset->url,
    "bts": bts[].asset->url,
    production,
    featured,
    order
  }`;

  try {
    const project = await sanityClient.fetch<Project | null>(query, { slug });
    if (project) return project;
    return FEATURED_PROJECTS.find((p) => p.slug === slug) ?? null;
  } catch {
    return FEATURED_PROJECTS.find((p) => p.slug === slug) ?? null;
  }
}

import { defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          "Brand Films",
          "Commercial Advertisements",
          "Events",
          "Creative Direction",
          "BTS Production",
          "Product Films",
          "E-commerce Visuals",
          "Artist Shoots",
          "Personal Branding",
          "Documentary Storytelling",
          "Reels & Short Form Content",
        ],
      },
    }),
    defineField({ name: "tagline", title: "Tagline", type: "string" }),
    defineField({ name: "year", title: "Year", type: "string" }),
    defineField({ name: "client", title: "Client", type: "string" }),
    defineField({
      name: "heroVideo",
      title: "Hero Video URL",
      type: "url",
      description: "Cloudinary or direct video URL",
    }),
    defineField({
      name: "poster",
      title: "Poster Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "overview",
      title: "Overview",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "bts",
      title: "Behind the Scenes",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "production",
      title: "Production Details",
      type: "object",
      fields: [
        { name: "director", type: "string", title: "Director" },
        { name: "cinematography", type: "string", title: "Cinematography" },
        { name: "edit", type: "string", title: "Edit" },
        { name: "duration", type: "string", title: "Duration" },
        { name: "format", type: "string", title: "Format" },
      ],
    }),
    defineField({ name: "featured", title: "Featured", type: "boolean" }),
    defineField({ name: "order", title: "Sort Order", type: "number" }),
  ],
  orderings: [
    {
      title: "Sort Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", media: "poster", subtitle: "category" },
  },
});

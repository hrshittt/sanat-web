import { Hero } from "@/components/sections/Hero";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { Services } from "@/components/sections/Services";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";
import { SectionDivider } from "@/components/ui/RedStreak";
import { fetchProjects } from "@/lib/sanity";

export default async function HomePage() {
  const projects = await fetchProjects();

  return (
    <>
      <Hero />
      <SectionDivider />
      <FeaturedWork projects={projects} />
      <SectionDivider />
      <Services />
      <SectionDivider />
      <Testimonials />
      <SectionDivider />
      <Contact />
    </>
  );
}

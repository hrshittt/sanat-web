import { fetchProjects } from "@/lib/sanity";
import { WorkArchive } from "./WorkArchive";

export const metadata = {
  title: "Work Archive | 91-11 Productions",
  description: "A curated selection of cinematic storytelling, brand campaigns, and creative collaborations.",
};

export default async function WorkPage() {
  const projects = await fetchProjects();
  return <WorkArchive projects={projects} />;
}

import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { fetchProjectBySlug, fetchProjects } from "@/lib/sanity";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = await fetchProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await fetchProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} | 91-11 Productions`,
    description: project.overview,
    openGraph: {
      title: `${project.title} | 91-11 Productions`,
      description: project.overview,
      images: project.poster ? [{ url: project.poster }] : [],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await fetchProjectBySlug(slug);

  if (!project) notFound();

  return (
    <article className="bg-cinema-black min-h-screen relative overflow-hidden text-pure-white">
      {/* Subtle Cinematic Grain/Effects */}
      <div className="fixed inset-0 film-grain pointer-events-none z-50" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,rgba(214,31,38,0.05),transparent_60%)] pointer-events-none" />

      {/* Navigation */}
      <div className="absolute top-0 left-0 right-0 z-40 section-pad pt-12 pb-8">
        <Link
          href="/#work"
          className="text-label text-silver-dim hover:text-pure-white transition-colors flex items-center gap-4 group w-fit"
        >
          <span className="w-8 h-[1px] bg-cinema-red group-hover:w-12 transition-all duration-300" />
          RETURN TO ARCHIVE
        </Link>
      </div>

      {/* Main Container */}
      <div className="section-pad pt-32 pb-24 md:pt-48 md:pb-32 max-w-[1600px] mx-auto">
        {/* Header / Title Area */}
        <header className="mb-16 md:mb-24">
          <p className="text-cinema-red text-sm font-medium tracking-[0.3em] uppercase mb-6">
            {project.category}
          </p>
          <h1 className="text-display text-[clamp(3rem,8vw,8rem)] text-pure-white leading-[0.9] mb-8 uppercase tracking-tight">
            {project.title}
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 pt-12 border-t border-cinema-charcoal">
            <div className="md:col-span-8">
              {/* Strict reliance on provided overview, no paraphrasing */}
              <p className="text-warm-muted text-lg md:text-2xl font-light leading-relaxed whitespace-pre-wrap">
                {project.overview}
              </p>
            </div>
            <div className="md:col-span-4">
              <dl className="space-y-6">
                <div>
                  <dt className="text-label text-silver-dim mb-1">Client</dt>
                  <dd className="text-lg">{project.client}</dd>
                </div>
                <div>
                  <dt className="text-label text-silver-dim mb-1">Year</dt>
                  <dd className="text-lg">{project.year}</dd>
                </div>
              </dl>
            </div>
          </div>
        </header>

        {/* Hero Media Placeholder */}
        <section className="mb-24">
          <p className="text-label text-silver-dim mb-6">Hero Media</p>
          <div className="w-full aspect-[21/9] md:aspect-[2.35/1] bg-cinema-charcoal relative overflow-hidden shadow-2xl border border-cinema-charcoal/50">
            {project.poster ? (
              <Image 
                src={project.poster} 
                alt={`${project.title} Hero`} 
                fill 
                className="object-cover" 
                sizes="100vw"
                priority
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-label text-silver-dim">Hero Media Placeholder</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-cinema-black/40 to-transparent" />
          </div>
        </section>

        {/* Video Placeholder */}
        <section className="mb-24">
          <p className="text-label text-silver-dim mb-6">Main Feature</p>
          <div className="w-full aspect-video max-w-5xl mx-auto bg-cinema-charcoal relative overflow-hidden shadow-2xl group cursor-pointer border border-cinema-charcoal/50">
            <video
              className="absolute inset-0 h-full w-full object-cover opacity-80"
              muted
              loop
              playsInline
              poster={project.poster}
            >
              <source src={project.heroVideo} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-cinema-black/20 group-hover:bg-cinema-black/10 transition-colors duration-500" />
            
            {/* Play Button Indicator */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 md:w-28 md:h-28 rounded-full border border-pure-white/20 flex items-center justify-center backdrop-blur-md group-hover:scale-110 transition-transform duration-500 bg-cinema-black/40">
                <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-pure-white border-b-[10px] border-b-transparent ml-2" />
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Placeholder */}
        <section className="mb-24">
          <p className="text-label text-silver-dim mb-6">Visual Gallery</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {project.gallery && project.gallery.length > 0 ? (
              project.gallery.map((src, i) => (
                <div key={i} className="relative bg-cinema-charcoal w-full aspect-[4/3] overflow-hidden border border-cinema-charcoal/50">
                  <Image src={src} alt={`${project.title} Gallery ${i + 1}`} fill className="object-cover" />
                </div>
              ))
            ) : (
              <>
                <div className="relative bg-cinema-charcoal w-full aspect-[4/3] border border-cinema-charcoal/50 flex items-center justify-center">
                  <span className="text-label text-silver-dim">Gallery Image 1 Placeholder</span>
                </div>
                <div className="relative bg-cinema-charcoal w-full aspect-[4/3] border border-cinema-charcoal/50 flex items-center justify-center">
                  <span className="text-label text-silver-dim">Gallery Image 2 Placeholder</span>
                </div>
              </>
            )}
          </div>
        </section>

        {/* Behind The Scenes Placeholder */}
        <section>
          <p className="text-label text-silver-dim mb-6">Behind The Scenes</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {project.bts && project.bts.length > 0 ? (
              project.bts.map((src, i) => (
                <div key={i} className="relative bg-cinema-charcoal aspect-[4/5] overflow-hidden border border-cinema-charcoal/50 grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                  <Image src={src} alt={`BTS ${i + 1}`} fill className="object-cover" />
                </div>
              ))
            ) : (
              <>
                {[1, 2, 3].map((_, i) => (
                  <div key={i} className="relative bg-cinema-deep aspect-[4/5] border border-cinema-charcoal/30 flex items-center justify-center">
                    <span className="text-label text-silver-dim">BTS Placeholder {i + 1}</span>
                  </div>
                ))}
              </>
            )}
          </div>
        </section>

      </div>
    </article>
  );
}

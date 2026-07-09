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

      {/* Main Container */}
      <div className="section-pad pt-32 pb-24 md:pt-48 md:pb-32 max-w-[1600px] mx-auto">
        <div className="mb-12 md:mb-16">
          <Link
            href="/work"
            className="text-label text-silver-dim hover:text-pure-white transition-colors flex items-center gap-4 group w-fit"
          >
            <span className="w-8 h-[1px] bg-cinema-red group-hover:w-12 transition-all duration-300" />
            RETURN TO ARCHIVE
          </Link>
        </div>

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

        {/* Hero Media */}
        <section className="mb-24">
          <div className={`w-full bg-cinema-black relative overflow-hidden rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.7)] ring-1 ring-pure-white/10 ${project.containPoster ? 'aspect-[16/9] md:aspect-[16/9]' : 'aspect-[16/9] md:aspect-[2.35/1]'}`}>
            {project.poster ? (
              <Image
                src={project.poster}
                alt={`${project.title} Hero`}
                fill
                className={`${project.containPoster ? 'object-contain scale-125 p-2 md:p-4 bg-white/5' : 'object-cover'}`}
                sizes="(max-width: 1024px) 100vw, 1024px"
                priority
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-label text-silver-dim">Hero Media Placeholder</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-cinema-black/60 via-transparent to-transparent pointer-events-none" />
          </div>
        </section>

        {/* Main Feature */}
        <section className="mb-24">
          <div className="w-full max-w-[400px] md:max-w-[450px] mx-auto aspect-[9/16] bg-cinema-black relative rounded-2xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.9)] ring-1 ring-cinema-red/20 flex items-center justify-center group">
            <video
              className="w-full h-full object-cover bg-black"
              controls
              playsInline
              preload="metadata"
            >
              <source src={project.heroVideo} type="video/mp4" />
            </video>

            {/* Cinematic Red Glow Behind Video */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(214,31,38,0.1),transparent_70%)] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          </div>
        </section>

        {/* Gallery Section */}
        {project.gallery && project.gallery.length > 0 && (
          <section className="mb-24">
            <div className="columns-1 md:columns-2 gap-4 md:gap-8 space-y-4 md:space-y-8">
              {project.gallery.map((imgUrl, index) => (
                <div key={index} className="relative w-full break-inside-avoid rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] ring-1 ring-pure-white/5 bg-cinema-black group">
                  <img
                    src={imgUrl}
                    alt={`${project.title} Gallery ${index + 1}`}
                    loading="lazy"
                    className="w-full h-auto block object-cover group-hover:scale-105 transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

      </div>
    </article>
  );
}

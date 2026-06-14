# 91-11 Productions — Cinematic Portfolio

Premium cinematic portfolio for **91-11 Productions**, founded by **Sanat Arora**.

> Built to Make Brands Unforgettable.

## Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 15, TypeScript, Tailwind CSS v4 |
| Motion | Framer Motion, GSAP ScrollTrigger, Lenis |
| 3D | Three.js (minimal hero ambient particles) |
| Media | Cloudinary-ready URLs |
| CMS | Sanity (optional — falls back to static projects) |
| API | Express.js inquiry server + Next.js API route |
| Deploy | Vercel |

## Quick Start

```bash
# Install frontend dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Express API (optional)

```bash
cd server
npm install
cp ../.env.example .env
npm run dev
```

Set `NEXT_PUBLIC_API_URL=http://localhost:4000` in `.env.local` for the contact form to use Express. Without it, submissions use `/api/inquiry` on Next.js.

### Sanity CMS (optional)

1. Create a project at [sanity.io](https://www.sanity.io)
2. Copy project ID to `.env.local`:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
```

3. Run studio (requires `sanity` dev dependency):

```bash
npx sanity dev --config sanity/sanity.config.ts
```

Without Sanity configured, the site uses curated static project data in `src/lib/projects.ts`.

## Project Structure

```
src/
  app/              # Next.js App Router pages
  components/       # UI, sections, layout, Three.js
  lib/              # Sanity, Cloudinary, constants, projects
sanity/             # Sanity schema & config
server/             # Express inquiry API
```

## Customization

- **Hero / showreel video**: Replace URLs in `Hero.tsx` and `Showreel.tsx` with your Cloudinary public IDs
- **Founder portrait**: Update image in `Founder.tsx`
- **Projects**: Edit `src/lib/projects.ts` or add documents in Sanity
- **Colors & grain**: `src/app/globals.css`

## Deploy to Vercel

1. Push to GitHub
2. Import in Vercel
3. Add environment variables from `.env.example`
4. Deploy the Next.js app (root directory)

Deploy Express separately (Railway, Render, Fly.io) or rely on the built-in Next.js `/api/inquiry` route.

## Performance

- Lazy-loaded images via `next/image`
- Video `preload="metadata"` on heroes
- Package import optimization for motion libraries
- Static generation for project pages



© 91-11 Productions · Sanat Arora

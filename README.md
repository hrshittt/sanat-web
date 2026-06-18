# 🎬 91-11 Productions

> **Built to Make Brands Unforgettable.**

A premium cinematic portfolio experience crafted for **91-11 Productions**, a creative production house founded by **Sanat Arora**.

This project blends immersive storytelling, cinematic motion design, premium visuals, and modern web technologies to showcase brands, creators, campaigns, and visual narratives.

---

## Experience

The website is built around a simple philosophy:

> *Stories are remembered. Content is forgotten.*

Every interaction, transition, animation, and visual element is designed to reflect the world of filmmaking, photography, and cinematic storytelling.

### Highlights

- 🎥 Cinematic Intro Animation
- 🎞️ Story-Driven Portfolio Showcase
- 📸 Dedicated Founder Experience
- 🎯 Camera-Inspired Custom Cursor
- ⚡ Smooth Scroll Navigation
- 🔥 GSAP-Powered Motion Design
- 🌊 Lenis Smooth Scrolling
- 🎨 Red, Black & White Cinematic Identity
- 📱 Fully Responsive Experience
- 🚀 Production-Ready Performance

---

## Tech Stack

| Layer | Technology |
|---------|---------|
| Frontend | Next.js 15, TypeScript, Tailwind CSS v4 |
| Motion | GSAP, ScrollTrigger, Framer Motion |
| Smooth Scroll | Lenis |
| 3D | Three.js |
| Media | Cloudinary |
| CMS | Sanity CMS (Optional) |
| Backend | Express.js + Next.js API Routes |
| Deployment | Vercel |

---

## 📂 Project Structure

```bash
src/
├── app/                # Next.js App Router
├── components/         # UI Components & Sections
├── lib/                # Utilities, Constants & Data
├── hooks/              # Custom Hooks
├── assets/             # Static Assets

sanity/                 # CMS Configuration
server/                 # Express Inquiry Server
```

---

##  Getting Started

### Clone Repository

```bash
git clone <repository-url>
cd 91-11-productions
```

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

Open:

```bash
http://localhost:3000
```

---

##  Contact Form Setup

### Using Next.js API Route

The project includes a built-in inquiry endpoint:

```bash
/api/inquiry
```

No separate backend required.

### Using Express Server (Optional)

```bash
cd server
npm install
cp ../.env.example .env
npm run dev
```

Set:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

inside:

```env
.env.local
```

---

##  Sanity CMS Setup (Optional)

Create a Sanity project and add:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
```

Run the studio:

```bash
npx sanity dev --config sanity/sanity.config.ts
```

If Sanity is not configured, the website automatically uses local project data from:

```bash
src/lib/projects.ts
```

---

##  Customization

### Hero Video

Update media URLs in:

```bash
src/components/Hero.tsx
```

### Showreel

Update media URLs in:

```bash
src/components/Showreel.tsx
```

### Founder Assets

Replace images and videos in:

```bash
src/components/Founder.tsx
```

### Portfolio Projects

Edit:

```bash
src/lib/projects.ts
```

or manage content through Sanity CMS.

### Global Styling

Modify:

```bash
src/app/globals.css
```

to customize:

- Colors
- Typography
- Film Grain
- Cursor Effects
- Light Leaks
- Global Animations

---

##  Featured Collaborations

- OBEETEE
- Ravya Arora
- Adeboy
- Ashna Suri
- Pronto
- Twiddles
- Fratelli Wines
- Novora
- Kubra Sait

---

##  Performance Optimizations

- Next.js Image Optimization
- Lazy Loaded Assets
- Static Project Generation
- Optimized Video Delivery
- GPU Accelerated Animations
- Motion Performance Tuning
- Responsive Media Handling

### Target Metrics

```txt
90+ Lighthouse Score
60 FPS Animations
Fast Initial Load
SEO Optimized
```

---

## 🌐 Deployment

### Deploy on Vercel

```bash
vercel
```

or connect the repository directly through the Vercel Dashboard.

Add all required environment variables before deployment.

### Deploy Express Server Separately

Recommended providers:

- Railway
- Render
- Fly.io

Or use the built-in Next.js API route and skip the Express server entirely.

---

##  License

This project was created for **91-11 Productions**.

All creative assets, branding, imagery, videos, and content belong to their respective owners.

---

<div align="center">

# 91-11 Productions

### Built to Make Brands Unforgettable.

Crafted with passion for filmmaking, storytelling, photography, and cinematic experiences.

</div>
# Chandra Kiran Narala — Portfolio

Built with **Next.js 14 + Tailwind CSS + TypeScript + Lucide React**.  
Designed to closely match the aesthetic of [plawanrath.com](https://www.plawanrath.com/).

## Quick Start

```bash
npm install
npm run dev
```

Open `http://localhost:3000`

## Customizing Content

All your personal data lives in one place:

```
data/portfolio.ts
```

Edit `skills`, `experiences`, and `projects` arrays there.

## Adding Your Photo

1. Place your photo at `public/photo.jpg`
2. In `app/page.tsx`, replace the placeholder `<div>` with:
   ```tsx
   <Image src="/photo.jpg" alt="Chandra Kiran Narala" width={300} height={360} className="object-cover" />
   ```

## Adding Your Links

Update these in the components:
- `components/Navbar.tsx` — GitHub, LinkedIn, Resume `href` values
- `components/Hero.tsx` — the 4 pill button `href` values  
- `components/ContactSection.tsx` — email address + social `href` values

## Production Build

```bash
npm run build
npm run start
```

## Deploy to Vercel (free)

```bash
npm i -g vercel
vercel
```

# Images Reacting to the Magnet Element

A scroll-driven film-strip experience where images expand, tilt, and scatter as they pass a moving “magnet” playhead line.

**Live demo:** [https://images-reacting-to-the-magnet-eleme.vercel.app/](https://images-reacting-to-the-magnet-eleme.vercel.app/)

## Features

- Horizontal film strip pinned to the viewport while you scroll
- Images scale, rotate, and offset based on distance from the magnet line
- Five layout presets with matching backgrounds:
  - **Scatter** (default)
  - **Wave**
  - **Cascade**
  - **Orbit**
  - **Horizon**
- Smooth scrolling with Lenis, synced to GSAP ScrollTrigger

## Tech stack

- [Next.js](https://nextjs.org/) (App Router)
- [React](https://react.dev/)
- [GSAP](https://gsap.com/) + ScrollTrigger + `@gsap/react`
- [Lenis](https://github.com/darkroomengineering/lenis)
- [Tailwind CSS](https://tailwindcss.com/)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command       | Description              |
| ------------- | ------------------------ |
| `npm run dev` | Start development server |
| `npm run build` | Production build       |
| `npm run start` | Run production server  |
| `npm run lint`  | Run ESLint             |

## Project structure

```
app/                  # Next.js app router (layout, page, styles)
assets/asset.ts       # Image list used by the strip
components/
  FilmStrip.tsx       # Main scroll + layout presets UI
  SmoothScroll.tsx    # Lenis + ScrollTrigger sync
public/images/        # 9:16 artistic stills
```

## License

Private project — all rights reserved unless otherwise noted.

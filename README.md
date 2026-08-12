# Portfolio

Portfolio website built to spec from `Portfolio Layout and Planning.pdf`.

## Tech Stack

- **Framework:** Next.js (App Router)
- **Animation:** Motion (`motion/react`)
- **Font:** Stack Sans Text — self-hosted via `@fontsource/stack-sans-text`
- **Styling:** Plain CSS (CSS Modules + shared `globals.css`, no Tailwind/framework)

## Layout

Two-column layout:

- **Sidebar (left, sticky)** — avatar (5px radius, hover micro-interaction),
  name + tagline, bio, and three social pills (LinkedIn, Dribbble, Email).
- **Project Feed (right, scroll)** — repeating project cards with a cover
  image, title, and a three-tag pill row (Company, Type, Status).

## Components

| File | Purpose |
| --- | --- |
| `src/app/page.tsx` | Page shell, composes Sidebar + ProjectFeed |
| `src/components/Sidebar.tsx` | Persistent left identity panel |
| `src/components/Pill.tsx` | Reusable pill button (hover/tap micro-interaction) |
| `src/components/ProjectFeed.tsx` | Scrollable list of project cards (whileInView entrance) |
| `src/lib/data.ts` | Dummy profile + project data (swap for real content) |

## Animations

Subtle, short (150–300ms) micro-interactions via Motion:

- Avatar: `whileHover`/`whileTap` scale.
- Pills: `whileHover`/`whileTap` scale + color/border shift.
- Cards: `whileInView` fade + upward motion.
- Covers: optional `whileHover` slight zoom.

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Notes

All content (`src/lib/data.ts`) is placeholder. Replace the dummy profile and
project entries with real content.
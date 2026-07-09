# Syed Ahsan Ahmed — The Problem Solver

Pixel-driven React implementation of the Figma design (frame `5-56`, 1920 × 11477).
Stack: **React 18 + Vite + Bootstrap 5 (grid/utilities) + GSAP 3 (ScrollTrigger)**.

## Quick start

```bash
npm install
npm run dev      # local dev server
npm run build    # production build → dist/
npm run preview  # preview the build
```

The included `dist/` build uses relative paths (`base: './'`), so you can open
`dist/index.html` straight from disk to preview without installing anything.

## Structure

```
src/
  lib/gsap.js            GSAP + ScrollTrigger registration, global defaults
  styles/global.css      Design tokens (colors, fluid type), shared helpers
  components/
    Navbar        fixed bar, glass state on scroll
    Hero          1920×1193 canvas: portrait, name, 6 floating cards
    Problem       three staggered statements
    WhoIAm        collage canvas, hairlines, count-up stats
    Services      What I Do — 3+2 card grid
    Story         word-by-word scrub color reveal
    Process       How I Work — 2×2 crosshair grid
    Projects      glass cards + cursor-following "View" chip
    TrustedBy     infinite logo marquee
    Contact       Let's Talk — Book A Call panel
```

Every color, font size and spacing token lives in `src/styles/global.css` as a
CSS variable — nudge values there if a side-by-side pass against Figma shows
drift. Font sizes use `clamp(min, px/19.2 vw, px)` so the layout tracks the
1920px design proportionally and never exceeds the Figma size.

## Animation map (all GSAP)

| Where | What |
|---|---|
| Page load | Navbar drops in; hero portrait clip-path reveal; name masked word rise; cards pop in (back.out) then float on infinite sine loops; portrait subtle scroll parallax |
| Problem | Lines slide in from alternating sides |
| Who I Am | Hairlines draw down, photo slots wipe in, stats fade up + count from 0 (10+ / 100+ / 2X) |
| What I Do | Heading masked word reveal, cards rise per row, decor rotates on hover |
| My Story | Words scrub gray → navy with scroll |
| How I Work | Crosshair lines draw, cells rise, badges pop (back.out) |
| Projects | Title + cards rise; cover zoom on hover; white "View" chip follows the cursor |
| Trusted by | Seamless marquee (track ×2, xPercent −50 loop) |
| Let's Talk | Copy + panel rise, side link slides in |

`prefers-reduced-motion` is respected — animations jump to their end state.

## Swap the placeholders

- **Hero portrait** — `src/components/Hero.jsx` (`placehold.co/889x1112`). Use a cut-out PNG/WebP like the design.
- **Hero card icons** — inline SVG stand-ins in `Hero.jsx` (`ICONS`). Replace with Figma exports if you want the exact 3D icons.
- **Who I Am photos** — 4 slots in `WhoIAm.css` (`.i1`–`.i4`); they're empty `#D9D9D9` squares in the Figma file too. Set `background-image` or swap the divs for `<img>`.
- **Service card decorations** — `DECOR` SVGs in `Services.jsx` stand in for the 3D assets (pin, asterisk, arrow, blob, cube).
- **Project covers** — `PROJECTS[].img` in `Projects.jsx`.
- **Client logos** — `LOGOS` in `TrustedBy.jsx` (8 slots, grayscale filter applied in CSS).
- **Book A Call** — `href="#book-a-call"` in `Contact.jsx`; point it at Calendly/Cal.com or a mailto.

## Content notes (kept verbatim from Figma — change if unintended)

- "media **buyinging**" in My Story (likely a typo for *buying*).
- "**Seo**" card title casing (vs. SEO).
- Pmprd and Fdm cards both list **"Brand Identity" twice** in their tags.
- Project names appear as **Nextra / Pmprd / Fdm** exactly as designed.
- Hero/Who I Am/Projects gradient directions were derived from the export's
  180°-rotated layers — if anything looks flipped vs. Figma, invert the
  gradient angle in the relevant component CSS.

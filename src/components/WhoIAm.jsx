import { useLayoutEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../lib/gsap';
import './WhoIAm.css';

/**
 * "WHO I AM" — collage section on #DFEBF3 fading back to cream.
 * Figma builds this as a free canvas: four photo slots, four vertical
 * hairlines of stepped heights, two copy blocks and a diagonal staircase
 * of stats (10+ Years / 100+ Brands / 2X Average Growth).
 * Desktop reproduces the canvas with % coordinates; mobile reflows.
 */

const STATS = [
  { value: 10, suffix: '+', label: 'Years', cls: 'stat-1' },
  { value: 100, suffix: '+', label: 'Brands', cls: 'stat-2' },
  { value: 2, suffix: 'X', label: 'Average Growth', cls: 'stat-3' },
];

export default function WhoIAm() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      /* Hairlines draw downward */
      gsap.from('.who-line', {
        scaleY: 0,
        transformOrigin: 'top center',
        duration: 1.5,
        ease: 'power3.inOut',
        stagger: 0.12,
        scrollTrigger: { trigger: root.current, start: 'top 70%' },
      });

      /* Photo slots wipe in */
      gsap.from('.who-img', {
        clipPath: 'inset(0% 0% 100% 0%)',
        duration: 1.1,
        stagger: 0.12,
        scrollTrigger: { trigger: root.current, start: 'top 68%' },
      });

      /* Copy fades up */
      gsap.from(['.who-eyebrow', '.who-copy'], {
        y: 34,
        autoAlpha: 0,
        duration: 1,
        stagger: 0.15,
        scrollTrigger: { trigger: root.current, start: 'top 62%' },
      });

      /* Stats: fade up + count from 0 */
      gsap.utils.toArray('.who-stat').forEach((stat) => {
        gsap.from(stat, {
          y: 44,
          autoAlpha: 0,
          duration: 0.9,
          scrollTrigger: { trigger: stat, start: 'top 88%' },
        });
        const numEl = stat.querySelector('.stat-num');
        const end = parseFloat(numEl.dataset.value);
        const suffix = numEl.dataset.suffix;
        const counter = { n: 0 };
        ScrollTrigger.create({
          trigger: stat,
          start: 'top 85%',
          once: true,
          onEnter: () =>
            gsap.to(counter, {
              n: end,
              duration: 1.8,
              ease: 'power3.out',
              onUpdate: () => (numEl.textContent = Math.round(counter.n) + suffix),
            }),
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="who">
      <div className="who-canvas">
        {/* Vertical hairlines (Figma: 2px #7D858D, stepped depths) */}
        <span className="who-line l1" aria-hidden="true" />
        <span className="who-line l2" aria-hidden="true" />
        <span className="who-line l3" aria-hidden="true" />
        <span className="who-line l4" aria-hidden="true" />

        {/* Photo slots — Figma ships them as empty #D9D9D9 squares (296×296,
            radius 4). Drop portraits/behind-the-scenes shots in via CSS
            background-image or an <img>. */}
        <div className="who-media">
          <div className="who-img i1" />
          <div className="who-img i2" />
          <div className="who-img i3" />
          <div className="who-img i4" />
        </div>

        {/* Copy */}
        <span className="eyebrow eyebrow--dark who-eyebrow">Who I Am</span>
        <p className="who-copy copy-1">
          For 10+ years I&apos;ve watched founders pour money into marketing that goes nowhere. Not
          because they didn&apos;t try, but because no one set the direction first.
        </p>
        <p className="who-copy copy-2">
          I fix that. Not by doing every task myself, but by making sure every euro, every hour, and
          every piece of content is aimed at real growth.
        </p>

        {/* Staircase stats */}
        <div className="who-stats">
          {STATS.map((s) => (
            <div key={s.label} className={`who-stat ${s.cls}`}>
              <span className="stat-num" data-value={s.value} data-suffix={s.suffix}>
                {s.value}
                {s.suffix}
              </span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

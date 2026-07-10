import { useLayoutEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';
import './Process.css';

/**
 * "HOW I WORK" — 2×2 grid split by a thin crosshair (the vertical line
 * extends above the grid in Figma, so the wrapper carries top padding).
 * Bottom-row cells reveal mirrored cream→sky gradients on hover, sliding
 * in from the vertical crosshair (Alignment from the right, Execution
 * from the left) so they meet in the middle. Each cell has a navy circle
 * badge icon, top-right, exported straight from Figma.
 */

const ICONS = {
  monitor: 'https://res.cloudinary.com/djyb4mzzk/image/upload/v1783605081/Group_3_kyvzn0.png',
  phone: 'https://res.cloudinary.com/djyb4mzzk/image/upload/v1783605081/Group_1_uaqpih.png',
  pen: 'https://res.cloudinary.com/djyb4mzzk/image/upload/v1783605081/Group_2_pd008t.png',
  cube: 'https://res.cloudinary.com/djyb4mzzk/image/upload/v1783605081/Group_4_lj8q56.png',
};

const CELLS = [
  { title: 'Audit', desc: "What's working, what's quietly burning runway.", icon: 'monitor', cls: 'cell-a' },
  { title: 'Strategy', desc: 'Where your budget should actually go.', icon: 'phone', cls: 'cell-b' },
  { title: 'Alignment', desc: 'Team, channels, message, all pointed the same way.', icon: 'pen', cls: 'cell-c' },
  { title: 'Execution', desc: 'With my team or yours, done right the first time.', icon: 'cube', cls: 'cell-d' },
];

export default function Process() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.process .eyebrow', {
        autoAlpha: 0, y: 20, duration: 0.8,
        scrollTrigger: { trigger: root.current, start: 'top 80%' },
      });
      gsap.from('.process-line-v', {
        scaleY: 0, transformOrigin: 'top center', duration: 1.4, ease: 'power3.inOut',
        scrollTrigger: { trigger: '.process-grid', start: 'top 78%' },
      });
      gsap.from('.process-line-h', {
        scaleX: 0, transformOrigin: 'left center', duration: 1.4, ease: 'power3.inOut',
        scrollTrigger: { trigger: '.process-grid', start: 'top 70%' },
      });
      gsap.from('.process-cell', {
        y: 54, autoAlpha: 0, duration: 1, stagger: 0.12,
        scrollTrigger: { trigger: '.process-grid', start: 'top 78%' },
      });
      gsap.from('.process-badge', {
        scale: 0, ease: 'back.out(1.7)', duration: 0.7, stagger: 0.12,
        scrollTrigger: { trigger: '.process-grid', start: 'top 72%' },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="process">
      <span className="eyebrow">How It Works</span>

      <div className="process-wrap">
        <div className="process-grid container-fluid g-0">
          <span className="process-line-v" aria-hidden="true" />
          <span className="process-line-h" aria-hidden="true" />
          <div className="row g-0">
            {CELLS.map((c) => (
              <div key={c.title} className="col-12 col-lg-6">
                <article className={`process-cell ${c.cls}`}>
                  <img className="process-badge" src={ICONS[c.icon]} alt="" loading="lazy" aria-hidden="true" />
                  <h3 className="process-title">{c.title}</h3>
                  <p className="process-desc">{c.desc}</p>
                </article>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

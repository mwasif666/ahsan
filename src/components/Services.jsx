import { useLayoutEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';
import RevealText from './RevealText';
import './Services.css';

/**
 * "WHAT I DO" — big centered statement, then a 3+2 card grid.
 * Row 1: Strategy / Seo / Presence — Row 2: Positioning / Content.
 * Card colors and copy are verbatim from Figma. Each card carries a 3D
 * pixel-art icon (transparent PNGs exported from Figma, on Cloudinary).
 */

const ICONS = {
  bulb:      'https://res.cloudinary.com/djyb4mzzk/image/upload/v1783602230/image_64_ltzpqa.png',
  megaphone: 'https://res.cloudinary.com/djyb4mzzk/image/upload/v1783602229/image_62_bmf1u1.png',
  pencil:    'https://res.cloudinary.com/djyb4mzzk/image/upload/v1783602230/image_61_rebhf5.png',
  smiley:    'https://res.cloudinary.com/djyb4mzzk/image/upload/v1783602230/image_60_krscel.png',
  folder:    'https://res.cloudinary.com/djyb4mzzk/image/upload/v1783602230/image_65_eigvd4.png',
};

const ROW1 = [
  { title: 'Strategy', desc: 'Spend on what works, not what’s trendy.', bg: 'var(--card)', grow: 1, icon: 'bulb' },
  { title: 'Seo', desc: 'Get found by people already looking for you.', bg: 'var(--yellow)', grow: 1, icon: 'megaphone' },
  { title: 'Presence', desc: 'Sharp and consistent, without a big-brand budget.', bg: 'var(--blue-100)', grow: 0.937, icon: 'pencil' },
];
const ROW2 = [
  { title: 'Positioning', desc: 'What makes you different, said so people remember.', bg: 'var(--blue-100)', grow: 1.46, icon: 'smiley' },
  { title: 'Content', desc: 'Relevance that moves people to act.', bg: 'var(--card)', grow: 1, icon: 'folder' },
];

function Card({ c }) {
  return (
    <div className="service-col" style={{ flexGrow: c.grow }}>
      <article className="service-card" style={{ background: c.bg }}>
        <h3 className="service-title">{c.title}</h3>
        <p className="service-desc">{c.desc}</p>
        <img
          className="service-icon"
          src={ICONS[c.icon]}
          alt=""
          loading="lazy"
          aria-hidden="true"
        />
      </article>
    </div>
  );
}

export default function Services() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.services .eyebrow', {
        autoAlpha: 0, y: 20, duration: 0.8,
        scrollTrigger: { trigger: root.current, start: 'top 80%' },
      });
      gsap.from('.services-heading .rt-word', {
        yPercent: 112, duration: 1, stagger: 0.035, ease: 'power4.out',
        scrollTrigger: { trigger: '.services-heading', start: 'top 82%' },
      });
      gsap.utils.toArray('.services-row').forEach((row) => {
        gsap.from(row.querySelectorAll('.service-card'), {
          y: 36, autoAlpha: 0, duration: 1, stagger: 0.12,
          scrollTrigger: { trigger: row, start: 'top 85%' },
        });
      });
      gsap.from('.services-tail', {
        autoAlpha: 0, y: 24, duration: 0.9,
        scrollTrigger: { trigger: '.services-tail', start: 'top 90%' },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="services">
      <span className="eyebrow">What I Do</span>
      <h2 className="services-heading">
        <RevealText text="I help you decide where your budget goes, and make sure it works. The right moves, in the right order." />
      </h2>

      <div className="services-grid">
        <div className="services-row">
          {ROW1.map((c) => <Card key={c.title} c={c} />)}
        </div>
        <div className="services-row">
          {ROW2.map((c) => <Card key={c.title} c={c} />)}
        </div>
      </div>

      <p className="services-tail">Have a team? I aim them right. Don’t? I bring one.</p>
    </section>
  );
}

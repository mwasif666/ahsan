import { useLayoutEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';
import './Hero.css';

/* ------------------------------------------------------------------
   Floating icon cards (Figma: 211×211, radius 14) — positions
   converted from the 1920×1193 hero frame to percentages.
   Each PNG is the full card exported from Figma (212×212, rounded
   background baked in), hosted on Cloudinary.
------------------------------------------------------------------- */
const ICONS = {
  pointer: 'https://res.cloudinary.com/djyb4mzzk/image/upload/v1783598723/Group_276_juu2yx.png',
  ruler:   'https://res.cloudinary.com/djyb4mzzk/image/upload/v1783598615/Group_275_zcrye4.png',
  rocket:  'https://res.cloudinary.com/djyb4mzzk/image/upload/v1783598774/Group_279_syqhvc.png',
  phone:   'https://res.cloudinary.com/djyb4mzzk/image/upload/v1783598722/Group_280_g2zu2q.png',
  eyes:    'https://res.cloudinary.com/djyb4mzzk/image/upload/v1783598722/Group_277_shoeuu.png',
  arrow:   'https://res.cloudinary.com/djyb4mzzk/image/upload/v1783598757/Group_278_wsq7nb.png',
};

const CARDS = [
  { id: 'c1', src: ICONS.pointer, style: { left: '26.2%', top: '12.3%' } },
  { id: 'c2', src: ICONS.ruler,   style: { left: '64.8%', top: '33.2%' } },
  { id: 'c3', src: ICONS.rocket,  style: { left: '30.0%', top: '50.0%' } },
  { id: 'c4', src: ICONS.phone,   style: { left: '8.2%',  top: '35.5%' } },
  { id: 'c5', src: ICONS.eyes,    style: { left: '82.1%', top: '16.4%' } },
  { id: 'c6', src: ICONS.arrow,   style: { left: '82.0%', top: '51.5%' } },
];

export default function Hero() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      /* --- Entrance timeline --- */
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('.hero-portrait', { clipPath: 'inset(100% 0% 0% 0%)', scale: 1.08, duration: 1.3 }, 0.15)
        .from('.hero-name .rt-word', { yPercent: 112, duration: 1.05, stagger: 0.09 }, 0.45)
        .from('.hero-sub', { y: 26, autoAlpha: 0, duration: 0.8 }, 1.0)
        .from(
          '.float-card',
          { scale: 0.4, autoAlpha: 0, duration: 0.9, ease: 'back.out(1.7)', stagger: 0.08 },
          0.6
        );

      /* --- Ambient float: cards gently drift forever --- */
      gsap.utils.toArray('.float-card').forEach((el, i) => {
        gsap.to(el, {
          y: i % 2 === 0 ? -14 : 16,
          duration: 2.6 + (i % 3) * 0.55,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut',
          delay: 1.5,
        });
      });

      /* --- Subtle parallax on the portrait while scrolling out --- */
      gsap.to('.hero-portrait', {
        yPercent: 8,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="hero" id="top">
      <div className="hero-canvas">
        {/* Portrait — replace src with the cut-out photo exported from Figma
            (public/images/portrait.png), Figma frame: 889×1112 */}
        <img
          className="hero-portrait"
          src="https://res.cloudinary.com/djyb4mzzk/image/upload/v1783598414/image_85_rj8jfg.png"
          alt="Syed Ahsan Ahmed"
        />

        {/* Floating icon cards */}
        {CARDS.map((c) => (
          <div
            key={c.id}
            className={`float-card ${c.id}`}
            style={c.style}
            aria-hidden="true"
          >
            <img src={c.src} alt="" loading="lazy" />
          </div>
        ))}

        {/* Giant name — masked word reveal */}
        <h1 className="hero-name">
          {"Syed Ahsan Ahmed".split(" ").map((w, i) => (
            <span className="rt-line" key={i}>
              <span className="rt-word">
                {w}
                {"\u00A0"}
              </span>
            </span>
          ))}
        </h1>

        {/* Bottom fade into the cream page background */}
        <div className="hero-fade" aria-hidden="true" />
      </div>

      <p className="hero-sub">
        I help startups grow without burning the little budget they have.
      </p>
    </section>
  );
}

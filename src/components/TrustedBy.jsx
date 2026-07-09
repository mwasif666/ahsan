import { useLayoutEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';
import './TrustedBy.css';

/**
 * "Trusted by 80+ ambitious brands and growing teams" + infinite logo
 * marquee. The track is rendered twice and slid -50% on loop for a
 * seamless scroll. Logos are grayscale placeholders — swap the srcs.
 */

const LOGOS = [
  { w: 166, h: 62 }, { w: 169, h: 64 }, { w: 129, h: 66 }, { w: 150, h: 60 },
  { w: 172, h: 58 }, { w: 140, h: 64 }, { w: 158, h: 62 }, { w: 148, h: 60 },
].map((d, i) => ({
  ...d,
  src: `https://placehold.co/${d.w}x${d.h}/f4f2eb/9aa8b5?text=Logo+${i + 1}`,
}));

export default function TrustedBy() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.trusted-copy', {
        autoAlpha: 0, y: 24, duration: 0.9,
        scrollTrigger: { trigger: root.current, start: 'top 85%' },
      });
      gsap.to('.trusted-track', {
        xPercent: -50,
        ease: 'none',
        duration: 22,
        repeat: -1,
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const strip = LOGOS.map((l, i) => (
    <img key={i} src={l.src} width={l.w} height={l.h} alt={`Client logo ${i + 1}`} loading="lazy" />
  ));

  return (
    <section ref={root} className="trusted">
      <p className="trusted-copy">Trusted by 80+ ambitious brands and growing teams</p>
      <div className="trusted-marquee" aria-hidden="true">
        <div className="trusted-track">
          <div className="trusted-strip">{strip}</div>
          <div className="trusted-strip">{strip}</div>
        </div>
      </div>
    </section>
  );
}

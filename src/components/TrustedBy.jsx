import { useLayoutEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';
import './TrustedBy.css';

/**
 * "Trusted by 80+ ambitious brands and growing teams" + infinite logo
 * marquee. The track is rendered twice and slid -50% on loop for a
 * seamless scroll.
 */

const LOGOS = [
  'https://res.cloudinary.com/djyb4mzzk/image/upload/v1782759384/Group_146_nj5koq.png',
  'https://res.cloudinary.com/djyb4mzzk/image/upload/v1782759383/Group_152_nn8rbc.png',
  'https://res.cloudinary.com/djyb4mzzk/image/upload/v1782759383/Group_151_azjnxi.png',
  'https://res.cloudinary.com/djyb4mzzk/image/upload/v1782759383/Group_150_zzcbga.png',
  'https://res.cloudinary.com/djyb4mzzk/image/upload/v1782759383/Group_149_xah8vm.png',
  'https://res.cloudinary.com/djyb4mzzk/image/upload/v1782759382/Group_144_dppc0k.png',
  'https://res.cloudinary.com/djyb4mzzk/image/upload/v1782759382/Group_145_zhkx8j.png',
  'https://res.cloudinary.com/djyb4mzzk/image/upload/v1782759382/Group_143_rfcc7b.png',
  'https://res.cloudinary.com/djyb4mzzk/image/upload/v1782759382/Group_148_wgdovx.png',
  'https://res.cloudinary.com/djyb4mzzk/image/upload/v1782759382/Group_141_jnjzx7.png',
  'https://res.cloudinary.com/djyb4mzzk/image/upload/v1782759381/Group_140_gcbfql.png',
  'https://res.cloudinary.com/djyb4mzzk/image/upload/v1782759381/Group_147_ck4yyh.png',
  'https://res.cloudinary.com/djyb4mzzk/image/upload/v1782759381/Group_142_iudr7m.png',
  'https://res.cloudinary.com/djyb4mzzk/image/upload/v1782759381/Group_139_n0xnqa.png',
];

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

  const strip = LOGOS.map((src, i) => (
    <img key={i} className="trusted-logo" src={src} alt={`Client logo ${i + 1}`} loading="lazy" />
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

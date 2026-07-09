import { useLayoutEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';
import './Contact.css';

/**
 * "LET'S TALK" — full-width #DFEBF3 block. Two-line intro, a giant cream
 * final CTA panel.
 */

export default function Contact() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(['.contact .eyebrow', '.contact-heading', '.contact-copy'], {
        autoAlpha: 0, y: 26, duration: 0.9, stagger: 0.12,
        scrollTrigger: { trigger: root.current, start: 'top 75%' },
      });
      gsap.from('.contact-cta', {
        y: 80, autoAlpha: 0, duration: 1.1,
        scrollTrigger: { trigger: '.contact-cta', start: 'top 90%' },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="lets-talk" className="contact">
      <span className="eyebrow eyebrow--dark">Let&apos;s Talk</span>
      <h2 className="contact-heading">Let&apos;s work together</h2>
      <p className="contact-copy">
        Sound like your kind of studio? Tell us about your project and let&apos;s work together
        <br />
        to make it memorable.
      </p>

      <div className="contact-cta-wrap">
        <a className="contact-cta" href="#book-a-call">
          Get in touch
        </a>
      </div>
    </section>
  );
}

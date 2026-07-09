import { useLayoutEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';
import './Contact.css';

/**
 * "LET'S TALK" — full-width #DFEBF3 block. Two-line intro, a giant cream
 * "Book A Call" panel (hook up your Calendly/Cal.com link on the href),
 * and the estrela.studio link sitting to the panel's right (drops below
 * it on narrower screens).
 */

export default function Contact() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(['.contact .eyebrow', '.contact-copy'], {
        autoAlpha: 0, y: 26, duration: 0.9, stagger: 0.12,
        scrollTrigger: { trigger: root.current, start: 'top 75%' },
      });
      gsap.from('.contact-cta', {
        y: 80, autoAlpha: 0, duration: 1.1,
        scrollTrigger: { trigger: '.contact-cta', start: 'top 90%' },
      });
      gsap.from('.contact-link', {
        autoAlpha: 0, x: -20, duration: 0.8, delay: 0.2,
        scrollTrigger: { trigger: '.contact-cta', start: 'top 90%' },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="lets-talk" className="contact">
      <span className="eyebrow eyebrow--dark">Let&apos;s Talk</span>
      <p className="contact-copy">
        You don&apos;t need a bigger budget.
        <br />
        You need a smarter direction for the one you have
      </p>

      <div className="contact-cta-wrap">
        <a className="contact-cta" href="#book-a-call">
          Book A Call
        </a>
        <a
          className="contact-link"
          href="https://estrela.studio/work"
          target="_blank"
          rel="noreferrer"
        >
          https://estrela.studio/work
        </a>
      </div>
    </section>
  );
}

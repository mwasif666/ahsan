import { useLayoutEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';
import './Problem.css';

/**
 * "THE PROBLEM" — three statements. In Figma the middle line is pushed
 * right (x497 vs x78), creating the zig-zag rhythm we keep here.
 * On scroll: words darken light-blue → navy one by one (scrubbed), and
 * the lines drift horizontally — outer lines to the right, middle left.
 */
const LINES = [
  { text: "You're posting, but nothing lands.", offset: false },
  { text: "You're spending, but can't tell what works.", offset: true },
  { text: "The runway's shrinking, and growth isn't.", offset: false },
];

export default function Problem() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.problem-eyebrow', {
        autoAlpha: 0,
        y: 20,
        duration: 0.8,
        scrollTrigger: { trigger: root.current, start: 'top 78%' },
      });

      gsap.utils.toArray('.problem-line').forEach((line, i) => {
        /* Smooth left→right darkening sweep. The text is painted by a
           navy→light-blue gradient (background-clip: text); sliding the
           background keeps the fade on the right edge while the dark
           fill grows from the left as you scroll. */
        gsap.fromTo(
          line,
          { backgroundPosition: '100% 0' },
          {
            backgroundPosition: '0% 0',
            ease: 'none',
            scrollTrigger: { trigger: line, start: 'top 94%', end: 'top 40%', scrub: true },
          }
        );

        /* Horizontal drift: lines 1 & 3 slide right, the middle one left */
        const dir = i === 1 ? -1 : 1;
        gsap.fromTo(
          line,
          { x: -70 * dir },
          {
            x: 70 * dir,
            ease: 'none',
            scrollTrigger: {
              trigger: root.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="problem">
      <span className="eyebrow problem-eyebrow">The Problem</span>
      <div className="problem-lines">
        {LINES.map((l, i) => (
          <h2 key={i} className={`problem-line ${l.offset ? 'is-offset' : ''}`}>
            {l.text}
          </h2>
        ))}
      </div>
    </section>
  );
}

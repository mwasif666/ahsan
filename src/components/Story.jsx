import { useLayoutEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';
import './Story.css';

/**
 * "MY STORY" — two paragraphs, revealed word-by-word from gray (#999999)
 * to navy as you scroll (scrubbed, like the reference sites this pattern
 * comes from). Copy is verbatim from Figma — including "buyinging",
 * flagged in the README.
 */

const P1 =
  "Master's in Digital Marketing and Branding, but most of what I know came from the work. Started as Creative Manager at Roots, hands-on with campaigns, websites, and apps end to end.";
const P2 =
  "Moved into Digital Marketing Strategy, going deep on media buyinging, SEO, and monetisation. Became Creative Head, leading a team of 15, that's where I learned talent isn't the problem, direction is.";

function Words({ text }) {
  return text.split(' ').map((w, i) => (
    <span key={i} className="story-word">
      {w}{' '}
    </span>
  ));
}

export default function Story() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.story .eyebrow', {
        autoAlpha: 0, y: 20, duration: 0.8,
        scrollTrigger: { trigger: root.current, start: 'top 80%' },
      });
      gsap.to('.story-word', {
        color: 'var(--navy)',
        stagger: 0.4,
        ease: 'none',
        scrollTrigger: {
          trigger: '.story-copy',
          start: 'top 72%',
          end: 'bottom 55%',
          scrub: 0.6,
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="story">
      <span className="eyebrow">My Story</span>
      <div className="story-copy">
        <p><Words text={P1} /></p>
        <p><Words text={P2} /></p>
      </div>
    </section>
  );
}

import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from '../lib/gsap';
import CaseStudyModal from './CaseStudyModal';
import './CaseStudies.css';

/**
 * "Case Studies" — cream-bg section showing two featured project cards.
 * Left: heading + description. Right: two stacked cards with external link icons.
 * Figma frame: 1920×1080, fixed aspect ratio on desktop, reflow on mobile.
 */

const CASE_STUDIES = [
  {
    id: 'econetix',
    title: 'Econetix',
    image: 'https://res.cloudinary.com/djyb4mzzk/image/upload/v1784459810/Frame_103_lrtxgh.png',
    link: '#',
  },
  {
    id: 'roots',
    title: 'Roots',
    image: 'https://res.cloudinary.com/djyb4mzzk/image/upload/v1784459809/Frame_104_lium6u.png',
    link: '#',
  },
];

export default function CaseStudies() {
  const root = useRef(null);
  const [activeCase, setActiveCase] = useState(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      /* Heading fades up */
      gsap.from('.cs-heading', {
        y: 30,
        autoAlpha: 0,
        duration: 0.9,
        scrollTrigger: { trigger: root.current, start: 'top 75%' },
      });

      /* Description fades up */
      gsap.from('.cs-description', {
        y: 30,
        autoAlpha: 0,
        duration: 0.9,
        delay: 0.1,
        scrollTrigger: { trigger: root.current, start: 'top 75%' },
      });

      /* Cards fade in + scale up */
      gsap.from('.case-card', {
        scale: 0.92,
        autoAlpha: 0,
        duration: 1,
        stagger: 0.15,
        scrollTrigger: { trigger: root.current, start: 'top 72%' },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="case-studies">
      <div className="cs-canvas">
        {/* Left: heading + description */}
        <div className="cs-content">
          <h2 className="cs-heading">
            <span>Case</span>
            <span>Studies</span>
          </h2>
          <p className="cs-description">
            Digital Marketing Strategist and Creative Head at Roots BMD, leading strategy, brand
            identity and 360 degree digital solutions across the USA, EU, Middle East and local
            markets.
          </p>
        </div>

        {/* Right: stacked project cards */}
        <div className="cs-cards">
          {CASE_STUDIES.map((project) => (
            <button
              key={project.id}
              className="case-card"
              onClick={() => setActiveCase(project.id)}
              aria-label={`View ${project.title} case study`}
            >
              <img src={project.image} alt={project.title} />
              <div className="card-link-icon" aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7 17 L17 7 M7 7 h10 v10" />
                </svg>
              </div>
            </button>
          ))}
        </div>
      </div>

      {activeCase && <CaseStudyModal caseId={activeCase} onClose={() => setActiveCase(null)} />}
    </section>
  );
}

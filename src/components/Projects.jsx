import { useLayoutEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';
import './Projects.css';

/**
 * "Selected Projects" — sky-blue gradient section with three glass cards in
 * a staggered two-column layout (Nextra + Fdm left, Pmprd right, offset).
 * Hovering a cover reveals a white "View" chip that follows the cursor.
 * Cover images are placeholders — swap the src values.
 */

const PROJECTS = [
  {
    name: 'Nextra',
    tags: ['Web Design', 'Brand Identity', 'Development'],
    img: 'https://res.cloudinary.com/djyb4mzzk/image/upload/v1783609308/Frame_63_ozlspz.png',
    cls: 'proj-nextra',
  },
  {
    name: 'Fdm',
    tags: ['Web Design', 'Brand Identity', 'Brand Identity'],
    img: 'https://res.cloudinary.com/djyb4mzzk/image/upload/v1783609308/Frame_66_ibkib2.png',
    cls: 'proj-fdm',
  },
  {
    name: 'Pmprd',
    tags: ['Web Design', 'Brand Identity', 'Brand Identity'],
    img: 'https://res.cloudinary.com/djyb4mzzk/image/upload/v1783609308/Frame_65_t6x1nb.png',
    cls: 'proj-pmprd',
  },
];

function ProjectCard({ p }) {
  const chipRef = useRef(null);
  const mediaRef = useRef(null);

  const onEnter = () => gsap.to(chipRef.current, { autoAlpha: 1, scale: 1, duration: 0.35, ease: 'power3.out' });
  const onLeave = () => gsap.to(chipRef.current, { autoAlpha: 0, scale: 0.6, duration: 0.3, ease: 'power3.in' });
  const onMove = (e) => {
    const r = mediaRef.current.getBoundingClientRect();
    gsap.to(chipRef.current, {
      x: e.clientX - r.left,
      y: e.clientY - r.top,
      duration: 0.5,
      ease: 'power3.out',
    });
  };

  return (
    <article className={`project-card ${p.cls}`}>
      <div
        ref={mediaRef}
        className="project-media"
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        onMouseMove={onMove}
      >
        <img src={p.img} alt={`${p.name} project cover`} loading="lazy" />
        <span ref={chipRef} className="project-view" aria-hidden="true">View</span>
      </div>
      <h3 className="project-name">{p.name}</h3>
      <div className="project-tags">
        {p.tags.map((t, i) => (
          <span key={i} className="project-tag">{t}</span>
        ))}
      </div>
    </article>
  );
}

export default function Projects() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.projects-title', {
        y: 60, autoAlpha: 0, duration: 1.1,
        scrollTrigger: { trigger: root.current, start: 'top 74%' },
      });
      gsap.utils.toArray('.project-card').forEach((card) => {
        gsap.from(card, {
          y: 90, autoAlpha: 0, duration: 1.1,
          scrollTrigger: { trigger: card, start: 'top 86%' },
        });
      });
      /* Set chip transform origin center on itself */
      gsap.set('.project-view', { xPercent: -50, yPercent: -50, autoAlpha: 0, scale: 0.6 });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="projects">
      <h2 className="projects-title">Selected Projects</h2>
      <div className="projects-grid container-fluid">
        <div className="row">
          <div className="col-12 col-lg-6 projects-col-left">
            <ProjectCard p={PROJECTS[0]} />
            <ProjectCard p={PROJECTS[1]} />
          </div>
          <div className="col-12 col-lg-6 projects-col-right">
            <ProjectCard p={PROJECTS[2]} />
          </div>
        </div>
      </div>
    </section>
  );
}

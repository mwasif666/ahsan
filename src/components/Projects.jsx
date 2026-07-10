import { useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { gsap, ScrollSmoother } from '../lib/gsap';
import './Projects.css';

/**
 * "Selected Projects" — sky-blue gradient section with three glass cards in
 * a staggered two-column layout (Nextra + Fdm left, Pmprd right, offset).
 * Hovering a cover reveals a white "View" chip that follows the cursor;
 * clicking a cover opens a modal with the full project details.
 * Cover images are placeholders — swap the src values.
 */

const PROJECTS = [
  {
    name: 'Nextra',
    tags: ['Web Design', 'Brand Identity', 'Development'],
    img: 'https://res.cloudinary.com/djyb4mzzk/image/upload/v1783609308/Frame_63_ozlspz.png',
    cls: 'proj-nextra',
    year: '2024',
    role: 'Brand & Website',
    description:
      'A full brand identity and marketing site for Nextra, a B2B SaaS startup. We sharpened the positioning, rebuilt the visual language, and shipped a fast, conversion-focused site that finally matched the ambition of the product.',
    link: '#',
  },
  {
    name: 'Fdm',
    tags: ['Web Design', 'Brand Identity', 'Development'],
    img: 'https://res.cloudinary.com/djyb4mzzk/image/upload/v1783609308/Frame_66_ibkib2.png',
    cls: 'proj-fdm',
    year: '2023',
    role: 'Brand & Website',
    description:
      'End-to-end brand and web work for Fdm. We defined a clear market position, designed a confident identity system, and built a site that turns visitors into qualified leads.',
    link: '#',
  },
  {
    name: 'Pmprd',
    tags: ['Web Design', 'Brand Identity', 'Packaging'],
    img: 'https://res.cloudinary.com/djyb4mzzk/image/upload/v1783609308/Frame_65_t6x1nb.png',
    cls: 'proj-pmprd',
    year: '2024',
    role: 'Brand & Packaging',
    description:
      'A refined identity and packaging system for Pmprd, built around a tactile, premium feel. The embossed mark and restrained palette give the brand a quiet confidence on shelf and online.',
    link: '#',
  },
];

function ProjectCard({ p, onOpen }) {
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
      <button
        type="button"
        ref={mediaRef}
        className="project-media"
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        onMouseMove={onMove}
        onClick={() => onOpen(p)}
        aria-label={`View ${p.name} project details`}
      >
        <img src={p.img} alt={`${p.name} project cover`} loading="lazy" />
        <span ref={chipRef} className="project-view" aria-hidden="true">View</span>
      </button>
      <h3 className="project-name">{p.name}</h3>
      <div className="project-tags">
        {p.tags.map((t, i) => (
          <span key={i} className="project-tag">{t}</span>
        ))}
      </div>
    </article>
  );
}

function ProjectModal({ project, onClose }) {
  const panelRef = useRef(null);
  const backdropRef = useRef(null);
  const closeRef = useRef(onClose);

  useLayoutEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const smoother = ScrollSmoother.get();
    smoother?.paused(true);
    document.body.classList.add('modal-open');

    const requestClose = () => {
      if (reduce) { onClose(); return; }
      gsap.to(panelRef.current, { y: 30, autoAlpha: 0, scale: 0.98, duration: 0.28, ease: 'power2.in' });
      gsap.to(backdropRef.current, { autoAlpha: 0, duration: 0.28, onComplete: onClose });
    };
    closeRef.current = requestClose;

    const onKey = (e) => { if (e.key === 'Escape') requestClose(); };
    document.addEventListener('keydown', onKey);

    let inTween;
    if (!reduce) {
      // Use fromTo with explicit end values (not gsap.from) so the entrance is
      // robust to React StrictMode's mount→unmount→mount double-invoke: a killed
      // `from` tween leaves inline opacity:0 that the second run would treat as
      // the natural end state, leaving the panel invisible.
      gsap.fromTo(backdropRef.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3, ease: 'power2.out' });
      inTween = gsap.fromTo(
        panelRef.current,
        { y: 40, autoAlpha: 0, scale: 0.98 },
        { y: 0, autoAlpha: 1, scale: 1, duration: 0.45, ease: 'power3.out' },
      );
    }

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.classList.remove('modal-open');
      smoother?.paused(false);
      inTween?.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onClose]);

  const close = () => closeRef.current();

  return createPortal(
    <div
      className="project-modal"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.name} project details`}
    >
      <div ref={backdropRef} className="project-modal-backdrop" onClick={close} />
      <div ref={panelRef} className="project-modal-panel">
        <button type="button" className="project-modal-close" onClick={close} aria-label="Close">
          &times;
        </button>
        <div className="project-modal-media">
          <img src={project.img} alt={`${project.name} project cover`} />
        </div>
        <div className="project-modal-body">
          <h3 className="project-modal-name">{project.name}</h3>
          <div className="project-tags project-modal-tags">
            {project.tags.map((t, i) => (
              <span key={i} className="project-tag">{t}</span>
            ))}
          </div>
          <p className="project-modal-desc">{project.description}</p>
          <dl className="project-modal-meta">
            <div>
              <dt>Role</dt>
              <dd>{project.role}</dd>
            </div>
            <div>
              <dt>Year</dt>
              <dd>{project.year}</dd>
            </div>
            <div>
              <dt>Services</dt>
              <dd>{project.tags.join(', ')}</dd>
            </div>
          </dl>
          {project.link && (
            <a className="project-modal-link" href={project.link}>Visit site &rarr;</a>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default function Projects() {
  const root = useRef(null);
  const [active, setActive] = useState(null);

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
            <ProjectCard p={PROJECTS[0]} onOpen={setActive} />
            <ProjectCard p={PROJECTS[1]} onOpen={setActive} />
          </div>
          <div className="col-12 col-lg-6 projects-col-right">
            <ProjectCard p={PROJECTS[2]} onOpen={setActive} />
          </div>
        </div>
      </div>

      {active && <ProjectModal project={active} onClose={() => setActive(null)} />}
    </section>
  );
}

import { useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { gsap, ScrollSmoother } from '../lib/gsap';
import './Projects.css';

/**
 * "Selected Projects" — sky-blue gradient section with three glass cards in
 * a staggered two-column layout (Nextera + PMPRD left, Econetix right, offset).
 * Hovering a cover reveals a white "View" chip that follows the cursor;
 * clicking a cover opens a full case-study modal with the project details.
 *
 * Data + detail layout are ported from the hierys.com/our-work case studies
 * (Send/src/components/our-work). Each project carries both the card fields
 * (name, tags, img) and the full detail fields consumed by ProjectModal.
 */

const PROJECTS = [
  {
    name: 'Nextera',
    tags: ['Brand Identity', 'Web Development', 'Brand Strategy'],
    img: 'https://res.cloudinary.com/djyb4mzzk/image/upload/v1781094303/Nextera_project_card_hhpskj.jpg',
    cls: 'proj-nextera',
    brandColor: '#071D32',
    headline: 'Nextera',
    subtitle: 'Brand Identity & Web Presence',
    client: 'Nextera',
    industry: 'Technology & Innovation',
    services: 'Brand Identity, Web Design, Development, Brand Strategy',
    year: '2024',
    overviewHeading: "Defining Nextera's position in the tech landscape.",
    intro:
      'Nextera is a technology company building next-generation digital infrastructure. We were brought in to create a brand identity that reflects their forward-thinking mission, one that feels cutting-edge without being cold. The identity system we built is built to lead, designed to scale.',
    copy1:
      'Technology brands often default to generic blue gradients and hollow buzzwords. Nextera deserved better. We dug into what makes them genuinely different and built a visual identity that communicates their technical sophistication without sacrificing warmth or clarity.',
    copy2:
      'The brand system anchors in a sharp primary palette of electric blue and clean white, with a flexible secondary system for product sub-brands. The logo is geometric and precise, with enough weight to carry authority across everything from app icons to investor decks.',
    quote: {
      text: "The rebrand gave us the confidence to walk into any room. Hierys built us something we're genuinely proud of.",
      author: 'Nextera Team',
      role: 'Co-Founder, Nextera',
      description:
        'From brand strategy to the final file handoff, Hierys was thorough, communicative, and delivered exactly what we needed to scale our business.',
    },
    heroImage:
      'https://res.cloudinary.com/djyb4mzzk/image/upload/v1781182025/16_xzmgrq.png',
    fullImage:
      'https://res.cloudinary.com/djyb4mzzk/image/upload/v1778850366/31_jl5gpj.png',
    overviewImage:
      'https://res.cloudinary.com/djyb4mzzk/image/upload/v1778850368/19_epht3v.png',
    galleryRows: [
      [
        'https://res.cloudinary.com/djyb4mzzk/image/upload/v1778850369/32_ltdwl9.png',
        'https://res.cloudinary.com/djyb4mzzk/image/upload/v1778850369/21_siokt6.png',
        'https://res.cloudinary.com/djyb4mzzk/image/upload/v1778850374/29_hmfvjr.png',
        'https://res.cloudinary.com/djyb4mzzk/image/upload/v1778850373/24_ocsngs.png',
        'https://res.cloudinary.com/djyb4mzzk/image/upload/v1778850373/25_c15zyu.png',
      ],
      [
        'https://res.cloudinary.com/djyb4mzzk/image/upload/v1778850370/22_psmhtl.png',
        'https://res.cloudinary.com/djyb4mzzk/image/upload/v1778850370/23_wyari6.png',
        'https://res.cloudinary.com/djyb4mzzk/image/upload/v1778850367/20_fypbre.png',
        'https://res.cloudinary.com/djyb4mzzk/image/upload/v1778850364/30_bqbl7c.png',
        'https://res.cloudinary.com/djyb4mzzk/image/upload/v1778850363/15_xvnsex.png',
      ],
      [
        'https://res.cloudinary.com/djyb4mzzk/image/upload/v1778850368/19_epht3v.png',
        'https://res.cloudinary.com/djyb4mzzk/image/upload/v1778850369/32_ltdwl9.png',
        'https://res.cloudinary.com/djyb4mzzk/image/upload/v1778850374/29_hmfvjr.png',
        'https://res.cloudinary.com/djyb4mzzk/image/upload/v1778850370/22_psmhtl.png',
        'https://res.cloudinary.com/djyb4mzzk/image/upload/v1778850373/25_c15zyu.png',
      ],
    ],
    finalImages: {
      left: 'https://res.cloudinary.com/djyb4mzzk/image/upload/v1778850374/29_hmfvjr.png',
      right1: 'https://res.cloudinary.com/djyb4mzzk/image/upload/v1778850369/21_siokt6.png',
      right2: 'https://res.cloudinary.com/djyb4mzzk/image/upload/v1778850370/23_wyari6.png',
    },
  },
  {
    name: 'PMPRD',
    tags: ['Brand Strategy', 'Identity Design', 'Art Direction'],
    img: 'https://res.cloudinary.com/djyb4mzzk/image/upload/v1781094304/Pmprd_project_card_xk6yaa.jpg',
    cls: 'proj-pmprd',
    brandColor: '#071D32',
    headline: 'PMPRD',
    subtitle: 'Brand Identity & Art Direction',
    client: 'PMPRD',
    industry: 'Health & Wellness',
    services: 'Brand Strategy, Identity Design, Art Direction, Photography',
    year: '2024',
    overviewHeading: "Building PMPRD's identity from the ground up.",
    intro:
      "PMPRD is a premium health and wellness brand with a focus on clean aesthetics and purposeful living. We were brought on to develop a complete visual identity that captures the brand's ethos, minimal, intentional, and deeply rooted in quality. From the logo system to brand guidelines and art direction, every element was crafted to resonate with a discerning audience.",
    copy1:
      "We began with an extensive brand discovery process, understanding PMPRD's audience, competitors, and aspirations. The result was a positioning strategy built around restraint and refinement, where every design decision had to earn its place.",
    copy2:
      "The visual language we developed draws from the brand's core philosophy: less noise, more meaning. A refined typographic system, a muted yet warm palette, and a grid-based layout approach that scales seamlessly across all brand touchpoints, digital, print, and beyond.",
    quote: {
      text: "Hierys understood our vision immediately. The identity they built didn't just look right, it felt right.",
      author: 'PMPRD Team',
      role: 'Brand Lead, PMPRD',
      description:
        'From strategy to final delivery, Hierys moved fast without cutting corners. The brand guidelines they handed over were production-ready from day one.',
    },
    heroImage:
      'https://res.cloudinary.com/djyb4mzzk/image/upload/v1781163228/1_6_hknvob.png',
    fullImage:
      'https://res.cloudinary.com/djyb4mzzk/image/upload/v1778845884/11_1_sirmkw.png',
    overviewImage:
      'https://res.cloudinary.com/djyb4mzzk/image/upload/v1778845884/12_1_orbpdo.png',
    galleryRows: [
      [
        'https://res.cloudinary.com/djyb4mzzk/image/upload/v1778845884/14_1_efw5gd.png',
        'https://res.cloudinary.com/djyb4mzzk/image/upload/v1778845884/10_2_pcpdsd.png',
        'https://res.cloudinary.com/djyb4mzzk/image/upload/v1778845884/13_1_vcz02g.png',
        'https://res.cloudinary.com/djyb4mzzk/image/upload/v1778845883/9_1_gl23gn.png',
        'https://res.cloudinary.com/djyb4mzzk/image/upload/v1778845883/3_1_svzwgr.png',
      ],
      [
        'https://res.cloudinary.com/djyb4mzzk/image/upload/v1778845883/7_1_wljz0c.png',
        'https://res.cloudinary.com/djyb4mzzk/image/upload/v1778845883/8_1_woqvl6.png',
        'https://res.cloudinary.com/djyb4mzzk/image/upload/v1778845882/5_1_u1xpkr.png',
        'https://res.cloudinary.com/djyb4mzzk/image/upload/v1778845882/4_1_pcmuuu.png',
        'https://res.cloudinary.com/djyb4mzzk/image/upload/v1778845881/2_1_cibov3.png',
      ],
      [
        'https://res.cloudinary.com/djyb4mzzk/image/upload/v1778845881/15_1_qra7r9.png',
        'https://res.cloudinary.com/djyb4mzzk/image/upload/v1778845881/6_1_ezhtmj.png',
        'https://res.cloudinary.com/djyb4mzzk/image/upload/v1778845884/12_1_orbpdo.png',
        'https://res.cloudinary.com/djyb4mzzk/image/upload/v1778845884/11_1_sirmkw.png',
        'https://res.cloudinary.com/djyb4mzzk/image/upload/v1778845884/14_1_efw5gd.png',
      ],
    ],
    finalImages: {
      left: 'https://res.cloudinary.com/djyb4mzzk/image/upload/v1778845884/13_1_vcz02g.png',
      right1: 'https://res.cloudinary.com/djyb4mzzk/image/upload/v1778845883/9_1_gl23gn.png',
      right2: 'https://res.cloudinary.com/djyb4mzzk/image/upload/v1778845883/7_1_wljz0c.png',
    },
  },
  {
    name: 'Econetix',
    tags: ['Brand Identity', 'Web Design', 'UI/UX'],
    img: 'https://res.cloudinary.com/djyb4mzzk/image/upload/v1781094300/Econetix_project_card_rmbqzc.jpg',
    cls: 'proj-econetix',
    brandColor: '#071D32',
    headline: 'Econetix',
    subtitle: 'Brand Identity & Digital Presence',
    client: 'Econetix',
    industry: 'Fintech & Economics',
    services: 'Brand Identity, Web Design, UI/UX, Brand Strategy',
    year: '2024',
    overviewHeading: 'Giving Econetix a brand that means business.',
    intro:
      'Econetix is a fintech platform redefining how businesses access economic intelligence. We were tasked with building an identity that communicated trust, precision, and forward-thinking, critical qualities in the financial data space. The result is a brand system that feels authoritative yet approachable.',
    copy1:
      'The challenge with Econetix was striking the right balance between technical credibility and human clarity. Too corporate and it feels cold; too casual and it loses authority. We landed on a visual language that bridges both, structured, precise, but with a warmth that invites engagement.',
    copy2:
      'The brand system spans a complete logo suite, a structured typographic hierarchy, a data-forward colour palette anchored in deep navy and sharp amber, and a set of UI components designed for their web platform. Everything was built to scale consistently as the product grows.',
    quote: {
      text: 'We finally have a brand that matches the quality of our product. Hierys nailed the brief on the first round.',
      author: 'Econetix Team',
      role: 'CEO, Econetix',
      description:
        'The turnaround was fast, the communication was clear, and the output was exactly what we needed to launch with confidence.',
    },
    heroImage:
      'https://res.cloudinary.com/djyb4mzzk/image/upload/v1781256338/Econetix_hero_image_pvwzwz.png',
    fullImage:
      'https://res.cloudinary.com/djyb4mzzk/image/upload/v1778876297/CAPA_-_LinkedIn_pre-event_post_x1_3_pzrmkx.jpg',
    overviewImage:
      'https://res.cloudinary.com/djyb4mzzk/image/upload/v1778846065/Asset_1_2_ayb7nr.jpg',
    galleryRows: [
      [
        'https://res.cloudinary.com/djyb4mzzk/image/upload/v1778846068/01_-_On_Track_for_Net_Zero_1_zgbibs.jpg',
        'https://res.cloudinary.com/djyb4mzzk/image/upload/v1778846069/02_-_Leave_Footprints_Not_Emissions_1_qespde.jpg',
        'https://res.cloudinary.com/djyb4mzzk/image/upload/v1778846069/03_-_Race_to_Zero_1_f4ff2y.jpg',
        'https://res.cloudinary.com/djyb4mzzk/image/upload/v1778846063/04_-_Less_CO2_More_PBs_1_xtbjlf.jpg',
        'https://res.cloudinary.com/djyb4mzzk/image/upload/v1778846065/Asset_1_2_ayb7nr.jpg',
      ],
      [
        'https://res.cloudinary.com/djyb4mzzk/image/upload/v1778846065/Asset_2_1_wf9jii.jpg',
        'https://res.cloudinary.com/djyb4mzzk/image/upload/v1778846064/Asset_3_1_zskbg2.jpg',
        'https://res.cloudinary.com/djyb4mzzk/image/upload/v1778846064/Asset_5_1_icbrc9.jpg',
        'https://res.cloudinary.com/djyb4mzzk/image/upload/v1778846068/Asset_6_1_jx7vrd.jpg',
        'https://res.cloudinary.com/djyb4mzzk/image/upload/v1778846066/Asset_7_1_nin5gb.jpg',
      ],
      [
        'https://res.cloudinary.com/djyb4mzzk/image/upload/v1778846066/Asset_8_1_ifh4wz.jpg',
        'https://res.cloudinary.com/djyb4mzzk/image/upload/v1778846066/Asset_9_1_gn2gcv.jpg',
        'https://res.cloudinary.com/djyb4mzzk/image/upload/v1778846067/Asset_10_1_jikeax.jpg',
        'https://res.cloudinary.com/djyb4mzzk/image/upload/v1778846068/Asset_11_1_ba7uwi.jpg',
        'https://res.cloudinary.com/djyb4mzzk/image/upload/v1778876273/CEO_-_Jakob_2_ak91xe.jpg',
      ],
    ],
    finalImages: {
      left: 'https://res.cloudinary.com/djyb4mzzk/image/upload/v1778876273/Jakob_Paul_jva4xg.jpg',
      right1: 'https://res.cloudinary.com/djyb4mzzk/image/upload/v1778876273/COO_-_Paul_3_nkbwb3.jpg',
      right2: 'https://res.cloudinary.com/djyb4mzzk/image/upload/v1778876273/CSO_-_Martin_3_uochhh.jpg',
    },
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

      <button type="button" className="project-modal-close" onClick={close} aria-label="Close">
        &times;
      </button>

      <article
        ref={panelRef}
        className="project-modal-panel project-detail"
        style={{ '--brand': project.brandColor }}
      >
        {/* Hero */}
        <section className="pd-hero">
          <img className="pd-hero-img" src={project.heroImage} alt={`${project.name} project hero`} />
        </section>

        {/* Title */}
        <section className="pd-title">
          <h2>{project.headline}</h2>
          <span className="pd-subtitle">{project.subtitle}</span>
        </section>

        {/* Overview */}
        <section className="pd-overview">
          <div className="pd-overview-left">
            <span className="pd-label">01 Overview</span>
            <h3>{project.overviewHeading}</h3>
            <div className="pd-brand-image">
              <img src={project.overviewImage} alt={`${project.name} overview`} loading="lazy" />
            </div>
          </div>

          <div className="pd-overview-right">
            <div className="pd-facts">
              <div className="pd-fact">
                <h4>Client</h4>
                <p>{project.client}</p>
              </div>
              <div className="pd-fact">
                <h4>Industry</h4>
                <p>{project.industry}</p>
              </div>
              <div className="pd-fact">
                <h4>Services</h4>
                <p>{project.services}</p>
              </div>
              <div className="pd-fact">
                <h4>Year</h4>
                <p>{project.year}</p>
              </div>
            </div>
            <p className="pd-intro">{project.intro}</p>
          </div>
        </section>

        {/* Full-width image */}
        <div className="pd-full">
          <img src={project.fullImage} alt={`${project.name} showcase`} loading="lazy" />
        </div>

        {/* Copy columns */}
        <section className="pd-copy">
          <p>{project.copy1}</p>
          <p>{project.copy2}</p>
        </section>

        {/* Gallery — 3 auto-scrolling rows */}
        <div className="pd-gallery">
          {project.galleryRows.map((rowImages, rowIndex) => {
            const doubled = [...rowImages, ...rowImages];
            return (
              <div key={rowIndex} className="pd-gallery-row">
                <div className={`pd-gallery-track pd-gallery-track-${rowIndex}`}>
                  {doubled.map((src, i) => (
                    <img key={i} src={src} alt="" aria-hidden="true" loading="lazy" />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Quote */}
        <section className="pd-quote">
          <div className="pd-quote-left">
            <span className="pd-label">02 Client</span>
            <div className="pd-quote-body">
              <span className="pd-quote-mark" aria-hidden="true">&ldquo;</span>
              <blockquote>&ldquo;{project.quote.text}&rdquo;</blockquote>
            </div>
            <div className="pd-quote-attrib">
              <strong>{project.quote.author}</strong>
              <span>{project.quote.role}</span>
            </div>
          </div>
          <div className="pd-quote-right">
            <p>{project.quote.description}</p>
          </div>
        </section>

        {/* Final showcase */}
        <section className="pd-final">
          <div className="pd-final-left">
            <img src={project.finalImages.left} alt={`${project.name} final`} loading="lazy" />
            <span className="pd-final-tag">{project.subtitle}</span>
            <div className="pd-final-overlay">
              <h3>{project.name}</h3>
              <div className="pd-final-meta">
                <div>
                  <small>Client</small>
                  <span>{project.client}</span>
                </div>
                <div>
                  <small>Year</small>
                  <span>{project.year}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pd-final-right">
            <div className="pd-final-panel">
              <img src={project.finalImages.right1} alt={`${project.name} detail`} loading="lazy" />
            </div>
            <div className="pd-final-dark">
              <div className="pd-statement-header">
                <span className="pd-statement-accent" aria-hidden="true" />
                <span className="pd-statement-label">Brand System</span>
              </div>
              <p className="pd-statement">{project.copy2}</p>
            </div>
          </div>
        </section>
      </article>
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
    <section ref={root} className="projects" id="projects">
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

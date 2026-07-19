import { useLayoutEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { gsap, ScrollSmoother } from '../lib/gsap';
import './CaseStudyModal.css';

/**
 * Case Study detail modal — opens on card click with full project details,
 * stats, services, and client info. Matches the Figma case study page design.
 */

const CASE_STUDY_DATA = {
  econetix: {
    title: 'Econetix',
    tags: ['SEO', 'Marketing', 'Brand Digital Presence'],
    description:
      'Led the end to end brand and digital transformation for Econetix, directing a full team across branding, design, marketing, SEO and development. Owned the project from strategy through execution, keeping every workstream aligned to one goal.',
    bannerImage: 'https://res.cloudinary.com/djyb4mzzk/image/upload/v1784461714/Frame_103_lrtxgh.png',
  },
  roots: {
    title: 'Roots BMD',
    tags: ['Strategy', 'Creative Head'],
    description:
      'Digital Marketing Strategist and Creative Head at Roots BMD, leading strategy, brand identity and 360 degree digital solutions across the USA, EU, Middle East and local markets.',
    bannerImage: 'https://res.cloudinary.com/djyb4mzzk/image/upload/v1784462598/iPad_Pro_cwzlmy.png',
    stats: [
      { label: 'Visibility Growth', value: '50+', bg: 'yellow' },
      { label: 'Brand Identity Projects', value: '30+', bg: 'white' },
      { label: 'Years Clients Retention', value: '5+', bg: 'yellow' },
      { label: 'Client Success Rate', value: '99%', bg: 'blue' },
    ],
    portfolio: {
      title: 'Client Portfolio & Markets',
      description:
        'Managed 50+ clients across the USA, EU, Middle East and local markets, adapting strategy to each region.',
      image: '#', // placeholder
    },
    services: [
      {
        title: 'Brand Identity & Creative Direction',
        description:
          'Led creative direction and brand identity across 30+ projects, ensuring consistency through execution.',
        image: '#',
      },
      {
        title: 'Content & Digital Marketing Strategy',
        description:
          'Drove content and digital marketing strategies to support client accounts, from planning through delivery.',
        image: '#',
      },
      {
        title: 'SEO Strategy',
        description:
          'Directed on-page, technical SEO and content strategies, supporting client retention beyond 5+ years.',
        image: '#',
      },
      {
        title: 'Web & App Development',
        description: 'Directed web and app development projects for digital transformation through delivery.',
        image: '#',
      },
    ],
    clientLogos: [
      'https://res.cloudinary.com/djyb4mzzk/image/upload/v1782759384/Group_146_nj5koq.png',
      'https://res.cloudinary.com/djyb4mzzk/image/upload/v1782759383/Group_152_nn8rbc.png',
      'https://res.cloudinary.com/djyb4mzzk/image/upload/v1782759383/Group_151_azjnxi.png',
      'https://res.cloudinary.com/djyb4mzzk/image/upload/v1782759383/Group_150_zzcbga.png',
      'https://res.cloudinary.com/djyb4mzzk/image/upload/v1782759383/Group_149_xah8vm.png',
      'https://res.cloudinary.com/djyb4mzzk/image/upload/v1782759382/Group_144_dppc0k.png',
      'https://res.cloudinary.com/djyb4mzzk/image/upload/v1782759382/Group_145_zhkx8j.png',
    ],
  },
};

const ECO_RING = 'https://res.cloudinary.com/djyb4mzzk/image/upload/v1784475354/Content_kxfdaa.png';

const ECO_COLLAGE = {
  badge: 'https://res.cloudinary.com/djyb4mzzk/image/upload/v1784475682/Group_311_idahg4.png',
  icons: 'https://res.cloudinary.com/djyb4mzzk/image/upload/v1784475681/Group_302_kx4uxw.png',
  palette: 'https://res.cloudinary.com/djyb4mzzk/image/upload/v1784475681/Group_303_seyfu2.png',
  truck: 'https://res.cloudinary.com/djyb4mzzk/image/upload/v1784475682/Group_309_snzig7.png',
  logo: 'https://res.cloudinary.com/djyb4mzzk/image/upload/v1784475682/Group_304_hursfn.png',
  browser: 'https://res.cloudinary.com/djyb4mzzk/image/upload/v1784475682/Group_305_fadupz.png',
  billboard: 'https://res.cloudinary.com/djyb4mzzk/image/upload/v1784475681/Group_310_oplzpr.png',
};

const ECO_SOCIAL = 'https://res.cloudinary.com/djyb4mzzk/image/upload/v1784477424/Asset_4300_1_dullpr.png';

const ECO_STACK_CARDS = [
  {
    title: 'Brand & Identity',
    text: 'Set the social media and content strategy, defining voice, content pillars and platform priorities, then directed execution across every channel. Social-driven traffic grew 65%, with followers increasing 3x.',
    tone: 'cream',
  },
  {
    title: 'Performance',
    text: 'Directed performance optimization across site speed, Core Web Vitals and backend infrastructure. Load speed improved by 45%, lifting overall conversions by 30%.',
    tone: 'yellow',
  },
  {
    title: 'SEO',
    text: 'Directed a full SEO strategy across on-page, technical, blog content and backlink building to grow domain authority. Priority keywords moved to page 1 within 4 months, and organic traffic grew 3x with 50+ quality backlinks earned.',
    tone: 'blue',
  },
];

export default function CaseStudyModal({ caseId, onClose }) {
  const root = useRef(null);
  const panel = useRef(null);
  const data = CASE_STUDY_DATA[caseId] || CASE_STUDY_DATA.roots;
  const isEconetix = caseId === 'econetix';

  useLayoutEffect(() => {
    const smoother = ScrollSmoother.get();
    smoother?.paused(true);
    document.body.classList.add('csm-open');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      if (reduce) return;
      gsap.fromTo(root.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 });
      gsap.fromTo(panel.current, { y: 40, scale: 0.985 }, { y: 0, scale: 1, duration: 0.5 });
    }, root);
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => {
      ctx.revert();
      document.removeEventListener('keydown', handleEscape);
      document.body.classList.remove('csm-open');
      smoother?.paused(false);
    };
  }, [onClose]);

  return createPortal(
    <div ref={root} className="csm-overlay" onClick={onClose}>
      <div ref={panel} className="csm-modal" role="dialog" aria-modal="true" aria-label={`${data.title} case study`} onClick={(e) => e.stopPropagation()}>
        <button className="csm-close" onClick={onClose} aria-label="Close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="csm-content">
          {/* Banner */}
          <div className="csm-banner">
            <img src={data.bannerImage} alt={data.title} />
          </div>

          {/* Header */}
          <div className="csm-header">
            <h1 className="csm-title">{data.title}</h1>
            <div className="csm-tags">
              {data.tags.map((tag) => (
                <span key={tag} className="csm-tag">
                  {tag}
                </span>
              ))}
            </div>
            <p className="csm-description">{data.description}</p>
          </div>

          {isEconetix ? (
            <>
              <section className="eco-stats" aria-label="Econetix results">
                <div className="eco-stat eco-stat-visibility">
                  <span>Visibility Growth</span><strong>4x</strong>
                </div>
                <div className="eco-stat eco-stat-visitors">
                  <span>Website Visitors</span><strong>20k</strong>
                </div>
                <div className="eco-stat eco-stat-engagement">
                  <span>Engagement<br />Increase</span><strong>3x</strong>
                </div>
                <div className="eco-stat eco-stat-keywords">
                  <span>Keywords on Page</span><strong>10</strong>
                </div>
              </section>

              <section className="eco-story-grid">
                <article className="eco-problem-card">
                  <b>01</b>
                  <div>
                    <h3>The Problem</h3>
                    <p>Econetix had no defined brand identity, a website lacking content and structure, and zero SEO optimization in place. Overall digital presence was weak, with scattered, disconnected activity instead of a coherent strategy.</p>
                  </div>
                </article>
                <div className="eco-problem-media" aria-hidden="true" />

                <div className="eco-collage" aria-label="Econetix brand identity applications">
                  {Object.entries(ECO_COLLAGE).map(([name, src]) => (
                    <img key={name} className={`eco-collage-${name}`} src={src} alt="" />
                  ))}
                </div>
                <article className="eco-identity-card">
                  <h3>Brand &amp; Identity</h3>
                  <p>Directed the development of Econetix's complete visual identity, including logo, color system, typography and brand guidelines. Brand perception improved by 40% following rollout.</p>
                  <b>02</b>
                </article>
              </section>

              <section className="eco-growth">
                <div className="eco-growth-visual">
                  <img src={ECO_SOCIAL} alt="Econetix social media profile on a phone" />
                </div>
                <div className="eco-stack-cards">
                  <article className="eco-stack-card eco-stack-lead" style={{ '--eco-index': 0 }}>
                    <p>Directed the redesign and development of Econetix's website and digital presence, aligned with the new brand identity and built for clean navigation and mobile responsiveness. Site visibility grew 2x, with a 30% lift in on-site conversions.</p>
                  </article>
                  {ECO_STACK_CARDS.map((card, index) => (
                    <article key={card.title} className={`eco-stack-card eco-stack-${card.tone}`} style={{ '--eco-index': index + 1 }}>
                      <h3>{card.title}</h3>
                      <p>{card.text}</p>
                    </article>
                  ))}
                </div>
              </section>
            </>
          ) : (
            <>
          {/* Client Logos */}
          <div className="csm-clients">
            <div className="csm-logo-track">
              {[0, 1].map((copy) => (
                <div key={copy} className="csm-logos" aria-hidden={copy === 1 ? 'true' : undefined}>
                  {data.clientLogos.map((logo, index) => (
                    <img
                      key={`${copy}-${logo}`}
                      className="csm-logo-slot"
                      src={logo}
                      alt={copy === 0 ? `Roots BMD client ${index + 1}` : ''}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          <section className="csm-results">
            <div className="csm-stats">
              {data.stats.map((stat, i) => (
                <div key={i} className={`csm-stat csm-stat-${stat.bg} csm-stat-${i}`}>
                  <span className="csm-stat-label">{stat.label}</span>
                  <span className="csm-stat-value">{stat.value}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Stacking begins here, after the stats have scrolled away. */}
          <section className="csm-portfolio">
            <div className="csm-portfolio-content">
              <h3 className="csm-portfolio-title">Client<br />Portfolio &amp;<br />Markets</h3>
              <p className="csm-portfolio-description">{data.portfolio.description}</p>
            </div>
            <div className="csm-portfolio-image" />
          </section>

          {/* Services */}
          <div className="csm-services">
            {data.services.map((service, i) => (
              <div key={i} className="csm-service" style={{ '--service-index': i }}>
                <div className="csm-service-content">
                  <h3 className="csm-service-title">{service.title}</h3>
                  <p className="csm-service-description">{service.description}</p>
                </div>
                <div className="csm-service-image" />
              </div>
            ))}
          </div>
            </>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}

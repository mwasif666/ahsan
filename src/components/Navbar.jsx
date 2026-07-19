import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from '../lib/gsap';
import './Navbar.css';

/**
 * Header matching the reference screenshot: three centered nav links
 * (Projects · Get to Know Me · Case Study) with a hamburger toggle on the
 * right. Sits over the top of the hero and scrolls away with the page.
 * The hamburger opens a dropdown with the same links — the primary
 * navigation on small screens, where the inline links are hidden.
 */
const LINKS = [
  { label: 'Projects', href: '#projects' },
  { label: 'Get to Know Me', href: '#who' },
  { label: 'Case Study', href: '#story' },
];

export default function Navbar() {
  const root = useRef(null);
  const [open, setOpen] = useState(false);

  // Entrance: slide the bar down on load.
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(root.current, { yPercent: -120, autoAlpha: 0, duration: 0.9, delay: 0.1 });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <header ref={root} className="site-nav d-flex align-items-center">
      <nav className="nav-links" aria-label="Primary">
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} className="nav-link" onClick={() => setOpen(false)}>
            {l.label}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className={`nav-toggle ms-auto ${open ? 'is-open' : ''}`}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <img
          src="https://res.cloudinary.com/djyb4mzzk/image/upload/v1784458157/toggleicon_xyjwgd.svg"
          alt=""
        />
      </button>

      {open && (
        <div className="nav-menu" role="menu">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="nav-menu-link"
              role="menuitem"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}

import { useLayoutEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';
import './Navbar.css';

/**
 * Figma header: centered eyebrow "THE PROBLEM SOLVER" + navy "Get in Touch"
 * pill on the right (Geist, #DFEBF3 on #061E33, radius 6).
 * Sits over the top of the hero and scrolls away with the page.
 */
export default function Navbar() {
  const root = useRef(null);

  // Entrance: slide the bar down on load.
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(root.current, { yPercent: -120, autoAlpha: 0, duration: 0.9, delay: 0.1 });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <header ref={root} className="site-nav d-flex align-items-center">
      <span className="nav-label eyebrow">The Problem Solver</span>
      <a href="#lets-talk" className="nav-cta ms-auto">
        Get in Touch
      </a>
    </header>
  );
}

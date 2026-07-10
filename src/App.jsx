import { useEffect, useLayoutEffect } from 'react';
import { gsap, ScrollTrigger, ScrollSmoother } from './lib/gsap';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Problem from './components/Problem';
import WhoIAm from './components/WhoIAm';
import Services from './components/Services';
import Story from './components/Story';
import Process from './components/Process';
import Projects from './components/Projects';
import TrustedBy from './components/TrustedBy';
import Contact from './components/Contact';

export default function App() {
  useEffect(() => {
    // Respect prefers-reduced-motion: jump every tween/ScrollTrigger to its
    // end state instead of animating.
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const applyMotionPreference = () => {
      if (mq.matches) {
        gsap.globalTimeline.timeScale(100);
        ScrollTrigger.getAll().forEach((st) => st.disable(false));
        gsap.globalTimeline.getChildren(true, true, true).forEach((t) => t.progress(1));
      }
    };
    applyMotionPreference();
  }, []);

  // GSAP ScrollSmoother — inertia-based smooth scrolling for the whole page,
  // driven by a transform on #smooth-content. Set up in useLayoutEffect so the
  // wrapper is pinned before first paint. Skipped under prefers-reduced-motion.
  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    const smoother = ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: 1.15,
      smoothTouch: 0.08,
      effects: true,
    });

    // ScrollSmoother scrolls via transform, so native anchor jumps don't work.
    // Intercept in-page #hash links and let the smoother ease to the target.
    const handleAnchorClick = (event) => {
      const link = event.target.closest('a[href^="#"]');
      if (!link) return;

      const hash = link.getAttribute('href');
      const target = hash && hash !== '#' ? document.querySelector(hash) : null;
      if (!target) return;

      event.preventDefault();
      smoother.scrollTo(target, true, 'top top');
      window.history.pushState(null, '', hash);
    };

    // Re-measure ScrollTriggers once images/fonts have loaded.
    const refresh = () => ScrollTrigger.refresh();
    document.addEventListener('click', handleAnchorClick);
    window.addEventListener('load', refresh);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      window.removeEventListener('load', refresh);
      smoother.kill();
    };
  }, []);

  /* Section order matches the Figma page top-to-bottom:
     Hero → The Problem → Who I Am (+stats) → What I Do → My Story →
     How I Work → Selected Projects → Trusted By → Let's Talk */
  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">
        <Navbar />
        <main>
          <Hero />
          <Problem />
          <WhoIAm />
          <Services />
          <Story />
          <Process />
          <Projects />
          <TrustedBy />
          <Contact />
        </main>
      </div>
    </div>
  );
}

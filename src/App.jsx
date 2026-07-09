import { useEffect } from 'react';
import { gsap, ScrollTrigger } from './lib/gsap';

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

    // Re-measure ScrollTriggers once images/fonts have loaded.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    return () => window.removeEventListener('load', refresh);
  }, []);

  /* Section order matches the Figma page top-to-bottom:
     Hero → The Problem → Who I Am (+stats) → What I Do → My Story →
     How I Work → Selected Projects → Trusted By → Let's Talk */
  return (
    <>
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
    </>
  );
}

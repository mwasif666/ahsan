// Central GSAP setup — import { gsap, ScrollTrigger } from '../lib/gsap'
// everywhere so the plugin is registered exactly once.
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

// Global defaults keep the motion language consistent across sections.
gsap.defaults({ ease: 'power3.out', duration: 1 });

export { gsap, ScrollTrigger, ScrollSmoother };

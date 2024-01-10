import { gsap } from 'gsap';
/* The following plugin is a Club GSAP perk */
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';

gsap.registerPlugin(DrawSVGPlugin);

gsap.from('#data-integration-path', { duration: 1, drawSVG: 0 });

import { gsap } from 'gsap';
gsap.registerPlugin(ScrollTrigger, SplitText);
function updateBaseFontSize() {
	// Calculate the current root font size in pixels
	let rootFontSizePx = parseFloat(
		getComputedStyle(document.documentElement).fontSize
	);
	// Calculate the REM equivalent for 16px
	let fsBaseRem = 16 / rootFontSizePx;

	// Update the --fs-base property
	document.documentElement.style.setProperty('--fs-base', `${fsBaseRem}rem`);
}

// Update the font size on load and whenever the window is resized
window.addEventListener('load', updateBaseFontSize);
window.addEventListener('resize', updateBaseFontSize);

// foooter copyright year
const d = new Date();
let year = d.getFullYear();

(document.querySelector('.footer-year') as HTMLSpanElement)!.innerHTML =
	year.toString();

// mobile navigation
function changeBurgerColor() {
	const burgerPaths = document.querySelectorAll(
		'.burger-lottie path'
	) as NodeListOf<SVGAElement>;
	burgerPaths.forEach((path) => {
		path.style.fill = 'CurrentColor';
	});
}

//@ts-ignore
const webflow = window.Webflow || [];
webflow.push(function () {
	const burgerLottie = webflow
		.require('lottie')
		.lottie.getRegisteredAnimations()[0];
	burgerLottie.addEventListener('DOMLoaded', changeBurgerColor);
	observeElementClass('.mobile-menu-btn');
});

// Function to observe an element for class changes
function observeElementClass(elementSelector: string) {
	// Select the element to observe
	const elementToObserve = document.querySelector(elementSelector);

	// Check if the element exists
	if (!elementToObserve) {
		console.error(
			'Element not found for the provided selector:',
			elementSelector
		);
		return;
	}

	// Function to call when the class changes
	function onClassChange(mutationsList: MutationRecord[]) {
		for (const mutation of mutationsList) {
			if (
				mutation.type === 'attributes' &&
				mutation.attributeName === 'class'
			) {
				if (elementToObserve!.classList.contains('w--open')) {
					if (window.location.pathname === '/solution') {
						document
							.querySelector('.nav-logo-link')!
							.classList.remove('white-logo');
						document.querySelector('.nav-s')!.classList.remove('solution-nav');
					}
					document.querySelector('.nav-s')!.classList.add('mobile-open-nav');
					document.querySelector('.burger-lottie')!.classList.add('black-fill');
					// Element has the 'w-open' class
				} else {
					if (window.location.pathname === '/solution') {
						document.querySelector('.nav-s')!.classList.add('solution-nav');
						if (window.pageYOffset === 0) {
							document
								.querySelector('.nav-logo-link')!
								.classList.add('white-logo');
							document
								.querySelector('.burger-lottie')!
								.classList.remove('black-fill');
						}
					}
					document.querySelector('.nav-s')!.classList.remove('mobile-open-nav');
				}
			}
		}
	}

	// Create a new MutationObserver instance and pass the callback function
	const observer = new MutationObserver(onClassChange);

	// Start observing the target element for configured mutations
	observer.observe(elementToObserve, {
		attributes: true, // Listen for attribute changes
		attributeFilter: ['class'], // Filter to only listen for class changes
	});

	// Optional: return the observer in case you need to stop observing later
	return observer;
}

//navigation
const nav = document.querySelector('.nav-s')! as HTMLDivElement;
const navLogo = document.querySelector('.logo-svg')! as SVGAElement;
let lastScrollTop = 0; // Variable to keep track of the last scroll position

function checkScroll() {
	let currentScrollPos = window.pageYOffset;

	if (currentScrollPos > 0) {
		nav.classList.add('is-scrolled');
		navLogo.classList.add('is-scrolled');
		if (window.location.pathname === '/solution') {
			if (window.innerWidth > 991) {
				document
					.querySelector('.nav-button.secondary-btn')!
					.classList.add('invert');
			}
		}
		if (currentScrollPos > 500) {
			// Add 'is-hidden' if scrolled down and more than 500px
			if (currentScrollPos > lastScrollTop) {
				nav.classList.add('is-hidden');
			} else {
				// Remove 'is-hidden' if scrolling up
				nav.classList.remove('is-hidden');
			}
		} else {
			nav.classList.remove('is-hidden');
		}
	} else {
		nav.classList.remove('is-scrolled');
		navLogo.classList.remove('is-scrolled');
		if (window.location.pathname === '/solution') {
			document.querySelector('.nav-logo-link')!.classList.add('white-logo');
			document.querySelector('.burger-lottie')!.classList.remove('black-fill');
			document
				.querySelector('.nav-button.secondary-btn')!
				.classList.remove('invert');
		}
	}

	lastScrollTop = currentScrollPos; // Update the last scroll position
}

window.addEventListener('scroll', checkScroll);
window.addEventListener('touchmove', checkScroll);

//animated titles
const splitTitles = document.querySelectorAll('[cd="animated-title"]');

splitTitles.forEach((title) => {
	const split = new SplitText(title, {
		type: 'lines, words',
		wordsClass: 'cd-word',
		linesClass: 'cd-line',
	});

	ScrollTrigger.create({
		trigger: title,
		start: 'top 75%',
		onEnter: () => {
			gsap.from(split.words, 1.8, {
				y: 140,
				ease: 'power4.out',
				delay: 1,
				skewY: 17,
				stagger: {
					amount: 0.3,
				},
				onStart: () => {
					gsap.set(title, { opacity: 1 });
				},
			});
		},
	});
});

//add scripts to pages
//@ts-ignore
const webflowPush = window.Webflow || [];
if (window.location.pathname === '/') {
	webflowPush.push(function () {
		const homepageScript = document.createElement('script');
		homepageScript.src = 'https://panoramic-web.netlify.app/home.js';
		// homepageScript.src = 'http://localhost:4173/home.js';
		document.body.appendChild(homepageScript);
	});
} else if (window.location.pathname === '/solution') {
	webflowPush.push(function () {
		const solutionScript = document.createElement('script');
		solutionScript.src = 'https://panoramic-web.netlify.app/solution.js';
		// solutionScript.src = 'http://localhost:4173/solution.js';
		document.body.appendChild(solutionScript);
	});
} else if (window.location.pathname === '/find-a-partner') {
	webflowPush.push(function () {
		const findAPartnerScript = document.createElement('script');
		findAPartnerScript.src =
			'https://panoramic-web.netlify.app/findApartner.js';
		// findAPartnerScript.src = 'http://localhost:4173/findApartner.js';
		document.body.appendChild(findAPartnerScript);
	});
} else if (window.location.pathname === '/be-a-partner') {
	webflowPush.push(function () {
		const beAPartnerScript = document.createElement('script');
		beAPartnerScript.src = 'https://panoramic-web.netlify.app/bePartner.js';
		// beAPartnerScript.src = 'http://localhost:4173/bePartner.js';
		document.body.appendChild(beAPartnerScript);
	});
} else if (window.location.pathname.includes('/partners/')) {
	webflowPush.push(function () {
		const partnerScript = document.createElement('script');
		partnerScript.src = 'https://panoramic-web.netlify.app/partnerPage.js';
		// partnerScript.src = 'http://localhost:4173/partnerPage.js';
		document.body.appendChild(partnerScript);
	});
}

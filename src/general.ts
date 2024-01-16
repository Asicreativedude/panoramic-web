import { gsap } from 'gsap';
gsap.registerPlugin(ScrollTrigger, SplitText);

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

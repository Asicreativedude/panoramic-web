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

// mobile burger color

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

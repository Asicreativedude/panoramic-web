import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
const filterDropdowns = document.querySelectorAll(
	'.find-a-partner-filter-dropdown'
) as NodeListOf<HTMLDivElement>;
filterDropdowns.forEach((dropdown) => {
	const isEmpty = dropdown.querySelector('.w-dyn-empty');
	if (!isEmpty) {
		dropdown.classList.add('active');
		const continentCounter = dropdown.querySelector('.continent-counter')!;
		const numberOfCountries = dropdown.querySelectorAll(
			'.find-a-partner-filter-checkbox-c'
		).length;
		continentCounter.textContent = numberOfCountries.toString();
	}
});

document
	.querySelector('.find-a-partner-clear')!
	.addEventListener('click', () => {
		(document.querySelector('.filter-clear-div')! as HTMLDivElement).click();
	});

function setGsapScrollPartner() {
	//@ts-ignore
	gsap.set('.orange-circle', {
		background: '#d9d9d9',
	});
	gsap.set('.orange-line', {
		height: '0%',
	});
	gsap.set('.grey-line', {
		height: '100%',
	});

	ScrollTrigger.create({
		trigger: '.dedicated-partner-grid',
		start: 'top 75%',
		onEnter: () => {
			gsap.to('.orange-circle', {
				background: '#ff872e',
				duration: 0.3,
				ease: 'power2.out',
			});
		},
		onLeaveBack: () => {
			gsap.to('.orange-circle', {
				background: '#d9d9d9',
				duration: 0.3,
				ease: 'power2.out',
			});
		},
	});

	gsap.to('.orange-line', {
		height: '100%',
		scrollTrigger: {
			trigger: '.dedicated-partner-grid',
			start: 'top 35%',
			end: 'bottom',
			scrub: 1,
		},
	});

	gsap.to('.grey-line', {
		height: '0%',
		scrollTrigger: {
			trigger: '.dedicated-partner-grid',
			start: 'top 35%',
			end: 'bottom',
			scrub: 1,
		},
	});
}

let isMobileFindPartner = window.innerWidth < 992;
if (!isMobileFindPartner) {
	setGsapScrollPartner();
}

window.addEventListener('resize', () => {
	isMobileFindPartner = window.innerWidth < 992;
	if (!isMobileFindPartner) {
		setGsapScrollPartner();
	}
});

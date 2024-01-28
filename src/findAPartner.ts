const filterDropdowns = document.querySelectorAll(
	'.filter-continent-c'
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
const dedicatedNumbers = document.querySelectorAll('[cd="dedicated-number"]');

function setGsapScrollPartner() {
	gsap.set('.orange-circle', {
		background: '#d9d9d9',
	});
	gsap.set('.orange-line', {
		height: '0%',
	});
	gsap.set('.grey-line', {
		height: '100%',
	});
	dedicatedNumbers.forEach((number) => {
		gsap.set(number, {
			color: '#4C4C4C',
		});
		ScrollTrigger.create({
			trigger: number,
			start: 'center center',
			onEnter: () => {
				gsap.to(number, {
					color: '#ff872e',
					duration: 0.3,
					ease: 'power2.out',
				});
			},
			onLeaveBack: () => {
				gsap.to(number, {
					color: '#4C4C4C',
					duration: 0.3,
					ease: 'power2.out',
				});
			},
		});
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

let isMobileFindPartner = window.innerWidth < 1025;
if (!isMobileFindPartner) {
	setGsapScrollPartner();
}

window.addEventListener('resize', () => {
	isMobileFindPartner = window.innerWidth < 1025;
	if (!isMobileFindPartner) {
		setGsapScrollPartner();
	}
});

//animated titles
const splitTitlesFind = document.querySelectorAll('[cd="animated-title"]');
const findSmallTitles = document.querySelectorAll('[cd="animated-line"]');

splitTitlesFind.forEach((title) => {
	const split = new SplitText(title, {
		type: 'lines, words',
		wordsClass: 'cd-word',
		linesClass: 'cd-line',
	});

	gsap.from(split.words, 1.8, {
		y: 140,
		ease: 'power4.out',
		skewY: 17,
		stagger: {
			amount: 0.3,
		},
		onStart: () => {
			gsap.set(title, { opacity: 1 });
		},
		scrollTrigger: {
			trigger: title,
			start: 'top 75%',
		},
	});
});

findSmallTitles.forEach((title) => {
	const split = new SplitText(title, {
		type: 'lines, words',
		wordsClass: 'cd-word',
		linesClass: 'cd-line',
	});

	gsap.from(split.words, {
		duration: 1,
		yPercent: 100,
		ease: 'power4.out',
		onStart: () => {
			gsap.set(title, { opacity: 1 });
		},
		scrollTrigger: {
			trigger: title,
			start: 'top 75%',
		},
	});
});

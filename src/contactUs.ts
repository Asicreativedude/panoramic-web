const splitTitlesContact = document.querySelectorAll('[cd="animated-title"]')!;
const contactTitles = document.querySelectorAll('[cd="animated-line"]')!;
const contactContent = document.querySelector('[cd="contact-content"]')!;
const heroContactTl = gsap.timeline({ paused: true });

heroContactTl.from(contactContent, {
	autoAlpha: 0,
	opacity: 0,
	y: 50,
	duration: 1,
	ease: 'power1.out',
});

ScrollTrigger.create({
	trigger: contactTitles,
	start: 'top 75%',
	onEnter: () => {
		if (!heroContactTl.isActive()) {
			heroContactTl.play();
		}
	},
});

splitTitlesContact.forEach((title) => {
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

contactTitles.forEach((title) => {
	const split = new SplitText(title, {
		type: 'lines, words',
		wordsClass: 'cd-word',
		linesClass: 'cd-line',
	});

	gsap.from(split.words, {
		duration: 1.8,
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

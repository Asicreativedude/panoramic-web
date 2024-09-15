//init video players
const controls = `
<div class="plyr__controls">
<button type="button" class="plyr__control cd-video-btn" aria-label="Play video" data-plyr="play">
	<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon--pressed" role="presentation">
		<circle cx="12" cy="12" r="11" stroke="white" stroke-width="2"/>
		<rect x="9" y="7" width="2" height="10" rx="1" fill="white"/>
		<rect x="13" y="7" width="2" height="10" rx="1" fill="white"/>
		<use xlink:href="#plyr-pause"></use>
	</svg>
	<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"  class="icon--not-pressed" role="presentation">
		<circle cx="12" cy="12" r="11" stroke="white" stroke-width="2"/>
		<path d="M15.5208 10.448L10.3052 7.4578C10.0248 7.29801 9.69847 7.30943 9.42826 7.49204C9.15805 7.67464 9 7.99421 9 8.34802V14.3342C9 14.688 9.15805 15.0076 9.42826 15.1902C9.57101 15.2872 9.73416 15.3385 9.89221 15.3385C10.0299 15.3385 10.1726 15.3043 10.3001 15.2301L15.5157 12.2399C15.8175 12.0687 16 11.7263 16 11.3497C16 10.973 15.8216 10.6192 15.5208 10.448Z" fill="white"/>
		<use xlink:href="#plyr-play"></use>
	</svg>
	<span class="cd-video-btn-text">Play Video</span>
    </button>

	`;
//@ts-ignore
const players = Array.from(document.querySelectorAll('.js-player')).map(
	(p) =>
		//@ts-ignore
		new Plyr(p, {
			controls,
		})
);
//@ts-ignore
const heroPlayer = new Plyr('.js-player-hero', {
	fullscreen: { iosNative: true },
});

const mobilePlayBtn = document.querySelector('.cd-video-btn.mobile-only')!;
mobilePlayBtn.addEventListener('click', () => {
	testimonialSwiper.slides[testimonialSwiper.activeIndex].querySelector(
		'video'
	)!.paused
		? (testimonialSwiper.slides[testimonialSwiper.activeIndex]
				.querySelector('video')!
				.play(),
		  (mobilePlayBtn.querySelector('.mobile-video-btn-text')!.textContent =
				'Pause Video'),
		  mobilePlayBtn
				.querySelector('.mobile-video-play-icon')!
				.classList.remove('active'),
		  mobilePlayBtn
				.querySelector('.mobile-video-pause-icon')!
				.classList.add('active'))
		: (testimonialSwiper.slides[testimonialSwiper.activeIndex]
				.querySelector('video')!
				.pause(),
		  (mobilePlayBtn.querySelector('.mobile-video-btn-text')!.textContent =
				'Play Video'),
		  mobilePlayBtn
				.querySelector('.mobile-video-play-icon')!
				.classList.add('active'),
		  mobilePlayBtn
				.querySelector('.mobile-video-pause-icon')!
				.classList.remove('active'));
});

const allVideos = document.querySelectorAll('.plyr--video');

allVideos.forEach((player) => {
	if (player.parentElement?.classList.contains('home-main-vid-embed')) return;
	player.addEventListener('click', () => {
		(player.querySelector('.cd-video-btn-text')! as HTMLSpanElement)
			.textContent === 'Play Video'
			? (((
					player.querySelector('.cd-video-btn-text')! as HTMLSpanElement
			  ).textContent = 'Pause Video'),
			  (document.querySelector('.mobile-video-btn-text')!.textContent =
					'Pause Video'),
			  mobilePlayBtn
					.querySelector('.mobile-video-play-icon')!
					.classList.remove('active'),
			  mobilePlayBtn
					.querySelector('.mobile-video-pause-icon')!
					.classList.add('active'))
			: (((
					player.querySelector('.cd-video-btn-text')! as HTMLSpanElement
			  ).textContent = 'Play Video'),
			  (document.querySelector('.mobile-video-btn-text')!.textContent =
					'Play Video'),
			  mobilePlayBtn
					.querySelector('.mobile-video-play-icon')!
					.classList.add('active'),
			  mobilePlayBtn
					.querySelector('.mobile-video-pause-icon')!
					.classList.remove('active'));
	});
});
//carousel
const swiperNavBtns = document.querySelectorAll(
	'.swiper-nav-btn'
) as NodeListOf<HTMLButtonElement>;

//@ts-ignore
const testimonialSwiper = new Swiper('.swiper', {
	// Optional parameters
	effect: 'fade',
	speed: 500,
	// If we need pagination
	pagination: {
		el: '.swiper-pagination',
		clickable: true,
	},

	// Navigation arrows
	navigation: {
		nextEl: '.swiper-btn-next',
		prevEl: '.swiper-btn-prev',
		disabledClass: 'disabled',
	},
});

testimonialSwiper.on('slideChange', () => {
	testimonialSwiper.slides[testimonialSwiper.activeIndex]
		.querySelector('video')!
		.pause();
	swiperNavBtns.forEach((btn) => {
		if (btn.classList.contains('disabled')) {
			btn.querySelector('.swiper-arrow-c')!.classList.add('disabled');
			btn.querySelector('.swiper-navigation-text')!.classList.add('hide');
		} else {
			btn.querySelector('.swiper-navigation-text')!.classList.remove('hide');
			btn.querySelector('.swiper-arrow-c')!.classList.remove('disabled');
		}
	});
	const nextSlide = testimonialSwiper.slides[testimonialSwiper.activeIndex + 1];
	const prevSlide = testimonialSwiper.slides[testimonialSwiper.activeIndex - 1];
	if (nextSlide) {
		const nextSlideText = nextSlide
			.querySelector('.testimonial-slide')!
			.getAttribute('testimonial-company');
		swiperNavBtns[1].querySelector('.testimonial-company-name')!.textContent =
			nextSlideText;
	}
	if (prevSlide) {
		const prevSlideText = prevSlide
			.querySelector('.testimonial-slide')!
			.getAttribute('testimonial-company');
		swiperNavBtns[0].querySelector('.testimonial-company-name')!.textContent =
			prevSlideText;
	}
});

swiperNavBtns.forEach((btn) => {
	btn.addEventListener('mouseover', () => {
		if (btn.classList.contains('disabled')) {
			return;
		}
		btn.querySelector('.swiper-arrow-c')!.classList.add('hover');
	});
	btn.addEventListener('mouseout', () => {
		btn.querySelector('.swiper-arrow-c')!.classList.remove('hover');
	});
});

function setGsapScroll() {
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
		trigger: '.home-solution-grid',
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
			trigger: '.home-solution-grid',
			start: 'top 35%',
			end: 'bottom',
			scrub: 1,
		},
	});

	gsap.to('.grey-line', {
		height: '0%',
		scrollTrigger: {
			trigger: '.home-solution-grid',
			start: 'top 35%',
			end: 'bottom',
			scrub: 1,
		},
	});
}

function setMobileGsapScroll() {
	const solutionLines = document.querySelectorAll('.solution-line-c');

	solutionLines.forEach((div) => {
		const orangeLine = div.querySelector('.orange-line')!;
		const greyLine = div.querySelector('.grey-line')!;
		const orangeCircle = div.querySelector('.orange-circle')!;

		gsap.set(orangeLine, {
			height: '0%',
		});
		gsap.set(greyLine, {
			height: '75%',
		});
		gsap.set(orangeCircle, {
			background: '#d9d9d9',
		});

		ScrollTrigger.create({
			trigger: div,
			start: 'top 75%',
			onEnter: () => {
				gsap.to(orangeCircle, {
					background: '#ff872e',
					duration: 0.3,
					ease: 'power2.out',
				});
			},
			onLeaveBack: () => {
				gsap.to(orangeCircle, {
					background: '#d9d9d9',
					duration: 0.3,
					ease: 'power2.out',
				});
			},
		});

		gsap.to(orangeLine, {
			height: '75%',
			scrollTrigger: {
				trigger: div,
				start: 'top center',
				end: 'bottom 35%',
				scrub: 1,
			},
		});

		gsap.to(greyLine, {
			height: '0%',
			scrollTrigger: {
				trigger: div,
				start: 'top center',
				end: 'bottom 35%',
				scrub: 1,
			},
		});
	});
}

const solutionVideos = document.querySelectorAll('.home-solution-video');

solutionVideos.forEach((video) => {
	ScrollTrigger.create({
		trigger: video,
		start: 'top 60%',
		end: 'bottom 50%',
		onEnter: () => {
			(video.querySelector('video')! as HTMLVideoElement).play();
		},
		onLeave: () => {
			(video.querySelector('video')! as HTMLVideoElement).pause();
		},
		onLeaveBack: () => {
			(video.querySelector('video')! as HTMLVideoElement).pause();
		},
		onEnterBack: () => {
			(video.querySelector('video')! as HTMLVideoElement).play();
		},
	});
});

//mobile

function setMobileTestimonialSwiperNavigation() {
	const distance = (
		document.querySelector('.testimonial-video-c') as HTMLDivElement
	).offsetHeight;
	(
		document.querySelector('.swiper-navigation-c') as HTMLDivElement
	).style.top = `${distance / 10 + 1.5}rem`;
}

function setExcellenceSwiper() {
	//@ts-ignore
	const testimonialSwiper = new Swiper('.excellence-grid-wrapper', {
		slidesPerView: 'auto',
		spaceBetween: 20,
		wrapperClass: 'excellence-grid',
		slideClass: 'excellence-item-c',
		scrollbar: {
			el: '.excellenceswiper-scrollbar',
		},
	});
}
let isMobileHome = window.innerWidth < 1025;

if (!isMobileHome) {
	setGsapScroll();
} else {
	setMobileTestimonialSwiperNavigation();
	setExcellenceSwiper();
	setMobileGsapScroll();
}

window.addEventListener('resize', () => {
	isMobileHome = window.innerWidth < 1025;
	if (!isMobileHome) {
		setGsapScroll();
	} else {
		setMobileTestimonialSwiperNavigation();
		setExcellenceSwiper();
		setMobileGsapScroll();
	}
});

//add class to jsGlobe
function addClassWhenInView(selector: string, className: string) {
	const observer = new IntersectionObserver(
		(entries, observer) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add(className);
					observer.unobserve(entry.target); // Optional: Stop observing once class is added
				}
			});
		},
		{
			threshold: 0.5, // Adjust this value based on how much of the element should be in view
		}
	);

	const elements = document.querySelectorAll(selector);
	elements.forEach((element) => {
		observer.observe(element);
	});
}

addClassWhenInView('.js-globe', 'in-view');

//animated titles
const splitTitlesHome = document.querySelectorAll('[cd="animated-title"]')!;
const homeHeroContent = document.querySelectorAll('[cd="home-hero-c"]')!;
const homeTitles = document.querySelectorAll('[cd="animated-line"]')!;
const heroHomeTl = gsap.timeline({ paused: true });

heroHomeTl.from(
	homeHeroContent,
	{
		autoAlpha: 0,
		opacity: 0,
		x: isMobileHome ? 15 : 50,
		duration: 1,
		ease: 'power1.out',
	},
	0.5
);

const solutionFirstLeft = document.querySelector(
	'[cd="home-solution-left-first"]'
)! as HTMLDivElement;
const solutionFirstRight = document.querySelector(
	'[cd="home-solution-right-first"]'
)! as HTMLDivElement;
const solutionFirstVid = document.querySelector(
	'[cd="home-solution-first-vid"]'
)! as HTMLDivElement;
const solutionLeft = document.querySelectorAll('[cd="home-solution-left"]')!;
const solutionRight = document.querySelectorAll('[cd="home-solution-right"]')!;
const solutionsCreatives = document.querySelectorAll(
	'[cd="home-solution-scale-in"]'
)!;
const homeSolutionFirstTl = gsap.timeline({ paused: true });

homeSolutionFirstTl
	.from(solutionFirstLeft, {
		autoAlpha: 0,
		xPercent: isMobileHome ? -10 : -25,
		duration: 1,
		ease: 'power4.out',
	})
	.from(
		solutionFirstRight,
		{
			autoAlpha: 0,
			xPercent: isMobileHome ? 5 : 10,
			duration: 1,
			ease: 'power4.out',
		},
		'<'
	)
	.from(
		solutionFirstVid,
		{
			autoAlpha: 0,
			scale: 1.3,
			duration: 1,
			ease: 'power4.out',
		},
		'<'
	);

ScrollTrigger.create({
	trigger: solutionFirstRight,
	start: 'top 75%',
	onEnter: () => {
		if (!homeSolutionFirstTl.isActive()) {
			homeSolutionFirstTl.play();
		}
	},
});

solutionLeft.forEach((div) => {
	const tl = gsap.timeline({ paused: true });
	tl.from(div, {
		xPercent: isMobileHome ? -10 : -25,
		duration: 1,
		ease: 'power2.out',
	});

	ScrollTrigger.create({
		trigger: div,
		start: div.classList.contains('home-solution-creative-c')
			? 'top 85%'
			: 'top 95%',
		onEnter: () => {
			if (!tl.isActive()) {
				tl.play();
			}
		},
	});
});

solutionRight.forEach((div) => {
	const tl = gsap.timeline({ paused: true });
	tl.from(div, {
		xPercent: isMobileHome ? 10 : 25,
		duration: 1,
		ease: 'power2.out',
	});
	ScrollTrigger.create({
		trigger: div,
		start: div.classList.contains('home-solution-creative-c')
			? 'top 85%'
			: 'top 95%',
		onEnter: () => {
			if (!tl.isActive()) {
				tl.play();
			}
		},
	});
});

solutionsCreatives.forEach((div) => {
	const tl = gsap.timeline({ paused: true });
	tl.from(div, {
		scale: 1.1,
		duration: 1,
		ease: 'power2.out',
	});
	ScrollTrigger.create({
		trigger: div,
		start: 'top 85%',
		onEnter: () => {
			if (!tl.isActive()) {
				tl.play();
			}
		},
	});
});

const benefitsImg = gsap.utils.toArray(
	'[cd="benefit-img"]'
) as HTMLImageElement[];
ScrollTrigger.create({
	trigger: '.home-power-solution-cards',
	start: 'top 75%',
	onEnter: () => {
		if (
			(
				document.querySelector('.home-power-solution-cards') as HTMLDivElement
			).classList.contains('in-view')
		)
			return;
		benefitsImg.forEach((img) => {
			gsap.set(img, {
				opacity: 1,
			});
			gsap.from(img, {
				opacity: 0,
				yPercent: isMobileHome ? 5 : 15,
				duration: 1,
				ease: 'power4.out',
				onComplete: () => {
					(
						document.querySelector(
							'.home-power-solution-cards'
						) as HTMLDivElement
					).classList.add('in-view');
				},
			});
		});
	},
});

const scaleIn = document.querySelectorAll('[cd="scale-in"]')!;

scaleIn.forEach((div) => {
	const tl = gsap.timeline({ paused: true });
	tl.to(div, {
		scale: 1,
		duration: 1,
		ease: 'power2.out',
	});
	ScrollTrigger.create({
		trigger: div,
		start: 'top 75%',
		onEnter: () => {
			if (!tl.isActive()) {
				tl.play();
			}
		},
	});
});

// //loading animation
// const letters = document.querySelectorAll('.logo-letters')!;
// const mainLetter = document.querySelector('.logo-main-letter')!;
// const lettersWrapepr = document.querySelector('.logo-letters-c')!;
// const loader = document.querySelector('.loading-s')!;
// const logoTl = gsap.timeline();
// logoTl
// 	.from(mainLetter, {
// 		transformOrigin: 'center center',
// 		autoAlpha: 0,
// 		opacity: 0,
// 		scale: 0,
// 		duration: 1,
// 		ease: 'power2.out',
// 	})
// 	.to(mainLetter, {
// 		x: 0,
// 		duration: 1,
// 		ease: 'power2.out',
// 		delay: 0.3,
// 	})
// 	.to(
// 		letters,
// 		{
// 			x: 0,
// 			duration: 1,
// 			ease: 'power2.out',
// 		},
// 		'<+0.1'
// 	)
// 	.to(
// 		lettersWrapepr,
// 		{
// 			x: 0,
// 			duration: 1,
// 			ease: 'power2.out',
// 		},
// 		'<'
// 	)
// 	.to(
// 		letters,
// 		{
// 			opacity: 1,
// 			duration: 1,
// 			ease: 'power2.out',
// 		},
// 		'<+0.1'
// 	)
// 	.to(loader, {
// 		opacity: 0,
// 		duration: 0.5,
// 		ease: 'power2.out',
// 		onComplete: () => {
// 			loader.classList.add('hide');
splitTitlesHome.forEach((title) => {
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

	ScrollTrigger.create({
		trigger: title,
		start: 'top 75%',
		onEnter: () => {
			if (!heroHomeTl.isActive()) {
				heroHomeTl.play();
			}
		},
	});
});

homeTitles.forEach((title) => {
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
// 		},
// 	});

// show video popup
const showVideoBtn = document.getElementById('show-vid')!;
const videoPopup = document.querySelector('.video-popup-s')!;
const videoPopupClose = document.querySelector('.video-popup-close')!;
const videoPopupVideo = document.getElementById('hero-vid') as HTMLVideoElement;

showVideoBtn.addEventListener('click', () => {
	videoPopup.classList.add('visible');
	videoPopupVideo.play();
	(document.getElementById('home-hero-vid')! as HTMLVideoElement).pause();
});

videoPopupClose.addEventListener('click', () => {
	videoPopup.classList.remove('visible');
	videoPopupVideo.pause();
	(document.getElementById('home-hero-vid')! as HTMLVideoElement).play();
});

//nav colors animations
const nav = document.querySelector('.nav-s')!;
const heroHeight = document.querySelector('.home-hero-s')!.clientHeight;
window.addEventListener('scroll', () => {
	if (window.scrollY > heroHeight) {
		nav.querySelector('.nav-button')!.classList.remove('white');
		nav.querySelector('.nav-logo-c')!.classList.remove('white');
		nav.querySelector('.nav-logo-divider')!.classList.remove('white');
		nav.querySelector('.nav-log-panoramic')!.classList.remove('white');
	} else {
		nav.querySelector('.nav-button')!.classList.add('white');
		nav.querySelector('.nav-logo-c')!.classList.add('white');
		nav.querySelector('.nav-logo-divider')!.classList.add('white');
		nav.querySelector('.nav-log-panoramic')!.classList.add('white');
	}
});

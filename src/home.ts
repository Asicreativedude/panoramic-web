import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
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
		<path d="M15.5208 10.448L10.3052 7.4578C10.0248 7.29801 9.69847 7.30943 9.42826 7.49204C9.15805 7.67464 9 7.99421 9 8.34802V14.3342C9 14.688 9.15805 15.0076 9.42826 15.1902C9.57101 15.2872 9.73416 15.3385 9.89221 15.3385C10.0299 15.3385 10.1726 15.3043 10.3001 15.2301L15.5157 12.2399C15.8165 12.0687 16 11.7263 16 11.3497C16 10.973 15.8216 10.6192 15.5208 10.448Z" fill="white"/>
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
let isMobileHome = window.innerWidth < 992;

if (!isMobileHome) {
	setGsapScroll();
} else {
	setMobileTestimonialSwiperNavigation();
	setExcellenceSwiper();
}

window.addEventListener('resize', () => {
	isMobileHome = window.innerWidth < 992;
	if (!isMobileHome) {
		setGsapScroll();
	} else {
		setMobileTestimonialSwiperNavigation();
		setExcellenceSwiper();
	}
});

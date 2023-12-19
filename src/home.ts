//init video players
const controls = `
<div class="plyr__controls">
    <button type="button" class="cd-video-btn" aria-label="Play video" data-plyr="play">
        Play Video
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="12" cy="12" r="11" stroke="white" stroke-width="2"/>
<path d="M15.5208 10.448L10.3052 7.4578C10.0248 7.29801 9.69847 7.30943 9.42826 7.49204C9.15805 7.67464 9 7.99421 9 8.34802V14.3342C9 14.688 9.15805 15.0076 9.42826 15.1902C9.57101 15.2872 9.73416 15.3385 9.89221 15.3385C10.0299 15.3385 10.1726 15.3043 10.3001 15.2301L15.5157 12.2399C15.8165 12.0687 16 11.7263 16 11.3497C16 10.973 15.8216 10.6192 15.5208 10.448Z" fill="white"/>
<use xlink:href="#plyr-play"></use>
</svg>
    </button>`;

const players = Array.from(document.querySelectorAll('.js-player')).map(
	(p) =>
		//@ts-ignore
		new Plyr(p, {
			controls,
		})
);

//carousel
const swiperNavBtns = document.querySelectorAll(
	'.swiper-nav-btn'
) as NodeListOf<HTMLButtonElement>;

//@ts-ignore
const swiper = new Swiper('.swiper', {
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

swiper.on('slideChange', () => {
	swiperNavBtns.forEach((btn) => {
		if (btn.classList.contains('disabled')) {
			btn.querySelector('.swiper-arrow-c')!.classList.add('disabled');
			btn.querySelector('.swiper-navigation-text')!.classList.add('hide');
		} else {
			btn.querySelector('.swiper-navigation-text')!.classList.remove('hide');
			btn.querySelector('.swiper-arrow-c')!.classList.remove('disabled');
		}
	});
	const nextSlide = swiper.slides[swiper.activeIndex + 1];
	const prevSlide = swiper.slides[swiper.activeIndex - 1];
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

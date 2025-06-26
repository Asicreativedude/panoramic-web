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
  console.log(players[testimonialSwiper.activeIndex + 1]);
  players[testimonialSwiper.activeIndex + 1].paused
    ? (players[testimonialSwiper.activeIndex + 1].play(),
      (mobilePlayBtn.querySelector('.mobile-video-btn-text')!.textContent =
        'Pause Video'),
      mobilePlayBtn
        .querySelector('.mobile-video-play-icon')!
        .classList.remove('active'),
      mobilePlayBtn
        .querySelector('.mobile-video-pause-icon')!
        .classList.add('active'))
    : (players[testimonialSwiper.activeIndex + 1].pause(),
      (mobilePlayBtn.querySelector('.mobile-video-btn-text')!.textContent =
        'Play Video'),
      mobilePlayBtn
        .querySelector('.mobile-video-play-icon')!
        .classList.add('active'),
      mobilePlayBtn
        .querySelector('.mobile-video-pause-icon')!
        .classList.remove('active'));
});

players.forEach((player) => {
  player.on('play', () => {
    player.elements.container.querySelector('.cd-video-btn-text')!.textContent =
      'Pause Video';
    // 			? (((
    // 					player.querySelector('.cd-video-btn-text')! as HTMLSpanElement
    // 			  ).textContent = 'Pause Video'),
    // 			  (document.querySelector('.mobile-video-btn-text')!.textContent =
    // 					'Pause Video'),
    // 			  mobilePlayBtn
    // 					.querySelector('.mobile-video-play-icon')!
    // 					.classList.remove('active'),
    // 			  mobilePlayBtn
    // 					.querySelector('.mobile-video-pause-icon')!
    // 					.classList.add('active'))
    // 			: (((
    // 					player.querySelector('.cd-video-btn-text')! as HTMLSpanElement
    // 			  ).textContent = 'Play Video'),
    // 			  (document.querySelector('.mobile-video-btn-text')!.textContent =
    // 					'Play Video'),
    // 			  mobilePlayBtn
    // 					.querySelector('.mobile-video-play-icon')!
    // 					.classList.add('active'),
    // 			  mobilePlayBtn
    // 					.querySelector('.mobile-video-pause-icon')!
    // 					.classList.remove('active'));
  });
  player.on('pause', () => {
    player.elements.container.querySelector('.cd-video-btn-text')!.textContent =
      'Play Video';
  });
});
// const allVideos = document.querySelectorAll('.plyr--video');

// allVideos.forEach((player) => {
// 	if (player.parentElement?.classList.contains('home-main-vid-embed')) return;
// 	player.addEventListener('click', () => {
// 		(player.querySelector('.cd-video-btn-text')! as HTMLSpanElement)
// 			.textContent === 'Play Video'
// 			? (((
// 					player.querySelector('.cd-video-btn-text')! as HTMLSpanElement
// 			  ).textContent = 'Pause Video'),
// 			  (document.querySelector('.mobile-video-btn-text')!.textContent =
// 					'Pause Video'),
// 			  mobilePlayBtn
// 					.querySelector('.mobile-video-play-icon')!
// 					.classList.remove('active'),
// 			  mobilePlayBtn
// 					.querySelector('.mobile-video-pause-icon')!
// 					.classList.add('active'))
// 			: (((
// 					player.querySelector('.cd-video-btn-text')! as HTMLSpanElement
// 			  ).textContent = 'Play Video'),
// 			  (document.querySelector('.mobile-video-btn-text')!.textContent =
// 					'Play Video'),
// 			  mobilePlayBtn
// 					.querySelector('.mobile-video-play-icon')!
// 					.classList.add('active'),
// 			  mobilePlayBtn
// 					.querySelector('.mobile-video-pause-icon')!
// 					.classList.remove('active'));
// 	});
// });
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
  // testimonialSwiper.slides[testimonialSwiper.activeIndex]
  // 	.querySelector('video')!
  // 	.pause();
  players[testimonialSwiper.activeIndex].pause();
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
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
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

const popover = document.querySelector('.popover-s')! as HTMLElement;
const popoverClose = document.querySelector('.popover-close-icon')!;

popoverClose.addEventListener('click', () => {
  popover.hidePopover();
});
//add countires to popover
const countriesSelectPopocer = document.getElementById('country-select')!;
countriesSelectPopocer.innerHTML = `
            <option></option>
            <option value="Afghanistan">Afghanistan</option>
            <option value="Åland Islands">Åland Islands</option>
            <option value="Albania">Albania</option>
            <option value="Algeria">Algeria</option>
            <option value="American Samoa">American Samoa</option>
            <option value="Andorra">Andorra</option>
            <option value="Angola">Angola</option>
            <option value="Anguilla">Anguilla</option>
            <option value="Antarctica">Antarctica</option>
            <option value="Antigua and Barbuda">Antigua and Barbuda</option>
            <option value="Argentina">Argentina</option>
            <option value="Armenia">Armenia</option>
            <option value="Aruba">Aruba</option>
            <option value="Australia">Australia</option>
            <option value="Austria">Austria</option>
            <option value="Azerbaijan">Azerbaijan</option>
            <option value="Bahamas">Bahamas</option>
            <option value="Bahrain">Bahrain</option>
            <option value="Bangladesh">Bangladesh</option>
            <option value="Barbados">Barbados</option>
            <option value="Belarus">Belarus</option>
            <option value="Belgium">Belgium</option>
            <option value="Belize">Belize</option>
            <option value="Benin">Benin</option>
            <option value="Bermuda">Bermuda</option>
            <option value="Bhutan">Bhutan</option>
            <option value="Bolivia">Bolivia</option>
            <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
            <option value="Botswana">Botswana</option>
            <option value="Bouvet Island">Bouvet Island</option>
            <option value="Brazil">Brazil</option>
            <option value="British Indian Ocean Territory">British Indian Ocean Territory</option>
            <option value="Brunei Darussalam">Brunei Darussalam</option>
            <option value="Bulgaria">Bulgaria</option>
            <option value="Burkina Faso">Burkina Faso</option>
            <option value="Burundi">Burundi</option>
            <option value="Cambodia">Cambodia</option>
            <option value="Cameroon">Cameroon</option>
            <option value="Canada">Canada</option>
            <option value="Cape Verde">Cape Verde</option>
            <option value="Cayman Islands">Cayman Islands</option>
            <option value="Central African Republic">Central African Republic</option>
            <option value="Chad">Chad</option>
            <option value="Chile">Chile</option>
            <option value="China">China</option>
            <option value="Christmas Island">Christmas Island</option>
            <option value="Cocos (Keeling) Islands">Cocos (Keeling) Islands</option>
            <option value="Colombia">Colombia</option>
            <option value="Comoros">Comoros</option>
            <option value="Congo">Congo</option>
            <option value="Congo, The Democratic Republic of The">Congo, The Democratic Republic of The</option>
            <option value="Cook Islands">Cook Islands</option>
            <option value="Costa Rica">Costa Rica</option>
            <option value="Cote D'ivoire">Cote D'ivoire</option>
            <option value="Croatia">Croatia</option>
            <option value="Cuba">Cuba</option>
            <option value="Cyprus">Cyprus</option>
            <option value="Czech Republic">Czech Republic</option>
            <option value="Denmark">Denmark</option>
            <option value="Djibouti">Djibouti</option>
            <option value="Dominica">Dominica</option>
            <option value="Dominican Republic">Dominican Republic</option>
            <option value="Ecuador">Ecuador</option>
            <option value="Egypt">Egypt</option>
            <option value="El Salvador">El Salvador</option>
            <option value="Equatorial Guinea">Equatorial Guinea</option>
            <option value="Eritrea">Eritrea</option>
            <option value="Estonia">Estonia</option>
            <option value="Ethiopia">Ethiopia</option>
            <option value="Falkland Islands (Malvinas)">Falkland Islands (Malvinas)</option>
            <option value="Faroe Islands">Faroe Islands</option>
            <option value="Fiji">Fiji</option>
            <option value="Finland">Finland</option>
            <option value="France">France</option>
            <option value="French Guiana">French Guiana</option>
            <option value="French Polynesia">French Polynesia</option>
            <option value="French Southern Territories">French Southern Territories</option>
            <option value="Gabon">Gabon</option>
            <option value="Gambia">Gambia</option>
            <option value="Georgia">Georgia</option>
            <option value="Germany">Germany</option>
            <option value="Ghana">Ghana</option>
            <option value="Gibraltar">Gibraltar</option>
            <option value="Greece">Greece</option>
            <option value="Greenland">Greenland</option>
            <option value="Grenada">Grenada</option>
            <option value="Guadeloupe">Guadeloupe</option>
            <option value="Guam">Guam</option>
            <option value="Guatemala">Guatemala</option>
            <option value="Guernsey">Guernsey</option>
            <option value="Guinea">Guinea</option>
            <option value="Guinea-bissau">Guinea-bissau</option>
            <option value="Guyana">Guyana</option>
            <option value="Haiti">Haiti</option>
            <option value="Heard Island and Mcdonald Islands">Heard Island and Mcdonald Islands</option>
            <option value="Holy See (Vatican City State)">Holy See (Vatican City State)</option>
            <option value="Honduras">Honduras</option>
            <option value="Hong Kong">Hong Kong</option>
            <option value="Hungary">Hungary</option>
            <option value="Iceland">Iceland</option>
            <option value="India">India</option>
            <option value="Indonesia">Indonesia</option>
            <option value="Iran, Islamic Republic of">Iran, Islamic Republic of</option>
            <option value="Iraq">Iraq</option>
            <option value="Ireland">Ireland</option>
            <option value="Isle of Man">Isle of Man</option>
            <option value="Israel">Israel</option>
            <option value="Italy">Italy</option>
            <option value="Jamaica">Jamaica</option>
            <option value="Japan">Japan</option>
            <option value="Jersey">Jersey</option>
            <option value="Jordan">Jordan</option>
            <option value="Kazakhstan">Kazakhstan</option>
            <option value="Kenya">Kenya</option>
            <option value="Kiribati">Kiribati</option>
            <option value="Korea, Democratic People's Republic of">Korea, Democratic People's Republic of</option>
            <option value="Korea, Republic of">Korea, Republic of</option>
            <option value="Kuwait">Kuwait</option>
            <option value="Kyrgyzstan">Kyrgyzstan</option>
            <option value="Lao People's Democratic Republic">Lao People's Democratic Republic</option>
            <option value="Latvia">Latvia</option>
            <option value="Lebanon">Lebanon</option>
            <option value="Lesotho">Lesotho</option>
            <option value="Liberia">Liberia</option>
            <option value="Libyan Arab Jamahiriya">Libyan Arab Jamahiriya</option>
            <option value="Liechtenstein">Liechtenstein</option>
            <option value="Lithuania">Lithuania</option>
            <option value="Luxembourg">Luxembourg</option>
            <option value="Macao">Macao</option>
            <option value="Macedonia, The Former Yugoslav Republic of">Macedonia, The Former Yugoslav Republic of</option>
            <option value="Madagascar">Madagascar</option>
            <option value="Malawi">Malawi</option>
            <option value="Malaysia">Malaysia</option>
            <option value="Maldives">Maldives</option>
            <option value="Mali">Mali</option>
            <option value="Malta">Malta</option>
            <option value="Marshall Islands">Marshall Islands</option>
            <option value="Martinique">Martinique</option>
            <option value="Mauritania">Mauritania</option>
            <option value="Mauritius">Mauritius</option>
            <option value="Mayotte">Mayotte</option>
            <option value="Mexico">Mexico</option>
            <option value="Micronesia, Federated States of">Micronesia, Federated States of</option>
            <option value="Moldova, Republic of">Moldova, Republic of</option>
            <option value="Monaco">Monaco</option>
            <option value="Mongolia">Mongolia</option>
            <option value="Montenegro">Montenegro</option>
            <option value="Montserrat">Montserrat</option>
            <option value="Morocco">Morocco</option>
            <option value="Mozambique">Mozambique</option>
            <option value="Myanmar">Myanmar</option>
            <option value="Namibia">Namibia</option>
            <option value="Nauru">Nauru</option>
            <option value="Nepal">Nepal</option>
            <option value="Netherlands">Netherlands</option>
            <option value="Netherlands Antilles">Netherlands Antilles</option>
            <option value="New Caledonia">New Caledonia</option>
            <option value="New Zealand">New Zealand</option>
            <option value="Nicaragua">Nicaragua</option>
            <option value="Niger">Niger</option>
            <option value="Nigeria">Nigeria</option>
            <option value="Niue">Niue</option>
            <option value="Norfolk Island">Norfolk Island</option>
            <option value="Northern Mariana Islands">Northern Mariana Islands</option>
            <option value="Norway">Norway</option>
            <option value="Oman">Oman</option>
            <option value="Pakistan">Pakistan</option>
            <option value="Palau">Palau</option>
            <option value="Palestinian Territory, Occupied">Palestinian Territory, Occupied</option>
            <option value="Panama">Panama</option>
            <option value="Papua New Guinea">Papua New Guinea</option>
            <option value="Paraguay">Paraguay</option>
            <option value="Peru">Peru</option>
            <option value="Philippines">Philippines</option>
            <option value="Pitcairn">Pitcairn</option>
            <option value="Poland">Poland</option>
            <option value="Portugal">Portugal</option>
            <option value="Puerto Rico">Puerto Rico</option>
            <option value="Qatar">Qatar</option>
            <option value="Reunion">Reunion</option>
            <option value="Romania">Romania</option>
            <option value="Russian Federation">Russian Federation</option>
            <option value="Rwanda">Rwanda</option>
            <option value="Saint Helena">Saint Helena</option>
            <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
            <option value="Saint Lucia">Saint Lucia</option>
            <option value="Saint Pierre and Miquelon">Saint Pierre and Miquelon</option>
            <option value="Saint Vincent and The Grenadines">Saint Vincent and The Grenadines</option>
            <option value="Samoa">Samoa</option>
            <option value="San Marino">San Marino</option>
            <option value="Sao Tome and Principe">Sao Tome and Principe</option>
            <option value="Saudi Arabia">Saudi Arabia</option>
            <option value="Senegal">Senegal</option>
            <option value="Serbia">Serbia</option>
            <option value="Seychelles">Seychelles</option>
            <option value="Sierra Leone">Sierra Leone</option>
            <option value="Singapore">Singapore</option>
            <option value="Slovakia">Slovakia</option>
            <option value="Slovenia">Slovenia</option>
            <option value="Solomon Islands">Solomon Islands</option>
            <option value="Somalia">Somalia</option>
            <option value="South Africa">South Africa</option>
            <option value="South Georgia and The South Sandwich Islands">South Georgia and The South Sandwich Islands</option>
            <option value="Spain">Spain</option>
            <option value="Sri Lanka">Sri Lanka</option>
            <option value="Sudan">Sudan</option>
            <option value="Suriname">Suriname</option>
            <option value="Svalbard and Jan Mayen">Svalbard and Jan Mayen</option>
            <option value="Swaziland">Swaziland</option>
            <option value="Sweden">Sweden</option>
            <option value="Switzerland">Switzerland</option>
            <option value="Syrian Arab Republic">Syrian Arab Republic</option>
            <option value="Taiwan">Taiwan</option>
            <option value="Tajikistan">Tajikistan</option>
            <option value="Tanzania, United Republic of">Tanzania, United Republic of</option>
            <option value="Thailand">Thailand</option>
            <option value="Timor-leste">Timor-leste</option>
            <option value="Togo">Togo</option>
            <option value="Tokelau">Tokelau</option>
            <option value="Tonga">Tonga</option>
            <option value="Trinidad and Tobago">Trinidad and Tobago</option>
            <option value="Tunisia">Tunisia</option>
            <option value="Turkey">Turkey</option>
            <option value="Turkmenistan">Turkmenistan</option>
            <option value="Turks and Caicos Islands">Turks and Caicos Islands</option>
            <option value="Tuvalu">Tuvalu</option>
            <option value="Uganda">Uganda</option>
            <option value="Ukraine">Ukraine</option>
            <option value="United Arab Emirates">United Arab Emirates</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="United States">United States</option>
            <option value="United States Minor Outlying Islands">United States Minor Outlying Islands</option>
            <option value="Uruguay">Uruguay</option>
            <option value="Uzbekistan">Uzbekistan</option>
            <option value="Vanuatu">Vanuatu</option>
            <option value="Venezuela">Venezuela</option>
            <option value="Viet Nam">Viet Nam</option>
            <option value="Virgin Islands, British">Virgin Islands, British</option>
            <option value="Virgin Islands, U.S.">Virgin Islands, U.S.</option>
            <option value="Wallis and Futuna">Wallis and Futuna</option>
            <option value="Western Sahara">Western Sahara</option>
            <option value="Yemen">Yemen</option>
            <option value="Zambia">Zambia</option>
			<option value="Zimbabwe">Zimbabwe</option>`;

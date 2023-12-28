//@ts-ignore
const webflowBe = window.Webflow || [];
webflowBe.push(function () {
	const audioPlayers = document.querySelectorAll('.audio-player');
	const stopAllAudioPlayers = (except?: HTMLAudioElement) => {
		audioPlayers.forEach((player) => {
			const audio: HTMLAudioElement = player.querySelector('.audio')!;
			const pauseIcon: SVGAElement = player.querySelector('.pause-icon')!;
			const playIcon: SVGAElement = player.querySelector('.play-icon')!;
			const playerContainer: HTMLElement = player.parentElement!.parentElement!;
			const muteBtn: SVGAElement = player.querySelector('.volume-icon')!;
			if (audio !== except) {
				audio.pause();
				const playPauseButton: HTMLButtonElement =
					player.querySelector('.play-pause')!;
				playPauseButton.classList.remove('pause');
				playPauseButton.classList.add('play');
				pauseIcon.classList.remove('active');
				playIcon.classList.add('active');
				player.classList.remove('active');
				player.querySelector('.current-time')!.classList.remove('active');
				player.querySelector('.duration')!.classList.add('active');
				player.querySelector('.volume-icon')!.classList.remove('active');
				playerContainer.classList.remove('active');
				muteBtn.style.color = '#1a1a1a';
			}
		});
	};

	audioPlayers.forEach((player) => {
		const audio: HTMLAudioElement = player.querySelector('.audio')!;
		const playPauseButton: HTMLButtonElement =
			player.querySelector('.play-pause')!;
		const pauseIcon: SVGAElement = player.querySelector('.pause-icon')!;
		const playIcon: SVGAElement = player.querySelector('.play-icon')!;
		const progressBarContainer: HTMLDivElement = player.querySelector(
			'.progress-container'
		)!;
		const svg: SVGSVGElement = player.querySelector('.progress-svg')!;
		const currentTimeElement: HTMLSpanElement =
			player.querySelector('.current-time')!;
		const durationElement: HTMLSpanElement = player.querySelector('.duration')!;
		const playerContainer: HTMLElement = player.parentElement!.parentElement!;
		const muteBtn: SVGAElement = player.querySelector('.volume-icon')!;
		muteBtn.addEventListener('click', () => {
			if (audio.muted) {
				audio.muted = false;
				muteBtn.querySelector('.volume-icon-off')!.classList.remove('active');
				muteBtn.querySelector('.volume-icon-on')!.classList.add('active');
			} else {
				audio.muted = true;
				muteBtn.querySelector('.volume-icon-off')!.classList.add('active');
				muteBtn.querySelector('.volume-icon-on')!.classList.remove('active');
			}
		});
		playPauseButton.addEventListener('click', () => {
			if (audio.paused) {
				stopAllAudioPlayers(audio);
				audio.play();
				playPauseButton.classList.add('pause');
				playPauseButton.classList.remove('play');
				pauseIcon.classList.add('active');
				playIcon.classList.remove('active');
				player.classList.add('active');
				player.querySelector('.current-time')!.classList.add('active');
				player.querySelector('.duration')!.classList.remove('active');
				player.querySelector('.volume-icon')!.classList.add('active');
				playerContainer.classList.add('active');
				muteBtn.style.color = 'white';
			} else {
				audio.pause();
				playPauseButton.classList.remove('pause');
				playPauseButton.classList.add('play');
				pauseIcon.classList.remove('active');
				playIcon.classList.add('active');
				player.classList.remove('active');
				player.querySelector('.current-time')!.classList.remove('active');
				player.querySelector('.duration')!.classList.add('active');
				player.querySelector('.volume-icon')!.classList.remove('active');
				playerContainer.classList.remove('active');
				muteBtn.style.color = '#1a1a1a';
			}
		});

		audio.addEventListener('timeupdate', () => {
			updateProgressBar(audio, svg, currentTimeElement, durationElement);
		});

		progressBarContainer.addEventListener('click', (e) => {
			const rect: DOMRect = progressBarContainer.getBoundingClientRect();
			const clickPosition: number = (e.clientX - rect.left) / rect.width;
			const clickTime: number = clickPosition * audio.duration;
			audio.currentTime = clickTime;
		});
	});

	function updateProgressBar(
		audio: HTMLAudioElement,
		svg: SVGSVGElement,
		currentTimeElement: HTMLSpanElement,
		durationElement: HTMLSpanElement
	): void {
		const percentage: number = (audio.currentTime / audio.duration) * 100;
		const rects: NodeListOf<SVGRectElement> =
			svg.querySelectorAll('.progress-rect');
		const totalRects: number = rects.length;
		const rectsToFill: number = Math.ceil((percentage / 100) * totalRects);

		if (audio.paused) {
			rects.forEach((rect, index) => {
				if (index < rectsToFill) {
					rect.setAttribute('fill', '#1a1a1a'); // New fill color for filled rects
					rect.setAttribute('opacity', '1');
				} else {
					rect.setAttribute('fill', '#1a1a1a'); // Original fill color for unfilled rects
					rect.setAttribute('opacity', '0.66');
				}
			});
		} else {
			rects.forEach((rect, index) => {
				if (index < rectsToFill) {
					rect.setAttribute('fill', 'white'); // New fill color for filled rects
					rect.setAttribute('opacity', '1');
				} else {
					rect.setAttribute('fill', 'white'); // Original fill color for unfilled rects
					rect.setAttribute('opacity', '0.5');
				}
			});
		}

		currentTimeElement.textContent = formatTime(audio.currentTime);
		if (!audio.duration) {
			durationElement.textContent = 'Loading...';
		} else {
			durationElement.textContent = formatTime(audio.duration);
		}
	}

	function formatTime(seconds: number): string {
		const min: number = Math.floor(seconds / 60);
		const sec: number = Math.floor(seconds % 60);
		return `${min}:${sec < 10 ? '0' + sec : sec}`;
	}

	// set program benefits swiper
	function setPagesSwipers() {
		//@ts-ignore
		const benefitsSwiper = new Swiper('.program-benefits-grid-wrapper', {
			slidesPerView: 'auto',
			spaceBetween: 20,
			wrapperClass: 'program-benefits-grid',
			slideClass: 'program-benefit-item',
			scrollbar: {
				el: '.program-benefits-scrollbar',
			},
		});

		//@ts-ignore
		const partnerTestimonialSwiper = new Swiper(
			'.partner-testimonials-grid-wrapper',
			{
				slidesPerView: 'auto',
				spaceBetween: 20,
				wrapperClass: 'partner-testimonials-grid',
				slideClass: 'partner-testimonial-item-c',
				scrollbar: {
					el: '.partner-testimonial-scrollbar',
				},
			}
		);
	}

	let isMobileBePartner = window.innerWidth < 992;
	if (isMobileBePartner) {
		setPagesSwipers();
	}

	window.addEventListener('resize', () => {
		isMobileBePartner = window.innerWidth < 992;
		if (isMobileBePartner) {
			setPagesSwipers();
		}
	});
});

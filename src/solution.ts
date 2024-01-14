const containers = document.querySelectorAll(
	'.data-integration-slide'
)! as NodeListOf<HTMLDivElement>;

//@ts-ignore
const solutionSwiper = new Swiper('.data-integration-slider-c', {
	// Optional parameters
	effect: 'fade',
	speed: 500,
	slideClass: 'data-integration-slide',
	wrapperClass: 'data-integration-track',
	slideActiveClass: 'isActive',
	loop: true,
	autoplay: {
		delay: 4000,
	},
	allowTouchMove: false,
});
let firstload = false;
containers.forEach((container, index) => {
	const popupImg = container.querySelector('.data-integration-info-img')!;
	const path = container.querySelector(
		'#data-integration-path'
	)! as SVGPathElement;
	const markers = container.querySelectorAll('.data-integration-mark');

	gsap.set(popupImg, {
		opacity: 0,
		yPercent: -20,
	});
	gsap.set(markers, {
		scale: 0,
		transformOrigin: 'center',
		opacity: 0,
	});
	const paths = splitPaths(path);
	const duration = 2;
	let distance = 0;

	const tl = gsap.timeline({
		id: `solution-${index}`,
		onComplete: () => {
			setTimeout(() => {
				tl.restart();
				tl.pause();
			}, 2500);
		},
	});
	if (index !== 0 && !firstload) {
		tl.pause();
		firstload = true;
	}
	paths.forEach((segment) => (distance += segment.getTotalLength()));
	paths.forEach((segment) => {
		tl.from(
			segment,
			{
				drawSVG: 0,
				ease: 'power2.out',
				duration: duration * (segment.getTotalLength() / distance),
			},
			0.5
		);
	});
	tl.to(
		markers,
		{
			scale: 1,
			opacity: 1,
			duration: 0.5,
			ease: 'power2.out',
		},
		0
	).to(
		popupImg,
		{
			duration: 0.5,
			opacity: 1,
			yPercent: 0,
			ease: 'power2.out',
		},
		'-=0.5'
	);
});

solutionSwiper.on('slideChangeTransitionEnd', (e: any) => {
	gsap.globalTimeline.getChildren().forEach((child) => {
		if (!child.vars.id) return;
		if (child.vars.id === `solution-${e.realIndex}`) {
			child.play();
		} else {
			child.pause();
		}
	});
});
solutionSwiper.on('slideChangeTransitionStart', (e: any) => {
	e.slides.forEach((slide: HTMLDivElement) => {
		if (!slide.classList.contains('isActive') && firstload) {
			setTimeout(() => {
				gsap.set(slide.querySelector('.data-integration-info-img'), {
					opacity: 0,
					yPercent: -20,
				});
				gsap.set(slide.querySelector('.data-integration-mark'), {
					scale: 0,
					transformOrigin: 'center',
					opacity: 0,
				});
			}, 150);
		}
	});
});

function splitPaths(
	paths: string | SVGPathElement | SVGPathElement[]
): SVGPathElement[] {
	let toSplit = gsap.utils.toArray(paths) as SVGPathElement[],
		newPaths: SVGPathElement[] = [];

	if (toSplit.length > 1) {
		toSplit.forEach((path) => newPaths.push(...splitPaths(path)));
	} else {
		let path = toSplit[0],
			rawPath = MotionPathPlugin.getRawPath(path),
			parent = path.parentNode,
			attributes = [].slice.call(path.attributes) as Attr[];

		newPaths = rawPath.map((segment) => {
			let newPath = document.createElementNS(
					'http://www.w3.org/2000/svg',
					'path'
				) as SVGPathElement,
				i = attributes.length;

			while (i--) {
				newPath.setAttributeNS(
					null,
					attributes[i].nodeName,
					attributes[i].nodeValue || ''
				);
			}

			newPath.setAttributeNS(
				null,
				'd',
				'M' +
					segment[0] +
					',' +
					segment[1] +
					'C' +
					segment.slice(2).join(',') +
					// @ts-ignore
					(segment.closed ? 'z' : '')
			);

			if (parent) {
				parent.insertBefore(newPath, path);
			}

			return newPath;
		});

		if (parent) {
			parent.removeChild(path);
		}
	}

	return newPaths;
}

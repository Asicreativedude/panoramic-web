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
		audio.addEventListener('loadedmetadata', () => {
			durationElement.textContent = formatTime(audio.duration);
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

	let isMobileBePartner = window.innerWidth < 1025;
	if (isMobileBePartner) {
		setPagesSwipers();
	}

	window.addEventListener('resize', () => {
		isMobileBePartner = window.innerWidth < 1025;
		if (isMobileBePartner) {
			setPagesSwipers();
		}
	});

	//form error messages
	const submitBtn = document.querySelector('.submit-btn') as HTMLInputElement;
	const formErrorMessages = document.querySelectorAll('.required-message');
	const requiredFields = document.querySelectorAll(
		'[cd="form-field"]'
	) as NodeListOf<HTMLInputElement>;
	const form = document.getElementById('become-partner-form')!;
	form.addEventListener('submit', () => {
		document
			.querySelector('.become-partner-form-success-c')!
			.classList.add('active');
		submitBtn.classList.add('hide');
	});
	submitBtn.addEventListener('click', () => {
		formErrorMessages.forEach((message) => {
			message.classList.remove('active');
		});
		requiredFields.forEach((field) => {
			if (field.type === 'checkbox') {
				field.previousElementSibling!.classList.remove('error-state');
			}
			field.classList.remove('error-state');
		});
		requiredFields.forEach((field) => {
			if (!field.value) {
				field
					.parentElement!.querySelector('.required-message')!
					.classList.add('active');
				field.classList.add('error-state');
			}
			if (field.type === 'checkbox' && !field.checked) {
				field.previousElementSibling!.classList.add('error-state');
				field
					.parentElement!.querySelector('.required-message')!
					.classList.add('active');
			}
		});
	});

	//form countries
	const countriesSelect = document.getElementById('country-select')!;
	countriesSelect.innerHTML = `
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
                <option value="Zimbabwe">Zimbabwe</option>
				`;

	//animated titles
	const splitTitlesBe = document.querySelectorAll('[cd="animated-title"]');
	const beSmallTitles = document.querySelectorAll('[cd="animated-line"]');
	const beHeroImg = document.querySelector('[cd="bePartner-hero-img"]')!;

	const beHeroTl = gsap.timeline({ paused: true });
	beHeroTl.from(beHeroImg, {
		autoAlpha: 0,
		yPercent: 100,
		duration: 1,
		ease: 'power4.out',
	});
	splitTitlesBe.forEach((title) => {
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
				start: 'top 85%',
			},
		});

		ScrollTrigger.create({
			trigger: title,
			start: 'top 75%',
			onEnter: () => {
				if (!beHeroTl.isActive()) {
					beHeroTl.play();
				}
			},
		});
	});

	beSmallTitles.forEach((title) => {
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
				start: 'top 85%',
			},
		});
	});

	const fadesBe = document.querySelectorAll('[cd="fade-up"]');
	fadesBe.forEach((fade) => {
		gsap.from(fade, {
			duration: 1,
			yPercent: 30,
			opacity: 0,
			ease: 'power4.out',
			scrollTrigger: {
				trigger: fade,
				start: 'top 85%',
			},
		});
	});

	const featureItemsBe = document.querySelectorAll('[cd="feature-item"]')!;

	const featureBeTl = gsap.timeline({ paused: true });
	let isBeHome = window.innerWidth < 992;
	featureBeTl.from(featureItemsBe, {
		autoAlpha: 0,
		xPercent: isBeHome ? 5 : 10,
		duration: 1,
		ease: 'power2.out',
		stagger: {
			amount: 0.3,
		},
	});

	ScrollTrigger.create({
		trigger: '.program-highlight-s',
		start: 'top 75%',
		onEnter: () => {
			if (!featureBeTl.isActive()) {
				featureBeTl.play();
			}
		},
	});

	window.addEventListener('resize', () => {
		isBeHome = window.innerWidth < 992;
	});
});

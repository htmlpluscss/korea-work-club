( elems => {

	if(!elems.length) {

		return;

	}

	[...elems].forEach( swipe => {

		let mySwipe = null,
			toggleSwipe = null,
			resetSwipe = null;

		const swipeControls = document.createElement('div'),
			  swipeNav = document.createElement('div'),
			  swipeBtns = document.createElement('div'),
			  swipeNext = document.createElement('button'),
			  swipePrev = document.createElement('button'),
			  scrollbar = swipe.querySelector('.swiper-scrollbar'),
			  items = swipe.querySelectorAll('.swiper-slide'),
			  count = items.length,
			  livingConditions = swipe.classList.contains('swiper--living-conditions'),
			  totalSelect = swipe.classList.contains('swiper--total-select'),
			  burningOffers = swipe.classList.contains('swiper--burning-offers');

		swipeNav.className = 'swiper-pagination';
		swipeControls.className = 'swiper-controls';

		swipeBtns.className = 'swiper-navigation';
		swipePrev.className = 'swiper-button-prev button';
		swipeNext.className = 'swiper-button-next button';

		swipePrev.setAttribute('aria-label','Previous slide');
		swipeNext.setAttribute('aria-label','Next slide');

		swipePrev.innerHTML = '<svg width="36" height="36" viewBox="0 0 36 36"><path stroke-width="1.5" d="M20.7 10.8 13.5 18l7.2 7.2"/></svg>';
		swipeNext.innerHTML = '<svg width="36" height="36" viewBox="0 0 36 36"><path stroke-width="1.5" d="m15.3 10.8 7.2 7.2-7.2 7.2"/></svg>';

		swipeBtns.append(swipePrev);
		swipeBtns.append(swipeNext);
		swipeControls.append(swipeBtns);
		swipeControls.append(swipeNav);

		resetSwipe = () => {

			if(mySwipe) {

				mySwipe.destroy(false,true);
				mySwipe = undefined;

			}

			swipeNav.classList.add('hide');
			swipeBtns.classList.add('hide');
			swipeControls.classList.add('hide');

			if ( swipe.closest('.swiper-container-style') ) {

				swipe.closest('.swiper-container-style').classList.remove('swiper-container-style');

			}

		}

		if (burningOffers) {

			toggleSwipe = () => {

				toggleSwipe = false;

				new Swiper(swipe, {
					loop: true,
					navigation: {
						nextEl: swipeNext,
						prevEl: swipePrev
					},
					pagination: {
						el: swipeNav,
						clickable: true,
						bulletClass: 'button',
						bulletActiveClass: 'is-active'
					}
				});

			}

		}

		if (totalSelect) {

			toggleSwipe = () => {

				resetSwipe();

				swipe.parentNode.classList.add('swiper-container-style');
				swipeBtns.classList.add('hide');
				swipeNav.classList.remove('hide');
				swipeControls.classList.remove('hide');

				if ( document.documentElement.clientWidth < 1200 ) {

					mySwipe = new Swiper(swipe, {
						loop: true,
						autoHeight: true,
						pagination: {
							el: swipeNav,
							clickable: true,
							bulletClass: 'button',
							bulletActiveClass: 'is-active'
						}
					});

				}
				else {

					mySwipe = new Swiper(swipe, {
						effect: 'fade',
						autoHeight: true,
						mousewheel: {
							invert: false,
						},
						pagination: {
							el: swipeNav,
							clickable: true,
							bulletClass: 'button',
							bulletActiveClass: 'is-active'
						}
					});

				}

			}

			swipe.addEventListener("swiperResize",toggleSwipe);

		}

		if (livingConditions) {

			toggleSwipe = () => {

				resetSwipe();

				swipe.parentNode.classList.add('swiper-container-style');
				swipeControls.classList.remove('hide');

				if ( document.documentElement.clientWidth < 768 ) {

					swipeBtns.classList.add('hide');
					swipeNav.classList.remove('hide');

					mySwipe = new Swiper(swipe, {
						loop: true,
						pagination: {
							el: swipeNav,
							clickable: true,
							bulletClass: 'button',
							bulletActiveClass: 'is-active'
						}
					});

				}
				else {

					swipeBtns.classList.remove('hide');
					swipeNav.classList.add('hide');

					mySwipe = new Swiper(swipe, {
						slidesPerView: 2,
						spaceBetween: 10,
						navigation: {
							nextEl: swipeNext,
							prevEl: swipePrev
						},
						breakpoints: {
							1200: {
								slidesPerView: 3
							}
						}
					});

				}

			}

			swipe.addEventListener("swiperResize",toggleSwipe);

		}

		swipe.addEventListener('swiperJsLoad', () => {

			swipe.parentNode.append(swipeControls);

			// eager
			[...swipe.querySelectorAll('[loading="lazy"]')].forEach( img => img.setAttribute('loading','eager') );

			// hide
			[...items].forEach( el => el.classList.remove('hide') );

			toggleSwipe();

		});

	});

	let resizeTimeout = null,
		windowWidthOLd = window.innerWidth;

	window.addEventListener("resize", () => {

		window.requestAnimationFrame( () => {

			if (resizeTimeout === null) {

				resizeTimeout = setTimeout( () => {

					resizeTimeout = null;

					if(windowWidthOLd !== window.innerWidth) {

						windowWidthOLd = window.innerWidth;

						if (window.Swiper) {

							[...elems].forEach( swipe => swipe.dispatchEvent(new Event("swiperResize")) );

						}

					}

				}, 1000);

			}

		});

	});

	const script = document.createElement('script');

	script.src = '/js/swiper-bundle.min.js';

	script.onload = () => [...elems].forEach( swipe => swipe.dispatchEvent(new Event("swiperJsLoad")) );


	// fastLoadScript

	if ( localStorage.getItem('fastLoadScript') ) {

		document.head.append(script);

	}
	else {

		let fastLoadScriptTimeout = true;

		const appendScript = () => {

			if ( fastLoadScriptTimeout ) {

				clearTimeout(fastLoadScriptTimeout);

				fastLoadScriptTimeout = null;
				document.head.append(script);

			}

			window.removeEventListener('scroll',appendScript);
			window.removeEventListener('click',appendScript);

		}

		const observer = new IntersectionObserver((entries, observer) => {

			let isInViewport = false;

			isInViewport = [...entries].some( entry => {

				observer.unobserve(entry.target);

				return entry.isIntersecting;

			});

			if ( isInViewport ) {

				appendScript();

			}
			else if ( fastLoadScriptTimeout ) {

				fastLoadScriptTimeout = setTimeout( appendScript, 30000 );

			}

		});

		[...elems].forEach( el => observer.observe(el) );

		window.addEventListener('scroll',appendScript);
		window.addEventListener('click',appendScript);

	}

})(document.querySelectorAll('.swiper'));
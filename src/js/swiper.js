( elems => {

	if(!elems.length) {

		return;

	}

	[...elems].forEach( swipe => {

		let mySwipe = null,
			toggleSwipe = null,
			resetSwipe = null;

		const swipeControls = document.createElement('div'),
			  swipeNav = document.createElement('div');

		swipeNav.className = 'swiper-pagination';
		swipeControls.className = 'swiper-controls';

		swipeControls.append(swipeNav);

		toggleSwipe = () => {

			const dependent = document.querySelectorAll(swipe.getAttribute('data-dependent'));

			new Swiper(swipe, {
				loop: true,
				autoplay: {
					delay: 5000,
					disableOnInteraction: true
				},
				pagination: {
					el: swipeNav,
					clickable: true,
					bulletClass: 'button',
					bulletActiveClass: 'is-active'
				},
				on: {
					slideChange: () => {
						dependent.forEach( (el,index) => el.classList.toggle('is-current', swipe.swiper.realIndex === index) );
					}
				}
			});

		}

		swipe.addEventListener('swiperJsLoad', () => {

			swipe.append(swipeControls);

			// eager
			[...swipe.querySelectorAll('[loading="lazy"]')].forEach( img => img.setAttribute('loading','eager') );

			toggleSwipe();

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
			else {

				fastLoadScriptTimeout = setTimeout( appendScript, 30000 );

			}

		});

		[...elems].forEach( el => observer.observe(el) );

		window.addEventListener('scroll',appendScript);
		window.addEventListener('click',appendScript);

	}

})(document.querySelectorAll('.swiper'));
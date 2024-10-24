( elems => {

	let fastLoadTimeout = true;

	const init = () => {

		clearTimeout(fastLoadTimeout);

		fastLoadTimeout = null;

		[...elems].forEach( el => {

			const iframe = document.createElement('iframe');

			iframe.setAttribute('disablePictureInPicture','true');
			iframe.setAttribute('allowfullscreen','allowfullscreen');
			iframe.src = 'https://www.youtube.com/embed/' + el.getAttribute('data-youtube') + '?autoplay=0&loop=0&rel=0&modestbranding=1';

			el.append(iframe);

		});

	}

	const appendFrame = () => {

		if ( fastLoadTimeout ) {

			init();

		}

		window.removeEventListener('scroll',appendFrame);
		window.removeEventListener('click',appendFrame);

	}

	const observer = new IntersectionObserver((entries, observer) => {

		const isIntersecting = [...entries].some( entry => {

			observer.unobserve(entry.target);

			return entry.isIntersecting;

		});

		if ( isIntersecting ) {

			appendFrame();

		}
		else if ( fastLoadTimeout ) {

			fastLoadTimeout = setTimeout( appendFrame, 30000 );

		}

	});

	[...elems].forEach( el => observer.observe(el) );

	window.addEventListener('scroll',appendFrame);
	window.addEventListener('click',appendFrame);

})(document.querySelectorAll('[data-youtube]'));
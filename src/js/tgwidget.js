( tgwidget => {

	let fastLoadTimeout = true;

	const init = () => {

		clearTimeout(fastLoadTimeout);

		fastLoadTimeout = null;

		const iframe = document.createElement('iframe');

		iframe.src = tgwidget.getAttribute('data-tgwidget');

		tgwidget.append(iframe);

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

	observer.observe(tgwidget);

	window.addEventListener('scroll',appendFrame);
	window.addEventListener('click',appendFrame);

})(document.querySelector('[data-tgwidget]'));
( items => {

	if(!items.length) {

		return;

	}

	[...items].forEach( accordion => {

		let animateOn = false,
			activeItem = null;

		const items = accordion.children;

		[...items].forEach( item => {

			const btn = item.querySelector('.accordion__btn'),
				  head = item.querySelector('.accordion__head'),
				  body = item.querySelector('.accordion__body'),
				  arrow = document.createElementNS("http://www.w3.org/2000/svg", "svg");

			arrow.setAttributeNS(null, "viewBox", "0 0 30 30");
			arrow.setAttributeNS(null, "width", 30);
			arrow.setAttributeNS(null, "height", 30);
			arrow.innerHTML = '<line x1="8" y1="15" x2="22" y2="15" stroke-width="3"/><line x1="15" y1="8" x2="15" y2="22" stroke-width="3"/>';

			btn.append(arrow);

			btn.addEventListener('click', () => {

				animateOn = true;

				if( item === activeItem ){

//					item.classList.remove('is-open');
					activeItem = null;

				} else {

					activeItem = item;

//					[...items].forEach( el => el.classList.toggle('is-open', el === item));

				}

				item.classList.toggle('is-open');

			});

			body.addEventListener( window.cssAnimation('transition'), () => {

				if( animateOn && activeItem === item && !window.isInViewport(head) ){

					head.scrollIntoView({ behavior: 'smooth' });

				}

				setTimeout( ()=> animateOn = false );

			});

		});

	});

})(document.querySelectorAll('.accordion'));
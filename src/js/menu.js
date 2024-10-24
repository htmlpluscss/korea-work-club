( btn => {

	window.addEventListener('click', event => {

		if ( event.detail > 1 ) {

			return;

		}

		if ( event.target.closest('.menu__btn') ) {

			document.body.classList.toggle('is-open-menu');

		}
		else {

			document.body.classList.remove('is-open-menu');

		}

	});

})(document.querySelector('.menu'));
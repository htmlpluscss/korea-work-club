( youtube => {

	if( youtube.length ) {

		const modalBox = document.querySelector('#modal-video');

		[...youtube].forEach( el => {

			const id = el.getAttribute('data-youtube');

			el.addEventListener('click', event => {

				event.preventDefault();

				const iframe = document.createElement('iframe');

				iframe.setAttribute('allowfullscreen', '');
				iframe.setAttribute('allow', 'autoplay');
				iframe.setAttribute('src', 'https://www.youtube.com/embed/' + id + '?rel=0&showinfo=0&autoplay=1');

				modalBox.append(iframe);

				const eventModalShow = new CustomEvent("modalShow", {
					detail: {
						selector: "video"
					}
				});

				modalBox.classList.toggle('is-shorts', el.querySelector('a').href.includes('shorts'))

				window.modal.dispatchEvent(eventModalShow);

			});

		});

	}

})(document.querySelectorAll('[data-youtube]'));
( forms => {

	[...forms].forEach( form => {

		const formStatus = form.closest('.form-status');
		const validationMessage = form.querySelector('.form__validation-message');
		const btnSubmit = form.querySelector('.form__submit');

		const validElement = el => {

			validationMessage.textContent = '';
			btnSubmit.disabled = false;

			if ( el.classList.contains('input') || el.classList.contains('checkbox__input') ) {

				el.parentNode.classList.toggle('is-error', el.checkValidity() === false );

				btnSubmit.disabled = el.checkValidity() === false;

			}

			validationMessage.textContent = el.validationMessage;

		}

		[...form.querySelectorAll('[required]')].forEach( target => {

			['input','change','blur'].forEach( Event => {

				target.addEventListener( Event, event => {

					// required

					if ( target.required ) {

						if ( Event !== 'input' || target.checkValidity() ) {

							validElement(target);

						}

					}

				});

			});

		});

		form.addEventListener('submit', event => {

			if ( !form.checkValidity() ) {

				console.log('Форма не валидна!', form.checkValidity());

			}

			event.preventDefault();

			const formData = new FormData(form),
				  formDataJSON = {};

			formData.forEach( (value, key) => formDataJSON[key] = value );

			btnSubmit.disabled = true;

			fetch(form.getAttribute('action'), {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(formDataJSON)
			})
			.then(response => response.json())
			.then(result => {

				console.log(result);

				formStatus && formStatus.classList.add('is-done');

			});

		});

	});

})(document.querySelectorAll('.form'));

( passwords => {

	[...passwords].forEach( password => {

		const btn = password.querySelector('.input-wrap-password__btn');
		const input = password.querySelector('.input-wrap-password__input');

		btn.addEventListener('click', () => {

			input.type = input.type === 'text' ? 'password' : 'text';

		});

	});

})(document.querySelectorAll('.input-wrap-password'));
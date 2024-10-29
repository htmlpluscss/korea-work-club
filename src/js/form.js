( forms => {

	[...forms].forEach( form => {

		const btnSubmit = form.querySelector('.form__submit');

		form.addEventListener('submit', event => {

			event.preventDefault();

			const formData = new FormData(form),
				  formDataJSON = {};

//			formData.forEach( (value, key) => formDataJSON[key] = value );

			btnSubmit.disabled = true;

			fetch(form.getAttribute('action'), {
				method: 'POST',
				body: formData
//				headers: {
//					'Content-Type': 'application/json'
//				},
//				body: JSON.stringify(formDataJSON)
			})
//			.then(response => response.json())
			.then(result => {

				console.log(result);

				const eventModalShow = new CustomEvent("modalShow", {
					detail: {
						selector: "done"
					}
				});

				window.modal.dispatchEvent(eventModalShow);

				btnSubmit.disabled = false;

				form.reset();

			});

		});

	});

})(document.querySelectorAll('.form'));
/*!

© kovrigin
Все права разрешены
красивый дизайн должен иметь красивый код®

https://github.com/htmlpluscss/

*/

( () => {

	window.addEventListener("load", () => {

		document.documentElement.style.setProperty('--transitionDefault', '.3s');

	});

	// anim btn

	const anim = ( btn, deg, spin = 1 ) => {

		deg = spin > 0 ? deg + 1 : deg - 3;

		btn.style.setProperty('--deg', deg + 'deg');

		window.requestAnimationFrame( () => {

			if ( deg > 175 && deg < 200 ) {

				anim(btn,deg,spin);

			}

		});

	}

	[...document.querySelectorAll('.btn')].forEach( btn => {

		btn.addEventListener('mouseenter', ()=>{

			anim(btn,200,-1);

		});

		btn.addEventListener('mouseleave', ()=>{

			anim(btn,175);

		});

	});

	[...document.querySelectorAll('.input-wrap')].forEach( wrap => {

		const input = wrap.querySelector('.input');

		input.addEventListener('focus', ()=>{

			anim(wrap,200,-1);

		});

		input.addEventListener('blur', ()=>{

			anim(wrap,175);

		});

	});

})();
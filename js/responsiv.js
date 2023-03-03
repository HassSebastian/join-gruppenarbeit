let sliderMenuShown = false;

// responsiv Slider menu functions
function enableDisableSliderMenu() {
	let sliderMenu = document.querySelector('.sliderMenu');

	sliderMenu.classList.toggle('showSliderMenu');

	/* 	if (!sliderMenuShown) {
		sliderMenu.classList.add('showSliderMenu');
		sliderMenuShown = true;
	} else {
		sliderMenu.classList.remove('showSliderMenu');
		sliderMenuShown = false;
	} */
}

/**
 * Hides slide menu on click outside of it
 */
function hideSlideMenu() {
	let sliderMenu = document.querySelector('.sliderMenu');
	sliderMenu.classList.remove('showSliderMenu');
	sliderMenuShown = false;
}

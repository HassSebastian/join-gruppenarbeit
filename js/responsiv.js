let sliderMenuShown = false;

// responsiv Slider menu functions
function enableDisableSliderMenu() {
	let sliderMenu = document.querySelector('.sliderMenu');
	if (!sliderMenuShown) {
		sliderMenu.classList.add('showSliderMenu');
		sliderMenuShown = true;
	} else {
		sliderMenu.classList.remove('showSliderMenu');
		sliderMenuShown = false;
	}
}

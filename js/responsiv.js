// responsiv Slider menu functions
function enableDisableSliderMenu() {
	let sliderMenu = document.querySelector('.sliderMenu');
	sliderMenu.classList.toggle('showSliderMenu');
}

// responsiv AddTask Functions

window.onresize = function () {
	if (window.innerWidth >= 762 && window.innerWidth <= 1110) {
		// myFunction(window.innerWidth);
		// console.log('resize ', window.innerWidth);
	}
};

window.onload = function () {
	let tabWidth = window.innerWidth;
	if (tabWidth >= 500 && tabWidth <= 1100) {
		// myFunction(tabWidth);
		// console.log('onload', window.innerWidth);
	}
};

function getInnerWidth() {
	let tabWidth = window.innerWidth;
	if (tabWidth >= 762 && tabWidth <= 1100) {
		// myFunction(tabWidth);
		// console.log('get Inner Width', window.innerWidth);
	}
}

function myFunction(tabWidth) {
	let contentH = document.getElementById('contentHeight');
	let content = document.getElementById('content');
	let mobilView = document.getElementById('mobilContent');

	if (contentH && window.innerWidth >= 763 && tabWidth <= 1100) {
		if (!mobilView) {
            // enableDisableAssignList();
			
		}
	} else {
		if (!mobilView) {
			
		}
	}
}


function tabletViewAddMarginTop(){
	let tabWidth = window.innerWidth;
    document.getElementById('addTaskRightContainer').classList.add('addMarginTop');
	if (catListStatus && tabWidth >= 762 && tabWidth <= 1100){
		document.getElementById('addTaskRightContainer').classList.add('addMarginTop');
	}else{
		document.getElementById('addTaskRightContainer').classList.remove('addMarginTop');
	}
	if (assignListStatus && tabWidth >= 762 && tabWidth <= 1100){
		document.getElementById('addTaskRightContainer').classList.add('addMarginTop');
	}else{
		document.getElementById('addTaskRightContainer').classList.remove('addMarginTop');
	}

}


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
			// content.style = 'height: auto;';
			// document.getElementById('dropdownImg').style = 'left: calc(100vw - 170px ) !important;';
			// document.getElementById('assignDropDownImg').style = 'left: calc(100vw - 170px ) !important; display: flex !important; position: absolute !important;';
			// document.getElementById('addTaskNewCatBtn').style = 'left: calc(100vw - 221px ) !important;';
			// document.getElementById('CatListDropdown').style = 'width: calc(100vw - 142px) !important;';
			// document.getElementById('dropdown2').style = 'width: calc(100vw - 142px) !important;';
			// document.getElementById('assignToCancelConfirmImgContainer').style = 'left: calc(100vw - 221px ) !important;';
			// document.getElementById('addTaskPrioIcons').style = 'width: calc(100vw - 142px) !important; justify-content: space-between;';
			// document.getElementById('subtaskCross').style = 'left: calc(100vw - 170px ) !important;';
			// document.getElementById('addTaskDiverder').style = 'display: none;';
			// document.getElementById('subTaskImgDiv').style = 'left: calc(100vw - 220px ) !important;';
		}
	} else {
		if (!mobilView) {
			// content.style = 'height: 1024px';
			
			// document.getElementById('assignDropDownImg').style = 'left: 392px !important; display: flex !important; position: absolute !important;';
			// document.getElementById('addTaskNewCatBtn').style = 'left: 341px !important;';
			// document.getElementById('CatListDropdown').style = 'width: 424px !important;';
			// document.getElementById('dropdown2').style = 'width: 424px !important;';
			// document.getElementById('assignToCancelConfirmImgContainer').style = 'left: 341px !important;';

			// document.getElementById('addTaskPrioIcons').style = 'width: 424px !important; justify-content: center;';
			// document.getElementById('subtaskCross').style = 'left: 392px !important;';
			// document.getElementById('addTaskDiverder').style = 'display: flex;';
		}
	}
}
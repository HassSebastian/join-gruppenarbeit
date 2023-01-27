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
	if (window.innerWidth < 762 || window.innerWidth > 1100){
		resetResponsivContainerHeight();
	}
	if(catListStatus && selectedMenuBtnId == 3){
		enableDisableCatList();
	}
	if(assignListStatus && selectedMenuBtnId == 3){
		enableDisableAssignList();
	}
};

// window.onload = function () {
// 	let tabWidth = window.innerWidth;
// 	if (tabWidth >= 500 && tabWidth <= 1100) {
// 		// myFunction(tabWidth);
// 		// console.log('onload', window.innerWidth);
// 	}
// };

// function getInnerWidth() {
// 	let tabWidth = window.innerWidth;
// 	if (tabWidth >= 762 && tabWidth <= 1100) {
// 		myFunction(tabWidth);
// 		console.log('get Inner Width', window.innerWidth);
// 	}
// }

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


function tabletViewAddMarginTopCatList(){
	if (catListStatus && window.innerWidth >= 762 && window.innerWidth <= 1100){
		document.getElementById('addTaskRightContainer').classList.add('addMarginTop');
		document.getElementById('testResponsiv').classList.add('testResponsivNewHeight');
		// document.getElementById('addTaskBtnOuterContainer').style = 'top: 1420px !important;';
		document.getElementById('addTaskBtnOuterContainer').classList.remove('addTaskBtnOuterContainerNewTopValue2');
		document.getElementById('addTaskBtnOuterContainer').classList.remove('addTaskBtnOuterContainerNewTopValue');
		document.getElementById('addTaskBtnOuterContainer').classList.add('addTaskBtnOuterContainerNewTopValue1');
	}
	if (!catListStatus || window.innerWidth < 762 || window.innerWidth > 1100){
		document.getElementById('addTaskRightContainer').classList.remove('addMarginTop');
		document.getElementById('testResponsiv').classList.remove('testResponsivNewHeight');
		document.getElementById('testResponsiv').classList.remove('testResponsivNewHeight1');
		// document.getElementById('addTaskBtnOuterContainer').style = 'top: 1345px !important;';
		document.getElementById('addTaskBtnOuterContainer').classList.remove('addTaskBtnOuterContainerNewTopValue2');
		document.getElementById('addTaskBtnOuterContainer').classList.remove('addTaskBtnOuterContainerNewTopValue1');
		document.getElementById('addTaskBtnOuterContainer').classList.add('addTaskBtnOuterContainerNewTopValue');
	}
	// if (window.innerWidth > 1100){
	// 	document.getElementById('testResponsiv').style = 'height: 935px !important;';
	// 	document.getElementById('addTaskBtnOuterContainer').style = 'top: 800px !important;';
	// }
	if (!catListStatus && assignListStatus && window.innerWidth >= 762 && window.innerWidth <= 1100){
		document.getElementById('addTaskRightContainer').classList.add('addMarginTop');
		document.getElementById('testResponsiv').classList.add('testResponsivNewHeight');
		// document.getElementById('addTaskBtnOuterContainer').style = 'top: 1420px !important;';
		document.getElementById('addTaskBtnOuterContainer').classList.remove('addTaskBtnOuterContainerNewTopValue2');
		document.getElementById('addTaskBtnOuterContainer').classList.remove('addTaskBtnOuterContainerNewTopValue');
		document.getElementById('addTaskBtnOuterContainer').classList.add('addTaskBtnOuterContainerNewTopValue1');
	}

	tabletViewAddTaskResize();
}


function tabletViewAddMarginTopAssignList(){
	if (assignListStatus && window.innerWidth >= 762 && window.innerWidth <= 1100){
		document.getElementById('addTaskRightContainer').classList.add('addTaskRightContainerAddMarginTop');
		document.getElementById('testResponsiv').classList.add('testResponsivNewHeight');
		// document.getElementById('addTaskBtnOuterContainer').style = 'top: 1420px !important;';
		document.getElementById('addTaskBtnOuterContainer').classList.remove('addTaskBtnOuterContainerNewTopValue2');
		document.getElementById('addTaskBtnOuterContainer').classList.remove('addTaskBtnOuterContainerNewTopValue');
		document.getElementById('addTaskBtnOuterContainer').classList.add('addTaskBtnOuterContainerNewTopValue1');
	}
	if (!assignListStatus || window.innerWidth < 762 || window.innerWidth > 1100){
		document.getElementById('addTaskRightContainer').classList.remove('addTaskRightContainerAddMarginTop');
		document.getElementById('testResponsiv').classList.remove('testResponsivNewHeight');
		document.getElementById('testResponsiv').classList.remove('testResponsivNewHeight1');
		// document.getElementById('addTaskBtnOuterContainer').style = 'top: 1345px !important;';
		document.getElementById('addTaskBtnOuterContainer').classList.remove('addTaskBtnOuterContainerNewTopValue2');
		document.getElementById('addTaskBtnOuterContainer').classList.remove('addTaskBtnOuterContainerNewTopValue1');
		document.getElementById('addTaskBtnOuterContainer').classList.add('addTaskBtnOuterContainerNewTopValue');
	}
	// if (window.innerWidth > 1100){
	// 	document.getElementById('testResponsiv').style = 'height: 935px !important;';
	// 	document.getElementById('addTaskBtnOuterContainer').style = 'top: 800px !important;';
	// }
	if (catListStatus && !assignListStatus && window.innerWidth >= 762 && window.innerWidth <= 1100){
		document.getElementById('addTaskRightContainer').classList.add('addMarginTop');
		document.getElementById('testResponsiv').classList.add('testResponsivNewHeight');
		// document.getElementById('addTaskBtnOuterContainer').style = 'top: 1420px !important;';
		document.getElementById('addTaskBtnOuterContainer').classList.remove('addTaskBtnOuterContainerNewTopValue2');
		document.getElementById('addTaskBtnOuterContainer').classList.remove('addTaskBtnOuterContainerNewTopValue');
		document.getElementById('addTaskBtnOuterContainer').classList.add('addTaskBtnOuterContainerNewTopValue1');
	}
	tabletViewAddMarginTopCatList();
}



function tabletViewAddTaskResize(){
	if (assignListStatus && catListStatus && window.innerWidth >= 762 && window.innerWidth <= 1100){
		document.getElementById('addTaskRightContainer').classList.remove('addMarginTop');
		document.getElementById('addTaskRightContainer').classList.remove('addTaskRightContainerAddMarginTop')
		document.getElementById('addTaskRightContainer').classList.add('addTaskRightContainerAddMarginTop1');
		document.getElementById('testResponsiv').classList.remove('testResponsivNewHeight');
		document.getElementById('testResponsiv').classList.add('testResponsivNewHeight1');

		document.getElementById('addTaskBtnOuterContainer').classList.remove('addTaskBtnOuterContainerNewTopValue');
		document.getElementById('addTaskBtnOuterContainer').classList.remove('addTaskBtnOuterContainerNewTopValue1');
		// document.getElementById('addTaskBtnOuterContainer').style = 'top: 1495px !important;';
		document.getElementById('addTaskBtnOuterContainer').classList.add('addTaskBtnOuterContainerNewTopValue2');
	}
	if ((!assignListStatus && !catListStatus) ||  window.innerWidth < 762 || window.innerWidth > 1100){
		document.getElementById('addTaskRightContainer').classList.remove('addTaskRightContainerAddMarginTop1');
		document.getElementById('testResponsiv').classList.remove('testResponsivNewHeight');
		document.getElementById('testResponsiv').classList.remove('testResponsivNewHeight1');
	}
}


function resetResponsivContainerHeight(){
	if(document.querySelector('.addTaskRightContainerAddMarginTop1')){
		document.getElementById('addTaskRightContainer').classList.remove('addTaskRightContainerAddMarginTop1');
	}
	if(document.querySelector('.addMarginTop')){
		document.getElementById('addTaskRightContainer').classList.remove('addMarginTop');
	}

	if(document.querySelector('.testResponsivNewHeight')){
		document.getElementById('testResponsiv').classList.remove('testResponsivNewHeight');
	}
	if(document.querySelector('.testResponsivNewHeight1')){
		document.getElementById('testResponsiv').classList.remove('testResponsivNewHeight1');
	}
	if(document.querySelector('.addTaskBtnOuterContainerNewTopValue')){
		document.getElementById('addTaskBtnOuterContainer').classList.remove('addTaskBtnOuterContainerNewTopValue');
	}
	if(document.querySelector('.addTaskBtnOuterContainerNewTopValue1')){
		document.getElementById('addTaskBtnOuterContainer').classList.remove('addTaskBtnOuterContainerNewTopValue1');
	}
	if(document.querySelector('.addTaskBtnOuterContainerNewTopValue2')){
		document.getElementById('addTaskBtnOuterContainer').classList.remove('addTaskBtnOuterContainerNewTopValue2');
	}
	
}

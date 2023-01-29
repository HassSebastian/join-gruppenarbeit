let boardResponsivView = false;


// responsiv Slider menu functions
function enableDisableSliderMenu() {
	let sliderMenu = document.querySelector('.sliderMenu');
	sliderMenu.classList.add('showSliderMenu');
}


// general Functions
window.onresize = function () {
	rezizeCallRelatedBoardFunctions();
	resizeCallRelatedAddTaskFunctions();
	switchOverToMobilPhoneView();
};


function getInnerWidth() {
	let tabWidth = window.innerWidth;
	getInnerWidthBoardRelatedFunctions(tabWidth);
}



function switchOverToMobilPhoneView(){
	if (window.innerWidth <= 768){
		let setMenu = selectedMenuBtnId;
		window.location.replace("./summary_mobile.html");
	}
	if (!document.querySelector('.content') && window.innerWidth >768){
		window.location.replace("./summary.html");
	}
}



// window.onload = function () {
// 	let tabWidth = window.innerWidth;
// 	if (!boardResponsivView && tabWidth >= 1401) {
// 		document.getElementById('stylesheetBoardMobil').disabled = true;
// 		// document.getElementById('stylsheetAddTaskMobil').disabled = true;
// 	}
// };



// function myFunction(tabWidth) {
// 	let contentH = document.getElementById('contentHeight');
// 	let content = document.getElementById('content');
// 	let mobilView = document.getElementById('mobilContent');

// 	if (contentH && window.innerWidth >= 763 && tabWidth <= 1100) {
// 		if (!mobilView) {
// 			// enableDisableAssignList();

// 		}
// 	} else {
// 		if (!mobilView) {

// 		}
// 	}
// }


// Add Task Responsiv Functions
function resizeCallRelatedAddTaskFunctions(){
	if (window.innerWidth < 768 || window.innerWidth > 1100) {
		resetResponsivContainerHeight();
	}
	if (catListStatus && selectedMenuBtnId == 3) {
		enableDisableCatList();
	}
	if (assignListStatus && selectedMenuBtnId == 3) {
		enableDisableAssignList();
	}	
}


function tabletViewAddMarginTopCatList() {
	if (catListStatus && window.innerWidth >= 768 && window.innerWidth <= 1100) {
		document.getElementById('addTaskRightContainer').classList.add('addMarginTop');
		resizePageAndChangeBtnPosition();
	}
	if (!catListStatus || window.innerWidth < 768 || window.innerWidth > 1100) {
		checkIdAndRemoveMargin();
	}
	if (!catListStatus && assignListStatus && window.innerWidth >= 768 && window.innerWidth <= 1100) {
		resizePageAndChangeBtnPosition1();
	}
	tabletViewAddTaskResize();
}


function checkIdAndRemoveMargin(){
	if (document.querySelector('#addTaskRightContainer')){
		document.getElementById('addTaskRightContainer').classList.remove('addMarginTop');
		resetResizePageAndChangeBtnPosition();
	}	
}


function checkIdAndRemoveMargin2(){
	if (document.querySelector('#addTaskRightContainer')){
		document.getElementById('addTaskRightContainer').classList.remove('addTaskRightContainerAddMarginTop');
		resetResizePageAndChangeBtnPosition();
	}
}


function tabletViewAddMarginTopAssignList() {
	if (assignListStatus && window.innerWidth >= 768 && window.innerWidth <= 1100) {
		document.getElementById('addTaskRightContainer').classList.add('addTaskRightContainerAddMarginTop');
		resizePageAndChangeBtnPosition();
	}
	if (!assignListStatus || window.innerWidth < 768 || window.innerWidth > 1100) {
		checkIdAndRemoveMargin2();
	}
	if (catListStatus && !assignListStatus && window.innerWidth >= 768 && window.innerWidth <= 1100) {
		resizePageAndChangeBtnPosition1();
	}
	tabletViewAddMarginTopCatList();
}


function resizePageAndChangeBtnPosition() {
	document.getElementById('testResponsiv').classList.add('testResponsivNewHeight');
	btnPosition1();
}


function resetResizePageAndChangeBtnPosition() {
	document.getElementById('testResponsiv').classList.remove('testResponsivNewHeight');
	document.getElementById('testResponsiv').classList.remove('testResponsivNewHeight1');
	btnPosition2();
}


function resizePageAndChangeBtnPosition1() {
	document.getElementById('addTaskRightContainer').classList.add('addMarginTop');
	document.getElementById('testResponsiv').classList.add('testResponsivNewHeight');
	btnPosition1();
}


function btnPosition1() {
	document.getElementById('addTaskBtnOuterContainer').classList.remove('addTaskBtnOuterContainerNewTopValue2');
	document.getElementById('addTaskBtnOuterContainer').classList.remove('addTaskBtnOuterContainerNewTopValue');
	document.getElementById('addTaskBtnOuterContainer').classList.add('addTaskBtnOuterContainerNewTopValue1');
}


function btnPosition2() {
	document.getElementById('addTaskBtnOuterContainer').classList.remove('addTaskBtnOuterContainerNewTopValue2');
	document.getElementById('addTaskBtnOuterContainer').classList.remove('addTaskBtnOuterContainerNewTopValue1');
	document.getElementById('addTaskBtnOuterContainer').classList.add('addTaskBtnOuterContainerNewTopValue');
}


function btnPosition3() {
	document.getElementById('addTaskBtnOuterContainer').classList.remove('addTaskBtnOuterContainerNewTopValue');
	document.getElementById('addTaskBtnOuterContainer').classList.remove('addTaskBtnOuterContainerNewTopValue1');
	document.getElementById('addTaskBtnOuterContainer').classList.add('addTaskBtnOuterContainerNewTopValue2');
}


function addTaskRightContainerNewHeight1() {
	document.getElementById('addTaskRightContainer').classList.remove('addMarginTop');
	document.getElementById('addTaskRightContainer').classList.remove('addTaskRightContainerAddMarginTop');
	document.getElementById('addTaskRightContainer').classList.add('addTaskRightContainerAddMarginTop1');
}


function testResponsivNewHeight1(){
	document.getElementById('testResponsiv').classList.remove('testResponsivNewHeight');
	document.getElementById('testResponsiv').classList.add('testResponsivNewHeight1');
}


function testResponsivNewHeight2(){
	document.getElementById('testResponsiv').classList.remove('testResponsivNewHeight');
	document.getElementById('testResponsiv').classList.remove('testResponsivNewHeight1');
}


function tabletViewAddTaskResize() {
	if (assignListStatus && catListStatus && window.innerWidth >= 768 && window.innerWidth <= 1100) {
		addTaskRightContainerNewHeight1();
		testResponsivNewHeight1();
		btnPosition3();
	}
	if ((!assignListStatus && !catListStatus) || window.innerWidth < 768 || window.innerWidth > 1100) {
		if (document.querySelector('#addTaskRightContainer')){
			document.getElementById('addTaskRightContainer').classList.remove('addTaskRightContainerAddMarginTop1');
			testResponsivNewHeight2();
		}
	}
}


function resetResponsivContainerHeight() {
	resetResponsivContainerHeightPart1();
	resetResponsivContainerHeightPart2();
	resetResponsivContainerHeightPart3();
}


function resetResponsivContainerHeightPart1(){
	if (document.querySelector('.addTaskRightContainerAddMarginTop1')) {
		document.getElementById('addTaskRightContainer').classList.remove('addTaskRightContainerAddMarginTop1');
	}
	if (document.querySelector('.addMarginTop')) {
		document.getElementById('addTaskRightContainer').classList.remove('addMarginTop');
	}
}


function resetResponsivContainerHeightPart2(){
	if (document.querySelector('.testResponsivNewHeight')) {
		document.getElementById('testResponsiv').classList.remove('testResponsivNewHeight');
	}
	if (document.querySelector('.testResponsivNewHeight1')) {
		document.getElementById('testResponsiv').classList.remove('testResponsivNewHeight1');
	}
}


function resetResponsivContainerHeightPart3(){
	if (document.querySelector('.addTaskBtnOuterContainerNewTopValue')) {
		document.getElementById('addTaskBtnOuterContainer').classList.remove('addTaskBtnOuterContainerNewTopValue');
	}
	if (document.querySelector('.addTaskBtnOuterContainerNewTopValue1')) {
		document.getElementById('addTaskBtnOuterContainer').classList.remove('addTaskBtnOuterContainerNewTopValue1');
	}
	if (document.querySelector('.addTaskBtnOuterContainerNewTopValue2')) {
		document.getElementById('addTaskBtnOuterContainer').classList.remove('addTaskBtnOuterContainerNewTopValue2');
	}
}


// Board Responsiv Functions

function rezizeCallRelatedBoardFunctions(){
	// responsiv Board Functions
	if (window.innerWidth >= 768 && window.innerWidth <= 1400 && selectedMenuBtnId == 2) {
		if (!boardResponsivView){
			document.getElementById('stylesheetBoardMobil').disabled = false;
			// document.getElementById('stylsheetAddTaskMobil').disabled = false;
			// document.getElementById('stylesheetAddTask').disabled = true;
			initBoardResponsivTablet();
			boardResponsivView = true;
		}
	}

	if (window.innerWidth <= 767 || window.innerWidth >= 1401 && selectedMenuBtnId == 2) {
		if (boardResponsivView && selectedMenuBtnId == 2){
			// document.getElementById('stylesheetBoardMobil').disabled = true;
			
			initBoard();
			boardResponsivView = false;
		}
		if (!boardResponsivView){
			document.getElementById('stylesheetBoardMobil').disabled = true;
			document.getElementById('stylesheetAddTask').disabled = false;
			// document.getElementById('stylsheetAddTaskMobil').disabled = true;
		}
	}
}


function getInnerWidthBoardRelatedFunctions(tabWidth){
	if (tabWidth >= 1401 || tabWidth < 769) {
		document.getElementById('stylesheetBoardMobil').disabled = true;
		// document.getElementById('stylesheetAddTask').disabled = false;
		// document.getElementById('stylsheetAddTaskMobil').disabled = true;
		// document.getElementById('stylsheetAddTaskMobil').disabled = true;
	}
	if (selectedMenuBtnId == 2 && tabWidth > 768 && tabWidth < 1401){
		boardResponsivView = true;
		document.getElementById('stylesheetBoardMobil').disabled = false;
		// document.getElementById('stylesheetAddTask').disabled = true;
		// document.getElementById('stylsheetAddTaskMobil').disabled = false;
		initBoardResponsivTablet();
	}
}


async function initBoardResponsivTablet(){
	// document.getElementById('stylesheetBoard').disabled = true;
	await renderBoardResponsivTabletHtml()
	await loadTask();
    await createWorkStatusArrays();
    await renderAllCardsMobil();
	// selectedMenuButton(2);
}


async function renderBoardResponsivTabletHtml(){
	document.getElementById('content').innerHTML = '';
	document.getElementById('content').innerHTML = /*html*/`
		<div class='boardOverlay'>
            <div class='boardHeadline'>
                <span>Board</span>
            </div>
            <div class='inputOutContainer'>
                <div class='inputContainer'>
                    <div class='inputInContainer'>
                        <div class='inputFontContainer'>
                            <input type="text" id="searchField" required placeholder='Find Task' onfocus='startSearch(event)' autocomplete='off'>
                        </div>
                        <div class='vector'></div>
                        <img src='./assets/img/search_logo.png'>
                    </div>
                </div>
                <button class='addTaskButton' onclick='showAddTaskPopupWindow()'>
                    <span>Add task</span>
                    <div class='plusOutContainer'>
                        <img src='./assets/img/plus_logo_white.png'>
                    </div>
                </button>
            </div>
        </div>
		<!--  -->

		<div class='boardTaskCardOuterContainer'>
            <div class='toDoOuterContainer'>

				<div>
					<!-- toDo TaskCards -->
					<div class='toDoHeadline'>
						<span>To do</span>
						<div class='headlinePlusBtn' onclick='showAddTaskPopupWindow()'>

						</div>
					</div>
					
					<div id='toDoDiv'>

					</div>
				</div>

				<div>
					<!-- In progress TaskCards-->
					<div class='toDoHeadline'>
						<span>In progress</span>
						<div class='headlinePlusBtn' onclick='showAddTaskPopupWindow()'>

						</div>
					</div>
					<div id='progressDiv'>

					</div>
				</div>

				<div>
					<!-- Awaiting Feedback TaskCards-->
					<div class='toDoHeadline'>
						<span>Awaiting Feedback</span>
						<div class='headlinePlusBtn' onclick='showAddTaskPopupWindow()'>

						</div>
					</div>
					<div id='awaitingDiv'>

					</div>
				</div>

				<div>
					<!-- Done TaskCards-->
					<div class='toDoHeadline'>
						<span>Done</span>
						<div class='headlinePlusBtn' onclick='showAddTaskPopupWindow()'>

						</div>
					</div>
					<div id='doneDiv'>

					</div>
				</div>

            </div>
        </div>

        
        <!-- Add Task Overlay -->
        <div id='boardAddTask' class='boardAddTask d-none'>

        </div>
        <!-- Detail View Overlay -->
        <div id='boardTaskDetail' class='boardTaskDetail d-none'>

        </div>

		<div class='shadowOverlay d-none' id='boardPopup' onclick='disablePopupWindow()'>
           
        </div>
		`;
}


// Board AddTask



function boardAddTaskMarginSettings(){
	let screenWidth = window.innerWidth;
	document.querySelector('.boardAddTaskHeadline');
	if (document.querySelector('.boardAddTaskHeadline') && screenWidth < 1300){
		if (catListStatus){
			document.getElementById('boardAddTaskRightContainer').classList.add('addMarginCatList');
		}else{
			document.getElementById('boardAddTaskRightContainer').classList.remove('addMarginCatList');
		}
		if (assignListStatus){
			document.getElementById('boardAddTaskRightContainer').classList.add('addMarginAssignList');
		}else{
			document.getElementById('boardAddTaskRightContainer').classList.remove('addMarginAssignList');
		}
		if (catListStatus && assignListStatus){
			document.getElementById('boardAddTaskRightContainer').classList.remove('addMarginCatList');
			document.getElementById('boardAddTaskRightContainer').classList.remove('addMarginAssignList');
			document.getElementById('boardAddTaskRightContainer').classList.add('.addMarginBothList');
		}
	}

}

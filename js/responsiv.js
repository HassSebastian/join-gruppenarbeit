let boardResponsivView = false;


// responsiv Slider menu functions
function enableDisableSliderMenu() {
	let sliderMenu = document.querySelector('.sliderMenu');
	sliderMenu.classList.add('showSliderMenu');
}


// general Functions

// die resize Funktionen werden im Script aufgerufen !
// window.onresize = function () {
	
// 	rezizeCallRelatedBoardFunctions();
// 	resizeCallRelatedAddTaskFunctions();

// };






// function switchOverToMobilPhoneView(){
// 	if (window.innerWidth <= 768){
// 		let setMenu = selectedMenuBtnId;
// 		window.location.replace("./summary_mobile.html");
// 	}
// 	if (!document.querySelector('.content') && window.innerWidth >768){
// 		window.location.replace("./summary.html");
// 	}
// }



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


function getInnerWidth() {
	let tabWidth = window.innerWidth;
	getInnerWidthBoardRelatedFunctions(tabWidth);
}


// Board Responsiv Functions

function rezizeCallRelatedBoardFunctions(){
	// responsiv Board Functions
	if (window.innerWidth >= 769 && window.innerWidth <= 1400) {
		if (!boardResponsivView){
			
			document.getElementById('stylesheetBoardMobil').disabled = false;
			initBoardResponsivTablet();
			boardResponsivView = true;
		}
	}

	if (window.innerWidth < 769 || window.innerWidth > 1401) {
		if (boardResponsivView && selectedMenuBtnId == 2){
			document.getElementById('stylesheetBoardMobil').disabled = true;
			initBoard();
			boardResponsivView = false;
		}
	}
}


function getInnerWidthBoardRelatedFunctions(tabWidth){
	if (tabWidth >= 1401 || tabWidth < 769) {
		document.getElementById('stylesheetBoardMobil').disabled = true;
	}
	if (selectedMenuBtnId == 2 && tabWidth > 768 && tabWidth < 1401){
		boardResponsivView = true;
		document.getElementById('stylesheetBoardMobil').disabled = false;
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
	document.querySelector('.boardAddTaskHeadlineDiv');
	
	if (document.querySelector('.boardAddTaskHeadlineDiv') && screenWidth < 1300){
		if (catListStatus){
			document.getElementById('boardAddTaskRightContainer').classList.add('addMarginCatList');
			document.getElementById('boardAddTaskBtnContainer').classList.add('addMarginCatList');
			document.getElementById('boardAddTaskRightContainer').classList.remove('addMarginBothList');
		}else{
			document.getElementById('boardAddTaskRightContainer').classList.remove('addMarginCatList');
			document.getElementById('boardAddTaskBtnContainer').classList.remove('addMarginCatList');
			document.getElementById('boardAddTaskRightContainer').classList.remove('addMarginBothList');
		}
		if (assignListStatus){
			document.getElementById('boardAddTaskRightContainer').classList.add('addMarginAssignList');
			document.getElementById('boardAddTaskBtnContainer').classList.add('addMarginBothList');
			document.getElementById('boardAddTaskRightContainer').classList.remove('addMarginBothList');
		}else{
			document.getElementById('boardAddTaskRightContainer').classList.remove('addMarginAssignList');
			document.getElementById('boardAddTaskBtnContainer').classList.remove('addMarginBothList');
			document.getElementById('boardAddTaskRightContainer').classList.remove('addMarginBothList');

		}
		if (catListStatus && assignListStatus){
			document.getElementById('boardAddTaskRightContainer').classList.remove('addMarginCatList');
			document.getElementById('boardAddTaskRightContainer').classList.remove('addMarginAssignList');
			document.getElementById('boardAddTaskRightContainer').classList.add('addMarginBothList');
			document.getElementById('boardAddTaskBtnContainer').classList.add('addMarginBothList');
		}
	}

}

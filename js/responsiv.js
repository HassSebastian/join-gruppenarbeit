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

let boardResponsivView = false;

// Board Responsiv Functions

async function callBoardRelatedInit() {
	// responsiv Board Functions
	if (window.innerWidth > 768 && window.innerWidth <= 1400 && boardResponsivView == false) {
		if (selectedMenuBtnId == 2) {
			boardResponsivView = true;
			document.getElementById('stylesheetBoardMobil').disabled = false;
			document.getElementById('stylesheetMobilTemplates').disabled = true;
			await initBoardDesktopResponsiv();
		}
		if (selectedMenuBtnId != 2 && window.innerWidth > 1400) {
			document.getElementById('stylesheetBoardMobil').disabled = true;
			document.getElementById('stylesheetMobilTemplates').disabled = true;
			boardResponsivView = false;
		}
	}
	if (window.innerWidth > 1400 && selectedMenuBtnId == 2 && boardResponsivView == true) {
		boardResponsivView = false;
		await initBoardNormal();
	}
}

async function checkBoardInitMode() {
	if (window.innerWidth < 1400) {
		boardResponsivView = true;
		document.getElementById('stylesheetBoardMobil').disabled = false;
		document.getElementById('stylesheetMobilTemplates').disabled = true;
		await initBoardDesktopResponsiv();
	}
}

async function initBoardDesktopResponsiv() {
	await renderBoardResponsivHtml();
	await loadTask();
	await createWorkStatusArrays();
	await renderAllCardsMobil();
}

async function renderBoardResponsivHtml() {
	document.getElementById('content').innerHTML = '';
	document.getElementById('content').innerHTML = /*html*/ `
	<div class="boardContainer">
		<div class="boardOverlay">
			<div class="boardHeadline">
				<span>Board</span>
			</div>
			<div class="inputOutContainer">
				<div class="inputContainer">
					<div class="inputInContainer">
						<div class="inputFontContainer">
							<input type="text" id="searchField" required placeholder="Find Task" onfocus="startSearch(event)" autocomplete="off" />
						</div>
						<div class="vector"></div>
						<img src="./assets/img/search_logo.png" />
					</div>
				</div>
				<button class="addTaskButton" onclick="showAddTaskPopupWindow()">
					<span>Add task</span>
					<div class="plusOutContainer">
						<img src="./assets/img/plus_logo_white.png" />
					</div>
				</button>
			</div>
		</div>
		<!--  -->

		<div class="boardTaskCardOuterContainer">
			<div class="toDoOuterContainer">
				<div>
					<!-- toDo TaskCards -->
					<div class="toDoHeadline">
						<span>To do</span>
						<div class="headlinePlusBtn" onclick="showAddTaskPopupWindow()"></div>
					</div>

					<div id="toDoDiv"></div>
				</div>

				<div>
					<!-- In progress TaskCards-->
					<div class="toDoHeadline">
						<span>In progress</span>
						<div class="headlinePlusBtn" onclick="showAddTaskPopupWindow()"></div>
					</div>
					<div id="progressDiv"></div>
				</div>

				<div>
					<!-- Awaiting Feedback TaskCards-->
					<div class="toDoHeadline">
						<span>Awaiting Feedback</span>
						<div class="headlinePlusBtn" onclick="showAddTaskPopupWindow()"></div>
					</div>
					<div id="awaitingDiv"></div>
				</div>

				<div>
					<!-- Done TaskCards-->
					<div class="toDoHeadline">
						<span>Done</span>
						<div class="headlinePlusBtn" onclick="showAddTaskPopupWindow()"></div>
					</div>
					<div id="doneDiv"></div>
				</div>
			</div>
		</div>

		<!-- Add Task Overlay -->
		<div id="boardAddTask" class="boardAddTask d-none"></div>
		<!-- Detail View Overlay -->
		<div id="boardTaskDetail" class="boardTaskDetail d-none"></div>

		<div class="shadowOverlay d-none" id="boardPopup" onclick="disablePopupWindow()"></div>
	</div>
	<div class="shadowOverlay d-none" id="boardPopup" onclick="disablePopupWindow()"></div>
		`;
}

// Board AddTask

function boardAddTaskMarginSettings() {
	let screenWidth = window.innerWidth;
	document.querySelector('.boardAddTaskHeadlineDiv');

	if (document.querySelector('.boardAddTaskHeadlineDiv') && screenWidth < 1300) {
		if (catListStatus) {
			document.getElementById('boardAddTaskRightContainer').classList.add('addMarginCatList');
			document.getElementById('boardAddTaskBtnContainer').classList.add('addMarginCatList');
			document.getElementById('boardAddTaskRightContainer').classList.remove('addMarginBothList');
		} else {
			document.getElementById('boardAddTaskRightContainer').classList.remove('addMarginCatList');
			document.getElementById('boardAddTaskBtnContainer').classList.remove('addMarginCatList');
			document.getElementById('boardAddTaskRightContainer').classList.remove('addMarginBothList');
		}
		if (assignListStatus) {
			document.getElementById('boardAddTaskRightContainer').classList.add('addMarginAssignList');
			document.getElementById('boardAddTaskBtnContainer').classList.add('addMarginBothList');
			document.getElementById('boardAddTaskRightContainer').classList.remove('addMarginBothList');
		} else {
			document.getElementById('boardAddTaskRightContainer').classList.remove('addMarginAssignList');
			document.getElementById('boardAddTaskBtnContainer').classList.remove('addMarginBothList');
			document.getElementById('boardAddTaskRightContainer').classList.remove('addMarginBothList');
		}
		if (catListStatus && assignListStatus) {
			document.getElementById('boardAddTaskRightContainer').classList.remove('addMarginCatList');
			document.getElementById('boardAddTaskRightContainer').classList.remove('addMarginAssignList');
			document.getElementById('boardAddTaskRightContainer').classList.add('addMarginBothList');
			document.getElementById('boardAddTaskBtnContainer').classList.add('addMarginBothList');
		}
	}
}

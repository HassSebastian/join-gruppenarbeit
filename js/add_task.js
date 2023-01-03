'use strict';

let catListStatus = false;
let assignListStatus = false;
let newCatInputActive = false;
let addTaskCategoryList = [];
let joinTaskArray = [];
let taskData = {};
let title = '';
let descripten = '';
let category = '';
let catColor = '';
let assigndTo = '';
let dueDate = '';
let prio = '';
let subTask = '';
let subTaskArray = [];
let selectedSubtasks = [];
/* 
!TEST ARRAY for renderFunciont (assignedContact list in dropdown menu) */
let coworkersToAssignTo = [
	{
		firstName: 'Lisa',
		lastName: 'Kammler',
		email: 'lisa.kammler@webber.de',
		check: false,
	},
	{
		firstName: 'Christopher Kai',
		lastName: 'Greenkohl',
		email: 'ck.greeny@hotmail.com',
		check: false,
	},
	{
		firstName: 'Thorsten',
		lastName: 'Kern',
		email: 'thosten.kernel@hobby.com',
		check: false,
	},
	{
		firstName: 'Frieda',
		lastName: 'April',
		email: 'aPril_frieda@shite.sa',
		check: false,
	},
	{
		firstName: 'Helmut',
		lastName: 'Müller',
		email: 'sindSaödf@hurz.de',
		check: false,
	},
	{
		firstName: 'Bichtig',
		lastName: 'Tuer',
		email: 'sisdfsadfz.de',
		check: false,
	},
	{
		firstName: 'Smelly',
		lastName: 'Arter',
		email: 'hurz@de',
		check: false,
	},
	{
		firstName: 'Claudia',
		lastName: 'Schiffer',
		email: 'warmaljung@web.de',
		check: false,
	},
	{
		firstName: 'Wans',
		lastName: 'Hurst',
		email: 'wdg@web.de',
		check: false,
	},
];

let taskForce = []; // team that will be working on the current task

async function initAddTask() {
	await includeHTML();
	await renderAddTask();
	await loadExitingCategories();
	renderCategoryList();
	newCatInputActive = false;
	renderSubtasks();
	selectedMenuBtnId = 0;
	selectedMenuButton(3);
	renderContactsInAssignDropDownMenu(); //for dropdown menu in assignTo
}

/**
 * This function render the HTML content of "Add Task Menu" into the content div of the HTML template.
 *
 */
async function renderAddTask() {
	document.getElementById('content').innerHTML = '';
	document.getElementById('content').innerHTML += /*html*/ `
	<div class="addTaskHeadlineDiv">
		<h2 class="addTHeadline">Add Task</h2>
	</div>
	<div class="addTaskBtnOuterContainer">
		<div class="addTaskBtnInnerContainer">
			<button
				class="addTaskClear"
				onmouseover="addTaskClearOn()"
				onmouseout="addTaskClearOff()"
				onclick="clearFormularData()"
			>
				<span>Clear</span>
				<img id="addTaskClear" src="./assets/img/clearb.png" />
			</button>
			<button class="addTaskCreate" onclick="checkInputs()">
				<span>Create Task</span>
				<img src="./assets/img/createb.png" />
			</button>
		</div>
	</div>
	<!-- <form onsubmit="goToPrio();return false"> -->
	<div class="addTaskAddTitleContainer">
		<div class="addTaskAddTitleBox">
			<h3>Title</h3>
			<form onsubmit="goToDescripten(); return false">
				<input
					required
					type="text"
					placeholder="Enter a title"
					id="addTaskTitle"
					autocomplete="off"
					minlength="3"
				/>
			</form>
			<span class="requiredText" id="titleReq">This field is required</span>
		</div>

		<div class="addTaskAddDescriptenBox">
			<h3>Descripten</h3>
			<!-- <form onblur='goToCategorySelection(); return false' id='formDesc' action='action.asp'> -->
			<textarea
				form="formDesc"
				type="text"
				placeholder="Enter Descripten"
				id="addTaskDescripten"
				required
				minlength="5"
			></textarea>
			<!-- </form> -->
			<span class="requiredText" id="descReq">This field is required</span>
		</div>

		<div class="addTaskAddCategoryBox">
			<h3>Category</h3>
			<button onclick="enableDisableCatList()" id="selectedCat">
				<input
					disabled
					id="selectedCatInput"
					placeholder="Select task category"
					autocomplete="off"
				/>
				<span id="sColor"></span>
				<div class="newCategoryImgDiv d-none" id="addTaskNewCatBtn">
					<img src="assets/img/new_cat_cancel.png" />
					<img src="assets/img/bnt_divider.png" class="btnDivider" />
					<img src="assets/img/akar-icons_check.png" />
				</div>
				<img
					src="assets/img/Vector 2.png"
					class="dropdownImg"
					id="dropdownImg"
				/>
			</button>
			<span class="listD-none requiredText" id="catReq"
				>This field is required</span
			>
			<ul class="addTaskCatList listD-none" id="CatListDropdown"></ul>
			<div class="addTaskAddCategoryColor listD-none" id="colorSelection">
				<div class="color0" id="color0Div" onclick="addColorToCat(0)"></div>
				<div class="color1" id="color1Div" onclick="addColorToCat(1)"></div>
				<div class="color2" id="color2Div" onclick="addColorToCat(2)"></div>
				<div class="color3" id="color3Div" onclick="addColorToCat(3)"></div>
				<div class="color4" id="color4Div" onclick="addColorToCat(4)"></div>
				<div class="color5" id="color5Div" onclick="addColorToCat(5)"></div>
			</div>
		</div>

		<div class="addTaskAssignedBox" id="addTaskAssignedBox">
			<h3>Assigned to</h3>
			<button id="addTaskAssignedButton" onclick="enableDisableAssignList()">
				<input
						disabled
						onclick="doNotCloseOnClick(event)"
						id="selectedAssign"
						name="selectedAssign"
						class="inputselectedAssign"
						placeholder="Select contacts to assign"
						autocomplete="off"
					/>
				
				<div
				id="assignToCancelConfirmImgContainer"
				class="assignToCancelConfirmImgContainer d-none"
				>
					<img
					onclick="assignBoxBackToDefaultMode(), enableAssignList()"
					class="assignToCancelIcon"
					src="assets/img/cancel-black.png"
					alt="cancel"
					/>
					<img class="assignToDeviderIcon" src="assets/img/bnt_divider.png" />
					<img
					onclick="frontEndDeveloper()"
					class="assignToCheckIcon"
					src="assets/img/akar-icons_check.png"
					alt="confirm"
					/>
				</div>
				<img id="assignDropDownImg" src="assets/img/Vector 2.png" class="dropdownImg" />
			</button>
			<span id="assignReq">This field is required</span>
			<div id="badgesTaskForce" class="badgesTaskForce"></div>
			<ul class="addTaskAssignList listD-none" id="dropdown2">

				<li onclick="assigendContactEmail()" class="inviteNewContacts">
					Invite new contacts<img
						class="assignInviteNewContactImage"
						src="assets/img/assigned_inviteNewContact.png"
						alt=""
					/>
				</li>
				<li>
		You
		<div  class="assignCheckboxContainer">
			<img class="checkBox" src="assets/img/check_box.png" alt="checkbox" />
			<img class="checkMark" src="assets/img/check_mark.png" />
		</div>
			</li>
			</ul>
		</div>
	</div>
	<div class="addTaskDivider"></div>

		</div>

		<div class='addTaskRightContainer'>
			<div class='addTaskDate'>
				<h3>Due date</h3>
				<input required type="date" id='dueDate'>
				<span class='requiredText' id='dateReq'>This field is required</span>
			</div>
			<div class='addTaskPrio'>
				<h3>Prio</h3>
				<div class='addTaskPrioIcons'>
					<div class='addTaskUrgent' id='addTaskUrgent' onclick='addPrio(0)'>
						<span id='addTaskUrgentSpan'>Urgent</span>
						<img id='addTaskUrgentImg' src="../assets/img/urgent_arrows.png">
					</div>
					<div class='addTaskMedium' id='addTaskMedium' onclick='addPrio(1)'>
						<span id='addTaskMediumSpan'>Medium</span>
						<img id='addTaskMediumImg' src="../assets/img/prio_medium.png">
					</div>
					<div class='addTaskLow' id='addTaskLow' onclick='addPrio(2)'>
						<span id='addTaskLowSpan'>Low</span>
						<img id='addTaskLowImg' src="../assets/img/prio_low.png">
					</div>
				</div>
			</div>
			<div class='subtask'>
				<h3>Subtask</h3>
				<div class='inputDiv'>
					<form onsubmit='addSubtask(); return false' >
					<input
					type="text"
					placeholder="Add new subtask"
					id="subTask"
					autocomplete="off"
					onfocus="subTaskInputentered()"
					onblur="subTaskInputLeave()"
					minlength="3"
				/>
				<img
					src="../assets/img/add_cross.png"
					class="subtaskCross"
					id="subtaskCross"
					onclick="enterSubTaskInput()"
				/>
					</form>
					<div class='subTaskImgDiv d-none' id='subTaskImgDiv' >
						<img src="../assets/img/new_cat_cancel.png" onclick='resetSubtaskInput()'>
						<img src="../assets/img/bnt_divider.png" class='btnDivider'>
						<img src="../assets/img/akar-icons_check.png" onclick='addSubtask()'>
					</div>
					
				</div>
				
				<div class='addTaskCheckbox' id='subtaskCheckboxes'>
					<!-- <div>
						<input type="checkbox">
						<span>Subtask 1</span>
					</div> -->
				</div>
				
				
			</div>
		</div>
	<!-- </form>  -->
	<div class="taskAddedToBoard" id="taskCreatedIndication">
		<div class="taskAddedToBoardContainer">
			<span>Task added to board</span>
			<img src="./assets/img/img_board_w.png" />
		</div>
	</div>    



    `;
}

// this are test function for the HTML 5 Form validation !
function goToDescripten() {
	document.getElementById('addTaskDescripten').focus();
}

function goToPrio() {
	document.getElementById('addTaskUrgent').focus();
}
// this are test function for the HTML 5 Form validation end!

/**
 * This function load the data(key:joinTaskArray) from local storage.
 * Then it filter this data to create a JSON Array with existing categories.
 */
async function loadExitingCategories() {
	loadTask();
	addTaskCategoryList = [{ category: 'New Category', catColor: '' }];
	for (let i = 0; i < joinTaskArray.length; i++) {
		let taskCategory = joinTaskArray[i]['category'];
		let categoryColor = joinTaskArray[i]['catColor'];
		addTaskCategoryList.push({
			category: taskCategory,
			catColor: categoryColor,
		});
	}
}

/**
 * This function load the data(key:joinTaskArray) from local storage.
 */
function loadTask() {
	if (joinTaskArrayExistInStorage()) {
		let joinTaskArrayString = localStorage.getItem('joinTaskArray');
		joinTaskArray = JSON.parse(joinTaskArrayString);
	}
}

/**
 * This function determind data(key:joinTaskArray) available in local storage.
 *
 * @returns true or false
 */
function joinTaskArrayExistInStorage() {
	return localStorage.getItem('joinTaskArray');
}

/**
 * This function enable or disable the Dropdown Menu of the category selector.
 */
function enableDisableCatList() {
	if (categoryListAndNewCategoryInputNotActive()) {
		document.getElementById('CatListDropdown').classList.remove('listD-none');
		document.getElementById('addTaskAssignedBox').classList.add('addMarginTop');
	} else {
		document.getElementById('CatListDropdown').classList.add('listD-none');
		document.getElementById('addTaskAssignedBox').classList.remove('addMarginTop');
	}
	catListStatus = !catListStatus;
}

/**
 * This function determind "Dropdown Menu" of the category selector and "Category Input" active or not active.
 *
 * @returns true or false
 */
function categoryListAndNewCategoryInputNotActive() {
	return !catListStatus && !newCatInputActive;
}

/**
 * This function render the category list of the dropdown menu category.
 */
function renderCategoryList() {
	document.getElementById('CatListDropdown').innerHTML = '';
	for (let i = 0; i < addTaskCategoryList.length; i++) {
		let categoryName = addTaskCategoryList[i]['category'];
		let categoryColor = addTaskCategoryList[i]['catColor'];
		if (categoryColorAvailable(categoryColor)) {
			document.getElementById('CatListDropdown').innerHTML +=
				dropdownCategoryListHtml(categoryName, categoryColor, i);
		} else {
			document.getElementById('CatListDropdown').innerHTML +=
				dropdownCategoryListHtml1(categoryName, i);
		}
	}
}

/**
 * this function checked, a backgroundcolor is set for this category.
 * @param {number} categoryColor - This is a number that is equal to the css color classes. Example, if the number is 1
 * the related css color class is 'color1'.
 * @returns - true, if a backgroundcolor is set. if not, it returns false.
 */
function categoryColorAvailable(categoryColor) {
	return categoryColor != '';
}

/**
 * this function return the html code for the category list if backgroundcolor is available.
 * @param {string} categoryName - is the category name as string.
 * @param {number} categoryColor - is a number that is related to the category backgroundcolor.
 * @param {number} i - is the index number of the category array.
 * @returns - the html string for the category list if backgroundcolor is available.
 */
function dropdownCategoryListHtml(categoryName, categoryColor, i) {
	return /*html*/ `
        <li onclick='selectCategory(${i})'>
            ${categoryName}
            <div  class='color${categoryColor} addTaskColorDiv'></div>
        </li>`;
}

/**
 * this function return the html code for the category list if backgroundcolor is not available.
 * @param {string} categoryName - is the category name as string.
 * @param {number} categoryColor - is a number that is related to the category backgroundcolor.
 * @param {number} i - is the index number of the category array.
 * @returns - the html string for the category list if backgroundcolor is not available.
 */
function dropdownCategoryListHtml1(categoryName, i) {
	return /*html*/ `
        <li onclick='selectCategory(${i})'>
            ${categoryName}
        </li>`;
}

/**
 * this function add a new category to the category list.
 */
function setNewCategoryToList() {
	let newSetCategory = document.getElementById('selectedCatInput').value;
	newSetCategory = newSetCategory.trim();
	if (newSetCategory != '') {
		let newCatColor = catColor;
		let newCategoryItem = {
			category: newSetCategory,
			catColor: newCatColor,
		};
		addTaskCategoryList.push(newCategoryItem);
		let newCategoryIndex = addTaskCategoryList.length - 1;
		renderCategoryList();
		selectCategory(+newCategoryIndex);
		catListStatus = false;
		newCatInputActive = false;
	}
}

/**
 * this function set the input field for a new category to 'selected a category'.
 */
function resetCatSelection() {
	newCatInputActive = false;
	catListStatus = !catListStatus;
	document.getElementById('colorSelection').classList.add('listD-none');
	document.getElementById('selectedCat').innerHTML = resetCatSelectionHtml();
}

/**
 * this function return the input html code for the category selection 'selected a category'.
 */
function resetCatSelectionHtml() {
	return /*html*/ `
        <input disabled id='selectedCatInput' placeholder='Select task category' autocomplete='off'>
        <span id='sColor'></span>
        <div class='newCategoryImgDiv d-none' id='addTaskNewCatBtn'>
            <img src="../assets/img/new_cat_cancel.png">
            <img src="../assets/img/bnt_divider.png" class='btnDivider'>
            <img src="../assets/img/akar-icons_check.png">
        </div>
        <img src="../assets/img/Vector 2.png" class='dropdownImg' id='dropdownImg'>`;
}

/**
 * this function start subfunction to set the selected category (catId > 0) in the field category or open a input field to create a
 * new category (catId = 0)
 * @param {number} catId - this value is equal to the index of the category list of the selected category.
 */
function selectCategory(catId) {
	if (newCategoryCreationIsSelected(catId)) {
		setSettingsForNewCategoryInput();
	} else {
		setSettingsForExistingCategory(catId);
	}
}

/**
 * this function returns true or false for the if query. It is 'true' if the catId Value is 0.
 * @param {number} catId - this value is equal to the index of the category list of the selected category.
 * @returns - true or false for the if query
 */
function newCategoryCreationIsSelected(catId) {
	return catId == 0;
}

/**
 * this function render the category field to a input field to create a new category and
 * create on the right side of the category field a enter and cancel button for the new entered category name.
 */
function setSettingsForNewCategoryInput() {
	document.getElementById('selectedCat').innerHTML = newCategoryInputHtml();
	newCatInputActive = true;
	enableDisableCatList();
	document.getElementById('addTaskNewCatBtn').classList.remove('d-none');
	document.getElementById('dropdownImg').classList.add('d-none');
	document.getElementById('colorSelection').classList.remove('listD-none');
	document.getElementById('sColor').innerHTML = '';
	addColorToCat(3);
}

/**
 * this function render the html code for the category input field to create a new category.
 * @returns - the html code for the input field category.
 */
function newCategoryInputHtml() {
	return /*html*/ `
        <input id='selectedCatInput' placeholder='New Category' autocomplete='off'>
        <span id='sColor'></span>
        <div class='newCategoryImgDiv d-none' id='addTaskNewCatBtn'>
            <img src="../assets/img/new_cat_cancel.png" onclick='resetCatSelection()'>
            <img src="../assets/img/bnt_divider.png" class='btnDivider'>
            <img src="../assets/img/akar-icons_check.png" onclick='setNewCategoryToList()'>
        </div>
        <img src="../assets/img/Vector 2.png" class='dropdownImg' id='dropdownImg'>`;
}

/**
 * this function perform the settings for the category field indication for a existing category.
 * @param {number} catId - this value is equal to the index of the category list of the selected category.
 */
function setSettingsForExistingCategory(catId) {
	let newCat = addTaskCategoryList[catId]['category'];
	let categoryColor = addTaskCategoryList[catId]['catColor'];
	document.getElementById('selectedCat').innerHTML = existingCategoryHtml(
		newCat,
		categoryColor
	);
	catColor = categoryColor;
	enableDisableCatList();
	document.getElementById('dropdownImg').classList.remove('d-none');
	document.getElementById('colorSelection').classList.add('listD-none');
}

/**
 * this function returns the HTML code for selected category. To show it in the category field.
 * @param {*} newCat - this value is equal to the index of the addTaskCategoryList.
 * @param {*} categoryColor - this value X is equal to the css colorX.
 * @returns - the HTML code for the category field for a existing category.
 */
function existingCategoryHtml(newCat, categoryColor) {
	return /*html*/ `
        <p id='selectedCatInput'>${newCat}</p>
        <span id='sColor'><div class='color${categoryColor} addTaskColorDiv'></div></span>
        <img src="../assets/img/Vector 2.png" class='dropdownImg' id='dropdownImg'>`;
}

/**
 * this function set the settings for a selected catogory of the submenu of the new category creation.
 * @param {number} colorId
 */
function addColorToCat(colorId) {
	if (catColor != '' || catColor == '0') {
		document
			.getElementById('color' + catColor + 'Div')
			.classList.remove('colorDivSelected');
		catColor = '';
	}
	document.getElementById('color' + colorId + 'Div').classList.add('colorDivSelected');
	catColor = colorId;
}

/**
 * this function show a popup, that indicated that the new task is succsessfully created.
 */
function showAddDiv() {
	document
		.getElementById('taskCreatedIndication')
		.classList.add('taskCreatedIndication');
}

/**
 * this function inhibited to show a popup, that indicated that the new task is succsessfuly created.
 */
function notShowAddDiv() {
	document
		.getElementById('taskCreatedIndication')
		.classList.remove('taskCreatedIndication');
}

/**
 * this function check over some subfunction, all required form values are valid. If not it starts subfuction
 * to indicated the required fields.
 */
function checkInputs() {
	getReqiredFieldValues();
	resetRequiredWarnings();
	if (requiredFieldAreNotValid()) {
		setRequiredTextWarnings();
	} else {
		createTaskData();
	}
}

/**
 * this function determind all required fields are filled out.
 * @returns - returns true or false
 */
function requiredFieldAreNotValid() {
	return title == '' || dueDate == '' || category == '' || descripten == '';
}

/**
 * this function enable or disable the indication 'this field is required'.
 */
function setRequiredTextWarnings() {
	if (title == '') {
		document.getElementById('titleReq').style = 'opacity: 1;';
	}
	if (dueDate == '') {
		document.getElementById('dateReq').style = 'opacity: 1;';
	}
	if (category == '') {
		document.getElementById('catReq').style = 'opacity: 1;';
		document.getElementById('catReq').classList.remove('listD-none');
	}
	if (descripten == '') {
		document.getElementById('descReq').style = 'opacity: 1;';
	}
}

/**
 * this function get all required fields values.
 */
function getReqiredFieldValues() {
	title = document.getElementById('addTaskTitle').value;
	title = title.trim();
	dueDate = document.getElementById('dueDate').value;
	dueDate = dueDate.trim();
	descripten = document.getElementById('addTaskDescripten').value;
	descripten = descripten.trim();
	if (newCatInputActive) {
		category = document.getElementById('selectedCatInput').value;
	} else {
		category = document.getElementById('selectedCatInput').innerHTML;
	}
	category = category.trim();
}

/**
 * this function disable all 'This field is required' indications.
 */
function resetRequiredWarnings() {
	document.getElementById('titleReq').style = 'opacity: 0;';
	document.getElementById('dateReq').style = 'opacity: 0;';
	document.getElementById('catReq').style = 'opacity: 0;';
	document.getElementById('descReq').style = 'opacity: 0;';
}

// ToDo must be reworked when all selection possible !!!!!!!!!!!!!!!!
function clearFormularData() {
	document.getElementById('addTaskTitle').value = '';
	descripten = document.getElementById('addTaskDescripten').value = '';
	document.getElementById('selectedCat').innerHTML = /*html*/ `
        <input disabled id='selectedCatInput' placeholder='Select task category' autocomplete='off'>
        <span id='sColor'></span>
        <div class='newCategoryImgDiv d-none' id='addTaskNewCatBtn'>
            <img src="../assets/img/new_cat_cancel.png">
            <img src="../assets/img/bnt_divider.png" class='btnDivider'>
            <img src="../assets/img/akar-icons_check.png">
        </div>
        <img src="../assets/img/Vector 2.png" class='dropdownImg' id='dropdownImg'>`;
	document.getElementById('dueDate').value = '';
	resetSubtaskSelections();
	selectedSubtasks = [];
	document.getElementById('titleReq').style = 'opacity: 0;';
	document.getElementById('dateReq').style = 'opacity: 0;';
	document.getElementById('catReq').style = 'opacity: 0;';
	document.getElementById('catReq').classList.add('listD-none');
	clearTaskForce(); // TEST von Christian
}

// save data to local storage/server!
function createTaskData() {
	loadTask();
	getDataFromFomular();
	fillTaskData();
	pushTaskData();
	saveTask();
	showAddDiv();
	setTimeout(initBoard, 1200);
}

// toDo this is a transition function that to have reworked after all data for task card avalable.
function getDataFromFomular() {
	descripten = document.getElementById('addTaskDescripten').value;
	assigndTo = 'not included jet';
	subTask = document.getElementById('subTask').value;
}

/**
 * this fuction collect all data for the Taskcard in a JSON format.
 */
function fillTaskData() {
	setSubtaskStatusForBoardToFalse();
	taskData = {
		title: title,
		descripten: descripten,
		category: category,
		catColor: catColor,
		assignedTo: assigndTo,
		dueDate: dueDate,
		prio: prio,
		subTasks: selectedSubtasks,
		workFlowStatus: 0,
	};
	catColor = '';
}

function setSubtaskStatusForBoardToFalse() {
	for (let i = 0; i < selectedSubtasks.length; i++) {
		selectedSubtasks[i]['subtaskStatus'] = false;
	}
}

/**
 * this function push all Taskdata to the main Array.
 */
function pushTaskData() {
	joinTaskArray.push(taskData);
}

/**
 * this function save the main array to the local storage.
 */
function saveTask() {
	localStorage.setItem('joinTaskArray', JSON.stringify(joinTaskArray));
}

// deleteJoinTaskArrayFromServer() is not used in this code, it is only to remove the Array from Server!!!!!!!!!!!
function deleteJoinTaskArrayFromServer() {
	localStorage.removeItem('joinTaskArray');
}
// save data to local storage/server end!

/******************************************************************************** */
function addTaskClearOn() {
	document.getElementById('addTaskClear').src = '././assets/img/close_logo_blue.png';
}

function addTaskClearOff() {
	document.getElementById('addTaskClear').src = './assets/img/close_logo.png';
}

function addPrio(prioIdIndex) {
	let idList = ['addTaskUrgent', 'addTaskMedium', 'addTaskLow'];
	let selectedId = idList[+prioIdIndex];
	let cListLength = document.getElementById(selectedId).classList.length;
	let btnName = selectedId.replace('addTask', '');
	idList.splice(prioIdIndex, 1);
	if (btnNotSelected(cListLength)) {
		selectPrioBtn(selectedId, btnName);
		unselectOtherBtn(idList);
	} else {
		removeBtnSelection(btnName);
	}
}

function btnNotSelected(cListLength) {
	return cListLength == 1;
}

function selectPrioBtn(selectedId, btnName) {
	document.getElementById(selectedId).classList.add(`${btnName.toLowerCase()}-color`);
	document.getElementById(`addTask${btnName}Span`).classList.add('color-white');
	document.getElementById(
		`addTask${btnName}Img`
	).src = `./assets/img/${btnName.toLowerCase()}_white.png`;
	prio = btnName;
}

function removeBtnSelection(btnName) {
	document
		.getElementById(`addTask${btnName}`)
		.classList.remove(`${btnName.toLowerCase()}-color`);
	document.getElementById(`addTask${btnName}Span`).classList.remove('color-white');
	document.getElementById(
		`addTask${btnName}Img`
	).src = `./assets/img/${btnName.toLowerCase()}.png`;
}

function unselectOtherBtn(idList) {
	for (let i = 0; i < idList.length; i++) {
		let selectedId = idList[i];
		let cListLength = document.getElementById(selectedId).classList.length;
		let btnName = selectedId.replace('addTask', '');
		if (btnIsSelected(cListLength)) {
			document
				.getElementById(`addTask${btnName}`)
				.classList.remove(`${btnName.toLowerCase()}-color`);
			document
				.getElementById(`addTask${btnName}Span`)
				.classList.remove('color-white');
			document.getElementById(
				`addTask${btnName}Img`
			).src = `./assets/img/${btnName.toLowerCase()}.png`;
		}
	}
}

function btnIsSelected(cListLength) {
	return cListLength == 2;
}

// subtask functions
function subTaskInputentered() {
	document.getElementById('subtaskCross').classList.add('d-none');
	document.getElementById('subTaskImgDiv').classList.remove('d-none');
}

function subTaskInputLeave() {
	let subTaskText = document.getElementById('subTask').value;
	subTaskText = subTaskText.trim();
	if (subTaskText == '') {
		document.getElementById('subtaskCross').classList.remove('d-none');
		document.getElementById('subTaskImgDiv').classList.add('d-none');
	}
}

function enterSubTaskInput() {
	document.getElementById('subTask').onfocus();
}

function resetSubtaskInput() {
	document.getElementById('subTask').value = '';
	// document.getElementById('subtaskCross').classList.remove('d-none');
	// document.getElementById('subTaskImgDiv').classList.add('d-none');
	// subTaskInputLeave();
}

function addSubtask() {
	let subTaskText = document.getElementById('subTask').value;
	subTaskText = subTaskText.trim();
	if (subTaskText != '' && subTaskText.length >= 3) {
		subTaskInputLeave();
		// subTaskArray.push(subTaskText);
		pushNewSubtaskDatatoArray(subTaskText);

		renderSubtasks();
		resetSubtaskInput();
		// document.getElementById(`subtask${subTaskArray.length - 1}`).checked = true;
		createSubtaskListToSave();
	}
}

// new Array function here
function pushNewSubtaskDatatoArray(subTaskText) {
	let subtaskJson = { subtaskText: subTaskText, subtaskStatus: true };
	subTaskArray.push(subtaskJson);
}

async function renderSubtasks() {
	await subtaskListHtml();
	for (let i = 0; i < subTaskArray.length; i++) {
		if (subTaskArray[i]['subtaskStatus']) {
			document.getElementById(`subtask${i}`).checked = true;
		}
	}
}

async function subtaskListHtml() {
	document.getElementById('subtaskCheckboxes').innerHTML = '';
	for (let i = 0; i < subTaskArray.length; i++) {
		let subTaskTitle = subTaskArray[i]['subtaskText'];
		document.getElementById('subtaskCheckboxes').innerHTML += /*html*/ `
        <div>
            <input type="checkbox" id='subtask${i}' onclick='subtaskSelectionChange(${i})'>
            <span>${subTaskTitle}</span>
        </div>`;
	}
}

function subtaskSelectionChange(subTaskIndex) {
	let actualSubTaskStatus = document.getElementById(`subtask${subTaskIndex}`).checked;
	if (actualSubTaskStatus) {
		subTaskArray[subTaskIndex]['subtaskStatus'] = true;
	} else {
		subTaskArray[subTaskIndex]['subtaskStatus'] = false;
	}
	createSubtaskListToSave();
}

function createSubtaskListToSave() {
	selectedSubtasks = [];
	for (let i = 0; i < subTaskArray.length; i++) {
		let subTaskText = subTaskArray[i]['subtaskText'];
		let subTaskStatus = subTaskArray[i]['subtaskStatus'];
		let subtaskJson = { subtaskText: subTaskText, subtaskStatus: subTaskStatus };
		if (subTaskStatus) {
			selectedSubtasks.push(subtaskJson);
		}
	}
}

function resetSubtaskSelections() {
	for (let i = 0; i < subTaskArray.length; i++) {
		document.getElementById(`subtask${i}`).checked = false;
	}
}

/* 
!Christian working here 
*/
/*=======================
   ASSIGN TO FUNCTIONS (start: 24.12.2022)
=======================*/

/**
 * If the list is not visible, make it visible and remove the border bottom from the button. If the
 * list is visible, add the border bottom to the button and make the list invisible.
 */
function enableDisableAssignList() {
	if (!assignListStatus) {
		document.getElementById('dropdown2').classList.remove('listD-none');
		borderBottomOffAssignedBoxButton();
		showBadgesTaskForce();
	} else {
		borderBottomOnAssignedBoxButton();
		document.getElementById('dropdown2').classList.add('listD-none');
		hideBadgesTaskForce();
	}
	assignListStatus = !assignListStatus;
}

function enableAssignList() {
	document.getElementById('dropdown2').classList.remove('listD-none');
	assignListStatus = !assignListStatus;
}

/**
 * When the user clicks the 'Add Task' button,
 * the border radius of the 'Add Task' button will change
 * to 10px 10px 0 0.
 */
function borderBottomOffAssignedBoxButton() {
	document.getElementById(
		'addTaskAssignedButton'
	).style = `border-radius: 10px 10px 0 0;`;
}

/**
 * It changes the border radius of the button with the id of 'addTaskAssignedButton'
 * to 10px.
 */
function borderBottomOnAssignedBoxButton() {
	document.getElementById(
		'addTaskAssignedButton'
	).style = `border-radius: 10px 10px 10px 10px;`;
}

function assignChangeInputPlaceholderToContactEmail() {
	document.getElementsByName('selectedAssign')[0].placeholder = `Contact email`;
}

function enableInputaddTasAssign() {
	document.getElementById('selectedAssign').disabled = false;
}

function showCancelConfirmButtons() {
	document
		.getElementById('assignToCancelConfirmImgContainer')
		.classList.remove('d-none');
}

function hideAssignDropDownImg() {
	document.getElementById('assignDropDownImg').classList.add('d-none');
}

function assignInputAutoFocus() {
	document.getElementById('selectedAssign').focus();
}

/**
 * Prepares everything to to being able to assign someone to current task.
 */
function assigendContactEmail() {
	assignChangeInputPlaceholderToContactEmail();
	enableInputaddTasAssign();
	showCancelConfirmButtons();
	hideAssignDropDownImg();
	assignInputAutoFocus();
	changeAssignPlaceholderColorToGrey();
}

function doNotCloseOnClick(event) {
	event.stopPropagation();
}

function assignInputPlaceholderToDefaultMode() {
	document.getElementsByName(
		'selectedAssign'
	)[0].placeholder = `Select contacts to Assign`;
}

function assignInputValueToDefault() {
	document.getElementById('selectedAssign').value = '';
}

function hideCancelConfirmButtons() {
	document.getElementById('assignToCancelConfirmImgContainer').classList.add('d-none');
}

function showAssignDropDownImg() {
	document.getElementById('assignDropDownImg').classList.remove('d-none');
}

function disableInputAddTasAssign() {
	document.getElementById('selectedAssign').disabled = true;
}

function changeAssignPlaceholderColorToGrey() {
	document.getElementById('selectedAssign').classList.add('greyPlaceholder');
}

function changeAssignPlaceholderColorToDefault() {
	document.getElementById('selectedAssign').classList.remove('greyPlaceholder');
}

function assignBoxBackToDefaultMode() {
	assignInputPlaceholderToDefaultMode();
	changeAssignPlaceholderColorToDefault();
	assignInputValueToDefault();
	hideCancelConfirmButtons();
	showAssignDropDownImg();
	disableInputAddTasAssign();
}

/**
 * Find the index of the member of the task force whose email address is the same as the email address
 * passed in as a parameter.
 * @param emailAddress - The email address of the member of the task force.
 * @returns The index of the member of the task force.
 */
function findIndexOfMemberOfTaskForce(emailAddress) {
	return taskForce.findIndex((memberOfTaskForce) => {
		return memberOfTaskForce.email == emailAddress;
	});
}

function addCheckMarkToCheckBox(contact) {
	document.getElementById(`checkMark${contact}`).classList.remove('d-none');
}

function addSelectedContactToTaskForce(contact) {
	taskForce.push(coworkersToAssignTo[contact]);
}

function removeCheckMarkFromCheckBox(contact) {
	document.getElementById(`checkMark${contact}`).classList.add('d-none');
}

function removeSelectedContactFromTaskForce(index) {
	taskForce.splice(index, 1);
}

/**
 * @param addedToTaskForce - boolean, true if the contact is already in the task force, false if not
 * @param contact - the contact that was selected
 * @param indexOfMemberInTaskForce - The index of the contact in the task force array.
 */
function addRemoveToggleForTaskForce(
	addedToTaskForce,
	contact,
	indexOfMemberInTaskForce
) {
	if (!addedToTaskForce) {
		addCheckMarkToCheckBox(contact);
		addSelectedContactToTaskForce(contact);
		renderBadgesMemberOfTaskForce();
	} else {
		removeCheckMarkFromCheckBox(contact);
		removeSelectedContactFromTaskForce(indexOfMemberInTaskForce);
		renderBadgesMemberOfTaskForce();
	}
}

/**
 * It adds a contact to the task force if the contact is not already in the task force, and removes the
 * contact from the task force if the contact is already in the task force.
 * @param contact - the name of the contact
 */
function addContactToTaskForceWithCheckBox(contact) {
	let addedToTaskForce = coworkersToAssignTo[contact].check;
	let emailAddress = coworkersToAssignTo[contact].email;
	let indexOfMemberOfTaskForce = findIndexOfMemberOfTaskForce(emailAddress);
	addRemoveToggleForTaskForce(addedToTaskForce, contact, indexOfMemberOfTaskForce);
	addedToTaskForce = !addedToTaskForce;
	coworkersToAssignTo[contact].check = addedToTaskForce;
	console.log(taskForce.length);
	console.table(taskForce);
}

function generateAssignContactListForDropDownMenu(firstName, lastName, contact) {
	return /*html*/ `
	<li onclick="addContactToTaskForceWithCheckBox(${contact})">
		${firstName} ${lastName}
		<div  class="assignCheckboxContainer">
			<img class="checkBox" src="assets/img/check_box.png" alt="checkbox" />
			<img id="checkMark${contact}" class="checkMark d-none" src="assets/img/check_mark.png" />
		</div>
	</li>
	`;
}

/**
 * This function loops through the assignedContacts array and generates a list of contacts for the
 * dropdown menu.
 *! "contact" might not be the best name. To be reconsidered!!
 */
function renderContactsInAssignDropDownMenu() {
	for (let contact = 0; contact < coworkersToAssignTo.length; contact++) {
		let firstName = coworkersToAssignTo[contact].firstName;
		let lastName = coworkersToAssignTo[contact].lastName;
		let assignedContactList = document.getElementById('dropdown2');
		assignedContactList.innerHTML += generateAssignContactListForDropDownMenu(
			firstName,
			lastName,
			contact
		);
	}
}

function setCheckStatusToFalse() {
	taskForce.forEach((member) => {
		member.check = false;
		console.log(member.check);
	});
}

function checkStatusToFalse() {
	for (let coworker = 0; coworker < coworkersToAssignTo.length; coworker++) {
		coworkersToAssignTo[coworker].check = false;
		removeCheckMarkFromCheckBox(coworker);
	}
}

let backgroundColorForBadges = [
	'#02CF2F',
	'#EE00D6',
	'#0190E0',
	'#FF7200',
	'#FF2500',
	'#AF1616',
	'#FFC700',
	'#3E0099',
	'#462F8A',
	'#FF7A00',
];

let index; // !Das muss nach oben, wenn oder weg jenachdem wie wir es letztlich machen

/**
 * Given a first name and a last name, return the index of the color to use for the task force badge.
 * @param initialFirstName - The first letter of the first name of the user.
 * @param initialLastName - The last name of the user.
 */
function chooseColorForTaskForceBadge(initialFirstName, initialLastName) {
	let asciInintalFirstName = initialFirstName.charCodeAt(0);
	let asciInintalLastName = initialLastName.charCodeAt(0);
	let sum = asciInintalFirstName + asciInintalLastName;
	index = sum % 10;
}

/**
 * It takes in a bunch of parameters and returns a string of HTML.
 * @param memberOfTaskForce - This is the name of the task force.
 * @param firstName - "John"
 * @param lastName - "Smith"
 * @param initialFirstName - The first letter of the first name
 * @param initialLastName - "S"
 * @param index - the index of the current member in the array of members
 * @returns A string of HTML.
 */
function generateBadgesTaskForceHtml(
	memberOfTaskForce,
	firstName,
	lastName,
	initialFirstName,
	initialLastName,
	index
) {
	return /*html*/ `
		<div
			id="${memberOfTaskForce}"
			class="badgeTaskForce"
			title="${firstName} ${lastName}"
			style="background-color:${backgroundColorForBadges[index]}"
		>
			${initialFirstName}${initialLastName}
		</div>
		`;
}

/**
 * It takes the first and last name of each member of the task force and generates a badge for each
 * member.
 */
function renderBadgesMemberOfTaskForce() {
	let badgeContainer = document.getElementById('badgesTaskForce');
	badgeContainer.innerHTML = '';
	for (
		let memberOfTaskForce = 0;
		memberOfTaskForce < taskForce.length;
		memberOfTaskForce++
	) {
		const initialFirstName = taskForce[memberOfTaskForce].firstName.charAt(0);
		const initialLastName = taskForce[memberOfTaskForce].lastName.charAt(0);
		const firstName = taskForce[memberOfTaskForce].firstName;
		const lastName = taskForce[memberOfTaskForce].lastName;
		chooseColorForTaskForceBadge(initialFirstName, initialLastName);
		badgeContainer.innerHTML += generateBadgesTaskForceHtml(
			memberOfTaskForce,
			firstName,
			lastName,
			initialFirstName,
			initialLastName,
			index
		);
	}
}

function hideBadgesTaskForce() {
	document.getElementById('badgesTaskForce').classList.remove('d-none');
}

function showBadgesTaskForce() {
	document.getElementById('badgesTaskForce').classList.add('d-none');
}

function closeDropDownAssignTo() {
	assignListStatus = true;
	enableDisableAssignList();
}

function clearTaskForce() {
	checkStatusToFalse();
	taskForce = [];
	enableDisableAssignList();
	console.table(taskForce.length);
	renderBadgesMemberOfTaskForce();
	closeDropDownAssignTo();
	console.table(taskForce);
}

function frontEndDeveloper() {
	document.getElementById('selectedAssign').value = `Just frontend. Sorry! ;)`;
	alert('This function is part of backend. The course is about frontend though');
}

/**
 * !NOCH ERLEDIGEN:
FUnktion: Der, der die Task anlegt, erscheint automatisch in der Taksforce!!!!!!!
 */

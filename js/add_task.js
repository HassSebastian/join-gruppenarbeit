'use strict';
let transferArray = [];
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
let taskForce = []; // team that will be working on the current task
let assignToArray = [];
let dueDate = '';
let prio = '';
let subTask = '';
let subTaskArray = [];
let selectedSubtasks = [];
let badgesIndex;
let guestId;
let coworkersToAssignTo = [];

async function initAddTask() {
	transferArray = [];
	sliderMenuShown = false;
	await renderAddTask();
	renderCategoryList();
	newCatInputActive = false;
	renderSubtasks();
	selectedMenuButton(3);
	renderLoggedUserInAssignDrobDownMenuIntoYou(); // Das habe ich für das You eingefügt!
	renderContactsInAssignDropDownMenu(); //for dropdown menu in assignTo
	setFutureDatesOnlyForInputDueDate();
	loadContributorsLetter();
	taskForce = []; // Das muss noch hier rein oder in einer andere Datei!
	addSubtaskMain();
	addContactToTaskForceWithCheckBox(loggedInUserIndex);
	setIndexOfGuest();
}

/**
 * This function render the HTML content of "Add Task Menu" into the content div of the HTML template.
 *
 */
async function renderAddTask() {
	document.getElementById('content').innerHTML = '';
	coworkersToAssignTo = transferallUserData();
	addCheckAttributeToCoworkersToAssignTo();
	await enableAddTaskStyles();
	await loadExitingCategories();
	document.getElementById('content').innerHTML += generateAddTaskHtml();
}

/**
 * Transfers allUserData needed to transferArray
 * @returns {object} transferArray
 */
function transferallUserData() {
	transferArray = [];
	coworkersToAssignTo = [];
	creatingTransferObjectOfContacts();
	return transferArray;
}

/**
 * Creates a copy of allUsers without password
 */
function creatingTransferObjectOfContacts() {
	const users = guestLoggedIn ? allFakeUsers : allUsers; /* .filter((user) => user.email !== guestEmail) */

	users.forEach((user) => {
		transferArray.push({
			colorIndex: user.colorIndex,
			email: user.email,
			firstSecondLetter: user.firstSecondLetter,
			name: user.name,
			phone: user.phone,
		});
	});
}

/**
 * Adds "check: false" to every  coworker in coworkersToAssignTo Object
 */
function addCheckAttributeToCoworkersToAssignTo() {
	coworkersToAssignTo.forEach((contact) => {
		contact.check = false;
	});
}

//? this are test function for the HTML 5 Form validation !
function goToDescripten() {
	document.getElementById('addTaskDescripten').focus();
}

function goToPrio() {
	document.getElementById('addTaskUrgent').focus();
}
//?this are test function for the HTML 5 Form validation end!

/**
 * This function load the data(key:joinTaskArray) from local storage.
 * Then it filter this data to create a JSON Array with existing categories.
 * !Christian has stopped cleaning here. To be continued later ;)
 */
async function loadExitingCategories() {
	await loadTask();
	addTaskCategoryList = [
		{
			category: 'New Category',
			catColor: '',
		},
	];
	joinTaskArray.forEach((task) => {
		const taskCategory = task['category'];
		const categoryColor = task['catColor'];

		const newCategoryItem = {
			category: taskCategory,
			catColor: categoryColor,
		};
		if (!checkCategoryList(newCategoryItem)) {
			addTaskCategoryList.push({
				category: taskCategory,
				catColor: categoryColor,
			});
		}
	});
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
		borderBottomOffAssignedBoxButton('selectedCat');
	} else {
		document.getElementById('CatListDropdown').classList.add('listD-none');
		document.getElementById('addTaskAssignedBox').classList.remove('addMarginTop');
		borderBottomOnAssignedBoxButton('selectedCat');
	}
	catListStatus = !catListStatus;
	tabletViewAddMarginTopCatList(); // edit by Bossi for responsivness 27.01
	boardAddTaskMarginSettings();
}

/**
 * Closes category list
 */
function closeCatList() {
	catListStatus ? enableDisableCatList() : null;
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
			document.getElementById('CatListDropdown').innerHTML += dropdownCategoryListHtml(categoryName, categoryColor, i);
		} else {
			document.getElementById('CatListDropdown').innerHTML += dropdownCategoryListHtml1(categoryName, i);
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
		if (!checkCategoryList(newCategoryItem)) {
			addTaskCategoryList.push(newCategoryItem);
			let newCategoryIndex = addTaskCategoryList.length - 1;
			renderCategoryList();
			selectCategory(+newCategoryIndex);
			enableDisableCatList();
		}

		newCatInputActive = false;
	}
}

function checkCategoryList(newCategoryItem) {
	let categoryName1 = newCategoryItem['category'];
	let categoryColor1 = newCategoryItem['catColor'];
	let doubleEntry = false;
	for (let i = 0; i < addTaskCategoryList.length; i++) {
		let listCategory = addTaskCategoryList[i]['category'];
		let listCatColor = addTaskCategoryList[i]['catColor'];
		if (listCategory == categoryName1 && listCatColor == categoryColor1) {
			doubleEntry = true;
		}
	}
	return doubleEntry;
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
 * this function perform the settings for the category field indication for a existing category.
 * @param {number} catId - this value is equal to the index of the category list of the selected category.
 */
function setSettingsForExistingCategory(catId) {
	let newCat = addTaskCategoryList[catId]['category'];
	let categoryColor = addTaskCategoryList[catId]['catColor'];
	document.getElementById('selectedCat').innerHTML = existingCategoryHtml(newCat, categoryColor);
	catColor = categoryColor;
	enableDisableCatList();
	document.getElementById('dropdownImg').classList.remove('d-none');
	document.getElementById('colorSelection').classList.add('listD-none');
}

/**
 * this function set the settings for a selected catogory of the submenu of the new category creation.
 * @param {number} colorId
 */
function addColorToCat(colorId) {
	if (catColor != '' || catColor == '0') {
		document.getElementById('color' + catColor + 'Div').classList.remove('colorDivSelected');
		catColor = '';
	}
	document.getElementById('color' + colorId + 'Div').classList.add('colorDivSelected');
	catColor = colorId;
}

/**
 * this function show a popup, that indicated that the new task is succsessfully created.
 */
function showAddDiv() {
	document.getElementById('taskCreatedIndication').classList.add('taskCreatedIndication');
}

/**
 * this function inhibited to show a popup, that indicated that the new task is succsessfuly created.
 */
function notShowAddDiv() {
	document.getElementById('taskCreatedIndication').classList.remove('taskCreatedIndication');
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
 * It returns the current date in the format YYYY-MM-DD.
 * @returns The current date in the format of YYYY-MM-DD.
 */
function currentDate() {
	let date = new Date();

	let day = date.getDate();
	let month = date.getMonth() + 1;
	let year = date.getFullYear();

	if (month < 10) month = '0' + month;
	if (day < 10) day = '0' + day;

	let today = year + '-' + month + '-' + day;
	return today;
}

/**
 * The function setFutureDatesOnlyForInputDueDate()
 * sets the minimum date for the input element with
 * the id of dueDate to the current date.
 */
function setFutureDatesOnlyForInputDueDate() {
	document.getElementById('dueDate').min = currentDate();
}

/**
 * If the title is empty, make the titleReq element visible
 */
function checkTitle() {
	if (title == '') {
		document.getElementById('titleReq').style = 'opacity: 1;';
	}
}

/**
 * If the input date is older than the current date,
 * then display the error message
 */
function checkFutureDate() {
	let inputDate = new Date(dueDate);
	let currentDate = new Date();
	if (inputDate < currentDate) {
		document.getElementById('dateReq').style = 'opacity: 1';
	}
}

/**
 * If the dueDate variable is empty, then make the dateReq div visible.
 */
function checkDueDateExists() {
	if (dueDate == '') {
		document.getElementById('dateReq').style = 'opacity: 1;';
	}
}

/**
 * If the category variable is empty, then make the catReq element visible.
 */
function checkCategory() {
	if (category == '') {
		document.getElementById('catReq').style = 'opacity: 1;';
		document.getElementById('catReq').classList.remove('listD-none');
	}
}

/**
 * If the description is empty, make the description required message visible.
 */
function checkDiscription() {
	if (descripten == '') {
		document.getElementById('descReq').style = 'opacity: 1;';
	}
}

/**
 * this function enable or disable the indication 'this field is required'.
 */
function setRequiredTextWarnings() {
	checkTitle();
	checkFutureDate();
	checkDueDateExists();
	checkCategory();
	checkDiscription();
}

/**
 * this function get all required fields values.
 */
function getReqiredFieldValues() {
	title = document.getElementById('addTaskTitle').value;
	title = title.trim();
	dueDate = document.getElementById('dueDate').value;
	dueDate = dueDate.trim();
	console.log('duedate', dueDate);
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
	resetAssignToList(); // edited by Bossi 04.01.2022, the function is in the board.js
	emptySubTaskArray();
	renderSubtasks();
	closeCatList();
	clearTaskForce();
}

// save data to local storage/server!

async function createTaskData() {
	await loadTask();
	getDataFromFomular();
	await createAssignToListForSave();
	await minOneSubtask();
	fillTaskData();
	pushTaskData();
	saveTask();
	showAddDiv();
	setTimeout(initBoard, 1200);
	resetAssignToList();
	clearFormularData();
}

async function minOneSubtask() {
	if (selectedSubtasks.length == 0) {
		selectedSubtasks = [{ subtaskText: 'Maintask', subtaskStatus: true }];
	}
}

// toDo this is a transition function that to have reworked after all data for task card avalable.
function getDataFromFomular() {
	descripten = document.getElementById('addTaskDescripten').value;
	subTask = document.getElementById('subTask').value;
}

async function createAssignToListForSave() {
	assignToArray = [];
	for (let i = 0; i < coworkersToAssignTo.length; i++) {
		let checkStatus = coworkersToAssignTo[i]['check'];
		if (checkStatus) {
			assignToArray.push(coworkersToAssignTo[i]);
		}
	}
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
		assignedTo: assignToArray,
		dueDate: dueDate,
		prio: prio,
		subTasks: selectedSubtasks,
		workFlowStatus: 0,
		creator: allUsers[loggedInUserIndex]['name'],
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

// deleteJoinTaskArrayFromServer() is not used in this code, it is only to remove the Array from Server!!!!!!!!!!!
async function deleteJoinTaskArrayFromServer() {
	// localStorage.removeItem('joinTaskArray');
	await backend.deleteItem('joinTaskArray');
}
// save data to local storage/server end!

/******************************************************************************** */
function addTaskClearOn() {
	document.getElementById('addTaskClear').src = '././assets/img/close_logo_blue.png';
}

function addTaskClearOff() {
	document.getElementById('addTaskClear').src = './assets/img/close_logo.png';
}

async function addPrio(prioIdIndex) {
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
	document.getElementById(`addTask${btnName}Img`).src = `./assets/img/${btnName.toLowerCase()}_white.png`;
	prio = btnName;
}

function removeBtnSelection(btnName) {
	document.getElementById(`addTask${btnName}`).classList.remove(`${btnName.toLowerCase()}-color`);
	document.getElementById(`addTask${btnName}Span`).classList.remove('color-white');
	document.getElementById(`addTask${btnName}Img`).src = `./assets/img/${btnName.toLowerCase()}.png`;
}

function unselectOtherBtn(idList) {
	for (let i = 0; i < idList.length; i++) {
		let selectedId = idList[i];
		let cListLength = document.getElementById(selectedId).classList.length;
		let btnName = selectedId.replace('addTask', '');
		if (btnIsSelected(cListLength)) {
			document.getElementById(`addTask${btnName}`).classList.remove(`${btnName.toLowerCase()}-color`);
			document.getElementById(`addTask${btnName}Span`).classList.remove('color-white');
			document.getElementById(`addTask${btnName}Img`).src = `./assets/img/${btnName.toLowerCase()}.png`;
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
}

function addSubtask() {
	let subTaskText = document.getElementById('subTask').value;
	subTaskText = subTaskText.trim();
	if (subTaskText != '' && subTaskText.length >= 3) {
		subTaskInputLeave();
		pushNewSubtaskDatatoArray(subTaskText);
		renderSubtasks();
		resetSubtaskInput();
		createSubtaskListToSave();
	}
}

function addSubtaskMain() {
	let subTaskText = 'Maintask';
	subTaskArray = [];
	subTaskInputLeave();
	pushNewSubtaskDatatoArray(subTaskText);
	renderSubtasks();
	resetSubtaskInput();
	createSubtaskListToSave();
}

// new Array function here
function pushNewSubtaskDatatoArray(subTaskText) {
	let subtaskJson = {
		subtaskText: subTaskText,
		subtaskStatus: true,
	};
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
		let subtaskJson = {
			subtaskText: subTaskText,
			subtaskStatus: subTaskStatus,
		};
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

/* subTaskArray bei cleaButton bis auf maintask löschen */

function emptySubTaskArray() {
	subTaskArray.splice(1);
}

/*=======================
   ASSIGN TO FUNCTIONS 
=======================*/

/**
 * Shows or hides drob down menu of assignTo
 */
function showHideDropDownAssignTo() {
	document.getElementById('dropdown2').classList.toggle('listD-none');
}

function enableDisableAssignList() {
	if (!assignListStatus) {
		borderBottomOffAssignedBoxButton('addTaskAssignedButton');
		showHideDropDownAssignTo();
		hideBadgesTaskForce();
	} else {
		borderBottomOnAssignedBoxButton('addTaskAssignedButton');
		showHideDropDownAssignTo();
		showBadgesTaskForce();
	}
	assignListStatus = !assignListStatus;
	tabletViewAddMarginTopAssignList(); // edit by Bossi for responsivness 27.01
	boardAddTaskMarginSettings();
}

function enableAssignList() {
	showHideDropDownAssignTo();
	assignListStatus = !assignListStatus;
}

/**
 * When the user clicks the 'Add Task' button,
 * the border radius of the 'Add Task' button will change
 * to 10px 10px 0 0.
 */
function borderBottomOffAssignedBoxButton(id) {
	document.getElementById(id).style = `border-radius: 10px 10px 0 0;`;
}

/**
 * It changes the border radius of the button with the id of 'addTaskAssignedButton'
 * to 10px.
 */
function borderBottomOnAssignedBoxButton(id) {
	document.getElementById(id).style = `border-radius: 10px 10px 10px 10px;`;
}

/**
 * Sets the placeholder of inputField to "contact email"
 */
function assignChangeInputPlaceholderToContactEmail() {
	document.getElementsByName('selectedAssign')[0].placeholder = `Contact email`;
}

/**
 * Disables inputField at addTaskAssignTo
 */
function enableInputaddTasAssign() {
	document.getElementById('selectedAssign').disabled = false;
}

/**
 * Shows btn to delete or confirm filled in input
 */
function showCancelConfirmButtons() {
	document.getElementById('assignToCancelConfirmImgContainer').classList.remove('d-none');
}

/**
 * Hides assignDropDownImg
 */
function hideAssignDropDownImg() {
	document.getElementById('assignDropDownImg').classList.add('d-none');
}

/**
 * Takes assign inpu in focus
 */
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
	document.getElementsByName('selectedAssign')[0].placeholder = `Select contacts to Assign`;
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

/**
 * Shows check mark of contact in assignTo list
 * @param {number} contact
 */
function addCheckMarkToCheckBox(contact) {
	document.getElementById(`checkMark${contact}`).classList.remove('d-none');
}

/**
 * Adds so of contact list to taskForce
 * @param {number} contact
 */
function addSelectedContactToTaskForce(contact) {
	taskForce.push(coworkersToAssignTo[contact]);
}

/**
 *
 * @param {number} contact
 */
function removeCheckMarkFromCheckBox(contact) {
	document.getElementById(`checkMark${contact}`).classList.add('d-none');
}

/**
 * Takes a member off the taskForce
 * @param {number} index
 */
function removeSelectedContactFromTaskForce(index) {
	taskForce.splice(index, 1);
}

/**
 * @param addedToTaskForce - boolean, true if the contact is already in the task force, false if not
 * @param contact - the contact that was selected
 * @param indexOfMemberInTaskForce - The index of the contact in the task force array.
 */
function addRemoveToggleForTaskForce(addedToTaskForce, contact, indexOfMemberInTaskForce) {
	if (!addedToTaskForce) {
		addCheckMarkToCheckBox(contact);
		addSelectedContactToTaskForce(contact);
		renderBadgesMemberOfTaskForce();
	} else {
		removeCheckMarkFromCheckBox(contact);
		removeSelectedContactFromTaskForce(indexOfMemberInTaskForce);
		renderBadgesMemberOfTaskForce();
	}
	// setTimeout(() => console.table(taskForce), 1);
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
}

/**
 * This function loops through the assignedContacts array and generates a list of contacts for the
 * dropdown menu.
 */
async function renderContactsInAssignDropDownMenu() {
	let assignedContactList = document.getElementById('dropdown2');
	coworkersToAssignTo.forEach((coworker, contact) => {
		if (coworkerIsGuest(coworker, contact)) {
			assignedContactList.innerHTML += generateAssignContactListForDropDownMenu(coworker.name, contact);
		}
	});
}

/**
 *
 * @param {object} coworker
 * @param {number} contact
 * @returns boolean
 * !NAME UND FUNKTION ÜBERARBEITEN
 */
function coworkerIsGuest(coworker, contact) {
	return contact !== loggedInUserIndex && coworker.name !== 'Guest' && !guestLoggedIn;
}

/**
 * Renders logged user into assignTo list under "you"
 */
async function renderLoggedUserInAssignDrobDownMenuIntoYou() {
	let contact = loggedInUserIndex;
	let name = coworkersToAssignTo[loggedInUserIndex].name;
	let assignedContactList = document.getElementById('dropdown2');
	assignedContactList.innerHTML += generateLoggedUserHtml(name, contact);
}

/**
 * Sets check status to false
 * !Warum zweimal???
 *
 */
function setCheckStatusToFalse() {
	taskForce.forEach((member) => {
		member.check = false;
		// log(member.checonsole.ck);
	});
}

/**
 * Sets check status to false
 */
function checkStatusToFalse() {
	coworkersToAssignTo.forEach((coworker, i) => {
		coworker.check = false;
		removeCheckMarkFromCheckBox(i);
	});
}

/**
 * It takes the first and last name of each member of the task force and generates a badge for each
 * member.
 */
function renderBadgesMemberOfTaskForce() {
	let badgeContainer = document.getElementById('badgesTaskForce');
	badgeContainer.innerHTML = '';
	taskForce.forEach((member, i) => {
		const initials = member.firstSecondLetter;
		const name = member.name;
		const badgesIndex = member.colorIndex;

		/* chooseColorForTaskForceBadge(initialFirstName, initialLastName); */
		badgeContainer.innerHTML += generateBadgesTaskForceHtml(i, name, initials, badgesIndex);
	});
}

/**
 * Show assignTo-list by removing d-none class
 */
function showBadgesTaskForce() {
	document.getElementById('badgesTaskForce').classList.remove('d-none');
}

/**
 * Closes assignTo-List
 */
function hideBadgesTaskForce() {
	document.getElementById('badgesTaskForce').classList.add('d-none');
}

/**
 * Closes assignTo-List if open
 * @param {boolean} assignListStatus
 */
function closeDropDownAssignTo() {
	assignListStatus ? enableDisableAssignList() : null;
}

/**
 * Sets taskForce and assignTo checkMarks to default mode; restricteds in guestLogIn
 * @param {boolean} guestLoggedIn
 */
function clearTaskForce() {
	if (!guestLoggedIn) checkStatusToFalse();
	taskForce = [];
	renderBadgesMemberOfTaskForce();
	closeDropDownAssignTo();
}

/**
 * Opens window with a message
 */
function frontEndDeveloper() {
	alert('This function is part of backend. The course is about frontend though');
}

/* 
!GUEST Login */

/**
 * gets Index of Guest
 */
function setIndexOfGuest() {
	guestId = allUsers.findIndex((user) => user.email === guestEmail);
}

// Add Task Responsiv Functions
function resizeCallRelatedAddTaskFunctions() {
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
	let addTaskView = document.querySelector('.addTaskRightContainer');
	if (catListStatus && window.innerWidth >= 768 && window.innerWidth <= 1100 && addTaskView) {
		document.getElementById('addTaskRightContainer').classList.add('addMarginTop');
		resizePageAndChangeBtnPosition();
	}
	if (!catListStatus || window.innerWidth < 768 || window.innerWidth > 1100) {
		checkIdAndRemoveMargin();
	}
	if (!catListStatus && assignListStatus && window.innerWidth >= 768 && window.innerWidth <= 1100 && addTaskView) {
		resizePageAndChangeBtnPosition1();
	}
	tabletViewAddTaskResize();
}

function checkIdAndRemoveMargin() {
	if (document.querySelector('#addTaskRightContainer')) {
		document.getElementById('addTaskRightContainer').classList.remove('addMarginTop');
		resetResizePageAndChangeBtnPosition();
	}
}

function checkIdAndRemoveMargin2() {
	if (document.querySelector('#addTaskRightContainer')) {
		document.getElementById('addTaskRightContainer').classList.remove('addTaskRightContainerAddMarginTop');
		resetResizePageAndChangeBtnPosition();
	}
}

function tabletViewAddMarginTopAssignList() {
	let addTaskView = document.querySelector('.addTaskRightContainer');
	if (assignListStatus && window.innerWidth >= 768 && window.innerWidth <= 1100 && addTaskView) {
		document.getElementById('addTaskRightContainer').classList.add('addTaskRightContainerAddMarginTop');
		resizePageAndChangeBtnPosition();
	}
	if (!assignListStatus || window.innerWidth < 768 || (window.innerWidth > 1100 && addTaskView && addTaskView)) {
		checkIdAndRemoveMargin2();
	}
	if (catListStatus && !assignListStatus && window.innerWidth >= 768 && window.innerWidth <= 1100 && addTaskView) {
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

function testResponsivNewHeight1() {
	document.getElementById('testResponsiv').classList.remove('testResponsivNewHeight');
	document.getElementById('testResponsiv').classList.add('testResponsivNewHeight1');
}

function testResponsivNewHeight2() {
	document.getElementById('testResponsiv').classList.remove('testResponsivNewHeight');
	document.getElementById('testResponsiv').classList.remove('testResponsivNewHeight1');
}

function tabletViewAddTaskResize() {
	let addTaskView = document.querySelector('.addTaskRightContainer');
	if (assignListStatus && catListStatus && window.innerWidth >= 768 && window.innerWidth <= 1100 && addTaskView) {
		addTaskRightContainerNewHeight1();
		testResponsivNewHeight1();
		btnPosition3();
	}
	if ((!assignListStatus && !catListStatus) || window.innerWidth < 768 || (window.innerWidth > 1100 && addTaskView)) {
		if (document.querySelector('#addTaskRightContainer')) {
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

function resetResponsivContainerHeightPart1() {
	if (document.querySelector('.addTaskRightContainerAddMarginTop1')) {
		document.getElementById('addTaskRightContainer').classList.remove('addTaskRightContainerAddMarginTop1');
	}
	if (document.querySelector('.addMarginTop')) {
		document.getElementById('addTaskRightContainer').classList.remove('addMarginTop');
	}
}

function resetResponsivContainerHeightPart2() {
	if (document.querySelector('.testResponsivNewHeight')) {
		document.getElementById('testResponsiv').classList.remove('testResponsivNewHeight');
	}
	if (document.querySelector('.testResponsivNewHeight1')) {
		document.getElementById('testResponsiv').classList.remove('testResponsivNewHeight1');
	}
}

function resetResponsivContainerHeightPart3() {
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

// Add Task Responsiv Functions end

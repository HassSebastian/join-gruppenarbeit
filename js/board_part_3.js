let searchTerm;
let arrayMoveBtnText = [
	{
		workStatus: 0,
		btn: ['Task to "In progress"'],
		newStatus: [1],
	},
	{
		workStatus: 1,
		btn: ['Task to "To do"', 'Task to "Awaiting Feedback"'],
		newStatus: [0, 2],
	},
	{
		workStatus: 2,
		btn: ['Task to "In progress"', 'Task to "Done"'],
		newStatus: [1, 3],
	},
	{
		workStatus: 3,
		btn: ['Task to "Awaiting Feedback"'],
		newStatus: [2],
	},
];

/**
 * When the user types in the search field, get the search term and convert it to lowercase. Then, for
 * each card, get the card title and convert it to lowercase. If the card title contains the search
 * term, display the card. Otherwise, hide the card.
 */
function startSearch() {
	let cards = document.querySelectorAll('.taskBackground'); // Select all elements with class "taskBackground"
	document.getElementById('searchField').addEventListener('input', function () {
		searchTerm = this.value.trim().toLowerCase();
		cards.forEach(function (card) {
			let cardTitle = card.querySelector('.taskHeadlineContent').textContent.toLowerCase();
			let cardDescription = card.querySelector('.taskContent').textContent.toLowerCase();
			if (cardTitle.indexOf(searchTerm) !== -1 || cardDescription.indexOf(searchTerm) !== -1) {
				card.style.display = 'block';
			} else {
				card.style.display = 'none';
			}
		});
	});
}

function searchAfterPopup() {
	document.getElementById('searchField').value = searchTerm;
	searchAfterPopupDesktop();
}

/**
 * It searches for the search term in the title and description of the cards and displays the cards
 * that contain the search term.
 * </code>
 */
function searchAfterPopupDesktop() {
	let cards = document.querySelectorAll('.taskBackground');
	if (searchTerm) {
		searchTerm = searchTerm.trim();
		if (searchTerm != '') {
			cards.forEach(function (card) {
				let cardTitle = card.querySelector('.taskHeadlineContent').textContent.toLowerCase();
				let cardDescription = card.querySelector('.taskContent').textContent.toLowerCase();
				if (cardTitle.indexOf(searchTerm) !== -1 || cardDescription.indexOf(searchTerm) !== -1) {
					card.style.display = 'block';
				} else {
					card.style.display = 'none';
				}
			});
		}
	}
}

function searchAfterPopupMobil() {
	let cards = document.querySelectorAll('.taskBackgroundMobil');
	if (searchTerm) {
		searchTerm = searchTerm.trim();
		if (searchTerm != '') {
			cards.forEach(function (card) {
				let cardTitle = card.querySelector('.taskHeadlineContentMobil').textContent.toLowerCase();
				let cardDescription = card.querySelector('.taskContentMobil').textContent.toLowerCase();
				if (cardTitle.indexOf(searchTerm) !== -1 || cardDescription.indexOf(searchTerm) !== -1) {
					card.style.display = 'block';
				} else {
					card.style.display = 'none';
				}
			});
		}
	}
}

/**
 * this function call the save function for changes in the detail view and render the Move Buttons for the Mobil view.
 * @param {number} taskIndex - The index of the task in the task array.
 */
async function renderBtnBySubtaskChange(taskIndex) {
	await saveChangesDetailView();
	renderMoveBtnMobil(taskIndex);
}

/**
 * this function save the changes in the detail view and render all Cards in the Board.
 */
async function saveChangesDetailView() {
	await saveTask();
	await createWorkStatusArrays();
	renderAllCards();
}

/**
 * this function close in the board the detail view popup card.
 */
function closeBoardMobilDetailOverlay() {
	document.getElementById('boardPopup').classList.add('d-none');
}

/**
 * this function detemind which move Buttons has to be rendered into the mobil board detail view.
 * @param {Number} taskIndex - The index of the task in the task array.
 */
async function renderMoveBtnMobil(taskIndex) {
	document.getElementById('moveBtnMobil').innerHTML = '';
	let workStatus = joinTaskArray[taskIndex]['workFlowStatus'];
	let buttonArray = arrayMoveBtnText[workStatus]['btn'];
	let forLoppEndValue = buttonArray.length;
	let newStatusArray = arrayMoveBtnText[workStatus]['newStatus'];
	if (workStatus >= 1 && workStatus < 3) {
		forLoppEndValue = taskCardAllowMove(taskIndex);
	}
	for (let i = 0; i < forLoppEndValue; i++) {
		let buttonText = buttonArray[i];
		let newTaskStatus = newStatusArray[i];
		renderMoveBtnMobilHtml(buttonText, newTaskStatus, taskIndex);
	}
}

/**
 * this function render the move buttons in the board detail view.
 * @param {String} buttonText - the move button text.
 * @param {Number} newTaskStatus - is the new workflow status in joinTaskArray.
 * @param {Number} taskIndex - The index of the task in the task array.
 */
function renderMoveBtnMobilHtml(buttonText, newTaskStatus, taskIndex) {
	document.getElementById('moveBtnMobil').innerHTML += /*html*/ `
    <button onclick='moveMobilTaskTo(${taskIndex}, ${newTaskStatus})'>
        ${buttonText}
    </button>`;
}

/**
 * this function changes the workflow status of the dropped Task in the joinTaskArray and save it.
 * Then it render all Taskcards in the board and close the popup window.
 * @param {Number} taskIndex - The index of the task in the task array.
 * @param {Number} newTaskStatus - is the new workflow status in joinTaskArray.
 */
async function moveMobilTaskTo(taskIndex, newTaskStatus) {
	joinTaskArray[taskIndex]['workFlowStatus'] = newTaskStatus;
	await saveTask();
	await createWorkStatusArrays();
	renderAllCards();
	closeBoardMobilDetailOverlay();
}

/**
 * 
 * @param {Number} taskIndex 
 * @returns - a the number 2 if all subtasks done, otherwise 1.
 */
function taskCardAllowMove(taskIndex) {
	let endValue;
	let doneBarDraggedElement = document.getElementById(`doneBar${taskIndex}`);
	let doneBarOuterDraggedElement = document.getElementById(`doneBarOuter${taskIndex}`);
	let doneBarWidth = doneBarDraggedElement.offsetWidth;
	let doneBarOuterWidth = doneBarOuterDraggedElement.offsetWidth;
	if (allSubtasksDone(doneBarWidth, doneBarOuterWidth)) {
		endValue = 2;
	} else {
		endValue = 1;
	}
	return endValue;
}

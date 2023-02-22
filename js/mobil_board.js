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

function startSearchMobil() {
	let cards = document.querySelectorAll('.taskBackground'); // Select all elements with class "taskBackground"
	document.getElementById('searchField').addEventListener('input', function () {
		searchTerm = this.value.toLowerCase(); // Get the search term and convert to lowercase
		searchTerm = this.value.trim();
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

/* !
!Brauchei  ch */
function closeBoardMobilDetailOverlay() {
	document.getElementById('boardPopup').classList.add('d-none');
	console.log('Das brauche ich');
}

/*
!DAS BRUACHE ICH */
async function renderBtnBySubtaskChange(taskIndex) {
	await saveChangesDetailView();
	renderMoveBtnMobil(taskIndex);
	console.log('Das brauche ich');
}

//!Bleibt
async function saveChangesDetailView() {
	await saveTask();
	await createWorkStatusArrays();
	renderAllCards();
	console.log('Das brauche ich');
}

//!Brauche ich
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
		console.log('Das brauche ich');
	}
}

/* 
!Brauche ich */
function renderMoveBtnMobilHtml(buttonText, newTaskStatus, taskIndex) {
	document.getElementById('moveBtnMobil').innerHTML += /*html*/ `
    <button onclick='moveMobilTaskTo(${taskIndex}, ${newTaskStatus})'>
        ${buttonText}
    </button>`;
}

/* !
!Brauche ich */
async function moveMobilTaskTo(taskIndex, newTaskStatus) {
	joinTaskArray[taskIndex]['workFlowStatus'] = newTaskStatus;
	await saveTask();
	await createWorkStatusArrays();
	renderAllCards();
	closeBoardMobilDetailOverlay();
	console.log('Das brauche ich');
}

/* 
!Brauchen wir
 */
function taskCardAllowMove(taskIndex) {
	console.log('Das brauche ich');
	let endValue;
	let doneBarDraggedElement = document.getElementById(`doneBar${taskIndex}`);
	let doneBarOuterDraggedElement = document.getElementById(`doneBarOuter${taskIndex}`);
	let doneBarWidth = doneBarDraggedElement.offsetWidth;
	let doneBarOuterWidth = doneBarOuterDraggedElement.offsetWidth;
	if (doneBarWidth == doneBarOuterWidth) {
		endValue = 2;
	} else {
		endValue = 1;
	}
	return endValue;
}

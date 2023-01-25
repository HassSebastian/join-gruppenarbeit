let loggedInUserIndex; // Test: Im Array ist immer nur eine Zahl drin
let emailAddress;
let allYourTasksAmount = 0;
let allYourToDoTasksAmount = 0;
let allYourInProgressTasksAmount = 0;
let allYourAwaitingFeedbackTasksAmount = 0;
let allYourDoneTasksAmount = 0;
let yourUrgentTasksAmount = 0;


/* sollten die besser im board sein? */
let allYourToDoTasks = []; // Bossis Idee, für workflow 0-3
let allYourInProgressTasks = [];
let allYourAwaitingFeedbackTasks = [];
let allYourDoneTasks = [];

async function initSummary() {
	setURL('https://gruppe-407.developerakademie.net/smallest_backend_ever');
	await loadTask();
	resetCounters();
	resetYourTasksArrays(); // sonst addieren sich die tasks bei jedem Aufrufen
	await loadAmountsForSummary(); // await später für server wichtig
	await includeHTML();
	await renderSummary(allYourTasksAmount, allYourToDoTasksAmount, allYourInProgressTasksAmount, allYourAwaitingFeedbackTasksAmount, allYourDoneTasksAmount, yourUrgentTasksAmount);
	selectedMenuBtnId = 0;
	selectedMenuButton(1);
	showDate();
	showTime();
	loadContributorsLetter();
}

function resetCounters() {
	allYourTasksAmount = 0;
	allYourToDoTasksAmount = 0;
	allYourInProgressTasksAmount = 0;
	allYourAwaitingFeedbackTasksAmount = 0;
	allYourDoneTasksAmount = 0;
	yourUrgentTasksAmount = 0;
}

function resetYourTasksArrays() {
	allYourToDoTasks = []; // Bossis Idee, für workflow 0-3
	allYourInProgressTasks = [];
	allYourAwaitingFeedbackTasks = [];
	allYourDoneTasks = [];
}

function generateSummaryHtml(allYourTasksAmount, allYourToDoTasksAmount, allYourInProgressTasksAmount, allYourAwaitingFeedbackTasksAmount, allYourDoneTasksAmount, yourUrgentTasksAmount) {
	return /*html*/ `
    <!-- <div class='summary_content'> -->
        <div class='title'>
            <h3>Summary</h3>
            <img src='./assets/img/vertical_line.png'>
            <h4>Everything in a nutshell!</h4>
        </div>
        <div class='welcome'>
            <h4 id='greetUser'></h4>
            <h3>${allUsers[loggedUser[0]].name}</h3>
        </div>
        <div class="overview">
            <div class='taskOverview'>
                <div id='taskInBoard'><span id='taskInBoardAmount'>${allYourTasksAmount}</span> <p>Task in Board</p></div>
                <div id='taskInProgress'><span id='taskInProgressAmount'>${allYourInProgressTasksAmount}</span> <p>Task in Progress</p></div>
                <div id='awaitingFeedback'><span id='awaitingFeedbackAmount'>${allYourAwaitingFeedbackTasksAmount}</span> <p>Awaiting Feedback</p></div>
            </div>
            <div class='ugencySummary' onmouseover="ugencySummaryHoverOn()" onmouseout="ugencySummaryHoverOff()">
                <div class="ugent">
                    <div class='ugentImgContainer'>
                        <img class='ugentImg' id='urgentImg' src='./assets/img/summary_urgent.png' >
                    </div>
                    <div class='ugentAmount'>
                        <span id='ugencySummaryAmount' >${yourUrgentTasksAmount}</span>
                        <p id='ugencySummaryurgent'>Urgent</p>
                    </div>
                    <img src='./assets/img/vertical-line2.png' class='ugentVerticalLine'>
                </div>
                <div class='deadlineData'>
                    <p id='deadlineDate'>October 16, 2022</p> 
                    <p class='deadlineText' id='deadlineText'><b>31.01.2023 Deadline</b></p> 
                </div>
            </div>
            <div class='toDoData'>
                <div class='toDo' id='toDo' onmouseover="toDoHoverOn()" onmouseout="toDoHoverOff()">
                    <img id='toDoImg' src='./assets/img/to_do_pen.png' alt="">
                    <div class='toDoAmountData'>
                        <span id='toDoAmountTasks'>${allYourToDoTasksAmount}</span>
                        <p id='toDoAmountP'>to-Do</p>
                    </div>
                </div>
                <div class='toDoDone' id='toDoDone' onmouseover="toDoDoneHoverOn()" onmouseout="toDoDoneHoverOff()">
                    <img id='toDoDoneImg' src='./assets/img/done.png' alt="">
                    <div class='toDoAmountData'>
                        <span id='toDoDoneAmountTasks'>${allYourDoneTasksAmount}</span>
                        <p id='toDoDoneAmountP'>Done</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

async function renderSummary(allYourTasksAmount, allYourToDoTasksAmount, allYourInProgressTasksAmount, allYourAwaitingFeedbackTasksAmount, allYourDoneTasksAmount, yourUrgentTasksAmount) {
	document.getElementById('content').innerHTML = '';
	document.getElementById('content').innerHTML += generateSummaryHtml(
		allYourTasksAmount,
		allYourToDoTasksAmount,
		allYourInProgressTasksAmount,
		allYourAwaitingFeedbackTasksAmount,
		allYourDoneTasksAmount,
		yourUrgentTasksAmount
	);
}

// Hover Summary help-function
function toDoHoverOn() {
	document.getElementById('toDoImg').src = './assets/img/to_do_pen_black.png';
	document.getElementById('toDo').classList.add('toDoHover');
	document.getElementById('toDoAmountTasks').classList.add('toDoHoverSpanP');
	document.getElementById('toDoAmountP').classList.add('toDoHoverSpanP');
}

function toDoHoverOff() {
	document.getElementById('toDoImg').src = './assets/img/to_do_pen.png';
	document.getElementById('toDo').classList.remove('toDoHover');
	document.getElementById('toDoAmountTasks').classList.remove('toDoHoverSpanP');
	document.getElementById('toDoAmountP').classList.remove('toDoHoverSpanP');
}

function toDoDoneHoverOn() {
	document.getElementById('toDoDoneImg').src = './assets/img/done_black.png';
	document.getElementById('toDoDone').classList.add('toDoHover');
	document.getElementById('toDoDoneAmountTasks').classList.add('toDoHoverSpanP');
	document.getElementById('toDoDoneAmountP').classList.add('toDoHoverSpanP');
}

function toDoDoneHoverOff() {
	document.getElementById('toDoDoneImg').src = './assets/img/done.png';
	document.getElementById('toDoDone').classList.remove('toDoHover');
	document.getElementById('toDoDoneAmountTasks').classList.remove('toDoHoverSpanP');
	document.getElementById('toDoDoneAmountP').classList.remove('toDoHoverSpanP');
}

function ugencySummaryHoverOn() {
	document.getElementById('ugencySummaryAmount').classList.add('toDoHoverSpanP');
	document.getElementById('deadlineDate').classList.add('toDoHoverSpanP');
	document.getElementById('deadlineText').classList.add('toDoHoverSpanP');
	document.getElementById('ugencySummaryurgent').classList.add('toDoHoverSpanP');
}

/**
 * It removes the class 'toDoHoverSpanP' from the elements with the ids 'ugencySummaryAmount',
 * 'deadlineDate', 'deadlineText', and 'ugencySummaryurgent'.
 */
function ugencySummaryHoverOff() {
	document.getElementById('ugencySummaryAmount').classList.remove('toDoHoverSpanP');
	document.getElementById('deadlineDate').classList.remove('toDoHoverSpanP');
	document.getElementById('deadlineText').classList.remove('toDoHoverSpanP');
	document.getElementById('ugencySummaryurgent').classList.remove('toDoHoverSpanP');
}

// show date in Summary
function showDate() {
	let currentDate = new Date();
	let day = currentDate.getDate();
	if (day < 10) {
		day = '0' + day;
	}
	let dateString = currentDate.toLocaleDateString('en-US', {
		month: 'long',
		day: 'numeric',
		year: 'numeric',
	});
	document.getElementById('deadlineDate').innerHTML = dateString;
}

// greet User
let helloCheck = 0;

function showTime() {
	if (helloCheck == 0) {
		let currentTime = new Date();
		let hours = currentTime.getHours();
		let timeString = hours;
		if (timeString >= 0) {
			document.getElementById('greetUser').innerHTML = `Good Morning,`;
		}
		if (timeString >= 12) {
			document.getElementById('greetUser').innerHTML = `Good Day,`;
		}
		if (timeString >= 18) {
			document.getElementById('greetUser').innerHTML = `Good Evening,`;
		}
	}
	if (window.innerWidth < 768) {
		helloCheck = 1;
	}
}
/**
 * !NOCH ERLEDIGEN:
FUnktion: Der, der die Task anlegt, erscheint automatisch in der Taksforce!!!!!!!
 */

/* 
!FRAGE:
Kann loggedUser auch ein String sein, statt ein Arry? Einfacher!
*/

/**
 * It takes the loggedUserAtString from localStorage,
 * parses it into a JSON object,
 * and then logs the id of the object to the console.
 */
function loadLoggedInUserArray() {
	let loggedUserAtString = localStorage.getItem('loggedUser');
	loggedUser = JSON.parse(loggedUserAtString);
	console.log(loggedUser);
}

/**
 * This function takes the logged in user's index from the array
 * and assigns it to a variable.
 */
function getLoggedUserIndex() {
	loggedInUserIndex = loggedUser[0];
	console.log(loggedInUserIndex);
}

/**
 * This function takes the index of the logged in user
 * and returns the email address of that user.
 * @param loggedInUserIndex - The index of the user in the users array.
 */
function getEmailAdrressOfLoggedUser() {
	emailAddress = allUsers[loggedInUserIndex].email;
	console.log(emailAddress);
}

/**
 * It loops through the joinTaskArray, and for each task,
 * it loops through the assignedTo array, and
 * for each member of the assignedTo array, it calls the itemsToUpdate function.
 */
function updatingSummary() {
	joinTaskArray.forEach((task) => {
		const assignedTo = task.assignedTo;
		const workflowStatus = task.workFlowStatus;
		const priority = task.prio;
		assignedTo.forEach((member) => {
			const email = member.email;
			itemsToUpdate(email, workflowStatus, priority, task);
		});
	});
}

/**
 * If the email address is the same as the email address of the user, then add one to the amount of
 * tasks that the user has.
 * @param email - the email address of the person who is assigned to the task
 * @param workflowStatus - 0 = To Do, 1 = In Progress, 2 = Awaiting Feedback, 3 = Done
 * @param priority - 0 = Low, 1 = Medium, 2 = High, 3 = Urgent
 */
function itemsToUpdate(email, workflowStatus, priority, task) {
	if (email == emailAddress) allYourTasksAmount++;
	if (email == emailAddress && workflowStatus === 0) {
		allYourToDoTasksAmount++;
		allYourToDoTasks.push(task);
	}
	if (email == emailAddress && workflowStatus === 1) {
		allYourInProgressTasksAmount++;
		allYourInProgressTasks.push(task);
	}
	if (email == emailAddress && workflowStatus === 2) {
		allYourAwaitingFeedbackTasksAmount++;
		allYourAwaitingFeedbackTasks.push(task);
	}
	if (email == emailAddress && workflowStatus === 3) {
		allYourDoneTasksAmount++;
		allYourDoneTasks.push(task);
	}
	if (email == emailAddress && priority === 'Urgent') yourUrgentTasksAmount++;
}

/**
 * This function loads the logged in user's array,
 * gets the index of the logged in user, gets the email
 * address of the logged in user, and updates the summary.
 */
async function loadAmountsForSummary() {
	loadLoggedInUserArray();
	getLoggedUserIndex();
	getEmailAdrressOfLoggedUser();
	updatingSummary();
}

let loggedInUserIndex;
let emailAddress;

let allYourTasksAmount = 0;
let allYourToDoTasksAmount = 0;
let allYourInProgressTasksAmount = 0;
let allYourAwaitingFeedbackTasksAmount = 0;
let allYourDoneTasksAmount = 0;
let allYourUrgentTasksAmount = 0;

let allYourTasks = [];
let allYourToDoTasks = [];
let allYourInProgressTasks = [];
let allYourAwaitingFeedbackTasks = [];
let allYourDoneTasks = [];
let helloCheck = 0; // prevents errors when changing the size of the window on your desktop
let penImage = 'to_do_pen';

async function initSummary() {
	sliderMenuShown = false;
	await includeHTML();
	await enableSummaryStyles();
	setURL('https://gruppe-407.developerakademie.net/smallest_backend_ever');
	await loadTask();
	resetCounters();
	resetYourTasksArrays(); // sonst addieren sich die tasks bei jedem Aufrufen
	await loadAmountsForSummary(); // await später für server wichtig
	await renderSummary(allYourTasksAmount, allYourToDoTasksAmount, allYourInProgressTasksAmount, allYourAwaitingFeedbackTasksAmount, allYourDoneTasksAmount, allYourUrgentTasksAmount);
	selectedMenuBtnId = 0;
	selectedMenuButton(1);
	showDate();
	greetUser();
	greetingMobileAnimation();
	loadContributorsLetter();
	getAllValuesForOverview();
}

function resetCounters() {
	allYourTasksAmount = 0;
	allYourToDoTasksAmount = 0;
	allYourInProgressTasksAmount = 0;
	allYourAwaitingFeedbackTasksAmount = 0;
	allYourDoneTasksAmount = 0;
	allYourUrgentTasksAmount = 0;
}

function resetYourTasksArrays() {
	allYourToDoTasks = []; // Bossis Idee, für workflow 0-3
	allYourInProgressTasks = [];
	allYourAwaitingFeedbackTasks = [];
	allYourDoneTasks = [];
}

async function renderSummary(allYourTasksAmount, allYourToDoTasksAmount, allYourInProgressTasksAmount, allYourAwaitingFeedbackTasksAmount, allYourDoneTasksAmount, allYourUrgentTasksAmount) {
	document.getElementById('content').innerHTML = '';
	document.getElementById('content').innerHTML += generateSummaryHtml(allYourTasksAmount, allYourToDoTasksAmount, allYourInProgressTasksAmount, allYourAwaitingFeedbackTasksAmount, allYourDoneTasksAmount, allYourUrgentTasksAmount);
	greetUserInMobileUI();
}

// Hover Summary help-function

/**
 * Right image gets chosen for hover effect
 * @param {string} imgId
 * @param {boolean} on if the cursor is on the div on == true
 */
function changeImg(imgId, on) {
	document.getElementById(imgId).src = `./assets/img/${penImage}${on ? '_black' : ''}.png`;
}

function toDoHoverOn() {
	changeImg('toDoImg', true);
}

function toDoHoverOff() {
	changeImg('toDoImg', false);
}

function toDoDoneHoverOn() {
	changeImg('toDoDoneImg', true);
}

function toDoDoneHoverOff() {
	changeImg('toDoDoneImg', false);
}

/**
 * Shows date in the summary
 */
function showDate() {
	let currentDate = new Date();
	let dateString = currentDate.toLocaleDateString('en-US', {
		month: 'long',
		day: '2-digit',
		year: 'numeric',
	});
	document.getElementById('deadlineDate').innerHTML = dateString;
}

// greet User

/**
 * Depending on the time greet user being logged in
 * @param {number} helloCheck is 0 when width of window is bigger 768px
 */
function greetUser() {
	const currentTime = new Date();
	const hours = currentTime.getHours();
	const greeting = getGreeting(hours);

	document.getElementById('greetUser').innerHTML = `${greeting}`;

	document.getElementById('greetingMobile').innerHTML = `${greeting}`;
}

/**
 * Depending on time returns greeting
 * @param {number} hours
 * @returns string fitting greeting
 */
function getGreeting(hours) {
	if (hours >= 0 && hours < 12) return 'Good Morning';
	if (hours >= 12 && hours < 18) return 'Good Day';
	return 'Good Evening';
}

function greetUserInMobileUI() {
	document.getElementById('nameToBeingGreeted').innerHTML = `${allUsers[loggedUser[0]].name}`;
}

function greetingMobileAnimation() {
	if (window.innerWidth <= 768 && !greetingOnce) {
		document.getElementById('greetMobileOverlay').classList.remove('d-none');

		setTimeout(() => {
			document.getElementById('greetMobileOverlay').classList.add('d-none');
		}, 2000);
		greetingOnce = true;
	}
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
	/* updatingSummary(); */
	getAllValuesForOverview();
}

/**
 * It takes the loggedUserAtString from localStorage,
 * parses it into a JSON object,
 * and then logs the id of the object to the console.
 */
function loadLoggedInUserArray() {
	let loggedUserAsString = localStorage.getItem('loggedUser');
	loggedUser = JSON.parse(loggedUserAsString);
}

/**
 * This function takes the logged in user's index from the array
 * and assigns it to a variable.
 */
function getLoggedUserIndex() {
	loggedInUserIndex = loggedUser[0];
}

/**
 * This function takes the index of the logged in user
 * and returns the email address of that user.
 * @param loggedInUserIndex - The index of the user in the users array.
 */
function getEmailAdrressOfLoggedUser() {
	emailAddress = allUsers[loggedInUserIndex].email;
	emailAddress == guestEmail ? (guestLoggedIn = true) : null;
}

let greetingOnce = false;

// function to filter all tasks with emailAdress
function allUserTasks(tasks) {
	return tasks.filter((task) => task.assignedTo.some((person) => person.email === emailAddress));
}

function filterTasks(tasks, priority, emailAddress) {
	return tasks.filter((task) => task.workFlowStatus === priority && task.assignedTo.some((person) => person.email === emailAddress));
}

function filterTasksPriority(tasks, priority, emailAddress) {
	return tasks.filter((task) => task.prio === priority && task.assignedTo.some((person) => person.email === emailAddress));
}

async function getAllValuesForOverview() {
	allYourTasks = allUserTasks(joinTaskArray);
	allYourToDoTasks = filterTasks(joinTaskArray, 0, emailAddress);
	allYourInProgressTasks = filterTasks(joinTaskArray, 1, emailAddress);
	allYourAwaitingFeedbackTasks = filterTasks(joinTaskArray, 2, emailAddress);
	allYourDoneTasks = filterTasks(joinTaskArray, 3, emailAddress);
	allYourUrgentTasks = filterTasksPriority(joinTaskArray, 'Urgent', emailAddress);

	allYourTasksAmount = allYourTasks.length;
	allYourToDoTasksAmount = allYourToDoTasks.length;
	allYourInProgressTasksAmount = allYourInProgressTasks.length;
	allYourAwaitingFeedbackTasksAmount = allYourAwaitingFeedbackTasks.length;
	allYourDoneTasksAmount = allYourDoneTasks.length;
	allYourUrgentTasksAmount = allYourUrgentTasks.length;

	console.log('test', allYourUrgentTasksAmount);
}

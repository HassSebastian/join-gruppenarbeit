async function initSummary() {
	loadTask();
	await includeHTML();
	await renderSummary();
	selectedMenuBtnId = 0;
	selectedMenuButton(1);
	showDate();
	showTime();
	loadLoggedInUserArray();
}

async function renderSummary() {
	document.getElementById('content').innerHTML = '';
	document.getElementById('content').innerHTML += /*html*/ `
    <!-- <div class='summary_content'> -->
        <div class='title'>
            <h3>Summary</h3>
            <img src='./assets/img/vertical_line.png'>
            <h4>Everything in a nutshell!</h4>
        </div>
        <div class='welcome'>
            <h4 id='greetUser'></h4>
            <h3>Sofia Müller</h3>
        </div>
        <div class="overview">
            <div class='taskOverview'>
                <div id='taskInBoard'><span id='taskInBoardAmount'>5</span> <p>Task in Board</p></div>
                <div id='taskInProgress'><span id='taskInProgressAmount'>2</span> <p>Task in Progress</p></div>
                <div id='awaitingFeedback'><span id='awaitingFeedbackAmount'>2</span> <p>Awaiting Feedback</p></div>
            </div>
            <div class='ugencySummary' onmouseover="ugencySummaryHoverOn()" onmouseout="ugencySummaryHoverOff()">
                <div class="ugent">
                    <div class='ugentImgContainer'>
                        <img class='ugentImg' id='urgentImg' src='./assets/img/summary_urgent.png' >
                    </div>
                    <div class='ugentAmount'>
                        <span id='ugencySummaryAmount' >1</span>
                        <p id='ugencySummaryurgent'>Urgent</p>
                    </div>
                    <img src='./assets/img/vertical-line2.png' class='ugentVerticalLine'>
                </div>
                <div class='deadlineData'>
                    <p id='deadlineDate'>October 16, 2022</p> 
                    <p class='deadlineText' id='deadlineText'>Upcoming Deadline</p> 
                </div>
            </div>
            <div class='toDoData'>
                <div class='toDo' id='toDo' onmouseover="toDoHoverOn()" onmouseout="toDoHoverOff()">
                    <img id='toDoImg' src='./assets/img/to_do_pen.png' alt="">
                    <div class='toDoAmountData'>
                        <span id='toDoAmountTasks'>1</span>
                        <p id='toDoAmountP'>to-Do</p>
                    </div>
                </div>
                <div class='toDoDone' id='toDoDone' onmouseover="toDoDoneHoverOn()" onmouseout="toDoDoneHoverOff()">
                    <img id='toDoDoneImg' src='./assets/img/done.png' alt="">
                    <div class='toDoAmountData'>
                        <span id='toDoDoneAmountTasks'>1</span>
                        <p id='toDoDoneAmountP'>Done</p>
                    </div>
                </div>
            </div>
        </div>
    `;
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
function showTime() {
	let currentTime = new Date();
	let hours = currentTime.getHours();
	let timeString = hours;
	if (timeString >= 6) {
		document.getElementById('greetUser').innerHTML = `Good Morning,`;
	}
	if (timeString >= 12) {
		document.getElementById('greetUser').innerHTML = `Good Day,`;
	}
	if (timeString >= 18) {
		document.getElementById('greetUser').innerHTML = `Good Evening,`;
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

let loggedInUserIndex; // Test: Im Array ist immer nur eine Zahl drin
let emailAddress;
let allYourTasksAmount = 0;
let allYourTask = []; // Bossis Idee, für workflow 0-3

/**
 * It takes the loggedUserAtString from localStorage,
 * parses it into a JSON object,
 * and then logs the id of the object to the console.
 */
function loadLoggedInUserArray() {
	let loggedUserAtString = localStorage.getItem('loggedUser');
	loggedUser = JSON.parse(loggedUserAtString);
	getLoggedUserIndex();
	getEmailAdrressOfLoggedUser(loggedInUserIndex);
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
function getEmailAdrressOfLoggedUser(loggedInUserIndex) {
	emailAddress = users[loggedInUserIndex].email;
	console.log(emailAddress);
}

function getAmountTasksForLoggedInUser() {
	for (let task = 0; task < joinTaskArray.length; task++) {
		const assignedTo = joinTaskArray[task].assignedTo;
		return assignedTo.findIndex((memberOfTaskForce) => {
			return memberOfTaskForce.email == 'sigmundekoehler@test.de';
		});
	}
}

console.log(users.includes('sigmundekoehler@test.de'));

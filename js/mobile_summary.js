async function initMobilSummary() {
	setURL('https://gruppe-407.developerakademie.net/smallest_backend_ever');
	await loadTask();
	resetCounters();
	await loadAmountsForSummary(); // await später für server wichtig
	await includeHTML();
	await renderMobilSummary(
		allYourTasksAmount,
		allYourToDoTasksAmount,
		allYourInProgressTasksAmount,
		allYourAwaitingFeedbackTasksAmount,
		allYourDoneTasksAmount,
		yourUrgentTasksAmount
	);
	selectedMenuBtnId = 0;
	helloPageMob();
	selectedMenuButton(1);

	showDate();
	greetUser();
	loadContributorsLetterMob();
	logOutMasterContainerMob();
}

function loadContributorsLetterMob() {
	let colorIndex = allUsers[loggedUser[0]].colorIndex;
	document.getElementById('contributorsLogoHeadderMob').style = `background:${colorUserIndex[colorIndex]}`;
	document.getElementById('contributorsLogoHeadderLettersMob').innerHTML = `<p style='color:white'>${allUsers[loggedUser].firstSecondLetter}</p>`;
}

async function renderMobilSummary(
	allYourTasksAmount,
	allYourToDoTasksAmount,
	allYourInProgressTasksAmount,
	allYourAwaitingFeedbackTasksAmount,
	allYourDoneTasksAmount,
	yourUrgentTasksAmount
) {
	document.getElementById('mobilContent').innerHTML = '';
	document.getElementById('mobilContent').innerHTML += generateMobilSummaryHtml(
		allYourTasksAmount,
		allYourToDoTasksAmount,
		allYourInProgressTasksAmount,
		allYourAwaitingFeedbackTasksAmount,
		allYourDoneTasksAmount,
		yourUrgentTasksAmount
	);
}

function generateMobilSummaryHtml() {
	return /*html*/ `
    <div class="summaryFloatingMasterContainer">
        <div class="headingContainer">
            <span class="kanbanProjectManagementTool">
            Kanban Project Management Tool
            </span>
            <div class="headlineContainerMob">
                <span Class="headlineMob">
                Summary
                </span>
                <span class="headlineDisMob">
                    Everything in a nutshell!
                </span>
            </div>
        </div>
        <div class="summaryDisplayMobilContainer">
            <div class='taskOverviewMob'>
                <div id='taskInBoard' class="cardsSummaryTop">
                <div class="containerBox" >
                    <span id='taskInBoardAmount'>${allYourTasksAmount}</span>
                    <p>Task in Board</p>
                    </div>
                </div>
                <div id='taskInProgress' class="cardsSummaryTop"><span id='taskInProgressAmount'>${allYourInProgressTasksAmount}</span>
                    <p>Task in Progress</p>
                </div>
                <div id='awaitingFeedback' class="cardsSummaryTop"><span
                        id='awaitingFeedbackAmount'>${allYourAwaitingFeedbackTasksAmount}</span>
                    <p>Awaiting Feedback</p>
                </div>
            </div>

            <div class='ugencySummaryMob'>
                <div class="ugentMob">
                    <div class='ugentImgContainerMob'>
                        <img class='ugentImgMob' id='urgentImg' src='../../assets/img/summary_urgent.png'>
                    </div>
                    <div class='ugentAmountMob'>
                        <span id='ugencySummaryAmount'>${yourUrgentTasksAmount}</span>
                        <p id='ugencySummaryurgent'>Urgent</p>
                    </div>
                    <img src='../../assets/img/vertical-line2.png' class='ugentVerticalLine'>
                </div>
                <div class='deadlineDataMob'>
                    <p id='deadlineDate'></p>
                    <p class='deadlineText' id='deadlineText'><b>12.02.2023 Deadline</b></p>
                </div>
            </div>

            <div class='toDoDataMob'>
                <div class='toDo' id='toDo' onmouseover="toDoHoverOn()" onmouseout="toDoHoverOff()">
                    <img id='toDoImg' src='../../assets/img/to_do_pen.png' alt="">
                    <div class='toDoAmountData'>
                        <span id='toDoAmountTasks'>${allYourToDoTasksAmount}</span>
                        <p id='toDoAmountP'>to-Do</p>
                    </div>
                </div>
                <div class='toDoDone' id='toDoDone' onmouseover="toDoDoneHoverOn()" onmouseout="toDoDoneHoverOff()">
                    <img id='toDoDoneImg' src='../../assets/img/done.png' alt="">
                    <div class='toDoAmountData'>
                        <span id='toDoDoneAmountTasks'>${allYourDoneTasksAmount}</span>
                        <p id='toDoDoneAmountP'>Done</p>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
}

// LogOut Overlay //
////////////////////
function logOutMasterContainerMob() {
	document.getElementById('logOutMasterContainer').innerHTML = /*html*/ `
    <div class="logOutNav" onclick="renderHelpMob()">
            <span>Help</span>
        </div>
        <div class="logOutNav" onclick="dataPrivacyMob()">
            <span>Legal notice</span>
        </div>
        <div class="logOutNav" onclick="logOutMob()">
            <span>Log out</span>
        </div>
    `;
}

function logOutBtnMob() {
	document.getElementById('logOutMasterContainer').classList.toggle('d-none');
}

function logOutMob() {
	helloCheck = 0;
	outLogoutMob();
	localStorage.removeItem('loggedUser');
}
////////////////////

// BackArrow from Help and Legal notice Function //
///////////////////////////////////////////////////
let backButtonMobArray = [
	{ name: '0' },
	{
		func: () => {
			initMobilSummary();
		},
	},
	{
		func: () => {
			initMobilBoard();
		},
	},
	{ name: '0' },
	{
		func: () => {
			initMobilContacts();
		},
	},
];

function backButtonMob() {
	let index = backButtonMobArray[selectedMenuBtnId];
	index.func();
}
///////////////////////////////////////////////////

// UserGreeting in Mobil //
///////////////////////////
let helloCheckMob = 0;
function helloPageMob() {
	helloCheckMob == 1
		? document.getElementById('greetingMasterContainer').classList.add('d-none')
		: null /* (document.getElementById('greetingMasterContainer').innerHTML = ``) */;
	document.getElementById('greetingMasterContainer').innerHTML = generateHtmlGreetingUserMobil();
	helloCheckMob = 1;
	greetingMasterContainerHide();
}

function generateHtmlGreetingUserMobil() {
	return /*html*/ `
    <div class='greetContainerMob'>
        <span id='greetUser'></span>
        <span class="greetUserName">${allUsers[loggedUser[0]].name}</span>
    </div>
`;
}

function greetingMasterContainerHide() {
	setTimeout(() => {
		document.getElementById('greetingMasterContainer').classList.add('d-none');
	}, 4000);
}
///////////////////////////

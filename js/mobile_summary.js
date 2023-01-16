async function initMobilSummary(){
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
	selectedMenuButton(1);
	showDate();
	showTime();
	loadContributorsLetter();
}


async function renderMobilSummary( allYourTasksAmount, allYourToDoTasksAmount, allYourInProgressTasksAmount, allYourAwaitingFeedbackTasksAmount, allYourDoneTasksAmount,yourUrgentTasksAmount) {
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


function generateMobilSummaryHtml(){
    return /*html*/`
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
        <div class="summaryFloatingMasterContainer">
            <div class='taskOverviewMob'>
                <div id='taskInBoard'><span id='taskInBoardAmount'>${allYourTasksAmount}</span>
                    <p>Task in Board</p>
                </div>
                <div id='taskInProgress'><span id='taskInProgressAmount'>${allYourInProgressTasksAmount}</span>
                    <p>Task in Progress</p>
                </div>
                <div id='awaitingFeedback'><span
                        id='awaitingFeedbackAmount'>${allYourAwaitingFeedbackTasksAmount}</span>
                    <p>Awaiting Feedback</p>
                </div>
            </div>

            <div class='ugencySummaryMob' onmouseover="ugencySummaryHoverOn()" onmouseout="ugencySummaryHoverOff()">
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
                    <p id='deadlineDate'>October 16, 2022</p>
                    <p class='deadlineText' id='deadlineText'>Upcoming Deadline</p>
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
        </div>`;
}


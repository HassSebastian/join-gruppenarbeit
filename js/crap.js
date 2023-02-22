/* 
!1 */
async function renderMobileBoardHtml() {
	document.getElementById('content').innerHTML = '';
	document.getElementById('content').innerHTML = /*html*/ `
        <span class="kanbanProjectManagementTool">
            Kanban Project Management Tool
        </span>
        <div class='headlineContainerBoardMob'>
            <span Class='headlineMob'>
                Board
            </span>
        </div>
        <div class='boardSearchMobilOuterContainer'>
            <div class='boardsearchmobilmidcontainer'>
                <div class='boardsearchmobilinnerContainer'>
                    <input type="text" class='boardSearchMobilInput' id="searchField" required placeholder='Find Task' onfocus='startSearchMobil(event)' autocomplete='off'>
                    <div class='lupeContainer'>
                        <img src='../assets/img/board_mobil_lupe.png'>
                    </div>
                </div>   
            </div>
        </div>
        <div class='addTaskPlusHeader' onclick='startAddTaskOverlay()'>
            
        </div>
        <div class='boardTaskCardOuterContainer'>
            <div class='toDoOuterContainer'>
                <div class='toDoHeadline'>
                    <span>To do</span>
                    <div class='headlinePlusBtn' onclick='startAddTaskOverlay()'>

                    </div>
                </div>
                
                <div id='toDoDiv'>

                </div>
                <div class='toDoHeadline'>
                    <span>In progress</span>
                    <div class='headlinePlusBtn' onclick='startAddTaskOverlay()'>

                    </div>
                </div>
                <div id='progressDiv'>

                </div>
                <div class='toDoHeadline'>
                    <span>Awaiting Feedback</span>
                    <div class='headlinePlusBtn' onclick='startAddTaskOverlay()'>

                    </div>
                </div>
                <div id='awaitingDiv'>

                </div>
                <div class='toDoHeadline'>
                    <span>Done</span>
                    <div class='headlinePlusBtn' onclick='startAddTaskOverlay()'>

                    </div>
                </div>
                <div id='doneDiv'>

                </div>

            </div>
        </div>

        
        <div id='boardAddTask' class='boardAddTask d-none'>

        </div>
        <div id='boardTaskDetail' class='boardTaskDetail d-none'>

        </div>
        `;
}

async function renderAllCardsMobil() {
	renderToDoCardsMobil();
	renderInProgressCardsMobil();
	renderAwaitingFeedbackCardsMobil();
	renderDoneCardsMobil();
	renderAssignTo();
}

async function renderToDoCardsMobil() {
	document.getElementById('toDoDiv').innerHTML = '';
	for (let i = 0; i < workStatus0Array.length; i++) {
		document.getElementById('toDoDiv').innerHTML += toDoCardMobilHtml(i);
		let taskIndex = workStatus0Array[i]['taskIndex'];
		showContributorsPrioIcon(taskIndex);
	}
	setCategoryBackgroundColorForWorkStatus0();
}

function renderInProgressCardsMobil() {
	document.getElementById('progressDiv').innerHTML = '';
	for (let i = 0; i < workStatus1Array.length; i++) {
		document.getElementById('progressDiv').innerHTML += inProgressMobilHtml(i);
		let taskIndex = workStatus1Array[i]['taskIndex'];
		showContributorsPrioIcon(taskIndex);
	}
	setCategoryBackgroundColorForWorkStatus1();
}

function renderAwaitingFeedbackCardsMobil() {
	document.getElementById('awaitingDiv').innerHTML = '';
	for (let i = 0; i < workStatus2Array.length; i++) {
		document.getElementById('awaitingDiv').innerHTML += awaitingFeedbackMobilHtml(i);
		let taskIndex = workStatus2Array[i]['taskIndex'];
		showContributorsPrioIcon(taskIndex);
	}
	setCategoryBackgroundColorForWorkStatus2();
}

function renderDoneCardsMobil() {
	document.getElementById('doneDiv').innerHTML = '';
	for (let i = 0; i < workStatus3Array.length; i++) {
		document.getElementById('doneDiv').innerHTML += doneMobilHtml(i);
		let taskIndex = workStatus3Array[i]['taskIndex'];
		showContributorsPrioIcon(taskIndex);
	}
	setCategoryBackgroundColorForWorkStatus3();
}

function toDoCardMobilHtml(arrayIndex) {
	let cardTitle = workStatus0Array[arrayIndex]['cardTitle'];
	let cardDescription = workStatus0Array[arrayIndex]['cardDescription'];
	let cardCategory = workStatus0Array[arrayIndex]['cardCategory'];
	let taskIndex = workStatus0Array[arrayIndex]['taskIndex'];
	let workStatusArrayNo = 0;
	let subTasksAmount = workStatus0Array[arrayIndex]['subTasks'].length;
	let subTaskDoneAmount = determindSubTasksDone(arrayIndex, workStatusArrayNo);
	let percentDone = calculatePercentage(subTaskDoneAmount, subTasksAmount);
	return /*html*/ `
        <div class='taskBackgroundMobil' id='taskCard${taskIndex}' onclick='startDetailViewOverlay(); renderPopupTaskCardHtmlMobil(${taskIndex})'>
            <div class='taskContainerMobil'>
                <div class='boardTaskCategoryMobil' id='toDoCardCat${arrayIndex}'>
                    <span>${cardCategory}</span>
                </div>
                <div class='taskHeadlineMobil'>
                    <span class='taskHeadlineContentMobil'>${cardTitle}</span>
                    <span class='taskContentMobil'>${cardDescription}</span>
                </div>
                <div class='doneBarMobil'>
                    <div class='doneBarOuterMobil' id='doneBarOuter${taskIndex}'>
                        <div style='background-color: #29ABE2; height: 8px; width: ${percentDone}%;' id='doneBar${taskIndex}'></div>
                    </div>
                    <span>${subTaskDoneAmount}/${subTasksAmount} Done</span>
                </div>
                <div class='contributorsPrioMobil'>
                    <div class='contributorsLogoContainerMobil' id='contributorsList${taskIndex}'>
                       
                    </div>
                    <div class='prioMobil'>
                        <img src='./assets/img/low.png' id='contributorsPrioIcon${taskIndex}'>
                    </div>
                </div>
            </div>
        </div>`;
}

/* 
!2 */
function inProgressMobilHtml(arrayIndex) {
	let cardTitle = workStatus1Array[arrayIndex]['cardTitle'];
	let cardDescription = workStatus1Array[arrayIndex]['cardDescription'];
	let cardCategory = workStatus1Array[arrayIndex]['cardCategory'];
	let taskIndex = workStatus1Array[arrayIndex]['taskIndex'];
	let workStatusArrayNo = 1;
	let subTasksAmount = workStatus1Array[arrayIndex]['subTasks'].length;
	let subTaskDoneAmount = determindSubTasksDone(arrayIndex, workStatusArrayNo);
	let percentDone = calculatePercentage(subTaskDoneAmount, subTasksAmount);
	return /*html*/ `
            <div class='taskBackgroundMobil' id='taskCard${taskIndex}' onclick='startDetailViewOverlay(); renderPopupTaskCardHtmlMobil(${taskIndex})'>
                <div class='taskContainerMobil'>
                    <div class='boardTaskCategoryMobil' id='progressCard${arrayIndex}'>
                        <span>${cardCategory}</span>
                    </div>
                    <div class='taskHeadlineMobil'>
                        <span class='taskHeadlineContentMobil'>${cardTitle}</span>
                        <span class='taskContentMobil'>${cardDescription}</span>
                    </div>
                    <div class='doneBarMobil'>
                        <div class='doneBarOuterMobil' id='doneBarOuter${taskIndex}'>
                            <div style='background-color: #29ABE2; height: 8px; width: ${percentDone}%;' id='doneBar${taskIndex}'></div>
                        </div>
                        <span>${subTaskDoneAmount}/${subTasksAmount} Done</span>
                    </div>
                    <div class='contributorsPrioMobil'>
                        <div class='contributorsLogoContainerMobil' id='contributorsList${taskIndex}'>
                           
                        </div>
                        <div class='prioMobil'>
                            <img src='./assets/img/low.png' id='contributorsPrioIcon${taskIndex}'>
                        </div>
                    </div>
                </div>
            </div>`;
}

function awaitingFeedbackMobilHtml(arrayIndex) {
	let cardTitle = workStatus2Array[arrayIndex]['cardTitle'];
	let cardDescription = workStatus2Array[arrayIndex]['cardDescription'];
	let cardCategory = workStatus2Array[arrayIndex]['cardCategory'];
	let taskIndex = workStatus2Array[arrayIndex]['taskIndex'];
	let workStatusArrayNo = 2;
	let subTasksAmount = workStatus2Array[arrayIndex]['subTasks'].length;
	let subTaskDoneAmount = determindSubTasksDone(arrayIndex, workStatusArrayNo);
	let percentDone = calculatePercentage(subTaskDoneAmount, subTasksAmount);
	return /*html*/ `
        <div class='taskBackgroundMobil' id='taskCard${taskIndex}' onclick='startDetailViewOverlay(); renderPopupTaskCardHtmlMobil(${taskIndex})'>
            <div class='taskContainerMobil'>
                <div class='boardTaskCategoryMobil' id='feedbackCard${arrayIndex}'>
                    <span>${cardCategory}</span>
                </div>
                <div class='taskHeadlineMobil'>
                    <span class='taskHeadlineContentMobil'>${cardTitle}</span>
                    <span class='taskContentMobil'>${cardDescription}</span>
                </div>
                <div class='doneBarMobil'>
                    <div class='doneBarOuterMobil' id='doneBarOuter${taskIndex}'>
                        <div style='background-color: #29ABE2; height: 8px; width: ${percentDone}%;' id='doneBar${taskIndex}'></div>
                    </div>
                    <span>${subTaskDoneAmount}/${subTasksAmount} Done</span>
                </div>
                <div class='contributorsPrioMobil'>
                    <div class='contributorsLogoContainerMobil' id='contributorsList${taskIndex}'>
                        
                    </div>
                    <div class='prioMobil'>
                        <img src='./assets/img/low.png' id='contributorsPrioIcon${taskIndex}'>
                    </div>
                </div>
            </div>
        </div>`;
}

function doneMobilHtml(arrayIndex) {
	let cardTitle = workStatus3Array[arrayIndex]['cardTitle'];
	let cardDescription = workStatus3Array[arrayIndex]['cardDescription'];
	let cardCategory = workStatus3Array[arrayIndex]['cardCategory'];
	let taskIndex = workStatus3Array[arrayIndex]['taskIndex'];
	let workStatusArrayNo = 3;
	let subTasksAmount = workStatus3Array[arrayIndex]['subTasks'].length;
	let subTaskDoneAmount = determindSubTasksDone(arrayIndex, workStatusArrayNo);
	let percentDone = calculatePercentage(subTaskDoneAmount, subTasksAmount);
	return /*html*/ `
        <div class='taskBackgroundMobil' id='taskCard${taskIndex}' onclick='startDetailViewOverlay(); renderPopupTaskCardHtmlMobil(${taskIndex})'>
            <div class='taskContainerMobil'>
                <div class='boardTaskCategoryMobil' id='doneCard${arrayIndex}'>
                    <span>${cardCategory}</span>
                </div>
                <div class='taskHeadlineMobil'>
                    <span class='taskHeadlineContentMobil'>${cardTitle}</span>
                    <span class='taskContentMobil'>${cardDescription}</span>
                </div>
                <div class='doneBarMobil'>
                    <div class='doneBarOuterMobil' id='doneBarOuter${taskIndex}'>
                        <div style='background-color: #29ABE2; height: 8px; width: ${percentDone}%;' id='doneBar${taskIndex}'></div>
                    </div>
                    <span>${subTaskDoneAmount}/${subTasksAmount} Done</span>
                </div>
                <div class='contributorsPrioMobil'>
                    <div class='contributorsLogoContainerMobil' id='contributorsList${taskIndex}'>
                        
                    </div>
                    <div class='prioMobil'>
                        <img src='./assets/img/low.png' id='contributorsPrioIcon${taskIndex}'>
                    </div>
                </div>
            </div>
        </div>`;
}

/* 
!3 */

/* 
!4 */

async function renderPopupEditTaskCardHtmlMobil(taskIndex) {
	document.getElementById('boardTaskDetail').innerHTML = '';
	document.getElementById('boardTaskDetail').innerHTML = /*html*/ `
        <div class='boardTaskCardPopup'>
            <div class="scrollOverEdit">

                <div class='addTaskTitleMobil'>
                    <h3>Title</h3>
                    <input type="text" placeholder='Enter a title' id="boardEditTitle" autocomplete='off'>
                    <span class="requiredText" id="titleReq">This field is required</span>
                </div>

                <div class='addTaskDescriptionMobil'>
                    <h3>Description</h3>
                    <textarea type="text" placeholder='Enter a descripten' id="boardEditDecription"></textarea>
                    <span class="requiredText" id="descReq">This field is required</span>
                </div>

                <div class='addTaskPrioMobil boardMobilPrioSetting'>
                    <div class='frame28'>
                        <h3>Prio</h3>
                        <div class='addTaskPrioIconsMob' id='addTaskPrioIcons'>
                            <div class='addTaskUrgentMob' id='addTaskUrgent' onclick='addPrio(0)'>
                                <span id='addTaskUrgentSpan'>Urgent</span>
                                <img id='addTaskUrgentImg' src="../assets/img/urgent_arrows.png">
                            </div>
                            <div class='addTaskMediumMob' id='addTaskMedium' onclick='addPrio(1)'>
                                <span id='addTaskMediumSpan'>Medium</span>
                                <img id='addTaskMediumImg' src="../assets/img/prio_medium.png">
                            </div>
                            <div class='addTaskLowMob' id='addTaskLow' onclick='addPrio(2)'>
                                <span id='addTaskLowSpan'>Low</span>
                                <img id='addTaskLowImg' src="../assets/img/prio_low.png">
                            </div>
                        </div>
                    </div>
                </div>

                <div class='addTaskDateMob boardMobilDateSetting'>
                    <h3>Due date</h3>
                    <div>
                        <input required type="date" id='boardEditDueDate' min="2023-01-01">
                        
                    </div>
                    <span class='requiredText' id='dateReq'>This field is required</span>
                </div>


                </div> -->


                <div class="addTaskAssignedBoxMob" id="addTaskAssignedBox">
                    <h3>Assigned to</h3>
                    <button id="addTaskAssignedButton" onclick="enableDisableAssignList()">
                        <input disabled onclick="doNotCloseOnClick(event)" id="selectedAssign" name="selectedAssign"
                            class="inputselectedAssign" placeholder="Select contacts to assign" autocomplete="off" />
                        <div id="assignToCancelConfirmImgContainer" class="assignToCancelConfirmImgContainer d-none">
                            <img onclick="assignBoxBackToDefaultMode(), enableAssignList()" class="assignToCancelIcon"
                                src="assets/img/cancel-black.png" alt="cancel" />
                            <img class="assignToDeviderIcon" src="assets/img/bnt_divider.png" />
                            <img onclick="frontEndDeveloper()" class="assignToCheckIcon"
                                src="assets/img/akar-icons_check.png" alt="confirm" />
                        </div>
                        <img id="assignDropDownImg" src="assets/img/Vector 2.png" class="dropdownImg"/>
                    </button>
                    <span id="assignReq">This field is required</span>
                    <div id="badgesTaskForce" class="badgesTaskForce"></div>
                    <ul class="addTaskAssignList listD-none" id="dropdown2">
                        <li onclick="assigendContactEmail()" class="inviteNewContacts">
                            Invite new contacts<img class="assignInviteNewContactImage"
                                src="assets/img/assigned_inviteNewContact.png" alt="" />
                        </li>
                    </ul>
                </div>

                <button class='editTaskOkBtnMob' onclick='getTaskChangesMobil(${taskIndex})'>Ok <img src='../assets/img/akar-icons_check_white.png' ></button>
            <!-- Delete Button edited by Bossi  -->
                <button class='deleteButton d-none' id='deleteButton' onclick='deleteButtonMobil(${taskIndex})'> <!--edit by Basti-->
                    Delete <img src='../assets/img/akar-icons_check_white.png' >
                </button>


            </div>
            
        </div>
        <div class="taskAddedToBoard" id="taskCreatedIndication">
            <div class="taskAddedToBoardContainer">
                <span>Task added to board</span>
                <img src="./assets/img/img_board_w.png" />
            </div>
        </div>`;
}

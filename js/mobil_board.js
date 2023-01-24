let arrayMoveBtnText = [
    {'workStatus': 0, 
     'btn': ['Task to "In progress"'],
     'newStatus':[1]
    },
    {'workStatus': 1, 
     'btn': ['Task to "To do"', 'Task to "Awaiting Feedback"'],
     'newStatus':[0, 2]
    },
    {'workStatus': 2, 
     'btn': ['Task to "In progress"', 'Task to "Done"'],
     'newStatus':[1, 3]
    },
    {'workStatus': 3, 
     'btn': ['Task to "Awaiting Feedback"'],
     'newStatus':[2]
    }
];


async function initMobilBoard() {
    await renderMobileBoardHtml();
    selectedMenuButton(2);
    await loadTask();
    await createWorkStatusArrays();
    await renderAllCardsMobil();
    // loadContributorsLetter();
    logOutMasterContainerMob();
    document.getElementById('greetingMasterContainer').classList.add('d-none');
}


async function renderMobileBoardHtml() {
    document.getElementById('mobilContent').innerHTML = '';
    document.getElementById('mobilContent').innerHTML = /*html*/ `
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
                <!-- toDo TaskCards -->
                <div class='toDoHeadline'>
                    <span>To do</span>
                    <div class='headlinePlusBtn' onclick='startAddTaskOverlay()'>

                    </div>
                </div>
                
                <div id='toDoDiv'>

                </div>
                <!-- In progress TaskCards-->
                <div class='toDoHeadline'>
                    <span>In progress</span>
                    <div class='headlinePlusBtn' onclick='startAddTaskOverlay()'>

                    </div>
                </div>
                <div id='progressDiv'>

                </div>
                <!-- Awaiting Feedback TaskCards-->
                <div class='toDoHeadline'>
                    <span>Awaiting Feedback</span>
                    <div class='headlinePlusBtn' onclick='startAddTaskOverlay()'>

                    </div>
                </div>
                <div id='awaitingDiv'>

                </div>
                <!-- Done TaskCards-->
                <div class='toDoHeadline'>
                    <span>Done</span>
                    <div class='headlinePlusBtn' onclick='startAddTaskOverlay()'>

                    </div>
                </div>
                <div id='doneDiv'>

                </div>

            </div>
        </div>

        
        <!-- Add Task Overlay -->
        <div id='boardAddTask' class='boardAddTask d-none'>

        </div>
        <!-- Detail View Overlay -->
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
        <!-- später wieder einfügen: onclick='startDetailViewOverlay(); renderPopupTaskCardHtmlMobil(${taskIndex})' -->
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


function startSearchMobil() {
    let cards = document.querySelectorAll('.taskBackgroundMobil'); // Select all elements with class "taskBackground"
    document.getElementById('searchField').addEventListener('input', function () {
        searchTerm = this.value.toLowerCase(); // Get the search term and convert to lowercase
        searchTerm = this.value.trim();
        cards.forEach(function (card) {
            let cardTitle = card.querySelector('.taskHeadlineContentMobil').textContent.toLowerCase();
            let cardDescription = card.querySelector('.taskContentMobil').textContent.toLowerCase();
            if (cardTitle.indexOf(searchTerm) !== -1 || cardDescription.indexOf(searchTerm) !== -1) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
}


// Add Task Overlay functions


async function startAddTaskOverlay() {
    await boardMobilAddTaskHtml();
    await loadExitingCategories();
    renderCategoryList();
    newCatInputActive = false;
    renderSubtasks();
    // selectedMenuBtnId = 0;
    // selectedMenuButton(3);
    renderLoggedUserInAssignDrobDownMenuIntoYou()
    await renderContactsInAssignDropDownMenu();
    setFutureDatesOnlyForInputDueDate();
    // loadContributorsLetter();
    addSubtaskMain();
    getInnerWidth();
    document.getElementById('boardAddTask').classList.remove('d-none');
    // document.getElementById('bottomMenu').classList.add('d-none');
    
}


function closeAddTaskOverlay() {
    document.getElementById('boardAddTask').classList.add('d-none');
    // document.getElementById('bottomMenu').classList.remove('d-none');
}


async function boardMobilAddTaskHtml() {
    coworkersToAssignTo = transferallUserData();
    addCheckAttributeToCoworkersToAssignTo();
    document.getElementById('boardAddTask').innerHTML = '';
    document.getElementById('boardAddTask').innerHTML = /*html*/ `
        <header class='mobilHeader'>
            <img src='../../assets/img/mobil_header_logo.png'>
            <button onclick='checkInputsMobil()'><span>Create</span><img src='../assets/img/akar-icons_check_white.png'> </button>
        </header>
            <div class='frame154Over'>
                <div class='frame40'>
                    <h2>Add Task</h2>
                </div>
            </div>
            <div class='closeAddTask' onclick='closeAddTaskOverlay()'>

            </div>

        <div class="scrollOver">

            <div class='addTaskTitleMobil'>
                <h3>Title</h3>
                <input type="text" placeholder='Enter a title' id="addTaskTitle" autocomplete='off'>
                <span class="requiredText" id="titleReq">This field is required</span>
            </div>

            <div class='addTaskDescriptionMobil'>
                <h3>Descripten</h3>
                <textarea type="text" placeholder='Enter a descripten' id="addTaskDescripten"></textarea>
                <span class="requiredText" id="descReq">This field is required</span>
            </div>

            <div class='addTaskPrioMobil'>
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

            <div class='addTaskDateMob'>
                <h3>Due date</h3>
                <div>
                    <input required type="date" id='dueDate' min="2023-01-01">
                    
                </div>
                <span class='requiredText' id='dateReq'>This field is required</span>
            </div>


            <div class="addTaskAddCategoryBoxMob">
                <h3>Category</h3>
                <button onclick="enableDisableCatList()" id="selectedCat">
                    <input disabled id="selectedCatInput" placeholder="Select task category" autocomplete="off" />
                    <span id="sColor"></span>
                    <div class="newCategoryImgDiv d-none" id="addTaskNewCatBtn">
                        <img src="../assets/img/new_cat_cancel.png" />
                        <img src="../assets/img/bnt_divider.png" class="btnDivider" />
                        <img src="../assets/img/akar-icons_check.png" />
                    </div>
                    <img src="../assets/img/Vector 2.png" class="dropdownImg" id="dropdownImg" />
                </button>
                <span class="listD-none requiredText" id="catReq">This field is required</span>
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


            <div class='subtaskMob'>
				<h3>Subtask</h3>
				<div class='inputDiv'>
					<form onsubmit='addSubtask(); return false'>
						<input type="text" placeholder="Add new subtask" id="subTask" autocomplete="off"
							onfocus="subTaskInputentered()" onblur="subTaskInputLeave()" minlength="3" />
						<img src="../assets/img/add_cross.png" class="subtaskCross" id="subtaskCross"
							onclick="enterSubTaskInput()" />
					</form>
					<div class='subTaskImgDiv d-none' id='subTaskImgDiv'>
						<img src="../assets/img/new_cat_cancel.png" onclick='resetSubtaskInput()'>
						<img src="../assets/img/bnt_divider.png" class='btnDivider'>
						<img src="../assets/img/akar-icons_check.png" onclick='addSubtask()'>
					</div>
				</div>
				<div class='addTaskCheckbox' id='subtaskCheckboxes'></div>
			</div>
        </div>
        <div class="taskAddedToBoard" id="taskCreatedIndication">
            <div class="taskAddedToBoardContainer">
                <span>Task added to board</span>
                <img src="./assets/img/img_board_w.png" />
            </div>
        </div>`;
}


async function checkInputsMobil() {
    getReqiredFieldValues();
    resetRequiredWarnings();
    if (requiredFieldAreNotValid()) {
        setRequiredTextWarnings();
    } else {
        await createTaskDataMobil();
    }
}

async function createTaskDataMobil() {
    await loadTask();
    getDataFromFomular();
    await createAssignToListForSave();
    fillTaskData();
    pushTaskData();
    saveTask();
    showAddDiv();
    setTimeout(initMobilBoard, 1200);
    closeAddTaskOverlay();
  }


//   Task Card detail View

async function startDetailViewOverlay(){
    
    document.getElementById('boardTaskDetail').classList.remove('d-none');
}


// async function boardMobilDetailViewHtml(){
//     document.getElementById('boardTaskDetail').innerHTML = '';
//     document.getElementById('boardTaskDetail').innerHTML = /*html*/ ``;
// }


function closeBoardMobilDetailOverlay() {
    document.getElementById('boardTaskDetail').classList.add('d-none');
}


function renderPopupTaskCardHtmlMobil(taskIndex) {
    let cardTitle = joinTaskArray[taskIndex]['title'];
    let cardDescription = joinTaskArray[taskIndex]['descripten'];
    let cardCategory = joinTaskArray[taskIndex]['category'];
    let cardDueDate = joinTaskArray[taskIndex]['dueDate'];
    let taskPrio = joinTaskArray[taskIndex]['prio'];
    document.getElementById('boardTaskDetail').innerHTML = '';
    document.getElementById('boardTaskDetail').innerHTML = /*html*/`
        <div class='boardTaskCardPopup'>
            <div class='taskCardPopupCategory' id='taskCardPopupCategory'>
                <span>${cardCategory}</span>
            </div>
            <img src="./assets/img/arrow-left-line.png" class='backArrow' onclick='closeBoardMobilDetailOverlay(); saveChangesDetailView()'>
            <div class='taskCardPopupTask'>
                <span>${cardTitle}</span>
            </div>
            <span class='taskCardPopupDescription'>${cardDescription}</span>
            <div class='taskCardPopupDateContainer'>
                <span class='taskCardPopupDateText'>Due date:</span>
                <span class='taskCardPopupDueDate'>${cardDueDate}</span>
            </div>
            <div class='taskCardPopupPriorityContainer'>
                <span>Priority:</span>
                <div class='urgency' id='prioContainer'>
                    <span>${taskPrio}</span>
                    <img src='./assets/img/urgent_white.png' id='cardPrioImg'>
                </div>
            </div>
            <span class='assigned'>Assigned To:</span>
            <div class='members' id='members'>
            
            </div>
            <div class='editButton' onclick='startDetailViewOverlay(); openEditTaskCardMobil(${taskIndex})'>
                <img src='./assets/img/edit_button.png'>
            </div>

            <div class='moveBtnMobil' id='moveBtnMobil'>
                <!-- <button>
                    Task to 'To do'
                </button>

                <button>
                    Task to 'In progress'
                </button> -->
        
            </div>

            <div class='boardSubtasksTitleDiv'>
                <span class='boardSubtaskTitle'>Subtasks:</span>
            
            </div >
            <div class='boardSubtasksDiv' id='subtaskListTaskCard'>
                
            </div>
            
        </div>`;

    setTaskCardPopupCatColor(taskIndex);
    setTaskCardPopupPrioBackground(taskIndex);
    renderSubtaskMobil(taskIndex);
    renderAssignToHtml2(taskIndex);
    renderMoveBtnMobil(taskIndex);
}


async function renderBtnBySubtaskChange(taskIndex){
    await saveChangesDetailView();
    renderMoveBtnMobil(taskIndex);
}


async function renderSubtaskMobil(taskIndex) {
    await renderSubtaskMobilHtml(taskIndex);
    setSubTaskStatus(taskIndex);
}


async function renderSubtaskMobilHtml(taskIndex) {
    document.getElementById('subtaskListTaskCard').innerHTML = '';
    let subtaskArray = joinTaskArray[taskIndex]['subTasks'];
    if (subtaskExist(subtaskArray)) {
        for (let i = 0; i < subtaskArray.length; i++) {
            let subtaskText = subtaskArray[i]['subtaskText'];
            document.getElementById('subtaskListTaskCard').innerHTML += /*html*/`
                <div>
                    <input type='checkbox' id='subtask${i}' onclick='checkboxSubtaskSelected(${i}, ${taskIndex}); renderBtnBySubtaskChange(${taskIndex})'>
                    <span>${subtaskText}</span>
                </div>`;
        }
    }
}


async function saveChangesDetailView(){
    await saveTask();
    await createWorkStatusArrays();
    renderAllCardsMobil();
}


async function renderMoveBtnMobil(taskIndex){
    document.getElementById('moveBtnMobil').innerHTML = '';
    let workStatus = joinTaskArray[taskIndex]['workFlowStatus'];
    let buttonArray = arrayMoveBtnText[workStatus]['btn'];
    let forLoppEndValue = buttonArray.length;
    let newStatusArray = arrayMoveBtnText[workStatus]['newStatus'];
    if (workStatus >= 1 && workStatus < 3){
        forLoppEndValue = taskCardAllowMove(taskIndex);
    }
    for (let i = 0; i < forLoppEndValue; i++) {
        let buttonText = buttonArray[i];
        let newTaskStatus = newStatusArray[i];
        renderMoveBtnMobilHtml(buttonText, newTaskStatus, taskIndex);
    }   
}


function renderMoveBtnMobilHtml(buttonText, newTaskStatus, taskIndex) {
    document.getElementById('moveBtnMobil').innerHTML += /*html*/`
    <button onclick='moveMobilTaskTo(${taskIndex}, ${newTaskStatus})'>
        ${buttonText}
    </button>`;
}


async function moveMobilTaskTo(taskIndex, newTaskStatus){
    joinTaskArray[taskIndex]['workFlowStatus'] = newTaskStatus;
    await saveTask();
    await createWorkStatusArrays();
    renderAllCardsMobil();
    closeBoardMobilDetailOverlay();
}


function taskCardAllowMove(taskIndex){
    let endValue;
    // let workStatus = joinTaskArray[taskIndex]['workFlowStatus'];
    let doneBarDraggedElement = document.getElementById(`doneBar${taskIndex}`);
	let doneBarOuterDraggedElement = document.getElementById(`doneBarOuter${taskIndex}`);
    let doneBarWidth = doneBarDraggedElement.offsetWidth;
	let doneBarOuterWidth = doneBarOuterDraggedElement.offsetWidth;
    if (doneBarWidth == doneBarOuterWidth){
        endValue = 2;
    }else{
        endValue = 1
    }
    return endValue;
}


// edit function

async function openEditTaskCardMobil(taskIndex) {
    resetAssignToList();
    // resetCheckValueAllUsers();
    coworkersToAssignTo = transferallUserData();
    await renderPopupEditTaskCardHtmlMobil(taskIndex);
    showDeleteButton(taskIndex);
    renderLoggedUserInAssignDrobDownMenuIntoYou();
    await renderContactsInAssignDropDownMenu();
    await renderEditTaskCardInputFieldsMobil(taskIndex);
    boardEditTaskCardAssignPreseselction(taskIndex);
}


// function resetCheckValueAllUsers(){
//     for (let i = 0; i < allUsers.length; i++) {
//         allUsers[i].check = false;
//     }
// }



async function renderEditTaskCardInputFieldsMobil(taskIndex) {
    let cardTitle = joinTaskArray[taskIndex]['title'];
    let cardDescription = joinTaskArray[taskIndex]['descripten'];
    let cardDueDate = joinTaskArray[taskIndex]['dueDate'];
    let taskPrio = joinTaskArray[taskIndex]['prio'];
    let prioArray = { 'Urgent': 0, 'Medium': 1, 'Low': 2 };
    let taskPrioNumber = prioArray[taskPrio];
    await addPrio(taskPrioNumber);
    boardEditedPrio = taskPrio;
    document.getElementById('boardEditTitle').value = cardTitle;
    document.getElementById('boardEditDecription').value = cardDescription;
    document.getElementById('boardEditDueDate').value = cardDueDate;
}


async function renderPopupEditTaskCardHtmlMobil(taskIndex) {
    document.getElementById('boardTaskDetail').innerHTML = '';
    document.getElementById('boardTaskDetail').innerHTML = /*html*/`
        <div class='boardTaskCardPopup'>
            <div class="scrollOverEdit">

                <div class='addTaskTitleMobil'>
                    <h3>Title</h3>
                    <input type="text" placeholder='Enter a title' id="boardEditTitle" autocomplete='off'>
                    <span class="requiredText" id="titleReq">This field is required</span>
                </div>

                <div class='addTaskDescriptionMobil'>
                    <h3>Descripten</h3>
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


                <!-- <div class="addTaskAddCategoryBoxMob">
                    <h3>Category</h3>
                    <button onclick="enableDisableCatList()" id="selectedCat">
                        <input disabled id="selectedCatInput" placeholder="Select task category" autocomplete="off" />
                        <span id="sColor"></span>
                        <div class="newCategoryImgDiv d-none" id="addTaskNewCatBtn">
                            <img src="../assets/img/new_cat_cancel.png" />
                            <img src="../assets/img/bnt_divider.png" class="btnDivider" />
                            <img src="../assets/img/akar-icons_check.png" />
                        </div>
                        <img src="../assets/img/Vector 2.png" class="dropdownImg" id="dropdownImg" />
                    </button>
                    <span class="listD-none requiredText" id="catReq">This field is required</span>
                    <ul class="addTaskCatList listD-none" id="CatListDropdown"></ul>
                    <div class="addTaskAddCategoryColor listD-none" id="colorSelection">
                        <div class="color0" id="color0Div" onclick="addColorToCat(0)"></div>
                        <div class="color1" id="color1Div" onclick="addColorToCat(1)"></div>
                        <div class="color2" id="color2Div" onclick="addColorToCat(2)"></div>
                        <div class="color3" id="color3Div" onclick="addColorToCat(3)"></div>
                        <div class="color4" id="color4Div" onclick="addColorToCat(4)"></div>
                        <div class="color5" id="color5Div" onclick="addColorToCat(5)"></div>
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

                <button class='editTaskOkBtn' onclick='getTaskChangesMobil(${taskIndex})'>Ok <img src='../assets/img/akar-icons_check_white.png' ></button>
            <!-- Delete Button edited by Bossi  -->
                <button class='deleteButton d-none' id='deleteButton' onclick='deleteButtonMobil(${taskIndex})'> <!--edit by Basti-->
                    Delete <img src='../assets/img/akar-icons_check_white.png' >
                </button>


                <!-- <div class='subtaskMob'>
                    <h3>Subtask</h3>
                    <div class='inputDiv'>
                        <form onsubmit='addSubtask(); return false'>
                            <input type="text" placeholder="Add new subtask" id="subTask" autocomplete="off"
                                onfocus="subTaskInputentered()" onblur="subTaskInputLeave()" minlength="3" />
                            <img src="../assets/img/add_cross.png" class="subtaskCross" id="subtaskCross"
                                onclick="enterSubTaskInput()" />
                        </form>
                        <div class='subTaskImgDiv d-none' id='subTaskImgDiv'>
                            <img src="../assets/img/new_cat_cancel.png" onclick='resetSubtaskInput()'>
                            <img src="../assets/img/bnt_divider.png" class='btnDivider'>
                            <img src="../assets/img/akar-icons_check.png" onclick='addSubtask()'>
                        </div>
                    </div>
                    <div class='addTaskCheckbox' id='subtaskCheckboxes'></div>
                </div> -->

            </div>
            
        </div>
        <div class="taskAddedToBoard" id="taskCreatedIndication">
            <div class="taskAddedToBoardContainer">
                <span>Task added to board</span>
                <img src="./assets/img/img_board_w.png" />
            </div>
        </div>`;
}


async function getTaskChangesMobil(taskIndex) {
    let boardEditedTitle = document.getElementById('boardEditTitle').value;
    let boardEditedDescripten = document.getElementById('boardEditDecription').value;
    let boardEditedDueDate = document.getElementById('boardEditDueDate').value;
    joinTaskArray[taskIndex]['assignedTo'] = taskForce;
    joinTaskArray[taskIndex]['title'] = boardEditedTitle;
    joinTaskArray[taskIndex]['descripten'] = boardEditedDescripten;
    joinTaskArray[taskIndex]['dueDate'] = boardEditedDueDate;
    boardEditedPrio = prio;
    joinTaskArray[taskIndex]['prio'] = boardEditedPrio;
    await saveTask();
    showAddDiv();
    setTimeout(closeSequenceEditTaskCard, 1200); 
    checkStatusToFalse();  
}


async function closeSequenceEditTaskCard(){
    closeBoardMobilDetailOverlay();
    await renderMobileBoardHtml();
    await createWorkStatusArrays();
    renderAllCardsMobil();
}


async function deleteButtonMobil(taskIndex) {
    joinTaskArray.splice(taskIndex, 1);
    await saveTask();
    await renderMobileBoardHtml();
    await createWorkStatusArrays();
    renderAllCardsMobil();
}
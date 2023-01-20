async function initMobilBoard() {
    await renderMobileBoardHtml();
    selectedMenuButton(2);
    await loadTask();
    await createWorkStatusArrays();
    await renderAllCardsMobil();
    loadContributorsLetter();
    logOutMasterContainerMob();
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
                <div class='toDoHeadline'>
                    <span>To do</span>
                    <div class='headlinePlusBtn' onclick='startAddTaskOverlay()'>

                    </div>
                </div>
                <!-- toDo TaskCards -->
                <div id='toDoDiv'>

                </div>
            </div>
        </div>
        <!-- Add Task Overlay -->
        <div id='boardAddTask' class='boardAddTask d-none'>

        </div>
        `;
}


async function renderAllCardsMobil() {
    renderToDoCardsMobil();
    // renderInProgressCards();
    // renderAwaitingFeedbackCards();
    // renderDoneCards();
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
        <!-- später wieder einfügen: onclick='enablePopupWindow(); renderPopupTaskCardHtml(${taskIndex})' -->
        <div class='taskBackgroundMobil' id='taskCard${taskIndex}' >
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


async function startAddTaskOverlay() {
    await overlayHtml()
    await loadExitingCategories();
    renderCategoryList();
    newCatInputActive = false;
    renderSubtasks();
    // selectedMenuBtnId = 0;
    selectedMenuButton(3);
    await renderContactsInAssignDropDownMenu();
    setFutureDatesOnlyForInputDueDate();
    // loadContributorsLetter();
    getInnerWidth();
    document.getElementById('boardAddTask').classList.remove('d-none');
    document.getElementById('navMasterContainerMob').classList.add('d-none');
}

function closeAddTaskOverlay() {
    document.getElementById('boardAddTask').classList.add('d-none');
    document.getElementById('navMasterContainerMob').classList.remove('d-none');
}

async function overlayHtml() {
    coworkersToAssignTo = allUsers;
    addCheckAttributeToCoworkersToAssignTo();
    document.getElementById('boardAddTask').innerHTML = '';
    document.getElementById('boardAddTask').innerHTML = /*html*/ `
        <header class='mobilHeader'>
            <img src='../../assets/img/mobil_header_logo.png'>
            <button onclick='checkInputsMobil()'><span>Create</span><img src='../assets/img/akar-icons_check_white.png'> </button>
        </header>

            <!-- <div class='frame164'>
                <h3>Kanban Project Management Tool</h3>
            </div> -->
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
        <!--ab hier komme ich in "Assigned to" nicht mehr weiter. Ich weiß nicht wo ich ansetzen soll :-( -->
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
                    <li>
                        You
                        <div class="assignCheckboxContainer">
                            <img class="checkBox" src="assets/img/check_box.png" alt="checkbox" />
                            <img class="checkMark" src="assets/img/check_mark.png" />
                        </div>
                    </li>
                </ul>
            </div>


            <div class='subtaskMob'>
				<h3>Subtask</h3>
        <!--ab hier komme ich in "Subtask" nicht mehr weiter. Ich weiß nicht wo ich ansetzen soll :-( -->
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
    resetAssignToList();
    clearFormularData();
    renderMobileBoardHtml();
    closeAddTaskOverlay();
  }

//   function getDataFromFomular() {
//     descripten = document.getElementById("addTaskDescripten").value;
//     subTask = document.getElementById("subTask").value;
//   }

// function renderAssignToMobil() {
//     for (let i = 0; i < workStatusArray.length; i++) {
//         for (let index = 0; index < workStatusArray[i].length; index++) {
//             let taskIndex = workStatusArray[i][index]['taskIndex'];
//             renderAssignToHtml(taskIndex);
//         }
//     }
// }


// function renderAssignToHtml(taskIndex) {
// 	let assignedList = joinTaskArray[taskIndex]['assignedTo'];
// 	let divId = 'contributorsList' + taskIndex;
// 	document.getElementById(divId).innerHTML = '';
// 	if (assignedList.length > 0) {
// 		if (assignedList.length <= 3) {
// 			for (let i = 0; i < assignedList.length; i++) {
// 				let name = assignedList[i].name;
// 				let nameLetters = assignedList[i].firstSecondLetter;
// 				// chooseColorForTaskForceBadge(nameLetters);
// 				let assignToColor = colorIndex[assignedList[i].colorIndex];
// 				let assignToTitle = name;
// 				document.getElementById(divId).innerHTML += /*html*/ `
//                 <div class='contributorsLogo' title='${assignToTitle}' style='background-color: ${assignToColor}'>
//                     <span>${nameLetters}</span>
//                 </div>`;
// 			}
// 		} else {
// 			for (let i = 0; i < 3; i++) {
// 				let name = assignedList[i].name;
// 				let nameLetters = assignedList[i].firstSecondLetter;
// 				// chooseColorForTaskForceBadge(nameLetters);
// 				let assignToColor = colorIndex[assignedList[i].colorIndex];
// 				let assignToTitle = name;
// 				document.getElementById(divId).innerHTML += /*html*/ `
//                 <div class='contributorsLogo' title='${assignToTitle}' style='background-color: ${assignToColor}'>
//                     <span>${nameLetters}</span>
//                 </div>`;
// 			}
// 			let assignedListLength = assignedList.length - 3;
// 			document.getElementById(divId).innerHTML += /*html*/ `
//             <div class='contributorsLogo' style='background-color:#000000; color:white'>
//                 <span>+${assignedListLength}</span>
//             </div>`;
// 		}
// 	}
// }
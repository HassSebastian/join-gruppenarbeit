async function initMobilBoard() {
    await renderMobileBoardHtml();
    selectedMenuButton(2);
    await loadTask();
    await createWorkStatusArrays();
    await renderAllCardsMobil();
    loadContributorsLetter();
}


async function renderMobileBoardHtml(){
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
                    <input type="text" class='boardSearchMobilInput' placeholder='Find task' autocomplete='none'>
                    <div class='lupeContainer'>
                        <img src='../assets/img/board_mobil_lupe.png'>
                    </div>
                </div>   
            </div>
        </div>
        <div class='addTaskPlusHeader'>
            
        </div>
        <div class='boardTaskCardOuterContainer'>
            <div class='toDoOuterContainer'>
                <div class='toDoHeadline'>
                    <span>To do</span>
                    <div class='headlinePlusBtn'>

                    </div>
                </div>
                <!-- toDo TaskCards -->
                <div id='toDoDiv'>

                </div>




            </div>
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
async function initMobilBoard() {
    // await includeHTML();
    await renderMobileBoard();
    // selectedMenuBtnId = 0;
    selectedMenuButton(2);
    await loadTask();
    await createWorkStatusArrays();
    // renderAllCards();
    // loadContributorsLetter();
    await renderToDoCards();
}


async function renderMobileBoard(){
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

function infoContainer(){
    return /*html*/ `
        <div class='taskBackground' id='taskCard${taskIndex}' draggable='true' ondragstart='startDrag(${taskIndex})' onclick='enablePopupWindow(); renderPopupTaskCardHtml(${taskIndex})'>
            <div class='taskContainer'>
                <div class='boardTaskCategory' id='toDoCardCat${arrayIndex}'>
                    <span>${cardCategory}</span>
                </div>
                <div class='taskHeadline'>
                    <span class='taskHeadlineContent'>${cardTitle}</span>
                    <span class='taskContent'>${cardDescription}</span>
                </div>
                <div class='doneBar'>
                    <div class='doneBarOuter' id='doneBarOuter${taskIndex}'>
                        <div style='background-color: #29ABE2; height: 8px; width: ${percentDone}%;' id='doneBar${taskIndex}'></div>
                    </div>
                    <span>${subTaskDoneAmount}/${subTasksAmount} Done</span>
                </div>
                <div class='contributorsPrio'>
                    <div class='contributorsLogoContainer' id='contributorsList${taskIndex}'>
                       
                    </div>
                    <div class='prio'>
                        <img src='./assets/img/low.png' id='contributorsPrioIcon${taskIndex}'>
                    </div>
                </div>
            </div>
        </div>`;
}
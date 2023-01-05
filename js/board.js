let workStatusArray = [];
let workStatus0Array = [];
let workStatus1Array = [];
let workStatus2Array = [];
let workStatus3Array = [];
let currentDraggedElement;
let categoryBackgroundColors = [
    '#8aa4ff',
    '#ff0000',
    '#2ad300',
    '#ff8a00',
    '#e200be',
    '#0038ff'
];
let prioColorAndUrlArray = [
    {
        'urgent': ['#FF3D00', './assets/img/urgent_white.png'],
        'medium': ['#FFA800', './assets/img/medium_white.png'],
        'low': ['#7AE229', './assets/img/low_white.png'],
    }
];


async function initBoard() {
    await includeHTML();
    await renderBoard();
    selectedMenuBtnId = 0;
    selectedMenuButton(2);
    loadTask();
    await createWorkStatusArrays();
    renderAllCards();
}


/**
 * this function render the basic board html structur into the HTML template div content.
 */
async function renderBoard() {
    document.getElementById('content').innerHTML = '';
    document.getElementById('content').innerHTML += boardHtml();
}


/**
 * this function returns the basic board html string
 * @returns - basic board html string
 */
function boardHtml() {
    return /*html*/`
        <div class="boardOverlay">
            <div class="boardHeadline">
                <span>Board</span>
            </div>
            <div class="inputOutContainer">
                <div class="inputContainer">
                    <div class="inputInContainer">
                        <div class="inputFontContainer">
                            <span>Find Task</span>
                        </div>
                        <div class="vector"></div>
                        <img src="./assets/img/search_logo.png">
                    </div>
                </div>
                <button class="addTaskButton" onclick='showAddTaskPopupWindow()'>
                    <span>Add task</span>
                    <div class="plusOutContainer">
                        <img src="./assets/img/plus_logo_white.png">
                    </div>
                </button>
            </div>
        </div>
        <div class='frame191'>
            <div class='frame192'>
                <div class="frame136">
                    <span>To do</span>
                    <button class="menuPlusButton" onclick='showAddTaskPopupWindow()'>
                        <!-- <img src="./assets/img/plus.svg"> -->
                    </button>
                </div>
                <div class='frame149'>
                    <span>In progress</span>
                    <button class="menuPlusButton" onclick='showAddTaskPopupWindow()'>
                        <!-- <img src="./assets/img/plus_logo_black.png"> -->
                    </button>
                </div>
                <div class='frame137'>
                    <span>Anwaiting Feedback</span>
                    <button class="menuPlusButton" onclick='showAddTaskPopupWindow()'>
                        <!-- <img src="./assets/img/plus_logo_black.png"> -->
                    </button>
                </div>
                
                <div class='frame138'>
                    <span>Done</span>
                        <button class="menuPlusButton" onclick='showAddTaskPopupWindow()'>
                        <!-- <img src="./assets/img/plus_logo_black.png"> -->
                    </button>
                </div>
            </div>
        </div>
        <div class="canbanBoard" onscroll='changeHeightDropArea()' id='canbanBoard'>
            <div class="canbanContainer dragArea" id='dropArea0' ondrop="moveTo(0); removeHighlight('dropArea0')"  ondragleave="removeHighlight('dropArea0')" ondragover="allowDrop(event); highlight('dropArea0')">
                <div id='toDoDiv'>
                    
                </div>
            </div>
            <div class="canbanContainer dragArea" id='dropArea1' ondrop="moveTo(1); removeHighlight('dropArea1')" ondragleave="removeHighlight('dropArea1')" ondragover="allowDrop(event); highlight('dropArea1')">
                <div id='progressDiv'>
                    
                </div>
            </div>
            <div class="canbanContainer dragArea" id='dropArea2' ondrop="moveTo(2); removeHighlight('dropArea2')" ondragleave="removeHighlight('dropArea2')" ondragover="allowDrop(event); highlight('dropArea2')">
                <div id='awaitingDiv'>
                    
                </div>
            </div>
            <div class="canbanContainer dragArea" id='dropArea3' ondrop="moveTo(3); removeHighlight('dropArea3')" ondragleave="removeHighlight('dropArea3')" ondragover="allowDrop(event); highlight('dropArea3')">
                <div id='doneDiv'>
                    
                </div>
            </div>
        </div>

        <div class='shadowOverlay d-none' id='boardPopup' onclick='disablePopupWindow()'>
            <div class="boardTaskCardPopup" onclick='stopClose(event)'>
                <div class="taskCardPopupCategory">
                    <span>Sales</span>
                </div>
                <div class="taskCardPopupTask">
                    <span>Call potencial clients</span>
                </div>
                <span class="taskCardPopupDescription">Make the product presentation to prospective buyers</span>
                <div class="taskCardPopupDateContainer">
                    <span class="taskCardPopupDateText">Due date:</span>
                    <span class="taskCardPopupDueDate">05-08-2022</span>
                </div>
                <div class="taskCardPopupPriorityContainer">
                    <!-- classes down must be changed later ! -->
                <span>Priority:</span>
                <div class="urgency">
                    <span>Urgent</span>
                    <img src="./assets/img/urgent_white.png" alt="">
                </div>
            </div>
            <span class="assigned">Assigned To:</span>
            <img class="close_logo" src="./assets/img/close_logo.png" onclick='disablePopupWindow()'>
            <div class="editButton">
                <img src="./assets/img/edit_button.png">
            </div>
            
            
        
            <div class="members">
                <div class="davidEisenberg">
                    <span class="shortcut">DE</span>
                </div>
                <span class="name">David Eisenberg</span>
            </div>
            <div class="members">
                <div class="benediktZiegler">
                    <span class="shortcut">BZ</span>
                </div>
                <span class="name">Benedikt Ziegler</span>
            </div>
            <div class="members">
                <div class="marcelBauer">
                    <span class="shortcut">MB</span>
                </div>
                <span class="name">Marcel Bauer</span>
            </div>
            <div class="members">
                <div class="stefanieFarber">
                    <span class="shortcut">SF</span>
                </div>
                <span class="name">Stefanie Farber</span>
            </div>

            <!-- </div> -->
        </div>`;
}


// todo if already done delete this function. And rename descriten to description, also in AddTask ! This function is only for info.
function arrayExample() {
    taskData = {
        'title': title,
        'descripten': descripten,
        'category': category,
        'catColor': catColor,
        'assignedTo': assignedToArray,
        'dueDate': dueDate,
        'prio': prio,
        'subTasks': selectedSubtasks,
        'workFlowStatus': 0,
    };
}


/**
 * This function clear all Arrays related to the workstatus.
 * The workstatus is releted to the progress of processing of the task.
 */
function resetWorkStatusArrays() {
    workStatus0Array = [];
    workStatus1Array = [];
    workStatus2Array = [];
    workStatus3Array = [];
    workStatusArray = [
        workStatus0Array,
        workStatus1Array,
        workStatus2Array,
        workStatus3Array
    ];
}


/**
 * This function fill the four workstatus arrays with the related data.
 * The workstatus 0 is equal to the status 'todo'. The workstatus 1 is equal to 'in progress', and so on.
 */
async function createWorkStatusArrays() {
    resetWorkStatusArrays();
    for (let index = 0; index < 4; index++) {
        for (let i = 0; i < joinTaskArray.length; i++) {
            const element = joinTaskArray[i]['workFlowStatus'];
            if (element == index) {
                let cardTitle = joinTaskArray[i]['title'];
                let cardDescription = joinTaskArray[i]['descripten'];
                let cardCatColor = joinTaskArray[i]['catColor'];
                let cardCategory = joinTaskArray[i]['category'];
                let cardPrio = joinTaskArray[i]['prio'];
                let subTasks = joinTaskArray[i]['subTasks'];
                let assignedToList = joinTaskArray[i]['assignedTo'];
                let taskIndex = i;
                workStatusArray[index].push(createWorkStatusJson(cardTitle, cardDescription, cardCatColor, cardCategory, cardPrio, subTasks, taskIndex, assignedToList));
            }
        }
    }
}


/**
 * It takes in a bunch of parameters and returns a JSON object.
 * @param cardTitle - The title of the card.
 * @param cardDescription - The description of the card.
 * @param cardCatColor - The color of the category of the card.
 * @param cardCategory - The category of the card (e.g. "Bug", "Feature", "Task", etc.)
 * @param cardPrio - is the priority of the task.
 * @param subTasks - This is an array of objects that contain the following:
 * @param taskIndex - The index of the task in the list of tasks.
 * @param assignedToList - This is a list of objects that contain the name and email of the person
 * assigned to the task.
 * @returns An object with the following properties:
 * cardTitle
 * cardDescription
 * cardCatColor
 * cardCategory
 * cardPrio
 * subTasks
 * taskIndex
 * assignedTo
 */
function createWorkStatusJson(cardTitle, cardDescription, cardCatColor, cardCategory, cardPrio, subTasks, taskIndex, assignedToList) {
    return {
        'cardTitle': cardTitle,
        'cardDescription': cardDescription,
        'cardCatColor': cardCatColor,
        'cardCategory': cardCategory,
        'cardPrio': cardPrio,
        'subTasks': subTasks,
        'taskIndex': taskIndex,
        'assignedTo': assignedToList,
    };
}



/**
 * This function renders all the cards in the Kanban board.
 */
function renderAllCards() {
    renderToDoCards();
    renderInProgressCards();
    renderAwaitingFeedbackCards();
    renderDoneCards();
    renderAssignTo();
}
toDoCardHtml

/**
 * It takes two numbers, divides the first by the second, and multiplies the result by 100
 * @param number - The number you want to calculate the percentage of.
 * @param total - The total number of items.
 * @returns The percentage of the number in relation to the total.
 */
function calculatePercentage(number, total) {
    return (number / total) * 100;
  }


/**
 * this function render all todo cards.
 */
// toDo class design löschen !?
async function renderToDoCards() {
    document.getElementById('toDoDiv').innerHTML = '';
    for (let i = 0; i < workStatus0Array.length; i++) {
        document.getElementById('toDoDiv').innerHTML += toDoCardHtml(i);
        let taskIndex = workStatus0Array[i]['taskIndex'];
        showContributorsPrioIcon(taskIndex);
    }
    setCategoryBackgroundColorForWorkStatus0();
}


function renderAssignTo(){
    for (let i = 0; i < workStatusArray.length; i++) {
        for (let index = 0; index < workStatusArray[i].length; index++) {
            let taskIndex = workStatusArray[i][index]['taskIndex'];
            renderAssignToHtml(taskIndex);
        }   
    }
}


function renderAssignToHtml(taskIndex) {
    let assignedList = joinTaskArray[taskIndex]['assignedTo'];
    let divId = 'contributorsList' + taskIndex;
    document.getElementById(divId).innerHTML = '';
    if (assignedList.length > 0) {
        for (let i = 0; i < assignedList.length; i++) {
            let firstName = assignedList[i]['firstName'];
            let lastName = assignedList[i]['lastName'];
            let nameLetters = firstName[0] + lastName[0];
            chooseColorForTaskForceBadge(firstName[0], lastName[0]);
            // toDo index ist in der addTask.js eine Globale Variable, bitte ändern.
            let assignToColor = backgroundColorForBadges[index];
            let assignToTitle = firstName + ' ' + lastName;
            // console.log(firstName, lastName, nameLetters, assignToTitle);
            document.getElementById(divId).innerHTML += /*html*/`
                <div class='contributorsLogo' title='${assignToTitle}' style='background-color: ${assignToColor}'>
                    <span>${nameLetters}</span>
                </div>`;
        }
    }
}


/**
 * this function returns the html code for each todo task card.
 * @param {number} arrayIndex - is the index number of the workStatus0Array.
 * @returns - the html string for each todo task card.
 */
function toDoCardHtml(arrayIndex) {
    let cardTitle = workStatus0Array[arrayIndex]['cardTitle'];
    let cardDescription = workStatus0Array[arrayIndex]['cardDescription'];
    let cardCategory = workStatus0Array[arrayIndex]['cardCategory'];
    let taskIndex = workStatus0Array[arrayIndex]['taskIndex'];
    let workStatusArrayNo = 0;
    let subTasksAmount = workStatus0Array[arrayIndex]['subTasks'].length;
    let subTaskDoneAmount = determindSubTasksDone(arrayIndex, workStatusArrayNo);
    let percentDone = calculatePercentage(subTaskDoneAmount, subTasksAmount);


    return /*html*/`
        <div class='taskBackground' id='taskCard${taskIndex}' draggable='true' ondragstart='startDrag(${taskIndex})' onclick='enablePopupWindow(); renderPopupTaskCard(${taskIndex})'>
            <div class='taskContainer'>
                <div class='boardTaskCategory' id='toDoCardCat${arrayIndex}'>
                    <span>${cardCategory}</span>
                </div>
                <div class='taskHeadline'>
                    <span class='taskHeadlineContent'>${cardTitle}</span>
                    <span class='taskContent'>${cardDescription}</span>
                </div>
                <div class='doneBar'>
                    <div class='doneBarOuter'>
                        <div style='background-color: #29ABE2; height: 8px; width: ${percentDone}%;'></div>
                    </div>
                    <span>${subTaskDoneAmount}/${subTasksAmount} Done</span>
                </div>
                <div class='contributorsPrio'>
                    <div class='contributorsLogoContainer' id='contributorsList${taskIndex}'>
                        <!-- <div class='contributorsLogo blue'>
                            <span>SM</span>
                        </div>
                        <div class='contributorsLogo pink'>
                            <span>MV</span>
                        </div>
                        <div class='contributorsLogo litegreen'>
                            <span>EF</span>
                        </div> -->
                    </div>

                    <div class='prio'>
                        <img src='./assets/img/low.png' id='contributorsPrioIcon${taskIndex}'> <!--id von Basti hinzugefügt-->
                    </div>
                </div>
            </div>
        </div>`;
}





/**
 * The function determindSubTasksDone() takes two arguments, the first is the index of the
 * workStatusArray[workStatusArrayNo] array, the second is the index of the workStatusArray array. The
 * function returns the amount of subTasks that are done.
 * @param arrayIndex - the index of the task in the array
 * @param workStatusArrayNo - the index of the workStatusArray that you want to check.
 * @returns The amount of subTasks that are done.
 */
function determindSubTasksDone(arrayIndex, workStatusArrayNo){
    let doneAmount = 0;
    for (let i = 0; i < workStatusArray[workStatusArrayNo][arrayIndex]['subTasks'].length; i++) {
        let subTaskStatus = workStatusArray[workStatusArrayNo][arrayIndex]['subTasks'][i]['subtaskStatus'];
        if (subTaskStatus) {
            doneAmount += 1;
        }
    }
    return doneAmount;
}


/**
 * this function set the backgroundcolor of the catogory in the todo task card.
 */
function setCategoryBackgroundColorForWorkStatus0() {
    for (let i = 0; i < workStatus0Array.length; i++) {
        let cardCatColor = workStatus0Array[i]['cardCatColor'];
        let catBackground = categoryBackgroundColors[cardCatColor];
        document.getElementById(`toDoCardCat${i}`).style = `background-color: ${catBackground};`;
    }
}


/**
 * this function render all in progress cards.
 */
function renderInProgressCards() {
    document.getElementById('progressDiv').innerHTML = '';
    for (let i = 0; i < workStatus1Array.length; i++) {
        document.getElementById('progressDiv').innerHTML += inProgressHtml(i);
        let taskIndex = workStatus1Array[i]['taskIndex'];
        showContributorsPrioIcon(taskIndex);
    }
    setCategoryBackgroundColorForWorkStatus1();
}


/**
 * this function returns the html code for each in progress task card.
 * @param {number} arrayIndex - is the index number of the workStatus1Array.
 * @returns - the html string for each in progress task card
 */
function inProgressHtml(arrayIndex){
        let cardTitle = workStatus1Array[arrayIndex]['cardTitle'];
        let cardDescription = workStatus1Array[arrayIndex]['cardDescription'];
        let cardCategory = workStatus1Array[arrayIndex]['cardCategory'];
        let taskIndex = workStatus1Array[arrayIndex]['taskIndex'];
        let workStatusArrayNo = 1;
        let subTasksAmount = workStatus1Array[arrayIndex]['subTasks'].length;
        let subTaskDoneAmount = determindSubTasksDone(arrayIndex, workStatusArrayNo);
        let percentDone = calculatePercentage(subTaskDoneAmount, subTasksAmount);
        return /*html*/`
            <div class='taskBackground' id='taskCard${taskIndex}' draggable='true' ondragstart='startDrag(${taskIndex})' onclick='enablePopupWindow(); renderPopupTaskCard(${taskIndex})'>
                <div class='taskContainer'>
                    <div class='boardTaskCategory' id='progressCard${arrayIndex}'>
                        <span>${cardCategory}</span>
                    </div>
                    <div class='taskHeadline'>
                        <span class='taskHeadlineContent'>${cardTitle}</span>
                        <span class='taskContent'>${cardDescription}</span>
                    </div>
                    <div class='doneBar'>
                        <div class='doneBarOuter'>
                            <div style='background-color: #29ABE2; height: 8px; width: ${percentDone}%;'></div>
                        </div>
                        <span>${subTaskDoneAmount}/${subTasksAmount} Done</span>
                    </div>
                    <div class='contributorsPrio'>
                        <div class='contributorsLogoContainer' id='contributorsList${taskIndex}'>
                            <!-- <div class='contributorsLogo blue'>
                                <span>SM</span>
                            </div>
                            <div class='contributorsLogo pink'>
                                <span>MV</span>
                            </div>
                            <div class='contributorsLogo litegreen'>
                                <span>EF</span>
                            </div> -->
                        </div>

                        <div class='prio'>
                            <img src='./assets/img/low.png' id='contributorsPrioIcon${taskIndex}'> <!--id von Basti hinzugefügt-->
                        </div>
                    </div>
                </div>
            </div>`;
}


/**
 * this function set the backgroundcolor of the catogory in the in progress task card.
 */
function setCategoryBackgroundColorForWorkStatus1() {
    for (let i = 0; i < workStatus1Array.length; i++) {
        let cardCatColor = workStatus1Array[i]['cardCatColor'];
        let catBackground = categoryBackgroundColors[cardCatColor];
        document.getElementById(`progressCard${i}`).style = `background-color: ${catBackground};`;
    }
}


/**
 * this function render all awaiting feedback cards.
 */
function renderAwaitingFeedbackCards() {
    document.getElementById('awaitingDiv').innerHTML = '';
    for (let i = 0; i < workStatus2Array.length; i++) {
        document.getElementById('awaitingDiv').innerHTML += awaitingFeedbackHtml(i);
        let taskIndex = workStatus2Array[i]['taskIndex'];
        showContributorsPrioIcon(taskIndex);
    }
    setCategoryBackgroundColorForWorkStatus2();
}


/**
 * this function returns the html code for each awaitingFeedback task card.
 * @param {number} arrayIndex - is the index number of the workStatus2Array.
 * @returns - the html string for each awaitingFeedback task card
 */
function awaitingFeedbackHtml(arrayIndex){
    let cardTitle = workStatus2Array[arrayIndex]['cardTitle'];
    let cardDescription = workStatus2Array[arrayIndex]['cardDescription'];
    let cardCategory = workStatus2Array[arrayIndex]['cardCategory'];
    let taskIndex = workStatus2Array[arrayIndex]['taskIndex'];
    let workStatusArrayNo = 2;
    let subTasksAmount = workStatus2Array[arrayIndex]['subTasks'].length;
    let subTaskDoneAmount = determindSubTasksDone(arrayIndex, workStatusArrayNo);
    let percentDone = calculatePercentage(subTaskDoneAmount, subTasksAmount);
    return /*html*/`
        <div class='taskBackground' id='taskCard${taskIndex}' draggable='true' ondragstart='startDrag(${taskIndex})' onclick='enablePopupWindow(); renderPopupTaskCard(${taskIndex})'>
            <div class='taskContainer'>
                <div class='boardTaskCategory' id='feedbackCard${arrayIndex}'>
                    <span>${cardCategory}</span>
                </div>
                <div class='taskHeadline'>
                    <span class='taskHeadlineContent'>${cardTitle}</span>
                    <span class='taskContent'>${cardDescription}</span>
                </div>
                <div class='doneBar'>
                    <div class='doneBarOuter'>
                        <div style='background-color: #29ABE2; height: 8px; width: ${percentDone}%;'></div>
                    </div>
                    <span>${subTaskDoneAmount}/${subTasksAmount} Done</span>
                </div>
                <div class='contributorsPrio'>
                    <div class='contributorsLogoContainer' id='contributorsList${taskIndex}'>
                        <!-- <div class='contributorsLogo blue'>
                            <span>SM</span>
                        </div>
                        <div class='contributorsLogo pink'>
                            <span>MV</span>
                        </div>
                        <div class='contributorsLogo litegreen'>
                            <span>EF</span>
                        </div> -->
                    </div>

                    <div class='prio'>
                        <img src='./assets/img/low.png' id='contributorsPrioIcon${taskIndex}'> <!--id von Basti hinzugefügt-->
                    </div>
                </div>
            </div>
        </div>`;
}


/**
 * this function set the backgroundcolor of the catogory in the awaiting feedback task card.
 */
function setCategoryBackgroundColorForWorkStatus2() {
    for (let i = 0; i < workStatus2Array.length; i++) {
        let cardCatColor = workStatus2Array[i]['cardCatColor'];
        let catBackground = categoryBackgroundColors[cardCatColor];
        document.getElementById(`feedbackCard${i}`).style = `background-color: ${catBackground};`;
    }
}


/**
 * this function render all done cards.
 */
function renderDoneCards() {
    document.getElementById('doneDiv').innerHTML = '';
    for (let i = 0; i < workStatus3Array.length; i++) {
        document.getElementById('doneDiv').innerHTML += doneHtml(i);
        let taskIndex = workStatus3Array[i]['taskIndex'];
        showContributorsPrioIcon(taskIndex);
    }
    setCategoryBackgroundColorForWorkStatus3();
}


/**
 * this function returns the html code for each done task card.
 * @param {number} arrayIndex - is the index number of the workStatus3Array.
 * @returns - the html string for each done task card
 */
function doneHtml(arrayIndex){
    let cardTitle = workStatus3Array[arrayIndex]['cardTitle'];
    let cardDescription = workStatus3Array[arrayIndex]['cardDescription'];
    let cardCategory = workStatus3Array[arrayIndex]['cardCategory'];
    let taskIndex = workStatus3Array[arrayIndex]['taskIndex'];
    let workStatusArrayNo = 3;
    let subTasksAmount = workStatus3Array[arrayIndex]['subTasks'].length;
    let subTaskDoneAmount = determindSubTasksDone(arrayIndex, workStatusArrayNo);
    let percentDone = calculatePercentage(subTaskDoneAmount, subTasksAmount);
    return /*html*/`
        <div class='taskBackground' id='taskCard${taskIndex}' draggable='true' ondragstart='startDrag(${taskIndex})' onclick='enablePopupWindow(); renderPopupTaskCard(${taskIndex})'>
            <div class='taskContainer'>
                <div class='boardTaskCategory' id='doneCard${arrayIndex}'>
                    <span>${cardCategory}</span>
                </div>
                <div class='taskHeadline'>
                    <span class='taskHeadlineContent'>${cardTitle}</span>
                    <span class='taskContent'>${cardDescription}</span>
                </div>
                <div class='doneBar'>
                    <div class='doneBarOuter'>
                        <div style='background-color: #29ABE2; height: 8px; width: ${percentDone}%;'></div>
                    </div>
                    <span>${subTaskDoneAmount}/${subTasksAmount} Done</span>
                </div>
                <div class='contributorsPrio'>
                    <div class='contributorsLogoContainer' id='contributorsList${taskIndex}'>
                        <!-- <div class='contributorsLogo blue'>
                            <span>SM</span>
                        </div>
                        <div class='contributorsLogo pink'>
                            <span>MV</span>
                        </div>
                        <div class='contributorsLogo litegreen'>
                            <span>EF</span>
                        </div> -->
                    </div>
                    <div class='prio'>
                        <img src='./assets/img/low.png' id='contributorsPrioIcon${taskIndex}'>
                    </div>
                </div>
            </div>
        </div>`;
}


/**
 * When the user scrolls down the page, the height of the drop areas will increase to match the height
 * of the page.
 */
function changeHeightDropArea(){
    const elmnt = document.getElementById('canbanBoard');
    let y = elmnt.scrollTop;
    let newHeight = y + 600;
    document.getElementById('dropArea0').style = `height: ${newHeight}px;`;
    document.getElementById('dropArea1').style = `height: ${newHeight}px;`;
    document.getElementById('dropArea2').style = `height: ${newHeight}px;`;
    document.getElementById('dropArea3').style = `height: ${newHeight}px;`;
}


/**
 * this function set the backgroundcolor of the catogory in the done task card.
 */
function setCategoryBackgroundColorForWorkStatus3() {
    for (let i = 0; i < workStatus3Array.length; i++) {
        let cardCatColor = workStatus3Array[i]['cardCatColor'];
        let catBackground = categoryBackgroundColors[cardCatColor];
        document.getElementById(`doneCard${i}`).style = `background-color: ${catBackground} !important;`;
    }
}


let showContributorsPrioIcons = { M: './assets/img/medium.png', U: './assets/img/urgent.png', L: './assets/img/low.png' };

function showContributorsPrioIcon(taskIndex) {
    for (let a in showContributorsPrioIcons) {
        let prio = joinTaskArray[taskIndex].prio[0];
        if (a = prio) {
            document.getElementById(`contributorsPrioIcon${taskIndex}`).src = `${showContributorsPrioIcons[a]}`;
            break;
        }
    }
}


// in board.js habe ich dafür in Zeile 393, 494 und 572 eine id hinzugefügt //
// es muss nur noch der Start der Funktion eingebunden werden //


/**
 * thie function cache the id of the dragged element.
 * @param {string} id - the id is the id of the dragged element.
 */
function startDrag(id) {
    currentDraggedElement = id;
}


/**
 * this function allows to drop an draggable element.
 * @param {event} ev 
 */
function allowDrop(ev) {
    ev.preventDefault();
}


/**
 * this function set a new workstatus in the main task array 'joinTaskArray' as number.
 * @param {number} area - is related to the droparea, example: area=0, droparea is 0, this is equal to workstatus0 equal
 * to todo tasks.
 */
async function moveTo(area) {
    // toDo if abfrage ob es verschoben werden darf !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // if (joinTaskArray[currentDraggedElement]['workFlowStatus'] == 2){
        
    // }
    joinTaskArray[currentDraggedElement]['workFlowStatus'] = area;
    await saveTask();
    await createWorkStatusArrays();
    renderAllCards();
}


/**
 * this function change the backgroundcolor of the droparea, if a dragged element is over it.
 * @param {string} id - is the id of the element where the dragged element is over it.
 */
function highlight(id) {
    document.getElementById(id).classList.add('drag-area-highlight');
}


/**
 * this function reset the backgroundcolor settings during hovering of thedragged element.
 * @param {string} id - is the id of the element where the dragged element is dropped.
 */
function removeHighlight(id) {
    document.getElementById(id).classList.remove('drag-area-highlight');
}


// Testarea PopupCard ***********************************************************************************************

// basic function for the popup window

/**
 * this function remove the d-none class from the popup window. The result is that the Popup Window is shown.
 */
function enablePopupWindow(){
    document.getElementById('boardPopup').classList.remove('d-none');
}


/**
 * this function add the d-none class to the popup window. The result is that the Popup Window not shown.
 */
function disablePopupWindow(){
    document.getElementById('boardPopup').classList.add('d-none');
    renderAllCards();
}


/**
 * this function prevent the closure of the popup window when clicking on the Popup Task Card.
 */
function stopClose(event){
    event.stopPropagation();
}


// basic function popup end


// render function for the detail view of the task card.

/**
 * this function render the HTML code for the detail view of a taskcard.
 * @param {number} taskIndex - this value is equal to the index position in the main array 'joinTaskArray'.
 */
function renderPopupTaskCard(taskIndex){
    let cardTitle = joinTaskArray[taskIndex]['title'];
    let cardDescription = joinTaskArray[taskIndex]['descripten'];
    let cardCategory = joinTaskArray[taskIndex]['category'];
    let cardDueDate = joinTaskArray[taskIndex]['dueDate'];
    let taskPrio = joinTaskArray[taskIndex]['prio'];
    // let subtaskArray = joinTaskArray[taskIndex]['subTasks'];
    document.getElementById('boardPopup').innerHTML = '';
    document.getElementById('boardPopup').innerHTML = /*html*/`
        <div class="boardTaskCardPopup" onclick='stopClose(event)'>
            <div class="taskCardPopupCategory" id='taskCardPopupCategory'>
                <span>${cardCategory}</span>
            </div>
            <div class="taskCardPopupTask">
                <span>${cardTitle}</span>
            </div>
            <span class="taskCardPopupDescription">${cardDescription}</span>
            <div class="taskCardPopupDateContainer">
                <span class="taskCardPopupDateText">Due date:</span>
                <span class="taskCardPopupDueDate">${cardDueDate}</span>
            </div>
            <div class="taskCardPopupPriorityContainer">
                <!-- classes down must be changed later ! -->
            <span>Priority:</span>
            <div class="urgency" id='prioContainer'>
                <span>${taskPrio}</span>
                <img src="./assets/img/urgent_white.png" id='cardPrioImg'>
            </div>
        </div>

        <span class="assigned">Assigned To:</span>
        <img class="close_logo" src="./assets/img/close_logo.png" onclick='disablePopupWindow()'>
        <div class="editButton" onclick='openEditTaskCard(${taskIndex})'>
            <img src="./assets/img/edit_button.png">
        </div>
    
        <div class="members" id='members'>
            <!-- <div class="davidEisenberg">
                <span class="shortcut" title='David Eisenberg'>DE</span>
            </div>
            <div class="benediktZiegler">
                <span class="shortcut" title='Benedikt Ziegler'>BZ</span>
            </div>
            <div class="marcelBauer">
                <span class="shortcut" title='Marcel Bauer'>MB</span>
            </div>
            <div class="stefanieFarber">
                <span class="shortcut" title='Stefanie Farber'>SF</span>
            </div> -->
        </div>
        
        <div class='boardSubtasksTitleDiv'>
            <span class='boardSubtaskTitle'>Subtasks:</span>
                
        </div >
        <div class='boardSubtasksDiv' id='subtaskListTaskCard'>
            <!-- <div>
                <input type="checkbox" id='subtask0' onclick='checkboxSubtaskSelected(0)'>
                <span>move the Taskcard to in progress</span>
            </div>
            <div>
                <input type="checkbox" id='subtask1' onclick='checkboxSubtaskSelected(1)'>
                <span>edit this Taskcard, rename the title</span>
            </div>
            <div>
                <input type="checkbox" id='subtask2' onclick='checkboxSubtaskSelected(2)'>
                <span>verschiebe</span>
            </div>
            <div>
                <input type="checkbox" id='subtask3' onclick='checkboxSubtaskSelected(3)'>
                <span>verschiebe</span>
            </div> -->
        </div>
        
        `;

    setTaskCardPopupCatColor(taskIndex);
    setTaskCardPopupPrioBackground(taskIndex);
    renderSubtask(taskIndex);
    renderAssignToHtml2(taskIndex);
}


function renderAssignToHtml2(taskIndex) {
    let assignedList = joinTaskArray[taskIndex]['assignedTo'];
    let divId = 'members';
    document.getElementById(divId).innerHTML = '';
    if (assignedList.length > 0) {
        for (let i = 0; i < assignedList.length; i++) {
            let firstName = assignedList[i]['firstName'];
            let lastName = assignedList[i]['lastName'];
            let nameLetters = firstName[0] + lastName[0];
            chooseColorForTaskForceBadge(firstName[0], lastName[0]);
            // toDo index ist in der addTask.js eine Globale Variable, bitte ändern.
            let assignToColor = backgroundColorForBadges[index];
            let assignToTitle = firstName + ' ' + lastName;
            // console.log(firstName, lastName, nameLetters, assignToTitle);
            document.getElementById(divId).innerHTML += /*html*/`
                <div  title='${assignToTitle}' style='background-color: ${assignToColor}'>
                    <span class='shortcut'>${nameLetters}</span>
                </div>`;
        }
    }
}


async function renderSubtask(taskIndex){
    await renderSubtaskHtml(taskIndex);
    setSubTaskStatus(taskIndex);
}


/**
 * this function render the HTML code for the subTasks in the board detail view taskcard.
 * @param {*} taskIndex - this value is equal to the index position in the main array 'joinTaskArray'.
 */
async function renderSubtaskHtml(taskIndex){
    document.getElementById('subtaskListTaskCard').innerHTML = '';
    let subtaskArray = joinTaskArray[taskIndex]['subTasks'];
    if (subtaskArray.length > 0) {
        for (let i = 0; i < subtaskArray.length; i++) {
            let subtaskText = subtaskArray[i]['subtaskText'];
            document.getElementById('subtaskListTaskCard').innerHTML += /*html*/`
                <div>
                    <input type="checkbox" id='subtask${i}' onclick='checkboxSubtaskSelected(${i}, ${taskIndex})'>
                    <span>${subtaskText}</span>
                </div>`;
        }
    }
}


function setSubTaskStatus(taskIndex){
    let subtaskArray = joinTaskArray[taskIndex]['subTasks'];
    for (let i = 0; i < subtaskArray.length; i++) {
        if (subtaskArray[i]['subtaskStatus']){
            document.getElementById(`subtask${i}`).checked = true;
        }
    }
}


// test function to determind which subtask is performed.
async function checkboxSubtaskSelected(subTaskIndex, taskIndex){
    let checkboxStatus = document.getElementById(`subtask${subTaskIndex}`).checked;
    joinTaskArray[taskIndex]['subTasks'][subTaskIndex]['subtaskStatus'] = checkboxStatus;
    console.log(taskIndex, subTaskIndex);
    let subTaskText= joinTaskArray[taskIndex]['subTasks'][subTaskIndex]['subtaskText'];
    let subTaskStatus = joinTaskArray[taskIndex]['subTasks'][subTaskIndex]['subtaskStatus'];
    console.log(subTaskText, subTaskStatus);
    joinTaskArray[taskIndex]['subTasks'][subTaskIndex]['subtaskStatus'] = checkboxStatus;
    await saveTask();
}


/**
 * this function set the category background-color of the category.
 * @param {number} taskIndex -this value is equal to the index number of the main array "joinTaskArray", where
 * the task card information is stored.
 */
function setTaskCardPopupCatColor(taskIndex){
    let cardCatColorIndex = joinTaskArray[taskIndex]['catColor'];
    let cardCatColor = categoryBackgroundColors[cardCatColorIndex];
    document.getElementById('taskCardPopupCategory').style = `background-color: ${cardCatColor};`;
}


/**
 * This function sets the background color of the prio button and transfers the url of the image associated with the prio button.
 * @param {*} taskIndex --this value is equal to the index number of the main array "joinTaskArray", where
 * the task card information is stored.
 */
function setTaskCardPopupPrioBackground(taskIndex){
    let cardPrio = joinTaskArray[taskIndex]['prio'];
    cardPrio = cardPrio.toLowerCase();
    let cardPrioBackground = prioColorAndUrlArray[0][cardPrio][0];
    let cardPrioImgSrc = prioColorAndUrlArray[0][cardPrio][1];
    document.getElementById('prioContainer').style = `background-color: ${cardPrioBackground};`;
    document.getElementById('cardPrioImg').src = cardPrioImgSrc;
}


// Edit Taskcard popup
async function openEditTaskCard(taskIndex){
    resetAssignToList();
    await renderEditTaskCardHtml(taskIndex);
    renderEditTaskCardInputFields(taskIndex);
    await renderContactsInAssignDropDownMenu();
    renderEditTaskCardInputFields(taskIndex);
    boardEditTaskCardAssignPreseselction(taskIndex);
    setPrioPreselection(taskIndex);
}


async function renderEditTaskCardHtml(taskIndex){
    document.getElementById('boardPopup').innerHTML = '';
    document.getElementById('boardPopup').innerHTML = /*html*/`
        <div class="boardTaskCardPopup" onclick='stopClose(event)'>
            <img class="close_logo" src="./assets/img/close_logo.png" onclick='disablePopupWindow()'>
            <div class='boardEditTitleContainer'>
                <span>Title</span>
                <input type="text" placeholder="Enter a title" id='boardEditTitle'>
            </div>
            <div class='boardEditDescriptionContainer'>
                <span>Descripten</span>
                <textarea name="Description"  cols="30" rows="10" placeholder="Enter Descriptiom" id='boardEditDecription'></textarea>
            </div>
            <div class='boardEditDateContainer'>
                <span>Due Date</span>
                <input type="date" id='boardEditDueDate'>
            </div>

            <div class='editTaskCardPrio'>
                <h3>Prio</h3>
                <div class='editTaskCardPrioBtn'>
                    <div class='addTaskUrgent' id='addTaskUrgent' onclick='addPrio(0); prioStatusChange(0)'>
                        <span id='addTaskUrgentSpan'>Urgent</span>
                        <img id='addTaskUrgentImg' src="../assets/img/urgent_arrows.png">
                    </div>
                    <div class='addTaskMedium' id='addTaskMedium' onclick='addPrio(1); prioStatusChange(1)'>
                        <span id='addTaskMediumSpan'>Medium</span>
                        <img id='addTaskMediumImg' src="../assets/img/prio_medium.png">
                    </div>
                    <div class='addTaskLow' id='addTaskLow' onclick='addPrio(2); prioStatusChange(2)'>
                        <span id='addTaskLowSpan'>Low</span>
                        <img id='addTaskLowImg' src="../assets/img/prio_low.png">
                    </div>
                </div>
            </div>

            <div class="addTaskAssignedBox boardAddTaskAssignedBox" id="addTaskAssignedBox">
			        <h3>Assigned to</h3>
			        <button id="addTaskAssignedButton" onclick="enableDisableAssignList()">
                    <input
                            disabled
                            onclick="doNotCloseOnClick(event)"
                            id="selectedAssign"
                            name="selectedAssign"
                            class="inputselectedAssign"
                            placeholder="Select contacts to assign"
                            autocomplete="off"
                        />
				
                    <div
                    id="assignToCancelConfirmImgContainer"
                    class="assignToCancelConfirmImgContainer d-none"
                    >
                        <img
                        onclick="assignBoxBackToDefaultMode(), enableAssignList()"
                        class="assignToCancelIcon"
                        src="assets/img/cancel-black.png"
                        alt="cancel"
                        />
                        <img class="assignToDeviderIcon" src="assets/img/bnt_divider.png" />
                        <img
                        onclick="frontEndDeveloper()"
                        class="assignToCheckIcon"
                        src="assets/img/akar-icons_check.png"
                        alt="confirm"
                        />
                    </div>
                    <img id="assignDropDownImg" src="assets/img/Vector 2.png" class="dropdownImg" />
                    </button>
                    <span id="assignReq">This field is required</span>
                    <div id="badgesTaskForce" class="badgesTaskForce"></div>
                    <ul class="addTaskAssignList listD-none" id="dropdown2">

                    <li onclick="assigendContactEmail()" class="inviteNewContacts">
                        Invite new contacts<img
                            class="assignInviteNewContactImage"
                            src="assets/img/assigned_inviteNewContact.png"
                            alt=""
                        />
                    </li>
                    <li>
                    You
                    <div  class="assignCheckboxContainer">
                        <img class="checkBox" src="assets/img/check_box.png" alt="checkbox" />
                        <img class="checkMark" src="assets/img/check_mark.png" />
                    </div>
                </div>

            <button class='editTaskOkBtn' onclick='getTaskChanges(${taskIndex})'>Ok <img src="../assets/img/akar-icons_check_white.png" ></button>
            <!-- Delete Button edited by Bossi  -->
            <button class="deleteButton">
                Delete <img src="../assets/img/akar-icons_check_white.png" >
            </button>
        </div>`;
}


function renderEditTaskCardInputFields(taskIndex){
    let cardTitle = joinTaskArray[taskIndex]['title'];
    let cardDescription = joinTaskArray[taskIndex]['descripten'];
    let cardCategory = joinTaskArray[taskIndex]['category'];
    let cardDueDate = joinTaskArray[taskIndex]['dueDate'];
    let taskPrio = joinTaskArray[taskIndex]['prio'];
    let prioArray = {'Urgent': 0, 'Medium': 1 , 'Low': 2};
    let taskPrioNumber = prioArray[taskPrio];
    addPrio(taskPrioNumber);
    document.getElementById('boardEditTitle'). value = cardTitle;
    document.getElementById('boardEditDecription').value = cardDescription;
    document.getElementById('boardEditDueDate').value = cardDueDate;
}


function boardEditTaskCardAssignPreseselction(taskIndex){
    let assignToArray = joinTaskArray[taskIndex]['assignedTo'];
    for (let i = 0; i < assignToArray.length; i++) {
        let refEmail = assignToArray[i]['email'];
        for (let index = 0; index < coworkersToAssignTo.length; index++) {
            let email = coworkersToAssignTo[index]['email'];
            if (refEmail == email){
                addContactToTaskForceWithCheckBox(index);
            }
        }
    } 
}


function setPrioPreselection(taskIndex){
    let preselectedPrio = joinTaskArray[taskIndex]['prio'];
    let boardPrioStatusJson = {'Urgent': 0, 'Medium': 1, 'Low': 2};
    addPrio(boardPrioStatusJson[preselectedPrio]);
    boardEditedPrio = preselectedPrio;
}


function resetAssignToList(){
    for (let i = 0; i < coworkersToAssignTo.length; i++) {
        const element = coworkersToAssignTo[i];
        coworkersToAssignTo[i]['check'] = false;
        assignToArray = [];
        taskForce =[];
    }
}


function getDataFromEditTaskCard(){
    // taskData = {
    //     'title': title,
    //     'descripten': descripten,
    //     'category': category,
    //     'catColor': catColor,
    //     'assignedTo': assigndTo,
    //     'dueDate': dueDate,
    //     'prio': prio,
    //     'subTasks': selectedSubtasks,
    //     'workFlowStatus': 0,
    // };
}


// TODO Bossi rework the next two function
function getTaskChanges(taskIndex){
    let boardEditedTitle = document.getElementById('boardEditTitle').value;
    let boardEditedDescripten = document.getElementById('boardEditDecription').value;
    let boardEditedDueDate = document.getElementById('boardEditDueDate').value;
    joinTaskArray[taskIndex]['assignedTo'] = taskForce;
    joinTaskArray[taskIndex]['title'] = boardEditedTitle;
    joinTaskArray[taskIndex]['descripten'] = boardEditedDescripten;
    joinTaskArray[taskIndex]['dueDate'] = boardEditedDueDate;
    joinTaskArray[taskIndex]['prio'] = boardEditedPrio;
    saveTask();
    initBoard();
    disablePopupWindow();
}

let boardEditedPrio = '';


function prioStatusChange(index){
    let statusNames = ['Urgent', 'Medium', 'Low'];
    if (statusNames[index] == boardEditedPrio){
        boardEditedPrio = '';
    }else{
        boardEditedPrio = statusNames[index];
    }
}

  

// render function for the detail view of the task card end.


// render function for the creation of a new task card.
async function showAddTaskPopupWindow(){
    enablePopupWindow();
    await renderAddTaskPopup();
    loadExitingCategories();
    renderCategoryList();
    newCatInputActive = false;
    // renderSubtasks();
    renderContactsInAssignDropDownMenu();
}


/**
 * this function render the popup menu AddTask.
 */
async function renderAddTaskPopup(){
    document.getElementById('boardPopup').innerHTML = '';
    document.getElementById('boardPopup').innerHTML = renderAddTaskPopupHtml();
}


/**
 * this function returns the popup Menu html string
 * @returns - Board popup Menu html string.
 */
function renderAddTaskPopupHtml(){
    return /*html*/`
        <div id='boardAddTaskPopup' onclick='stopClose(event)'>
            <img class="close_logo_edit_task" src="./assets/img/close_logo.png" onclick='disablePopupWindow()'>
            <div class='boardAddTaskHeadlineDiv'>
                <h2 class='addTHeadline'>Add Task</h2>
            </div>
            <div class='boardAddTaskBtnOuterContainer'>
                <div class='boardAddTaskBtnInnerContainer'>
                    <button class='addTaskClear' onmouseover='addTaskClearOn()' onmouseout='addTaskClearOff()' onclick='clearFormularData()'>
                        <span>Clear</span> 
                        <img id="addTaskClear" src="./assets/img/clearb.png">
                    </button>
                    <button class='addTaskCreate' onclick='checkInputs()'>
                        <span>Create Task</span>
                        <img src="./assets/img/createb.png">  
                    </button>
                </div>
            </div>
            <div class='boardAddTaskAddTitleContainer'>
                <div class='addTaskAddTitleBox'>
                    <h3>Title</h3>
                    <form onsubmit='goToDescripten(); return false' >
                        <input  required type="text" placeholder='Enter a title' id='addTaskTitle' autocomplete='off' minlength='3'>
                    </form>
                    <span class='requiredText' id='titleReq'>This field is required</span>
                </div>

                <div class='addTaskAddDescriptenBox'>
                    <h3>Descripten</h3>
                    <!-- <form onblur='goToCategorySelection(); return false' id='formDesc' action='action.asp'> -->
                    <textarea form='formDesc' type="text" placeholder='Enter Descripten' id='addTaskDescripten'  required minlength='5'></textarea>
                    <!-- </form> -->
                    <span class='requiredText' id='descReq'>This field is required</span>
                </div>

                <div class='addTaskAddCategoryBox'>
                    <h3>Category</h3>
                    <button onclick=enableDisableCatList() id='selectedCat'>
                        <input disabled id='selectedCatInput' placeholder='Select task category' autocomplete='off'>
                        <span id='sColor'></span>
                        <div class='newCategoryImgDiv d-none' id='addTaskNewCatBtn'>
                            <img src="../assets/img/new_cat_cancel.png">
                            <img src="../assets/img/bnt_divider.png" class='btnDivider'>
                            <img src="../assets/img/akar-icons_check.png">
                        </div>
                        <img src="../assets/img/Vector 2.png" class='dropdownImg' id='dropdownImg'>
                    </button>
                    <span class='listD-none requiredText' id='catReq'>This field is required</span>
                    <ul class="addTaskCatList listD-none" id='CatListDropdown'>
                        
                    </ul>
                    <div class='addTaskAddCategoryColor listD-none' id='colorSelection'>
                        <div class='color0' id='color0Div' onclick='addColorToCat(0)'></div>
                        <div class='color1' id='color1Div' onclick='addColorToCat(1)'></div>
                        <div class='color2' id='color2Div' onclick='addColorToCat(2)'></div>
                        <div class='color3' id='color3Div' onclick='addColorToCat(3)'></div>
                        <div class='color4' id='color4Div' onclick='addColorToCat(4)'></div>
                        <div class='color5' id='color5Div' onclick='addColorToCat(5)'></div>
                    </div>
                </div>

                <div class="addTaskAssignedBox" id="addTaskAssignedBox">
			        <h3>Assigned to</h3>
			        <button id="addTaskAssignedButton" onclick="enableDisableAssignList()">
                    <input
                            disabled
                            onclick="doNotCloseOnClick(event)"
                            id="selectedAssign"
                            name="selectedAssign"
                            class="inputselectedAssign"
                            placeholder="Select contacts to assign"
                            autocomplete="off"
                        />
				
                    <div
                    id="assignToCancelConfirmImgContainer"
                    class="assignToCancelConfirmImgContainer d-none"
                    >
                        <img
                        onclick="assignBoxBackToDefaultMode(), enableAssignList()"
                        class="assignToCancelIcon"
                        src="assets/img/cancel-black.png"
                        alt="cancel"
                        />
                        <img class="assignToDeviderIcon" src="assets/img/bnt_divider.png" />
                        <img
                        onclick="frontEndDeveloper()"
                        class="assignToCheckIcon"
                        src="assets/img/akar-icons_check.png"
                        alt="confirm"
                        />
                    </div>
                    <img id="assignDropDownImg" src="assets/img/Vector 2.png" class="dropdownImg" />
                    </button>
                    <span id="assignReq">This field is required</span>
                    <div id="badgesTaskForce" class="badgesTaskForce"></div>
                    <ul class="addTaskAssignList listD-none" id="dropdown2">

                    <li onclick="assigendContactEmail()" class="inviteNewContacts">
                        Invite new contacts<img
                            class="assignInviteNewContactImage"
                            src="assets/img/assigned_inviteNewContact.png"
                            alt=""
                        />
                    </li>
                    <li>
                    You
                    <div  class="assignCheckboxContainer">
                        <img class="checkBox" src="assets/img/check_box.png" alt="checkbox" />
                        <img class="checkMark" src="assets/img/check_mark.png" />
                    </div>
                </div>


            <div class='boardAddTaskDividerBoard'>

            </div>

            <div class='boardAddTaskRightContainer alignToBoard'>
                <div class='addTaskDate'>
                    <h3>Due date</h3>
                    <input required type="date" id='dueDate'>
                    <span class='requiredText' id='dateReq'>This field is required</span>
                </div>
                <div class='addTaskPrio'>
                    <h3>Prio</h3>
                    <div class='addTaskPrioIcons'>
                        <div class='addTaskUrgent' id='addTaskUrgent' onclick='addPrio(0)'>
                            <span id='addTaskUrgentSpan'>Urgent</span>
                            <img id='addTaskUrgentImg' src="../assets/img/urgent_arrows.png">
                        </div>
                        <div class='addTaskMedium' id='addTaskMedium' onclick='addPrio(1)'>
                            <span id='addTaskMediumSpan'>Medium</span>
                            <img id='addTaskMediumImg' src="../assets/img/prio_medium.png">
                        </div>
                        <div class='addTaskLow' id='addTaskLow' onclick='addPrio(2)'>
                            <span id='addTaskLowSpan'>Low</span>
                            <img id='addTaskLowImg' src="../assets/img/prio_low.png">
                        </div>
                    </div>
                </div>
                <div class='subtask'>
                    <h3>Subtask</h3>
                    <div class='inputDiv'>
                        <form onsubmit='addSubtask(); return false' >
                            <input type="text" placeholder='Add new subtask' id='subTask' autocomplete='off' onfocus='subTaskInputentered()' onblur='subTaskInputLeave()' minlength='3'>
                            <img src="../assets/img/add_cross.png" class='subtaskCross' id='subtaskCross' onclick='enterSubTaskInput()'>
                        </form>
                        <div class='subTaskImgDiv d-none' id='subTaskImgDiv' >
                            <img src="../assets/img/new_cat_cancel.png" onclick='resetSubtaskInput()'>
                            <img src="../assets/img/bnt_divider.png" class='btnDivider'>
                            <img src="../assets/img/akar-icons_check.png" onclick='addSubtask()'>
                        </div>
                        
                    </div>
                    
                    <div class='addTaskCheckbox' id='subtaskCheckboxes'>
        
                    </div>
                </div>
            </div>
        </div>
        <!-- </form>  -->
        <div class="boardtaskAddedToBoard" id='taskCreatedIndication'>
            <div class="taskAddedToBoardContainer">
                <span>Task added to board</span>
                <img src="./assets/img/img_board_w.png">
            </div>
        </div>`;
}





// Testarea PopupCard end***********************************************************************************************
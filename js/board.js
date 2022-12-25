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
function boardHtml(){
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
                <button class="addTaskButton">
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
                    <button class="menuPlusButton">
                        <img src="./assets/img/plus_logo_black.png">
                    </button>
                </div>
                <div class='frame149'>
                    <span>In progress</span>
                    <button class="menuPlusButton">
                        <img src="./assets/img/plus_logo_black.png">
                    </button>
                </div>
                <div class='frame137'>
                    <span>Anwaiting Feedback</span>
                    <button class="menuPlusButton">
                        <img src="./assets/img/plus_logo_black.png">
                    </button>
                </div>
                
                <div class='frame138'>
                    <span>Done</span>
                        <button class="menuPlusButton">
                        <img src="./assets/img/plus_logo_black.png">
                    </button>
                </div>
            </div>
        </div>
        <div class="canbanBoard">
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
            <span class="assigend">Assigend To:</span>
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


// Testarea PopupCard ***********************************************************************************************

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
}


/**
 * this function prevent the closure of the popup window when clicking on the Popup Task Card.
 */
function stopClose(event){
    event.stopPropagation();
}


function renderPopupTaskCard(taskIndex){
    console.log('rendering started for ', taskIndex)
    let cardTitle = joinTaskArray[taskIndex]['title'];
    let cardDescription = joinTaskArray[taskIndex]['descripten'];
    let cardCategory = joinTaskArray[taskIndex]['category'];
    let cardDueDate = joinTaskArray[taskIndex]['dueDate'];
    let taskPrio = joinTaskArray[taskIndex]['prio'];
    console.log(cardTitle, cardDescription, cardCategory, cardDueDate, taskPrio);
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
        <span class="assigend">Assigend To:</span>
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
        </div>`;

    setTaskCardPopupCatColor(taskIndex);
    setTaskCardPopupPrioBackground(taskIndex);

}


function setTaskCardPopupCatColor(taskIndex){
    let cardCatColorIndex = joinTaskArray[taskIndex]['catColor'];
    let cardCatColor = categoryBackgroundColors[cardCatColorIndex];
    document.getElementById('taskCardPopupCategory').style = `background-color: ${cardCatColor};`;
}

let prioColorAndUrlArray = [
    {
    'urgent': ['#FF3D00', './assets/img/urgent_white.png'],
    'medium': ['#FFA800', './assets/img/medium_white.png'],
    'low': ['#7AE229', './assets/img/low_white.png'],
    }
]


function setTaskCardPopupPrioBackground(taskIndex){
    let cardPrio = joinTaskArray[taskIndex]['prio'];
    cardPrio = cardPrio.toLowerCase();
    let cardPrioBackground = prioColorAndUrlArray[0][cardPrio][0];
    let cardPrioImgSrc = prioColorAndUrlArray[0][cardPrio][1];
    document.getElementById('prioContainer').style = `background-color: ${cardPrioBackground};`;
    document.getElementById('cardPrioImg').src = cardPrioImgSrc;
}

// Testarea PopupCard end***********************************************************************************************



// todo if already done delete this function. And rename descriten to description, also in AddTask ! This function is only for info.
function arrayExample() {
    taskData = {
        'title': title,
        'descripten': descripten,
        'category': category,
        'catColor': catColor,
        'assignedTo': assigndTo,
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
                let taskIndex = i;
                workStatusArray[index].push(createWorkStatusJson(cardTitle, cardDescription, cardCatColor, cardCategory, cardPrio, subTasks, taskIndex));
            }
        }
    }
}


/**
 * This function create a JSON file for the workstatus Arrays.
 * @param {string} cardTitle - is the title of the related task.
 * @param {string} cardDescription - is the descripten of the related task.
 * @param {number} cardCatColor - is a number that is ralated to a fixed backgroundcolor for the category.
 * @param {string} cardCategory - is the category of the related task.
 * @param {string} cardPrio - is the priority of the related task.
 * @param {array} subTasks - is a array with all subtask of the related task.
 * @param {number} taskIndex - is the index number of the related task in the main array 'jsonTaskArray'.
 * @returns - a json.
 */
function createWorkStatusJson(cardTitle, cardDescription, cardCatColor, cardCategory, cardPrio, subTasks, taskIndex) {
    return {
        'cardTitle': cardTitle,
        'cardDescription': cardDescription,
        'cardCatColor': cardCatColor,
        'cardCategory': cardCategory,
        'cardPrio': cardPrio,
        'subTasks': subTasks,
        'taskIndex': taskIndex,
    };
}


/**
 * this function call subfunction to render all task cards.
 */
function renderAllCards() {
    renderToDoCards();
    renderInProgressCards();
    renderAwaitingFeedbackCards();
    renderDoneCards();
}


/**
 * this function render all todo cards.
 */
// toDo class design löschen !?
function renderToDoCards() {
    document.getElementById('toDoDiv').innerHTML = '';
    for (let i = 0; i < workStatus0Array.length; i++) {
        let cardPrio = workStatus0Array[i]['cardPrio'];
        let subTasks = workStatus0Array[i]['subTasks'];
        document.getElementById('toDoDiv').innerHTML += toDoCardHtml(i);
    }
    setCategoryBackgroundColorForWorkStatus0();
}


/**
 * this function returns the html code for each todo task card.
 * @param {number} arrayIndex - is the index number of the workStatus0Array.
 * @returns - the html string for each todo task card.
 */
function toDoCardHtml(arrayIndex){
    let cardTitle = workStatus0Array[arrayIndex]['cardTitle'];
    let cardDescription = workStatus0Array[arrayIndex]['cardDescription'];
    let cardCategory = workStatus0Array[arrayIndex]['cardCategory'];
    let taskIndex = workStatus0Array[arrayIndex]['taskIndex'];
    return /*html*/`
        <div class='taskBackground' id='taskCard${taskIndex}' draggable='true' ondragstart='startDrag(${taskIndex})' onclick='enablePopupWindow(); renderPopupTaskCard(${taskIndex})'>
            <div class='taskContainer'>
                <div class='taskKategorie' id='toDoCardCat${arrayIndex}'>
                    <span>${cardCategory}</span>
                </div>
                <div class='taskHeadline'>
                    <span class='taskHeadlineContent'>${cardTitle}</span>
                    <span class='taskContent'>${cardDescription}</span>
                </div>
                <div class='doneBar'>
                    <div></div>
                    <span>1/2 Done</span>
                </div>
                <div class='contributorsPrio'>
                    <div class='contributorsLogoContainer'>
                        <div class='contributorsLogo blue'>
                            <span>SM</span>
                        </div>
                        <div class='contributorsLogo pink'>
                            <span>MV</span>
                        </div>
                        <div class='contributorsLogo litegreen'>
                            <span>EF</span>
                        </div>
                    </div>

                    <div class='prio'>
                        <img src='./assets/img/low.png'>
                    </div>
                </div>
            </div>
        </div>`;
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
        let cardPrio = workStatus1Array[i]['cardPrio'];
        let subTasks = workStatus1Array[i]['subTasks'];
        document.getElementById('progressDiv').innerHTML += inProgressHtml(i);
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
        return /*html*/`
            <div class='taskBackground' id='taskCard${taskIndex}' draggable='true' ondragstart='startDrag(${taskIndex})' onclick='enablePopupWindow(); renderPopupTaskCard(${taskIndex})'>
                <div class='taskContainer'>
                    <div class='taskKategorie' id='progressCard${arrayIndex}'>
                        <span>${cardCategory}</span>
                    </div>
                    <div class='taskHeadline'>
                        <span class='taskHeadlineContent'>${cardTitle}</span>
                        <span class='taskContent'>${cardDescription}</span>
                    </div>
                    <div class='doneBar'>
                        <div></div>
                        <span>1/2 Done</span>
                    </div>
                    <div class='contributorsPrio'>
                        <div class='contributorsLogoContainer'>
                            <div class='contributorsLogo blue'>
                                <span>SM</span>
                            </div>
                            <div class='contributorsLogo pink'>
                                <span>MV</span>
                            </div>
                            <div class='contributorsLogo litegreen'>
                                <span>EF</span>
                            </div>
                        </div>

                        <div class='prio'>
                            <img src='./assets/img/low.png'>
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
        let cardPrio = workStatus2Array[i]['cardPrio'];
        let subTasks = workStatus2Array[i]['subTasks'];
        document.getElementById('awaitingDiv').innerHTML += awaitingFeedbackHtml(i);
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
    return /*html*/`
        <div class='taskBackground' id='taskCard${taskIndex}' draggable='true' ondragstart='startDrag(${taskIndex})' onclick='enablePopupWindow(); renderPopupTaskCard(${taskIndex})'>
            <div class='taskContainer'>
                <div class='taskKategorie' id='feedbackCard${arrayIndex}'>
                    <span>${cardCategory}</span>
                </div>
                <div class='taskHeadline'>
                    <span class='taskHeadlineContent'>${cardTitle}</span>
                    <span class='taskContent'>${cardDescription}</span>
                </div>
                <div class='doneBar'>
                    <div></div>
                    <span>1/2 Done</span>
                </div>
                <div class='contributorsPrio'>
                    <div class='contributorsLogoContainer'>
                        <div class='contributorsLogo blue'>
                            <span>SM</span>
                        </div>
                        <div class='contributorsLogo pink'>
                            <span>MV</span>
                        </div>
                        <div class='contributorsLogo litegreen'>
                            <span>EF</span>
                        </div>
                    </div>

                    <div class='prio'>
                        <img src='./assets/img/low.png'>
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
        let cardPrio = workStatus3Array[i]['cardPrio'];
        let subTasks = workStatus3Array[i]['subTasks'];
        document.getElementById('doneDiv').innerHTML += doneHtml(i);
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
    return /*html*/`
        <div class='taskBackground' id='taskCard${taskIndex}' draggable='true' ondragstart='startDrag(${taskIndex})' onclick='enablePopupWindow(); renderPopupTaskCard(${taskIndex})'>
            <div class='taskContainer'>
                <div class='taskKategorie' id='doneCard${arrayIndex}'>
                    <span>${cardCategory}</span>
                </div>
                <div class='taskHeadline'>
                    <span class='taskHeadlineContent'>${cardTitle}</span>
                    <span class='taskContent'>${cardDescription}</span>
                </div>
                <div class='doneBar'>
                    <div></div>
                    <span>1/2 Done</span>
                </div>
                <div class='contributorsPrio'>
                    <div class='contributorsLogoContainer'>
                        <div class='contributorsLogo blue'>
                            <span>SM</span>
                        </div>
                        <div class='contributorsLogo pink'>
                            <span>MV</span>
                        </div>
                        <div class='contributorsLogo litegreen'>
                            <span>EF</span>
                        </div>
                    </div>
                    <div class='prio'>
                        <img src='./assets/img/low.png'>
                    </div>
                </div>
            </div>
        </div>`;
}


/**
 * this function set the backgroundcolor of the catogory in the done task card.
 */
function setCategoryBackgroundColorForWorkStatus3() {
    for (let i = 0; i < workStatus3Array.length; i++) {
        let cardCatColor = workStatus3Array[i]['cardCatColor'];
        let catBackground = categoryBackgroundColors[cardCatColor];
        document.getElementById(`doneCard${i}`).style = `background-color: ${catBackground};`;
    }
}


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
    joinTaskArray[currentDraggedElement]['workFlowStatus'] = area;
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
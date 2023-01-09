let workStatusArray = [];
let workStatus0Array = [];
let workStatus1Array = [];
let workStatus2Array = [];
let workStatus3Array = [];
let boardEditedPrio = '';
let currentDraggedElement;
let showContributorsPrioIcons = { M: './assets/img/medium.png', U: './assets/img/urgent.png', L: './assets/img/low.png' };
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


/**
 * The function initBoard() is an async function that calls the async functions includeHTML(),
 * renderBoard(), loadTask(), and createWorkStatusArrays(), and then calls the function
 * renderAllCards().
 */
async function initBoard() {
    setURL('https://gruppe-407.developerakademie.net/smallest_backend_ever');
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
 * For each element in the joinTaskArray, if the element's workFlowStatus is equal to the index, then
 * createWorkStatusArrayData(index, i)
 */
async function createWorkStatusArrays() {
    resetWorkStatusArrays();
    for (let index = 0; index < 4; index++) {
        for (let i = 0; i < joinTaskArray.length; i++) {
            let taskWorkStatus = joinTaskArray[i]['workFlowStatus'];
            if (taskWorkStatus == index) {
                createWorkStatusArrayData(index, i)
            }
        }
    }
}


/**
 * It takes the data from the joinTaskArray and creates a new array called workStatusArray.
 * @param index - the index of the array that the json will be pushed to
 * @param taskIndex - the index of the task in the joinTaskArray
 */
function createWorkStatusArrayData(index, taskIndex){
    let cardTitle = joinTaskArray[taskIndex]['title'];
    let cardDescription = joinTaskArray[taskIndex]['descripten'];
    let cardCatColor = joinTaskArray[taskIndex]['catColor'];
    let cardCategory = joinTaskArray[taskIndex]['category'];
    let cardPrio = joinTaskArray[taskIndex]['prio'];
    let subTasks = joinTaskArray[taskIndex]['subTasks'];
    let assignedToList = joinTaskArray[taskIndex]['assignedTo'];
    let wJson = createWorkStatusJson(cardTitle, cardDescription, cardCatColor, cardCategory, cardPrio, subTasks, taskIndex, assignedToList);
    workStatusArray[index].push(wJson);
}


/**
 * It takes in a bunch of parameters and returns a JSON object.
 * @param cardTitle - The title of the card.
 * @param cardDescription - The description of the card.
 * @param cardCatColor - The color of the category of the card.
 * @param cardCategory - The category of the card (e.g. 'Bug', 'Feature', 'Task', etc.)
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
 * It loops through an array of objects, and for each object, it adds a card to the DOM.
 */
async function renderToDoCards() {
    document.getElementById('toDoDiv').innerHTML = '';
    for (let i = 0; i < workStatus0Array.length; i++) {
        document.getElementById('toDoDiv').innerHTML += toDoCardHtml(i);
        let taskIndex = workStatus0Array[i]['taskIndex'];
        showContributorsPrioIcon(taskIndex);
    }
    setCategoryBackgroundColorForWorkStatus0();
}


/**
 * For each array in the workStatusArray, for each object in the array, get the taskIndex property of
 * the object and pass it to the renderAssignToHtml function.
 */
function renderAssignTo() {
    for (let i = 0; i < workStatusArray.length; i++) {
        for (let index = 0; index < workStatusArray[i].length; index++) {
            let taskIndex = workStatusArray[i][index]['taskIndex'];
            renderAssignToHtml(taskIndex);
        }
    }
}











/**
 * The function determindSubTasksDone() takes two arguments, the first is the index of the
 * workStatusArray[workStatusArrayNo] array, the second is the index of the workStatusArray array. The
 * function returns the amount of subTasks that are done.
 * @param arrayIndex - the index of the task in the array
 * @param workStatusArrayNo - the index of the workStatusArray that you want to check.
 * @returns The amount of subTasks that are done.
 */
function determindSubTasksDone(arrayIndex, workStatusArrayNo) {
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
 * When the user scrolls down the page, the height of the drop areas will increase to match the height
 * of the page.
 */
function changeHeightDropArea() {
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


/**
 * It takes the priority of a task and displays the corresponding icon.
 * @param taskIndex - The index of the task in the array.
 */
function showContributorsPrioIcon(taskIndex) {
    for (let a in showContributorsPrioIcons) {
        let prio = joinTaskArray[taskIndex].prio[0];
        if (a = prio) {
            document.getElementById(`contributorsPrioIcon${taskIndex}`).src = `${showContributorsPrioIcons[a]}`;
            break;
        }
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
function enablePopupWindow() {
    document.getElementById('boardPopup').classList.remove('d-none');
}


/**
 * this function add the d-none class to the popup window. The result is that the Popup Window not shown.
 */
function disablePopupWindow() {
    document.getElementById('boardPopup').classList.add('d-none');
    renderAllCards();
}


/**
 * this function prevent the closure of the popup window when clicking on the Popup Task Card.
 */
function stopClose(event) {
    event.stopPropagation();
}


// basic function popup end


// render function for the detail view of the task card.

/**
 * this function render the HTML code for the detail view of a taskcard.
 * @param {number} taskIndex - this value is equal to the index position in the main array 'joinTaskArray'.
 */
function renderPopupTaskCard(taskIndex) {
    let cardTitle = joinTaskArray[taskIndex]['title'];
    let cardDescription = joinTaskArray[taskIndex]['descripten'];
    let cardCategory = joinTaskArray[taskIndex]['category'];
    let cardDueDate = joinTaskArray[taskIndex]['dueDate'];
    let taskPrio = joinTaskArray[taskIndex]['prio'];
    document.getElementById('boardPopup').innerHTML = '';
    document.getElementById('boardPopup').innerHTML = /*html*/`
        <div class='boardTaskCardPopup' onclick='stopClose(event)'>
            <div class='taskCardPopupCategory' id='taskCardPopupCategory'>
                <span>${cardCategory}</span>
            </div>
            <div class='taskCardPopupTask'>
                <span>${cardTitle}</span>
            </div>
            <span class='taskCardPopupDescription'>${cardDescription}</span>
            <div class='taskCardPopupDateContainer'>
                <span class='taskCardPopupDateText'>Due date:</span>
                <span class='taskCardPopupDueDate'>${cardDueDate}</span>
            </div>
            <div class='taskCardPopupPriorityContainer'>
                <!-- classes down must be changed later ! -->
            <span>Priority:</span>
            <div class='urgency' id='prioContainer'>
                <span>${taskPrio}</span>
                <img src='./assets/img/urgent_white.png' id='cardPrioImg'>
            </div>
        </div>

        <span class='assigned'>Assigned To:</span>
        <img class='close_logo' src='./assets/img/close_logo.png' onclick='disablePopupWindow()'>
        <div class='editButton' onclick='openEditTaskCard(${taskIndex})'>
            <img src='./assets/img/edit_button.png'>
        </div>
    
        <div class='members' id='members'>
            
        </div>
        
        <div class='boardSubtasksTitleDiv'>
            <span class='boardSubtaskTitle'>Subtasks:</span>
                
        </div >
        <div class='boardSubtasksDiv' id='subtaskListTaskCard'>
            
        </div>`;

    setTaskCardPopupCatColor(taskIndex);
    setTaskCardPopupPrioBackground(taskIndex);
    renderSubtask(taskIndex);
    renderAssignToHtml2(taskIndex);
}





/**
 * If the length of the assignedList is greater than 0, then return true. Otherwise, return false.
 * @param assignedList - [{id: 1, name: 'John'}, {id: 2, name: 'Jane'}]
 * @returns true if the assignedList length is greater than 0.
 */
function assignedToDataExists(assignedList){
    return assignedList.length > 0;
}


/**
 * Render the subtask HTML for the given task index, then set the subtask status for the given task
 * index.
 * @param taskIndex - The index of the task in the task array.
 */
async function renderSubtask(taskIndex) {
    await renderSubtaskHtml(taskIndex);
    setSubTaskStatus(taskIndex);
}






/**
 * If the length of the array is greater than 0, then the array has at least one element.
 * @param subtaskArray - an array of subtasks
 * @returns true if the subtaskArray length is greater than 0.
 */
function subtaskExist(subtaskArray){
    return subtaskArray.length > 0;
}


/**
 * If the subtaskStatus is true, then check the checkbox.
 * @param taskIndex - the index of the task in the joinTaskArray
 */
function setSubTaskStatus(taskIndex) {
    let subtaskArray = joinTaskArray[taskIndex]['subTasks'];
    for (let i = 0; i < subtaskArray.length; i++) {
        if (subtaskStatusIsTrue(i, subtaskArray)) {
            document.getElementById(`subtask${i}`).checked = true;
        }
    }
}


/**
 * If the subtaskStatus property of the subtask object at the given index is true, return true,
 * otherwise return false.
 * @param subtaskIndex - The index of the subtask in the subtask array.
 * @param subtaskArray - The array of subtasks
 * @returns the value of the subtaskStatus property of the object at the index of subtaskIndex in the
 * array subtaskArray.
 */
function subtaskStatusIsTrue(subtaskIndex, subtaskArray){
    return subtaskArray[subtaskIndex]['subtaskStatus'];
}


/**
 * It's a function that takes two parameters, one is the index of the subtask and the other is the
 * index of the task. It then gets the status of the checkbox and sets the status of the subtask in the
 * array to the status of the checkbox.
 * @param subTaskIndex - the index of the subtask in the subtask array
 * @param taskIndex - The index of the task in the array.
 */
async function checkboxSubtaskSelected(subTaskIndex, taskIndex) {
    let checkboxStatus = document.getElementById(`subtask${subTaskIndex}`).checked;
    joinTaskArray[taskIndex]['subTasks'][subTaskIndex]['subtaskStatus'] = checkboxStatus;
    joinTaskArray[taskIndex]['subTasks'][subTaskIndex]['subtaskStatus'] = checkboxStatus;
    await saveTask();
}


/**
 * this function set the category background-color of the category.
 * @param {number} taskIndex -this value is equal to the index number of the main array 'joinTaskArray', where
 * the task card information is stored.
 */
function setTaskCardPopupCatColor(taskIndex) {
    let cardCatColorIndex = joinTaskArray[taskIndex]['catColor'];
    let cardCatColor = categoryBackgroundColors[cardCatColorIndex];
    document.getElementById('taskCardPopupCategory').style = `background-color: ${cardCatColor};`;
}


/**
 * This function sets the background color of the prio button and transfers the url of the image associated with the prio button.
 * @param {*} taskIndex --this value is equal to the index number of the main array 'joinTaskArray', where
 * the task card information is stored.
 */
function setTaskCardPopupPrioBackground(taskIndex) {
    let cardPrio = joinTaskArray[taskIndex]['prio'];
    cardPrio = cardPrio.toLowerCase();
    let cardPrioBackground = prioColorAndUrlArray[0][cardPrio][0];
    let cardPrioImgSrc = prioColorAndUrlArray[0][cardPrio][1];
    document.getElementById('prioContainer').style = `background-color: ${cardPrioBackground};`;
    document.getElementById('cardPrioImg').src = cardPrioImgSrc;
}


// Edit Taskcard popup


/**
 * It opens a modal window with a form to edit a task.
 * @param taskIndex - the index of the task in the array of tasks
 */
async function openEditTaskCard(taskIndex) {
    resetAssignToList();
    await renderEditTaskCardHtml(taskIndex);
    showDeleteButton(taskIndex);
    renderEditTaskCardInputFields(taskIndex);
    await renderContactsInAssignDropDownMenu();
    renderEditTaskCardInputFields(taskIndex);
    boardEditTaskCardAssignPreseselction(taskIndex);
    setPrioPreselection(taskIndex);
}




/**
 * It takes the index of the task in the array and then renders the input fields with the values of the
 * task.
 * </code>
 * @param taskIndex - the index of the task in the array
 */
function renderEditTaskCardInputFields(taskIndex) {
    let cardTitle = joinTaskArray[taskIndex]['title'];
    let cardDescription = joinTaskArray[taskIndex]['descripten'];
    let cardDueDate = joinTaskArray[taskIndex]['dueDate'];
    let taskPrio = joinTaskArray[taskIndex]['prio'];
    let prioArray = { 'Urgent': 0, 'Medium': 1, 'Low': 2 };
    let taskPrioNumber = prioArray[taskPrio];
    addPrio(taskPrioNumber);
    document.getElementById('boardEditTitle').value = cardTitle;
    document.getElementById('boardEditDecription').value = cardDescription;
    document.getElementById('boardEditDueDate').value = cardDueDate;
}


/**
 * It takes an array of objects, and compares the email property of each object in the array to the
 * email property of each object in another array. If the email properties match, it adds the object
 * from the second array to a third array.
 * 
 * I'm trying to figure out how to do this with a forEach loop. I've tried a few different things, but
 * I can't seem to get it to work.
 * 
 * Here's what I've tried:
 * @param taskIndex - the index of the task in the joinTaskArray
 */
function boardEditTaskCardAssignPreseselction(taskIndex) {
    let assignToArray = joinTaskArray[taskIndex]['assignedTo'];
    for (let i = 0; i < assignToArray.length; i++) {
        let refEmail = assignToArray[i]['email'];
        for (let index = 0; index < coworkersToAssignTo.length; index++) {
            let email = coworkersToAssignTo[index]['email'];
            if (refEmail == email) {
                addContactToTaskForceWithCheckBox(index);
            }
        }
    }
}


/**
 * It takes a taskIndex as an argument, and then sets the preselected priority of the task to the
 * priority of the task at the given taskIndex.
 * @param taskIndex - The index of the task in the array.
 */
function setPrioPreselection(taskIndex) {
    let preselectedPrio = joinTaskArray[taskIndex]['prio'];
    let boardPrioStatusJson = { 'Urgent': 0, 'Medium': 1, 'Low': 2 };
    addPrio(boardPrioStatusJson[preselectedPrio]);
    boardEditedPrio = preselectedPrio;
}


/**
 * This function resets the check property of each object in the coworkersToAssignTo array to false,
 * and then empties the assignToArray and taskForce arrays.
 */
function resetAssignToList() {
    for (let i = 0; i < coworkersToAssignTo.length; i++) {
        coworkersToAssignTo[i]['check'] = false;
        assignToArray = [];
        taskForce = [];
    }
}



/**
 * It takes the values from the input fields and saves them to the array.
 * </code>
 * @param taskIndex - the index of the task in the array
 */
function getTaskChanges(taskIndex) {
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


/**
 * If the user clicks on a priority button, the function will check if the button is already selected.
 * If it is, it will deselect it. If it isn't, it will select it
 * @param index - the index of the status in the statusNames array
 */
function prioStatusChange(index) {
    let statusNames = ['Urgent', 'Medium', 'Low'];
    if (actualClickedPrioBtnIsSet(index, statusNames)) {
        boardEditedPrio = '';
    } else {
        boardEditedPrio = statusNames[index];
    }
}


/**
 * If the index of the clicked button is the same as the index of the edited priority, then return
 * true, else return false.
 * @param index - the index of the button in the array of buttons
 * @param statusNames - an array of strings, each string is a status name
 * @returns the value of the expression:
 * statusNames[index] == boardEditedPrio
 */
function actualClickedPrioBtnIsSet(index, statusNames){
    return statusNames[index] == boardEditedPrio;
}



// render function for the detail view of the task card end.


// render function for the creation of a new task card.


/**
 * Show the add task popup window by enabling the popup window, rendering the add task popup, loading
 * the existing categories, rendering the category list, setting the new category input to inactive,
 * and rendering the contacts in the assign drop down menu.
 */
async function showAddTaskPopupWindow() {
    enablePopupWindow();
    await renderAddTaskPopup();
    loadExitingCategories();
    renderCategoryList();
    newCatInputActive = false;
    renderContactsInAssignDropDownMenu();
}


/**
 * this function render the popup menu AddTask.
 */
async function renderAddTaskPopup() {
    document.getElementById('boardPopup').innerHTML = '';
    document.getElementById('boardPopup').innerHTML = renderAddTaskPopupHtml();
}


/**
 * If the workFlowStatus of the task is 3, then remove the class 'd-none' from the delete button.
 * @param taskIndex - the index of the task in the array
 */
function showDeleteButton(taskIndex) {
    if (joinTaskArray[taskIndex].workFlowStatus == 3) {
        document.getElementById('deleteButton').classList.remove('d-none');
    }
}


/**
 * The function deleteButton() takes the taskIndex as a parameter and removes the task from the
 * joinTaskArray at the taskIndex position. Then it saves the task and initializes the board.
 * @param taskIndex - The index of the task in the array.
 */
function deleteButton(taskIndex){
    joinTaskArray.splice(taskIndex, 1);
    saveTask();
    initBoard();
}
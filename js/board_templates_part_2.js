/**
 * It takes the index of a task in the joinTaskArray and renders the assignedTo property of that task
 * as HTML.
 * @param taskIndex - the index of the task in the joinTaskArray
 */
function renderAssignToHtml2(taskIndex) {
    let assignedList = joinTaskArray[taskIndex]['assignedTo'];
    let divId = 'members';
    document.getElementById(divId).innerHTML = '';
    if (assignedToDataExists(assignedList)) {
        for (let i = 0; i < assignedList.length; i++) {
            let firstName = assignedList[i]['firstName'];
            let lastName = assignedList[i]['lastName'];
            let nameLetters = firstName[0] + lastName[0];
            chooseColorForTaskForceBadge(firstName[0], lastName[0]);
            let assignToColor = backgroundColorForBadges[badgesIndex];
            let assignToTitle = firstName + ' ' + lastName;
            document.getElementById(divId).innerHTML += /*html*/`
                <div  title='${assignToTitle}' style='background-color: ${assignToColor}'>
                    <span class='shortcut'>${nameLetters}</span>
                </div>`;
        }
    }
}


/**
 * this function render the HTML code for the subTasks in the board detail view taskcard.
 * @param {*} taskIndex - this value is equal to the index position in the main array 'joinTaskArray'.
 */
async function renderSubtaskHtml(taskIndex) {
    document.getElementById('subtaskListTaskCard').innerHTML = '';
    let subtaskArray = joinTaskArray[taskIndex]['subTasks'];
    if (subtaskExist(subtaskArray)) {
        for (let i = 0; i < subtaskArray.length; i++) {
            let subtaskText = subtaskArray[i]['subtaskText'];
            document.getElementById('subtaskListTaskCard').innerHTML += /*html*/`
                <div>
                    <input type='checkbox' id='subtask${i}' onclick='checkboxSubtaskSelected(${i}, ${taskIndex})'>
                    <span>${subtaskText}</span>
                </div>`;
        }
    }
}


/**
 * It renders a popup window with a form to edit a task.
 * @param taskIndex - the index of the task in the array of tasks
 */
async function renderEditTaskCardHtml(taskIndex) {
    document.getElementById('boardPopup').innerHTML = '';
    document.getElementById('boardPopup').innerHTML = /*html*/`
        <div class='boardTaskCardPopup' onclick='stopClose(event)'>
            <img class='close_logo' src='./assets/img/close_logo.png' onclick='disablePopupWindow()'>
            <div class='boardEditTitleContainer'>
                <span>Title</span>
                <input type='text' placeholder='Enter a title' id='boardEditTitle'>
            </div>
            <div class='boardEditDescriptionContainer'>
                <span>Descripten</span>
                <textarea name='Description'  cols='30' rows='10' placeholder='Enter Descriptiom' id='boardEditDecription'></textarea>
            </div>
            <div class='boardEditDateContainer'>
                <span>Due Date</span>
                <input type='date' id='boardEditDueDate'>
            </div>

            <div class='editTaskCardPrio'>
                <h3>Prio</h3>
                <div class='editTaskCardPrioBtn'>
                    <div class='addTaskUrgent' id='addTaskUrgent' onclick='addPrio(0); prioStatusChange(0)'>
                        <span id='addTaskUrgentSpan'>Urgent</span>
                        <img id='addTaskUrgentImg' src='../assets/img/urgent_arrows.png'>
                    </div>
                    <div class='addTaskMedium' id='addTaskMedium' onclick='addPrio(1); prioStatusChange(1)'>
                        <span id='addTaskMediumSpan'>Medium</span>
                        <img id='addTaskMediumImg' src='../assets/img/prio_medium.png'>
                    </div>
                    <div class='addTaskLow' id='addTaskLow' onclick='addPrio(2); prioStatusChange(2)'>
                        <span id='addTaskLowSpan'>Low</span>
                        <img id='addTaskLowImg' src='../assets/img/prio_low.png'>
                    </div>
                </div>
            </div>

            <div class='addTaskAssignedBox boardAddTaskAssignedBox' id='addTaskAssignedBox'>
			        <h3>Assigned to</h3>
			        <button id='addTaskAssignedButton' onclick='enableDisableAssignList()'>
                    <input
                            disabled
                            onclick='doNotCloseOnClick(event)'
                            id='selectedAssign'
                            name='selectedAssign'
                            class='inputselectedAssign'
                            placeholder='Select contacts to assign'
                            autocomplete='off'
                        />
				
                    <div
                    id='assignToCancelConfirmImgContainer'
                    class='assignToCancelConfirmImgContainer d-none'
                    >
                        <img
                        onclick='assignBoxBackToDefaultMode(), enableAssignList()'
                        class='assignToCancelIcon'
                        src='assets/img/cancel-black.png'
                        alt='cancel'
                        />
                        <img class='assignToDeviderIcon' src='assets/img/bnt_divider.png' />
                        <img
                        onclick='frontEndDeveloper()'
                        class='assignToCheckIcon'
                        src='assets/img/akar-icons_check.png'
                        alt='confirm'
                        />
                    </div>
                    <img id='assignDropDownImg' src='assets/img/Vector 2.png' class='dropdownImg' />
                    </button>
                    <span id='assignReq'>This field is required</span>
                    <div id='badgesTaskForce' class='badgesTaskForce'></div>
                    <ul class='addTaskAssignList listD-none' id='dropdown2'>

                    <li onclick='assigendContactEmail()' class='inviteNewContacts'>
                        Invite new contacts<img
                            class='assignInviteNewContactImage'
                            src='assets/img/assigned_inviteNewContact.png'
                            alt=''
                        />
                    </li>
                    <li>
                    You
                    <div  class='assignCheckboxContainer'>
                        <img class='checkBox' src='assets/img/check_box.png' alt='checkbox' />
                        <img class='checkMark' src='assets/img/check_mark.png' />
                    </div>
                </div>

            <button class='editTaskOkBtn' onclick='getTaskChanges(${taskIndex})'>Ok <img src='../assets/img/akar-icons_check_white.png' ></button>
            <!-- Delete Button edited by Bossi  -->
            <button class='deleteButton d-none' id='deleteButton' onclick='deleteButton(${taskIndex})'> <!--edit by Basti-->
                Delete <img src='../assets/img/akar-icons_check_white.png' >
            </button>
        </div>`;
}


/**
 * this function returns the popup Menu html string
 * @returns - Board popup Menu html string.
 */
function renderAddTaskPopupHtml() {
    return /*html*/`
        <div id='boardAddTaskPopup' onclick='stopClose(event)'>
            <img class='close_logo_edit_task' src='./assets/img/close_logo.png' onclick='disablePopupWindow()'>
            <div class='boardAddTaskHeadlineDiv'>
                <h2 class='addTHeadline'>Add Task</h2>
            </div>
            <div class='boardAddTaskBtnOuterContainer'>
                <div class='boardAddTaskBtnInnerContainer'>
                    <button class='addTaskClear' onmouseover='addTaskClearOn()' onmouseout='addTaskClearOff()' onclick='clearFormularData()'>
                        <span>Clear</span> 
                        <img id='addTaskClear' src='./assets/img/clearb.png'>
                    </button>
                    <button class='addTaskCreate' onclick='checkInputs()'>
                        <span>Create Task</span>
                        <img src='./assets/img/createb.png'>  
                    </button>
                </div>
            </div>
            <div class='boardAddTaskAddTitleContainer'>
                <div class='addTaskAddTitleBox'>
                    <h3>Title</h3>
                    <form onsubmit='goToDescripten(); return false' >
                        <input  required type='text' placeholder='Enter a title' id='addTaskTitle' autocomplete='off' minlength='3'>
                    </form>
                    <span class='requiredText' id='titleReq'>This field is required</span>
                </div>

                <div class='addTaskAddDescriptenBox'>
                    <h3>Descripten</h3>
                    <!-- <form onblur='goToCategorySelection(); return false' id='formDesc' action='action.asp'> -->
                    <textarea form='formDesc' type='text' placeholder='Enter Descripten' id='addTaskDescripten'  required minlength='5'></textarea>
                    <!-- </form> -->
                    <span class='requiredText' id='descReq'>This field is required</span>
                </div>

                <div class='addTaskAddCategoryBox'>
                    <h3>Category</h3>
                    <button onclick=enableDisableCatList() id='selectedCat'>
                        <input disabled id='selectedCatInput' placeholder='Select task category' autocomplete='off'>
                        <span id='sColor'></span>
                        <div class='newCategoryImgDiv d-none' id='addTaskNewCatBtn'>
                            <img src='../assets/img/new_cat_cancel.png'>
                            <img src='../assets/img/bnt_divider.png' class='btnDivider'>
                            <img src='../assets/img/akar-icons_check.png'>
                        </div>
                        <img src='../assets/img/Vector 2.png' class='dropdownImg' id='dropdownImg'>
                    </button>
                    <span class='listD-none requiredText' id='catReq'>This field is required</span>
                    <ul class='addTaskCatList listD-none' id='CatListDropdown'>
                        
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

                <div class='addTaskAssignedBox' id='addTaskAssignedBox'>
			        <h3>Assigned to</h3>
			        <button id='addTaskAssignedButton' onclick='enableDisableAssignList()'>
                    <input
                            disabled
                            onclick='doNotCloseOnClick(event)'
                            id='selectedAssign'
                            name='selectedAssign'
                            class='inputselectedAssign'
                            placeholder='Select contacts to assign'
                            autocomplete='off'
                        />
				
                    <div
                    id='assignToCancelConfirmImgContainer'
                    class='assignToCancelConfirmImgContainer d-none'
                    >
                        <img
                        onclick='assignBoxBackToDefaultMode(), enableAssignList()'
                        class='assignToCancelIcon'
                        src='assets/img/cancel-black.png'
                        alt='cancel'
                        />
                        <img class='assignToDeviderIcon' src='assets/img/bnt_divider.png' />
                        <img
                        onclick='frontEndDeveloper()'
                        class='assignToCheckIcon'
                        src='assets/img/akar-icons_check.png'
                        alt='confirm'
                        />
                    </div>
                    <img id='assignDropDownImg' src='assets/img/Vector 2.png' class='dropdownImg' />
                    </button>
                    <span id='assignReq'>This field is required</span>
                    <div id='badgesTaskForce' class='badgesTaskForce'></div>
                    <ul class='addTaskAssignList listD-none' id='dropdown2'>

                    <li onclick='assigendContactEmail()' class='inviteNewContacts'>
                        Invite new contacts<img
                            class='assignInviteNewContactImage'
                            src='assets/img/assigned_inviteNewContact.png'
                            alt=''
                        />
                    </li>
                    <li>
                    You
                    <div  class='assignCheckboxContainer'>
                        <img class='checkBox' src='assets/img/check_box.png' alt='checkbox' />
                        <img class='checkMark' src='assets/img/check_mark.png' />
                    </div>
                </div>


            <div class='boardAddTaskDividerBoard'>

            </div>

            <div class='boardAddTaskRightContainer alignToBoard'>
                <div class='addTaskDate'>
                    <h3>Due date</h3>
                    <input required type='date' id='dueDate'>
                    <span class='requiredText' id='dateReq'>This field is required</span>
                </div>
                <div class='addTaskPrio'>
                    <h3>Prio</h3>
                    <div class='addTaskPrioIcons'>
                        <div class='addTaskUrgent' id='addTaskUrgent' onclick='addPrio(0)'>
                            <span id='addTaskUrgentSpan'>Urgent</span>
                            <img id='addTaskUrgentImg' src='../assets/img/urgent_arrows.png'>
                        </div>
                        <div class='addTaskMedium' id='addTaskMedium' onclick='addPrio(1)'>
                            <span id='addTaskMediumSpan'>Medium</span>
                            <img id='addTaskMediumImg' src='../assets/img/prio_medium.png'>
                        </div>
                        <div class='addTaskLow' id='addTaskLow' onclick='addPrio(2)'>
                            <span id='addTaskLowSpan'>Low</span>
                            <img id='addTaskLowImg' src='../assets/img/prio_low.png'>
                        </div>
                    </div>
                </div>
                <div class='subtask'>
                    <h3>Subtask</h3>
                    <div class='inputDiv'>
                        <form onsubmit='addSubtask(); return false' >
                            <input type='text' placeholder='Add new subtask' id='subTask' autocomplete='off' onfocus='subTaskInputentered()' onblur='subTaskInputLeave()' minlength='3'>
                            <img src='../assets/img/add_cross.png' class='subtaskCross' id='subtaskCross' onclick='enterSubTaskInput()'>
                        </form>
                        <div class='subTaskImgDiv d-none' id='subTaskImgDiv' >
                            <img src='../assets/img/new_cat_cancel.png' onclick='resetSubtaskInput()'>
                            <img src='../assets/img/bnt_divider.png' class='btnDivider'>
                            <img src='../assets/img/akar-icons_check.png' onclick='addSubtask()'>
                        </div>
                        
                    </div>
                    
                    <div class='addTaskCheckbox' id='subtaskCheckboxes'>
        
                    </div>
                </div>
            </div>
        </div>
        <!-- </form>  -->
        <div class='boardtaskAddedToBoard' id='taskCreatedIndication'>
            <div class='taskAddedToBoardContainer'>
                <span>Task added to board</span>
                <img src='./assets/img/img_board_w.png'>
            </div>
        </div>`;
}


/**
 * this function render the HTML code for the detail view of a taskcard.
 * @param {number} taskIndex - this value is equal to the index position in the main array 'joinTaskArray'.
 */
function renderPopupTaskCardHtml(taskIndex) {
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
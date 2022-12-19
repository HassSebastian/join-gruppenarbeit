let catListStatus = false;
let assignListStatus = false;
let categoryList = ['New Category', 'Category 2', 'Category 3']


async function initAddTask() {
    await includeHTML();
    selectedMenuButton(3);
    renderAddTask();
}


async function renderAddTask() {
    document.getElementById('content').innerHTML = '';
    document.getElementById('content').innerHTML += /*html*/ `
    <div class='addTaskHeadlineDiv'>
        <h2 class='addTHeadline'>Add Task</h2>
    </div>
    <div class='addTaskBtnOuterContainer'>
        <div class='addTaskBtnInnerContainer'>
            <button class='addTaskClear'>
                <span>Clear</span> 
                <img src="./assets/img/clearb.png">
            </button>
            <button class='addTaskCreate' onclick='createTaskData()'>
                <span>Create Task</span>
                <img src="./assets/img/createb.png">  
            </button>
        </div>
    </div>
    <form onsubmit='createTaskData(); return false'>
        <div class='addTaskAddTitleContainer'>
            
            <div class='addTaskAddTitleBox'>
                <h3>Title</h3>
                <input  required type="text" placeholder='Enter a title' id='addTaskTitle'>
                <span>This field is required</span>
            </div>

            <div class='addTaskAddDescriptenBox'>
                <h3>Descripten</h3>
                <textarea type="text" placeholder='Enter Descripten' id='addTaskDescripten'></textarea>
            </div>

            <div class='addTaskAddCategoryBox'>
                <h3>Category</h3>
                <button onclick=enableDisableCatList()><span id='selectedCat'>Select task category</span><img src="../assets/img/Vector 2.png" alt=""></button>
                <ul class="addTaskCatList listD-none" id="dropdown">
                    <li onclick='selectCategory(0)'>New category</li>
                    <li onclick='selectCategory(1)'>Category 2</li>
                    <li onclick='selectCategory(2)'>Category 3</li>
                </ul>
                <div class='addTaskAddCategoryColor listD-none' id='colorSelection'>
                    <div class='color1'></div>
                    <div class='color2'></div>
                    <div class='color3'></div>
                    <div class='color4'></div>
                    <div class='color5'></div>
                    <div class='color6'></div>
                </div>
            </div>

            <div class='addTaskAssignedBox' id='addTaskAssignedBox'>
                <h3>Assigned to</h3>
                <button onclick=enableDisableAssignList()><span id='selectedAssign'>Select contacts to Assign</span><img src="../assets/img/Vector 2.png" alt=""></button>
                <ul class="addTaskAssignList listD-none" id="dropdown2">
                    <li>New Assign</li>
                    <li>Assign 2</li>
                    <li>Assign 3</li>
                </ul>
            </div>
        </div>

        <div class='addTaskDivider'>

        </div>

        <div class='addTaskRightContainer'>
            <div class='addTaskDate'>
                <h3>Due date</h3>
                <input required type="date" id='dueDate'>
                <span>This field is required</span>
            </div>
            <div class='addTaskPrio'>
                <h3>Prio</h3>
                <div class='addTaskPrioIcons'>
                    <div class='addTaskUrgent'>
                        <span>Urgent</span>
                        <img src="../assets/img/urgent_arrows.png">
                    </div>
                    <div class='addTaskMedium'>
                        <span>Medium</span>
                        <img src="../assets/img/prio_medium.png">
                    </div>
                    <div class='addTaskLow'>
                        <span>Low</span>
                        <img src="../assets/img/prio_low.png">
                    </div>
                </div>
            </div>
            <div class='subtask'>
                <h3>Subtask</h3>
                <div>
                    <input type="text" placeholder='Add new subtask' id='subTask'>
                    <img src="../assets/img/add_cross.png">
                </div>
                <div class='addTaskCheckbox'>
                    <input type="checkbox">
                    <span>Subtask 1</span>
                </div>
                
            </div>
        </div>
    </form>
    <div class="taskAddedToBoard" id='test'>
        <div class="taskAddedToBoardContainer">
            <span>Task added to board</span>
            <img src="./assets/img/img_board_w.png">
        </div>
    </div>
    `;
}


function enableDisableCatList() {
    if (!catListStatus) {
        document.getElementById('dropdown').classList.remove('listD-none');
        document.getElementById('addTaskAssignedBox').classList.add('addMarginTop');
    } else {
        document.getElementById('dropdown').classList.add('listD-none');
        document.getElementById('addTaskAssignedBox').classList.remove('addMarginTop');
    }
    catListStatus = !catListStatus;
}


function selectCategory(catId) {
    document.getElementById('selectedCat').innerHTML = '';
    let newCat = categoryList[catId];
    if (catId == 0) {
        document.getElementById('selectedCat').innerHTML = /*html*/`
        <input type='text' placeholder='New Category Name'>`;
        enableDisableCatList();
        document.getElementById('colorSelection').classList.remove('listD-none')
    } else {
        document.getElementById('selectedCat').innerHTML = newCat;
        enableDisableCatList();
        document.getElementById('colorSelection').classList.add('listD-none');
    }
}


function enableDisableAssignList() {
    if (!assignListStatus) {
        document.getElementById('dropdown2').classList.remove('listD-none');
    } else {
        document.getElementById('dropdown2').classList.add('listD-none');
    }
    assignListStatus = !assignListStatus;
}


// save data to local storage !!!!!!!!!!!!

let joinTaskArray = [];
let taskData = {};
let title = '';
let descripten = '';
let category = '';
let assigndTo = '';
let dueDate = '';
let prio = '';
let subTask = '';


function createTaskData() {
    loadTask();
    getDataFromFomular();
    fillTaskData();
    pushTaskData();
    saveTask();
    clearFormularData();
    showAddDiv();
    setTimeout(initBoard, 1000 );
}

function getDataFromFomular() {
    title = document.getElementById('addTaskTitle').value;
    descripten = document.getElementById('addTaskDescripten').value;
    category = document.getElementById('selectedCat').innerHTML;
    assigndTo = 'not included jet';
    dueDate = document.getElementById('dueDate').value;
    prio = 'not included jet';
    subTask = document.getElementById('subTask').value;
}


function clearFormularData(){
    document.getElementById('addTaskTitle').value ='';
    descripten = document.getElementById('addTaskDescripten').value = '';
    document.getElementById('selectedCat').innerHTML = 'Select task category';
    document.getElementById('dueDate').value = '';
    subTask = document.getElementById('subTask').value = '';
}


function fillTaskData() {
    taskData = {
        'title': title,
        'descripten': descripten,
        'category': category,
        'assignedTo': assigndTo,
        'dueDate': dueDate,
        'prio': prio,
        'subCategory': subTask,
    };
}


function pushTaskData() {
    joinTaskArray.push(taskData);
}


function saveTask() {
    localStorage.setItem('joinTaskArray', JSON.stringify(joinTaskArray));
}


function loadTask() {
    if (localStorage.getItem('joinTaskArray')) {
        let joinTaskArrayString = localStorage.getItem('joinTaskArray');
        joinTaskArray = JSON.parse(joinTaskArrayString);
    }
}

function deleteJoinTaskArrayFromServer() {
    localStorage.removeItem('joinTaskArray');
}

// save data to local storage end!!!!!!!!!!!!

function showAddDiv(){
    document.getElementById('test').classList.add('test');
}

function notShowAddDiv(){
    document.getElementById('test').classList.remove('test');
}
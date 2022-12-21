let catListStatus = false;
let assignListStatus = false;
let newCatInputActive = false;
let categoryList = [];
let joinTaskArray = [];
let taskData = {};
let title = '';
let descripten = '';
let category = '';
let catColor = '';
let assigndTo = '';
let dueDate = '';
let prio = '';
let subTask = '';


async function initAddTask() {
    await includeHTML();
    selectedMenuButton(3);
    await renderAddTask();
    await loadExitingCategories();
    renderCategoryList();
    newCatInputActive = false;
}


async function renderAddTask() {
    document.getElementById('content').innerHTML = '';
    document.getElementById('content').innerHTML += /*html*/ `
    <div class='addTaskHeadlineDiv'>
        <h2 class='addTHeadline'>Add Task</h2>
    </div>
    <div class='addTaskBtnOuterContainer'>
        <div class='addTaskBtnInnerContainer'>
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
    
        <div class='addTaskAddTitleContainer'>
            
            <div class='addTaskAddTitleBox'>
                <h3>Title</h3>
                <input  required type="text" placeholder='Enter a title' id='addTaskTitle' autocomplete='off'>
                <span id='titleReq'>This field is required</span>
            </div>

            <div class='addTaskAddDescriptenBox'>
                <h3>Descripten</h3>
                <textarea type="text" placeholder='Enter Descripten' id='addTaskDescripten'></textarea>
            </div>

            <div class='addTaskAddCategoryBox'>
                <h3>Category</h3>
                <button onclick=enableDisableCatList() id='selectedCat'>
                    <input disabled id='selectedCatInput' placeholder='Select task category' autocomplete='off'>
                    <span id='sColor'></span>
                    <div class='newCategoryImgDiv d-none' id='addTaskNewCatBtn'>
                        <img src="../assets/img/new_cat_cancel.png">
                        <img src="../assets/img/akar-icons_check.png">
                    </div>
                    <img src="../assets/img/Vector 2.png" class='dropdownImg' id='dropdownImg'>
                </button>
                <span id='catReq' class='listD-none'>This field is required</span>
                <ul class="addTaskCatList listD-none" id="dropdown">
                    <!-- <li onclick='selectCategory(0)'>New category</li>
                    <li onclick='selectCategory(1)'>Category 2</li>
                    <li onclick='selectCategory(2)'>Category 3</li>
                    <li onclick='selectCategory(1)'>Category 2</li>
                    <li onclick='selectCategory(2)'>Category 3</li> -->
                </ul>
                <div class='addTaskAddCategoryColor listD-none' id='colorSelection'>
                    <div class='color0' onclick='addColorToCat(0)'></div>
                    <div class='color1' onclick='addColorToCat(1)'></div>
                    <div class='color2' onclick='addColorToCat(2)'></div>
                    <div class='color3' onclick='addColorToCat(3)'></div>
                    <div class='color4' onclick='addColorToCat(4)'></div>
                    <div class='color5' onclick='addColorToCat(5)'></div>
                </div>
            </div>

            <div class='addTaskAssignedBox' id='addTaskAssignedBox'>
                <h3>Assigned to</h3>
                <button onclick=enableDisableAssignList()><span id='selectedAssign'>Select contacts to Assign</span><img src="../assets/img/Vector 2.png" class='dropdownImg'></button>
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
                <span id='dateReq'>This field is required</span>
            </div>
            <div class='addTaskPrio'>
                <h3>Prio</h3>
                <div class='addTaskPrioIcons'>
                    <div class='addTaskUrgent' id='addTaskUrgent' onclick='addTaskUrgent()'>
                        <span id='addTaskUrgentSpan'>Urgent</span>
                        <img id='addTaskUrgentImg' src="../assets/img/urgent_arrows.png">
                    </div>
                    <div class='addTaskMedium' id='addTaskMedium' onclick='addTaskMedium()'>
                        <span id='addTaskMediumSpan'>Medium</span>
                        <img id='addTaskMediumImg' src="../assets/img/prio_medium.png">
                    </div>
                    <div class='addTaskLow' id='addTaskLow' onclick='addTaskLow()'>
                        <span id='addTaskLowSpan'>Low</span>
                        <img id='addTaskLowImg' src="../assets/img/prio_low.png">
                    </div>
                </div>
            </div>
            <div class='subtask'>
                <h3>Subtask</h3>
                <div>
                    <input type="text" placeholder='Add new subtask' id='subTask' autocomplete='off'>
                    <img src="../assets/img/add_cross.png">
                </div>
                <div class='addTaskCheckbox'>
                    <input type="checkbox">
                    <span>Subtask 1</span>
                </div>
                
            </div>
        </div>
    
    <div class="taskAddedToBoard" id='test'>
        <div class="taskAddedToBoardContainer">
            <span>Task added to board</span>
            <img src="./assets/img/img_board_w.png">
        </div>
    </div>
    `;
}


async function loadExitingCategories(){
    loadTask();
    categoryList = [{'category':'New Category', 'catColor':''}];
    for (let i = 0; i < joinTaskArray.length; i++) {
        let taskCategory = joinTaskArray[i]['category'];
        let categoryColor = joinTaskArray[i]['catColor'];
        categoryList.push({'category': taskCategory, 'catColor': categoryColor})
    }
}


function loadTask() {
    if (joinTaskArrayExistInStorage()) {
        let joinTaskArrayString = localStorage.getItem('joinTaskArray');
        joinTaskArray = JSON.parse(joinTaskArrayString);
    }
}


function joinTaskArrayExistInStorage(){
    return localStorage.getItem('joinTaskArray');
}


function enableDisableCatList() {
    if (categoryListAndNewCategoryInputNotActive()) {
        document.getElementById('dropdown').classList.remove('listD-none');
        document.getElementById('addTaskAssignedBox').classList.add('addMarginTop');
    } else {
        document.getElementById('dropdown').classList.add('listD-none');
        document.getElementById('addTaskAssignedBox').classList.remove('addMarginTop');
    }
    catListStatus = !catListStatus;
}


function categoryListAndNewCategoryInputNotActive(){
    return !catListStatus && !newCatInputActive;
}


function renderCategoryList(){
    document.getElementById('dropdown').innerHTML = '';
    for (let i = 0; i < categoryList.length; i++) {
        let categoryName = categoryList[i]['category'];
        let categoryColor = categoryList[i]['catColor'];
        if (categoryColorAvailable(categoryColor)){
            document.getElementById('dropdown').innerHTML += dropdownCategoryListHtml(categoryName, categoryColor, i);
        }else{
            document.getElementById('dropdown').innerHTML += dropdownCategoryListHtml1(categoryName, i);
        }
    }
}


function categoryColorAvailable(categoryColor){
    return categoryColor != '';
}


function dropdownCategoryListHtml(categoryName, categoryColor, i){
    return /*html*/`
        <li onclick='selectCategory(${i})'>
            ${categoryName}
            <div  class='color${categoryColor} addTaskColorDiv'></div>
        </li>`;
}


function dropdownCategoryListHtml1(categoryName, i){
    return /*html*/`
        <li onclick='selectCategory(${i})'>
            ${categoryName}
        </li>`;
}


function setNewCategoryToList(){
    let newSetCategory = document.getElementById('selectedCatInput').value;
    let newCatColor = catColor;
    let newCategoryItem = { 'category': newSetCategory, 'catColor': newCatColor};
    categoryList.push(newCategoryItem);
    let newCategoryIndex = categoryList.length - 1;
    renderCategoryList();
    selectCategory(+newCategoryIndex);
    catListStatus = false;
    newCatInputActive = false;
}


function resetCatSelection(){
    newCatInputActive = false;
    catListStatus = !catListStatus;
    document.getElementById('colorSelection').classList.add('listD-none');
    document.getElementById('selectedCat').innerHTML = resetCatSelectionHtml();
}


function resetCatSelectionHtml(){
    return /*html*/`
        <input disabled id='selectedCatInput' placeholder='Select task category' autocomplete='off'>
        <span id='sColor'></span>
        <div class='newCategoryImgDiv d-none' id='addTaskNewCatBtn'>
            <img src="../assets/img/new_cat_cancel.png">
            <img src="../assets/img/akar-icons_check.png">
        </div>
        <img src="../assets/img/Vector 2.png" class='dropdownImg' id='dropdownImg'>`;
}


function selectCategory(catId) {
    if (newCategoryCreationIsSelected(catId)) {
        setSettingsForNewCategoryInput();
    } else {
        setSettingsForExistingCategory(catId);
    }
}


function newCategoryCreationIsSelected(catId){
    return catId == 0;
}


function setSettingsForNewCategoryInput(){
    document.getElementById('selectedCat').innerHTML = newCategoryInputHtml();
    newCatInputActive = true;
    enableDisableCatList();
    document.getElementById('addTaskNewCatBtn').classList.remove('d-none');
    document.getElementById('dropdownImg').classList.add('d-none');
    document.getElementById('colorSelection').classList.remove('listD-none');
    document.getElementById('sColor').innerHTML = '';
}


function newCategoryInputHtml(){
    return /*html*/`
        <input id='selectedCatInput' placeholder='New Category' autocomplete='off'>
        <span id='sColor'></span>
        <div class='newCategoryImgDiv d-none' id='addTaskNewCatBtn'>
            <img src="../assets/img/new_cat_cancel.png" onclick='resetCatSelection()'>
            <img src="../assets/img/akar-icons_check.png" onclick='setNewCategoryToList()'>
        </div>
        <img src="../assets/img/Vector 2.png" class='dropdownImg' id='dropdownImg'>`;
}


function setSettingsForExistingCategory(catId){
    let newCat = categoryList[catId]['category'];
    let categoryColor = categoryList[catId]['catColor'];
    document.getElementById('selectedCat').innerHTML = existingCategoryHtml(newCat, categoryColor);
    catColor = categoryColor;
    enableDisableCatList();
    document.getElementById('dropdownImg').classList.remove('d-none');
    document.getElementById('colorSelection').classList.add('listD-none');
}


function existingCategoryHtml(newCat, categoryColor){
    return /*html*/`
        <p id='selectedCatInput'>${newCat}</p>
        <span id='sColor'><div class='color${categoryColor} addTaskColorDiv'></div></span>
        <img src="../assets/img/Vector 2.png" class='dropdownImg' id='dropdownImg'>`;
}


function addColorToCat(colorId) {
    document.getElementById('sColor').innerHTML = /*html*/`
        <div class='color${colorId} addTaskColorDiv'></div>`;
    catColor = colorId;
}


function showAddDiv() {
    document.getElementById('test').classList.add('test');
}


function notShowAddDiv() {
    document.getElementById('test').classList.remove('test');
}


function checkInputs() {
    getReqiredFieldValues();
    resetRequiredWarnings();
    if (requiredFieldAreNotValid()) {
        setRequiredTextWarnings();
    }
    else {
        createTaskData();
    }
}


function requiredFieldAreNotValid(){
    return title == '' || dueDate == '' || category == '';
}


function setRequiredTextWarnings(){
    if (title == '') {
        document.getElementById('titleReq').style = 'opacity: 1;';
    }
    if (dueDate == '') {
        document.getElementById('dateReq').style = 'opacity: 1;';
    }
    if (category == '') {
        document.getElementById('catReq').style = 'opacity: 1;';
        document.getElementById('catReq').classList.remove('listD-none');
    }
}


function getReqiredFieldValues(){
    title = document.getElementById('addTaskTitle').value;
    title = title.trim();
    dueDate = document.getElementById('dueDate').value;
    dueDate = dueDate.trim();
    if (newCatInputActive){
        category = document.getElementById('selectedCatInput').value;
    }else{
        category = document.getElementById('selectedCatInput').innerHTML;
    }
    category = category.trim();
}


function resetRequiredWarnings(){
    document.getElementById('titleReq').style = 'opacity: 0;';
    document.getElementById('dateReq').style = 'opacity: 0;';
    document.getElementById('catReq').style = 'opacity: 0;';
}


// save data to local storage/server!
function createTaskData() {
    loadTask();
    getDataFromFomular();
    fillTaskData();
    pushTaskData();
    saveTask();
    showAddDiv();
    setTimeout(initBoard, 1200);
}

function getDataFromFomular() {
    descripten = document.getElementById('addTaskDescripten').value;
    assigndTo = 'not included jet';
    subTask = document.getElementById('subTask').value;
}


// ToDo must be reworked do to changes in Category
function clearFormularData() {
    document.getElementById('addTaskTitle').value = '';
    descripten = document.getElementById('addTaskDescripten').value = '';
    document.getElementById('selectedCat').innerHTML = /*html*/`
        <input  placeholder='Select task category' autocomplete='off'>
        <span id='sColor'></span>
        <img src="../assets/img/Vector 2.png" class='dropdownImg'>`;
    document.getElementById('dueDate').value = '';
    subTask = document.getElementById('subTask').value = '';
    document.getElementById('titleReq').style = 'opacity: 0;';
    document.getElementById('dateReq').style = 'opacity: 0;';
    document.getElementById('catReq').style = 'opacity: 0;';
    document.getElementById('catReq').classList.add('listD-none');
}


function fillTaskData() {
    taskData = {
        'title': title,
        'descripten': descripten,
        'category': category,
        'catColor': catColor,
        'assignedTo': assigndTo,
        'dueDate': dueDate,
        'prio': prio,
        'subCategory': subTask,
    };
    catColor = '';
}


function pushTaskData() {
    joinTaskArray.push(taskData);
}


function saveTask() {
    localStorage.setItem('joinTaskArray', JSON.stringify(joinTaskArray));
}


// deleteJoinTaskArrayFromServer() is not used in this code, it is only to remove the Array from Server!!!!!!!!!!!
function deleteJoinTaskArrayFromServer() {
    localStorage.removeItem('joinTaskArray');
}
// save data to local storage/server end!


/******************************************************************************** */
function addTaskClearOn() {
    document.getElementById('addTaskClear').src = "././assets/img/close_logo_blue.png";
}


function addTaskClearOff() {
    document.getElementById('addTaskClear').src = "./assets/img/close_logo.png";
}


/*********************************************************************************/
/*********************************************************************************/
function addTaskUrgent() {
    const element = document.querySelector('#addTaskUrgent');
    if (element.classList.contains('urgent-color')) {
        addTaskUrgentRemove();
    } else {
        document.getElementById('addTaskUrgent').classList.add('urgent-color');
        document.getElementById('addTaskUrgentSpan').classList.add('color-white');
        document.getElementById('addTaskUrgentImg').src = "./assets/img/urgent_white.png";
        addTaskMediumRemove();
        addTaskLowRemove();
        prio = 'urgent';
    }
}




function addTaskMedium() {
    const element = document.querySelector('#addTaskMedium');
    if (element.classList.contains('medium-color')) {
        addTaskMediumRemove();
    } else {
        document.getElementById('addTaskMedium').classList.add('medium-color');
        document.getElementById('addTaskMediumSpan').classList.add('color-white');
        document.getElementById('addTaskMediumImg').src = "./assets/img/medium_white.png";
        addTaskUrgentRemove();
        addTaskLowRemove();
        prio = 'medium';
    }
}


function addTaskLow() {
    const element = document.querySelector('#addTaskLow');
    if (element.classList.contains('low-color')) {
        addTaskLowRemove();
    } else {
        document.getElementById('addTaskLow').classList.add('low-color');
        document.getElementById('addTaskLowSpan').classList.add('color-white');
        document.getElementById('addTaskLowImg').src = "./assets/img/low_white.png";
        addTaskUrgentRemove();
        addTaskMediumRemove();
        prio = 'low';
    }
}


function addTaskUrgentRemove() {
    document.getElementById('addTaskUrgent').classList.remove('urgent-color');
    document.getElementById('addTaskUrgentSpan').classList.remove('color-white');
    document.getElementById('addTaskUrgentImg').src = "./assets/img/urgent.png";
}




function addTaskMediumRemove() {
    document.getElementById('addTaskMedium').classList.remove('medium-color');
    document.getElementById('addTaskMediumSpan').classList.remove('color-white');
    document.getElementById('addTaskMediumImg').src = "./assets/img/medium.png";
}


function addTaskLowRemove() {
    document.getElementById('addTaskLow').classList.remove('low-color');
    document.getElementById('addTaskLowSpan').classList.remove('color-white');
    document.getElementById('addTaskLowImg').src = "./assets/img/low.png";
}
/*********************************************************************************/
/*********************************************************************************/


function enableDisableAssignList() {
    if (!assignListStatus) {
        document.getElementById('dropdown2').classList.remove('listD-none');
    } else {
        document.getElementById('dropdown2').classList.add('listD-none');
    }
    assignListStatus = !assignListStatus;
}








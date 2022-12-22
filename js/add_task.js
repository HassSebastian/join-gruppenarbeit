let catListStatus = false;
let assignListStatus = false;
let newCatInputActive = false;
let addTaskCategoryList = [];
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
    <!-- <form onsubmit="goToPrio();return false"> -->
        <div class='addTaskAddTitleContainer'>
            <div class='addTaskAddTitleBox'>
                <h3>Title</h3>
                <!-- <form onsubmit='goToDescripten(); return false' > -->
                <input  required type="text" placeholder='Enter a title' id='addTaskTitle' autocomplete='off' minlength='3'>
                <!-- </form> -->
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

            <div class='addTaskAssignedBox' id='addTaskAssignedBox'>
                <h3>Assigned to</h3>
                <button onclick=enableDisableAssignList()><span id='selectedAssign'>Select contacts to Assign</span><img src="../assets/img/Vector 2.png" class='dropdownImg'></button>
                <span id='assignReq'>This field is required</span>
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
    <!-- </form>  -->
    <div class="taskAddedToBoard" id='test'>
        <div class="taskAddedToBoardContainer">
            <span>Task added to board</span>
            <img src="./assets/img/img_board_w.png">
        </div>
    </div>
    `;
}


function goToDescripten(){
    document.getElementById('addTaskDescripten').focus();
}

function goToPrio(){
    document.getElementById('addTaskUrgent').focus();
}


async function loadExitingCategories(){
    loadTask();
    addTaskCategoryList = [{'category':'New Category', 'catColor':''}];
    for (let i = 0; i < joinTaskArray.length; i++) {
        let taskCategory = joinTaskArray[i]['category'];
        let categoryColor = joinTaskArray[i]['catColor'];
        addTaskCategoryList.push({'category': taskCategory, 'catColor': categoryColor})
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
        document.getElementById('CatListDropdown').classList.remove('listD-none');
        document.getElementById('addTaskAssignedBox').classList.add('addMarginTop');
    } else {
        document.getElementById('CatListDropdown').classList.add('listD-none');
        document.getElementById('addTaskAssignedBox').classList.remove('addMarginTop');
    }
    catListStatus = !catListStatus;
}


function categoryListAndNewCategoryInputNotActive(){
    return !catListStatus && !newCatInputActive;
}


function renderCategoryList(){
    document.getElementById('CatListDropdown').innerHTML = '';
    for (let i = 0; i < addTaskCategoryList.length; i++) {
        let categoryName = addTaskCategoryList[i]['category'];
        let categoryColor = addTaskCategoryList[i]['catColor'];
        if (categoryColorAvailable(categoryColor)){
            document.getElementById('CatListDropdown').innerHTML += dropdownCategoryListHtml(categoryName, categoryColor, i);
        }else{
            document.getElementById('CatListDropdown').innerHTML += dropdownCategoryListHtml1(categoryName, i);
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
    newSetCategory = newSetCategory.trim();
    if (newSetCategory != ''){
        let newCatColor = catColor;
        let newCategoryItem = { 'category': newSetCategory, 'catColor': newCatColor};
        addTaskCategoryList.push(newCategoryItem);
        let newCategoryIndex = addTaskCategoryList.length - 1;
        renderCategoryList();
        selectCategory(+newCategoryIndex);
        catListStatus = false;
        newCatInputActive = false;
    }
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
    addColorToCat(3);
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
    let newCat = addTaskCategoryList[catId]['category'];
    let categoryColor = addTaskCategoryList[catId]['catColor'];
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
    if (catColor != '' || catColor == '0'){
        document.getElementById('color' + catColor + 'Div').classList.remove('colorDivSelected');
        catColor = '';
    }
    document.getElementById('color' + colorId + 'Div').classList.add('colorDivSelected');
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
    return title == '' || dueDate == '' || category == '' || descripten == '';
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
    if (descripten == '') {
        document.getElementById('descReq').style = 'opacity: 1;';
    }
}


function getReqiredFieldValues(){
    title = document.getElementById('addTaskTitle').value;
    title = title.trim();
    dueDate = document.getElementById('dueDate').value;
    dueDate = dueDate.trim();
    descripten = document.getElementById('addTaskDescripten').value;
    descripten = descripten.trim();
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
    document.getElementById('descReq').style = 'opacity: 0;';
}


// ToDo must be reworked when all selection possible !!!!!!!!!!!!!!!!
function clearFormularData() {
    document.getElementById('addTaskTitle').value = '';
    descripten = document.getElementById('addTaskDescripten').value = '';
    document.getElementById('selectedCat').innerHTML = /*html*/`
        <input disabled id='selectedCatInput' placeholder='Select task category' autocomplete='off'>
        <span id='sColor'></span>
        <div class='newCategoryImgDiv d-none' id='addTaskNewCatBtn'>
            <img src="../assets/img/new_cat_cancel.png">
            <img src="../assets/img/akar-icons_check.png">
        </div>
        <img src="../assets/img/Vector 2.png" class='dropdownImg' id='dropdownImg'>`;
    document.getElementById('dueDate').value = '';
    subTask = document.getElementById('subTask').value = '';
    document.getElementById('titleReq').style = 'opacity: 0;';
    document.getElementById('dateReq').style = 'opacity: 0;';
    document.getElementById('catReq').style = 'opacity: 0;';
    document.getElementById('catReq').classList.add('listD-none');
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
// A other way to control the prio buttons, with two functions:
function addPrio(prioIdIndex){
    let idList = ['addTaskUrgent', 'addTaskMedium', 'addTaskLow'];
    let selectedId = idList[+prioIdIndex];
    let cListLength = document.getElementById(selectedId).classList.length;
    let btnName = selectedId.replace('addTask', '');
    idList.splice(prioIdIndex, 1);
    if (btnNotSelected(cListLength)){
        selectPrioBtn(selectedId, btnName);
        unselectOtherBtn(idList);
    }else{
        removeBtnSelection(btnName);
    }
}


function btnNotSelected(cListLength){
    return cListLength == 1;
}


function selectPrioBtn(selectedId, btnName){
    document.getElementById(selectedId).classList.add(`${btnName.toLowerCase()}-color`);
    document.getElementById(`addTask${btnName}Span`).classList.add('color-white');
    document.getElementById(`addTask${btnName}Img`).src = `./assets/img/${btnName.toLowerCase()}_white.png`;
}


function removeBtnSelection(btnName){
    document.getElementById(`addTask${btnName}`).classList.remove(`${btnName.toLowerCase()}-color`);
    document.getElementById(`addTask${btnName}Span`).classList.remove('color-white');
    document.getElementById(`addTask${btnName}Img`).src = `./assets/img/${btnName.toLowerCase()}.png`;
}


function unselectOtherBtn(idList){
    for (let i = 0; i < idList.length; i++) {
        let selectedId = idList[i];
        let cListLength = document.getElementById(selectedId).classList.length;
        let btnName = selectedId.replace('addTask', '');
        if (btnIsSelected(cListLength)){
            document.getElementById(`addTask${btnName}`).classList.remove(`${btnName.toLowerCase()}-color`);
            document.getElementById(`addTask${btnName}Span`).classList.remove('color-white');
            document.getElementById(`addTask${btnName}Img`).src = `./assets/img/${btnName.toLowerCase()}.png`;
        }
    }
}


function btnIsSelected(cListLength){
    return cListLength == 2;
}
// A other way to control the prio buttons, with two functions end. Edit by Bossi
/*********************************************************************************/
// function addTaskUrgent() {
//     const element = document.querySelector('#addTaskUrgent');
//     if (element.classList.contains('urgent-color')) {
//         addTaskUrgentRemove();
//     } else {
//         document.getElementById('addTaskUrgent').classList.add('urgent-color');
//         document.getElementById('addTaskUrgentSpan').classList.add('color-white');
//         document.getElementById('addTaskUrgentImg').src = "./assets/img/urgent_white.png";
//         addTaskMediumRemove();
//         addTaskLowRemove();
//         prio = 'urgent';
//     }
// }


// function addTaskMedium() {
//     const element = document.querySelector('#addTaskMedium');
//     if (element.classList.contains('medium-color')) {
//         addTaskMediumRemove();
//     } else {
//         document.getElementById('addTaskMedium').classList.add('medium-color');
//         document.getElementById('addTaskMediumSpan').classList.add('color-white');
//         document.getElementById('addTaskMediumImg').src = "./assets/img/medium_white.png";
//         addTaskUrgentRemove();
//         addTaskLowRemove();
//         prio = 'medium';
//     }
// }


// function addTaskLow() {
//     const element = document.querySelector('#addTaskLow');
//     if (element.classList.contains('low-color')) {
//         addTaskLowRemove();
//     } else {
//         document.getElementById('addTaskLow').classList.add('low-color');
//         document.getElementById('addTaskLowSpan').classList.add('color-white');
//         document.getElementById('addTaskLowImg').src = "./assets/img/low_white.png";
//         addTaskUrgentRemove();
//         addTaskMediumRemove();
//         prio = 'low';
//     }
// }


// function addTaskUrgentRemove() {
//     document.getElementById('addTaskUrgent').classList.remove('urgent-color');
//     document.getElementById('addTaskUrgentSpan').classList.remove('color-white');
//     document.getElementById('addTaskUrgentImg').src = "./assets/img/urgent.png";
// }




// function addTaskMediumRemove() {
//     document.getElementById('addTaskMedium').classList.remove('medium-color');
//     document.getElementById('addTaskMediumSpan').classList.remove('color-white');
//     document.getElementById('addTaskMediumImg').src = "./assets/img/medium.png";
// }


// function addTaskLowRemove() {
//     document.getElementById('addTaskLow').classList.remove('low-color');
//     document.getElementById('addTaskLowSpan').classList.remove('color-white');
//     document.getElementById('addTaskLowImg').src = "./assets/img/low.png";
// }
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








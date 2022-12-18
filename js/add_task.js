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
            <button class='addTaskCreate'>
                <span>Create Task</span>
                <img src="./assets/img/createb.png">  
            </button>
        </div>
    </div>

    <div class='addTaskAddTitleContainer'>
        <div class='addTaskAddTitleBox'>
            <h3>Title</h3>
            <input type="text" placeholder='Enter a title'>
            <span>This field is required</span>
        </div>

        <div class='addTaskAddDescriptenBox'>
            <h3>Descripten</h3>
            <input type="text" placeholder=''>
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

    <div class='vector4'>

    </div>

    <div class='frame43'>
        <div class='frame39'>
            <h3>Due date</h3>
            <input type="date">
            <span>This field is required</span>
        </div>
        <div class='frame28'>
            <h3>Prio</h3>
            <div class='prio'>
                <div class='frame14'>
                    <span>Urgent</span>
                    <img src="../assets/img/urgent_arrows.png">
                </div>
                <div class='frame25'>
                    <span>Medium</span>
                    <img src="../assets/img/prio_medium.png">
                </div>
                <div class='frame26'>
                    <span>Low</span>
                    <img src="../assets/img/prio_low.png">
                </div>
            </div>
        </div>
        <div class='subtask'>
            <h3>Subtask</h3>
            <div>
                <input type="text" placeholder='Add new subtask'>
                <img src="../assets/img/add_cross.png">
            </div>
            <div class='frame37'>
                <input type="checkbox">
                <span>Subtask</span>
            </div>
            
        </div>
    </div>

    

    
    `;
}

let catListStatus = false;

function enableDisableCatList(){
    if (!catListStatus){
        document.getElementById('dropdown').classList.remove('listD-none');
        document.getElementById('addTaskAssignedBox').classList.add('addMarginTop');
    }else{
        document.getElementById('dropdown').classList.add('listD-none');
        document.getElementById('addTaskAssignedBox').classList.remove('addMarginTop');
    }
    catListStatus = !catListStatus;
}


let categoryList = ['New Category', 'Category 2', 'Category 3']

function selectCategory(catId){
    document.getElementById('selectedCat').innerHTML = '';
    let newCat = categoryList[catId];
    if (catId == 0){
        document.getElementById('selectedCat').innerHTML = /*html*/`
        <input type='text' placeholder='New Category Name'>`;
        enableDisableCatList();
        document.getElementById('colorSelection').classList.remove('listD-none')
    }else{
        document.getElementById('selectedCat').innerHTML = newCat;
        enableDisableCatList();
        document.getElementById('colorSelection').classList.add('listD-none');
    }
}

let assignListStatus = false;

function enableDisableAssignList(){
    if (!assignListStatus){
        document.getElementById('dropdown2').classList.remove('listD-none');
    }else{
        document.getElementById('dropdown2').classList.add('listD-none');
    }
    assignListStatus = !assignListStatus;
}
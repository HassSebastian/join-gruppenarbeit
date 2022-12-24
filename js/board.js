async function initBoard() {
    await includeHTML();
    await renderBoard();
    selectedMenuBtnId = 0;
    selectedMenuButton(2);
    loadTask();
    await createWorkStatusArrays();
    renderAllCards();
}


async function renderBoard() {
    document.getElementById('content').innerHTML = '';
    document.getElementById('content').innerHTML += /*html*/`
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


    <div class="canbanBoard">

        <div class="canbanContainer dragArea" id='dropArea0' ondrop="moveTo(0); removeHighlight('dropArea0')"  ondragleave="removeHighlight('dropArea0')" ondragover="allowDrop(event); highlight('dropArea0')">
            <div class="menu todo">
                <span>To do</span>
                <button class="menuPlusButton">
                    <img src="./assets/img/plus_logo_black.png">
                </button>
            </div>
            <div id='toDoDiv'>
                
            </div>
        </div>

        <div class="canbanContainer dragArea" id='dropArea1' ondrop="moveTo(1); removeHighlight('dropArea1')" ondragleave="removeHighlight('dropArea1')" ondragover="allowDrop(event); highlight('dropArea1')">
            <div class="menu progress">
                <span>In progress</span>
                <button class="menuPlusButton">
                    <img src="./assets/img/plus_logo_black.png">
                </button>
            </div>
            <div id='progressDiv'>
                
            </div>
        </div>

        <div class="canbanContainer dragArea" id='dropArea2' ondrop="moveTo(2); removeHighlight('dropArea2')" ondragleave="removeHighlight('dropArea2')" ondragover="allowDrop(event); highlight('dropArea2')">
            <div class="menu feedback">
                <span>Anwaiting Feedback</span>
                <button class="menuPlusButton">
                    <img src="./assets/img/plus_logo_black.png">
                </button>
            </div>
            <div id='awaitingDiv'>
                
            </div>
        </div>

        <div class="canbanContainer dragArea" id='dropArea3' ondrop="moveTo(3); removeHighlight('dropArea3')" ondragleave="removeHighlight('dropArea3')" ondragover="allowDrop(event); highlight('dropArea3')">
            <div class="menu done">
                <span>Done</span>
                <button class="menuPlusButton">
                    <img src="./assets/img/plus_logo_black.png">
                </button>
            </div>
            <div id='doneDiv'>
                
            </div>
        </div>

    </div>
    `;
}


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


function renderAllCards() {
    renderToDoCards();
    renderInProgressCards();
    renderAwaitingFeedbackCards();
    renderDoneCards();
}

// class design löschen !?
function renderToDoCards() {
    document.getElementById('toDoDiv').innerHTML = '';
    for (let i = 0; i < workStatus0Array.length; i++) {
        let cardTitle = workStatus0Array[i]['cardTitle'];
        let cardDescription = workStatus0Array[i]['cardDescription'];
        let cardCategory = workStatus0Array[i]['cardCategory'];
        let cardPrio = workStatus0Array[i]['cardPrio'];
        let subTasks = workStatus0Array[i]['subTasks'];
        let taskIndex =workStatus0Array[i]['taskIndex'];
        document.getElementById('toDoDiv').innerHTML += /*html*/`
            <div class='taskBackground' id='taskCard${taskIndex}' draggable='true' ondragstart='startDrag(${taskIndex})'>
                <div class='taskContainer'>
                    <div class='taskKategorie' id='toDoCardCat${i}'>
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
    setCategoryBackgroundColorForWorkStatus0();
}


function setCategoryBackgroundColorForWorkStatus0(){
    for (let i = 0; i < workStatus0Array.length; i++){
        let cardCatColor = workStatus0Array[i]['cardCatColor'];
        let catBackground = categoryBackgroundColors[cardCatColor];
        document.getElementById(`toDoCardCat${i}`).style = `background-color: ${catBackground};`;
    }
}


function renderInProgressCards() {
    document.getElementById('progressDiv').innerHTML = '';
    for (let i = 0; i < workStatus1Array.length; i++) {
        let cardTitle = workStatus1Array[i]['cardTitle'];
        let cardDescription = workStatus1Array[i]['cardDescription'];
        let cardCategory = workStatus1Array[i]['cardCategory'];
        let cardPrio = workStatus1Array[i]['cardPrio'];
        let subTasks = workStatus1Array[i]['subTasks'];
        let taskIndex =workStatus1Array[i]['taskIndex'];
        document.getElementById('progressDiv').innerHTML += /*html*/`
            <div class='taskBackground' id='taskCard${taskIndex}' draggable='true' ondragstart='startDrag(${taskIndex})'>
                <div class='taskContainer'>
                    <div class='taskKategorie' id='progressCard${i}'>
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
    setCategoryBackgroundColorForWorkStatus1();
}


function setCategoryBackgroundColorForWorkStatus1(){
    for (let i = 0; i < workStatus1Array.length; i++){
        let cardCatColor = workStatus1Array[i]['cardCatColor'];
        let catBackground = categoryBackgroundColors[cardCatColor];
        document.getElementById(`progressCard${i}`).style = `background-color: ${catBackground};`;
    }
}


function renderAwaitingFeedbackCards() {
    document.getElementById('awaitingDiv').innerHTML = '';
    for (let i = 0; i < workStatus2Array.length; i++) {
        let cardTitle = workStatus2Array[i]['cardTitle'];
        let cardDescription = workStatus2Array[i]['cardDescription'];
        let cardCategory = workStatus2Array[i]['cardCategory'];
        let cardPrio = workStatus2Array[i]['cardPrio'];
        let subTasks = workStatus2Array[i]['subTasks'];
        let taskIndex =workStatus2Array[i]['taskIndex'];
        document.getElementById('awaitingDiv').innerHTML += /*html*/`
            <div class='taskBackground' id='taskCard${taskIndex}' draggable='true' ondragstart='startDrag(${taskIndex})'>
                <div class='taskContainer'>
                    <div class='taskKategorie' id='feedbackCard${i}'>
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
    setCategoryBackgroundColorForWorkStatus2();
}


function setCategoryBackgroundColorForWorkStatus2(){
    for (let i = 0; i < workStatus2Array.length; i++){
        let cardCatColor = workStatus2Array[i]['cardCatColor'];
        let catBackground = categoryBackgroundColors[cardCatColor];
        document.getElementById(`feedbackCard${i}`).style = `background-color: ${catBackground};`;
    }
}


function renderDoneCards() {
    document.getElementById('doneDiv').innerHTML = '';
    for (let i = 0; i < workStatus3Array.length; i++) {
        let cardTitle = workStatus3Array[i]['cardTitle'];
        let cardDescription = workStatus3Array[i]['cardDescription'];
        let cardCategory = workStatus3Array[i]['cardCategory'];
        let cardPrio = workStatus3Array[i]['cardPrio'];
        let subTasks = workStatus3Array[i]['subTasks'];
        let taskIndex =workStatus3Array[i]['taskIndex'];
        document.getElementById('doneDiv').innerHTML += /*html*/`
            <div class='taskBackground' id='taskCard${taskIndex}' draggable='true' ondragstart='startDrag(${taskIndex})'>
                <div class='taskContainer'>
                    <div class='taskKategorie' id='doneCard${i}'>
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
    setCategoryBackgroundColorForWorkStatus3();
}


function setCategoryBackgroundColorForWorkStatus3(){
    for (let i = 0; i < workStatus3Array.length; i++){
        let cardCatColor = workStatus3Array[i]['cardCatColor'];
        let catBackground = categoryBackgroundColors[cardCatColor];
        document.getElementById(`doneCard${i}`).style = `background-color: ${catBackground};`;
    }
}


function startDrag(id){
    currentDraggedElement = id;
}


function allowDrop(ev) {
    ev.preventDefault();
}


async function moveTo(area){
    // todos[currentDraggedElement]['category'] = area;
    joinTaskArray[currentDraggedElement]['workFlowStatus'] = area;
    await createWorkStatusArrays();
    renderAllCards();
}


function highlight(id){
    document.getElementById(id).classList.add('drag-area-highlight');
}


function removeHighlight(id){
    document.getElementById(id).classList.remove('drag-area-highlight');
}
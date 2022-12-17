async function initAddTask() {
    await includeHTML();
    selectedMenuButton(1);
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
            <select name="pets" id="pet-select">
                <option value="">Select task category</option>
                <option value="dog">Dog</option>
                <option value="cat">Cat</option>
                <option value="hamster">Hamster</option>
                <option value="parrot">Parrot</option>
                <option value="spider">Spider</option>
                <option value="goldfish">Goldfish</option>
            </select>
        </div>

        <div class='addTaskAddAssignedBox'>
            <h3>Assigned to</h3>
            <select name="pets" id="pet-select">
                <option value="">Select task category</option>
                <option value="dog">Dog</option>
                <option value="cat">Cat</option>
                <option value="hamster">Hamster</option>
                <option value="parrot">Parrot</option>
                <option value="spider">Spider</option>
                <option value="goldfish">Goldfish</option>
            </select>
        </div>
    </div>

    
    `;
}
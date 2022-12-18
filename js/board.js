async function initBoard() {
    await includeHTML();
    selectedMenuButton(2);
    renderBoard();
}


async function renderBoard() {
    document.getElementById('content').innerHTML = '';
    document.getElementById('content').innerHTML += `
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

    <div class="menuOverlay">

        <div class="menuTask">

            <div class="menu done">
                <span>Done</span>
                <button class="menuPlusButton">
                    <img src="./assets/img/plus_logo_black.png">
                </button>
            </div>

            <div class="menu feedback">
                <span>Anwaiting Feedback</span>
                <button class="menuPlusButton">
                    <img src="./assets/img/plus_logo_black.png">
                </button>
            </div>

            <div class="menu progress">
                <span>In progress</span>
                <button class="menuPlusButton">
                    <img src="./assets/img/plus_logo_black.png">
                </button>
            </div>

            <div class="menu todo">
                <span>To do</span>
                <button class="menuPlusButton">
                    <img src="./assets/img/plus_logo_black.png">
                </button>
            </div>

        </div>

    </div>

    <div class="canbanBoard">

        <div class="canbanContainer">
            <div class="taskBackground">
                <div class="taskContainer">
                    <div class="taskKategorie design">
                        <span>Design</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="canbanContainer">
            <div class="taskBackground">
                <div class="taskContainer">
                    <div class="taskKategorie sales">
                        <span>Sales</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="canbanContainer">
            <div class="taskBackground">
                <div class="taskContainer">
                    <div class="taskKategorie backoffice">
                        <span>Backoffice</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="canbanContainer">
            <div class="taskBackground">
                <div class="taskContainer">
                    <div class="taskKategorie marketing">
                        <span>Marketing</span>
                    </div>
                </div>
            </div>
        </div>

    </div>
    `;
}
async function initBoard() {
    await includeHTML();
    await renderBoard();
    selectedMenuBtnId = 0;
    selectedMenuButton(2);
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


    <div class="canbanBoard">

        <div class="canbanContainer">

            <div class="menu todo">
                <span>To do</span>
                <button class="menuPlusButton">
                    <img src="./assets/img/plus_logo_black.png">
                </button>
            </div>

            <div class="taskBackground">
                <div class="taskContainer">
                    <div class="taskKategorie design">
                        <span>Design</span>
                    </div>

                    <div class="taskHeadline">
                        <span class="taskHeadlineContent">Website redesign</span>
                        <span class="taskContent">Modify the contents of the main website...</span>
                    </div>

                    <div class="doneBar">
                        <div></div>
                        <span>1/2 Done</span>
                    </div>

                    <div class="contributorsPrio">
                        <div class="contributorsLogoContainer">
                            <div class="contributorsLogo blue">
                                <span>SM</span>
                            </div>
                            <div class="contributorsLogo pink">
                                <span>MV</span>
                            </div>
                            <div class="contributorsLogo litegreen">
                                <span>EF</span>
                            </div>
                        </div>

                        <div class="prio">
                            <img src="./assets/img/low.png">
                        </div>

                    </div>
                </div>
            </div>
        </div>

        <div class="canbanContainer">

            <div class="menu progress">
                <span>In progress</span>
                <button class="menuPlusButton">
                    <img src="./assets/img/plus_logo_black.png">
                </button>
            </div>

            <div class="taskBackground">
                <div class="taskContainer">
                    <div class="taskKategorie sales">
                        <span>Sales</span>
                    </div>
                    <div class="taskHeadline">
                    <span class="taskHeadlineContent">Website redesign</span>
                    <span class="taskContent">Modify the contents of the main website...</span>
                </div>

                <div class="contributorsPrio">
                    <div class="contributorsLogoContainer">
                        <div class="contributorsLogo yellow">
                            <span>AS</span>
                        </div>
                        <div class="contributorsLogo lila">
                            <span>DE</span>
                        </div>
                        <div class="contributorsLogo black">
                            <span>+2</span>
                        </div>
                    </div>

                    <div class="prio">
                        <img src="./assets/img/urgent.png">
                    </div>

                </div>

                </div>
            </div>

        </div>

        <div class="canbanContainer">

            <div class="menu feedback">
                <span>Anwaiting Feedback</span>
                <button class="menuPlusButton">
                    <img src="./assets/img/plus_logo_black.png">
                </button>
            </div>

            <div class="taskBackground">
                <div class="taskContainer">
                    <div class="taskKategorie backoffice">
                        <span>Backoffice</span>
                    </div>
                    <div class="taskHeadline">
                        <span class="taskHeadlineContent">Website redesign</span>
                        <span class="taskContent">Modify the contents of the main website...</span>
                    </div>

                    <div class="contributorsPrio">
                        <div class="contributorsLogoContainer">
                            <div class="contributorsLogo orange">
                                <span>MB</span>
                            </div>
                            <div class="contributorsLogo pink">
                                <span>AM</span>
                            </div>
                            <div class="contributorsLogo black">
                                <span>+3</span>
                            </div>
                        </div>

                        <div class="prio">
                            <img src="./assets/img/medium.png">
                        </div>

                    </div>

                </div>

            </div>

            <div class="taskBackground">
                <div class="taskContainer">
                    <div class="taskKategorie media">
                        <span>Media</span>
                    </div>
                    <div class="taskHeadline">
                        <span class="taskHeadlineContent">Video cut</span>
                        <span class="taskContent">Edit the new company video</span>
                    </div>

                    <div class="contributorsPrio">
                        <div class="contributorsLogoContainer">
                            <div class="contributorsLogo blue">
                                <span>HK</span>
                            </div>
                        </div>

                        <div class="prio">
                            <img src="./assets/img/medium.png">
                        </div>

                    </div>

                </div>

            </div>
        </div>

        <div class="canbanContainer">

            <div class="menu done">
                <span>Done</span>
                <button class="menuPlusButton">
                    <img src="./assets/img/plus_logo_black.png">
                </button>
            </div>

            <div class="taskBackground">
                <div class="taskContainer">
                    <div class="taskKategorie marketing">
                        <span>Marketing</span>
                    </div>
                    <div class="taskHeadline">
                    <span class="taskHeadlineContent">Website redesign</span>
                    <span class="taskContent">Modify the contents of the main website...</span>
                </div>

                <div class="doneBar">
                    <div></div>
                    <span">3/3 Done</span>
                </div>

                <div class="contributorsPrio">
                    <div class="contributorsLogoContainer">
                        <div class="contributorsLogo green">
                            <span>BZ</span>
                        </div>
                        <div class="contributorsLogo liteblue">
                            <span>RS</span>
                        </div>
                    </div>

                    <div class="prio">
                        <img src="./assets/img/low.png">
                    </div>

                </div>

                </div>
            </div>

        </div>

    </div>
    `;
}
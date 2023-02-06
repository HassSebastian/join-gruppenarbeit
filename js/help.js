async function initHelp() {
    await enableHelp();
    await includeHTML();
    await renderHelp();
    // selectedMenuBtnId = 0;
    // selectedMenuButton(0);
}


function back() {
    // history.back();
    initSummary();
}


async function renderHelp() {
    document.getElementById('content').innerHTML = '';
    document.getElementById('content').innerHTML += /*html*/ `
            <img src="./assets/img/back_logo_black.png" onclick="back()" class="backArrowimg">
            <span class="helpOverlayspan">Help</span>
        <div class="textFieldContainer">
            <div class="whatIsJoinContainer">
                <span class="whatIsJoinField">What is Join?</span>
                <span class="whatIsJoinIllustration">
                    Join is a classical task management tool with a kanban-board. <br>
                    You can organize your tasks whithin a project or business processes. <br>
                    It is perfectly suitable for working together with your team. <br>
                    Join let you and your team work more efficiently. <br>
                    You have all of your taks in focus und won't miss upcoming deadlines anymore. <br>
                    Start working with Join now!
                </span>
            </div>
            <span class="howToUseItField">How to use it</span>
            <div class="listBigContainer">
                <div class="listContainer">
                    <span class="listNumber">1.</span>
                    <span class="listContent">
                        Add a task with title, description and category. <br>
                        Assign the task to other team members of your contact list or invite new contacts.
                    </span>
                </div>
                <div class="listContainer">
                    <span class="listNumber">2.</span>
                    <span class="listContent">
                        Check the current status of your tasks in the kanban-board. <br>
                        You can drag and drop your task to change the status. Also it is possible to edit the task
                        details.
                    </span>
                </div>
                <div class="listContainer">
                    <span class="listNumber">3.</span>
                    <span class="listContent">
                        Add team members to your contact list to communicate to them fastly. <br>
                        Also you can assign tasks directly to your contacts.
                    </span>
                </div>
            </div>
        </div>
    `;
}
function back() {
    history.back();
}


async function renderHelp() {
    document.getElementById('mobilContent').innerHTML = '';
    document.getElementById('mobilContent').innerHTML += /*html*/ `
        <div class="backArrowMob">
            <img src="../../assets/img/back_logo_black.png" onclick="back()">
        </div>
        <div class="helpOverlayMob">
            <span>Help</span>
        </div>
        <div class="kanbanProjectManagementToolMob">
            <span>Kanban Project Management Tool</span>
        </div>
        <div class="textFieldContainerMob">
            <div class="whatIsJoinContainerMob">
                <span class="whatIsJoinFieldMob">What is Join?</span>
                <span class="whatIsJoinIllustrationMob">
                    Join is a classical task management tool with a kanban-board.   
                    You can organize your tasks whithin a project or business processes.   
                    It is perfectly suitable for working together with your team.   
                    Join let you and your team work more efficiently.   
                    You have all of your taks in focus und won't miss upcoming deadlines anymore.   
                    Start working with Join now!
                </span>
            </div>
            <div class="listBigContainerMob">
                <div class="listContainerMob">
                    <span class="listNumberMob">1.</span>
                    <span class="listContentMob">
                        Add a task with title, description and category.   
                        Assign the task to other team members of your contact list or invite new contacts.
                    </span>
                </div>
                <div class="listContainerMob">
                    <span class="listNumberMob">2.</span>
                    <span class="listContentMob">
                        Check the current status of your tasks in the kanban-board.   
                        You can drag and drop your task to change the status. Also it is possible to edit the task
                        details.
                    </span>
                </div>
                <div class="listContainerMob">
                    <span class="listNumberMob">3.</span>
                    <span class="listContentMob">
                        Add team members to your contact list to communicate to them fastly.   
                        Also you can assign tasks directly to your contacts.
                    </span>
                </div>
            </div>
        </div>
    `;
}
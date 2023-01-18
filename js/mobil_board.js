async function initMobilBoard() {
    // await includeHTML();
    await renderMobileBoard();
    // selectedMenuBtnId = 0;
    selectedMenuButton(2);
    // await loadTask();
    // await createWorkStatusArrays();
    // renderAllCards();
    // loadContributorsLetter();
}


async function renderMobileBoard(){
    document.getElementById('mobilContent').innerHTML = '';
	document.getElementById('mobilContent').innerHTML = /*html*/ `
        <span class="kanbanProjectManagementTool">
            Kanban Project Management Tool
        </span>
        <div class="headlineContainerBoardMob">
            <span Class="headlineMob">
                Board
            </span>
        </div>
        <div class="boardSearchMobil">
            <div class='frame'>
                <div class='frame121'>
                    <input type="text" class='frame108'>
                    <div class='frame122'>
                        <img src="../assets/img/board_mobil_lupe.png" alt="">
                    </div>
                </div>   
            </div>
        </div>
        `;
}
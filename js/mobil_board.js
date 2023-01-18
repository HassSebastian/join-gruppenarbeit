async function initBoard() {
    await includeHTML();
    await renderMobileBoard();
    selectedMenuBtnId = 0;
    selectedMenuButton(2);
    await loadTask();
    await createWorkStatusArrays();
    renderAllCards();
    loadContributorsLetter();
}


function renderMobileBoard(){
    
}
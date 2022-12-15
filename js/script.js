let menuSelectorStyles = [
    {
        'background': 'background-color: #091931;',
        'disabledBackground': 'background-color: default;',
        'color': 'color: #FFFFFF;',
        'color1': 'color: default;',
        'enableImg': 'img_display',
        'disableImg': 'img_d-none',
    },
    {
        'menuName': 'btn_summary_menu',
        'img1Id': 'img_summary1',
        'img2Id': 'img_summary2',
    },
    {
        'menuName': 'btn_board_menu',
        'img1Id': 'img_board1',
        'img2Id': 'img_board2',
    },
    {
        'menuName': 'btn_add_task_menu',
        'img1Id': 'img_add_task1',
        'img2Id': 'img_add_task2',
    },
    {
        'menuName': 'btn_contacts_menu',
        'img1Id': 'img_contacts1',
        'img2Id': 'img_contacts2',
    },
    {
        'menuName': 'btn_legal_notice',
    }

];

let selectedMenuBtnId;
let includeAttribute = 'w3-include-html';

async function init() {
    await includeHTML();
    selectedMenuButton(1);
}


async function includeHTML() {
    let includeElements = document.querySelectorAll(`[${includeAttribute}]`);
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute(`${includeAttribute}`);
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}


function selectedMenuButton(menuId) {
    if (selectedMenuNotShownAndNotLegalNotice(menuId)) {
        setMenuBtnStyle(menuId);
    }
    if (selectedMenuIsLegalNoticeAndNotShown) {
        setLegalNoticeBtnStyle(menuId);
    }
    selectedMenuBtnId = menuId;
}


function selectedMenuNotShownAndNotLegalNotice(menuId){
    return selectedMenuBtnId != menuId && menuId != 5;
}


function selectedMenuIsLegalNoticeAndNotShown(menuId){
    return menuId == 5 && selectedMenuBtnId != 5;
}


function setMenuBtnStyle(menuId) {
    let menuBtnId = menuSelectorStyles[menuId]['menuName'];
    let img1Id = menuSelectorStyles[menuId]['img1Id'];
    let img2Id = menuSelectorStyles[menuId]['img2Id'];
    document.getElementById(menuBtnId).style = menuSelectorStyles[0]['background'];
    document.getElementById(menuBtnId + '_text').style = menuSelectorStyles[0]['color'];
    document.getElementById(img1Id).classList.add(menuSelectorStyles[0]['disableImg']);
    document.getElementById(img2Id).classList.add(menuSelectorStyles[0]['enableImg']);
    if (otherMenuBtnPreSelected()) {
        deselectMenuButton(selectedMenuBtnId);
    }
}


function otherMenuBtnPreSelected(){
    return selectedMenuBtnId;
}


function setLegalNoticeBtnStyle(menuId) {
    let menuBtnId = menuSelectorStyles[menuId]['menuName'];
    document.getElementById(menuBtnId).style = menuSelectorStyles[0]['background'];
    if (otherMenuBtnPreSelected()) {
        deselectMenuButton(selectedMenuBtnId);
    }
}


function deselectMenuButton(menuId) {
    let menuBtnId = menuSelectorStyles[menuId]['menuName'];
    let img1Id = menuSelectorStyles[menuId]['img1Id'];
    let img2Id = menuSelectorStyles[menuId]['img2Id'];
    if (legalNoticeNotSelected()) {
        document.getElementById(menuBtnId).style = menuSelectorStyles[0]['disabledBackground'];
        document.getElementById(menuBtnId + '_text').style = menuSelectorStyles[0]['color1'];
        document.getElementById(img1Id).classList.remove(menuSelectorStyles[0]['disableImg']);
        document.getElementById(img2Id).classList.remove(menuSelectorStyles[0]['enableImg']);
    }
    if (legalNoticeSelected()) {
        document.getElementById(menuBtnId).style = menuSelectorStyles[0]['disabledBackground'];
    }
}


function legalNoticeNotSelected(){
    return selectedMenuBtnId != 5;
}


function legalNoticeSelected(){
    return selectedMenuBtnId == 5
}




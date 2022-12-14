
async function init() {
    await includeHTML();
}


async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html");
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}


let menuSelectorStyles = [
    {
        'background': 'background-color: #091931;',
        'disabledBackground': 'background-color: #2A3647;',
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
];

let selectedMenuBtnId;

function selectedMenuButton(menuId) {
    if (selectedMenuBtnId != menuId) {
        let menuBtnId = menuSelectorStyles[menuId]['menuName'];
        let img1Id = menuSelectorStyles[menuId]['img1Id'];
        let img2Id = menuSelectorStyles[menuId]['img2Id'];
        document.getElementById(menuBtnId).style = menuSelectorStyles[0]['background'];
        document.getElementById(menuBtnId + '_text').style = menuSelectorStyles[0]['color'];
        document.getElementById(img1Id).classList.add(menuSelectorStyles[0]['disableImg']);
        document.getElementById(img2Id).classList.add(menuSelectorStyles[0]['enableImg']);
        if (selectedMenuBtnId) {
            deselectMenuButton(selectedMenuBtnId);
        }
    }
    selectedMenuBtnId = menuId;
}


function deselectMenuButton(menuId) {
    let menuBtnId = menuSelectorStyles[menuId]['menuName'];
    let img1Id = menuSelectorStyles[menuId]['img1Id'];
    let img2Id = menuSelectorStyles[menuId]['img2Id'];
    document.getElementById(menuBtnId).style = menuSelectorStyles[0]['disabledBackground'];
    document.getElementById(menuBtnId + '_text').style = menuSelectorStyles[0]['color1'];
    document.getElementById(img1Id).classList.remove(menuSelectorStyles[0]['disableImg']);
    document.getElementById(img2Id).classList.remove(menuSelectorStyles[0]['enableImg']);
}



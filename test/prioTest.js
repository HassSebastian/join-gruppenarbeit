
let showContributorsPrioIcons = { M: './assets/img/medium.png', U: './assets/img/urgent.png', L: './assets/img/low.png' };

function showContributorsPrioIcon(taskIndex) {
    for (let a in showContributorsPrioIcons) {
        let prio = joinTaskArray[taskIndex].prio[0];
        if (a = prio) {
            document.getElementById(`contributorsPrioIcon${taskIndex}`).src = `${showContributorsPrioIcons[a]}`;
            break;
        }
    }
}
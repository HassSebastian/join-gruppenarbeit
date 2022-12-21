
function addTask(i) {
    const element = document.querySelector(`#addTask${i}`);
    if (element.classList.contains(`${i}-color`)) {
        if (`${i}-color`) {
            addTaskUrgentRemove();
            addTaskMediumRemove();
            addTaskLowRemove();
        } else {
            document.getElementById(`addTask${i}`).classList.add(`${i}-color`);
            document.getElementById(`addTask${i}Span`).classList.add('color-white');
            document.getElementById(`addTask${i}Img`).src = `./assets/img/${i}_white.png`;
        }
    }
}


function addTaskUrgentRemove() {
    document.getElementById('addTaskurgent').classList.remove('urgent-color');
    document.getElementById('addTaskurgentSpan').classList.remove('color-white');
    document.getElementById('addTaskurgentImg').src = "./assets/img/urgent.png";
}


function addTaskMediumRemove() {
    document.getElementById('addTaskmedium').classList.remove('medium-color');
    document.getElementById('addTaskmediumSpan').classList.remove('color-white');
    document.getElementById('addTaskmediumImg').src = "./assets/img/medium.png";
}


function addTaskLowRemove() {
    document.getElementById('addTasklow').classList.remove('low-color');
    document.getElementById('addTasklowSpan').classList.remove('color-white');
    document.getElementById('addTasklowImg').src = "./assets/img/low.png";
}



<div class='addTaskPrioIcons'>
    <div class='addTaskUrgent' id='addTaskurgent' onclick='addTask(urgent)'>
        <span id='addTaskurgentSpan'>Urgent</span>
        <img id='addTaskurgentImg' src="../assets/img/urgent.png">
    </div>
    <div class='addTaskMedium' id='addTaskmedium' onclick='addTask(medium)'>
        <span id='addTaskmediumSpan'>Medium</span>
        <img id='addTaskmediumImg' src="../assets/img/medium.png">
    </div>
    <div class='addTaskLow' id='addTasklow' onclick='addTask(low)'>
        <span id='addTasklowSpan'>Low</span>
        <img id='addTasklowImg' src="../assets/img/low.png">
    </div>
</div>

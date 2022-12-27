async function initSummary() {
    await includeHTML();
    await renderSummary();
    selectedMenuBtnId = 0;
    selectedMenuButton(1);
    showDate();
    showTime();
}


async function renderSummary() {
    document.getElementById('content').innerHTML = '';
    document.getElementById('content').innerHTML += /*html*/ `
    <!-- <div class='summary_content'> -->
        <div class='title'>
            <h3>Summary</h3>
            <img src='./assets/img/vertical_line.png'>
            <h4>Everything in a nutshell!</h4>
        </div>
        <div class='welcome'>
            <h4 id='greetUser'></h4>
            <h3>Sofia Müller</h3>
        </div>
        <div class="overview">
            <div class='taskOverview'>
                <div id='taskInBoard'><span id='taskInBoardAmount'>5</span> <p>Task in Board</p></div>
                <div id='taskInProgress'><span id='taskInProgressAmount'>2</span> <p>Task in Progress</p></div>
                <div id='awaitingFeedback'><span id='awaitingFeedbackAmount'>2</span> <p>Awaiting Feedback</p></div>
            </div>
            <div class='ugencySummary'>
                <div class="ugent">
                    <div class='ugentImgContainer'>
                        <img class='ugentImg' src='./assets/img/summary_urgent.png' >
                    </div>
                    <div class='ugentAmount'>
                        <span >1</span>
                        <p>Urgent</p>
                    </div>
                    <img src='./assets/img/vertical-line2.png' class='ugentVerticalLine'>
                </div>
                <div class='deadlineData'>
                    <p id='deadlineDate'>October 16, 2022</p> 
                    <p class='deadlineText'>Upcoming Deadline</p> 
                </div>
            </div>
            <div class='toDoData'>
                <div class='toDo' id='toDo' onmouseover="toDoHoverOn()" onmouseout="toDoHoverOff()">
                    <img id='toDoImg' src='./assets/img/to_do_pen.png' alt="">
                    <div class='toDoAmountData'>
                        <span id='toDoAmountTasks'>1</span>
                        <p id='toDoAmountP'>to-Do</p>
                    </div>
                </div>
                <div class='toDoDone' id='toDoDone' onmouseover="toDoDoneHoverOn()" onmouseout="toDoDoneHoverOff()">
                    <img id='toDoDoneImg' src='./assets/img/done.png' alt="">
                    <div class='toDoAmountData'>
                        <span id='toDoDoneAmountTasks'>1</span>
                        <p id='toDoDoneAmountP'>Done</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}


// Hover ToDo and Done Button
function toDoHoverOn() {
    document.getElementById('toDoImg').src = "./assets/img/to_do_pen_black.png";
    document.getElementById('toDo').classList.add('toDoHover');
    document.getElementById('toDoAmountTasks').classList.add('toDoHoverSpanP');
    document.getElementById('toDoAmountP').classList.add('toDoHoverSpanP');
}


function toDoHoverOff() {
    document.getElementById('toDoImg').src = "./assets/img/to_do_pen.png";
    document.getElementById('toDo').classList.remove('toDoHover');
    document.getElementById('toDoAmountTasks').classList.remove('toDoHoverSpanP');
    document.getElementById('toDoAmountP').classList.remove('toDoHoverSpanP');
}


function toDoDoneHoverOn() {
    document.getElementById('toDoDoneImg').src = "./assets/img/done_black.png";
    document.getElementById('toDoDone').classList.add('toDoHover');
    document.getElementById('toDoDoneAmountTasks').classList.add('toDoHoverSpanP');
    document.getElementById('toDoDoneAmountP').classList.add('toDoHoverSpanP');
}


function toDoDoneHoverOff() {
    document.getElementById('toDoDoneImg').src = "./assets/img/done.png";
    document.getElementById('toDoDone').classList.remove('toDoHover');
    document.getElementById('toDoDoneAmountTasks').classList.remove('toDoHoverSpanP');
    document.getElementById('toDoDoneAmountP').classList.remove('toDoHoverSpanP');
}

// show date in Summary 
function showDate() {
    let currentDate = new Date();
    let day = currentDate.getDate();
    let month = currentDate.getMonth() + 1; // Januar ist der 0. Monat
    let year = currentDate.getFullYear();
    if (day < 10) {
        day = "0" + day;
    }
    if (month < 10) {
        month = "0" + month;
    }
    let dateString = currentDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    document.getElementById("deadlineDate").innerHTML = dateString;
}

// greet User
function showTime() {
    let currentTime = new Date();
    let hours = currentTime.getHours();
    let timeString = hours;
    if(timeString >= 6){
        document.getElementById('greetUser').innerHTML = `Good Morning,`;
    }
    if(timeString >= 12){
        document.getElementById('greetUser').innerHTML = `Good Day,`;
    }
    if(timeString >= 18){
        document.getElementById('greetUser').innerHTML = `Good Evening,`;
    }
  }



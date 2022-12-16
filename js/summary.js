async function init_summary() {
    await includeHTML();
    selectedMenuButton(1);
    renderSummary();
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
            <h4>Good Morning</h4>
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
                    <img src='./assets/img/vertical_line2' class='ugentVerticalLine'>
                </div>
                <div class='deadlineData'>
                    <p id='deadlineDate'>October 16, 2022</p> 
                    <p class='deadlineText'>Upcoming Deadline</p> 
                </div>
            </div>
            <div class='toDoData'>
                <div class='toDo'>
                    <img src='./assets/img/to_do_pen.png' alt="">
                    <div class='toDoAmountData'>
                        <span>1</span>
                        <p>to-Do</p>
                    </div>
                </div>
                <div class='toDoDone'>
                    <img src='./assets/img/done.png' alt="">
                    <div class='toDoAmountData'>
                        <span>1</span>
                        <p>Done</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}



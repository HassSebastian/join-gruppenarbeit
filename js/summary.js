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
            <div class='task_overview'>
                <button id='taskInBoard'><span id='taskInBoardAmount'>5</span> <p>Task in Board</p></button>
                <button id='taskInProgress'><span id='taskInProgressAmount'>2</span> <p>Task in Progress</p></button>
                <button id='awaitingFeedback'><span id='awaitingFeedbackAmount'>2</span> <p>Awaiting Feedback</p></button>
            </div>
            <div class='ugency_summary'></div>
            <div class='to_do'></div>
        </div>
    `;
}



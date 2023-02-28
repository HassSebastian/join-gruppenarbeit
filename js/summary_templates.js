function generateSummaryHtml(numberInBoard, numberToDo, numberInProgress, numberAwaitingFeedback, numberDone, numberUrgent) {
	return /*html*/ `
	<div class="summaryContainer">
		<div class="title">
		<span class="kanbanboardTitleSummary"> Kanban Project Management Tool </span>	
		<h3>Summary</h3>
			<img src="./assets/img/vertical_line.png" />
			<h4>Everything in a nutshell!</h4>
		</div>
		<div class="summaryMain">
			<div class="summaryContainerLeft">
				<div class="overview">
					<div class="taskOverview">
						<div id="taskInBoard" onclick="initBoard()">
							<span id="taskInBoardAmount" class="amountSummary">${numberInBoard}</span>
							<p class="nameTask">Task in Board</p>
						</div>
						<div id="taskInProgress" onclick="initBoard()">
							<span id="taskInProgressAmount" class="amountSummary">${numberInProgress}</span>
							<p class="nameTask">Task in Progress</p>
						</div>
						<div id="awaitingFeedback" onclick="initBoard()">
							<span id="awaitingFeedbackAmount" class="amountSummary">${numberAwaitingFeedback}</span>
							<p class="nameTask">Awaiting Feedback</p>
						</div>
					</div>
					<div class="ugencySummary">
						<div class="urgencyCenterContainer">
							<div class="ugent">
								<div class="ugentImgContainer">
									<img class="ugentImg" id="urgentImg" src="./assets/img/summary_urgent.png" />
								</div>
								<div class="ugentAmount">
									<span id="ugencySummaryAmount" class="amountSummary">${numberUrgent}</span>
									<p id="ugencySummaryurgent" class="nameTask">Urgent</p>
								</div>
								
							</div>
							<div class="ugentVerticalLine"></div>
							<div class="deadlineData">
								<p id="deadlineDate"></p>
								<p class="deadlineText" id="deadlineText"><b>24.02.2023 Deadline</b></p>
							</div>
						</div>
					</div>
					<div class="toDoData">
						<div class="toDo" id="toDo" onmouseover="toDoHoverOn()" onmouseout="toDoHoverOff()">
							<img id="toDoImg" src="./assets/img/to_do_pen.png" alt="" />
							<div class="toDoAmountData">
								<span id="toDoAmountTasks" class="amountSummary">${numberToDo}</span>
								<p id="toDoAmountP" class="nameTask">to-Do</p>
							</div>
						</div>
						<div class="toDoDone" id="toDoDone" onmouseover="toDoDoneHoverOn()" onmouseout="toDoDoneHoverOff()">
							<img id="toDoDoneImg" src="./assets/img/done.png" alt="" />
							<div class="toDoAmountData">
								<span id="toDoDoneAmountTasks" class="amountSummary">${numberDone}</span>
								<p id="toDoDoneAmountP" class="nameTask">Done</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="summaryContainerRight">
				<div class="welcome">
					<h4 id="greetUser"></h4>
					<h3>${allUsers[loggedUser[0]].name}</h3>
				</div>
			</div>
		</div>
	</div>
    `;
}

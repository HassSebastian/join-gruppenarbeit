async function initLoginMob(){
	setURL('https://gruppe-407.developerakademie.net/smallest_backend_ever');
	await loadTask();
}





function notAJoinUserButtonMob(){
    document.getElementById('logInMasterContainerMob').classList.add('d-none');
    document.getElementById('signInMasterContainerMob').classList.remove('d-none');
    document.getElementById('notAJoinUserContainerMob').classList.add('d-none');
}

function backToLogInMob(){
    document.getElementById('logInMasterContainerMob').classList.remove('d-none');
    document.getElementById('signInMasterContainerMob').classList.add('d-none');
    document.getElementById('notAJoinUserContainerMob').classList.remove('d-none');
    document.getElementById('contactSucc').classList.add('d-none');
}
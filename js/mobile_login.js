async function initLoginMob() {
    setURL('https://gruppe-407.developerakademie.net/smallest_backend_ever');
    await loadTask();
}


function notAJoinUserButtonMob() {
    document.getElementById('logInMasterContainerMob').classList.add('d-none');
    document.getElementById('signInMasterContainerMob').classList.remove('d-none');
    document.getElementById('notAJoinUserContainerMob').classList.add('d-none');
}


function backToLogInMob() {
    document.getElementById('logInMasterContainerMob').classList.remove('d-none');
    document.getElementById('signInMasterContainerMob').classList.add('d-none');
    document.getElementById('notAJoinUserContainerMob').classList.remove('d-none');
    document.getElementById('contactSucc').classList.add('d-none');
    document.getElementById('forgotPWMasterContainerMob').classList.add('d-none');
}


function showForgotPasswordMob() {
    document.getElementById('logInMasterContainerMob').classList.add('d-none');
    document.getElementById('notAJoinUserContainerMob').classList.add('d-none');
    document.getElementById('forgotPWMasterContainerMob').classList.remove('d-none');
}

function sendMailButton() {
    document.getElementById('sentMassageDoneMaserContainerMob').classList.add('sentMassageDoneMaserContainerMobSlide');
    setTimeout(showPasswordResetCard, 3000);
}

function showPasswordResetCard(){
    document.getElementById('sentMassageDoneMaserContainerMob').classList.add('d-none');
    document.getElementById('forgotPWMasterContainerMob').classList.add('d-none');
    document.getElementById('resetPWMasterContainerMob').classList.remove('d-none');
}

function backToSignInMob() {
    document.getElementById('resetPWMasterContainerMob').classList.add('d-none');
    document.getElementById('signInMasterContainerMob').classList.remove('d-none');
    document.getElementById('pwResetContainerMob').classList.remove('pwResetContainerMobSlide');
}

function resetbuttonContainerMob(){
    document.getElementById('pwResetContainerMob').classList.add('pwResetContainerMobSlide');
    setTimeout(backToSignInMob, 3000);
}
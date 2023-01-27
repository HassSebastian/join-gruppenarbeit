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
    document.getElementById('pwResetContainerMob').classList.remove('pwResetContainerMobSlide');
    document.getElementById('resetPWMasterContainerMob').classList.add('d-none');
}


function showForgotPasswordMob() {
    document.getElementById('logInMasterContainerMob').classList.add('d-none');
    document.getElementById('notAJoinUserContainerMob').classList.add('d-none');
    document.getElementById('forgotPWMasterContainerMob').classList.remove('d-none');
}


let forgotEmailIndex;
function sendMailButton() {
    document.getElementById('requiredEmailForgot').classList.remove('requiredOn');
    document.getElementById('requiredEmailForgot').innerHTML = `This field is required`;
    let inputForgotValue = document.getElementById('inputForgot').value;
    if (inputForgotValue.length == 0) {
        document.getElementById('requiredEmailForgot').classList.add('requiredOn');
    } else {
        for (i = 0; i < allUsers.length; i++) {
            let inputComparison = allUsers[i].email;
            if (inputForgotValue == inputComparison) {
                document.getElementById('requiredEmailForgot').style="color:transparent";
                document.getElementById('sentMassageDoneMaserContainerMob').classList.add('sentMassageDoneMaserContainerMobSlide');
                forgotEmailIndex = i;
                setTimeout(showPasswordResetCard, 3000);
            } else {
                document.getElementById('requiredEmailForgot').classList.add('requiredOn');
                document.getElementById('requiredEmailForgot').innerHTML = `email is not available`;
            }

        }
    }
}



function showPasswordResetCard() {
    document.getElementById('sentMassageDoneMaserContainerMob').classList.add('d-none');
    document.getElementById('forgotPWMasterContainerMob').classList.add('d-none');
    document.getElementById('resetPWMasterContainerMob').classList.remove('d-none');
}

function backToSignInMob() {
    document.getElementById('resetPWMasterContainerMob').classList.add('d-none');
    document.getElementById('signInMasterContainerMob').classList.remove('d-none');
    document.getElementById('pwResetContainerMob').classList.remove('pwResetContainerMobSlide');
}

function resetbuttonContainerMob() {
    document.getElementById('requiredNewPassword').classList.remove('requiredOn');
    document.getElementById('requiredConfirmPassword').classList.remove('requiredOn');
    document.getElementById('requiredNewPassword').innerHTML = `This field is required`;
    document.getElementById('requiredConfirmPassword').innerHTML = `This field is required`;
    let inputNewPassword = document.getElementById('inputNewPassword').value;
    let inputConfirmPassword = document.getElementById('inputConfirmPassword').value;
    if (inputNewPassword == inputConfirmPassword) {
        allUsers[forgotEmailIndex].password = inputNewPassword;
        saveTask();
        document.getElementById('pwResetContainerMob').classList.add('pwResetContainerMobSlide');
        setTimeout(backToLogInMob, 3000);
    } else {
        document.getElementById('requiredNewPassword').classList.add('requiredOn');
        document.getElementById('requiredConfirmPassword').classList.add('requiredOn');
        document.getElementById('requiredNewPassword').innerHTML = `password is not the same`;
        document.getElementById('requiredConfirmPassword').innerHTML = `password is not the same`;
    }
}
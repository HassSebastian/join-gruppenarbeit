let rememberUser = [];


function initSignIn() {
    window.location.href = './signUp.html';
}


function forgotPassword(){
    window.location.href = './forgotMyP_sendMail.html';
}


function guestLogIn() {
    alert('muss noch mit Gast Log in verbunden werden!');
}



// check input formatting
function checkCorrectInput() {
    let email = document.getElementById('inputEmailLogin');
    let password = document.getElementById('inputPasswordLogin');
    let requiredEmail = document.getElementById('requiredEmailLogin');
    let requiredPassword = document.getElementById('requiredPasswordLogin');

    requiredEmail.classList.remove('requiredOn');
    requiredPassword.classList.remove('requiredOn');
    requiredEmail.innerHTML = `This field is required`;
    requiredPassword.innerHTML = `This field is required`;

    if (email.value.length || password.value.length) {
        if (email.value.length < 8 ||
            !email.value.includes('@') ||
            !email.value.includes('.')) {
            requiredEmail.classList.add('requiredOn');
        } else {
            requiredEmail.classList.remove('requiredOn');
        };
        if (password.value.length == 0) {
            requiredPassword.classList.add('requiredOn');
        } else {
            requiredPassword.classList.remove('requiredOn');
        };
        if (!requiredEmail.classList.contains('requiredOn') &&
            !requiredPassword.classList.contains('requiredOn')) {
            userLogin(email.value, password.value);
        }
    }
}


// user login
function userLogin(email, password) {
    let allUsersString = localStorage.getItem('allUsers')
    let requiredEmailLogin = document.getElementById('requiredEmailLogin');
    let requiredPasswordLogin = document.getElementById('requiredPasswordLogin');

    if (allUsersString === null) {
        requiredEmailLogin.classList.add('requiredOn');
        requiredEmailLogin.innerHTML = `No user available. please  <b>Sign up!!</b>`;
        requiredPasswordLogin.classList.add('requiredOn');
        requiredPasswordLogin.innerHTML = `No user available. please  <b>Sign up!!</b>`;
    } else {
        let loginData = JSON.parse(allUsersString);
        let loginStatus = false;
        for (let i = 0; i < loginData.length; i++) {
            let emailData = loginData[i]['email'];
            if (emailData == email) {
                if (loginData[i]['password'] == password) {
                    loginStatus = true;
                }
            }
        }
        if (loginStatus) {
            rememberMe(email, password);

        } else {
            requiredEmailLogin.classList.add('requiredOn');
            requiredEmailLogin.innerHTML = `Email or Password do not match!!`;
            requiredPasswordLogin.classList.add('requiredOn');
            requiredPasswordLogin.innerHTML = `Email or Password do not match!!`;
        }
    }
}


//  remember me checkbox check
function rememberMe(email, password) {
    let checkbox = document.getElementById('checkbox');
    if (checkbox.checked) {
        rememberUserExisting(email, password);
        console.log('check');
    }
    window.location.href = './summary.html';
}


// remember me check - user existing in localstorage
function rememberUserExisting(email, password) {
    let keyQuery = localStorage.getItem('rememberUser');
    if (keyQuery === null) {
        keyQueryNull(email, password);
    } else {
        rememberDoubleUserCheck(email, password);
    }
}


// remember me check - double entries
function rememberDoubleUserCheck(email, password) {
    let doubleUserCheckAtString = localStorage.getItem('rememberUser');
    let rememberUser = JSON.parse(doubleUserCheckAtString);
    let valueToCheck = email;
    let check = 0;
    for (let i = 0; i < rememberUser.length; i++) {
        let testValue = rememberUser[i].email;
        if (testValue === valueToCheck) {
            check = 1;
            break;
        }
    }
    if (check == 1) {
        window.location.href = './summary.html';    
    }else{
        keyQueryOne(email, password);
    }
}


// remember me help fuction -null-
function keyQueryNull(email, password) {
    rememberUser.push({ 'email': email, 'password': password });
    let rememberUserAtString = JSON.stringify(rememberUser);
    localStorage.setItem('rememberUser', rememberUserAtString);
}


// remember me help function -one-
function keyQueryOne(email, password) {
    let rememberUserString = localStorage.getItem('rememberUser');
    rememberUser = JSON.parse(rememberUserString);
    rememberUser.push({ 'email': email, 'password': password });
    let rememberUserAtString = JSON.stringify(rememberUser);
    localStorage.setItem('rememberUser', rememberUserAtString);
}

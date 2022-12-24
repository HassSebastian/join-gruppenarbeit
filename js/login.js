let rememberUser = [];


function initSignIn() {
    window.location.href = './signUp.html';
}

function guestLogIn() {
    alert('muss noch mit Gast Log in verbunden werden!');
}

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
            rememberMe(email.value, password.value);
            // weiterleitung zur RememberMe CheckBox
        }
    }
}


function rememberMe(email, password) {
    let checkbox = document.getElementById('checkbox');
    if (checkbox.checked) {
        console.log('check');
        rememberUser.push({ 'email': email, 'password': password });
        let rememberUserAtString = JSON.stringify(rememberUser);
        localStorage.setItem('rememberUser', rememberUserAtString);
    } else {
        console.log('no check');
        
        // userLogin(email, password)
    }
}
function rememberUserExisting(email, password) {
    let rememberUserString = localStorage.getItem('rememberUser');

    let rememberUser = JSON.parse(rememberUserString);
    let userExisting = false;
    for (let i = 0; i < rememberUser.length; i++) {
        let emailData = rememberUser[i]['email'];
        if (emailData == email) {
            userExisting = true;
        }
    }
    if (userExisting) {
        console.log('ist da');
        window.location.href = './summary.html';

    } else {
        console.log('ist nicht da');
        rememberMe(email, password);
    }

}

function userLogin(email, password) {
    let allUsersString = localStorage.getItem('allUsers')
    if (allUsersString === null) {
        document.getElementById('requiredEmailLogin').classList.add('requiredOn');
        document.getElementById('requiredEmailLogin').innerHTML = `No user available. please  <b>Sign up!!</b>`;
        document.getElementById('requiredPasswordLogin').classList.add('requiredOn');
        document.getElementById('requiredPasswordLogin').innerHTML = `No user available. please  <b>Sign up!!</b>`;
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
            rememberUserExisting(email, password); // Abfrage ob es den User im Localstorage gibt

        } else {
            document.getElementById('requiredEmailLogin').classList.add('requiredOn');
            document.getElementById('requiredEmailLogin').innerHTML = `Email or Password do not match!!`;
            document.getElementById('requiredPasswordLogin').classList.add('requiredOn');
            document.getElementById('requiredPasswordLogin').innerHTML = `Email or Password do not match!!`;
        }
    }
}

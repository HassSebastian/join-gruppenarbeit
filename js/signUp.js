let allUsers = [];


function backToLogIn() {
    window.location.href = './logIn.html';
}


function inputValueTest() {
    let name = document.getElementById('inputNameSignUp');
    let email = document.getElementById('inputEmailSignUp');
    let password = document.getElementById('inputPasswordSignUp');
    let requiredName = document.getElementById('requiredName');
    let requiredEmail = document.getElementById('requiredEmail');
    let requiredPassword = document.getElementById('requiredPassword');
    document.getElementById('requiredEmail').classList.remove('requiredOn');
    document.getElementById('requiredEmail').innerHTML = `This field is required`;
    if (name.value.length || email.value.length || password.value.length) {
        if (name.value.length == 0) {
            requiredName.classList.add('requiredOn');
        } else {
            requiredName.classList.remove('requiredOn');
        };
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
        if (!requiredName.classList.contains('requiredOn') &&
            !requiredEmail.classList.contains('requiredOn') &&
            !requiredPassword.classList.contains('requiredOn')) {
            emailToCheck(name.value, email.value, password.value);
        }
    }
}


function emailToCheck(name, email, password) {
    let allUsersAtString = localStorage.getItem('allUsers');
    if (allUsersAtString === null) {
        allUsers.push({ 'name': name, 'email': email, 'password': password });
        let allUsersAtString = JSON.stringify(allUsers);
        localStorage.setItem('allUsers', allUsersAtString);
    } else {
        let allUsers = JSON.parse(allUsersAtString);
        let valueToCheck = email;
        let check = 0;
        for (let i = 0; i < allUsers.length; i++) {
            let testValue = allUsers[i].email;
            if (testValue === valueToCheck) {
                check = 1;
                break;
            }
        }
        if (check == 1) {
            document.getElementById('requiredEmail').classList.add('requiredOn');
            document.getElementById('requiredEmail').innerHTML = `This email address is already available!!`;
        } else {
            userSignIn(name, email, password);
        }
    }
}


function userSignIn(name, email, password) {
    let keyQuery = localStorage.getItem('allUsers');
    if (keyQuery === null) {
        keyQueryNull(name, email, password);
    } else {
        keyQueryOne(name, email, password);
    }
    window.location.href = './login.html';
}


function keyQueryNull(name, email, password) {
    allUsers.push({ 'name': name, 'email': email, 'password': password });
    let allUsersAtString = JSON.stringify(allUsers);
    localStorage.setItem('allUsers', allUsersAtString);
}


function keyQueryOne(name, email, password) {
    let allUsersString = localStorage.getItem('allUsers');
    allUsers = JSON.parse(allUsersString);
    allUsers.push({ 'name': name, 'email': email, 'password': password });
    let allUsersAtString = JSON.stringify(allUsers);
    localStorage.setItem('allUsers', allUsersAtString);
}

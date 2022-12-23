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
            userSignIn(name.value, email.value, password.value);
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

    // window.location.href = './login.html?msg=Du hast dich erfolgreich registriert';
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



function emailToCheck() {
    const keyToCheck = "allUsers";
    const valueToCheck = { name: "Peter" };
    const valueToCheckAsString = JSON.stringify(valueToCheck);

    const value = localStorage.getItem(keyToCheck);
    if (value === valueToCheckAsString) {
        console.log(`Der Wert '${valueToCheckAsString}' wurde im Local Storage unter dem Schlüssel '${keyToCheck}' gefunden.`);
    } else {
        console.log(`Der Wert '${valueToCheckAsString}' wurde im Local Storage unter dem Schlüssel '${keyToCheck}' nicht gefunden.`);
    }
}
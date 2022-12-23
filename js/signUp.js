let allUsers = [];


function backToLogIn() {
    window.location.href = './logIn.html';
}

function userSignIn() {

    inputValueTest(name, email, password);

    // edited by Bossi
    // first you have to load the file from localStorage before you edited this.
    let allUsersString = localStorage.getItem('allUsers')
    allUsers = JSON.parse(allUsersString);
    // edited by Bossi end

    allUsers.push({ 'name': name.value, 'email': email.value, 'password': password.value });

    let allUsersAtString = JSON.stringify(allUsers);
    localStorage.setItem('allUsers', allUsersAtString);

    window.location.href = './login.html?msg=Du hast dich erfolgreich registriert';
}

function inputValueTest() {
    document.querySelector('#requiredName', '#requiredEmail', '#requiredPassword').classList.remove('requiredOn');

    let name = document.getElementById('inputNameSignUp');
    let email = document.getElementById('inputEmailSignUp');
    let password = document.getElementById('inputPasswordSignUp');

    if (!name.value.length || !email.value.length || !password.value.length) {
        if (name.value.length == 0) {
            document.getElementById('requiredName').classList.add('requiredOn');
        } else {
            document.getElementById('requiredName').classList.remove('requiredOn');
        };
        if (email.value.length <= 8) {
            document.getElementById('requiredEmail').classList.add('requiredOn');
        } else {
            document.getElementById('requiredEmail').classList.remove('requiredOn');
        };
        if (password.value.length == 0) {
            document.getElementById('requiredPassword').classList.add('requiredOn');
        } else {
            document.getElementById('requiredPassword').classList.remove('requiredOn');
        }
        ;
    }else{
        console.log('weiter');
    };
    console.log('fehler');
}
let allUsers = [];


function backToLogIn() {
    window.location.href = './logIn.html';
}

function userSignIn() {
    let name = document.getElementById('inputNameSignUp');
    let email = document.getElementById('inputEmailSignUp');
    let password = document.getElementById('inputPasswordSignUp');

    // edited by Bossi
    // first you have to load the file from localStorage before you edited this.
    let allUsersString = localStorage.getItem('allUsers')
    allUsers = JSON.parse(allUsersString);
    // edited by Bossi end

    allUsers.push({'name': name.value, 'email': email.value, 'password': password.value});

    let allUsersAtString = JSON.stringify(allUsers);
    localStorage.setItem('allUsers', allUsersAtString);
    
    window.location.href = './login.html?msg=Du hast dich erfolgreich registriert';
}
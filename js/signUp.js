let allUsers = [];


function backToLogIn() {
    window.location.href = './logIn.html';
}

function userSignIn() {
    let name = document.getElementById('inputNameSignUp');
    let email = document.getElementById('inputEmailSignUp');
    let password = document.getElementById('inputPasswordSignUp');


    allUsers.push({'name': name.value, 'email': email.value, 'password': password.value});

    let allUsersAtString = JSON.stringify(allUsers);
    localStorage.setItem('allUsers', allUsersAtString);
    
    window.location.href = './login.html?msg=Du hast dich erfolgreich registriert';
}
let allUsers = [];


function backToLogIn() {
    window.location.href = './logIn.html';
}

function userSignIn() {
    let name = document.getElementById('inputNameSignUp').value;
    let email = document.getElementById('inputEmailSignUp').value;
    let password = document.getElementById('inputPasswordSignUp').value;

    let user =     {
        'name': name,
        'email': email,
        'password': password
    }

    allUsers.push(user);

    let allUsersAtString = JSON.stringify(allUsers);
    localStorage.setItem('allUsers', allUsersAtString);
    window.location.href = './login.html';
}
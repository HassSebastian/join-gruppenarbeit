let allUsers = [];


function backToLogIn() {
    window.location.href = './logIn.html';
}

// check input formatting
function inputValueTest() {
    let name = document.getElementById('inputNameSignUp');
    let email = document.getElementById('inputEmailSignUp');
    let password = document.getElementById('inputPasswordSignUp');
    let requiredName = document.getElementById('requiredName');
    let requiredEmail = document.getElementById('requiredEmail');
    let requiredPassword = document.getElementById('requiredPassword');
    requiredEmail.classList.remove('requiredOn');
    requiredEmail.innerHTML = `This field is required`;
    if (name.value.length || email.value.length || password.value.length) {
        if (name.value.length == 0 ||
            name.value[0] === ' ') {
            requiredName.classList.add('requiredOn');
        } else {
            requiredName.classList.remove('requiredOn');
        };
        if (email.value.length < 8 ||
            !email.value.includes('@') ||
            !email.value.includes('.') ||
            email.value[0] === ' ') {
            requiredEmail.classList.add('requiredOn');
        } else {
            requiredEmail.classList.remove('requiredOn');
        };
        if (password.value.length == 0 ||
            password.value[0] === ' ') {
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

// check email existing
function emailToCheck(name, email, password) {
    let allUsersAtString = localStorage.getItem('allUsers');
    let requiredEmail = document.getElementById('requiredEmail');
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
            requiredEmail.classList.add('requiredOn');
            requiredEmail.innerHTML = `This email address is already available!!`;
        } else {
            userSignIn(name, email, password);
        }
    }
}

// save user data and forward to login site
function userSignIn(name, email, password) {
    let keyQuery = localStorage.getItem('allUsers');
    if (keyQuery === null) {
        keyQueryNull(name, email, password);
    } else {
        keyQueryOne(name, email, password);
    }
    window.location.href = './login.html';
}

// save user data help fuction -null-
function keyQueryNull(name, email, password) {
    allUsers.push({ 'name': name, 'email': email, 'password': password });
    let allUsersAtString = JSON.stringify(allUsers);
    localStorage.setItem('allUsers', allUsersAtString);
}

// save user data help function -one-
function keyQueryOne(name, email, password) {
    let allUsersString = localStorage.getItem('allUsers');
    allUsers = JSON.parse(allUsersString);
    allUsers.push({ 'name': name, 'email': email, 'password': password });
    let allUsersAtString = JSON.stringify(allUsers);
    localStorage.setItem('allUsers', allUsersAtString);
}

function passwordShowIcon(){
	document.getElementById('passwordLogo').classList.toggle('d-none');
	document.getElementById('pwShowButton').classList.toggle('d-none');
	if(document.getElementById('passwordLogo').classList.contains('d-none')){
	document.getElementById('inputPasswordSignUp').type="text";
	}else{
		document.getElementById('inputPasswordSignUp').type="password";
	}
}
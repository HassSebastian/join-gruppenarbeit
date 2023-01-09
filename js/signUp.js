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
        firstAndSecondLetter(name, email, password); 
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
            firstAndSecondLetter(name, email, password);
        }
    }
}

function firstAndSecondLetter(name, email, password){
    let vorUndZuName = name;
    let firstLetter = name[0];
    let spaceIndex = name.indexOf(' ');
    let secondName = name.substring(spaceIndex + 1);
    let secondLetter = secondName[0];


    console.log('N',vorUndZuName);
    console.log('FL',firstLetter);
    console.log('SL',secondLetter);
    console.log(firstLetter+secondLetter);

    nameColorCalc(firstLetter, secondLetter, name, email, password);
}
function nameColorCalc(firstLetter, secondLetter, name, email, password){
    let asciiFirstLetter = firstLetter.charCodeAt(0);
    let asciiSecondLetter = secondLetter.charCodeAt(0);
    let sum = asciiFirstLetter + asciiSecondLetter;
    let colorIndex = sum % 10; 	// rersult ist dann die Farbe aus dem colors Array in Zeile 3

    console.log('colorIndex:',colorIndex);
    userSignIn(firstLetter, secondLetter, name, email, password, colorIndex)
}



// save user data and forward to login site
function userSignIn(firstLetter, secondLetter, name, email, password, colorIndex) {
    let keyQuery = localStorage.getItem('allUsers');
    if (keyQuery === null) {
        keyQueryNull(firstLetter, secondLetter, name, email, password, colorIndex);
    } else {
        keyQueryOne(firstLetter, secondLetter, name, email, password, colorIndex);
    }
    signUpDone();
    setTimeout(() => {
        window.location.href = './login.html';
    }, 2000);
}

function signUpDone(){
    document.getElementById('signUpButton').classList.add('d-none');
    document.getElementById('signUpButtonDone').classList.remove('d-none');
}

// save user data help fuction -null-
function keyQueryNull(firstLetter, secondLetter, name, email, password, colorIndex) {
    allUsers.push({ 'name': name, 'email': email, 'password': password, 'colorIndex': colorIndex, 'firstSecondLetter': firstLetter+secondLetter});
    let allUsersAtString = JSON.stringify(allUsers);
    localStorage.setItem('allUsers', allUsersAtString);
	setURL('https://gruppe-407.developerakademie.net/smallest_backend_ever');
	backend.setItem('users', JSON.stringify(users));


}

// save user data help function -one-
function keyQueryOne(firstLetter, secondLetter, name, email, password, colorIndex) {
    let allUsersString = localStorage.getItem('allUsers');
    allUsers = JSON.parse(allUsersString);
    allUsers.push({ 'name': name, 'email': email, 'password': password, 'colorIndex': colorIndex, 'firstSecondLetter': firstLetter+secondLetter});
    let allUsersAtString = JSON.stringify(allUsers);
    localStorage.setItem('allUsers', allUsersAtString);
	setURL('https://gruppe-407.developerakademie.net/smallest_backend_ever');
	backend.setItem('users', JSON.stringify(users));


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
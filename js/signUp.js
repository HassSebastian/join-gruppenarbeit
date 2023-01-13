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
async function emailToCheck(name, email, password) {
    // let allUsersAtString = localStorage.getItem('allUsers');
    await loadTask();
    let requiredEmail = document.getElementById('requiredEmail');
    if (!allUsers) {
        firstAndSecondLetter(name, email, password); 
    } else {
        //let allUsers = JSON.parse(allUsersAtString);
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
            // firstAndSecondLetter(name, email, password);
            calculateAllUserArray(name, email, password);
        }
    }
}


async function calculateAllUserArray(name, email, password){
    let firstLetter = name[0];
    let secondLetter = await calcSecondLetter(name);
    let colorIndex = await calcColorIndex(firstLetter, secondLetter);
    userSignIn(firstLetter, secondLetter, name, email, password, colorIndex);
}

function calcSecondLetter(name){
    let spaceIndex = name.indexOf(' ');
    let secondName = name.substring(spaceIndex + 1);
    let secondLetter = secondName[0];
    return secondLetter;
}

function calcColorIndex(firstLetter, secondLetter){
    let asciiFirstLetter = firstLetter.charCodeAt(0);
    let asciiSecondLetter = secondLetter.charCodeAt(0);
    let sum = asciiFirstLetter + asciiSecondLetter;
    let colorIndex = sum % 10;
    return colorIndex;
}

// save user data and forward to login site
async function userSignIn(firstLetter, secondLetter, name, email, password, colorIndex) {
    await loadTask();
    allUsers.push({ 'name': name, 'email': email, 'password': password, 'colorIndex': colorIndex, 'firstSecondLetter': firstLetter+secondLetter});
    await saveTask();
    signUpDone();
    setTimeout(() => {
        window.location.href = './login.html';
    }, 2000);
}

function signUpDone(){
    document.getElementById('signUpButton').classList.add('d-none');
    document.getElementById('signUpButtonDone').classList.remove('d-none');
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
let rememberUser = [];
let loggedUser = []; //test
let allUsers = [];

function initSignIn() {
	window.location.href = './signUp.html';
}

function forgotPassword() {
	window.location.href = './forgotMyP_sendMail.html';
}

function guestLogIn() {
	const email = 'guest@web.de';
	const password = '123456';
	document.getElementById('inputEmailLogin').value = email;
	document.getElementById('inputPasswordLogin').value = password;
	localStorage.clear();
	userLogin(email, password);
}

/**
 * If the input is correct, then do nothing, otherwise, show the error message.
 */
// check input formatting
function checkCorrectInput() {
	let email = document.getElementById('inputEmailLogin');
	let password = document.getElementById('inputPasswordLogin');
	let requiredEmail = document.getElementById('requiredEmailLogin');
	let requiredPassword = document.getElementById('requiredPasswordLogin');
	resetRequiredLine(email, password, requiredEmail, requiredPassword);
	calculateCheckCorrectInput(email, password, requiredEmail, requiredPassword);
}

/**
 * If the allUsers array is empty, then display a message to the user to register, otherwise, check the
 * user's email and password.
 * @param email - the email the user entered
 * @param password - the password the user entered
 */
// user login
async function userLogin(email, password) {
	await loadTask();
	let requiredEmailLogin = document.getElementById('requiredEmailLogin');
	let requiredPasswordLogin = document.getElementById('requiredPasswordLogin');
	if (allUsers.length == null) {
		pleaseRegister(requiredEmailLogin, requiredPasswordLogin);
	} else {
		statusOK(email, password, requiredEmailLogin, requiredPasswordLogin);
	}
}

/**
 * If the checkbox is checked, then the user's email and password are saved to local storage, and the
 * user is redirected to the summary page.
 * @param email - the email of the user
 * @param password - the password the user entered
 * @param loginStatus - true or false
 */
//  remember me checkbox check
function rememberMe(email, password, loginStatus) {
	let checkbox = document.getElementById('checkbox');
	if (checkbox.checked) {
		rememberUserExisting(email, password);
	}
	loggedUser.push(loginStatus);
	let loggedUserAsString = JSON.stringify(loggedUser);
	localStorage.setItem('loggedUser', loggedUserAsString);
	if (window.innerWidth < 768) {
		window.location.href = './summary_mobile.html';
	} else {
		window.location.href = './summary.html';
	}
}

/**
 * If the localStorage key 'rememberUser' is null, then call the function keyQueryNull, otherwise call
 * the function rememberDoubleUserCheck.
 * @param email - the email address of the user
 * @param password - the password the user entered
 */
// remember me check - user existing in localstorage
function rememberUserExisting(email, password) {
	let keyQuery = localStorage.getItem('rememberUser');
	if (keyQuery === null) {
		keyQueryNull(email, password);
	} else {
		rememberDoubleUserCheck(email, password);
	}
}

/**
 * It checks if the email address is already in localStorage.
 * @param email - the email address of the user
 * @param password - the password that the user entered
 */
// remember me check - double entries
function rememberDoubleUserCheck(email, password) {
	let doubleUserCheckAtString = localStorage.getItem('rememberUser');
	let rememberUser = JSON.parse(doubleUserCheckAtString);
	let valueToCheck = email;
	let check = 0;
	calculateRememberDoubleUserCheck(email, password, rememberUser, valueToCheck, check);
}

/**
 * If the password icon is hidden, show it and change the password input type to "password". If the
 * password icon is not hidden, hide it and change the password input type to "text".
 */
function passwordShowIcon() {
	document.getElementById('passwordLogo').classList.toggle('d-none');
	document.getElementById('pwShowButton').classList.toggle('d-none');
	if (document.getElementById('passwordLogo').classList.contains('d-none')) {
		document.getElementById('inputPasswordLogin').type = 'text';
	} else {
		document.getElementById('inputPasswordLogin').type = 'password';
	}
}

/**
 * If there is a string in localStorage with the key 'rememberUser', then parse the string into an
 * object, push the object into an array, and then set the value of the email and password inputs to
 * the email and password of the object.
 */
function logInAtLocalstorage() {
	let rememberUserString = localStorage.getItem('rememberUser');
	if (rememberUserString) {
		rememberUser = JSON.parse(rememberUserString);
		rememberUser.push(rememberUser);
		document.getElementById('inputEmailLogin').value = `${rememberUser[0].email}`;
		document.getElementById('inputPasswordLogin').value = `${rememberUser[0].password}`;
	}
}

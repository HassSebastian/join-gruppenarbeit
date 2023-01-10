let rememberUser = [];
let loggedUser = [];
let allUsers = [];

function initSignIn() {
	window.location.href = './signUp.html';
}

function forgotPassword() {
	window.location.href = './forgotMyP_sendMail.html';
}

function guestLogIn() {
	alert('muss noch mit Gast Log in verbunden werden!');
}

// check input formatting
function checkCorrectInput() {
	let email = document.getElementById('inputEmailLogin');
	let password = document.getElementById('inputPasswordLogin');
	let requiredEmail = document.getElementById('requiredEmailLogin');
	let requiredPassword = document.getElementById('requiredPasswordLogin');

	requiredEmail.classList.remove('requiredOn');
	requiredPassword.classList.remove('requiredOn');
	requiredEmail.innerHTML = `This field is required`;
	requiredPassword.innerHTML = `This field is required`;

	if (email.value.length || password.value.length) {
		if (
			email.value.length < 8 ||
			!email.value.includes('@') ||
			!email.value.includes('.') ||
			email.value[0] === ' '
		) {
			requiredEmail.classList.add('requiredOn');
		} else {
			requiredEmail.classList.remove('requiredOn');
		}
		if (password.value.length == 0 || email.value[0] === ' ') {
			requiredPassword.classList.add('requiredOn');
		} else {
			requiredPassword.classList.remove('requiredOn');
		}
		if (
			!requiredEmail.classList.contains('requiredOn') &&
			!requiredPassword.classList.contains('requiredOn')
		) {
			userLogin(email.value, password.value);
		}
	}
}

// user login

async function userLogin(email, password) {
	await loadTask();
	let requiredEmailLogin = document.getElementById('requiredEmailLogin');
	let requiredPasswordLogin = document.getElementById('requiredPasswordLogin');
	if (allUsers.length == null) {
		requiredEmailLogin.classList.add('requiredOn');
		requiredEmailLogin.innerHTML = `No user available. please  <b>Sign up!!</b>`;
		requiredPasswordLogin.classList.add('requiredOn');
		requiredPasswordLogin.innerHTML = `No user available. please  <b>Sign up!!</b>`;
	} else {
		let loginStatus;
		for (let i = 0; i < allUsers.length; i++) {
			let emailData = allUsers[i]['email'];
			if (emailData == email) {
				if (allUsers[i]['password'] == password) {
					loginStatus = i;
					break;
				}
			}
		}
		if (loginStatus) {
			rememberMe(email, password, loginStatus);
		} else {
			requiredEmailLogin.classList.add('requiredOn');
			requiredEmailLogin.innerHTML = `Email or Password do not match!!`;
			requiredPasswordLogin.classList.add('requiredOn');
			requiredPasswordLogin.innerHTML = `Email or Password do not match!!`;
		}
	}
}

//  remember me checkbox check
function rememberMe(email, password, loginStatus) {
	let checkbox = document.getElementById('checkbox');
	if (checkbox.checked) {
		rememberUserExisting(email, password);
	}

	loggedUser.push(loginStatus);
	let loggedUserAsString = JSON.stringify(loggedUser);
	localStorage.setItem('loggedUser', loggedUserAsString);

	window.location.href = './summary.html';
}

// remember me check - user existing in localstorage
function rememberUserExisting(email, password) {
	let keyQuery = localStorage.getItem('rememberUser');
	if (keyQuery === null) {
		keyQueryNull(email, password);
	} else {
		rememberDoubleUserCheck(email, password);
	}
}

// remember me check - double entries
function rememberDoubleUserCheck(email, password) {
	let doubleUserCheckAtString = localStorage.getItem('rememberUser');
	let rememberUser = JSON.parse(doubleUserCheckAtString);
	let valueToCheck = email;
	let check = 0;
	for (let i = 0; i < rememberUser.length; i++) {
		let testValue = rememberUser[i].email;
		if (testValue === valueToCheck) {
			check = 1;
			break;
		}
	}
	if (check == 1) {
		window.location.href = './summary.html';
	} else {
		keyQueryOne(email, password);
	}
}

// remember me help fuction -null-
function keyQueryNull(email, password) {
	rememberUser.push({ email: email, password: password });
	let rememberUserAtString = JSON.stringify(rememberUser);
	localStorage.setItem('rememberUser', rememberUserAtString);
}

// remember me help function -one-
function keyQueryOne(email, password) {
	let rememberUserString = localStorage.getItem('rememberUser');
	rememberUser = JSON.parse(rememberUserString);
	rememberUser.push({ email: email, password: password });
	let rememberUserAtString = JSON.stringify(rememberUser);
	localStorage.setItem('rememberUser', rememberUserAtString);
}

function passwordShowIcon() {
	document.getElementById('passwordLogo').classList.toggle('d-none');
	document.getElementById('pwShowButton').classList.toggle('d-none');
	if (document.getElementById('passwordLogo').classList.contains('d-none')) {
		document.getElementById('inputPasswordLogin').type = "text";
	} else {
		document.getElementById('inputPasswordLogin').type = "password";
	}
}
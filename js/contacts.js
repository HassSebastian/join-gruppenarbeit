let alphabetOrd = {
	A: [],
	B: [],
	C: [],
	D: [],
	E: [],
	F: [],
	G: [],
	H: [],
	I: [],
	J: [],
	K: [],
	L: [],
	M: [],
	N: [],
	O: [],
	P: [],
	Q: [],
	R: [],
	S: [],
	T: [],
	U: [],
	V: [],
	W: [],
	X: [],
	Y: [],
	Z: [],
};

let newContactUser = [];
let colorIndex = ['#02CF2F', '#EE00D6', '#0190E0', '#FF7200', '#FF2500', '#AF1616', '#FFC700', '#3E0099', '#462F8A', '#FF7A00', '#000000'];
let check = 0;

/**
 * This function is called when the user clicks on the contacts button in the menu. It loads the
 * contacts page and renders the content.
 */
async function initContacts() {
	await enableContactsStyles();
	// document.getElementById('stylsheetAddTaskMobil').disabled = true;
	// document.getElementById('stylesheetAddTask').disabled = false;
	// document.querySelector('.sliderMenu').classList.remove('showSliderMenu');
	await loadTask();
	await renderContent();
	selectedMenuButton(4);
	await userInAlphabetArray();
	loadContributorsLetter();
	coworkersToAssignTo = transferallUserData();
}

/**
 * It takes the HTML from the renderContentHTML() function and puts it into the content div.
 */
async function renderContent() {
	document.getElementById('content').innerHTML = '';
	document.getElementById('content').innerHTML = renderContentHTML();
}

/**
 * This function is called when the user clicks the "Submit" button. It calls the
 * calculateUserInAlphabetArray() function, which calculates the number of times each letter in the
 * alphabet appears in the user's input, and then it calls the alphabet() function, which displays the
 * results.
 */
async function userInAlphabetArray() {
	alphabetOrd = {
		A: [],
		B: [],
		C: [],
		D: [],
		E: [],
		F: [],
		G: [],
		H: [],
		I: [],
		J: [],
		K: [],
		L: [],
		M: [],
		N: [],
		O: [],
		P: [],
		Q: [],
		R: [],
		S: [],
		T: [],
		U: [],
		V: [],
		W: [],
		X: [],
		Y: [],
		Z: [],
	};
	calculateUserInAlphabetArray();
	alphabet();
}

/**
 * It clears the contact list and then calls the calculateAndShowAlphabet function.
 */
function alphabet() {
	document.getElementById('Contact_list').innerHTML = '';
	calculateAndShowAlphabet();
}

/**
 * It removes the class 'd-none' from the element with the id 'edit_contact', then it sets the
 * innerHTML of that element to the return value of the function openEditContactHTML(color, letter,
 * name, email, phone).
 * @param i - the index of the user in the array
 */
function openEditContact(i) {
	let color = allUsers[i].colorIndex;
	let letter = allUsers[i].firstSecondLetter;
	let name = allUsers[i].name;
	let email = allUsers[i].email;
	let phone = allUsers[i].phone;
	if (email == 'guest@web.de') {
	} else {
		document.getElementById('edit_contact').classList.remove('d-none');
		document.getElementById('edit_contact').innerHTML = '';
		document.getElementById('edit_contact').innerHTML = openEditContactHTML(color, letter, name, email, phone, i);
		setTimeout(() => {
			document.getElementById('edit_contact').classList.add('add_contact_slide');
		}, 1);
	}
}

/**
 * It opens a new contact form.
 */
function openNewContact() {
	document.getElementById('new_contact').classList.remove('d-none');
	document.getElementById('new_contact').innerHTML = '';
	document.getElementById('new_contact').innerHTML = openNewContactHTML();
	setTimeout(() => {
		document.getElementById('new_contact').classList.add('add_contact_slide');
	}, 1);
}

function closeNewContact() {
	window.innerWidth < 769 ? renderContentMobile() : document.getElementById('new_contact').classList.remove('add_contact_slide');
	setTimeout(() => {
		document.getElementById('new_contact').classList.add('d-none');
	}, 500);
}

/**
 * If the window width is less than 769px, render the content for mobile, otherwise remove the class
 * 'add_contact_slide' from the element with the id 'edit_contact'.
 *
 * After 500ms, add the class 'd-none' to the element with the id 'edit_contact'.
 */
function closeEditContact() {
	window.innerWidth < 769 ? renderContentMobile() : document.getElementById('edit_contact').classList.remove('add_contact_slide');
	setTimeout(() => {
		document.getElementById('edit_contact').classList.add('d-none');
	}, 500);
}

/**
 * It takes the index of the user in the array, and then uses that index to get the user's name, email,
 * phone, first and second letter of their name, and the color index of their name. Then it passes all
 * of that information to the showContactQuerry function.
 * @param i - the index of the user in the allUsers array
 */
function showContact(i) {
	let name = allUsers[i].name;
	let email = allUsers[i].email;
	let phone = allUsers[i].phone;
	let letter = allUsers[i].firstSecondLetter;
	let color = allUsers[i].colorIndex;
	let showContact = document.getElementById('showContact');
	showContactQuerry(name, email, phone, letter, color, i, showContact);
}

/**
 * If the user is not logged in as a guest, then run the addContactHelp function.
 */
async function addContact() {
	if (!guestLoggedIn) {
		let name = document.getElementById('newUserName');
		let email = document.getElementById('newUserEmail');
		let phone = document.getElementById('newUserPhone');
		let newNameRequired = document.getElementById('newContentNameRequired');
		let newEmailRequired = document.getElementById('newContentEmailRequired');
		let newPhoneRequired = document.getElementById('newContentPhoneRequired');
		addContactHelp(name, email, phone, newNameRequired, newEmailRequired, newPhoneRequired);
	}
	if (guestLoggedIn) alert('Sorry, does not work with guest status!');
}

/**
 * If the email is required, then check the email, otherwise check the phone.
 * @param newEmailRequired - boolean
 * @param name - the name of the person who is being checked
 * @param email - the email address to check
 * @param phone - the phone number of the person
 */
function comparisonEmail(newEmailRequired, name, email, phone) {
	let valueToCheck = email;
	comparisonEmailHelp(newEmailRequired, name, email, phone, valueToCheck);
}

/**
 * This function takes in a name, email, and phone number, and then adds the contact to the
 * allUserArray.
 * @param name - string
 * @param email - "test@test.com"
 * @param phone - string
 */
async function calculateNewAllUserArray(name, email, phone) {
	let firstLetter = name[0].toUpperCase();
	let secondLetter = await calcSecondLetter(name);
	let colorIndex = await calcColorIndex(firstLetter, secondLetter);
	addContactSave(name, email, phone, firstLetter, secondLetter, colorIndex);
}

/**
 * It takes the value of the input field with the id of "editContactName" and sets the innerHTML of the
 * element with the id of "contactName" to that value.
 * @param i - The index of the contact to edit.
 */
function saveEditContact(i) {
	editContact(i);
}

/**
 * It takes the values from the input fields, and then calls the function editContactSave() with the
 * values and the index of the user in the array.
 * @param i - the index of the user in the allUsers array
 */
async function editContact(i) {
	let name = document.getElementById('editUserName').value;
	let email = document.getElementById('editUserEmail').value;
	let phone = document.getElementById('editUserPhone').value;
	let password = allUsers[i].password;
	let firstLetter = name[0].toUpperCase();
	let secondLetter = await calcSecondLetter(name);
	let colorIndex = await calcColorIndex(firstLetter, secondLetter);
	editContactSave(name, email, password, phone, firstLetter, secondLetter, colorIndex, i);
}

/**
 * It deletes a contact from the array and then re-renders the content.
 * </code>
 * @param i - the index of the user in the array
 */
async function deleteContactQuestion(i) {
	let letter = allUsers[i].firstSecondLetter;
	let email = allUsers[i].email;
	let deleteQuestion = document.getElementById('deleteContactQuestion');
	let deleteQuestionInner = document.getElementById('deleteContactQuestion').innerHTML;
	if (letter === deleteQuestionInner) {
		if (email == 'guest@web.de') {
		} else {
			deleteQuestion.innerHTML = `Delete?`;
			deleteQuestion.style = 'font-size: 30px';
		}
	} else {
		allUsers.splice(i, 1);
		await saveTask();
		await renderContent();
		await userInAlphabetArray();
	}
}

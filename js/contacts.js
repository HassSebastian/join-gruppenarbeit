let alphabetOrd = { A: [], B: [], C: [], D: [], E: [], F: [], G: [], H: [], I: [], J: [], K: [], L: [], M: [], N: [], O: [], P: [], Q: [], R: [], S: [], T: [], U: [], V: [], W: [], X: [], Y: [], Z: [] };
let newContactUser = [];
let colorIndex = ['#02CF2F', '#EE00D6', '#0190E0', '#FF7200', '#FF2500', '#AF1616', '#FFC700', '#3E0099', '#462F8A', '#FF7A00', '#000000'];


/**
 * This function is called when the user clicks on the contacts button in the menu. It loads the
 * contacts page and renders the content.
 */
async function initContacts() {
    await includeHTML();
    await loadTask();
    selectedMenuButton(4);
    renderContent();
    userInAlphabetArray();
    loadContributorsLetter();
}


/**
 * It takes the HTML from the renderContentHTML() function and puts it into the content div.
 */
function renderContent() {
    document.getElementById('content').innerHTML = '';
    document.getElementById('content').innerHTML = renderContentHTML();
}


/**
 * This function is called when the user clicks the "Submit" button. It calls the
 * calculateUserInAlphabetArray() function, which calculates the number of times each letter in the
 * alphabet appears in the user's input, and then it calls the alphabet() function, which displays the
 * results.
 */
function userInAlphabetArray() {
    alphabetOrd = { A: [], B: [], C: [], D: [], E: [], F: [], G: [], H: [], I: [], J: [], K: [], L: [], M: [], N: [], O: [], P: [], Q: [], R: [], S: [], T: [], U: [], V: [], W: [], X: [], Y: [], Z: [] };
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
    document.getElementById('edit_contact').classList.remove('d-none')
    document.getElementById('edit_contact').innerHTML = '';
    document.getElementById('edit_contact').innerHTML = openEditContactHTML(color, letter, name, email, phone);
}


/**
 * It opens a new contact form.
 */
function openNewContact() {
    document.getElementById('new_contact').innerHTML = '';
    document.getElementById('new_contact').innerHTML = openNewContactHTML();
    document.getElementById('new_contact').classList.remove('d-none');
    closeEditContact();
}


/**
 * It adds the class 'd-none' to the element with the id 'new_contact'.
 */
function closeNewContact() {
    document.getElementById('new_contact').classList.add('d-none');
}


/**
 * It adds the class 'd-none' to the element with the id 'edit_contact'.
 */
function closeEditContact() {
    document.getElementById('edit_contact').classList.add('d-none');
}


/**
 * It takes the index of the user in the array, and then it gets the name, email, phone, letter, and
 * color of that user, and then it removes the class 'd-none' from the div with the id 'showContact',
 * and then it sets the innerHTML of that div to the HTML returned by the function showContactHTML.
 * @param i - the index of the user in the allUsers array
 */
function showContact(i) {
    let name = allUsers[i].name;
    let email = allUsers[i].email;
    let phone = allUsers[i].phone;
    let letter = allUsers[i].firstSecondLetter;
    let color = allUsers[i].colorIndex;
    document.getElementById('showContact').classList.remove('d-none')
    document.getElementById('showContact').innerHTML = '';
    document.getElementById('showContact').innerHTML = showContactHTML(name, email, phone, letter, color); 
}


/**
 * AddContact() is an async function that takes the values of the input fields, calculates the first
 * and second letters of the name, and then calculates the color index, and then calls the
 * addContactSave() function.
 */
async function addContact() {
    let name = document.getElementById('newUserName').value;
    let email = document.getElementById('newUserEmail').value;
    let phone = document.getElementById('newUserPhone').value;
    let firstLetter = name[0];
    let secondLetter = await calcSecondLetter(name);
    let colorIndex = await calcColorIndex(firstLetter, secondLetter);
    addContactSave(name, email, phone, firstLetter, secondLetter, colorIndex);
}


/**
 * If the user is logged in, then the user can edit his/her own data.
 * @param i - the id of the contact
 */
function saveEditContact(i) {
    let nameId = i;
    let logUserId = loggedUser[0];
    // jeder darf nur seine eigenen Daten ändern
    if (nameId == logUserId) {
        editContact(i);
    } else {
        document.getElementById('saveEditButton').innerHTML = `No Authorization`;
    }
}


/**
 * It takes the values from the input fields, and then calls the function editContactSave() with the
 * values and the index of the user to be edited.
 * @param i - the index of the user in the array
 */
async function editContact(i) {
    let name = document.getElementById('editUserName').value;
    let email = document.getElementById('editUserEmail').value;
    let phone = document.getElementById('editUserPhone').value;
    let password = allUsers[i].password;
    let firstLetter = name[0];
    let secondLetter = await calcSecondLetter(name);
    let colorIndex = await calcColorIndex(firstLetter, secondLetter);
    editContactSave(name, email, password, phone, firstLetter, secondLetter, colorIndex, i);
}
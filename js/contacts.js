let alphabetOrd = { A: [], B: [], C: [], D: [], E: [], F: [], G: [], H: [], I: [], J: [], K: [], L: [], M: [], N: [], O: [], P: [], Q: [], R: [], S: [], T: [], U: [], V: [], W: [], X: [], Y: [], Z: [] };
let newContactUser = [];
let colorIndex = ['#02CF2F', '#EE00D6', '#0190E0', '#FF7200', '#FF2500', '#AF1616', '#FFC700', '#3E0099', '#462F8A', '#FF7A00', '#000000'];


/**
 * This function is called when the user clicks on the contacts button in the menu. It loads the
 * contacts page and renders the content.
 */
async function initContacts() {
    // await includeHTML();
    document.getElementById('stylsheetAddTaskMobil').disabled = true;
    document.getElementById('stylesheetAddTask').disabled = false;
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
    document.getElementById('edit_contact').innerHTML = openEditContactHTML(color, letter, name, email, phone, i);
    setTimeout(() => { document.getElementById('edit_contact').classList.add('add_contact_slide') }, 1);
}


/**
 * It opens a new contact form.
 */
function openNewContact() {
    document.getElementById('new_contact').classList.remove('d-none')
    document.getElementById('new_contact').innerHTML = '';
    document.getElementById('new_contact').innerHTML = openNewContactHTML();
    setTimeout(() => { document.getElementById('new_contact').classList.add('add_contact_slide') }, 1);
}


/**
 * It adds the class 'd-none' to the element with the id 'new_contact'.
 */
function closeNewContact() {
    if (document.getElementById('mobilContent')) {
        renderContentMobile();
    } else {
        document.getElementById('new_contact').classList.remove('add_contact_slide');
        setTimeout(() => { document.getElementById('new_contact').classList.add('d-none') }, 500);
    }
}


/**
 * It adds the class 'd-none' to the element with the id 'edit_contact'.
 */
function closeEditContact() {
    if (document.getElementById('mobilContent')) {
        renderContentMobile();
    } else {
        document.getElementById('edit_contact').classList.remove('add_contact_slide');
        setTimeout(() => { document.getElementById('edit_contact').classList.add('d-none') }, 500);
    }
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
    let showContact = document.getElementById('showContact');
    if (document.getElementById('mobilContent')) {
        document.getElementById('mobilContent').innerHTML = '';
        document.getElementById('mobilContent').innerHTML = showContactHTMLMob(name, email, phone, letter, color, i);
    } else {
        showContact.classList.remove('d-none')
        if (showContact.classList.contains('showContactSlide')) {
            showContact.classList.remove('showContactSlide');
            setTimeout(showContactHelp, 700, name, email, phone, letter, color, i, showContact);
        } else {
            showContactHelp(name, email, phone, letter, color, i, showContact);
        }
    }
}


function showContactHelp(name, email, phone, letter, color, i, showContact) {
    showContact.innerHTML = '';
    showContact.innerHTML = showContactHTML(name, email, phone, letter, color, i);
    showContact.classList.add('showContactSlide');
}


/**
 * AddContact() is an async function that takes the values of the input fields, calculates the first
 * and second letters of the name, and then calculates the color index, and then calls the
 * addContactSave() function.
 */
async function addContact() {
    let name = document.getElementById('newUserName');
    let email = document.getElementById('newUserEmail');
    let phone = document.getElementById('newUserPhone');
    let newNameRequired = document.getElementById('newContentNameRequired');
    let newEmailRequired = document.getElementById('newContentEmailRequired');
    let newPhoneRequired = document.getElementById('newContentPhoneRequired');
    if (name.value.length || email.value.length || phone.value.length) {
        if (name.value.length == 0 ||
            name.value[0] === ' ') {
            newNameRequired.classList.remove('d-none');
            newNameRequired.classList.add('requiredOn');
        } else {
            newNameRequired.classList.remove('requiredOn');
            newNameRequired.classList.add('d-none');
        };
        if (email.value.length < 8 ||
            !email.value.includes('@') ||
            !email.value.includes('.') ||
            email.value[0] === ' ') {
            newEmailRequired.classList.remove('d-none');
            newEmailRequired.classList.add('requiredOn');
        } else {
            newEmailRequired.classList.remove('requiredOn');
            newEmailRequired.classList.add('d-none');
        };
        if (phone.value.length < 8 ||
            phone.value[0] === ' ') {
            newPhoneRequired.classList.remove('d-none');
            newPhoneRequired.classList.add('requiredOn');
        } else {
            newPhoneRequired.classList.remove('requiredOn');
            newPhoneRequired.classList.add('d-none');
        };
        if (!newNameRequired.classList.contains('requiredOn') &&
            !newEmailRequired.classList.contains('requiredOn') &&
            !newPhoneRequired.classList.contains('requiredOn')) {
            comparisonEmail(newEmailRequired, name.value, email.value, phone.value);
        }
    }
}


function comparisonEmail(newEmailRequired, name, email, phone) {
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
        newEmailRequired.classList.add('requiredOn');
        newEmailRequired.innerHTML = `This email address is already available!!`;
    } else {
        calculateNewAllUserArray(name, email, phone);
    }
}


async function calculateNewAllUserArray(name, email, phone) {
    let firstLetter = name[0].toUpperCase();
    let secondLetter = await calcSecondLetter(name);
    let colorIndex = await calcColorIndex(firstLetter, secondLetter);
    addContactSave(name, email, phone, firstLetter, secondLetter, colorIndex);
}


/**
 * If the user is logged in, then the user can edit his/her own data.
 * @param i - the id of the contact
 */
function saveEditContact(i) {
    editContact(i);

    // let nameId = i;
    // let logUserId = loggedUser[0];
    // // jeder darf nur seine eigenen Daten ändern
    // if (nameId == logUserId) {
    //     editContact(i);
    // } else {
    //     document.getElementById('saveEditButton').innerHTML = `No Authorization`;
    // }
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


async function deleteContactQuestion(i) {
    let letter = allUsers[i].firstSecondLetter;
    let deleteQuestion = document.getElementById('deleteContactQuestion');
    let deleteQuestionInner = document.getElementById('deleteContactQuestion').innerHTML;
    if (letter === deleteQuestionInner) {
        deleteQuestion.innerHTML = `Delete?`;
        deleteQuestion.style = "font-size: 30px";
    } else {
        allUsers.splice(i, 1);
        await saveTask();
        await renderContent();
        await userInAlphabetArray();
    }
}

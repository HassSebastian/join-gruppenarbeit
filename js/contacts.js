let alphabetOrd = { A: [], B: [], C: [], D: [], E: [], F: [], G: [], H: [], I: [], J: [], K: [], L: [], M: [], N: [], O: [], P: [], Q: [], R: [], S: [], T: [], U: [], V: [], W: [], X: [], Y: [], Z: [] };

let colorIndex = [
    '#02CF2F',
    '#EE00D6',
    '#0190E0',
    '#FF7200',
    '#FF2500',
    '#AF1616',
    '#FFC700',
    '#3E0099',
    '#462F8A',
    '#FF7A00',
    '#000000',
];


async function initContacts() {

    await includeHTML();
    await loadTask();
    selectedMenuButton(4);
    renderContent();
    userInAlphabetArray();
    loadContributorsLetter();

}

function userInAlphabetArray() {
    alphabetOrd = { A: [], B: [], C: [], D: [], E: [], F: [], G: [], H: [], I: [], J: [], K: [], L: [], M: [], N: [], O: [], P: [], Q: [], R: [], S: [], T: [], U: [], V: [], W: [], X: [], Y: [], Z: [] };

    for (let i = 0; i < allUsers.length; i++) {
        let id = i;
        let colorIndex = allUsers[i].colorIndex;
        let name = allUsers[i].name;
        let email = allUsers[i].email;
        let letter = allUsers[i].firstSecondLetter;
        let firstLetter = allUsers[i].firstSecondLetter[0];
        alphabetOrd[firstLetter].push({ 'name': name, 'email': email, 'id': id, 'letter': letter, 'colorIndex': colorIndex });
    }
    alphabet();
}

function alphabet() {
    document.getElementById('Contact_list').innerHTML = '';
    for (let wertNachDemArray in alphabetOrd) {
        if (alphabetOrd[wertNachDemArray].length > 0) {
            document.getElementById('Contact_list').innerHTML += /*html*/ `
        <div class="letters">
                <span><b>${wertNachDemArray}</b></span>
        </div>
        <div id='${wertNachDemArray}'></div> 
        `;
            for (i = 0; i < alphabetOrd[wertNachDemArray].length; i++) {
                let name = alphabetOrd[wertNachDemArray][i].name;
                let color = alphabetOrd[wertNachDemArray][i].colorIndex;
                let email = alphabetOrd[wertNachDemArray][i].email;
                let id = alphabetOrd[wertNachDemArray][i].id;
                let letter = alphabetOrd[wertNachDemArray][i].letter;
                document.getElementById(wertNachDemArray).innerHTML += /*html*/`
                <div class="contact" id="contact${i}" onclick="showContact(${id})">
                    <div class="ellipse" style='background:${colorIndex[color]}'>
                        <span>${letter}</span>
                    </div>
                    <div class="name_and_email">
                        <div class="name">
                            <span>${name}</span>
                        </div>
                        <div class="email">${email}</div>
                    </div>
                </div>
			    `;
            }
        }
    }
}

async function renderContent() {
    document.getElementById('content').innerHTML = '';
    document.getElementById('content').innerHTML = /*html*/`
        <div>
            <div class="Frame_97">
                <div class="Contact_list" id="Contact_list"></div>
            </div>
            <div class="showContact" id="showContact"></div>
            <div class="better_with_a_team">
                <h1>Contacts</h1>
                <div class="vector_5"></div>
                <span>Better with a team</span>
            </div>
            <div class="new_contact" onclick="openNewContact()">
                <span>New contact</span>
                <img src="assets/img/add_contact_icon.png" alt="">
            </div>
            <div class="add_contact d-none" id="new_contact"></div>
            <div class="add_contact d-none" id="edit_contact"></div>
        </div>
    `;
}


function openEditContact(i) {
    let color = allUsers[i].colorIndex;
    let letter = allUsers[i].firstSecondLetter;
    let name = allUsers[i].name;
    let email = allUsers[i].email;

    document.getElementById('edit_contact').classList.remove('d-none')
    document.getElementById('edit_contact').innerHTML /*html*/ = '';
    document.getElementById('edit_contact').innerHTML = /*html*/ `   
        <div class="overlayAdd">

            <div class="blackSite">
                <div class="blackSiteContainer">
                    <span class="fontAddContact">Edit contact</span>
                    <div class="editContactVector"></div>
                    <div class="logoContainer">
                        <img class="editContactLogo" src="./assets/img/join_logo.png">
                    </div>
                </div>
            </div>
            <img onclick="closeEditContact()" class="close_logo" src="./assets/img/close_logo.png">
            <div class="name_logo_inContainer">
                <div class="elypse" style='background:${colorIndex[color]}'>
                    <span>${letter}</span>
                </div>
            </div>
            <div class="buttonOutContainer">
                <div class="buttonInContainer">
                    <button onclick="contacts()" class="save">
                        <span>Save</span>
                    </button>
                </div>
            </div>
            <div class="contactContainer">
                <div class="nameOutContainer">
                    <div class="nameContainer">
                        <div class="inputEditContainer">
                            <input class="inputName" type="text" placeholder="${name}">
                            <img src="./assets/img/name_logo.png" alt="">
                        </div>
                        <span class="required">This field is required</span>
                    </div>
                    <div class="nameContainer">
                        <div class="inputEditContainer">
                            <input class="inputName" type="email" placeholder="${email}">
                            <img src="./assets/img/email_Logo.png" alt="">
                        </div>
                        <span class="required">This field is required</span>
                    </div>
                    <div class="nameContainer">
                        <div class="inputEditContainer">
                            <input class="inputName" type="number" placeholder="+49 2222 222 22 2">
                            <img src="./assets/img/phoneLogo.png" alt="">
                        </div>
                        <span class="required">This field is required</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function openNewContact() {
    document.getElementById('new_contact').innerHTML = '';
    document.getElementById('new_contact').innerHTML = /*html*/`
        <div class="add_contact_left">
            <img src="assets/img/join_logo.png" alt="">
            <h1>Add contact</h1>
            <span>Tasks are better with a team!</span>
            <div class="add_contact_vector_5 "></div>
        </div>
        <div class="add_contact_right">
            <img src="assets/img/empty_profile_picture.png" alt="">
            <div class="add_contact_inputs">
                <input type="text" placeholder="Name" id="contactName" required="required">
                <input type="text" placeholder="Email" id="contactEmail" required="required">
                <input type="text" placeholder="Phone" id="contactPhone" required="required">
                <div class="add_contact_right_buttons">
                    <div class="contact_cancel" onclick="closeNewContact()">
                        <span>Cancel</span>
                        <img src="assets/img/new_cat_cancel.png" alt="">
                    </div>
                    <div class="contact_create" onclick="addContact()">
                        <span>Create contact</span>
                        <img src="assets/img/akar-icons_check_white.png" alt="">
                    </div>
                </div>
            </div>
        </div>
    `;
    document.getElementById('new_contact').classList.remove('d-none');
    closeEditContact();
}

function closeNewContact() {
    document.getElementById('new_contact').classList.add('d-none');
}

function closeEditContact() {
    document.getElementById('edit_contact').classList.add('d-none');
}

function showContact(i) {
    let name = allUsers[i].name;
    let email = allUsers[i].email;
    // let phone = allUsers[i].phone;
    let letter = allUsers[i].firstSecondLetter;

    let color = allUsers[i].colorIndex;

    document.getElementById('showContact').classList.remove('d-none')
    document.getElementById('showContact').innerHTML = '';
    document.getElementById('showContact').innerHTML = /*html*/ `
        <div>
            <div class="show_contact_ellipse_5" style='background:${colorIndex[color]}'>
                <span>${letter}</span>
            </div>
            <div class="showContact_Name_addTask">
                <h1>${name}</h1>
                <span>+ Add Task</span>
            </div>
        </div>
        <div class="showContact_information_edit">
            <div class="contact_information">
                <div class="contact_information_edit">
                    <h2>Contact Information</h2>
                    <div class="edit_contact" onclick="openEditContact(${i})">
                        <img src="assets/img/edit_button_black.png" alt="">
                        <span>Edit Contact</span>
                    </div>
                </div>
                <h3>Email</h3>
                <span>${email}</span>
                <h3>Phone</h3>
                <p>Telefonnummer</p>
            </div>
        </div>
    `;
}

function addContact() {
    var contact = {};

    inputName = document.getElementById('contactName').value;
    contact.name = inputName.charAt(0).toUpperCase() + inputName.slice(1);
    contact.email = document.getElementById('contactEmail').value;
    contact.phone = document.getElementById('contactPhone').value;
    contact.id = contacts.length;


    contacts.push(contact);
    closeNewContact();
    user();
}

function editContact(i) {
    var contact = {};

    inputName = document.getElementById('editContactName').value;
    contact.name = inputName.charAt(0).toUpperCase() + inputName.slice(1);
    contact.email = document.getElementById('editContactEmail').value;
    contact.phone = document.getElementById('editContactPhone').value;
    contact.id = contacts.length;

    contacts.splice(i, 1, contact);
    showContact(i)
    closeEditContact();
    user();
}

function deleteContact(i) {
    contacts.splice(i, 1);
    user();
    closeEditContact();
    document.getElementById('showContact').classList.add('d-none')
}

function contacts() {
    alert('Verbindung zu contacts herstellen!!!');
}

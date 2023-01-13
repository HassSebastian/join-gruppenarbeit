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

let newContactUser = [];

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
    for (let alphabetLetter in alphabetOrd) {
        if (alphabetOrd[alphabetLetter].length > 0) {
            document.getElementById('Contact_list').innerHTML += /*html*/ `
        <div class="letters">
                <span><b>${alphabetLetter}</b></span>
        </div>
        <div id='${alphabetLetter}'></div> 
        `;
            for (i = 0; i < alphabetOrd[alphabetLetter].length; i++) {
                let name = alphabetOrd[alphabetLetter][i].name;
                let color = alphabetOrd[alphabetLetter][i].colorIndex;
                let email = alphabetOrd[alphabetLetter][i].email;
                let id = alphabetOrd[alphabetLetter][i].id;
                let letter = alphabetOrd[alphabetLetter][i].letter;
                document.getElementById(alphabetLetter).innerHTML += /*html*/`
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
    let phone = allUsers[i].phone;

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
                    <button onclick="saveEditContact(${i})" class="save">
                        <span id="saveEditButton">Save</span>
                    </button>
                </div>
            </div>
            <div class="contactContainer">
                <div class="nameOutContainer">
                    <div class="nameContainer">
                        <div class="inputEditContainer">
                            <input class="inputName" type="text" value="${name}">
                            <img src="./assets/img/name_logo.png" alt="">
                        </div>
                        <span class="required">This field is required</span>
                    </div>
                    <div class="nameContainer">
                        <div class="inputEditContainer">
                            <input class="inputName" type="email" value="${email}">
                            <img src="./assets/img/email_Logo.png" alt="">
                        </div>
                        <span class="required">This field is required</span>
                    </div>
                    <div class="nameContainer">
                        <div class="inputEditContainer">
                            <input class="inputName" type="number" value="${phone}">
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
        <div class="overlayAdd">
            <div class="blackSite">
                <div class="blackSiteContainer">
                    <span class="fontAddContact">Add contact</span>
                    <span class="fontTaskArBetter">Tasks are better with a team!</span>
                    <div class="editContactVector"></div>
                    <div class="logoContainer">
                        <img class="editContactLogo" src="./assets/img/join_logo.png">
                    </div>
                </div>
            </div>
            <img onclick="closeNewContact()" class="close_logo" src="./assets/img/close_logo.png">
            <div class="name_logo_inContainer">
                <div class="elypse">
                    <img src="./assets/img/nameLogoOverlay.png">
                </div>
            </div>
            <div class="buttonNewOutContainer">
                <div class="buttonInContainer">
                    <button onclick="closeNewContact()" class="cancel" onmouseover="cancelOn()" onmouseout="cancelOff()">
                        <span>Cancel</span>
                        <img id="cancelImg" width="13px" height="13px" src="./assets/img/close_logo.png">
                    </button>
                    <button onclick="addContact()" class="createContact">
                        <span>Create contact</span>
                        <img src="./assets/img/okHaeckchen.png">
                    </button>
                </div>
            </div>
            <div class="contactContainer">
                <div class="nameOutContainer">
                    <div class="nameContainer">
                        <div class="inputEditContainer">
                            <input class="inputName" id="contactName" type="text" placeholder="Name">
                            <img src="./assets/img/name_logo.png" alt="">
                        </div>
                        <span class="required">This field is required</span>
                    </div>
                    <div class="nameContainer">
                        <div class="inputEditContainer">
                            <input class="inputName" id="contactEmail" type="email" placeholder="Email">
                            <img src="./assets/img/email_Logo.png" alt="">
                        </div>
                        <span class="required">This field is required</span>
                    </div>
                    <div class="nameContainer">
                        <div class="inputEditContainer">
                            <input class="inputName" id="contactPhone" type="number" placeholder="Phone">
                            <img src="./assets/img/phoneLogo.png" alt="">
                        </div>
                        <span class="required">This field is required</span>
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
    let phone = allUsers[i].phone;
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
                        <img src="./assets/img/edit_button_black.png" alt="">
                        <span>Edit Contact</span>
                    </div>
                </div>
                <h3>Email</h3>
                <span>${email}</span>
                <h3>Phone</h3>
                <p>${phone}</p>
            </div>
        </div>
    `;
}

function addContact() {
}


function deleteContact(i) {
}

function contacts() {
    alert('Verbindung zu contacts herstellen!!!');
}

function cancelOn() {
    document.getElementById('cancelImg').src = "././assets/img/close_logo_blue.png";
}

function cancelOff() {
    document.getElementById('cancelImg').src = "./assets/img/close_logo.png";
}

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

function editContact(i) {
 


    allUsers.push({ 'name': name, 'email': email, 'password': password, 'colorIndex': colorIndex, 'firstSecondLetter': firstLetter+secondLetter});



}

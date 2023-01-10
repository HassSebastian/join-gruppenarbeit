let alphabetOrd = { A: [], B: [], C: [], D: [], E: [], F: [], G: [], H: [], I: [], J: [], K: [], L: [], M: [], N: [], O: [], P: [], Q: [], R: [], S: [], T: [], U: [], V: [], W: [], X: [], Y: [], Z: [] };

async function initContacts() {
    await includeHTML();
    selectedMenuButton(2);
    renderContent();
    user();
    loadContributorsLetter();
}

function user() {
    alphabetOrd = { A: [], B: [], C: [], D: [], E: [], F: [], G: [], H: [], I: [], J: [], K: [], L: [], M: [], N: [], O: [], P: [], Q: [], R: [], S: [], T: [], U: [], V: [], W: [], X: [], Y: [], Z: [] };
    for (let i = 0; i < contacts.length; i++) {
        // ab hier wird der jeweils erste Buchstabe des Vor und Nachnamen separiert 
        let vorUndZuName = contacts[i].name;
        let firstLetter = vorUndZuName[0];
        let spaceIndex = contacts[i].name.indexOf(' ');
        let secondName = contacts[i].name.substring(spaceIndex + 1);
        let secondLetter = secondName[0];
        let email = contacts[i].email;
        let phone = contacts[i].phone;
        let id = contacts[i].id;

        // ab hier wird die Farbe bestimmt. Buchstaben in asci umgewandelt. 
        // addiert und durch 7 Farben geteilt.
        // der Restwert ist dann die Farbe aus dem colors Array in Zeile 3
        let asciiFirstLetter = firstLetter.charCodeAt(0);
        let asciiSecondLetter = secondLetter.charCodeAt(0);
        let sum = asciiFirstLetter + asciiSecondLetter;
        let result = sum % 7; 	// rersult ist dann die Farbe aus dem colors Array in Zeile 3

        var contact = {};

        contact.name = vorUndZuName;
        contact.email = email;
        contact.phone = phone;
        contact.id = id;

        alphabetOrd[firstLetter].push(contact); // hier werden die Kontakte in das alphabetOrd array eingeordnet
    }
    alphabet();
}

function alphabet() {
    document.getElementById('Contact_list').innerHTML = '';
    for (let wertNachDemArray in alphabetOrd) {
        if (alphabetOrd[wertNachDemArray].length > 0) {
            document.getElementById('Contact_list').innerHTML += /*html*/ `
        <div class="letters">
                <span>${wertNachDemArray}</span>
                <div class="Vector_10"></div>
        </div>
        <div id='${wertNachDemArray}'></div> <!-- hier wird der Unterstrich generiert --> 
		`;
            for (i = 0; i < alphabetOrd[wertNachDemArray].length; i++) {
                let vorUndZuName = alphabetOrd[wertNachDemArray][i].name;
                let firstLetter = vorUndZuName[0];
                let spaceIndex = alphabetOrd[wertNachDemArray][i].name.indexOf(' ');
                let secondName = alphabetOrd[wertNachDemArray][i].name.substring(spaceIndex + 1);
                let secondLetter = secondName[0];
                let email = alphabetOrd[wertNachDemArray][i].email;
                let id = alphabetOrd[wertNachDemArray][i].id;
                document.getElementById(wertNachDemArray).innerHTML += `

                <div class="contact" id="contact${i}" onclick="showContact(${id})">
                 <div class="ellipse">
                    <span>${firstLetter}${secondLetter}</span>
                 </div>
                 <div class="name_and_email">
                     <div class="name">
                         <span>${vorUndZuName}</span>
                     </div>
                     <div class="email">
                         ${email}
                     </div>
                 </div>
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
    <div class="Contact_list" id="Contact_list">


        </div>
</div>


<div class="showContact" id="showContact">

</div>


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

<div class="add_contact d-none" id="edit_contact">


</div>
</div>

`;
}

function openEditContact(i) {
    document.getElementById('edit_contact').classList.remove('d-none')
    document.getElementById('edit_contact').innerHTML /*html*/ = '';
    document.getElementById('edit_contact').innerHTML = /*html*/ `
    <div class="add_contact_left">
      <img src="assets/img/join_logo.png" alt="">
      <h1>Add contact</h1>
      <span>Tasks are better with a team!</span>
    <div class="add_contact_vector_5 "></div>
    </div>
      <div class="add_contact_right">
      <img src="assets/img/empty_profile_picture.png" alt="">
      <div class="add_contact_inputs">
        <input type="text" placeholder="Name" id="editContactName" required="required" pattern="^\S+\s\S+$">
        <input type="text" placeholder="Email" id="editContactEmail" required="required" pattern="^\S+\s\S+$">
        <input type="text" placeholder="Phone" id="editContactPhone" required="required" pattern="^\S+\s\S+$">
        <div class="add_contact_right_buttons">
            <div class="contact_cancel" onclick="closeEditContact()">
                <span>Cancel</span>
                <img src="assets/img/new_cat_cancel.png" alt="">
            </div>
            <div class="contact_create" onclick="editContact(${i})">
                <span>Update contact</span>
                <img src="assets/img/akar-icons_check_white.png" alt="">
            </div>
        </div>
        <div class="contact_delete" onclick="deleteContact(${i})">
                <span>Delete contact</span>
                <img src="assets/img/bin.png" alt="">
            </div>
    </div>
    `;
}

function openNewContact() {
    document.getElementById('new_contact').innerHTML= '';
    document.getElementById('new_contact').innerHTML= /*html*/`
    <div class="add_contact_left">
        <img src="assets/img/join_logo.png" alt="">
        <h1>Add contact</h1>
        <span>Tasks are better with a team!</span>
        <div class="add_contact_vector_5 "></div>
    </div>
    <div class="add_contact_right">
        <img src="assets/img/empty_profile_picture.png" alt="">
        <div class="add_contact_inputs">
            <input type="text" placeholder="Name" id="contactName" required="required" pattern="^\S+\s\S+$">
            <input type="text" placeholder="Email" id="contactEmail" required="required" pattern="^\S+\s\S+$">
            <input type="text" placeholder="Phone" id="contactPhone" required="required" pattern="^\S+\s\S+$">
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
    const name = contacts[i].name;
    const email = contacts[i].email;
    const phone = contacts[i].phone;
    const nameLetter = contacts[i].name.charAt(0);
    const id = contacts[i].id;
    let spaceIndex = contacts[i].name.indexOf(' ');
    const surname = contacts[i].name.substring(spaceIndex + 1);
    let surnameLetter = surname[0];
    document.getElementById('showContact').classList.remove('d-none')
    document.getElementById('showContact').innerHTML = '';
    document.getElementById('showContact').innerHTML = /*html*/ `
      <div>
            <div class="show_contact_ellipse_5">
                <span>${nameLetter}${surnameLetter}</span>
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
                    <div class="edit_contact" onclick="openEditContact(${id})">
                        <img src="assets/img/edit_button_black.png" alt="">
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
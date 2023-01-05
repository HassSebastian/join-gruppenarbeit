let contacts = [
    {
        "name": "Anton Mayer",
        "email": "antonm@gmail.com",
        "phone": "+49 1111 111 11 1"
    },
    {
        "name": "Aal Mayer",
        "email": "antonm@gmail.com",
        "phone": "+49 1111 111 11 1"
    },
    {
        "name": "Cesar Hardt",
        "email": "cesarh@gmail.com",
        "phone": "+49 3333 333 33 3"
    },
    {
        "name": "Berta Müller",
        "email": "bertam@gmail.com",
        "phone": "+49 2222 222 22 2"
    }
];

async function initContacts() {
    await includeHTML();
    selectedMenuButton(2);
    renderContent();
}

function compareStrings(a, b) {
    // Assuming you want case-insensitive comparison
    a = a.toLowerCase();
    b = b.toLowerCase();

    return (a < b) ? -1 : (a > b) ? 1 : 0;
}

contacts.sort(function (a, b) {
    return compareStrings(a.name, b.name);
})

function sortContacts() {
    contacts.sort(function (a, b) {
        return compareStrings(a.name, b.name);
    })
}

function findFirstWithLetter(letter) {
    const sortedArray = contacts.sort((a, b) => a.name.localeCompare(b.name));
    for (let element of sortedArray) {
        if (Object.values(element).some(value => value.includes(letter))) {
            return element;
        }
    }
    return null;
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


<div class="add_contact d-none" id="new_contact">
    <div class="add_contact_left">
        <img src="assets/img/join_logo.png" alt="">
        <h1>Add contact</h1>
        <span>Tasks are better with a team!</span>
        <div class="add_contact_vector_5 "></div>
    </div>
    <div class="add_contact_right">
        <img src="assets/img/empty_profile_picture.png" alt="">
        <div class="add_contact_inputs">
            <input type="text" placeholder="Name" id="contactName">
            <input type="text" placeholder="Email" id="contactEmail">
            <input type="text" placeholder="Phone" id="contactPhone">
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
</div>

<div class="add_contact d-none" id="edit_contact">


</div>
</div>

`;
    renderContacts();

    //renderContactsTest();
}

function contactListHTML() {
    return
}

async function renderContacts() {
    document.getElementById('Contact_list').innerHTML = '';

    for (let i = 0; i < contacts.length; i++) {
        const name = contacts[i].name;
        const email = contacts[i].email;
        const nameLetter = contacts[i].name.charAt(0);
        let spaceIndex = contacts[i].name.indexOf(' ');
        const surname = contacts[i].name.substring(spaceIndex + 1);
        let surnameLetter = surname[0];
        const result = findFirstWithLetter(i);

        if (result === contacts[0]) {
            document.getElementById('Contact_list').innerHTML += /*html*/ `
             <div class="letters">
                <span>${nameLetter}</span>
                <div class="Vector_10"></div>
            </div>
            <div class="contact" id="contact${i}" onclick="showContact(${i})">
                 <div class="ellipse">
                    <span>${nameLetter}${surnameLetter}</span>
                 </div>
                 <div class="name_and_email">
                     <div class="name">
                         <span>${name}</span>
                     </div>
                     <div class="email">
                         ${email}
                     </div>
                 </div>
            </div>
        </div>
       `;
        } else {
            document.getElementById('Contact_list').innerHTML += /*html*/ `
           <div class="contact" id="contact${i}" onclick="showContact(${i})">
                <div class="ellipse">
                   <span>${nameLetter}${surnameLetter}</span>
                </div>
                <div class="name_and_email">
                    <div class="name">
                        <span>${name}</span>
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
        <input type="text" placeholder="Name" id="editContactName">
        <input type="text" placeholder="Surname" id="editContactSurname">
        <input type="text" placeholder="Email" id="editContactEmail">
        <input type="text" placeholder="Phone" id="editContactPhone">
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
    renderContacts();
}

function openNewContact() {
    document.getElementById('new_contact').classList.remove('d-none');
}

function closeNewContact() {
    document.getElementById('new_contact').classList.add('d-none');
}

function closeEditContact() {
    document.getElementById('edit_contact').classList.add('d-none');
    renderContacts();
}

function showContact(i) {
    const name = contacts[i].name;
    const email = contacts[i].email;
    const phone = contacts[i].phone;
    const nameLetter = contacts[i].name.charAt(0);
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
                    <div class="edit_contact" onclick="openEditContact(${i})">
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

    contact.name = document.getElementById('contactName').value;
    contact.email = document.getElementById('contactEmail').value;
    contact.phone = document.getElementById('contactPhone').value;

    contacts.push(contact);
    sortContacts();
    closeNewContact();
}

function editContact(i) {
    var contact = {};

    contact.name = document.getElementById('editContactName').value;
    contact.email = document.getElementById('editContactEmail').value;
    contact.phone = document.getElementById('editContactPhone').value;

    contacts.splice(i, 1, contact);
    sortContacts();
    showContact(i)
    closeEditContact();
}

function deleteContact(i) {
    contacts.splice(i, 1);
    sortContacts();
    closeEditContact();
    document.getElementById('showContact').classList.add('d-none')
}
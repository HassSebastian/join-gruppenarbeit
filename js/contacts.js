let contacts = [
    {
        "surname": "Mayer",
        "name": "Anton",
        "email": "antonm@gmail.com",
        "phone": "+49 1111 111 11 1"
    },
    {
        "surname": "Hardt",
        "name": "Cesar",
        "email": "cesarh@gmail.com",
        "phone": "+49 3333 333 33 3"
    },
    {
        "surname": "Müller",
        "name": "Berta",
        "email": "bertam@gmail.com",
        "phone": "+49 2222 222 22 2"
    },

];

async function initContacts() {
    await includeHTML();
    selectedMenuButton(2);
    renderContacts();
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

async function renderContacts() {
    document.getElementById('contacts').innerHTML = '';

    for (let i = 0; i < contacts.length; i++) {
        const surname = contacts[i].surname;
        const name = contacts[i].name;
        const email = contacts[i].email;
        const surnameLetter = contacts[i].surname.charAt(0);
        const nameLetter = contacts[i].name.charAt(0);

        document.getElementById('contacts').innerHTML += /*html*/ `
        <div class="contact" id="contact${i}" onclick="showContact(${i})">
             <div class="ellipse">
                <span>${surnameLetter}${nameLetter}</span>
             </div>
             <div class="name_and_email">
                 <div class="name">
                     <span>${name} ${surname}</span>
                 </div>
                 <div class="email">
                     ${email}
                 </div>
             </div>
        </div>
       `;

    }



}

function openNewContact() {
    document.getElementById('new_contact').classList.remove('d-none');
    renderContacts();
}

function closeNewContact() {
    document.getElementById('new_contact').classList.add('d-none');
    renderContacts();
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

function closeEditContact() {
    document.getElementById('edit_contact').classList.add('d-none');
    renderContacts();
}

function showContact(i) {
    const surname = contacts[i].surname;
    const name = contacts[i].name;
    const email = contacts[i].email;
    const phone = contacts[i].phone;
    const surnameLetter = contacts[i].surname.charAt(0);
    const nameLetter = contacts[i].name.charAt(0);
    document.getElementById('showContact').innerHTML = '';
    document.getElementById('showContact').innerHTML = /*html*/ `
      <div>
            <div class="show_contact_ellipse_5">
                <span>${surnameLetter}${nameLetter}</span>
            </div>
            <div class="showContact_Name_addTask">
                <h1>${name} ${surname}</h1>
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
    contact.surname = document.getElementById('contactSurname').value;
    contact.email = document.getElementById('contactEmail').value;
    contact.phone = document.getElementById('contactPhone').value;

    contacts.push(contact);
    sortContacts();
    closeNewContact();
}

function editContact(i) {
    var contact = {};

    contact.name = document.getElementById('editContactName').value;
    contact.surname = document.getElementById('editContactSurname').value;
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
}
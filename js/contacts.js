let contacts = [{
    "surname" : "Mayer",
    "name" : "Anton",
    "email" : "antonm@gmail.com",
    "phone" : "+49 1111 111 11 1"
},

];

async function initContacts() {
    await includeHTML();
    selectedMenuButton(2);
    renderContacts();
}

async function renderContacts() {
    document.getElementById('content').innerHTML = '';
    document.getElementById('content').innerHTML += /*html*/ `

    `;
}

function openNewContact() {
    document.getElementById('new_contact').classList.remove('d-none');
    renderContacts();
}

function closeNewContact() {
    document.getElementById('new_contact').classList.add('d-none');
    renderContacts();
}

function showContact(){
    document.getElementById('showContact').classList.remove('d-none');
}
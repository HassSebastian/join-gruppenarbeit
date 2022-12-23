let contacts = [{
    "surname": "Mayer",
    "name": "Anton",
    "email": "antonm@gmail.com",
    "phone": "+49 1111 111 11 1"
},

];

async function initContacts() {
    await includeHTML();
    selectedMenuButton(2);
    renderContacts();
}

async function renderContacts() {
    document.getElementById('contacts').innerHTML = '';

for (let i = 0; i < contacts.length; i++) {
    const surname = contacts[i].surname;
    const name = contacts[i].name;
    const email = contacts[i].email;
    const phone = contacts[i].phone;
    const surnameLetter = contacts[i].surname.charAt(0);
    const nameLetter = contacts[i].name.charAt(0);

    document.getElementById('contacts').innerHTML += /*html*/ `
    <div class="contact">
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

function showContact() {
    document.getElementById('showContact').classList.remove('d-none');
}
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
        <div class="contact" onclick="showContact(${i})">
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

function showContact(i) {
    const surname = contacts[i].surname;
    const name = contacts[i].name;
    const email = contacts[i].email;
    const phone = contacts[i].phone;
    const surnameLetter = contacts[i].surname.charAt(0);
    const nameLetter = contacts[i].name.charAt(0);
    //document.getElementById('showContact').classList.remove('d-none');
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
                    <div class="edit_contact">
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
async function initContacts() {
    await includeHTML();
    selectedMenuButton(2);
    renderContacts();
}

async function renderContacts() {
    document.getElementById('content').innerHTML = '';
    document.getElementById('content').innerHTML += /*html*/ `
<div class="Frame_97">
        <div class="Contact_list">
            <div class="letters">
               <span>A</span>
            </div>
            <div class="Vector_10"></div>
            <div class="contacts">
                <div class="contact">
                    <div class="ellipse">
                        <span>AM</span>
                    </div>
                    <div class="name_and_email">
                        <div class="name">
                            <span>Anton Mayer</span>
                        </div>
                        <div class="email">
                            <span>antom@gmail.com</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="better_with_a_team">
        <h1>Contacts</h1>
        <div class="vector_5"></div>
        <span>Better with a team</span>
    </div>
    `;
}
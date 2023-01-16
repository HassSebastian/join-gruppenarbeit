async function initMobilContacts() {
    await includeHTML();
    await loadTask();
    selectedMenuButton(4);
    renderContentMobile();
    userInAlphabetArray();
    loadContributorsLetterMob();
}




async function renderContentMobile() {
    document.getElementById('mobilContent').innerHTML = '';
    document.getElementById('mobilContent').innerHTML += renderContentMobileHTML();
}

function renderContentMobileHTML() {
    return /*html*/ `
            <div>
                <div class="Frame_97Mob">
                    <div class="Contact_listMob" id="Contact_list"></div>
                </div>
                <div class="new_contactMob" onclick="openNewContactMob()">
                    <div class="new_contact_buttonMob">
                        <span>New contact</span>
                        <img src="assets/img/add_contact_icon.png" alt="">
                    </div>
                </div>

            </div>
        `;
}

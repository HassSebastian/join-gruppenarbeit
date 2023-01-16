async function initMobilContacts() {
    await includeHTML();
    await loadTask();
    selectedMenuButton(4);
    renderContentMobile();
    userInAlphabetArray();
    loadContributorsLetter();
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
            </div>
        `;
}

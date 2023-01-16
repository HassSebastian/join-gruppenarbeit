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
        <div id="Frame_97Mob" class="Frame_97Mob">
            <div class="Contact_listMob" id="Contact_list"></div>
        </div>
        <div class="new_contactMob" onclick="openNewContactMob()">
            <div class="new_contact_buttonMob">
                <span>New contact</span>
                <img src="assets/img/add_contact_icon.png" alt="">
            </div>
        </div>
        
        <!-- overlayNewContact -->
        <div class="overlayMasterContainerMob" id="overlayMasterContainerMob">
            <div class="blackContainerMob">
                <span class="addContactMob">Add contact</span>
                <span class="addContactDiscrMob">Tasks are better with a team!</span>
                <div class="addContactVectorMob"></div>
                <img class="closeButtonMob" onclick="closeNewContactMob()" src="../../assets/img/plus_logo_white.png" alt="">
            </div>
            <div class="addNewBatchContainerMob">
                <div class="addNewContactLogoElypseContainer">
                    <img class="addNewContactLogoElypse" src="../../assets/img/elypse.png">
                    <img class="addNewContactLogoLogo" src="../../assets/img/nameLogoOverlay.png">
                </div>
            </div>
            <div class="contactImputMasterContainerMob">
                <div class="outerInputContainerMob">
                    <div class="inputContainerMob">
                        <div class="innerInputContainerMob">
                            <input class="imputFieldMob" id="newUserName" type="text" placeholder="Name">
                            <img src="../../assets/img/name_logo.png" alt="">
                        </div>
                    </div>
                    <span class="required">This field is required</span>
                </div>
                <div class="outerInputContainerMob">
                    <div class="inputContainerMob">
                        <div class="innerInputContainerMob">
                            <input class="imputFieldMob" id="newUserEmail" type="email" placeholder="Email">
                            <img src="../../assets/img/email_Logo.png" alt="">
                        </div>
                    </div>
                    <span class="required">This field is required</span>
                </div>
                <div class="outerInputContainerMob">
                    <div class="inputContainerMob">
                        <div class="innerInputContainerMob">
                            <input class="imputFieldMob" id="newUserPhone" type="number" placeholder="Phone">
                            <img src="../../assets/img/phoneLogo.png" alt="">
                        </div>
                    </div>
                    <span class="required">This field is required</span>
                </div>
            </div>
            <button onclick="addContact()" class="createContactButtonMob">
                <span>Create contact</span>
                <img src="../../assets/img/okHaeckchen.png">
            </button>
        </div>
    `;
}

function openNewContactMob(){
    document.getElementById('overlayMasterContainerMob').classList.add('overlayMasterContainerMobSlide');
}

function closeNewContactMob(){
    document.getElementById('overlayMasterContainerMob').classList.remove('overlayMasterContainerMobSlide');
}
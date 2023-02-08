async function initMobilContacts() {
	await includeHTML();
	await loadTask();
	selectedMenuButton(4);
	renderContentMobile();
	userInAlphabetArray();
	loadContributorsLetterMob();
	logOutMasterContainerMob();
	document.getElementById('greetingMasterContainer').classList.add('d-none');
}

async function renderContentMobile() {
	document.getElementById('mobilContent').innerHTML = '';
	document.getElementById('mobilContent').innerHTML += renderContentMobileHTML();
}

function renderContentMobileHTML() {
	return /*html*/ `
        <div class="shadowOverlay d-none" id="shadowOverlay"></div>
        <div id="Frame_97Mob" class="Frame_97Mob">
            <div class="Contact_listMob" id="Contact_list"></div>
        </div>
        <div class="showContact" id="showContact"></div>
        <div class="new_contactMob" onclick="openOverlayMob()">
            <div class="new_contact_buttonMob">
                <span>New contact</span>
                <img src="assets/img/add_contact_icon.png" alt="">
            </div>
        </div>
        
        <!-- overlayNewContact -->
        <div class="overlayMasterContainerMob" id="overlayMasterContainerMob">
            <div class="blackContainerMob">
                <div class="centerNewContactHeader">
                    <div class="centerNewContactHeaderContainer">
                        <span class="addContactMob">Add contact</span>
                        <span class="addContactDiscrMob">Tasks are better with a team!</span>
                        <div class="addContactVectorMob"></div>
                        <img class="closeButtonMob" onclick="closeOverlayMob()" src="../../assets/img/plus_logo_white.png" alt="">
                    </div>
                </div>


                <div class="addNewBatchContainerMob">
                    <div class="addNewContactLogoElypseContainer">
                        <img class="addNewContactLogoElypse" src="../../assets/img/elypse.png">
                        <img class="addNewContactLogoLogo" src="../../assets/img/nameLogoOverlay.png">
                    </div>
                </div>


            </div>
            
            
                <div class="contactImputMasterContainerMob">
                    <div class="outerInputContainerMob">
                        <div class="inputContainerMob">
                            <div class="innerInputContainerMob">
                                <input class="imputFieldMob" id="newUserName" type="text" placeholder="Name" required>
                                <img src="../../assets/img/name_logo.png" alt="">
                            </div>
                        </div>
                        <span class="required d-none" id="newContentNameRequired">This field is required</span>
                    </div>
                    <div class="outerInputContainerMob">
                        <div class="inputContainerMob">
                            <div class="innerInputContainerMob">
                                <input class="imputFieldMob" id="newUserEmail" type="email" placeholder="Email" required>
                                <img src="../../assets/img/email_Logo.png" alt="">
                            </div>
                        </div>
                        <span class="required d-none" id="newContentEmailRequired">This field is required</span>
                    </div>
                    <div class="outerInputContainerMob">
                        <div class="inputContainerMob">
                            <div class="innerInputContainerMob">
                                <input class="imputFieldMob" id="newUserPhone" type="number" placeholder="Phone" required>
                                <img src="../../assets/img/phoneLogo.png" alt="">
                            </div>
                        </div>
                        <span class="required d-none" id="newContentPhoneRequired">This field is required</span>
                    </div>
                </div>
                <button onclick="addContact()" class="createContactButtonMob" type="submit">
                    <span>Create contact</span>
                    <img src="../../assets/img/okHaeckchen.png">
                </button>
            </div>

            <!--contactSucc-->

            <div class="contactSucc" id="contactSucc">
                <div class="contactSuccContainer">
                    <span>Contact succesfully created</span>
                </div>
            </div>
    `;
}

function contactSucc() {
	document.getElementById('contactSucc').classList.add('contactSuccSlide');
	setTimeout(closeOverlayMob, 2000);
}

function test() {
	console.log('ok');
}

function openOverlayMob() {
    document.getElementById('shadowOverlay').classList.remove('d-none');
	document.getElementById('overlayMasterContainerMob').classList.add('overlayMasterContainerMobSlide');
}

function closeOverlayMob() {
    document.getElementById('shadowOverlay').classList.add('d-none');
	document.getElementById('overlayMasterContainerMob').classList.remove('overlayMasterContainerMobSlide');
	if (document.querySelector('.contactSuccSlide')) {
		document.getElementById('contactSucc').classList.remove('contactSuccSlide');
		setTimeout(initMobilContacts, 500);
	}
}

function showContactHTMLMob(name, email, phone, letter, color, i) {
	return /*html*/ `
            <div class="shadowOverlay d-none" id="shadowOverlay"></div>
            <div class="arrowContainerMob" onclick="initMobilContacts()">
            <img src="../../assets/img/back_logo_black.png">
        </div>

        <div class="editButtonContainerMob" onclick="openOverlayMob()">
            <img src="../../assets/img/edit_button.png" alt="">
        </div>
        <vectorContact></vectorContact>
        <div class="contactsMasterContainerMob">
            <contacts>Contacts</contacts>
            <betterWithATeam>Better with a team</betterWithATeam>
        </div>
        <span class="kanbanProjectManagementTool">Kanban Project Management Tool</span>

        <div class="floatingContactsMasterContainer">
            <div class="batchPlusNameContainer">
                <div class="batchMasterContainer">
                    <div class="batchContainer">
                        <div style="background:${colorIndex[color]}"></div>
                        <span>${letter}</span>
                    </div>
                </div>
                <div class="nameMasterContainer">
                    <span>${name}</span>
                    <div class="linkMasterContainer" onclick="initMobilAddTask()">
                        <img src="../../assets/img/plus_logo_blue.png" alt="">
                        <span>Add Task</span>
                    </div>
                </div>
            </div>
            <contactInformation>Contact Information</contactInformation>
            <div class="emailAndPhoneContainer">
                <div class="emailContainerMob">
                    <email>Email</email>
                    <span>${email}</span>
                </div>
                <div class="phoneContainerMob">
                    <phone>Phone</phone>
                    <span>${phone}</span>
                </div>
            </div>
        </div>


        <div class="overlayMasterContainerMob" id="overlayMasterContainerMob">
            <div class="overlayBlackContainerMob">
                <div class="centerBox">
                   <span>Edit contact</span>
                   <vectorEdit></vectorEdit>
                </div>
                <img onclick="closeOverlayMob()" src="../../assets/img/plus_logo_white.png">
            </div>
            <div class="userColorBatchContainerMob">
                <div class="userColorBatchMob">
                    <span>${letter}</span>
                    <div style='background:${colorIndex[color]}'></div>
                </div>
            </div>
            <div class="editContactContainerMob">
                <div class="editnameOutContainerMob">
                    <div class="editNameContainerMob">
                        <div class="editInputEditContainerMob">
                            <input class="inputName" id="editUserName" type="text" value="${name}">
                            <img src="../../assets/img/name_logo.png" alt="">
                        </div>
                    </div>
                    <span class="required">This field is required</span>
                </div>
                <div class="editnameOutContainerMob">
                    <div class="editNameContainerMob">
                        <div class="editInputEditContainerMob">
                            <input class="inputName" id="editUserEmail" type="email" value="${email}">
                            <img src="../../assets/img/email_Logo.png" alt="">
                        </div>
                    </div>
                    <span class="required">This field is required</span>
                </div>
                <div class="editnameOutContainerMob">
                    <div class="editNameContainerMob">
                        <div class="editInputEditContainerMob">
                            <input class="inputName" id="editUserPhone" type="number" value="${phone}">
                            <img src="../../assets/img/phoneLogo.png" alt="">
                        </div>
                    </div>
                    <span class="required">This field is required</span>
                </div>
            </div>
            <button class="editButtonMobContact" onclick="saveEditContact(${i})" class="save">
                <span id="saveEditButton">Save</span>
            </button>
        </div>

    `;
}

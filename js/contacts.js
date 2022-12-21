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
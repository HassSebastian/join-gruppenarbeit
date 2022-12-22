
function initPage1(){
    document.getElementById('page1_logo').classList.add('page1joinLogoContainerMove');
    setTimeout(startLogIn, 700);
}
function startLogIn(){
    window.location.href = './logIn.html';
}


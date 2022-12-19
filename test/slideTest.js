
function initPage1(){
    document.getElementById('page1_logo').classList.add('page1joinLogoContainerMove');
    setTimeout(startLogIn, 700);
}
function startLogIn(){
    document.getElementById('page1').classList.add('d-none');
    document.getElementById('logIn').classList.remove('d-none');
}


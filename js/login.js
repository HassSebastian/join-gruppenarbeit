function initSignIn(){
    window.location.href = './signUp.html';
}

function guestLogIn(){
    alert('muss noch mit Gast Log in verbunden werden!');
}

function userLogin(){
    // Edited by Bossi
    let email = document.getElementById('inputEmailLogin').value;
    let password = document.getElementById('inputPasswordLogin').value;
    // load loginData
    let allUsersString = localStorage.getItem('allUsers')
    let loginData = JSON.parse(allUsersString);

    let loginStatus = false;
    for (let i = 0; i < loginData.length; i++) {
        let emailData = loginData[i]['email'];
        if (emailData == email){
            if (loginData[i]['password'] == password){
                loginStatus = true;
            }
        }
    }
    if (loginStatus){
        console.log('Login Data correct');
    }
    // // Edited by Bossi end
}
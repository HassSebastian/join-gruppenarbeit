
function back() {
    history.back();
}

async function initForgotMyPassword(){
    await loadTask();
}

// function inputForgotEmaiCheck() {
//     let email = document.getElementById('inputForgot');
//     let requiredEmail = document.getElementById('requiredEmailForgot');
//     if (email.value.length < 8 ||
//         !email.value.includes('@') ||
//         !email.value.includes('.') ||
//         email.value[0] === ' ') {
//         requiredEmail.classList.add('requiredOn');
//     } else {
//         alert('Email muss abgeschickt werden!!')
//     };
// }
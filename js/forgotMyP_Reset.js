function back() {
	history.back();
}

function inputForgotEmaiCheck() {
	let newPassword = document.getElementById('inputNewPassword');
	let confirmPassword = document.getElementById('inputConfirmPassword');
	let requiredNewPassword = document.getElementById('requiredNewPassword');
	let requiredConfirmPassword = document.getElementById('requiredConfirmPassword');
	requiredNewPassword.classList.remove('requiredOn');
	requiredConfirmPassword.classList.remove('requiredOn');
	requiredNewPassword.innerHTML = `This field is required`;
	requiredConfirmPassword.innerHTML = `This field is required`;

	if (newPassword.value.length || confirmPassword.value.length) {
		if (newPassword.value.length == 0 || newPassword.value[0] === ' ') {
			requiredNewPassword.classList.add('requiredOn');
		} else {
			requiredNewPassword.classList.remove('requiredOn');
		}
		if (confirmPassword.value.length == 0 || confirmPassword.value[0] === ' ') {
			requiredConfirmPassword.classList.add('requiredOn');
		} else {
			requiredConfirmPassword.classList.remove('requiredOn');
		}

		if (!requiredNewPassword.classList.contains('requiredOn') && !requiredConfirmPassword.classList.contains('requiredOn')) {
			if (newPassword.value == confirmPassword.value) {
				alert('Muss noch mit dem jeweiligen User Array verbunden werden');
			} else {
				requiredNewPassword.classList.add('requiredOn');
				requiredConfirmPassword.classList.add('requiredOn');
				requiredNewPassword.innerHTML = `Passwords do not match`;
				requiredConfirmPassword.innerHTML = `Passwords do not match`;
			}
		}
	}
}

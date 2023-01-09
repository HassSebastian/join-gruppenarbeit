async function saveTask() {
	setURL('https://gruppe-407.developerakademie.net/smallest_backend_ever');
	// localStorage.setItem('joinTaskArray', JSON.stringify(joinTaskArray));
	backend.setItem('joinTaskArray', JSON.stringify(joinTaskArray));
}


async function loadTask() {
	// if (joinTaskArrayExistInStorage()) {
	// 	let joinTaskArrayString = localStorage.getItem('joinTaskArray');
	// 	joinTaskArray = JSON.parse(joinTaskArrayString);
	// }
	setURL('https://gruppe-407.developerakademie.net/smallest_backend_ever');
	await downloadFromServer();
	joinTaskArray = JSON.parse(backend.getItem('joinTaskArray')) || [];
}
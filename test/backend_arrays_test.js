async function saveTask1() {
	setURL('https://f015100a@stefan-boskamp.developerakademie.net/smallest_backend_ever');
	// localStorage.setItem('joinTaskArray', JSON.stringify(joinTaskArray));
	backend.setItem('joinTaskArray', JSON.stringify(joinTaskArray));
}


async function loadTask1() {
	// if (joinTaskArrayExistInStorage()) {
	// 	let joinTaskArrayString = localStorage.getItem('joinTaskArray');
	// 	joinTaskArray = JSON.parse(joinTaskArrayString);
	// }
	setURL('https://f015100a@stefan-boskamp.developerakademie.net/smallest_backend_ever');
	await downloadFromServer();
	joinTaskArray = JSON.parse(backend.getItem('joinTaskArray')) || [];
}

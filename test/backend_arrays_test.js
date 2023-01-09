async function saveTask() {
	setURL('https://stefan-boskamp.developerakademie.net/smallest_backend_ever');
	// localStorage.setItem('joinTaskArray', JSON.stringify(joinTaskArray));
	backend.setItem('joinTaskArray', JSON.stringify(joinTaskArray));
}


async function loadTask() {
	setURL('https://stefan-boskamp.developerakademie.net/smallest_backend_ever');
	await downloadFromServer();
	joinTaskArray = JSON.parse(backend.getItem('joinTaskArray')) || [];
}

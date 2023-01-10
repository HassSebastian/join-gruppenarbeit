// let joinTaskArray = [];
// let allUsersArray = [];

// let database = [];



async function fillDatabaseData(){
	database = [
		{
			'joinTaskArray': joinTaskArray,
			'allUsersArray': allUsersArray,
	
		}]
}

function testSetUser(){
	allUsersArray = [{ 'name': 'Stefan', 'lastname': 'Boskamp'}];
}



async function saveTask() {
	await fillDatabaseData();
	setURL('https://stefan-boskamp.developerakademie.net/smallest_backend_ever');
	// localStorage.setItem('joinTaskArray', JSON.stringify(joinTaskArray));
	backend.setItem('database', JSON.stringify(database));
}


async function loadTask() {
	setURL('https://stefan-boskamp.developerakademie.net/smallest_backend_ever');
	await downloadFromServer();
	database = JSON.parse(backend.getItem('database')) || [];
	joinTaskArray = database[0]['joinTaskArray'];
	allUsersArray = database[0]['allUsersArray'];
}


async function loadTaskOld() {
	setURL('https://gruppe-407.developerakademie.net/smallest_backend_ever');
	await downloadFromServer();
	joinTaskArray = JSON.parse(backend.getItem('joinTaskArray')) || [];
}




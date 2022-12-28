let users = [
	{
		name: 'Frank Jens',
		email: 'frankjens@test.de',
		password: '123456789',
	},
	{
		name: 'Sigmunde Arafad',
		email: 'sigmundekoehler@test.de',
		password: '123456789',
	},
	{
		name: 'Gertraut Harald',
		email: 'gertrautharald@test.de',
		password: '123456789',
	},
	{
		name: 'Klaudia Bumsbine',
		email: 'klaudiaschoenfeld@test.de',
		password: '123456789',
	},
	{
		name: 'Peter Lustig',
		email: 'Peterlustig@test.de',
		password: '123456789',
	},
];

let colors = [
	'#462F8A',
	'#AF1616',
	'#02CF2F',
	'#FC71FF',
	'#9327FF',
	'#9327FF',
	'#29ABE2',
];

function user() {
	for (let i = 0; i < users.length; i++) {
		let vorUndZuName = users[i].name;
		let firstLetter = vorUndZuName[0]; //nimmt vom ersten Namen den ersten Buchstaben [0]
		let spaceIndex = users[i].name.indexOf(' '); //sucht mit indexOf(" ") das Lehrzeichen. Es befindet sich an Stelle x

		let secondName = users[i].name.substring(spaceIndex + 1); // ausgegeben wird, users[i].name.Stelle x + 1
		let secondLetter = secondName[0];

		console.log('firstLetter:' + firstLetter);

		console.log('secondLetter:' + secondLetter);

		// die Buchstaben werden in asciiCode umgewandelt
		let asciiFirstLetter = firstLetter.charCodeAt(0);
		let asciiSecondLetter = secondLetter.charCodeAt(0);

		// der asciiCode wird addiert
		let sum = asciiFirstLetter + asciiSecondLetter;

		// die Zahl wird durch 7 geteilt (7 Farben Array) und der Restwert ist das Ergebniss
		let result = sum % 7;

		console.log('farbeNr:' + result);

		document.getElementById('ersteBuchstaben').innerHTML += `
            <div class="test">
                <div>${vorUndZuName}</div>
                <div style="background:${colors[result]}">${firstLetter} + ${secondLetter}</div>
            </div>
        `;
	}
}

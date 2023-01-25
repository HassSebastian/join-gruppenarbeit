

let colors = [
	'#462F8A',
	'#AF1616',
	'#02CF2F',
	'#FC71FF',
	'#9327FF',
	'#9327FF',
	'#29ABE2',
];


let alphabetOrd = { A: [], B: [], C: [], D: [], E: [], F: [], G: [], H: [], I: [], J: [], K: [], L: [], M: [], N: [], O: [], P: [], Q: [], R: [], S: [], T: [], U: [], V: [], W: [], X: [], Y: [], Z: [] };

function test(i){
	let vorUndZuName = users[i].name;
	let firstLetter = vorUndZuName[0];
	let spaceIndex = users[i].name.indexOf(' ');
	let secondName = users[i].name.substring(spaceIndex + 1);
	let secondLetter = secondName[0];
}

function user() {
	for (let i = 0; i < users.length; i++) {
		// ab hier wird der jeweils erste Buchstabe des Vor und Nachnamen separiert 
		test(i);

		// ab hier wird die Farbe bestimmt. Buchstaben in asci umgewandelt. 
		// addiert und durch 7 Farben geteilt.
		// der Restwert ist dann die Farbe aus dem colors Array in Zeile 3
		let asciiFirstLetter = firstLetter.charCodeAt(0);
		let asciiSecondLetter = secondLetter.charCodeAt(0);
		let sum = asciiFirstLetter + asciiSecondLetter;
		let result = sum % 7; 	// rersult ist dann die Farbe aus dem colors Array in Zeile 3

		alphabetOrd[firstLetter].push(vorUndZuName); // hier werden die namen in das alphabetOrd array eingeordnet
	}
	alphabet();
}


// die funktion gibt die namen aus dem array alphabetOrd geordnet aus
function alphabet() {
	for (let wertNachDemArray in alphabetOrd) {
		if (alphabetOrd[wertNachDemArray].length > 0) {
			document.getElementById('ersteBuchstaben').innerHTML += /*html*/ `
		<div style='border-bottom: 1px solid black'>${wertNachDemArray}</div>
		<div id='${wertNachDemArray}'></div> <!-- hier wird der Unterstrich generiert --> 
		`;
			for (i = 0; i < alphabetOrd[wertNachDemArray].length; i++) {
				document.getElementById(wertNachDemArray).innerHTML += `
			<div>${alphabetOrd[wertNachDemArray][i]}</div>
			`;
			}
		}
	}
}


function firstAndSecondLetter(name){
    let vorUndZuName = name;
    let firstLetter = name[0];
    let spaceIndex = name.indexOf(' ');
    let secondName = name.substring(spaceIndex + 1);
    let secondLetter = secondName[0];


    console.log('N',vorUndZuName);
    console.log('FL',firstLetter);
    console.log('SL',secondLetter);
    console.log(firstLetter+secondLetter);

    nameColorCalc(firstLetter, secondLetter);
}
function nameColorCalc(firstLetter, secondLetter){
    let asciiFirstLetter = firstLetter.charCodeAt(0);
    let asciiSecondLetter = secondLetter.charCodeAt(0);
    let sum = asciiFirstLetter + asciiSecondLetter;
    let result = sum % 10; 	// rersult ist dann die Farbe aus dem colors Array in Zeile 3

    console.log('ColorNr:',result);
}

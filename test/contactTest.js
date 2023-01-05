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


function renderContactsTest() {
    showUserTest();
}


function showUserTest() {

    for (let i = 0; i < users.length; i++) {
        // ab hier wird der jeweils erste Buchstabe des Vor und Nachnamen separiert 
        letterFirstAndLastName(i);
        // ab hier wird die Farbe bestimmt. Buchstaben in asci umgewandelt. 
        // addiert und durch 7 Farben geteilt.
        // der Restwert ist dann die Farbe aus dem colors Array in Zeile 3
        let asciiFirstLetter = firstLetter.charCodeAt(0);
        let asciiSecondLetter = secondLetter.charCodeAt(0);
        let sum = asciiFirstLetter + asciiSecondLetter;
        let result = sum % 7; 	// rersult ist dann die Farbe aus dem colors Array in Zeile 3

        alphabetOrd[firstLetter].push(vorUndZuName); // hier werden die namen in das alphabetOrd array eingeordnet
    }
}

function letterFirstAndLastName(i) {
    let vorUndZuName = users[i].name;
    let firstLetter = vorUndZuName[0];
    let spaceIndex = users[i].name.indexOf(' ');
    let secondName = users[i].name.substring(spaceIndex + 1);
    let secondLetter = secondName[0];
}
document.getElementById('Contact_list').innerHTML = '';

for (let wertNachDemArray in alphabetOrd) {
    if (alphabetOrd[wertNachDemArray].length > 0) {
        document.getElementById('Contact_list').innerHTML += /*html*/ `
                <div class="letters">
                    <span>${wertNachDemArray}</span>
                    <div class="Vector_10"></div>
                </div>
		        <div id='${wertNachDemArray}'></div>
		`;
        for (x = 0; x < alphabetOrd[wertNachDemArray].length; x++) {
            document.getElementById(wertNachDemArray).innerHTML += `
			<div class="contact" id="contact${x}" onclick="showContact(${x})">${alphabetOrd[wertNachDemArray][x]}</div>
            <div class="ellipse">
            <span>${firstLetter} ${secondLetter}</span>
         </div>

            `;
        }
    }
}






function loadTestUser() {
    for (let i = 0; i < users.length; i++) {
        // ab hier wird der jeweils erste Buchstabe des Vor und Nachnamen separiert 
        let vorUndZuName = users[i].name;
        let firstLetter = vorUndZuName[0];
        let spaceIndex = users[i].name.indexOf(' ');
        let secondName = users[i].name.substring(spaceIndex + 1);
        let secondLetter = secondName[0];

        // ab hier wird die Farbe bestimmt. Buchstaben in asci umgewandelt. 
        // addiert und durch 7 Farben geteilt.
        // der Restwert ist dann die Farbe aus dem colors Array in Zeile 3
        let asciiFirstLetter = firstLetter.charCodeAt(0);
        let asciiSecondLetter = secondLetter.charCodeAt(0);
        let sum = asciiFirstLetter + asciiSecondLetter;
        let result = sum % 7; 	// rersult ist dann die Farbe aus dem colors Array in Zeile 3

        alphabetOrd[firstLetter].push(vorUndZuName); // hier werden die namen in das alphabetOrd array eingeordnet
    }
}

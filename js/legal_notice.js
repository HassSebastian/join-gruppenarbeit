async function initLegalNotice() {
    await includeHTML();
    selectedMenuButton(5);
    renderLegalNotice();
}


async function renderLegalNotice() {
    document.getElementById('content').innerHTML = '';
    document.getElementById('content').innerHTML += /*html*/ `
        <div class='headerLegal'>
            <h2>Legal Notice</h2>
        </div>
        <div class='lawTextFrame'>
            <div class='lawTextSection'>
                <h3>Subtitle</h3>
                <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                    diam nonumy eirmod tempor invidunt ut labore et dolore magna
                    aliquyam erat, sed diam voluptua. At vero eos et accusam et 
                    justo duo dolores et ea rebum. Stet clita kasd gubergren, no 
                    sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem 
                    ipsum dolor sit amet, consetetur sadipscing elitr, sed diam 
                    nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam 
                    erat, sed diam voluptua. At vero eos et accusam et justo duo dolores 
                    et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est 
                    Lorem ipsum dolor sit amet.</p>
            </div>
            <div class='lawTextSection'>
                <h3>Subtitle</h3>
                <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                    diam nonumy eirmod tempor invidunt ut labore et dolore magna
                    aliquyam erat, sed diam voluptua. At vero eos et accusam et 
                    justo duo dolores et ea rebum. Stet clita kasd gubergren, no 
                    sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem 
                    ipsum dolor sit amet, consetetur sadipscing elitr, sed diam 
                    nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam 
                    erat, sed diam voluptua. At vero eos et accusam et justo duo dolores 
                    et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est 
                    Lorem ipsum dolor sit amet.</p>
            </div>

        </div>
    `;
}

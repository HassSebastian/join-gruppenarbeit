// Searchfunction for board


let searchTerm;


function startSearch() {
    if (innerWidth <= 1300) {
        startSearchMobil();
    } else {
        startSearchDesktop();
    }
}

/**
 * When the user types in the search field, get the search term and convert it to lowercase. Then, for
 * each card, get the card title and convert it to lowercase. If the card title contains the search
 * term, display the card. Otherwise, hide the card.
 */
function startSearchDesktop() {
    let cards = document.querySelectorAll('.taskBackground'); // Select all elements with class "taskBackground"
    document.getElementById('searchField').addEventListener('input', function () {
        searchTerm = this.value.toLowerCase(); // Get the search term and convert to lowercase
        searchTerm = this.value.trim();
        cards.forEach(function (card) {
            let cardTitle = card.querySelector('.taskHeadlineContent').textContent.toLowerCase();
            let cardDescription = card.querySelector('.taskContent').textContent.toLowerCase();
            if (cardTitle.indexOf(searchTerm) !== -1 || cardDescription.indexOf(searchTerm) !== -1) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
}


function startSearchMobil() {
    let cards = document.querySelectorAll('.taskBackgroundMobil'); // Select all elements with class "taskBackground"
    document.getElementById('searchField').addEventListener('input', function () {
        searchTerm = this.value.toLowerCase(); // Get the search term and convert to lowercase
        searchTerm = this.value.trim();
        cards.forEach(function (card) {
            let cardTitle = card.querySelector('.taskHeadlineContentMobil').textContent.toLowerCase();
            let cardDescription = card.querySelector('.taskContentMobil').textContent.toLowerCase();
            if (cardTitle.indexOf(searchTerm) !== -1 || cardDescription.indexOf(searchTerm) !== -1) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
}


function searchAfterPopup() {
    if (innerWidth <= 1300) {
        searchAfterPopupMobil()
    } else {
        searchAfterPopupDesktop();
    }
}


/**
 * It searches for the search term in the title and description of the cards and displays the cards
 * that contain the search term.
 * </code>
 */
function searchAfterPopupDesktop() {
    let cards = document.querySelectorAll('.taskBackground');
    if (searchTerm) {
        searchTerm = searchTerm.trim();
        if (searchTerm != '') {
            cards.forEach(function (card) {
                let cardTitle = card.querySelector('.taskHeadlineContent').textContent.toLowerCase();
                let cardDescription = card.querySelector('.taskContent').textContent.toLowerCase();
                if (cardTitle.indexOf(searchTerm) !== -1 || cardDescription.indexOf(searchTerm) !== -1) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        }
    }
}


function searchAfterPopupMobil() {
    let cards = document.querySelectorAll('.taskBackgroundMobil');
    if (searchTerm) {
        searchTerm = searchTerm.trim();
        if (searchTerm != '') {
            cards.forEach(function (card) {
                let cardTitle = card.querySelector('.taskHeadlineContentMobil').textContent.toLowerCase();
                let cardDescription = card.querySelector('.taskContentMobil').textContent.toLowerCase();
                if (cardTitle.indexOf(searchTerm) !== -1 || cardDescription.indexOf(searchTerm) !== -1) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        }
    }
}


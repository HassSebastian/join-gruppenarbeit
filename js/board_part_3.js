// Searchfunction for board


/**
 * When the user types in the search field, get the search term and convert it to lowercase. Then, for
 * each card, get the card title and convert it to lowercase. If the card title contains the search
 * term, display the card. Otherwise, hide the card.
 */
function startSearch() {
    let cards = document.querySelectorAll('.taskBackground'); // Select all elements with class "taskBackground"
    document.getElementById('search-field').addEventListener('input', function () {
        let searchTerm = this.value.toLowerCase(); // Get the search term and convert to lowercase
        cards.forEach(function (card) {
            let cardTitle = card.querySelector('.taskHeadlineContent').textContent.toLowerCase();
            if (cardTitle.indexOf(searchTerm) !== -1) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
}
const CARD_FLIP_TIMEOUT = 3000;

// using a function to isolate the scope
function app() {
    let moves = 0;
    let flippedCards = [];

    const cardsContainer = document.getElementById('cards-area');
    let listener = function (event) {
        if (
            event.target.classList.contains('game-card')
            && !event.target.classList.contains('flipped')
            && flippedCards.length < 2
        ) {
            event.target.classList.toggle('flipped');
            flippedCards.push(event.target);
            if (flippedCards.length === 2) {
                incrementMoves();
                setTimeout(() => {
                    clearFlippedCards();
                }, CARD_FLIP_TIMEOUT);
            }
        }
    };
    cardsContainer.addEventListener('click', listener);

    function incrementMoves() {
        moves++;
        const movesElement = document.getElementById('num-moves');
        movesElement.textContent = moves.toString();
    }

    function clearFlippedCards() {
        for (const card of flippedCards) {
            card.classList.remove('flipped');
        }
        flippedCards = [];
    }
}

app();
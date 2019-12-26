const CARD_FLIP_TIMEOUT = 1500;

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
            flipCard(event.target)
        }
    };
    cardsContainer.addEventListener('click', listener);

    function incrementMoves() {
        moves++;
        const movesElement = document.getElementById('num-moves');
        movesElement.textContent = moves.toString();
    }

    function flipCard(card) {
        card.classList.toggle('flipped');
        card.querySelector("img").classList.toggle("hidden");
        flippedCards.push(card);
        if (flippedCards.length === 2) {
            incrementMoves();
            setTimeout(() => {
                clearFlippedCards();
            }, CARD_FLIP_TIMEOUT);
        }
    }

    function clearFlippedCards() {
        for (const card of flippedCards) {
            card.classList.toggle('flipped');
            card.querySelector("img").classList.toggle("hidden")
        }
        flippedCards = [];
    }
}

app();
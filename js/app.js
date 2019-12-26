const CARD_FLIP_TIMEOUT = 1500;

// using a function to isolate the scope
function app() {
    let moves = 0;
    let flippedCards = [];
    const matchedCards = [];

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
        card.classList.add('flipped');
        card.querySelector("img").classList.remove("hidden");
        flippedCards.push(card);
        if (flippedCards.length === 2) {
            incrementMoves();
            if (cardsAreMatching(flippedCards[0], flippedCards[1])) {
                onMatchedCards(flippedCards[0], flippedCards[1]);
            } else {
                onUnmatchedCards(flippedCards[0], flippedCards[1]);
            }
        }
    }

    function clearFlippedCards() {
        for (const card of flippedCards) {
            card.classList.remove('flipped', 'matched-wrong');
            card.querySelector("img").classList.add("hidden")
        }
        flippedCards = [];
    }

    function cardsAreMatching(card1, card2) {
        const src1 = card1.querySelector('img').getAttribute('src');
        const src2 = card2.querySelector('img').getAttribute('src');
        return src1 === src2;
    }

    function onMatchedCards(card1, card2) {
        card1.classList.add("matched-correct");
        card2.classList.add("matched-correct");
        matchedCards.push(card1, card2);
        if (matchedCards.length === 16) {
            endGame();
        }
        setTimeout(() => {
            card1.classList.remove("matched-correct");
            card2.classList.remove("matched-correct");
            flippedCards = [];
        }, CARD_FLIP_TIMEOUT)
    }

    function onUnmatchedCards(card1, card2) {
        card1.classList.add("matched-wrong");
        card2.classList.add("matched-wrong");
        setTimeout(() => {
            clearFlippedCards();
        }, CARD_FLIP_TIMEOUT);
    }

    function endGame() {
        document.getElementById("num-moves-finish").textContent = moves.toString();
        document.getElementById("game-container").classList.toggle("gone");
        document.getElementById("finish-container").classList.toggle("gone");
    }
}

function restartGame() {
    location.reload();
}

app();

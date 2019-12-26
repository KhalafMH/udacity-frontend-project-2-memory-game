const CARD_FLIP_TIMEOUT = 1500;
const NUMBER_OF_STARS = 3;

// using a function to isolate the scope
function app() {
    let moves = 0;
    let flippedCards = [];
    const matchedCards = [];
    const starsElements = [];
    let stars = NUMBER_OF_STARS;
    let time = performance.now() / 1000;
    const timerElement = document.getElementById("timer");
    let gameEnded = false;

    // add the stars to the DOM
    const starsContainer = document.getElementById("stars-container");
    for (let i = 0; i < NUMBER_OF_STARS; i++) {
        const img = document.createElement('img');
        img.setAttribute('src', 'assets/icons/star-24px.svg');
        starsContainer.appendChild(img);
        starsElements.push(img);
    }

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
        if (moves > 12 && stars === NUMBER_OF_STARS) {
            starsElements[2].src = "assets/icons/star_border-24px.svg";
            stars--;
        }
        if (moves > 18 && stars === (NUMBER_OF_STARS - 1)) {
            starsElements[1].src = "assets/icons/star_border-24px.svg";
            stars--;
        }
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
        document.getElementById("num-stars-finish").textContent = stars.toString();
        document.getElementById("time-finish").textContent = createTimeString();
        document.getElementById("game-container").classList.toggle("gone");
        document.getElementById("finish-container").classList.toggle("gone");
        time = performance.now() / 1000;
        gameEnded = true;
    }

    function updateTimer() {
        time = performance.now() / 1000;
        timerElement.textContent = createTimeString();

        // Update the timer every second
        setTimeout(() => {
            if (!gameEnded) {
                updateTimer();
            }
        }, 1000)
    }

    function createTimeString() {
        return `${Math.floor(time / 3600).toString().padStart(2, "0")}:${Math.floor(time / 60).toString().padStart(2, "0")}:${Math.floor(time % 60).toString().padStart(2, "0")}`
    }

    updateTimer();
}

function restartGame() {
    location.reload();
}

app();

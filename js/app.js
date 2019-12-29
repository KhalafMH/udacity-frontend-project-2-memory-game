const CARD_FLIP_TIMEOUT = 1500;
const NUMBER_OF_STARS = 3;

// using a function to isolate the scope
function app() {
    let moves = 0;
    let selectedCards = []; // the cards selected during a move
    const matchedCards = []; // all the cards that were matched correctly
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
        img.className = "img-fluid";
        starsContainer.appendChild(img);
        starsElements.push(img);
    }

    // set the click listener for the cards
    const cardsContainer = document.getElementById('cards-area');
    let listener = function (event) {
        if (
            event.target.classList.contains('game-card')
            && !event.target.classList.contains('flipped')
            && selectedCards.length < 2
        ) {
            flipCard(event.target)
        }
    };
    cardsContainer.addEventListener('click', listener);

    /**
     * Increments the moves counter and the stars rating and updates the view accordingly.
     */
    function onMoveCompleted() {
        moves++;
        const movesElement = document.getElementById('num-moves');
        movesElement.textContent = moves.toString();
        if (moves > 12 && stars === NUMBER_OF_STARS) {
            starsElements[2].src = "assets/icons/star_border-24px.svg";
            stars--;
        }
        if (moves > 18 && stars === (NUMBER_OF_STARS - 1)) {
            starsElements[1].src = "assets/icons/star_border-24px.svg";
            stars--;
        }
    }

    /**
     * Flips a card and reveals the contained image and handles completing a move.
     * @param {HTMLElement} card - The card element to be flipped.
     */
    function flipCard(card) {
        card.classList.add('flipped');
        card.querySelector("img").classList.remove("hidden");
        selectedCards.push(card);
        if (selectedCards.length === 2) {
            onMoveCompleted();
            if (cardsAreMatching(selectedCards[0], selectedCards[1])) {
                onMatchedCards(selectedCards[0], selectedCards[1]);
            } else {
                onUnmatchedCards(selectedCards[0], selectedCards[1]);
            }
        }
    }

    /**
     * Resets the flipped cards to their initial state.
     */
    function clearFlippedCards() {
        for (const card of selectedCards) {
            card.classList.remove('flipped', 'matched-wrong');
            card.querySelector("img").classList.add("hidden")
        }
        selectedCards = [];
    }

    /**
     * Checks if two cards have the same image.
     * @param {HTMLElement} card1 - The first card element.
     * @param {HTMLElement} card2 - The second card element.
     * @returns {boolean} - `true` if the cards have the same image and `false` otherwise.
     */
    function cardsAreMatching(card1, card2) {
        const src1 = card1.querySelector('img').getAttribute('src');
        const src2 = card2.querySelector('img').getAttribute('src');
        return src1 === src2;
    }

    /**
     * Handler for when the user selects two matching cards.
     * Will highlight the cards temporarily indicating correctness and then keep them flipped.
     * @param {HTMLElement} card1 - The first card.
     * @param {HTMLElement} card2 - The second card.
     */
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
            selectedCards = [];
        }, CARD_FLIP_TIMEOUT)
    }

    /**
     * Handler for when the user selects two unmatching cards.
     * Will highlight the cards temporarily indicating wrongness and then reset them.
     * @param {HTMLElement} card1 - The first card.
     * @param {HTMLElement} card2 - The second card.
     */
    function onUnmatchedCards(card1, card2) {
        card1.classList.add("matched-wrong");
        card2.classList.add("matched-wrong");
        setTimeout(() => {
            clearFlippedCards();
        }, CARD_FLIP_TIMEOUT);
    }

    /**
     * Ends the game and shows the stats.
     */
    function endGame() {
        gameEnded = true;
        time = performance.now() / 1000; // update the time for better precision than the latest update.
        document.getElementById("num-moves-finish").textContent = moves.toString();
        document.getElementById("num-stars-finish").textContent = stars.toString();
        document.getElementById("time-finish").textContent = createTimeString(time);
        document.getElementById("game-container").classList.toggle("gone");
        document.getElementById("finish-container").classList.toggle("gone");
    }

    /**
     * Repeatedly updates the timer asynchronously.
     */
    function updateTimer() {
        time = performance.now() / 1000;
        timerElement.textContent = createTimeString(time);

        // Update the timer every second
        setTimeout(() => {
            if (!gameEnded) {
                updateTimer();
            }
        }, 1000)
    }

    /**
     * Creates a string representation of the time in the format `hh:mm:ss`
     * @param {number} seconds - The number of seconds to be formatted.
     * @returns {string} - The string representation of the time in the format `hh:mm:ss`
     */
    function createTimeString(seconds) {
        const hoursString = Math.floor(seconds / 3600).toString().padStart(2, "0");
        const minutesString = Math.floor(seconds / 60 % 60).toString().padStart(2, "0");
        const secondsString = Math.floor(seconds % 60).toString().padStart(2, "0");

        return `${hoursString}:${minutesString}:${secondsString}`
    }

    // Start the timer
    updateTimer();
}

/**
 * Restarts the game.
 */
function restartGame() {
    location.reload();
}

// Run the app
app();

// using a function to isolate the scope
function initializeView() {
    // initialize the number of moves view
    document.getElementById("num-moves").textContent = 0;

    // create a randomized array of icons
    let iconSources = [
        "assets/img/balloon.svg",
        "assets/img/beard.svg",
        "assets/img/beer.svg",
        "assets/img/cake.svg",
        "assets/img/calendar.svg",
        "assets/img/clock.svg",
        "assets/img/cocktail.svg",
        "assets/img/hat.svg"
    ];
    iconSources.push(...iconSources);
    iconSources = _.shuffle(iconSources);

    // will contain the cards
    const cardsFragment = document.createDocumentFragment();

    // create four rows of cards
    for (let i = 0; i < 4; i++) {
        const row = document.createElement("div");
        row.classList.add("row", "container-fluid", "align-items-center", "justify-content-center");

        // create four cards in a row
        for (let j = 0; j < 4; j++) {
            // the card object
            const card = document.createElement('div');
            card.className = "d-flex col-auto game-card align-items-center justify-content-center card-box";

            // the image inside the card
            const icon = document.createElement('img');
            icon.setAttribute("src", iconSources[4 * i + j]);
            icon.classList.add("game-card__image--hidden", "img-fluid");

            card.appendChild(icon);
            row.appendChild(card);
        }

        cardsFragment.appendChild(row);
    }

    const cardsContainer = document.getElementById("cards-area");
    cardsContainer.appendChild(cardsFragment);
}

initializeView();
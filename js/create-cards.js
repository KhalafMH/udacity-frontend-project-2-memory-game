// using a function to isolate the scope
function createCards() {
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

    const fragment = document.createDocumentFragment();

    // create four rows of cards
    for (let i = 0; i < 4; i++) {
        const row = document.createElement("div");
        row.classList.add("row", "container-fluid", "align-items-center", "justify-content-center");

        // create four cards in a row
        for (let j = 0; j < 4; j++) {
            const card = document.createElement('div');
            card.className = "d-flex col-auto game-card align-items-center justify-content-center";

            const icon = document.createElement('img');
            icon.setAttribute("src", iconSources[4 * i + j]);
            icon.classList.add("hidden");

            card.appendChild(icon);
            row.appendChild(card);
        }

        fragment.appendChild(row);
    }

    const cardsContainer = document.getElementById("cards-area");
    cardsContainer.appendChild(fragment);
}

createCards();
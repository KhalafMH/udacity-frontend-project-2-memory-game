// using a function to isolate the scope
function createCards() {
    const fragment = document.createDocumentFragment();

    // create four rows of cards
    for (let i = 0; i < 4; i++) {
        const row = document.createElement("div");
        row.classList.add("row", "container-fluid", "align-items-center", "justify-content-center");

        // create four cards in a row
        for (let j = 0; j < 4; j++) {
            const card = document.createElement("div");
            card.classList.add("col-auto", "game-card");
            row.appendChild(card);
        }

        fragment.appendChild(row);
    }

    const cardsContainer = document.getElementById("cards-area");
    cardsContainer.appendChild(fragment);
}

createCards();
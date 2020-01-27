# Memory Game (Udacity Frontend Web Developer Nanodegree Project 2)
My implementation of the "Concentration" game for the second project of the Udacity Frontend Developer Nanodegree.


## Playing the Game
A live version of the game is hosted at:

https://khalafmh.github.io/udacity-frontend-project-2-memory-game/

The game rules are as follows:

* The user is presented with a grid of 16 cards with hidden images.
* When the user clicks a card it is flipped and the contained image is revealed.
* When the user clicks a second card its image is also revealed and a move is counted.
* If the two selected cards are matching then they remain flipped.
* If the two selected cards are unmatched then they are hidden again.
* The user wins the game when all of the cards are matched correctly.

After finishing the game the user will be presented with a score comprised of the star rating, number of moves, 
and time taken.

The stars rating is determined as follows:

* The user has 3 stars at the start of the game.
* The user loses a star if they don't finish the game within 12 moves.
* The user loses a second star if they don't finish the game within 18 moves.


## Code Dependencies
The website depends on [Bootstrap 4](https://getbootstrap.com/) along with its dependencies (jQuery and Popper.js)
and the [Lodash](https://lodash.com/) JavaScript library.

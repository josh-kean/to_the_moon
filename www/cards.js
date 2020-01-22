//function to draw stack of cards to screen
//card will be drawn following a button call

import {cardPull} from './card_def';

function backSide() {
	var canvas = document.querySelector(".card-display");
	canvas.innerHTML = '<h1> card not drawn</h1>';
}


function cards(round, n) {
	var canvas = document.querySelector(".card-display");
	canvas.innerHTML = `<h1>"${cardPull(round, n)}"</h1>`;
}

export function drawCards(round, card) { //if card == 0 then backs of cards are shown
	if (card === -1) {
		backSide();
	} else {
		cards(round, card);
	}

}


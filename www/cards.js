//function to draw stack of cards to screen
//card will be drawn following a button call

function backSide() {
	var canvas = document.querySelector(".cards-canvas");
	var ctx = canvas.getContext("2d");

	ctx.fillStyle=(50,50,50);

	ctx.beginPath();
	ctx.fillRect(10, 10, 80, 80);
	ctx.stroke();
}


function cards(n) {
	var canvas = document.querySelector(".cards-canvas");
	var ctx = canvas.getContext("2d");

	ctx.fillStyle=(50,50,50);

	ctx.beginPath();
	ctx.fillRect(10, 10, 50, 50); //eventually change so it shows the card with the desired text
	ctx.stroke();
}

export function drawCards(card) { //if card == 0 then backs of cards are shown
	if (card === -1) {
		backSide();
	} else {
		cards(card);
	}

}


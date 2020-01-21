import {Game} from "to-the-moon";

//generate 1 dice for each miner

function drawDice(dice) {
	let diceCanvas = document.getElementById("dice-roll");
	let d = diceCanvas.getContext("2d");
	let sides = 10;
	for (let i = 0; i < dice.length; i++) {
		d.beginPath();
		d.fillStyle((50,50,50));
		d.rect(sides*i+10, sides, sides-5, sides-5);
		d.stroke();
	}
}

export function rollDice() {
	//game roll dice should internally know who the current player is...
	drawDice(Game.rollDice());
}


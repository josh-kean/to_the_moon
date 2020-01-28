let diceFiles = {
	1: "./dice/one.png",
	2: "./dice/two.png",
	3: "./dice/three.png",
	4: "./dice/four.png",
	5: "./dice/five.png",
	6: "./dice/six.png",
}

export function drawDice(dice) {
	let canvas = document.querySelector(".dice");
	canvas.innerHTML = '';

	for (let p = 0; p < dice.length; p++) {
		console.log(dice.length);
		canvas.innerHTML += `<image className="dice-image" src="${diceFiles[dice[p]]}" width="50" height="50" hspace="10"></image>`;
	}
}

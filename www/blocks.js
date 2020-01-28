//function that intakes number of blocks and prints that ammount
//provide an object containing player number and blocks

export function playerBlocks(game) {
	clearTarget(screen);
	let players = game.get_players();
	makePlayerLines(players, game);
	populateLines(players, game); 
}

let screen = document.querySelector('.blockScreen');

let blockFiles = {
	0: "./blocks/image0.png",
	1: "./blocks/image1.png",
	2: "./blocks/image2.png",
	3: "./blocks/image3.png",
}

let blockNames = {
	0: "Bitcoin",
	1: "Ethereum",
	2: "Dogecoin",
	3: "Litecoin",
}

function makePlayerLines(players) {
	for (let i = 0; i < players; i++) {
		let line = document.createElement('div');
		line.setAttribute('class', `player${i}`);
		screen.appendChild(line);
	}
}

function clearTarget(target) {
	while (target.lastChild) {
		target.removeChild(target.lastChild);
	}
}


function makeBlocks(player, height) { //get player height and add blocks
	let line = document.querySelector(`.player${player}`);
	for (let i = 0; i < height; i++) { //display images next to eachother
		let block = document.createElement('IMG');
		block.setAttribute('class', `player${player}`);
		block.setAttribute('src', `${blockFiles[player]}`);
		block.setAttribute('width', '100');
		block.setAttribute('height', '100');
		block.setAttribute('hspace', '10');
		block.setAttribute('vspace', '10');
		line.appendChild(block);
	}
}

function populateLines(players, game) {
	for (let p = 0; p < players; p++) {
		let height = game.player_height(p);
		makeBlocks(p, height);
	}
}

//change this to function that imports game object and renders items to screen

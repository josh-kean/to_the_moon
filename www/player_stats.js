//imports game object to pass values into functions
export function playerStats(game) {	
	clearTarget(screen);
	playerAttributes(game);
	draw_screen();
}

let screen = document.querySelector('.playerInfo');

let name;
let price;
let height;
let failed;
let succed;

let blockNames = {
	0: "Bitcoin",
	1: "Ethereum",
	2: "Dogecoin",
	3: "Litecoin",
}

function clearTarget(target) {
	while (target.lastChild) {
		target.removeChild(target.lastChild);
	}
}

function playerAttributes(game) {
	name = blockNames[game.get_current_player()];
	price = game.get_current_price();
	height = game.player_height();
	failed = game.get_failed_blocks();
	succed = game.get_blocks_in_row();
}

function draw_screen() {
	let stats = document.createElement('div');
	stats.setAttribute('class', 'playerDescription');
	stats.style.font = "normal bold 10px 10 sans-serif";
	let currentPlayer = document.createElement('p');
	let currentPrice = document.createElement('p');
	let currentHeight = document.createElement('p');
	let currentFailedBlocks = document.createElement('p');
	let currentSuccessfulBlocks = document.createElement('p');
	currentPlayer.innerText = `Current Player: ${name}`;
	currentPrice.innerText = `Current Price: ${price.toFixed(2)}`;
	currentHeight.innerText = `Current Height: ${height}`;
	currentFailedBlocks.innerText = `Current Failed Blocks: ${failed}`;
	currentSuccessfulBlocks.innerText = `Current Successful Blocks: ${succed}`;
	stats.appendChild(currentPlayer);
	stats.appendChild(currentPrice);
	stats.appendChild(currentHeight);
	stats.appendChild(currentFailedBlocks);
	stats.appendChild(currentSuccessfulBlocks);
	screen.appendChild(stats);
}



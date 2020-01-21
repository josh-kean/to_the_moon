//function that intakes number of blocks and prints that ammount
//provide an object containing player number and blocks
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

function makeBlocks(l, player, height) {
	let c = ".player"+player;
	let line = document.querySelector(c);
	line.innerHTML = '';
	for (let i = 0; i < height[player]; i++) { //display images next to eachother
		line.innerHTML += `<image className="block-image-{player}-{i}" src="${blockFiles[player]}" width="100" height="100" hspace="10" vspace="10"></image>`;
	}
}


export function playerBlocks(players, heights) {
	let sides = 50; 
	for (let p = 0; p < players; p++) {
		makeBlocks(sides, p, heights);
	}
}


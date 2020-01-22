import {Game} from "to-the-moon";
import {playerBlocks} from "./blocks";
import {drawCards} from "./cards";
import {rollDice} from "./turns";
import {cardPull} from "./card_def";
import {drawDice} from "./dice";

const cardBtn1 = document.querySelector('.first-card-button');
const mineBtn = document.querySelector('.mine-button');
const cardBtn2 = document.querySelector('.second-card-button');
const players = document.querySelector(".set-players");

const game = Game.new();
let num_players;

let blockNames = {
	0: "Bitcoin",
	1: "Ethereum",
	2: "Dogecoin",
	3: "Litecoin",
}

function playerBlockHeights() {
	let heights = {};
	for (let p = 0; p < game.get_players(); p++) {
		heights[p] = game.player_height(p);
	}
	return heights;
}

function player_div_elements(n) {
	let progress = document.querySelector('.player-progress');
	progress.innerHTML = '';
	for (let i = 0; i < n; i++) {
		progress.innerHTML += `<div class="player${i}"></div>`
	}
}

function current_player() {
	let cp = document.querySelector('.current-player');
	let current = game.get_current_player();
	cp.innerHTML = `<h1>current player ${blockNames[current]}</h1>`;
}


//function to pass number of players into game element
function set_players(players) {
	if (players <1 || players > 4) {
		alert("not enough players");
	} else {
		game.set_players(players); //calls rust function that creates vector of players
		player_div_elements(players);
	}
}

function playerScores() {
	let price = document.querySelector('.player-scores');
	let prices = game.player_prices();
	price.innerHTML = '';
	for (let p = 0; p < prices.length; p++) {
		price.innerHTML += `<p>${blockNames[p]}: ${prices[p].toFixed(2)}</p>`;
	}
}


function pullCard(round) {
	playerScores();
	let card = game.draw_card();
	drawCards(round, card); //placeholder for now. eventually pass in drawn cards value
}

function firstRound() {
	current_player();
	let height = playerBlockHeights();
	playerBlocks(game.get_players(), height);
	cardBtn1.style.display="none";
	cardBtn2.style.display="none";
	mineBtn.style.display="initial";
	pullCard(0);
}

function secondRound() {
	pullCard(1);
	firstRound();
}

function mineBlock() {
	//game.mine will return dice if successful mining
	playerScores();
	let dice = game.mine();
	if (dice[0] === 0) {
		cardBtn1.style.display="inline"
		mineBtn.style.display="none";
		cardBtn2.style.display="none";
		firstRound();
		//call next player
	} else if (dice[dice.length-1] === 7) {
		drawDice(dice.slice(0,dice.length-1));
		cardBtn2.style.display="inline";
		mineBtn.style.display="none";
	} else {
		drawDice(dice);
	}

}


function buttonFunctionality() {
	cardBtn1.addEventListener("click", () => {firstRound()});
	cardBtn2.addEventListener("click", () => {secondRound()});
	mineBtn.addEventListener("click", () => {mineBlock()});
}

function main_game() {
	let height = playerBlockHeights();
	document.querySelector('.first-card-button').style.display="initial";//sets first card button as visible
	//main_game should be a continuous loop
	//step1: players draws a card
	//step2: effects of card are applied to character (happens inside rust, not js
	//step3: players mines block
	//step4: if player mines block, draw second card, else end turn and update current player
	playerScores();
	drawCards(0, -1);
	playerBlocks(game.get_players(), height);
}

const game_setup = () => {
	players.innerHTML = "<h1>enter number of players</h1>";
	let player_number = document.createElement("input");
	player_number.setAttribute("type", "number");
	player_number.setAttribute("id", "num_players");
	let player_number_collect = document.createElement("BUTTON");
	player_number_collect.innerHTML = "set players";
	player_number_collect.setAttribute("id", "set_num_players");
	players.appendChild(player_number);
	players.appendChild(player_number_collect);
	player_number_collect.addEventListener("click", () => {
		players.style.display="none";
		let num_players = Number(player_number.value);
		set_players(num_players);
		buttonFunctionality();
		main_game();
	});

}

game_setup();

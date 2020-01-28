import {Game} from "to-the-moon";
import {startGame, getPlayers} from "./game_start"; //want to render startGame at start of game
import {playerBlocks} from "./blocks"; //todo revise playerBlocks to render to blockScreen
import {playerStats} from "./player_stats";
import {cardScreen, drawCards} from "./cards";
import {diceScreen, roll} from "./mine";

const game = Game.new();

function renderBlocks() {
	playerBlocks(game);
}

function buttonFunctionality() { //use this but add try except to assign these as they're generated
	document.querySelector('.setPlayerButton').addEventListener('click', () => {
		let n = getPlayers();
		game.set_players(n);
		document.querySelector('.setPlayers').style.visibility="hidden";
		document.querySelector('.cardButton1').style.visibility="visible";
		document.querySelector('.blockScreen').style.visibility="visible";
		document.querySelector('.cardPull').style.visibility="visible";
		document.querySelector('.playerInfo').style.visibility="visible";
		document.querySelector('.miningScreen').style.visibility="visible";
		renderBlocks();
		playerStats(game);
	});

	document.querySelector('.mineButton').addEventListener('click', () => {
		let r = game.mine() 
		let result = roll(r, game.get_difficulty());
		if (result === 7 || result === 0) {
			document.querySelector('.mineButton').style.visibility='hidden';
			document.querySelector('.cardButton2').style.visibility='visible';
		} else if (result === 0) {
			document.querySelector('.mineButton').style.visibility='hidden';
			document.querySelector('.cardButton1').style.visibility='visible';
		}
		renderBlocks();
		playerStats(game);
	});

	document.querySelector('.cardButton1').addEventListener('click', () => {
		let c = game.draw_card(0);
		drawCards(0, c);
		document.querySelector('.cardButton1').style.visibility='hidden';
		document.querySelector('.mineButton').style.visibility='visible';
		renderBlocks();
		playerStats(game);
	});

	document.querySelector('.cardButton2').addEventListener('click', () => {
		let c = game.draw_card(1);
		drawCards(1, c);
		document.querySelector('.cardButton1').style.visibility='visible';
		document.querySelector('.cardButton2').style.visibility='hidden';
		renderBlocks();
		playerStats(game);
	});
}

startGame();
cardScreen();
diceScreen();
buttonFunctionality();


//need to go back to draw cards

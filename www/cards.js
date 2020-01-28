export function cardScreen() {
	initial()
}

export function drawCards(round, card) { //if card == 0 then backs of cards are shown
	drawCard(round, card);
}

//function to draw stack of cards to screen
//card will be drawn following a button call

import {cardPull} from './card_def';

let screen = document.querySelector('.cardPull');

function btn() {
	let btn1 = document.createElement('BUTTON');
	let btn2 = document.createElement('BUTTON');
	btn1.setAttribute('class', 'cardButton1');
	btn1.innerText = "draw a card";
	btn1.style.position = 'absolute';
	btn2.setAttribute('class', 'cardButton2');
	btn2.innerText = "draw a card";
	btn2.style.position = 'absolute';
	document.querySelector('.buttons').appendChild(btn1);
	document.querySelector('.buttons').appendChild(btn2);
}

function clearTarget(target) {
	while (target.lastChild) {
		target.removeChild(target.lastChild);
	}
}

function initial() {
	let draw = document.createElement('div');
	draw.setAttribute('class', 'card-text');
	draw.setAttribute('id', 'cards');
	screen.appendChild(draw);
	btn();
}

function drawCard(round, n) {
	let card = document.querySelector('.card-text');
	clearTarget(card);
	card.innerText = cardPull(round, n);
}


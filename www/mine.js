//function to draw each dice to the screen
export function diceScreen() {
	gameScreen();
}

export function roll(r, difficulty) { //r is a roll taken from the main game
	clearTarget(document.querySelector('.diceRow'));
	for (let i = 0; i < r.length; i++) {
		if (r[i] > 0 && r[i] < 7) {
			let img = document.createElement('IMG');
			img.setAttribute('src', `${diceFiles[r[i]]}`);
			img.setAttribute('width', '50');
			img.setAttribute('height', '50');
			img.setAttribute('class', 'dice-image');
			img.setAttribute('hspace', '10');
			document.querySelector('.diceRow').appendChild(img);
		}
	}
	let rollSum = addDice(r);
	compare(rollSum, difficulty);
	return r[r.length-1];
}

let diceFiles = {
	1: "./dice/one.png",
	2: "./dice/two.png",
	3: "./dice/three.png",
	4: "./dice/four.png",
	5: "./dice/five.png",
	6: "./dice/six.png",
}

let screen = document.querySelector('.miningScreen');
let rollResult = 'trying'; //failed for 5 bad rolls, passed for successful roll, trying for still allowed to roll

//function to create div elements in game

function mineBtn(){
	let btn = document.createElement('BUTTON');
	btn.setAttribute('class', 'mineButton');
	btn.setAttribute('id', 'mine');
	btn.innerText = 'Mine a block';
	document.querySelector('.buttons').appendChild(btn);
}

function gameScreen() {
	let diceRow = document.createElement('div');
	diceRow.setAttribute('class', 'diceRow'); //row that alll rolled dice go
	diceRow.setAttribute('id', 'mine');
	let resultRow = document.createElement('div');
	resultRow.setAttribute('class', 'resultRow'); //row where sum is compared to difficulty
	resultRow.setAttribute('id', 'mine');
	screen.appendChild(diceRow);
	screen.appendChild(resultRow);
	mineBtn();
}

function clearTarget(target) {
	while (target.lastChild) {
		target.removeChild(target.lastChild);
	}
}

function addDice(roll) {
	let r;
	if (roll[roll.length-1] === 7) {
		r = roll.slice(0, roll.length-2);
	} else if (roll === [0]) {
		return roll;
	} else {
		r = roll;
	}
	let s = 0;
	for (let i = 0; i < r.length; i++) {
		s +=r[i];
	}
	return s;
}


function compare(sum, difficulty) {
	let compareRow = document.querySelector('.resultRow');
	clearTarget(compareRow);
	let comment = document.createElement('div');
	comment.setAttribute('id', 'mine');
	compareRow.appendChild(comment);
	let narrate = document.createElement('div');
	narrate.setAttribute('id', 'mine');
	compareRow.appendChild(narrate);
	if (sum === 0) {
	} else if (sum < difficulty) {
		comment.innerText = 'you mined a block';
		narrate.innerText = `${sum} < ${difficulty}`
		narrate.style.color = 'green';
		rollResult = 1;
	} else {
		comment.innerText = 'try again';
		narrate.innerHTML = `${sum} > ${difficulty}`
		narrate.style.color = 'red';
	}
}


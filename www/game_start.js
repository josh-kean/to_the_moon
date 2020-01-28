export function startGame() {
	set_player_button();
	drop_down_list();
}

//this function gets the selected number of players and returns the value
export function getPlayers() {
	let menu = document.querySelector('.playerSelectC');
	let n = menu.options[menu.selectedIndex].value;
	return n;
}

let screen = document.querySelector('.setPlayers');


//append drop down list to screen
function drop_down_list() {
	let options = [1,2,3,4];
	let list = document.createElement('select');
	list.setAttribute('class', 'playerSelectC');
	for (let i = 0; i < options.length; i++) {
		var opt = document.createElement('option');
		opt.value = i+1;
		opt.innerHTML = i+1;
		list.appendChild(opt);
	}
	screen.appendChild(list);
}

//append player button to screen
function set_player_button() {
	let btn = document.createElement('button');
	btn.setAttribute('class', 'setPlayerButton');
	btn.innerHTML = 'Set the Number of Players';
	screen.appendChild(btn);
}

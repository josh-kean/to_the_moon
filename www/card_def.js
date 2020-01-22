let round1 = {
	1: "The country of kekistan's currency implodes.\nPrice goes up 50$",
	2: "A meme on twitter dissing your coin goes viral.\m Price goes down 200$",
	3: "The UN makes a news statement aout your coin.\n Price goes up 8$",
	4: "Walmart accepts crypto payments.\n Price goes up 200$",
	6: "A book was published about your cryptocurrency.\n price goes up 5$",
	7: "easy card 7.\n price goes up 5$",
	8: "easy card 8.\n price goes up 5$",
	9: "easy card 9.\n price goes up 5$",
}

let round2 = {
	1: "Your blockchain experiences a hard fork.\n Price goes down 1000$",
	2: "Floods wipe out mining equipment factory.\n You loose a miner.",
	3: "Your blockchain experienced a halvening.\n Price goes up 3000$",
	4: "You just had 10 block long orphan chain.\n you loose 2 miners",
	5: "hard card 5.\n Price goes down 500$",
	6: "hard card 6.\n Price goes down 500$",
	7: "hard card 7.\n Price goes down 500$",
	8: "hard card 8.\n Price goes down 500$",
	9: "hard card 9.\n Price goes down 500$",
}

export function cardPull(round, card) {
	if (round === "first") { 
		return round1[card];
	} else {
		return round2[card];
	}
}


let round1 = {
	1: "The country of kekistan's currency implodes.\nPrice goes up 50$",
	2: "A meme on twitter dissing your coin goes viral.\m Price goes down 200$",
	3: "The UN makes a news statement aout your coin.\n Price goes up 8$",
	4: "Walmart accepts crypto payments.\n Price goes up 200$",
	5: "A book was published about your cryptocurrency.\n price goes up 5$",
}

let round2 = {
	1: "Your blockchain experiences a hard fork.\n Price goes down 1000$",
	2: "Floods wipe out mining equipment factory.\n You loose a miner.",
	3: "Your blockchain experienced a halvening.\n Price goes up 3000$",
	4: "You just had 10 block long orphan chain.\n you loose 2 miners",
	5: "A smartcontract on your chain lost 5 billion dollars.\n Price goes down 500$",
}

export function cardPull(round, card) {
	if (round === "first") { 
		return round1[1];
	} else {
		return round2[1];
	}
}


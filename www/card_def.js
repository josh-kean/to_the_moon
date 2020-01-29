let round1 = {
	1: "A news report about your coin is published\nYour coin price goes up 5%",
	2: "A new ASIC came out for your blockchain\n You gain 1 miner",
	3: "2 orphan blocks were just mined on your chain\n Your height goes down by 1",
	4: "Your average block time was too quick\n Difficulty goes up by 10",
	5: "Unfavorable tax laws were just drafted\n Your coin price goes down 10%",
	6: "A book was published about your cryptocurrency.\n Your price goes up 20%",
	7: "A fire broke out at a mining facility\n You loose 1 miner",
	8: "For no explanable reason your price drops 30$",
	9: "The last 3 blocks were mined quicker than usual, your block height has increased by 3",
}

let round2 = {
	1: "Your blockchain experiences a controversial hard fork.\n Price goes down 30%",
	2: "Floods wipe out mining equipment factory.\n You loose a miner.",
	3: "Your blockchain experienced a halvening.\n Price goes up 30%",
	4: "You just had 10 block long orphan chain.\n you loose 2 miners",
	5: "Somebody just attacked your blockchain.\n The price goes down 10%",
	6: "For some unknown reason your \ncoins price increases by 40%",
	7: "All the miners mining your coin \nhave been arrested. Only 1 remains",
	8: "Your coin has become popular and \neverybody wants to mine it. Gain 10 miners",
	9: "You've been pump and dumped. \nYour price drops 50% because of the fallout",
}

export function cardPull(round, card) {
	if (round === "first") { 
		return round1[card];
	} else {
		return round2[card];
	}
}


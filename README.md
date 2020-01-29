# To The Moon
Welcome to To The Moon. This program is an interactive experience that teaches the players how a blockchain works and how the world of cryptocurrency economics works. It's still a work in progress, but as of now players can use this game to understand the basics of blockchains and cryptocurrencies.

## The Game
Each player plays as a specific blockchain which has the following attributes;
1. Price
2. Number of Blocks (height)
3. Miners
4. Difficulty Level

These attributes change throughout the game depending on what happens to your crypto currency

## Start of the Game
At the start of the game the user enters the number of players.
The players are assigned in the following order;
1. Bitcoin
2. Ethereum
3. Dogecoin
4. Litecoin
As of now the players will always be assigned in this order, but future versions will have more freedom in choosing players, along with the option to make your own blockchain!

Each player starts out with their initial block, known as a genesis block, which has predetermined attributes. Some have more miners, but a lower price. Some have a greater difficulty and less miners but a higher price. All of these effect what a player can do each turn.

## Each turn
Each turn has 2 to 3 steps involved.
1. Player pulls a card which is immediatley applied to their blockchain
2. The player tries to mine a block (covered in detail later)
3. If the player mines a block, they get to draw another card

## Pulling the first card
The player will click on the draw a card button. This will randomly select a card in the first deck of cards. Afterwards the player will get the chance to mine a block

## Mining a block
In a real blockchain, a block is mined by performing the SHA256 hash function on data specific to that block. The SHA256 function returns a number between 0 and 2^256, which is a VERY large number. If the number is below a specified value, a block has been successfully mined.

In this game mining is simulated in an easier to understand manner. To mine a block, each player will have to roll a certian number of dice. They also have a number they want their dice roll to be below. If they roll below that number then they have mined a block. The number of dice is decided by subtracting the number of miners from the number 10. More miners means less dice which means lower numbers.
If a block is mined the player gets to draw a second card which has greater risk but also greater reward.


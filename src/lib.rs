mod utils;
mod blockchains;
mod cards;

use std::time::SystemTime;
use wasm_bindgen::prelude::*;
use rand::{thread_rng, Rng};

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
pub struct Game {
    players: Vec<blockchains::BlockChain>,
    current_player: usize,
    cards_round_1: Vec<cards::Card>,
    cards_round_2: Vec<cards::Card>,
    current_turn_mine: bool, //each turn has a block mining session. always starts out as false
}

//want to have two impls on Game struct. One for fcns exported to JS, one for internal fcns

//this impl contains internal functions that JS does not see
impl Game {
    //function to create the players in the game
    fn make_players(num_players: usize) -> Vec<blockchains::BlockChain> {
        let mut players: Vec<blockchains::BlockChain> = Vec::new();
        if num_players == 0 {
            panic!("not enough players");
        } if num_players >= 1 {
            players.push(blockchains::BlockChain::bitcoin());
        } if num_players >= 2 {
            players.push(blockchains::BlockChain::ethereum());
        } if num_players >= 3 {
            players.push(blockchains::BlockChain::dogecoin());
        } if num_players == 4 {
            players.push(blockchains::BlockChain::litecoin());
        }
        //exports a Vector that contains the appropriate amount of blockchain structs
        //called by public function 
        players     
    }

    fn adjust_price(&mut self) { //every 3rd consecutive block increase price
        if self.players[self.current_player].blocks_in_row%3 == 0 {
            self.players[self.current_player].price *= (1.0+(self.players[self.current_player].blocks_in_row as f32)/30.0);
        } else if self.players[self.current_player].failed_blocks%3 == 0{
            self.players[self.current_player].price *= (1.0-(self.players[self.current_player].failed_blocks as f32)/30.0);
        } else {
            panic!("unknown situation");
        }
    }

    fn get_num_players(&self) -> usize {
        self.players.len()
    }

    fn shuffle_cards(deck: Vec<cards::Card>) -> cards::Card {
        //code to randomly select one card and return said card
        //temporarily returning a card just so program won't yell at me
        cards::Card::new(1,1,1)
    }

    fn apply_card(&mut self, card: cards::Card) {
        if card.attribute == 0 {
            if self.players[self.current_player].height + (card.change as u32) > 0 {
                self.players[self.current_player].height += card.change as u32;
            } else {
                self.players[self.current_player].height = 1;
            }
        } else if card.attribute == 1 {
            if self.players[self.current_player].difficulty + (card.change as usize) > 0 {
                self.players[self.current_player].difficulty += card.change as usize;
            } else {
                self.players[self.current_player].difficulty = 1;
            }
        } else if card.attribute == 2 {
            if self.players[self.current_player].miners + (card.change as usize) > 0 {
                self.players[self.current_player].miners += card.change as usize;
            } else {
                self.players[self.current_player].miners = 1;
            }
        } else if card.attribute == 3 {
            if self.players[self.current_player].price + (card.change as f32) > 0.0 {
                self.players[self.current_player].price += card.change as f32;
            } else {
                self.players[self.current_player].price = 1.0;
            }
        } else {
            panic!("card input is not valid");
        }
    }

    //takes in the rolled result, compares to mining requirement, and outputs if a block was mined
    //or not
    fn mine_block(&mut self, roll: usize) -> bool {
        if roll < self.players[self.current_player].difficulty {
            self.players[self.current_player].height +=1;
            self.players[self.current_player].price +=1.0; //change back to blocks_in_row
            true
        } else {
            false
        }
    }

}

fn rando_num(range: usize) -> usize {
    let n: usize;
    let mut num = rand::thread_rng();
    n = num.gen_range(1, range).clone();
    n
}

//this impl exports all function to JS
#[wasm_bindgen]
impl Game {
    //creates new game struct
    pub fn new() -> Game {
        Game {
            players: Vec::new(), //eventuall changed as game progresses
            current_player: 0,
            cards_round_1: cards::Card::cards(),
            cards_round_2: cards::Card::special_cards(),
            current_turn_mine: false,
        }
    }

    pub fn set_players(&mut self, num_players: usize) { //js provides amount of players
        self.players = Game::make_players(num_players as usize);
    }

    pub fn get_players(&self) -> usize { //returns number of players in the game
        self.get_num_players()
    }

    pub fn player_height(&self, player: usize) -> u32 {
        self.players[player].height //returns the height of the player in question
    }

    pub fn player_prices(&mut self) -> Vec<f32> {
        let mut prices: Vec<f32> = Vec::new();
        for p in self.players.iter() {
            prices.push(p.price);
        }
        //replace with iterator that does for loop in one line
        prices
    }

    //todo: replace current_player to be a usize that points to current player in vec
    pub fn mine(&mut self) -> Vec<usize> {
        let mut roll: Vec<usize> = Vec::new();
        let mut x: usize = 0;
        while x <= 10 - self.players[self.current_player].miners { //only roll 10-num miners dice
            roll.push(rando_num(7));
            x +=1
        }
        let roll_result: usize = roll.iter().sum(); //returns the sum of all dice rolled
        let result = roll_result < self.players[self.current_player].difficulty; 
        self.players[self.current_player].mine_attempts +=1; //tracks number of rolls this turn
        if self.players[self.current_player].mine_attempts > self.players[self.current_player].target_mining_time as u32 {
            self.players[self.current_player].blocks_in_row = 0;
            self.players[self.current_player].failed_blocks += 1;
            self.adjust_price();
            [0].to_vec()
        } else if result {
            self.adjust_price();
            roll.push(7);
            self.players[self.current_player].height +=1;
            self.players[self.current_player].blocks_in_row +=1;
            self.players[self.current_player].failed_blocks = 0;
            self.players[self.current_player].mine_attempts = (self.players[self.current_player].difficulty+1) as u32; //does this to prevent mining of more than one block
            roll
        } else {
            roll
        }
    }

    pub fn draw_card(&mut self, round: usize) -> usize {
        let n = rando_num(3);
        let card = match round {
            0 => self.cards_round_1[0],
            1 => self.cards_round_2[0],
            _ => { panic!("not a proper round")},
        };
        self.apply_card(card);
        card.event
    }

    pub fn next_player(&mut self) {
        self.players[self.current_player].mine_attempts = 0;
        self.current_player = (self.current_player+1)%self.players.len() as usize;
        self.players[self.current_player].mine_attempts = 0; //reset mining count
    }

}
//only the turn function, draw_card function, and roll_dice function should be publicly available.
//all other functions are called within the turn function


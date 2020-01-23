mod utils;
mod blockchains;
mod cards;

use wasm_bindgen::prelude::*;
use rand::{Rng};

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
            self.players[self.current_player].price *= 1.0+(self.players[self.current_player].blocks_in_row as f32)/30.0;
        } else if self.players[self.current_player].failed_blocks%3 == 0{
            self.players[self.current_player].price *= 1.0-(self.players[self.current_player].failed_blocks as f32)/30.0;
        } else {
            panic!("unknown situation");
        }
    }

    fn get_num_players(&self) -> usize {
        self.players.len()
    }

    fn apply_card(&mut self, card: cards::Card) {
        if card.attribute == 0 {
             if card.change < 0.0 {
                if card.change*-1.0 > self.players[self.current_player].height as f64 {
                    self.players[self.current_player].height = 1;
                } else {
                    self.players[self.current_player].height -= card.change as u32;
                }
             } else {
                self.players[self.current_player].height += card.change as u32;
                }
        } else if card.attribute == 1 {
             if card.change < 0.0 {
                if card.change*-1.0 > self.players[self.current_player].difficulty as f64{
                    self.players[self.current_player].difficulty = 1;
                } else {
                    self.players[self.current_player].difficulty -= card.change as usize;
                }
             } else {
                self.players[self.current_player].difficulty += card.change as usize;
                }
        } else if card.attribute == 2 {
             if card.change < 0.0 {
                if card.change*-1.0 > self.players[self.current_player].miners as f64{
                    self.players[self.current_player].miners = 1;
                } else {
                    self.players[self.current_player].miners -= card.change as usize;
                }
             } else {
                self.players[self.current_player].miners += card.change as usize;
                if self.players[self.current_player].miners > 9 {
                    self.players[self.current_player].miners = 9;
                }
            }
        } else if card.attribute == 3 {
            self.players[self.current_player].price *=card.change;
        } else {
            panic!("card input is not valid");
        }
    }

    fn next_player(&mut self) {
        self.players[self.current_player].mine_attempts = 0;
        self.current_player = (self.current_player+1)%self.players.len() as usize;
        self.players[self.current_player].mine_attempts = 0; //reset mining count
    }
}

fn rando_num(range: usize) -> usize {
    let n: usize;
    let mut num = rand::thread_rng();
    n = num.gen_range(0, range).clone();
    n+1
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
        }
    }

    pub fn set_players(&mut self, num_players: usize) { //js provides amount of players
        self.players = Game::make_players(num_players as usize);
    }

    //keeping all get functions seperate for clarity
    pub fn get_difficulty(&self) -> usize {
        self.players[self.current_player].difficulty
    }

    pub fn get_mine_attempts(&self) -> u32 {
        self.players[self.current_player].mine_attempts
    }

    pub fn get_blocks_in_row(&self) -> usize {
        self.players[self.current_player].blocks_in_row
    }

    pub fn get_failed_blocks(&self) -> usize {
        self.players[self.current_player].failed_blocks
    }

    pub fn get_current_player(&self) -> usize {
        self.current_player
    }

    pub fn get_players(&self) -> usize { //returns number of players in the game
        self.get_num_players()
    }

    pub fn player_height(&self, player: usize) -> u32 {
        self.players[player].height //returns the height of the player in question
    }

    pub fn player_prices(&mut self) -> Vec<f32> {
        let prices: Vec<f32>;
        prices =self.players.iter().map(|x| x.price).collect();
        prices
    }

    //todo: replace current_player to be a usize that points to current player in vec
    pub fn mine(&mut self) -> Vec<usize> {
        let mut roll: Vec<usize> = Vec::new();
        let mut x: usize = 0;
        while x <= 10 - self.players[self.current_player].miners { //only roll 10-num miners dice
            roll.push(rando_num(6));
            x +=1
        }
        let roll_result: usize = roll.iter().sum(); //returns the sum of all dice rolled
        let result = roll_result < self.players[self.current_player].difficulty; 
        self.players[self.current_player].mine_attempts +=1; //tracks number of rolls this turn
        if self.players[self.current_player].mine_attempts > self.players[self.current_player].target_mining_time as u32 {
            self.players[self.current_player].blocks_in_row = 0;
            self.players[self.current_player].failed_blocks += 1;
            self.adjust_price();
            self.next_player();
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
        let n = rando_num(9)-1;
        let card = match round {
            0 => self.cards_round_1[n],
            1 => self.cards_round_2[n],
            _ => { panic!("not a proper round")},
        };
        self.apply_card(card);
        if round == 1 {
            self.next_player();
        }
        card.event
    }


}
//only the turn function, draw_card function, and roll_dice function should be publicly available.
//all other functions are called within the turn function


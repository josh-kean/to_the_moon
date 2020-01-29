use wasm_bindgen::prelude::*;

//need to map events with index numbers

#[wasm_bindgen]
#[derive(Copy, Clone)]
pub struct Card {
    pub event: usize,
    pub attribute: usize,
    pub change: f64,
}

/*
 attribute: 0 -> height
 attribute: 1 -> difficulty
 attribute: 2 -> miners
 attribute: 3 -> price
*/

impl Card {
    pub fn new(e: usize, a: usize, c: f64) -> Self {
        Card {
            event: e,
            attribute: a,
            change: c,
        }
    }


    pub fn cards() -> Vec<Card> {
        let mut cards = Vec::new();
        cards.push(Card::new(1,3,1.05));
        cards.push(Card::new(2,2,1.0));
        cards.push(Card::new(3,0,-1.0));
        cards.push(Card::new(4,1,10.0));
        cards.push(Card::new(5,3,0.90));
        cards.push(Card::new(6,3,1.20));
        cards.push(Card::new(7,2,-1.0));
        cards.push(Card::new(8,3,0.70));
        cards.push(Card::new(9,0,3.0));
        cards
    }

    pub fn special_cards() -> Vec<Card> {
        let mut special_cards = Vec::new();
        special_cards.push(Card::new(1,3,0.70));
        special_cards.push(Card::new(2,2,-1.0));
        special_cards.push(Card::new(3,3,1.30));
        special_cards.push(Card::new(4,2,-2.0));
        special_cards.push(Card::new(5,3,0.90));
        special_cards.push(Card::new(6,3,1.40));
        special_cards.push(Card::new(7,2,-10.0));
        special_cards.push(Card::new(8,2,10.0));
        special_cards.push(Card::new(9,3,0.50));
        special_cards
}

}

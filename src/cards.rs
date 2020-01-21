use wasm_bindgen::prelude::*;

//need to map events with index numbers

#[wasm_bindgen]
#[derive(Copy, Clone)]
pub struct Card {
    pub event: usize,
    pub attribute: usize,
    pub change: i64,
}

impl Card {
    pub fn new(e: usize, a: usize, c: i64) -> Self {
        Card {
            event: e,
            attribute: a,
            change: c,
        }
    }


    pub fn cards() -> Vec<Card> {
        let mut cards = Vec::new();
        cards.push(Card::new(1,1,1));
        cards.push(Card::new(2,2,2));
        cards.push(Card::new(3,3,3));
        cards.push(Card::new(4,4,4));
        cards.push(Card::new(5,5,5));
        cards.push(Card::new(1,1,1));
        cards.push(Card::new(1,1,1));
        cards.push(Card::new(1,1,1));
        cards.push(Card::new(1,1,1));
        cards
    }

    pub fn special_cards() -> Vec<Card> {
        let mut special_cards = Vec::new();
        special_cards.push(Card::new(1,1,1));
        special_cards.push(Card::new(2,2,2));
        special_cards.push(Card::new(3,3,3));
        special_cards.push(Card::new(4,4,4));
        special_cards.push(Card::new(5,5,5));
        special_cards.push(Card::new(1,1,1));
        special_cards.push(Card::new(1,1,1));
        special_cards.push(Card::new(1,1,1));
        special_cards.push(Card::new(1,1,1));
        special_cards
}

}

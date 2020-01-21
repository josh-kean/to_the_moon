use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct BlockChain {
    pub name: usize,
    pub target_mining_time: usize,
    pub height: u32,
    pub difficulty: usize,
    pub miners: usize,
    pub price: f32,
    pub mine_attempts: u32,
    pub blocks_in_row:usize,
    pub failed_blocks: usize //keeps track of how many turns a block isn't mined
}

//blkchain 0 = bitcoin, 1 = ethereum, 2 = dogecoin, 3 = litecoin

impl BlockChain {
    pub fn new(name: usize, tmt: usize, diff: usize) -> Self {
        BlockChain {
            name: name,
            target_mining_time: tmt,
            height: 1, //blocks start at genesis block, or a height of 1
            difficulty: diff,
            miners: 5, //game mechanics dictate everyone starts with 5 miners. this feature can be changed...
            price: 10.0, //in usd, should probably change this based on blockchain characteristics
            mine_attempts: 0,
            blocks_in_row: 0,
            failed_blocks: 0,
        }
    }

    pub fn bitcoin() -> Self {
        BlockChain {
            name: 0,
            target_mining_time: 10, //600 seconds or 10 minutes
            height: 1, //genesis block
            difficulty: 100, //arbitrary number, rought 1/2 dice rolls will be below this number
            miners: 5,
            price: 100.0,
            mine_attempts: 0,
            blocks_in_row: 0,
            failed_blocks: 0,
        }
    }

    pub fn ethereum() -> Self {
        BlockChain {
            name: 1,
            target_mining_time: 3, //30 seconds
            height: 1, //genesis block
            difficulty: 10, //arbitrary number, roughly 2/3 of dice rolls will be below this number
            miners: 5,
            price: 10.0,
            mine_attempts: 0,
            blocks_in_row: 0,
            failed_blocks: 0,
        }
    }

    pub fn dogecoin() -> Self {
        BlockChain {
            name: 2,
            target_mining_time: 5, //120 seconds, check for actual mine time
            height: 1,
            difficulty: 15,
            miners:5,
            price: 1.0,
            mine_attempts: 0,
            blocks_in_row: 0,
            failed_blocks: 0,
        }
    }

    pub fn litecoin() -> Self {
        BlockChain {
            name: 2,
            target_mining_time: 6, //120 seconds, check for actual mine time
            height: 1,
            difficulty: 10,
            miners:5,
            price: 1.0,
            mine_attempts: 0,
            blocks_in_row: 0,
            failed_blocks: 0,
        }
    }
}

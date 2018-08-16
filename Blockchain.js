const Block = require("./Block");

//Last 64 blocks stay in memory

class Blockchain{
	constructor(){
        this.merkleRoot = null; //Buffer
    }
    
    getHighestBlock(){
        
    }

    addBlock(block, parent, cb){
        //cb(err);
    }
}

module.exports = Blockchain;
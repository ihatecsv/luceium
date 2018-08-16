const Hasher = require("./Hasher");

class Block{
	constructor(height){
        this.height = height;
        this.merkleRoot = null; //Buffer
        this.transactions = []; //Transaction[]

        this.parent = null; //Block
        this.children = []; //Block[]
    }

    addChild(block) {
        this.children.push(block);
    }

    setSolution(nonce) {
        this.nonce = nonce;
    }

    addTransaction(transaction){
        this.transactions.push(transaction);
    }

    getMerkleRoot(){
        this.merkleTree = [];
        this.merkleTree[0] = this.transactions.map(transaction => Hasher.hash(transaction.sig))
    }
}

module.exports = Block;
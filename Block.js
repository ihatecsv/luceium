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

    addTransactions(transactions){
        for(let i = 0; i < transactions.length; i++){
            this.addTransaction(transactions[i]);
        }
    }

    getMerkleRoot(){
        this.merkleTree = [];
        this.merkleTree[0] = this.transactions.map(transaction => Hasher.hash(transaction.signature[0]));
        console.log(this.merkleTree);
    }
}

module.exports = Block;
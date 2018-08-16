const Transaction = require("./Transaction");
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
        if(this.transactions.length == 0){
            return Buffer.from("c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470", "hex"); //Return the empty hash
        }
        this.merkleTree = [];
        this.merkleTree[0] = this.transactions.map(transaction => Transaction.getMerkleHash(transaction));

        let currentLevel = 0;
        while(this.merkleTree[currentLevel].length > 1){
            if(this.merkleTree[currentLevel].length % 2 != 0){
                const lastHash = this.merkleTree[currentLevel][this.merkleTree[currentLevel].length-1];
                this.merkleTree[currentLevel].push(lastHash);
            }
            this.merkleTree[currentLevel+1] = [];
            for(let i = 0; i < this.merkleTree[currentLevel].length/2; i++){
                const combinedHashes = Buffer.concat([this.merkleTree[currentLevel][i*2], this.merkleTree[currentLevel][(i*2)+1]]);
                const newHash = Hasher.hash(combinedHashes);
                this.merkleTree[currentLevel+1][i] = newHash;
            }
            currentLevel++;
        }
        return this.merkleTree[currentLevel][0];
    }
}

module.exports = Block;
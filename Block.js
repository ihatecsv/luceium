const Transaction = require("./Transaction");
const Hasher = require("./Hasher");

class Block{
	constructor(parent){
        this.parent = parent; //Block
        this.height = (this.parent != null) ? (parent.height + 1) : 0;
        this.parent != null ? this.parent.addChild(this) : null;

        this.merkleRoot = null; //Buffer
        this.transactions = []; //Transaction[]
        this.children = []; //Block[]
        this.nonce = 0;
    }

    getHash() {
        return Hasher.hash(this.getMineableData());
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

    getMineableData(){
        let parentHash = Buffer.alloc(32);
        if(this.parent != null){
            parentHash = this.parent.getHash();
        }
        const mineableData = {
            height: this.height,
            merkleRoot: this.getMerkleRoot().toString("hex"),
            parentHash: parentHash.toString("hex"),
            nonce: this.nonce
        };
        return JSON.stringify(mineableData);
    }

    getMerkleRoot(){
        this.merkleTree = [];
        if(this.transactions.length == 0){
            return Buffer.from("c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470", "hex"); //Return the empty hash
        }
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

    static printMerkleTree(block){
        for(let i = 0; i < block.merkleTree.length; i++){
            let curLine = "";
            for(let j = 0; j < block.merkleTree[i].length; j++){
                curLine += block.merkleTree[i][j].toString("hex").substr(0, 8) + " ";
            }
            console.log(curLine);
        }
    }
}

module.exports = Block;
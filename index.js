const Transaction = require("./Transaction");
const Account = require("./Account");
const Block = require("./Block");

const diff = 3;

const genesisBlock = new Block(null);

let fakeTransactions = Transaction.generateFakeTransactions(6);

genesisBlock.addTransactions(fakeTransactions);

console.log("Mining genesis");
while(genesisBlock.getHash().toString("hex").substr(0, diff) != "0".repeat(diff)){
    genesisBlock.setSolution(genesisBlock.nonce + 1);
}

let lastBlock = genesisBlock;

for(let i = 0; i < 10; i++){
    const newBlock = new Block(lastBlock);

    console.log("Mining height " + newBlock.height);

    fakeTransactions = Transaction.generateFakeTransactions(2);
    
    newBlock.addTransactions(fakeTransactions);
    
    while(newBlock.getHash().toString("hex").substr(0, diff) != "0".repeat(diff)){
        newBlock.setSolution(newBlock.nonce + 1);
    }

    lastBlock = newBlock;
}

console.log(lastBlock.getMineableData());
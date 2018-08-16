const Transaction = require("./Transaction");
const Account = require("./Account");
const Block = require("./Block");

const genesisBlock = new Block(null);

let fakeTransactions = Transaction.generateFakeTransactions(6);

genesisBlock.addTransactions(fakeTransactions);

genesisBlock.setSolution(5);

const firstBlock = new Block(genesisBlock);

fakeTransactions = Transaction.generateFakeTransactions(2);

firstBlock.addTransactions(fakeTransactions);

const diff = 2;
while(firstBlock.getHash().toString("hex").substr(0, diff) != "0".repeat(diff)){
    console.log(firstBlock.getHash().toString("hex"));
    firstBlock.setSolution(firstBlock.nonce + 1);
}

console.log(firstBlock.getHash().toString("hex"));
const Transaction = require("./Transaction");
const Account = require("./Account");
const Block = require("./Block");

const myAccount = new Account();

const myTrans = new Transaction(1, "0x9c22ff5f21f0b81b113e63f7db6da94fedef11b2", 0.0001, 1, "someFunc", {test: "abc"});
myTrans.sign(myAccount);

const serializedTransaction = Transaction.serialize(myTrans);

const newTrans = Transaction.deserialize(serializedTransaction).transaction;

const newSerializedTransaction = Transaction.serialize(newTrans);

const genesisBlock = new Block(null);

let fakeTransactions = Transaction.generateFakeTransactions(6);

genesisBlock.addTransactions(fakeTransactions);

genesisBlock.setSolution(5);

const firstBlock = new Block(genesisBlock);

fakeTransactions = Transaction.generateFakeTransactions(2);

firstBlock.addTransactions(fakeTransactions);

firstBlock.setSolution(88);

console.log(firstBlock.getHash());
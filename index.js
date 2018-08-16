const Transaction = require("./Transaction");
const Account = require("./Account");
const Block = require("./Block");

const myAccount = new Account();

const myTrans = new Transaction(1, "0x9c22ff5f21f0b81b113e63f7db6da94fedef11b2", 0.0001, 1, "someFunc", {test: "abc"});
myTrans.sign(myAccount);

const serializedTransaction = Transaction.serialize(myTrans);
console.log(serializedTransaction);

const newTrans = Transaction.deserialize(serializedTransaction).transaction;

const newSerializedTransaction = Transaction.serialize(newTrans);
console.log(newSerializedTransaction);
/*
const block = new Block(5);

const fakeTransactions = Transaction.generateFakeTransactions(5);

block.addTransactions(fakeTransactions);

block.getMerkleRoot();
*/
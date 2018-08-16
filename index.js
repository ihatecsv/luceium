const Transaction = require("./Transaction");
const Account = require("./Account");
const Block = require("./Block");

const myAccount = new Account();

const myTrans = new Transaction(1, "0x9c22ff5f21f0b81b113e63f7db6da94fedef11b2", 0.0001, 1, "someFunc", {test: "abc"});
myTrans.sign(myAccount);

const serializedTransaction = Transaction.serialize(myTrans);

const newTrans = Transaction.deserialize(serializedTransaction).transaction;

const newSerializedTransaction = Transaction.serialize(newTrans);

const block = new Block(4);

const fakeTransactions = Transaction.generateFakeTransactions(12);

block.addTransactions(fakeTransactions);

block.getMerkleRoot();

for(let i = 0; i < block.merkleTree.length; i++){
    let curLine = "";
    for(let j = 0; j < block.merkleTree[i].length; j++){
        curLine += block.merkleTree[i][j].toString("hex").substr(0, 8) + " ";
    }
    console.log(curLine);
}
const Transaction = require("./Transaction");
const Account = require("./Account");

const myAccount = new Account();

const myTrans = new Transaction(1, "0x9c22ff5f21f0b81b113e63f7db6da94fedef11b2", 0.0001, 1, "someFunc", {test: "abc"});
const signedTrans = myTrans.sign(myAccount);

console.log(myAccount.getAddress());
console.log();
console.log(signedTrans);
console.log();
console.log(Transaction.parseSignedTransaction(signedTrans));
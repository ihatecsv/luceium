const Transaction = require("./Transaction");
const Account = require("./Account");

const myAccount = new Account();

console.log(myAccount.getAddress());

const myTrans = new Transaction(1, "0x9c22ff5f21f0b81b113e63f7db6da94fedef11b2", 0.0001, 1, "someFunc", {test: "abc"});
const signedTrans1 = myTrans.sign(myAccount);

console.log(Transaction.parseSignedTransaction(signedTrans1, true));
const secp256k1 = require("secp256k1");

const Account = require("./Account");
const Hasher = require("./Hasher");

class Transaction{
	constructor(value, recipient, timeCost, maxTime, method, data, nonce, payload, signature){
		this.value = value;
		this.recipient = recipient;
		this.timeCost = timeCost;
		this.maxTime = maxTime;
		this.method = method;
		this.data = data;
		
		this.nonce = nonce;
		this.payload = payload;
		this.signature = signature;
	}

	getPayload(){
		return JSON.stringify({
			nonce: this.nonce,
			value: this.value,
			recipient: this.recipient,
			timeCost: this.timeCost,
			maxTime: this.maxTime,
			method: this.method,
			data: this.data
		});
	}

	setNonce(nonce){
		this.nonce = nonce;
	}

	sign(account){
		this.setNonce(account.nonce);
		this.payload = this.getPayload();
		const payloadHash = Hasher.hash(this.payload);
		this.signature = account.sign(payloadHash);
	}

	static serialize(transaction){
		return {
			payload: transaction.payload,
			signature: transaction.signature[0].toString("hex"),
			recovery: transaction.signature[1]
		};
	}

	static deserialize(serializedTransaction){
		if(typeof serializedTransaction === "string") serializedTransaction = JSON.parse(serializedTransaction);
		const returnedResult = {};
		returnedResult.verified = false;
		try{
			const payloadHash = Hasher.hash(serializedTransaction.payload);
			const signature = Buffer.from(serializedTransaction.signature, "hex");
			const publicKey = secp256k1.recover(payloadHash, signature, serializedTransaction.recovery, false);
			returnedResult.from = Account.publicKeyToAddress(publicKey);
			returnedResult.verified = secp256k1.verify(payloadHash, signature, publicKey);
		}catch(e){
			returnedResult.from = null;
		}
		const payloadObject = JSON.parse(serializedTransaction.payload);
		returnedResult.nonce = payloadObject.nonce;
		const newTransSig = [Buffer.from(serializedTransaction.signature, "hex"), serializedTransaction.recovery];
		returnedResult.transaction = new this(payloadObject.value, payloadObject.recipient, payloadObject.timeCost, payloadObject.maxTime, payloadObject.method, payloadObject.data, payloadObject.nonce, serializedTransaction.payload, newTransSig);
		return returnedResult;
	}

	static generateFakeTransactions(n){
		const fakeTransactions = [];
		for(let i = 0; i <= n; i++){
			const fakeAccount = new Account();
			const fakeSigningAccount = new Account();
			const fakeValue = Math.floor(Math.random()* 100);
			const fakeTimeCost = Math.random();
			const fakeMaxTime = Math.random()/2;
			
			const fakeTransaction = new Transaction(fakeValue, fakeAccount.getAddress(), fakeTimeCost, fakeMaxTime, "someFunc", {test: "abc"});
			fakeTransaction.sign(fakeSigningAccount);
			fakeTransactions.push(fakeTransaction);
		}
		return fakeTransactions;
	}
}

module.exports = Transaction;
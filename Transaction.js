const secp256k1 = require("secp256k1");
const keccak = require("keccak");

const Account = require("./Account");

class Transaction{
	constructor(value, recipient, timeCost, maxTime, method, data){
		this.value = value;
		this.recipient = recipient;
		this.timeCost = timeCost;
		this.maxTime = maxTime;
		this.method = method;
		this.data = data;
	}

	getPayload(nonce){
		return JSON.stringify({
			nonce: nonce,
			value: this.value,
			recipient: this.recipient,
			timeCost: this.timeCost,
			maxTime: this.maxTime,
			method: this.method,
			data: this.data
		});
	}

	sign(account){
		const payload = this.getPayload(account.nonce);
		const payloadHash = Transaction.hashPayload(payload);
		const signature = account.sign(payloadHash);
		const signedTransactionObj = {payload: payload, signature: signature};
		const signedTransaction = JSON.stringify(signedTransactionObj);
		return signedTransaction;
	}

	static parseSignedTransaction(signedTransaction, verify){
		const signedTransactionObj = JSON.parse(signedTransaction);
		const returnedResult = {};
		if(verify){
			try{
				const payloadHash = Transaction.hashPayload(signedTransactionObj.payload);
				const signatureText = signedTransactionObj.signature[0];
				const signature = Buffer.from(signatureText, "hex");
				const recovery = signedTransactionObj.signature[1];
				const publicKey = secp256k1.recover(payloadHash, signature, recovery, false);
				returnedResult.address = Account.publicKeyToAddress(publicKey);
			}catch(e){
				returnedResult.address = null;
			}
		}
		const payload = JSON.parse(signedTransactionObj.payload);
		returnedResult.transaction = new this(payload.value, payload.recipient, payload.timeCost, payload.maxTime, payload.method, payload.data);
		return returnedResult;
	}

	static hashPayload(payload){
		return keccak("keccak256").update(payload).digest();
	}
}

module.exports = Transaction;
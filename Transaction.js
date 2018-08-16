const secp256k1 = require("secp256k1");

const Account = require("./Account");
const Hasher = require("./Hasher");

class Transaction{
	constructor(value, recipient, timeCost, maxTime, method, data, payload, signature){
		this.value = value;
		this.recipient = recipient;
		this.timeCost = timeCost;
		this.maxTime = maxTime;
		this.method = method;
		this.data = data;
		
		this.payload = payload;
		this.signature = signature;
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
		this.payload = this.getPayload(account.nonce);
		const payloadHash = Transaction.hashPayload(this.payload);
		this.signature = account.sign(payloadHash);
	}

	static serialize(transaction){
		return {
			payload: transaction.payload,
			signature: transaction.signature
		};
	}

	static deserialize(serializedTransaction){
		if(typeof serializedTransaction === "string") serializedTransaction = JSON.parse(serializedTransaction);
		const returnedResult = {};
		returnedResult.verified = false;
		try{
			const payloadHash = Hasher.hash(serializedTransaction.payload);
			const signatureText = serializedTransaction.signature[0];
			const signature = Buffer.from(signatureText, "hex");
			const recovery = serializedTransaction.signature[1];
			const publicKey = secp256k1.recover(payloadHash, signature, recovery, false);
			returnedResult.from = Account.publicKeyToAddress(publicKey);
			returnedResult.verified = secp256k1.verify(payloadHash, signature, publicKey);
		}catch(e){
			returnedResult.from = null;
		}
		const payloadObject = JSON.parse(serializedTransaction.payload);
		returnedResult.nonce = payload.nonce;
		returnedResult.transaction = new this(payloadObject.value, payloadObject.recipient, payloadObject.timeCost, payloadObject.maxTime, payloadObject.method, payloadObject.data, serializedTransaction.payload, serializedTransaction.signature);
		return returnedResult;
	}
}

module.exports = Transaction;
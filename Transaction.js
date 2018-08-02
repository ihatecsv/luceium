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
		const signature = account.signData(payload);
		const signedTransactionObj = {payload: payload, signature: signature};
		const signedTransaction = JSON.stringify(signedTransactionObj);
		return signedTransaction;
	}

	static parseSignedTransaction(signedTransaction){
		const signedTransactionObj = JSON.parse(signedTransaction);
		const payload = JSON.parse(signedTransactionObj.payload);
		return new this(payload.value, payload.recipient, payload.timeCost, payload.maxTime, payload.method, payload.data);
	}
}

module.exports = Transaction;
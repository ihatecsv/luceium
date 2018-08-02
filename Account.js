class Account{
	constructor(){
		this.address = null;
		this.nonce = 0;
	}

	setCode(account, code) {
		this.code = code;
	}

	setPublicKey(publicKey) {
		this.publicKey = publicKey;
	}

	setPrivateKey(privateKey) {
		this.privateKey = privateKey;
	}

	signData(data) {
		return "supersecuresig";
	}

	getAddress() {

	}
}

module.exports = Account;
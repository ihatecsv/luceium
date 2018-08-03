const secp256k1 = require("secp256k1");
const keccak = require("keccak");
const crypto = require("crypto");

class Account{
	constructor(){
		this.nonce = 0;
		this.generateKeyPair();
	}

	generateKeyPair() {
		do {
			this.privateKey = crypto.randomBytes(32);
		} while (!secp256k1.privateKeyVerify(this.privateKey))
	}

	getAddress() {
		const publicKey = secp256k1.publicKeyCreate(this.privateKey, false);
		return Account.publicKeyToAddress(publicKey);
	}

	sign(buffer) {
		const signatureObject = secp256k1.sign(buffer, this.privateKey);
		const hexSignature = signatureObject.signature.toString("hex");
		const recovery = signatureObject.recovery;
		return [hexSignature, recovery];
	}

	static publicKeyToAddress(publicKey) {
		const choppedPublicKey = publicKey.slice(1);
		const publicKeyHashBuffer = keccak("keccak256").update(choppedPublicKey).digest();
		const addressBuffer = publicKeyHashBuffer.slice(12);
		const address = "0x" + addressBuffer.toString("hex");
		return address;
	}
}

module.exports = Account;
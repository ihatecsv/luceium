const secp256k1 = require("secp256k1");
const keccak = require("keccak");
const crypto = require("crypto");

const privKeyString = "3bede919af75b22a9a348b3f864535d3fa70c0392ab44ec3c1671d56d05eeeb4";
const desiredAddress = "0x88cc1062eFD9c6e864cE59A377331A7ea87e0E40";

const privKeyBuffer = Buffer.from(privKeyString, "hex");

console.log("Private key buffer:");
console.log(privKeyBuffer);

const pubKeyBuffer = secp256k1.publicKeyCreate(privKeyBuffer, false).slice(1);

console.log("Public key buffer:");
console.log(pubKeyBuffer);

const publicKeyHashBuffer = keccak("keccak256").update(pubKeyBuffer).digest();

console.log("Public key hash buffer:");
console.log(publicKeyHashBuffer);

const addressBuffer = publicKeyHashBuffer.slice(12);

console.log("Address buffer:");
console.log(addressBuffer);

const address = "0x" + addressBuffer.toString("hex");

console.log("Address:");
console.log(address);

console.log("Desired address:")
console.log(desiredAddress);
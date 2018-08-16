const keccak = require("keccak");

class Hasher{
    static hash(data){
        return keccak("keccak256").update(data).digest();
    }
}

module.exports = Hasher;
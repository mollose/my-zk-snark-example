const snarkjs = require("snarkjs");
const fs = require("fs");

async function verifier() {
    const vKey = JSON.parse(fs.readFileSync("./keys/circuit_verification_key.json"));
    const proof = JSON.parse(fs.readFileSync("./proof.json"));
    const publicSignals = JSON.parse(fs.readFileSync("./publicInputSignals.json"));

    const result = await snarkjs.groth16.verify(vKey, publicSignals, proof);
    if (!result) {
        console.log("verification failed");
    } else {
        console.log("verification succeeded");
    }
}

verifier().then(() => {process.exit(0);});
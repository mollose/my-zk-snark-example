const snarkjs = require("snarkjs");
const fs = require("fs");

const generator = async () => {
    var isSuccess = false;

    // await snarkjs.powersOfTau.contribute("./keys/pot14_0000.ptau", "./keys/pot14_0001.ptau", "potContribution#1");
    // console.log("pot first contribution is completed");
    // await snarkjs.powersOfTau.contribute("./keys/pot14_0001.ptau", "./keys/pot14_0002.ptau", "potContribution#2");
    // console.log("pot second contribution is completed");
    // await snarkjs.powersOfTau.beacon("./keys/pot14_0002.ptau", "./keys/pot14_beacon.ptau", "potBeaconContribution", "0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f", 10);
    // console.log("pot beacon contribution is completed");
    // await snarkjs.powersOfTau.preparePhase2("./keys/pot14_beacon.ptau", "./keys/powerOfTau_final.ptau")
    // console.log("preparing phase 2");

    await snarkjs.zKey.newZKey("./circuit_compiled/circuit.r1cs", "./keys/powerOfTau_final.ptau", "./keys/circuit_00.zkey");
    console.log("new zKey is generated");
    await snarkjs.zKey.contribute("./keys/circuit_00.zkey", "./keys/circuit_01.zkey", "contribution#1", 'myzksnarkexamplecontribution');
    console.log("first contribution is completed");
    await snarkjs.zKey.beacon("./keys/circuit_01.zkey", "./keys/circuit_final.zkey", "beaconContribution", "0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f", 10);
    console.log("beacon contribution is completed");
    isSuccess = await snarkjs.zKey.verifyFromR1cs("./circuit_compiled/circuit.r1cs", "./keys/powerOfTau_final.ptau", "./keys/circuit_final.zkey");
    if (!isSuccess) {
        console.error("verification failed");
        process.exit(1);
    } else {
        console.error("verification succeeded");
    }

    const vk = await snarkjs.zKey.exportVerificationKey("./keys/circuit_final.zkey");
    fs.writeFileSync("./keys/circuit_verification_key.json", JSON.stringify(vk));
    console.log("key generation succeeded");

    return vk;
}

generator().then(result => {process.exit(0);});
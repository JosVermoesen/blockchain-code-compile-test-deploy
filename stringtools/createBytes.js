const ethers = require("ethers");

async function createBytes(args) {
  const name = args[0];
  const bytes32 = ethers.encodeBytes32String(name);
  // const text = ethers.decodeBytes32String(bytes32);

  console.log(bytes32);
}
createBytes(process.argv.slice(2));

// node createBytes.js "jos"
// node createBytes.js "raf"
// ["0x6a6f730000000000000000000000000000000000000000000000000000000000","0x7261660000000000000000000000000000000000000000000000000000000000"]

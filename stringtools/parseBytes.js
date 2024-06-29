const ethers = require("ethers");

async function parseBytes(args) {
  const bytes = args[0];
  const name = ethers.decodeBytes32String(bytes);

  console.log("name: ", name);
}
parseBytes(process.argv.slice(2));

// node createBytes.js "jos"
// node createBytes.js "raf"
/* [
  "0x6a6f730000000000000000000000000000000000000000000000000000000000",
  "0x7261660000000000000000000000000000000000000000000000000000000000",
]; */



const path = require("path");
const fs = require("fs");
const solc = require("solc");

const solContract = "Products.sol"; // file name of the contract

const solPath = path.resolve(__dirname, "contracts", solContract);
const source = fs.readFileSync(solPath, "utf8");

const input = {
  language: "Solidity",
  sources: {
    "Products.sol": {
      // WARN1: file name of the contract, do not use a constant!
      content: source,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};

module.exports = JSON.parse(solc.compile(JSON.stringify(input))).contracts[
  solContract
].Products; // return the contract object. WARN2: do not use the constant name

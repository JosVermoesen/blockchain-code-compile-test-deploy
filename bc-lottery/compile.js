const path = require("path");
const fs = require("fs");
const solc = require("solc");

const solContract = "Lottery.sol"; // file name of the contract

const solPath = path.resolve(__dirname, "contracts", solContract);
const source = fs.readFileSync(solPath, "utf8");

const input = {
  language: "Solidity",
  sources: {
    "Lottery.sol": {
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
].Lottery; // return the contract object. WARN2: do not use the constant name

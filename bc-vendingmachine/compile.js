const path = require("path");
const fs = require("fs");
const solc = require("solc");

const solContract = "VendingMachine.sol"; // file name of the contract

const solPath = path.resolve(__dirname, "contracts", solContract);
const source = fs.readFileSync(solPath, "utf8");

const input = {
  language: "Solidity",
  sources: {
    "VendingMachine.sol": {
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
].VendingMachine; // return the contract object. WARN2: do not use the constant name

const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");
const { abi, evm } = require("./compile");
console.log(abi);

const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath);

fs.ensureDirSync(buildPath);

fs.outputFileSync(
  path.resolve(buildPath, "productsABI.json"),
  JSON.stringify(abi)
);

const path = require("path");
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath);

const { abi, evm } = require("./compile");

const whatever = async () => {
  fs.ensureDirSync(buildPath);
  console.log(JSON.stringify(abi));
  fs.outputFileSync(
    path.resolve(buildPath, "lotteryABI.json"),
    JSON.stringify(abi)
  );
};
whatever();

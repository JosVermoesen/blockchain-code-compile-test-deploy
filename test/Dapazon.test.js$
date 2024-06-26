const assert = require("assert");
const ganache = require("ganache");
const { Web3 } = require("web3");
const web3 = new Web3(ganache.provider());

const { abi, evm } = require("../bc-dapazon/compile");

let dapazon;
let accounts;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  dapazon = await new web3.eth.Contract(abi)
    .deploy({ data: evm.bytecode.object })
    .send({ from: accounts[0], gas: "3000000" });
});
describe("Dapazon Contract", () => {
  it("deploys a contract", () => {
    assert.ok(dapazon.options.address);
  });
});

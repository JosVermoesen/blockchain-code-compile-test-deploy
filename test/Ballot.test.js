const assert = require("assert");
const ganache = require("ganache");
const { Web3 } = require("web3");
const web3 = new Web3(ganache.provider());

const { abi, evm } = require("../bc-ballot/compile");

let ballot;
let accounts;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  ballot = await new web3.eth.Contract(abi)
    .deploy({
      data: evm.bytecode.object,
    })
    .send({
      from: accounts[0],
      gas: "3000000",
    });
});
describe("Ballot Contract", () => {
  it("deploys a contract", () => {
    assert.ok(ballot.options.address);
  });

  it("only owner can initialize", async () => {
    let resultCreate = await ballot.methods
      .initProposals([
        "0x6a6f730000000000000000000000000000000000000000000000000000000000",
        "0x7261660000000000000000000000000000000000000000000000000000000000",
      ])
      .send({
        from: accounts[0],
        gas: "1000000",
      });
    console.log("createPollResult:", "\n", resultCreate);
  });
});

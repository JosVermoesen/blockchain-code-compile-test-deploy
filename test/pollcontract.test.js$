const assert = require("assert");
const ganache = require("ganache");
const { Web3 } = require("web3");
const ethers = require("ethers");
const web3 = new Web3(ganache.provider());

const { abi, evm } = require("../bc-poll/compile");

let pollContract;
let accounts;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  pollContract = await new web3.eth.Contract(abi)
    .deploy({ data: evm.bytecode.object })
    .send({ from: accounts[0], gas: "3000000" });
});
describe("Poll Contract", () => {
  it("deploys a contract", () => {
    assert.ok(pollContract.options.address);
  });

  let answer1;
  let answer2;
  let answer3;

  it("only owner can create polls", async () => {
    answer1 = ethers.encodeBytes32String("Cats");
    answer2 = ethers.encodeBytes32String("Dogs");
    answer3 = ethers.encodeBytes32String("None");
    console.log("answer1:", answer1);
    console.log("answer2:", answer2);
    console.log("answer3:", answer3);

    let resultCreate = await pollContract.methods
      .createPoll(
        "Do you like dogs or cats?",
        "https://blockchain-poll.vsoft.be/images/Dog-and-cat.jpg",
        [answer1, answer2, answer3]
      )
      .send({
        from: accounts[0],
        gas: "1000000",
      });
    // console.log("createPollResult:", "\n", resultCreate);

    let createdPoll = await pollContract.methods.getPoll(0).call({
      from: accounts[1],
    });
    assert.equal(createdPoll[1], "Do you like dogs or cats?");
    // console.log("createdPoll:", "\n", createdPoll, "\n");

    // const bytes32 = ethers.encodeBytes32String(name);

    answer1 = ethers.encodeBytes32String("Pancakes");
    answer2 = ethers.encodeBytes32String("Waffles");
    answer3 = ethers.encodeBytes32String("Cereal");
    answerArray = [answer1, answer2, answer3];
    // console.log("answerArray:", answerArray);

    resultCreate = await pollContract.methods
      .createPoll(
        "Preferred breakfast?",
        "https://blockchain-poll.vsoft.be/images/breakfast.jpg",
        [answer1, answer2, answer3]
      )
      .send({
        from: accounts[0],
        gas: "1000000",
      });
    // console.log("createPollResult:", "\n", resultCreate);

    createdPoll = await pollContract.methods.getPoll(1).call({
      from: accounts[1],
    });
    // console.log("createdPoll[1]:", "\n", createdPoll[1], "\n");
    assert.equal(createdPoll[1], "Preferred breakfast?");

    /* console.log("createdPoll[4]:", "\n", createdPoll[4], "\n");
    [
      "0x50616e63616b6573000000000000000000000000000000000000000000000000",
      "0x576166666c657300000000000000000000000000000000000000000000000000",
      "0x43657265616c0000000000000000000000000000000000000000000000000000",
    ]; */
    answer2 = ethers.decodeBytes32String(createdPoll[4][1]);
    assert.equal(answer2, "Waffles");
    
    let voteResult = await pollContract.methods
      .vote(0, 2)
      .send({ from: accounts[1], gas: "1000000" });
    // console.log("voteResult0:", "\n", voteResult, "\n");

    voteResult = await pollContract.methods
      .vote(1, 0)
      .send({ from: accounts[1], gas: "1000000" });
    // console.log("voteResult1:", "\n", voteResult, "\n");

    totalPolls = await pollContract.methods.getTotalPolls().call();
    assert.equal(totalPolls, 2);
  });
});

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

// https://github.com/jspruance
// Create a vending machine contract that sells donuts for 2 ETH each
// The vending machine should have a balance of 100 donuts when it is deployed
// The vending machine should allow the owner to restock the donuts
// The vending machine should allow people to purchase donuts for 2 ETH each
// The vending machine should keep track of the donut balances for each address

contract VendingMachine {
    // state variables
    address public owner;
    uint public minStock = 30;
    mapping(address => uint) public donutBalances;

    // set the owner as th address that deployed the contract
    // set the initial vending machine balance to 100
    constructor() {
        owner = msg.sender;
        donutBalances[address(this)] = 100;
    }

    modifier restricted() {
        require(msg.sender == owner);
        _;
    }

    function getVendingMachineBalance() public view returns (uint) {
        return donutBalances[address(this)];
    }

    // Let the owner restock the vending machine
    function restock(uint amount) public restricted {
        donutBalances[address(this)] += amount;
    }

    // Purchase donuts from the vending machine
    function purchase(uint amount) public payable {
        require(
            msg.value >= amount * 2 ether,
            "You must pay at least 2 ETH per donut"
        );
        require(
            (donutBalances[address(this)] - minStock) >= amount,
            "Not enough donuts in stock to complete this purchase"
        );
        donutBalances[address(this)] -= amount;
        donutBalances[msg.sender] += amount;
    }
}

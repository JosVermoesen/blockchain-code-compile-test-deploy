// SPDX-License-Identifier: MIT
pragma solidity ^0.7.6;

contract ZombieFactory {
    uint autoId;

    event NewZombie(uint zombieId, string name, uint dna);

    uint dnaDigits = 16;
    uint dnaModulus = 10 ** dnaDigits;

    struct Zombie {
        uint id;
        string name;
        uint dna;
    }

    Zombie[] public zombies;

    constructor() {
        autoId = 0;
    }

    function _createZombie(string memory _name, uint _dna) public payable {
        uint zombieId = autoId + 1;

        Zombie memory newZombie = Zombie({
            id: zombieId,
            name: _name,
            dna: _dna
        });
        zombies.push(newZombie);
        emit NewZombie(zombieId, _name, _dna);
    }

    function _generateRandomDna(
        string memory _str
    ) private view returns (uint) {
        uint rand = uint(keccak256(abi.encodePacked(_str)));
        return rand % dnaModulus;
    }

    function createRandomZombie(string memory _name) public {
        uint randDna = _generateRandomDna(_name);
        _createZombie(_name, randDna);
    }

    function countZombies() public view returns (uint) {
        return zombies.length;
    }
}

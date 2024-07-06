# Blockchain Code Compile Test Deploy

## Development Tools used for this app

- [NodeJS](https://nodejs.org/)
- [Visual Studio Code](https://code.visualstudio.com/)

## Coding, compiling/building, testing and deploying contracts

Generate the project with npm.
Make directory and run `npm init` inside the project root, give it a name, accept most proposals, only where asking for test script, answer with `mocha`

```json
"name": "blockchain-cctd",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "mocha"
  },
```

## NPM packages used for this project

In projects we use solicity 0.8.26.

All in one command:
`npm i ganache mocha solc@0.8.26 fs-extra web3 @truffle/hdwallet-provider`

- [web3](https://github.com/ChainSafe/web3.js#readme)
- [solc](https://github.com/ethereum/solc-js#readme)
- [mocha](https://mochajs.org/)
- [ganache](https://github.com/trufflesuite/ganache#readme)
- [fs-extra](https://github.com/jprichardson/node-fs-extra)
- [hdwallet-provider](https://github.com/trufflesuite/truffle/tree/master/packages/hdwallet-provider#readme)

## Compiling

- Move into directory
- `node compile.js`

## Compiling 2

- Move into directory
- `node compile4JSON.js`

## Testing

- Be sure to be in main directory
- Be sure using mocha for test scripts in package.json file.
- `npm run test` for processing all test.js files in the test folder

To focus on testing just one test.js file, add an extra character (for example a $ sign) at the end of the other test files to disable them from testing.

### Helper for string to bytes32 conversion

- `npm i ethers@6`

## Sepolia (from 2024)

<https://sepolia.etherscan.io/>

<https://faucets.chain.link/sepolia>

## Infura API

Getting access to the API network
<https://infura.io>

## Your secrets for deploy.js

Add your personal secrets key and account to secrets.js

```js
const metamask = 'put here the string with your 12 secrets words';

const sepolia = 'your goerli.infura.io https string';

module.exports = { metamask, sepolia };
```

## Varia

<https://andersbrownworth.com/blockchain/hash>

<https://eth-converter.com/>

<https://iancoleman.io/bip39/>

Get free Test Ether (every next 24 hours!)
<https://cloud.google.com/application/web3/faucet/ethereum/sepolia>

<https://infura.io/register>

<https://sepolia.etherscan.io>

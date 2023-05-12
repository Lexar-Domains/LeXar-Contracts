// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require('hardhat');

const main = async () => {
  //Import contracts to deploy
  const LexarMetadata = await hre.ethers.getContractFactory('LexarMetadata');
  const lexarMetadata = await LexarMetadata.deploy();
  await lexarMetadata.deployed();
  console.log('Lexar Metadata Contract deployed to:', lexarMetadata.address);
};

// Lexar Metadata Contract deployed to: 0xf7227a4251cB576eA97411921431415a3D4e7Fa8

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();

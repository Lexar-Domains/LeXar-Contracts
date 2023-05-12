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
// resolver Address: 0xdcDF99A8FeC1102AdeA84c4087224Ef2d6BF8B27
// Domain Sbt resolver address: 0x86e284Ef6002A6f79fc6715303743d48cDB5cf73
// lexarDomainHub deployed to:  0xbBda4a2Ccfe6d31422BCc740aea0c304C5c3613C
// lexarDomainFactory deployed to:  0x6B43B05dA3A20AB9dEAf5d3E97C626dc0673F570
// forbiddenTlds deployed to:  0xa41479c683B534712b4a1686e545160E7710f4be
// lexarDomainSBTFactory deployed to:  0x1B8b78c884Caa7D7523FE8669768Bfe07b40f770

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

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

// Lexar Metadata Contract deployed to: 0xA080918252C8826522aA95AddcA1A51eaA15E0d1
// resolver Address: 0xDBE4745aaBaa930f15Da5F9337A23aE2Ba287b0C
// Domain Sbt resolver address: 0x9f0b2f5CD4e517Ff130A0DA0d25C94Aa00297c1f
// lexarDomainHub deployed to:  0xAB733984E1Bd4e55D804ae40e299f37BbaC19d3f
// lexarDomainFactory deployed to:  0x21B53D918825013B8B6AF56d6bCc2D6235Af8a7B
// forbiddenTlds deployed to:  0xDAD93dFA9e2B3D83815Ec61e638d9cc348DAD927
// lexarDomainSBTFactory deployed to:  0x54293d644AbEf25A74e1820Dc06B6c5d35aDcB0D

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

// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require('hardhat');

async function main() {
  //Import contracts to deploy
  const LexarDomainFactory = await hre.ethers.getContractFactory(
    'LexarDomainFactoryV2'
  );

  const lexarDomainSBTFactory = await hre.ethers.getContractFactory(
    'LexarDomainSBTFactory'
  );

  const LexarDomainHub = await hre.ethers.getContractFactory('LexarDomainHub');

  const LexarDomainResolver = await hre.ethers.getContractFactory(
    'LexarDomainResolver'
  );

  const LexarSBTDomainResolver = await hre.ethers.getContractFactory(
    'LexarSBTDomainResolver'
  );

  const ForbiddenTlds = await hre.ethers.getContractFactory('ForbiddenTldsV2');

  const metadataAddress = '0xA080918252C8826522aA95AddcA1A51eaA15E0d1';

  const royaltyAddress = '0x60b43d4Ef85804223a92774Ee9dAE1362Ab0c288';

  const lexarHub = await LexarDomainHub.deploy(metadataAddress);
  await lexarHub.deployed();
  const hubAddress = lexarHub.address;

  const lexarResolver = await upgrades.deployProxy(LexarDomainResolver);
  const domainSbtResolver = await upgrades.deployProxy(LexarSBTDomainResolver);
  await lexarResolver.deployed();
  await domainSbtResolver.deployed();
  const resolverAddress = lexarResolver.address;
  const domainSbtResolverAddress = domainSbtResolver.address;
  console.log('resolver Address:', resolverAddress);
  console.log('Domain Sbt resolver address:', domainSbtResolverAddress);

  await lexarResolver.addHubAddress(hubAddress, { gasLimit: 3000000 });
  await domainSbtResolver.addHubAddress(hubAddress, { gasLimit: 3000000 });

  const forbiddenTlds = await ForbiddenTlds.deploy(hubAddress);
  await forbiddenTlds.deployed();
  const forbiddenTldsAddress = forbiddenTlds.address;

  const lexarFactory = await LexarDomainFactory.deploy(
    0,
    forbiddenTldsAddress,
    metadataAddress,
    hubAddress,
    royaltyAddress
  );
  await lexarFactory.deployed();
  const factoryAddress = lexarFactory.address;

  await lexarResolver.addFactoryAddress(factoryAddress);

  await forbiddenTlds.addFactoryAddress(factoryAddress);

  const init = await lexarHub.init(
    lexarFactory.address,
    forbiddenTldsAddress
  );
  await init.wait();

  const toogle = await lexarFactory.toggleBuyingTlds();
  await toogle.wait();

  console.log('lexarDomainHub deployed to: ', hubAddress);
  console.log('lexarDomainFactory deployed to: ', factoryAddress);
  console.log('forbiddenTlds deployed to: ', forbiddenTldsAddress);

  const lexarSBTFactory = await lexarDomainSBTFactory.deploy(
    0,
    forbiddenTldsAddress,
    metadataAddress,
    hubAddress,
    royaltyAddress
  );
  await lexarSBTFactory.deployed();
  const sbtFactoryAddress = lexarSBTFactory.address;
  await domainSbtResolver.addFactoryAddress(sbtFactoryAddress);

  console.log('lexarDomainSBTFactory deployed to: ', sbtFactoryAddress);

  await forbiddenTlds.addFactoryAddress(sbtFactoryAddress);

  const sbtInit = await lexarHub.initSBT(lexarSBTFactory.address);
  await sbtInit.wait();

  const sbtToggle = await lexarSBTFactory.toggleBuyingTlds();
  await sbtToggle.wait();

  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

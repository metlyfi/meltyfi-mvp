import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";

/**
 * Deploys a contracts using the deployer account and
 * constructor arguments set to the deployer address
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployContracts: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  /*
    On localhost, the deployer account is the one that comes with Hardhat, which is already funded.

    When deploying to live networks (e.g `yarn deploy --network goerli`), the deployer account
    should have sufficient balance to pay for the gas fees for contract creation.

    You can generate a random account with `yarn generate` which will fill DEPLOYER_PRIVATE_KEY
    with a random private key in the .env file (then used on hardhat.config.ts)
    You can run the `yarn account` command to check your balance in every network.
  */
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  const contractChocoChip = await deploy("ChocoChip", {
    from: deployer,
    args: [deployer],
    log: true,
    autoMine: true,
  });

  const contractLogoCollection = await deploy("LogoCollection", {
    from: deployer,
    args: [deployer],
    log: true,
    autoMine: true,
  });

  await deploy("TestCollection", {
    from: deployer,
    args: [deployer],
    log: true,
    autoMine: true,
  });

  const contractTimelockController = await deploy("TimelockController", {
    from: deployer,
    args: [3600, [], [], deployer],
    log: true,
    autoMine: true,
  });

  const contractMeltyFiDAO = await deploy("MeltyFiDAO", {
    from: deployer,
    args: [contractChocoChip.address, contractTimelockController.address],
    log: true,
    autoMine: true,
  });

  const contractVRFv2DirectFundingConsumer = await deploy("VRFv2DirectFundingConsumer", {
    from: deployer,
    args: [],
    log: true,
    autoMine: true,
  });

  const contractMeltyFiNFT = await deploy("MeltyFiNFT", {
    from: deployer,
    args: [contractChocoChip.address, contractLogoCollection.address, contractMeltyFiDAO.address, contractVRFv2DirectFundingConsumer.address],
    log: true,
    autoMine: true,
  });

  const contract1 = await hre.ethers.getContract<Contract>("ChocoChip", deployer);
  await contract1.transferOwnership(contractMeltyFiNFT.address);

  const contract2 = await hre.ethers.getContract<Contract>("LogoCollection", deployer);
  await contract2.transferOwnership(contractMeltyFiNFT.address);

  const contract3 = await hre.ethers.getContract<Contract>("VRFv2DirectFundingConsumer", deployer);
  await contract3.transferOwnership(contractMeltyFiNFT.address);

};

export default deployContracts;

// Tags are useful if you have multiple deploy files and only want to run one of them.
// e.g. yarn deploy --tags all
deployContracts.tags = ["all"];
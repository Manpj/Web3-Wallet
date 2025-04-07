const hre = require('hardhat');

async function main() {
  const MyToken = await hre.ethers.getContractFactory('MyToken');
  console.log("contract is being depoying...");

  const initialSupply = hre.ethers.parseEther('1000'); // 1000 tokens
  const myToken = await MyToken.deploy(initialSupply);
  await myToken.waitForDeployment();
  console.log("contract has been deployed successfully");
  console.log("contract address is " + myToken.target);

  console.log('MyToken deployed to:', myToken);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

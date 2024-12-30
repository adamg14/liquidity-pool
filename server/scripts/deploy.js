const { ethers } = require("hardhat");

async function main(){
    const [deployer] = await ethers.getSigners();
    console.log("Deployer address:", deployer.address);

    // Define the initial supply of tokens (1,000,000 tokens with 18 decimals)
    const initialTokenSupply = ethers.parseUnits("1000000", 18);

    // Get the contract factory for your token
    const AdamToken = await ethers.getContractFactory("AdamToken");

    // Deploy the contract with the name, symbol, and initial supply
    const ATSmartContract = await AdamToken.deploy("Adam Token", "ADM", initialTokenSupply);

    // Wait for the deployment to be mined
    await ATSmartContract.waitForDeployment();


    const smartContractAddress = await ATSmartContract.getAddress();
    // Log the contract address
    console.log("Adam Token Smart Contract Address: " + smartContractAddress);

    // ETH funded in the smart contracat
    const etherLiquidityPool = ethers.parseEther("0.01");

    const LiquidityPool = await ethers.getContractFactory("LiquidityPool");

    const LPSmartContract = await LiquidityPool.deploy(smartContractAddress, {
        value: etherLiquidityPool
    });

    const LPContractAddress = await LPSmartContract.getAddress();

    console.log("Liquidity Pool Contract Address: " + LPContractAddress);

    const AdamTokenContract = await ethers.getContractAt("AdamToken", smartContractAddress);
    const AdamTokenLPAmount = ethers.parseUnits("100000", 18);

    // approve the liquidity pool to spend the AdamToken amount
    const approveTransaction = await AdamTokenContract.approve(LPContractAddress, AdamTokenLPAmount);
    await approveTransaction.wait();

    // call the receive function in the smart contract
    const transaction = await LPSmartContract.initialLiquidityPoolFund(deployer.address, AdamTokenLPAmount);
    await transaction.wait();
}

main().then(() => {
    process.exit(0);
}).catch((error) => {
    console.log(error);
    process.exit(1);
});
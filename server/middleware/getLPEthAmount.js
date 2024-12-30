const { ethers } = require("hardhat");

// this function gives the user the full amount of ETH available in the liquidity pool
async function getLPEthAmount(){
    const contractAddress = "";
    const abi = "";

    const contract = new ethers.Contract(contractAddress, abi, deployer);

    const getLPETHAmount = await contract.getLPETHAmount();

    return getLPETHAmount;
}

export default getLPEthAmount;
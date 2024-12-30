const { ethers } = require("hardhat");

async function getAddressEthAmount(walletAddress){
    const [deployer] = await ethers.getSigners();

    const contractAddress = "";
    const abi = "";

    const contract = new ethers.Contract(contractAddress, abi, deployer);

    const amount = await contract.getAddressETHAmount(walletAddress);

    return amount;
}

export default getAddressEthAmount;
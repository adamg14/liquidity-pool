const { ethers } = require("hardhat");

async function getAddressAdamAmount(walletAddress){
    const [deployer] = await ethers.getSigners();

    const contractAddress = "";
    const abi = "";

    const contract = new ethers.Contract(contractAddress, abi, deployer);

    const amount = await contract.getAddressADAMAmount(walletAddress);

    return amount;
}

export default getAddressAdamAmount;
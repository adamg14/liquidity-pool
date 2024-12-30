const { ethers } = require("hardhat");

async function getLPAdamAmount(){
    const contractAddress = "";
    const abi = "";

    const contract = new ethers.Contract(contractAddress, abi, deployer);

    const getLPAdamAmount = await contract.getLPADMAmount();

    return getLPAdamAmount;
}

export default getLPAdamAmount;
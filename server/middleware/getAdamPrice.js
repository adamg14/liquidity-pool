const hardhat = require("hardhat");

async function getAdamPrice(){
    const contractAddress = "";
    const abi = "";

    const contract = new ethers.Contract(contractAddress, abi, deployer);

    const adamPrice = await contract.getAdamPrice();

    return adamPrice;
}

export default getAdamPrice;
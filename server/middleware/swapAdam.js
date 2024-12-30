const { ethers } = require("hardhat");


// this function allows user of the liquidity pool to swap an amount of AdamToken for a calculated amount of ETH
// this counts as a transaction so a transaction fee will be calculated and distributed to the stakeholders of the liquidity pool accordingly
async function swapAdam(walletAddress, amount){
    const contractAddress = "";
    const abi = "";

    const contract = new ethers.Contract(contractAddress, abi, deployer);

    const swapAdamTokenResponse = await contract.swapAdamToken(walletAddress, amount);

    return swapAdamTokenResponse;
}

export default swapAdam;
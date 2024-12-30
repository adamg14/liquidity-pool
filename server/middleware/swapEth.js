const { ethers } = require("hardhat");


// the same functionality as the swapAdam function however the swapped assests in another order ADAM/ETH
async function swapEth(walletAddress, amount){
    const contractAddress = "";
    const abi = "";

    const contract = new ethers.Contract(contractAddress, abi, deployer);

    const swapEthResponse = await ethers.swapETH(walletAddress, amount);

    return swapEthResponse;
}

export default swapEth;
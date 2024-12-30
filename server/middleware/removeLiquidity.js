const { ethers } = require("ethers");


// gives the user the option to receive all the funds that they have put into the pool, meaning they no longer have a stake in the liquidity pool and they no longer receiver any rewards, this is still a transaction and therefore there is a transaction fee assigned to it and the rewards will be distributed to the liquidity providers accordingly
async function removeLiquidity(senderAddress, ETHAmount, AdamTokenAmount){
    const contractAddress = "";
    const abi = "";

    const contract = new ethers.Contract(contractAddress, abi, deployer);

    const removeLiquidityResponse = await contract.removeLiquidity(senderAddress, ETHAmount, AdamTokenAmount);

    return removeLiquidityResponse;
}

export default removeLiquidity;
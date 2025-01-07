const axios = require("axios");
require("dotenv").config();

const ETHER_SCAN_API =  process.env.ETHER_SCAN_API;

// get the transactions
async function getTransactions(contractAddress){
    const transactions = await axios.get("https://api.etherscan.io/api?module=account&action=tokentx&contractaddress=" + contractAddress + "&startblock=0&endblock=99999999&sort=asc&apikey=" + ETHER_SCAN_API);

    // transaction array
    const transactionArray = transactions.data.result;

    // reformatting the array - to remove any irrelevant information


    return transactionArray;
};

module.exports = getTransactions;
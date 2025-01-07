const axios = require("axios");
require("dotenv").config();

const ETHER_SCAN_API =  process.env.ETHER_SCAN_API;


// this function returns the number of transaction of the $ADAM token
async function transactionNumber(contractAddress){
    const transactions = await axios.get("https://api.etherscan.io/api?module=account&action=tokentx&contractaddress=" + contractAddress + "&startblock=0&endblock=99999999&sort=asc&apikey=" + ETHER_SCAN_API);

    // return the length of the transaction array
    const transactionArray = transactions.data.result;
    
    return transactionArray.length;
}

module.exports = transactionNumber;
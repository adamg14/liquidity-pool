const axios = require("axios");
require("dotenv").config();

const ETHER_SCAN_API = process.env.ETHER_SCAN_API;

const contractOwnwer = "0xf39Be453d8b009818e4687DCD35377d3fd7A5f69";

async function ownerHoldings(contractAddress){
    const holdings = await axios.get("https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=" + contractAddress + "&address=" + contractOwnwer + "&tag=latest&apikey=" + ETHER_SCAN_API);

    return parseInt(holdings.data.result) / (10 ** 18);
}


module.exports = ownerHoldings;
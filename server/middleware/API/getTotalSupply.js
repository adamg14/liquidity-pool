const axios = require("axios");
require("dotenv").config();

const ETHER_SCAN_API =  process.env.ETHER_SCAN_API;

// data=0x18160ddd, is the methodID for total supply

async function getTotalSupply(contractAddress){
    const totalSupply = await axios.get("https://api.etherscan.io/api?module=proxy&action=eth_call&to=" + contractAddress + "&data=0x18160ddd&apikey=" + ETHER_SCAN_API);

    // convert then divide by coefficient to convert the value from WEI
    return parseInt(totalSupply.data.result, 16) / (10 ** 18);
}


module.exports = getTotalSupply;
require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    Sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/0HeaNtixdJh1DRFMwxuGba5cg2Vw62GO",
      accounts: ["46ebe88c0d91fd33fad953cbaf6c843d81ff8f43be6fd85bba60c8d1eee0ee8e"]
    }
  }
};

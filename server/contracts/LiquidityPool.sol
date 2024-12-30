// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// import the interface of an ERC token so functions can be called from it
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract LiquidityPool{
    // 5% transaction fee
    uint256 private constant TRANSACTION_FEE = 5;
    address public AdamTokenAddress;
    uint256 private LPETHAmount;
    uint256 private LPAdamTokenAmount;
    uint256 private constantProduct;

    address private immutable deployer;

    mapping(address => uint256) private LPETHBalance;
    mapping(address => uint256) private LPADAMBalance;

    event LPUpdated(address indexed walletAddress, uint256 amount, string token);

    constructor(address adamTokenAddress) payable{
        AdamTokenAddress = adamTokenAddress;
        // update the value of ETH within the liquidity pool
        LPETHAmount = address(this).balance;
        // update the mapping to the address that is providing the ETH
        LPETHBalance[msg.sender] = msg.value;
        deployer = msg.sender;
    }

    // this function is ran once to initialise the liquidity pool with Adam token 
    function initialLiquidityPoolFund(address sender, uint256 amount) public payable{
        IERC20 AdamToken = IERC20(AdamTokenAddress);

        // the owner must be the one that initiates the LP 
        require(AdamToken.transferFrom(deployer, address(this), amount));

        // update the mapping to the address that is providing the $ADAM token
        LPADAMBalance[sender] = amount;
        // update the variable storing the amount of ADAM token in the liquidity pool
        LPAdamTokenAmount += amount;
        calculateConstantProduct();
    }

    function calculateConstantProduct() private{
        constantProduct = LPAdamTokenAmount * LPETHAmount;
    }

    function swapETH(address) public payable{
        // send the provider the required $ADAM token for the ETH they are sending, calculate this value using the constant product formula
    }

    function swapAdamToken(address sender, uint256 amount) public payable{
        IERC20 AdamToken = IERC20(AdamTokenAddress);
        require(AdamToken.transferFrom(sender, address(this), amount));

        LPADAMBalance[sender] -= amount;

        // send the liquidity provider the required ETH, calculate this value using the constant product formula
        // send the transaction fees to the required current liquidity 
    }

    function removeLiquidity(address sender, uint256 ETHAmount, uint256 AdamTokenAmount) public payable{
        // send the sender the required - if that is all the liquidity that they provide remove all there funds and reflect this in the mapping
        // remember to distribute the transactions to the liquidity providers correctly
    }

    function getConstantProduct() public view returns(uint256){
        return constantProduct;
    }

    function getAdamPrice() public view returns(uint256){
        // get the price of $ADAM token in terms of ETH (use wei or gwei to avoid decimals)
    }

    function getETHPrice() public view returns(uint256){
        // get the price of ETH in terms of $ADAM token
        return (LPAdamTokenAmount / LPETHAmount);
    }
    function getLPETHAmount() public view returns(uint256){
        return LPETHAmount;
    }

    function getLPADMAmount() public view returns(uint256){
        return LPAdamTokenAmount;
    }
    
    function getAddressETHAmount(address walletAddress) public view returns(uint256){
        return LPETHBalance[walletAddress];
    }

    function getAddressADAMAmount(address walletAddress) public view returns(uint256){
        return LPADAMBalance[walletAddress];
    }
}
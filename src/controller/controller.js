const Web3 = require("web3");
const utils = require("../util/utils");

const web3 = new Web3(process.env.RPC_URL);
web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY);

const walletAddress = web3.eth.accounts.wallet[0].address;

const supplyRatePerBlock = async ({ asset }) => {
  const contract = utils.generateCTokenontract(asset);
  return (await contract.methods.supplyRatePerBlock().call()) / 1e18;
};

const lend = async ({ asset, amount }) => {
  const nonce = await web3.eth.getTransactionCount(walletAddress);
  const cTokencontract = utils.generateCTokenontract(asset, web3);

  const underlyingAssetAddress = await cTokencontract.methods
    .underlying()
    .call();

  console.log("DONE...");
  const erc20Contract = utils.generateERC20Contract(underlyingAssetAddress);
  console.log(erc20Contract.methods);

  if (asset != "cETH") {
    const approved = await erc20Contract.methods.approve(
      underlyingAssetAddress,
      amount
    );

    if (!approved) {
      throw new Error("Failed to approve debit!!!");
    }
  }

  try {
    const mint = await cTokencontract.methods.mint().send({
      nonce: nonce,
      from: walletAddress,
      gasLimit: web3.utils.toHex(150000),
      gasPrice: web3.utils.toHex(20000000000),
      value: web3.utils.toWei(amount.toString(), "ether"),
    });
  } catch (e) {
    console.log(e.toString());
  }
};

const getEthBalance = async ({ asset }) => {
  const cTokenContract = utils.generateCTokenontract(asset);
  const balanceOfUnderlying = await cTokenContract.methods
    .balanceOfUnderlying(walletAddress)
    .call();

  return web3.utils.fromWei(balanceOfUnderlying, "ether");
};

const getCTokenBalance = async ({ asset }) => {
  const cTokenContract = utils.generateCTokenontract(asset);
  let balance = await cTokenContract.methods.balanceOf(walletAddress).call();
  balance = balance / 1e8;
  return balance;
};

const getExchangeRate = async ({ asset }) => {
  const cTokenContract = utils.generateCTokenontract(asset);
  const exchangeRate = await cTokenContract.methods
    .exchangeRateCurrent()
    .call();
  return exchangeRate / 1e28;
};

const redeem = async ({ asset, amount }) => {
  try {
    const cTokenContract = utils.generateCTokenontract(asset, web3);
    const result = await cTokenContract.methods.redeem(amount * 1e8).send({
      from: walletAddress,
      gasLimit: web3.utils.toHex(150000),
      gasPrice: web3.utils.toHex(20000000000),
    });
  } catch (e) {
    console.log(e.toString());
  }
};

const walletBalance = async () => {
  const balance = await web3.eth.getBalance(walletAddress);
  return web3.utils.fromWei(balance, "ether");
};

module.exports = {
  supplyRatePerBlock,
  lend,
  getEthBalance,
  getCTokenBalance,
  getExchangeRate,
  redeem,
  walletBalance,
};

const Web3 = require("web3");
const config = require("../config.json");

const web3 = new Web3(process.env.RPC_URL);
web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY);

const walletAddress = web3.eth.accounts.wallet[0].address;

const cETHContract = new web3.eth.Contract(
  config.abi.rinkeby.cETH,
  config.address.rinkeby.cETH
);

const supplyRatePerBlock = async (asset) => {
  return (await cETHContract.methods.supplyRatePerBlock().call()) / 1e18;
};

const lend = async (obj) => {
  const { asset, amount } = obj;
  const nonce = await web3.eth.getTransactionCount(walletAddress);

  if (asset.toUpperCase() === "ETH") {
    await lendEth(amount, nonce);
    console.log("Mint successfull...");
  }
  return true;
};

const lendEth = async (amount, nonce) => {
  try {
    await cETHContract.methods.mint().send({
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

const getBalance = async (asset) => {
  const balanceOfUnderlying = await cETHContract.methods
    .balanceOfUnderlying(walletAddress)
    .call();
  return web3.utils.fromWei(balanceOfUnderlying, "ether");
};

const getExchangeRate = async (asset) => {
  const exchangeRate = await cETHContract.methods.exchangeRateCurrent().call();
  return exchangeRate / 1e28;
};

const redeem = async (obj) => {
  try {
    const val = await cETHContract.methods.redeem(obj.amount).send({
      from: walletAddress,
      gasLimit: web3.utils.toHex(150000),
      gasPrice: web3.utils.toHex(20000000000),
    });
    console.log(val);

    return val;
  } catch (e) {
    console.log(e.toString());
  }
};

module.exports = {
  supplyRatePerBlock,
  lend,
  getBalance,
  getExchangeRate,
  redeem,
};

const abi = require("../config/abi.json");
const address = require("../config/address.json");
const Web3 = require("web3");
const web3 = new Web3(process.env.RPC_URL);

const generateCTokenontract = (asset, w) => {
  const w3 = w ? w : web3;
  const contractAbi = abi.cToken;
  const contractAddress = address.cToken.rinkeby[asset];
  return new w3.eth.Contract(contractAbi, contractAddress);
};

const generateERC20Contract = (address) => {
  return new web3.eth.Contract(abi.ERC20, address);
};

module.exports = {
  generateCTokenontract,
  generateERC20Contract,
};

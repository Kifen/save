const { buildSchema } = require("graphql");
const controller = require("../controller/controller.js");

const schema = buildSchema(`
    type Query {
      getSupplyRatePerBlock(asset: String!): String
        getEthBalance(asset: String!): String
        getCTokenBalance(asset: String!): String
        getExchangeRate(asset: String!): String
        getWalletBalance: String
    }

    type Mutation {
      lend(asset: String!, amount: Float!): Boolean
      redeem(asset: String, amount: Float!): Boolean
    }
`);

const root = {
  getSupplyRatePerBlock: controller.supplyRatePerBlock,
  getEthBalance: controller.getEthBalance,
  getCTokenBalance: controller.getCTokenBalance,
  getExchangeRate: controller.getExchangeRate,
  getWalletBalance: controller.walletBalance,
  redeem: controller.redeem,
  lend: controller.lend,
};

module.exports = {
  schema,
  root,
};

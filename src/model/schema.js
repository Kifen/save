const { buildSchema } = require("graphql");
const controller = require("../controller/controller.js");

const schema = buildSchema(`
    type Query {
        getSupplyRatePerBlock(asset: String!): String
        lend(asset: String!, amount: Float!): Boolean
        getEthBalance(asset: String!): String
        getCTokenBalance(asset: String!): String
        getExchangeRate(asset: String!): String
        redeem(asset: String, amount: Float!): String
    }
`);

const root = {
  getSupplyRatePerBlock: controller.supplyRatePerBlock,
  lend: controller.lend,
  getEthBalance: controller.getEthBalance,
  getCTokenBalance: controller.getCTokenBalance,
  getExchangeRate: controller.getExchangeRate,
  redeem: controller.redeem,
};

module.exports = {
  schema,
  root,
};

const { buildSchema } = require("graphql");
const controller = require("../controller/controller.js");

const schema = buildSchema(`
    type Query {
        getSupplyRatePerBlock(asset: String!): String
        lend(asset: String!, amount: Float!): Boolean
        getBalance(asset: String!): String
        getExchangeRate(asset: String!): String
        redeem(asset: String, amount: Int!): String
    }
`);

const root = {
  getSupplyRatePerBlock: controller.supplyRatePerBlock,
  lend: controller.lend,
  getBalance: controller.getBalance,
  getExchangeRate: controller.getExchangeRate,
  redeem: controller.redeem,
};

module.exports = {
  schema,
  root,
};

require("dotenv").config();
//require("./src/util/db")();
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { schema, root } = require("./src/model/schema.js");

const app = express();
const port = process.env.PORT || 4000;
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(port, () => console.log(`Server listening on port ${port}`));

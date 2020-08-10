const mongo = require("mongoose");

const db = async () => {
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  await mongo.connect("mongodb://localhost/save_db", options);

  if (process.env.NODE_ENV === "development") {
    mongo.set("debug", true);
  }

  mongo.connection.on("connected", () => {
    console.log("here");
    console.log(`Connected to mongoDB: ${process.env.DB}`);
  });

  mongo.connection.on("error", (e) => {
    console.error(e.message);
  });

  mongo.connection.on("disconnected", () => {
    console.log("Disconnected from mongoDB...");
  });
};

module.exports = db;

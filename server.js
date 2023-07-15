const app = require("./app");
const mongoose = require("mongoose");

const { DB_HOST } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");
    app.listen(3000, () => console.log("Local server is running"));
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

const app = require("./app");
const DB = require("./database");
require("dotenv").config();

DB();
app.listen(process.env.PORT, () => {
  console.log("server started");
});

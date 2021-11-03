const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");







app.listen(process.env.PORT || 3000, () => {
  console.log("the server is running on server 3000");
});

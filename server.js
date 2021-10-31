const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");
const Oracledb = require('oracledb');


//Database connection 
Oracledb.outFormat = Oracledb.OUT_FORMAT_OBJECT;
Oracledb.getConnection({
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  connectionString: process.env.DBCONNECTIONSTR
}).then(res => {
  console.log('DB is connected');
})


app.listen(process.env.PORT || 3000, () => {
  console.log("the server is running on server 3000");
});

const dotenv = require("dotenv");
dotenv.config({ path: `${__dirname}/../config.env` });
const Oracledb = require('oracledb');
// console.log(module.exports);

//Database connection 

Oracledb.outFormat = Oracledb.OUT_FORMAT_OBJECT;
let connection = Oracledb.getConnection({
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  connectionString: process.env.DBCONNECTIONSTR
})

module.exports = connection;



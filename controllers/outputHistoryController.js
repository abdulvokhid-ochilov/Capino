const connection = require("../models/configdb");
const catchAsyncErr = require('./../utils/catchAsyncErr');

//conver date format to search oracledb date format
const formatDate = (date) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  const standartDate = new Date(date);
  const format = standartDate.toLocaleString('en-GB', options).split(' ');
  return `${format[0].padStart(2, "0")}-${format[1].toUpperCase()}-${format[2]}`
}

/*******  GET TRANSACTION *******/
exports.getOutputHistory = catchAsyncErr(async (req, res, next) => {
  const { from, to, driver_name } = { ...req.query }

  //make customized sql query string out of req.query
  let query = '';
  if (from) {
    query += `where dt >= TO_DATE('${formatDate(from)}','dd-MON-yy')`
  } else if (to && !from) {
    query += `where dt <= TO_DATE('${formatDate(to)}','dd-MON-yy')`
  } else if (to && from) {
    query += `and dt <= TO_DATE('${formatDate(to)}','dd-MON-yy')`
  } else if (!from && !to && driver_name) {
    query += `where driver_name = '${driver_name}'`
  } else if (from || to && driver_name) {
    query += `and driver_name = '${driver_name}'`
  } else {
    query += `where dt = TO_DATE('${formatDate(Date.now())}','dd-MON-yy')`
  }
  const db = await connection;
  const result = await db.execute(`select driver_name, phone_num, dt
  from output_history ${query}`);

  //send response 
  res.status(200).json({
    message: 'success',
    data: result.rows
  })

})
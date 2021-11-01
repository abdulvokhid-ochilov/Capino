const fs = require("fs");
const qr = require("qrcode");
const pngToJpeg = require("png-to-jpeg");
const connection = require("../models/configdb");
const catchAsyncErr = require('./../utils/catchAsyncErr')


/*******  GET REQUEST *******/
exports.getOutput = catchAsyncErr(async (req, res, next) => {
  const { bl_num } = { ...req.query };
  const db = await connection;
  const data = await db.execute(
    `SELECT bl_num, company_name,quantity, unit 
    from output 
    where quantity > 0 and bl_num = '${bl_num}'`);

  //send one product data
  res.status(200).json({
    message: 'success',
    data: data.rows
  })
})


exports.updateOutput = catchAsyncErr(async (req, res, next) => {

  //destruct data req.body
  const {
    bl_num, company_name, quantity, unit, driver_name, phone_num, car_num
  } = { ...req.body };

  const binds = []
  let updateStr = '';

  for (let i = 0; i < bl_num.length; i++) {
    // make updateSTR
    updateStr += `when bl_num = '${bl_num[i]}' 
    and (quantity - '${quantity[i]}') >= 0 
    then (quantity - '${quantity[i]}') `;

    // make binds data 
    binds.push({
      driver_name,
      phone_num,
      car_num,
      transaction_id: randomId,
      bl_num: bl_num[i],
      quantity: quantity[i],
      unit: unit[i],
      dt: new Date(Date.now())
    })
  }
  //update output table
  const db = await connection;
  const update = await db.execute(`update output 
    set quantity =(case ${update} end)`, [], { autoCommit: true });

  //save transaction into output_history table
  const insert = `INSERT INTO output_history 
  VALUES(:driver_name, :phone_num, :car_num, :transaction_id, :bl_num, :quantity, :unit, :dt)`;
  const history = await db.executeMany(insert, binds, { autoCommit: true });

  //send qr code to phone_number

})

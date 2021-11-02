const fs = require("fs");
const path = require("path");
const qr = require("qrcode");
const pngToJpeg = require("png-to-jpeg");
const { msg, config } = require("coolsms-node-sdk");
const connection = require("../models/configdb");
const catchAsyncErr = require('./../utils/catchAsyncErr');


//coolsms-node-sdk config
config.init({
  apiKey: process.env.APIKEY,
  apiSecret: process.env.APISECRET,
});

/*******  GET REQUEST *******/
exports.getOutput = catchAsyncErr(async (req, res, next) => {
  const { bl_num } = { ...req.query };

  //query output table 
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
  const transaction_id = `${Math.floor(Math.random() * 100 + 1)}${Date.now()}`
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
      transaction_id,
      bl_num: bl_num[i],
      quantity: quantity[i],
      unit: unit[i],
      dt: new Date(Date.now())
    })
  }
  //1.update output table
  const db = await connection;
  const update = await db.execute(
    `update output set quantity =(case ${updateStr} end)`,
    [], { autoCommit: false });

  //2.save transaction into output_history table
  const insert = `INSERT INTO output_history VALUES(
    :driver_name, :phone_num, :car_num, :transaction_id, :bl_num, :quantity, :unit, :dt
  )`;
  const history = await db.executeMany(insert, binds, { autoCommit: false });

  //3.send qr code to phone_number

  //a.generate qrcode
  const qrImageLink = await qr.toDataURL(`https://${req.hostname}:3000/output_transaction_paper/${transaction_id}`);
  //b. generate jpeg file
  const buffer = Buffer.from(qrImageLink.split(/,\s*/)[1], "base64");
  const qrImage = await pngToJpeg({ quality: 90 })(buffer);
  fs.writeFileSync(`${__dirname}/${transaction_id}.jpeg`, qrImage);

  //3. send qr code
  const { fileId } = await msg.uploadMMSImage(
    path.join(__dirname, `${transaction_id}.jpeg`)
  );
  const result = await msg.send({
    messages: [
      {
        to: `${phone_num}`,
        from: "01087128235",
        subject: `출고증`,
        imageId: fileId,
        text: `QR 코드를 스캔하여 출고증 인쇄하십시오.`,
      },
    ],
  });

  if (result) {
    fs.unlinkSync(path.join(__dirname, `${transaction_id}.jpeg`));
    db.commit()
  }

  res.status(200).json({
    message: 'success'
  })
})

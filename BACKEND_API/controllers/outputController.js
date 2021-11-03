const fs = require("fs");
const path = require("path");
const qr = require("qrcode");
const pngToJpeg = require("png-to-jpeg");
const { msg, config } = require("coolsms-node-sdk");
const connection = require("../models/configdb");
const catchAsyncErr = require('./../utils/catchAsyncErr');


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

/*******  PATCH REQUEST *******/
exports.updateOutput = catchAsyncErr(async (req, res, next) => {
  //destruct data req.body
  const {
    bl_num, company_name, quantity, unit, driver_name, phone_num, car_num
  } = { ...req.body };

  //generate random transaction_id
  const transaction_id = `${Math.floor(Math.random() * 100 + 1)}${Date.now()}`

  const binds = []
  let updateStr = '';
  if (bl_num.length) {
    for (let i = 0; i < bl_num.length; i++) {
      // make updateSTR
      updateStr += `when bl_num = '${bl_num[i]}' 
      and (quantity - '${quantity[i]}') >= 0 
      then (quantity - '${quantity[i]}') `;

      // make binds data 
      binds.push({
        driver_name, phone_num, car_num, transaction_id, bl_num: bl_num[i], quantity: quantity[i], unit: unit[i], dt: new Date(Date.now())
      })
    }
  } else {
    // make updateSTR
    updateStr += `when bl_num = '${bl_num}' 
    and (quantity - '${quantity}') >= 0 
    then (quantity - '${quantity}') `;

    // make binds data 
    binds.push({
      driver_name, phone_num, car_num, transaction_id, bl_num, quantity, unit, dt: new Date(Date.now())
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
  const qrImageLink = await qr.toDataURL(`http://${req.hostname}:3000/output/${transaction_id}`);
  //b. generate jpeg file
  const buffer = Buffer.from(qrImageLink.split(/,\s*/)[1], "base64");
  const qrImage = await pngToJpeg({ quality: 90 })(buffer);
  fs.writeFileSync(`${__dirname}/${transaction_id}.jpeg`, qrImage);

  //c. send qr code
  //coolsms-node-sdk config
  config.init({
    apiKey: process.env.APIKEY,
    apiSecret: process.env.APISECRET,
  });
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
  // d. if(!err) => delete saved file and commit chages 
  if (result) {
    fs.unlinkSync(path.join(__dirname, `${transaction_id}.jpeg`));
    db.commit()
  }

  res.status(200).json({
    message: 'success'
  })
})


/*******  GET TRANSACTION *******/
exports.getTransaction = catchAsyncErr(async (req, res, next) => {
  const qrImg = await qr.toDataURL(`http://${req.hostname}:3000/output/${req.params.id}`);
  const db = await connection;
  const result = await db.execute(`select 
    o.bl_num, o.company_name, o.forwarder, o.type, o.unit, o.enter_date, h.driver_name, h.phone_num, h.car_num, h.transaction_id, h.dt
    from output o, output_history h 
    where h.transaction_id = '${req.params.id}' and o.bl_num = h.bl_num`);

  const data = {
    transaction_info: {
      driver_name: result.rows[0].DRIVER_NAME,
      phone_num: result.rows[0].PHONE_NUM,
      car_num: result.rows[0].CAR_NUM,
      output_date: result.rows[0].DT,
      qr: qrImg
    },
    product_info: []
  };
  for (let i = 0; i < result.rows.length; i++) {
    data.product_info.push({
      bl_num: result.rows[i].BL_NUM,
      company_name: result.rows[i].COMPANY_NAME,
      forwarder: result.rows[i].FORWARDER,
      type: result.rows[i].TYPE,
      unit: result.rows[i].UNIT,
      enter_date: result.rows[i].ENTER_DATE
    })
  }

  res.status(200).json({
    message: 'success',
    data
  })
})




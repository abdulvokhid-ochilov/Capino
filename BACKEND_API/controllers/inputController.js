const fs = require("fs");
const path = require('path');
const qr = require("qrcode");
const pngToJpeg = require("png-to-jpeg");
const { msg, config } = require("coolsms-node-sdk");
const connection = require("../models/configdb");
const catchAsyncErr = require('./../utils/catchAsyncErr');
const oracledb = require('oracledb')


/*******  POST REQUEST *******/
exports.insertInput = catchAsyncErr(async (req, res, next) => {
  req.body.departure_date = new Date(req.body.departure_date)
  //destructure data req.body
  const {
    driver_name, phone_num, car_num, forwarder, destination_port, sonmyong, booking_num, departure_date, company_name, quantity, package, weight, volume
  } = { ...req.body };

  //generate random transaction_id
  const transaction_id = `${Math.floor(Math.random() * 100 + 1)}${Date.now()}`
  const enter_date = new Date(Date.now())
  //1.save transaction into input table
  //a.make bind data
  const binds = [];
  if (typeof company_name !== 'string') {
    for (let i = 0; i < company_name.length; i++) {
      binds.push(
        {
          transaction_id, enter_date, driver_name, phone_num, car_num, forwarder, destination_port, sonmyong, booking_num, departure_date, company_name: company_name[i], quantity: quantity[i], package: package[i], weight: weight[i], volume: volume[i]
        })
    }
  } else {
    binds.push(
      {
        transaction_id, enter_date, driver_name, phone_num, car_num, forwarder, destination_port, sonmyong, booking_num, departure_date, company_name, quantity, package, weight, volume
      })
  }
  // b. make sql insert str
  const insert = `INSERT INTO input VALUES(
    :transaction_id, :enter_date, :driver_name, :phone_num, :car_num,:forwarder, :destination_port, :sonmyong, :booking_num,:departure_date, :company_name, :quantity, :package,:weight, :volume
  )`

  // c. insert the data
  const db = await connection;
  await db.executeMany(insert, binds, { autoCommit: false });

  //2.send qr code to phone_number

  //a.generate qrcode
  const qrImageLink = await qr.toDataURL(`http://${req.hostname}:3000/input/${transaction_id}`);

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
});

/*******  GET TRANSACTION *******/
exports.getTransaction = catchAsyncErr(async (req, res, next) => {
  const qrImg = await qr.toDataURL(`http://${req.hostname}:3000/input/${req.params.id}`);

  const db = await connection;
  const result = await db.execute(`select *
    from input  
    where transaction_id = '${req.params.id}'`);
  const data = {
    transaction_info: {
      driver_name: result.rows[0].DRIVER_NAME,
      phone_num: result.rows[0].PHONE_NUM,
      car_num: result.rows[0].CAR_NUM,
      forwarder: result.rows[0].FORWARDER,
      destination_port: result.rows[0].DESTINATION_PORT,
      sonmyong: result.rows[0].SONMYONG,
      booking_num: result.rows[0].BOOKING_NUM,
      departure_date: result.rows[0].DEPARTURE_DATE,
      enter_date: result.rows[0].ENTER_DATE,
      qr: qrImg
    },
    product_info: []
  };
  for (let i = 0; i < result.rows.length; i++) {
    data.product_info.push({
      company_name: result.rows[i].COMPANY_NAME,
      quantity: result.rows[i].QUANTITY,
      package: result.rows[i].PACKAGE,
      weight: result.rows[i].WEIGHT,
      volume: result.rows[i].VOLUME
    })
  }
  res.status(200).json({
    message: 'success',
    data
  })
})
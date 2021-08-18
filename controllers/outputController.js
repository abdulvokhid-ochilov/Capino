const outputDB = require("../modules/outputDB");
const qr = require("qrcode");
const pngToJpeg = require("png-to-jpeg");
const fs = require("fs");

/********* GET REQUEST TO OUTPUT PAGE  ********/
exports.getOutput = async (req, res) => {
  res.render("output/output");
};

//Random Key Generator
const randomKey = () => {
  const randomNum = Math.floor(Math.random() * 100 + 1);
  const now = Date.now();
  return `${randomNum}${now}`;
};

//generate jpeg file
const convertToJpg = async function (url) {
  try {
    const imgPath = randomKey();
    const buffer = Buffer.from(url.split(/,\s*/)[1], "base64");
    const qr = await pngToJpeg({ quality: 90 })(buffer);
    // fs.writeFileSync(`${__dirname}/${imgPath}.jpeg`, qr);
    return imgPath;
  } catch (err) {
    console.error(err);
  }
};
// Data formating
const qrData = function (data) {
  let text = `Name: ${data.name}\nCar Number:${data.car_number}\nPhone Number:${data.contact}`;
  let productNo = 0;
  data.client.forEach((el, i) => {
    if (el.length > 0) {
      productNo++;
      text += `\nProduct${productNo}: \n화주명: ${el},  BL NO: ${data.bl_number[i]},  출고수량: ${data.quality[i]}`;
    }
  });
  return text;
};

/********* POST REQUEST TO OUTPUT PAGE  ********/
exports.postOutput = async (req, res) => {
  try {
    const data = req.body;

    //generate qrcode
    const str = qrData(data);
    const url = await qr.toDataURL(str);
    const imgPath = await convertToJpg(url);

    const newOutputDB = await outputDB.create({
      imgUrl: url,
      randomKey: imgPath,
      name: data.name,
      car_number: data.car_number,
      contact: data.contact,
      client: data.client,
      bl_number: data.bl_number,
      quantity: data.quanlity,
      total_quantity: data.total_quantity,
    });

    if (req.body.sbm === "qr") {
      res.render("QR", {
        url: url,
        title: "출고용청서",
        imgPath: imgPath,
      });
    } else if (req.body.sbm === "print") {
      res.render("output/outputPrint", {
        data: data,
        date: new Date(),
        url: url,
      });
    } else {
      res.redirect("/output");
    }
  } catch (err) {
    console.log(err);
    // res.status(400).send(err);
  }
};

const qr = require("qrcode");
const fs = require("fs");
const pngToJpeg = require("png-to-jpeg");
const inputDB = require("./../modules/inputDB");

//Generate random key
const randomKey = () => {
  const randomNum = Math.floor(Math.random() * 100 + 1);
  const now = Date.now();
  return `${randomNum}${now}`;
};

//create jpeg file
const convertToJpg = async function (url) {
  try {
    const imgPath = randomKey();
    const buffer = Buffer.from(url.split(/,\s*/)[1], "base64");
    const qr = await pngToJpeg({ quality: 90 })(buffer);
    fs.writeFileSync(`${__dirname}/${imgPath}.jpeg`, qr);
    return imgPath;
  } catch (err) {
    console.error(err);
  }
};

/********CONTROLLERS********/
//get
exports.getInput = (req, res) => {
  res.status(200).render("input/input");
};
//post
exports.postInput = async (req, res) => {
  try {
    const data = req.body;
    //generate qrcode
    const str = `name: ${data.성함}\ncarNo:${data.차량번호}\nphoneNo:${data.연락처}\nforwarder:${data.포워더} \nbookingNo:${data.부킹넘버}`;
    const url = await qr.toDataURL(str);
    const imgPath = await convertToJpg(url);

    const newInputDB = await inputDB.create({
      imgUrl: url,
      randomKey: imgPath,
      name: data.name,
      contact: data.contact,
      car_number: data.car_number,
      forwarder: data.포워더,
      bookingNo: data.부킹넘버,
      signature: data.황자,
      destinationPort: data.도착항,
      departureDate: data.출항일자,
      cargo: data.화주명,
      packaging: data.포장규격,
      quantity: data.입고수량,
      volume: data.용적,
      weight: data.중량,
    });

    if (req.body.sbm === "qr") {
      res.render("QR", {
        url: url,
        title: "입고용청서",
        imgPath: imgPath,
      });
    } else if (req.body.sbm === "print") {
      res.render("input/inputPrint", {
        date: 0,
        data: data,
        url: url,
      });
    } else {
      res.redirect("/input");
    }
  } catch (err) {
    res.status(400).send(err);
  }
};

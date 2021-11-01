const path = require("path");
const fs = require("fs");
const { msg, config } = require("coolsms-node-sdk");
config.init({
  apiKey: process.env.APIKEY,
  apiSecret: process.env.APISECRET,
});

/**
 * MMS 발송 (최대 1만건 동시 발송)
 */

const send = async function (phone, title, imgPath) {
  // 이미지 업로드
  try {
    const { fileId } = await msg.uploadMMSImage(
      path.join(__dirname, `${imgPath}.jpeg`)
    );

    // // MMS 발송
    // // 01039197502
    // try {
    const result = await msg.send({
      messages: [
        {
          to: `${phone}`,
          from: "01087128235",
          subject: `${title}`,
          imageId: fileId,
          text: `${title}\nnumber:${imgPath}`,
        },
      ],
    });
    if (result) {
      fs.unlinkSync(path.join(__dirname, `${imgPath}.jpeg`));
    }
  } catch (e) {
    console.log("statusCode:", e.statusCode);
    // console.log('errorCode:', e.error.errorCode);
    // console.log('errorMessage:', e.error.errorMessage);
  }
};
//generate jpeg file
const convertToJpg = async (url) => {
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
//generate qrcode
const str = qrData();
const url = await qr.toDataURL(str);
const imgPath = await convertToJpg(url);
res.status(200).json({
  message: 'success'
})
//Random Key Generator
const randomKey = () => {
  const randomNum = Math.floor(Math.random() * 100 + 1);
  const now = Date.now();
  return `${randomNum}${now}`;
};
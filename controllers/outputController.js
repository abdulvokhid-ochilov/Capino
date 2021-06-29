const outputDB = require('../modules/outputDB');
const qr = require("qrcode");
const pngToJpeg = require('png-to-jpeg');
const fs = require('fs');


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
        console.log(imgPath);
        const buffer = Buffer.from(url.split(/,\s*/)[1], 'base64');
        const qr = await pngToJpeg({ quality: 90 })(buffer);
        fs.writeFileSync(`${__dirname}/${imgPath}.jpeg`, qr);
        return imgPath;
    } catch (err) {
        console.error(err);
    }
};
// Data formating 
const qrData = function (data) {
    let text = `name: ${data.성함}\ncarNo:${data.차량번호}\nphoneNo:${data.연락처}`;
    let productNo = 0;
    data.화주명.forEach((el, i) => {
        if (el.length > 0) {
            productNo++;
            text += `\nProduct${productNo}: \n화주명: ${el},  bl: ${data.비엘[i]},  quantity: ${data.출고수량[i]}`;
        }
    });
    return text;
};

exports.getOutput = async (req, res) => {
    res.render("output/output");
};

exports.postOutput = async (req, res) => {
    try {
        const data = req.body;
        const newOutputDB = await outputDB.create({
            _name: data.성함,
            _carNo: data.차량번호,
            _phoneNo: data.연락처,
            _company: data.소속회사,
            _client: data.화주명,
            _BL: data.비엘,
            _quantity: data.출고수량
        });
        const str = qrData(data);
        const url = await qr.toDataURL(str);
        const imgPath = await convertToJpg(url);
        if (req.body.sbm === "qr") {
            res.render("QR", {
                url: url, title: "출고용청서", imgPath: imgPath
            });
        } else if (req.body.sbm === "print") {
            res.render('output/outputPrint', {
                data: data, date: 0, url: url,
            });
        } else {
            res.redirect("/output");
        }
    } catch (err) {
        res.status(400).send('failed');
    }
};

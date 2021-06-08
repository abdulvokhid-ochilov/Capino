const express = require('express');
const router = express.Router();
const qr = require("qrcode");
const outputDB = require('../modules/outputDB');
const pngToJpeg = require('png-to-jpeg');
const fs = require('fs');

const getDate = function () {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), today.getDate());
};
//generate jpeg file
const convert = async function (url) {
    const buffer = Buffer.from(url.split(/,\s*/)[1], 'base64');
    try {
        const qr = await pngToJpeg({ quality: 90 })(buffer);
        fs.writeFileSync(`${__dirname}/qr.jpeg`, qr);
    } catch (err) {
        console.error("hello");
    }
};

router.get("/output", (req, res) => {
    res.render("output/output");
});


// Data formating 
const qrData = function (data) {
    let text = `name: ${data.성함}\ncarNo:${data.차랑번호}\nphoneNo:${data.연락처}\ncompany: ${data.소속회사}`;
    let productNo = 0;
    data.화주명.forEach((el, i) => {
        if (el.length > 0) {
            productNo++;
            text += `\nProduct${productNo}: \n화주명: ${el},  bl: ${data.비엘[i]},  quantity: ${data.출고수량[i]}`;
        }
    });
    return text;
};
router.post("/output", (req, res) => {
    const data = req.body;
    const output = new outputDB({
        _name: data.성함,
        _carNo: data.차랑번호,
        _phoneNo: data.연락처,
        _company: data.소속회사,
        _client: data.화주명,
        _BL: data.비엘,
        _quantity: data.출고수량
    });
    output.save();
    if (req.body.sbm === "qr") {
        const str = qrData(data);
        qr.toDataURL(str, (err, url) => {
            if (err) {
                console.log(__dirname);
            } else {
                convert(url);
                res.render("QR", { url: url });
            }
        });
    } else if (req.body.sbm === "save") {
        res.redirect("/output");
    } else {
        res.render('output/outputPrint', { data: data, date: 0 });
    }
});


// database page

const todayDate = getDate();
router.get("/output/outputdb", (req, res) => {
    outputDB.find({
        date: {
            $gte: todayDate
        }
    }, (err, db) => {
        if (err) {
            console.log(err);
        } else {
            res.render("output/outputdb", { collections: db });
        }
    });

});


router.post("/output/outputdb", (req, res) => {
    let start = req.body.from ? new Date(Date.parse(`${req.body.from} 00:00:00 GMT`)) : from = new Date('May 29, 2021 00:00:00');
    // let end = req.body.to ? new Date(Date.now()) : new Date(Date.parse(`${today.getFullYear(), today.getMonth(), today.getDate()} 23:59:59 GMT`));
    const clientName = req.body.name || /\w*/gi;
    const phoneNo = req.body.phoneNo || /\w*/gi;
    const carNo = req.body.carNo || /\w*/gi;
    if (req.body.search === "search") {
        outputDB.find({
            date: {
                $gte: start,
                // $lte: end
            },
            _name: clientName,
            _phoneNo: phoneNo,
            _carNo: carNo
        }, (err, db) => {
            if (err) {
                // console.log(err);
            } else {
                res.render("output/outputdb", { collections: db });
            }
        });
    }

});

module.exports = router;
const express = require('express');
const router = express.Router();
const qr = require("qrcode");
const inputDB = require("../modules/inputDB");
const fs = require('fs');
const pngToJpeg = require('png-to-jpeg');



const qrData = function (data) {
    let text = `name: ${data.성함}\ncarNo:${data.차량번호}\nphoneNo:${data.연락처}\ncompany: ${data.소속회사} \nforwarder:${data.포워더} \nbookingNo:${data.부킹넘버}`;
    return text;
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

//change to async
const createDB = function (data) {
    const input = new inputDB({
        _name: data.성함,
        _phoneNo: data.연락처,
        _carNO: data.차량번호,
        _company: data.소속회사,
        _forwarder: data.포워더,
        _bookingNo: data.부킹넘버,
        _signature: data.황자,
        _destinationPort: data.도착항,
        _shiper: data.화주명,
        _departureDate: data.출항일자,
        _cargo: data.화물명,
        _packaging: data.포장규격,
        _quantity: data.수량,
        _volume: data.용적,
        _weight: data.중량
    });
    input.save();
};

const getDate = function () {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), today.getDate());
};






/***********   INPUT ROUTE   ********/
router.get("/input", (req, res) => {
    res.render("input/input");
});



router.post("/input", (req, res) => {
    const data = req.body;
    const date = createDB(data);

    //HANDLING BUTTONS 
    if (req.body.sbm === "qr") {
        const str = qrData(data);
        qr.toDataURL(str, (err, url) => {
            if (err) {
                res.send("Error occured");
            } else {
                convert(url);
                res.render("QR", { url: url });
            }
        });
    } else if (req.body.sbm === "print") {
        res.render("input/inputPrint", { date: date, data: data });
    } else {
        res.redirect('/input');
    }
});


/***********   INPUTDB ROUTE   ********/
router.get("/input/inputdb", (req, res) => {
    const date = getDate();
    inputDB.find({
        date: {
            $gte: date
        }
    }, (err, db) => {
        if (err) {
            console.log(err);
        } else {
            res.render("input/inputdb", { collections: db });
        }
    });

});

router.post("/input/inputdb", (req, res) => {
    let start = req.body.from ? new Date(Date.parse(`${req.body.from} 00:00:00 GMT`)) : from = new Date('May 29, 2021 00:00:00');
    // let end = req.body.to ? new Date(Date.now()) : new Date(Date.parse(`${today.getFullYear(), today.getMonth(), today.getDate()} 23:59:59 GMT`));
    const clientName = req.body.name || /\w*/gi;
    const phoneNo = req.body.phoneNo || /\w*/gi;
    const carNo = req.body.carNo || /\w*/gi;
    if (req.body.search === "search") {
        inputDB.find({
            date: {
                $gte: start
                // $lte: end
            },
            // _name: clientName,
            // _phoneNo: phoneNo,
            // _carNo: carNo
        }, (err, db) => {
            if (err) {
                // console.log(err);
            } else {
                res.render("input/inputdb", { collections: db });
            }
        });
    }
});

/***********   INPUT PRINT ROUTE   ********/


module.exports = router;
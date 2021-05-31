const express = require('express');
const router = express.Router();
const qr = require("qrcode");
const inputDB = require("../modules/inputDB");

// input
router.get("/input", (req, res) => {
    res.render("input/input");
});

router.post("/input", (req, res) => {
    const data = req.body;
    const input = new inputDB({
        _name: data.성함,
        _phoneNo: data.연락처,
        _carNO: data.차량번호,
        _company: data.소속회사,
        _forwarder: data.포워다,
        _bookingNo: data.부킹넘버,
        _signature: data.황자,
        _destinationPort: data.도착항,
        _shiper: data.화주명,
        _departureDate: data.출항일자
    });
    input.save();
    if (req.body.sbm === "qr") {
        const jsonData = JSON.stringify(data);
        qr.toDataURL(jsonData, (err, url) => {
            if (err) {
                res.send("Error occured");
            } else {
                res.render("QR", { url: url });
            }
        });
    } else {
        res.redirect("/input");
    }
});

router.get("/input/inputdb", (req, res) => {
    const today = new Date();
    const date = new Date(today.getFullYear(), today.getMonth(), today.getDate());
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
    //function(default) 
    const from = req.body.from;
    const to = req.body.to;
    const clientName = req.body.name;
    const phoneNo = req.body.phoneNo;
    const carNo = req.body.carNo;

    inputDB.find({
        date: {
            $gte: new Date(Date.parse(from)),
            $lte: new Date(Date.parse(`${to} 23:59:59 GMT`))
        }
    }, (err, db) => {
        if (err) {
            // console.log(err);
        } else {
            res.render("input/inputdb", { collections: db });
        }
    });
});

module.exports = router;
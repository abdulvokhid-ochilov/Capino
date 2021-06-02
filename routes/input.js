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
module.exports = router;
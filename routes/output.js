const express = require('express');
const router = express.Router();
const qr = require("qrcode");
const outputDB = require('../modules/outputDB');





router.get("/output", (req, res) => {
    res.render("output/output");
});
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
        const jsonData = JSON.stringify(data);
        qr.toDataURL(jsonData, (err, url) => {
            if (err) {
                res.send("Error occured");
            } else {
                res.render("QR", { url: url });
            }
        });
    } else {
        res.redirect("/output");
    }
});


// database page
const today = new Date();
const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
console.log(todayDate);
router.get("/output/outputdb", (req, res) => {
    ;
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
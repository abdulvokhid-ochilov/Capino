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

router.get("/output/outputdb", (req, res) => {
    const today = new Date();
    const date = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    outputDB.find({
        date: {
            $gte: date
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
    //function(default) 
    const from = req.body.from;
    const to = req.body.to;
    const clientName = req.body.name;
    const phoneNo = req.body.phoneNo;
    const carNo = req.body.carNo;

    outputDB.find({
        date: {
            $gte: new Date(Date.parse(from)),
            $lte: new Date(Date.parse(`${to} 23:59:59 GMT`))
        }
    }, (err, db) => {
        if (err) {
            // console.log(err);
        } else {
            res.render("output/outputdb", { collections: db });
        }
    });
});

module.exports = router;
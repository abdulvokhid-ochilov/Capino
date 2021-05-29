const express = require('express');
const router = express.Router();
const qr = require("qrcode");
const outputDB = require('../modules/outputDB');



const OutputDB = require("../modules/outputDB");

router.get("/output", (req, res) => {
    res.render("output/output");
});
router.post("/output", (req, res) => {
    const data = req.body;
    const output = new OutputDB({
        name: data.성함,
        carNo: data.차랑번호,
        phoneNo: data.연락처,
        company: data.소속회사,
        client: data.화주명,
        BL: data.비엘,
        quantity: data.출고수량
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

    outputDB.find({}, (err, db) => {
        if (err) {
            console.log(err);
        } else {
            res.render("output/outputdb", { collections: db });
        }
    });

});

router.post("/output/outputdb", (req, res) => {
    //req.body submits to this page pass the data to function(default)
    //if nothing is passed function finds based on the default value else 
    // finds the passed value 




    //redirect to the page 
});

module.exports = router;
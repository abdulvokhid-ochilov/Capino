const express = require('express');
const router = express.Router();

// input
router.get("/input", (req, res) => {
    res.render("input");
});

router.post("/input", (req, res) => {
    const data = req.body;
    if (req.body.qr === "qr") {
        jsonData = JSON.stringify(data);
        qr.toDataURL(jsonData, (err, url) => {

            if (err) {
                res.send("Error occured");
            } else {

                res.render("QR", { url });
            }
        });
    }
});

module.exports = router;
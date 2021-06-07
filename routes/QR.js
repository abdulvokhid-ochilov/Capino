const express = require('express');
const router = express.Router();






router.post("/QR", (req, res) => {
    res.redirect("output");
});



module.exports = router;
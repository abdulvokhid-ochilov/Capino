const express = require("express");
const router = express.Router();
router.get("/CFS", (req, res) => {
    res.render("CFS");
});

module.exports = router;

const express = require('express');
const router = express.Router();
const controllers = require('./../controllers/qrController');

router
    .route('/')
    .post(controllers.postQR);



module.exports = router;
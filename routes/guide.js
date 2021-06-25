const express = require('express');
const router = express.Router();
const controllers = require('./../controllers/guideController');

router
    .route('/')
    .get(controllers.getGuide);



module.exports = router;
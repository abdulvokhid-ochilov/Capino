const express = require('express');
const router = express.Router();

const controllers = require('./../controllers/outputController');
const dbControllers = require('./../controllers/outputdbController');



router
    .route("/")
    .get(controllers.getOutput)
    .post(controllers.postOutput);

router
    .route('/outputdb')
    .get(dbControllers.getTodayDB)
    .post(dbControllers.getDB);


module.exports = router;
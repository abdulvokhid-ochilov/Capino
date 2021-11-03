const express = require('express');
const router = express.Router();
const controllers = require('./../controllers/inputController');
const dbControllers = require('./../controllers/inputdbController');


/***********   INPUT ROUTE   ********/
router
    .route('/')
    .get(controllers.getInput)
    .post(controllers.postInput);


router
    .route('/inputdb')
    .get(dbControllers.getTodayDB)
    .post(dbControllers.getDB);

module.exports = router;
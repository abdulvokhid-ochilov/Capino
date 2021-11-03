const express = require('express');
const router = express.Router();

const outputController = require('../controllers/outputController');

router
    .route("/")
    .get(outputController.getOutput)
    .patch(outputController.updateOutput);


router.get('/:id', outputController.getTransaction);




module.exports = router;
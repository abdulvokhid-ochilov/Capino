const express = require('express');
const router = express.Router();

const outputController = require('../controllers/outputController');

router
    .route("/")
    .get(outputController.getOutput)
    .patch(outputController.updateOutput);


router.get('/:id', (req, res) => {
    console.log(req.params);
    res.status(200).json({
        status: 'success',
        message: `You serd request to ${req.url}`
    })
})


module.exports = router;
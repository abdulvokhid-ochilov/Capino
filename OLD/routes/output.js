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

router.get('/:id', (req, res) => {
    console.log(req.params);
    res.status(200).json({
        status: 'success',
        message: `You serd request to ${req.url}`
    })
})





module.exports = router;
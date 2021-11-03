const express = require('express');
const router = express.Router();
const inputControllers = require('../controllers/inputController');


/***********   INPUT ROUTE   ********/
router.post('/', inputControllers.insertInput)

router.get('/:id', inputControllers.getTransaction);


module.exports = router;
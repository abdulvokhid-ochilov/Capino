const express = require('express');
const router = express.Router();
const inputHistoryController = require('../controllers/inputHistoryController')

router.get('/', inputHistoryController.getInputHistory)

module.exports = router;
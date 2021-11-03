const express = require('express');
const router = express.Router();
const outputHistoryController = require('../controllers/outputHistoryController')

router.get('/', outputHistoryController.getOutputHistory)

module.exports = router;
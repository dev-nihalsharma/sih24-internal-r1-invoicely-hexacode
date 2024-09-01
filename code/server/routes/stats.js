const express = require('express');
const router = express.Router();
const giveStats  = require('../controllers/stats');

router.post('/all',giveStats);

module.exports = router;
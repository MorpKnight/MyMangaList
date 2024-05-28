const searchControllers = require('../controllers/Search.controllers');
const express = require('express');
const router = express.Router();

router.get('', searchControllers.search);
router.get('/filter', searchControllers.filter);

module.exports = router;
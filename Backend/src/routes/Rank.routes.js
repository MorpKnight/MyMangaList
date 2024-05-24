const rankControllers = require('../controllers/Rank.controllers');
const express = require('express');
const router = express.Router();

router.get('/:page', rankControllers.getPaginatedRank);

module.exports = router;
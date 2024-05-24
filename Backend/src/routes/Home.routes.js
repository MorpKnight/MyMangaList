const homeControllers = require('../controllers/Home.controllers');
const authMiddlewares = require('../middlewares/Auth.middlewares');
const express = require('express');
const router = express.Router();

router.get('/', homeControllers.getHome);
router.post('/add', authMiddlewares.authenticate, authMiddlewares.isAdmin, homeControllers.addMedia);

module.exports = router;
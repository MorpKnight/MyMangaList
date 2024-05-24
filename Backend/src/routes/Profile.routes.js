const profileControllers = require('../controllers/Profile.controllers');
const authMiddlewares = require('../middlewares/Auth.middlewares');
const express = require('express');
const router = express.Router();

router.get('/', authMiddlewares.authenticate, profileControllers.getUserProfile);
router.put('/', authMiddlewares.authenticate, profileControllers.updateUserProfile);
router.delete('/', authMiddlewares.authenticate, profileControllers.deleteUserProfile);
router.get('/list', authMiddlewares.authenticate, profileControllers.viewUserList);
router.get('/review', authMiddlewares.authenticate, profileControllers.viewReview);

module.exports = router;
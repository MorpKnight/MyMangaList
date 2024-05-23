const profileControllers = require('../controllers/Profile.controllers');
const authMiddlewares = require('../middlewares/Auth.middlewares');
const express = require('express');
const router = express.Router();

router.get('/', authMiddlewares.isAuth, profileControllers.getUserProfile);
router.put('/', authMiddlewares.isAuth, profileControllers.updateUserProfile);
router.delete('/', authMiddlewares.isAuth, profileControllers.deleteUserProfile);
router.get('/list', authMiddlewares.isAuth, profileControllers.viewUserList);
router.get('/review', authMiddlewares.isAuth, profileControllers.viewReview);

module.exports = router;
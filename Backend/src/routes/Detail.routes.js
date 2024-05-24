const detailControllers = require('../controllers/Detail.controllers');
const authMiddlewares = require('../middlewares/Auth.middlewares');
const express = require('express');
const router = express.Router();

router.get('/:id', detailControllers.getMediaDetail);
router.post('/add-to-list/:id', authMiddlewares.authenticate, detailControllers.addToUserList);
router.post('/remove-from-list/:id', authMiddlewares.authenticate, detailControllers.removeFromUserList);
router.post('/review/:id', authMiddlewares.authenticate, detailControllers.addReview);
router.put('/review/:id', authMiddlewares.authenticate, detailControllers.updateReview);
router.delete('/review/:id', authMiddlewares.authenticate, detailControllers.deleteReview);
router.get('/review/:id', detailControllers.getMediaReview);
router.put('/:id', authMiddlewares.authenticate, authMiddlewares.isAdmin, detailControllers.updateMediaDetail);
router.delete('/:id', authMiddlewares.authenticate, authMiddlewares.isAdmin, detailControllers.deleteMedia);

module.exports = router;
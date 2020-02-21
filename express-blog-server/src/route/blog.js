const express = require('express');
const authMiddleware = require('../middleware/auth');
const blogMiddleware = require('../middleware/blog');
const router = express.Router();

router.get('/list', blogMiddleware.list);
router.get('/detail', blogMiddleware.detail);
router.post('/new', authMiddleware.check, blogMiddleware.create);
router.post('/update', authMiddleware.check, blogMiddleware.update);
router.post('/del', authMiddleware.check, blogMiddleware.delete);

module.exports = router;

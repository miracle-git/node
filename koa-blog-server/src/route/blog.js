const router = require('koa-router')();
const authMiddleware = require('../middleware/auth');
const blogMiddleware = require('../middleware/blog');

router.prefix('/api/blog');

router.get('/list', blogMiddleware.list);
router.get('/detail', blogMiddleware.detail);
router.post('/new', authMiddleware.check, blogMiddleware.create);
router.post('/update', authMiddleware.check, blogMiddleware.update);
router.post('/del', authMiddleware.check, blogMiddleware.delete);

module.exports = router;

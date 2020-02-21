const router = require('koa-router')();
const userMiddleware = require('../middleware/user');

router.prefix('/api/user');

router.post('/login', userMiddleware.login);

module.exports = router;

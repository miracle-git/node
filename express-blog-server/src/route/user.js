const express = require('express');
const userMiddleware = require('../middleware/user');
const router = express.Router();

router.post('/login', userMiddleware.login);

module.exports = router;

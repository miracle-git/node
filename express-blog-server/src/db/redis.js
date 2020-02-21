const { redis } = require('m2-nodejs');
const config = require('../conf/env');
const client = redis.connect(config.redis);

module.exports = {
  client
};

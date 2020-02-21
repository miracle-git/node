const { redis } = require('m2-nodejs');
const config = require('../conf/db');
const client = redis.connect(config.redis);
const set = (key, val) => redis.setItem(client, key, val);
const get = (key) => redis.getItem(client, key);
const del = (key) => redis.delItem(client, key);

module.exports = {
  set,
  get,
  del
};

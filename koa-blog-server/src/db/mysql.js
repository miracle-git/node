const { mysql } = require('m2-nodejs');
const config = require('../conf/env');
const connection = mysql.connect(config.mysql);
const exec = (sql) => mysql.execSql(connection, sql);
const escape = mysql.escape;

module.exports = {
  exec,
  escape
};

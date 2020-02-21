const { mysql } = require('m2-nodejs');
const config = require('../conf/db');
const connection = mysql.connect(config.mysql);
const exec = (sql) => mysql.execSql(connection, sql);
const escape = mysql.escape;

module.exports = {
  exec,
  escape
};

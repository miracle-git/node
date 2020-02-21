const xss = require('xss');
const { exec, escape } = require('../db/mysql');
const { encrypt } = require('../util/auth');

const userLogin = (username, password) => {
  const sql = `select username, realname from users 
               where username=${escape(xss(username))} and password=${escape(xss(encrypt(password)))}`;
  return exec(sql).then(res => res[0] || {});
};

module.exports = {
  userLogin
};

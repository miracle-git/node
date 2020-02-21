const { encryptPassword } = require('m2-nodejs');
const { password_secure_key } = require('../conf/key');

const encrypt = (password) => encryptPassword(password, password_secure_key);

module.exports = {
  encrypt
};

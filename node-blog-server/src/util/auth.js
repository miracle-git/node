const { model, encryptPassword } = require('m2-nodejs');
const { ErrorModel } = model;

const checkIsAuth = (session) => {
  if (!session.data.username) {
    return Promise.resolve(new ErrorModel('用户登录失败'));
  }
};

const encrypt = (password) => encryptPassword(password, 'm2-node_$#blog');

module.exports = {
  checkIsAuth,
  encrypt
};

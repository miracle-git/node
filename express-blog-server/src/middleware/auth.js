const { model } = require('m2-nodejs');
const { ErrorModel } = model;

const handler = (req, res) => {
  const { session } = req;
  if (!session.username) {
    res.json(new ErrorModel('用户登录失败'));
    return false;
  }
  return session.username;
};

const check = (req, res, next) => {
  const result = handler(req, res);
  if (result) {
    next();
  }
};

module.exports = {
  handler,
  check
};

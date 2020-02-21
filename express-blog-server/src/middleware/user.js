const { model } = require('m2-nodejs');
const { userLogin } = require('../controller/user');
const { SuccessModel, ErrorModel } = model;

const middleware = {
  login: (req, res, next) => {
    const { body, session } = req;
    const { username, password } = body;

    return userLogin(username, password).then(result => {
      if (!result.username) {
        res.json(new ErrorModel('用户登录失败'));
        return;
      }
      // 在服务端操作session
      session.username = result.username;
      session.realname = result.realname;
      res.json(new SuccessModel());
    });
  }
};

module.exports = middleware;

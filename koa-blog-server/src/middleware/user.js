const { model } = require('m2-nodejs');
const { userLogin } = require('../controller/user');
const { SuccessModel, ErrorModel } = model;

const middleware = {
  login: async (ctx, next) => {
    const { request, session } = ctx;
    const { username, password } = request.body;

    const result = await userLogin(username, password);
    if (!result.username) {
      ctx.body = new ErrorModel('用户登录失败');
      return;
    }
    // 在服务端操作session
    session.username = result.username;
    session.realname = result.realname;
    ctx.body = new SuccessModel();
  }
};

module.exports = middleware;

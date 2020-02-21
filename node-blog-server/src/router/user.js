const { model } = require('m2-nodejs');
const { set } = require('../db/redis');
const { userLogin } = require('../controller/user');
const { SuccessModel, ErrorModel } = model;

const userRouter = (req, res) => {
  const { method, path, body, session } = req;
  const { username, password } = body;
  // const { username, password } = query;

  if (method === 'POST' && path === '/api/user/login') {
    return userLogin(username, password).then(result => {
      if (!result.username) return new ErrorModel('用户登录失败');
      // 在服务端操作session
      session.data.username = result.username;
      session.data.realname = result.realname;
      // 同步到redis
      set(session.id, session.data);
      return new SuccessModel();
    });
  }

  /*
  if (method === 'GET' && path === '/api/user/login_test') {
    console.log(req.session);
    if (!session.data.username) {
      return Promise.resolve(new ErrorModel('用户登录失败'));
    }
    return Promise.resolve(new SuccessModel({
      session: session.data
    }));
  }*/
};

module.exports = userRouter;

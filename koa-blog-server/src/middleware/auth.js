const { model } = require('m2-nodejs');
const { ErrorModel } = model;

const handler = (ctx) => {
  const { session } = ctx;
  if (!session.username) {
    ctx.body = new ErrorModel('用户登录失败');
    return false;
  }
  return session.username;
};

const check = async (ctx, next) => {
  const result = handler(ctx);
  if (result) {
    await next();
  }
};

module.exports = {
  handler,
  check
};

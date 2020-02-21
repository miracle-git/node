const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const parser = require('koa-bodyparser');
const logger = require('koa-logger');

const { sessionRedis, defaultLogger, morganLogger, serverError } = require('m2-nodejs/koa');
const { session_secure_key } = require('./src/conf/key');
const { redis } = require('./src/conf/env');

const apiRouter = require('./src/route/api');
const blogRouter = require('./src/route/blog');
const userRouter = require('./src/route/user');

// error handler
onerror(app);

// middlewares
app.use(parser({
  enableTypes: ['json', 'form', 'text']
}));
app.use(json());
app.use(logger());
app.use(require('koa-static')(__dirname + '/public'));

app.use(views(__dirname + '/view', {
  extension: 'pug'
}));

// logger
app.use(defaultLogger);
app.use(morganLogger('./log/access.log'));

// session
app.keys = [session_secure_key];
app.use(sessionRedis(redis, {
  maxAge: 24 * 60 * 60 * 1000
}));

// routes
app.use(apiRouter.routes(), apiRouter.allowedMethods());
app.use(blogRouter.routes(), blogRouter.allowedMethods());
app.use(userRouter.routes(), userRouter.allowedMethods());

// error-handling
app.on('error', serverError);

module.exports = app;

const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const { sessionRedis, morganLogger, notFoundError, serverError } = require('m2-nodejs/express');
const { session_secure_key } = require('./src/conf/key');
const { client } = require('./src/db/redis');

const apiRouter = require('./src/route/api');
const blogRouter = require('./src/route/blog');
const userRouter = require('./src/route/user');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'view'));
app.set('view engine', 'jade');

app.use(morganLogger('./log/access.log'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(sessionRedis({ client }, {
  secret: session_secure_key,
  maxAge: 24 * 60 * 60 * 1000
}));

app.use('/api', apiRouter);
app.use('/api/blog', blogRouter);
app.use('/api/user', userRouter);

// catch 404 and forward to error handler
app.use(notFoundError);
// error handler
app.use(serverError);

module.exports = app;

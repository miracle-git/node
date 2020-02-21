const { http } = require('m2-nodejs');
const { accessLog } = require('./src/util/log');
const redis = require('./src/db/redis');
const blogRouter = require('./src/router/blog');
const userRouter = require('./src/router/user');

const handleServer = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  // 记录日志
  accessLog(`${req.method} -- ${req.url} -- ${req.headers['user-agent']} -- ${Date.now()}`);
  // 解析query
  http.parseQuery(req);
  // 解析cookie
  http.parseCookie(req);
  // 解析session
  http.parseSession(req, redis).then(data => {
    req.body = data;

    const blogResult = blogRouter(req, res);
    if (blogResult) {
      blogResult.then(result => {
        const { id } = req.session;
        if (req.needCookie) {
          http.setServerCookie(res, 'sid', id);
        }
        res.end(JSON.stringify(result));
      });
      return;
    }

    const userResult = userRouter(req, res);
    if (userResult) {
      userResult.then(result => {
        const { id } = req.session;
        if (req.needCookie) {
          http.setServerCookie(res, 'sid', id);
        }
        res.end(JSON.stringify(result));
      });
      return;
    }

    res.writeHead(404, { 'Content-Type': 'text/plain;charset=utf-8' });
    res.write('未匹配到对应的路由');
    res.end();
  });
};

module.exports = handleServer;

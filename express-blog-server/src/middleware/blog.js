const { model } = require('m2-nodejs');
const { getList, getDetail, createItem, updateItem, deleteItem } = require('../controller/blog');
const authMiddleware = require('./auth');
const { SuccessModel, ErrorModel } = model;

const middleware = {
  list: (req, res, next) => {
    const { query } = req;
    const { keyword, isadmin } = query;

    if (isadmin) {
      const result = authMiddleware.handler(req, res);
      if (!result) return;
      query.author = result;
    }

    return getList(query.author, keyword).then(result => {
      res.json(new SuccessModel(result));
    });
  },
  detail: (req, res, next) => {
    const { query } = req;

    return getDetail(query.id).then(result => {
      res.json(new SuccessModel(result));
    });
  },
  create: (req, res, next) => {
    const { session, body } = req;

    body.author = session.username;
    return createItem(body).then(result => {
      if (!result.id) {
        res.json(new ErrorModel('添加博客失败'));
        return;
      }
      res.json(new SuccessModel(result));
    });
  },
  update: (req, res, next) => {
    const { query, session, body } = req;

    body.author = session.username;
    return updateItem(query.id, body).then(result => {
      if (!result) {
        res.json(new ErrorModel('更新博客失败'));
        return;
      }
      res.json(new SuccessModel(result));
    });
  },
  delete: (req, res, next) => {
    const { query, session, body } = req;

    body.author = session.username;
    return deleteItem(query.id, body.author).then(result => {
      if (!result) {
        res.json(new ErrorModel('删除博客失败'));
        return;
      }
      res.json(new SuccessModel(result));
    });
  }
};

module.exports = middleware;

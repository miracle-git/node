const { model } = require('m2-nodejs');
const { getList, getDetail, createItem, updateItem, deleteItem } = require('../controller/blog');
const authMiddleware = require('./auth');
const { SuccessModel, ErrorModel } = model;

const middleware = {
  list: async (ctx, next) => {
    const { query } = ctx;
    const { keyword, isadmin } = query;

    if (isadmin) {
      const result = authMiddleware.handler(ctx);
      if (!result) return;
      query.author = result;
    }

    const result = await getList(query.author, keyword);
    ctx.body = new SuccessModel(result);
  },
  detail: async (ctx, next) => {
    const { query } = ctx;
    const result = await getDetail(query.id);
    ctx.body = new SuccessModel(result);
  },
  create: async (ctx, next) => {
    const { session, request } = ctx;
    const { body } = request;

    body.author = session.username;
    const result = await createItem(body);

    if (!result.id) {
      ctx.body = new ErrorModel('添加博客失败');
      return;
    }
    ctx.body = new SuccessModel(result);
  },
  update: async (ctx, next) => {
    const { session, query, request } = ctx;
    const { body } = request;

    body.author = session.username;
    const result = await updateItem(query.id, body);

    if (!result) {
      ctx.body = new ErrorModel('更新博客失败');
      return;
    }
    ctx.body = new SuccessModel(result);
  },
  delete: async (ctx, next) => {
    const { query, session, request } = ctx;
    const { body } = request;

    body.author = session.username;
    const result = await deleteItem(query.id, body.author);

    if (!result) {
      ctx.body = new ErrorModel('删除博客失败');
      return;
    }
    ctx.body = new SuccessModel(result);
  }
};

module.exports = middleware;

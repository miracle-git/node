const { model } = require('m2-nodejs');
const { getList, getDetail, createItem, updateItem, deleteItem } = require('../controller/blog');
const { checkIsAuth } = require('../util/auth');
const { SuccessModel, ErrorModel } = model;

const blogRouter = (req, res) => {
  const { method, path, query, body, session } = req;
  const { id } = query;

  if (method === 'GET' && path === '/api/blog/list') {
    let { author, keyword, isadmin } = query;
    if (isadmin) {
      const result = checkIsAuth(session);
      if (result) return result;
      author = session.data.username;
    }
    return getList(author, keyword).then(result => {
      return new SuccessModel(result);
    });
  }

  if (method === 'GET' && path === '/api/blog/detail') {
    return getDetail(id).then(result => {
      return new SuccessModel(result);
    });
  }

  if (method === 'POST' && path === '/api/blog/new') {
    const result = checkIsAuth(session);
    if (result) return result;

    body.author = session.data.username;
    return createItem(body).then(result => {
      if (!result.id) return new ErrorModel('添加博客失败');
      return new SuccessModel(result);
    });
  }

  if (method === 'POST' && path === '/api/blog/update') {
    const result = checkIsAuth(session);
    if (result) return result;

    body.author = session.data.username;
    return updateItem(id, body).then(result => {
      if (!result) return new ErrorModel('更新博客失败');
      return new SuccessModel();
    });
  }

  if (method === 'POST' && path === '/api/blog/del') {
    const result = checkIsAuth(session);
    if (result) return result;

    body.author = session.data.username;
    return deleteItem(id, body.author).then(result => {
      if (!result) return new ErrorModel('删除博客失败');
      return new SuccessModel();
    });
  }
};

module.exports = blogRouter;

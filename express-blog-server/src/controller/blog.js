const xss = require('xss');
const { exec, escape } = require('../db/mysql');

const getList = (author = '', keyword = '') => {
  let sql = 'select * from blogs where 1=1';
  if (author) {
    sql += ` and author=${escape(author)}`;
  }
  if (keyword) {
    sql += ` and title like '%${keyword}%'`;
  }
  sql += ' order by create_time desc';
  return exec(sql);
};

const getDetail = (id) => {
  const sql = `select * from blogs where id=${escape(id)}`;
  return exec(sql).then(res => res[0]);
};

const createItem = (blog = {}) => {
  const { title, content, author } = blog;
  const sql = `insert into blogs(title,content,create_time,author) 
               values(${escape(xss(title))},${escape(xss(content))},${Date.now()},${escape(author)})`;
  return exec(sql).then(res => ({ id: res.insertId }));
};

const updateItem = (id, blog = {}) => {
  const { title, content, author } = blog;
  const sql = `update blogs set title=${escape(xss(title))},content=${escape(xss(content))}
               where id=${escape(id)} and author=${escape(author)}`;
  return exec(sql).then(res => res.affectedRows > 0);
};

const deleteItem = (id, author) => {
  const sql = `delete from blogs where id=${escape(id)} and author=${escape(author)}`;
  return exec(sql).then(res => res.affectedRows > 0);
};

module.exports = {
  getList,
  getDetail,
  createItem,
  updateItem,
  deleteItem
};

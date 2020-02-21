const xss = require('xss');
const { exec, escape } = require('../db/mysql');

const getList = async (author = '', keyword = '') => {
  let sql = 'select * from blogs where 1=1';
  if (author) {
    sql += ` and author=${escape(author)}`;
  }
  if (keyword) {
    sql += ` and title like '%${keyword}%'`;
  }
  sql += ' order by create_time desc';
  return await exec(sql);
};

const getDetail = async (id) => {
  const sql = `select * from blogs where id=${escape(id)}`;
  const res = await exec(sql);
  return res[0];
};

const createItem = async (blog = {}) => {
  const { title, content, author } = blog;
  const sql = `insert into blogs(title,content,create_time,author) 
               values(${escape(xss(title))},${escape(xss(content))},${Date.now()},${escape(author)})`;
  const res = await exec(sql);
  return { id: res.insertId };
};

const updateItem = async (id, blog = {}) => {
  const { title, content, author } = blog;
  const sql = `update blogs set title=${escape(xss(title))},content=${escape(xss(content))}
               where id=${escape(id)} and author=${escape(author)}`;
  const res = await exec(sql);
  return res.affectedRows > 0;
};

const deleteItem = async (id, author) => {
  const sql = `delete from blogs where id=${escape(id)} and author=${escape(author)}`;
  const res = await exec(sql);
  return res.affectedRows > 0;
};

module.exports = {
  getList,
  getDetail,
  createItem,
  updateItem,
  deleteItem
};

//引入数据库
var mysql = require('mysql')
//创建连接
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'baixiu'
  });

  module.exports = connection
//引入公共数据块模块
var connection = require('./commonMoudles')

  //登录
  exports.getLoginByEmail = (email,callback) => {
        //验证邮箱
        var sql = 'SELECT * from users where email = ?'
        //开冲
        connection.query(sql,[email],(err,results) => {
             if(err){
                 callback(err)
             }else{
                 callback(null,results[0])
             }
        })
  }

//分类菜单数据库
var connection = require('./commonMoudles')
//分类菜单全部数据
exports.getAllData = (callback) => {
    var sql = 'SELECT * from categories where id != 1'
    connection.query(sql, (err, results) => {
        if (err) {
            callback(err)
        } else {
            callback(null, results)
        }
    })
}

//根据id获取编辑的信息
exports.editById = (obj, callback) => {
    var sql = 'UPDATE categories set slug=?,name=? where id = ?'
    connection.query(sql, [obj.slug, obj.name, obj.id], (err) => {
        if (err) {
            callback(err)
        } else {
            callback(null)
        }
    })
}
//添加数据
exports.addList = (obj, callback) => {
    var sql = 'INSERT categories VALUES(null,?,?)'
    connection.query(sql, [obj.slug, obj.name], (err) => {
        if (err) {
            callback(err)
        } else {
            callback(null)
        }
    })
}
//删除单个数据
exports.delById = (id, callback) => {
    var sql = 'DELETE from categories where id = ?'
    connection.query(sql, [id], (err) => {
        if (err) {
            callback(err)
        } else {
            callback(null)
        }
    })
}
//删除多条数据
exports.alldelById = (id,callback) => {
    var sql = 'DELETE from categories where id in (?)'
        connection.query(sql,[id], (err) => {
            if (err) {
                callback(err)
            }else{
                callback(null)
            }
        })
}
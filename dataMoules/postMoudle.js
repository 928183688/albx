//引入数据库
var connection = require('../dataMoules/commonMoudles')

//获取文章全部数据
exports.getAllPostList = (query, callback) => {
    var sql = ` SELECT posts.id,posts.title,posts.created,posts.status,users.nickname,categories.name as catename
                    FROM posts
                    INNER JOIN users on user_id = users.id
                    INNER JOIN categories on category_id = categories.id
                     where 1 = 1 `
    if (query.category_id) {
        sql += " and category_id = " + query.category_id
    }
    if (query.status) {
        sql += ` and posts.status = '${query.status}' `
    }
    sql += ` ORDER BY created
             limit ${(query.pageNum - 1) * query.pageSize},${query.pageSize} `
    connection.query(sql, (err, results) => {
        if (err) {
            callback(err)
        } else {
            sql = 'SELECT COUNT(*) as cut from posts where 1 = 1 '
            if (query.category_id) {
                sql += " and category_id = " + query.category_id
            }
            if (query.status) {
                sql += ` and posts.status = '${query.status}' `
            }
            connection.query(sql, (err1, results1) => {
                if (err1) {
                    callback(err1)
                } else {
                    callback(null, { data: results, total: results1[0].cut })
                }

            })

        }
    })
}


//添加新数据
exports.addAllPostList = (obj, callback) => {
    var sql = 'INSERT into posts VALUES (null,?,?,?,?,?,?,?,?,?,?)'
    console.log(sql)
    connection.query(sql, [obj.slug,obj.title,obj.feature,obj.created,obj.content,obj.views,obj.likes,obj.status,obj.user_id,obj.category_id], (err,results) => {
            console.log(err)
        if(err){
                 callback(err)
             }else{
                 callback(null,results)
             }
    })
}


//根据id查询数据
exports.editById = (id,callback) => {
    var sql = 'SELECT * from posts where id = ?'
    connection.query(sql,[id],(err,results) => {
          if(err){
              callback(err)
          }else{
              callback(null,results[0])
          }
    })
}

//编辑文章数据
exports.editPostList = (obj,callback) => {
    var sql = 'UPDATE posts set ? where id = ? '
    connection.query(sql,[obj,obj.id],(err) => {
          if(err){
              callback(err)
          }else{
              callback(null)
          }
    })
}


//删除单条数据
exports.delPostById = (id, callback) => {
    var sql = 'DELETE from posts where posts.id = ?'
    connection.query(sql, [id], (err) => {
        if (err) {
            callback(err)
        } else {
            callback(null)
        }
    })
}


//批量删除数据
exports.delAllById = (id, callback) => {
    var sql = 'DELETE from posts where id in (?)'
    connection.query(sql, [id], (err) => {
        if (err) {
            callback(err)
        } else {
            callback(null)
        }
    })

}         
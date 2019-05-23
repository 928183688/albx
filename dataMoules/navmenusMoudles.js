var connection = require('./commonMoudles')
module.exports = {
    addNavMenus(obj,callback){
        obj.icon = "fa fa fa"
        var sql = 'SELECT VALUE from options where id = 9'
        connection.query(sql,(err,results) => {
             if(err){
                 callback(err)
             }else{
                 var menus = JSON.parse(results[0].VALUE)
                //  console.log(menus)
                 menus.push(obj)
                 var dataStr = JSON.stringify(menus)
                //  console.log(dataStr)
                 sql = 'update options set value = ? where id = 9 '
                 connection.query(sql,[dataStr],(err1) => {
                     if(err1){
                         callback(err1)
                     }else{
                         callback(null)
                     }
                 })
             }
        })
    }
}
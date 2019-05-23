var categoriesMoudles = require('../dataMoules/categoriesMoudles')
var myurl = require('url')
//分类菜单全部数据
exports.getCategoriesAllData = (req,res) => {
    categoriesMoudles.getAllData((err,data) => {
         if(err){
             res.end('404')
         }else{
             res.json(data)
         }
    })    
}

//根据id获取编辑的信息
exports.editCategories = (req,res) => {
    var obj = req.body
    categoriesMoudles.editById(obj,(err) => {
            if(err){
                res.json({
                    code:201,
                    msg:'编辑失败'
                })
            }else{
                res.json({
                    code:200,
                    msg:'编辑成功'
                })
            }
    })
}

//添加数据
exports.addCategories = (req,res) => {
    var obj = req.body
    categoriesMoudles.addList(obj,(err) => {
            if(err){
                res.json({
                    code:201,
                    msg:'添加失败'
                })
            }else{
                res.json({
                    code:200,
                    msg:'添加成功'
                })
            }
    })
}

//删除单个数据
exports.delCategories = (req,res) => {
    var id = myurl.parse(req.url,true).query.id
    // console.log(id)
    categoriesMoudles.delById(id,(err) =>{
          if(err){
              res.json({
                  code:201,
                  msg:'删除失败'
              })
          }else{
            res.json({
                code:200,
                msg:'删除成功'
            })
          }
    })
}

//删除多条数据
exports.alldelCategories = (req,res) => {
     var id = req.body['ids[]']
     console.log(id)
    //  console.log(id)
     categoriesMoudles.alldelById(id,(err) => {
        if(err){
            res.json({
                code:201,
                msg:'删除失败'
            })
        }else{
          res.json({
              code:200,
              msg:'删除成功'
          })
        }
     })
}
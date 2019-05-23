var navmenusMoudles = require('../dataMoules/navmenusMoudles')
module.exports = {
    addNavMenus(req,res){
        // console.log(req.body)
        var obj = req.body
        navmenusMoudles.addNavMenus(obj,(err) => {
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
}
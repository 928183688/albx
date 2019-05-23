var postMoudle = require('../dataMoules/postMoudle')
var moment = require('moment')
//实现主页渲染和分页器操作
exports.getAllPostList = (req, res) => {
    postMoudle.getAllPostList(req.query, (err, data) => {
       
    // console.log(req.query)
        if (err) {
            res.json({
                code: 404,
                msg: 'err'
            })
        } else {
            res.json({
                code: 200,
                data: data
            })
        }
    })
}


//添加新数据
exports.addPostList = (req,res) => {
        // console.log(req.body)
        var obj = req.body
        obj['views'] = 0
        obj['likes'] = 0
        obj['user_id'] = req.session.current.id
        // console.log(req.session.current.id)
        postMoudle.addAllPostList(obj,(err) => {
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

//根据ID查询数据
exports.editPostListById = (req,res) => {
    var id = req.query.id
    postMoudle.editById(id,(err,data) => {
        if(err){
            res.json({
                code: 201,
                msg : '服务器异常'
            })
        }else{
            data.created = moment(data.created).format('YYYY-MM-DDTHH:mm')
            res.json({
                code: 200,
                msg : '获取成功',
                data : data
            })
        }
    })
}

//文章编辑信息
exports.editPostList = (req,res) => {
     var obj = req.body
    //  console.log(obj)
     postMoudle.editPostList(obj,(err,data) => {
        if(err){
            res.json({
                code: 201,
                msg : '编辑失败'
            })
        }else{
            res.json({
                code: 200,
                msg : '编辑成功',
            })
        }
    })
}

//根据ID删除单条数据
exports.delPostList = (req, res) => {
    var id = req.query.id
    //  console.log(id)
    postMoudle.delPostById(id, (err) => {
        if (err) {
            res.json({
                code: 201,
                msg: '删除失败'
            })
        } else {
            res.json({
                code: 200,
                msg: '删除成功'
            })
        }
    })
}
//根据ID批量删除
exports.delAllPostList = (req, res) => {
    var id = req.body['ids[]']
    // console.log(req.id)
    postMoudle.delAllById(id, (err) => {
        if (err) {
            res.json({
                code: 201,
                msg: '删除失败'
            })
        } else {
            res.json({
                code: 200,
                msg: '删除成功'
            })
        }
    })
}
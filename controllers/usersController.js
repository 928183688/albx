var usersMoudles = require('../dataMoules/usersMoudles')
//登录
exports.login = (req, res) => {
    // console.log(req.body)
    //只需要邮箱得数据
    usersMoudles.getLoginByEmail(req.body.email, (err, data) => {
        if (err) {
            res.json({
                code: 201,
                msg: '服务器异常'
            })
        } else {
            if (data) {   //如果邮箱验证成功 那么也验证密码
                //如果传来得参数和数据库得数据一样
                if (data.password == req.body.password) {
                    // 如果密码正确 那么就加一条属性 
                    // 通过session状态保持
                    // var time = 3600000000
                    // req.session.cookie.expires = new Date(Date.now() + time)
                    req.session.isLogin = 'true'
                    req.session.current = data
                    // console.log(req.session)

                     res.json({
                        code: 200,
                        msg: '登录成功'
                    })

                    // 通过cookie状态保持
                    // var time = new Date(Date.now() + 10000000000).toUTCString()
                    // // console.log(time)
                    // res.writeHead(200,{
                    //     'Set-Cookie':['isLogin=true;expires=' + time]
                    // })
          
                    // res.end(JSON.stringify({
                    //      code: 200,
                    //      msg: '登录成功'
                    // }))
                } else {
                    res.json({
                        code: 201,
                        msg: '密码错误'
                    })
                }
                
            } else {  //如果邮箱不对 
                res.json({
                    code: 201,
                    msg: '邮箱错误'
                })
            }
        }
    })
}
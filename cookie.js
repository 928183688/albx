//引入express框架
var express = require('express')
//引入处理字符串模块
var querystring = require('querystring')
//创建服务器
var app = express()
//端口监听
app.listen(3002, () => {
    console.log('http://127.0.0.1:3002')
})
app.get('/',(req,res) => {
    var mycookie = querystring.parse(req.headers.cookie)
    //设置时间
    var time = new Date(Date.now() + 1000000).toUTCString()
    // console.log(mycookie)
    //判断是否有isLogin 有就证明有cookie
      if(mycookie.isLogin && mycookie.isLogin == 'true'){
            res.end('welcome callback')
      }else{
          res.writeHead(200,{
            'Set-Cookie' : ['isLogin=true;expires=' + time]
          })
            res.end('first')
      }
})
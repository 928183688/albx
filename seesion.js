//引入express框架
var express = require('express')
// //引入session
var session = require('express-session')
//创建服务器
var app = express()
//端口监听
app.listen(3002, () => {
    console.log('http://127.0.0.1:3002')
})
//配置session环境
app.use(session({
    // 加盐，你可以指定只有你一个人知道字符串
   secret: 'mywords',
   //重新保存：强制会话保存即使是未修改的。默认为true但是得写上
   resave: false,
    //强制“未初始化”的会话保存到存储。
   saveUninitialized: false,
 }))

 //添加中间件来处理所有的请求的状态保持判断
app.get('/',(req,res) =>{
    //判断需要验证登录的网页和需求  没有登录的话 可以访问index页面  如果没有登录的话 就不允许随便跳转页面 登录后允许访问/admin后缀和登录页
  if(req.session.isLogin && req.session.isLogin == 'true'){
      res.end('welcome')
  }else{
      req.session.isLogin = 'true'
      res.end('first')
  }
})
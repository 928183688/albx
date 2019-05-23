//引入express框架
var express = require('express')
//创建服务器
var app = express()
//引入路由
var router = require('./router')
//引入body-parser
var bodyParser  = require('body-parser')
// //引入session
var session = require('express-session')
//端口监听
app.listen(3000, () => {
    console.log('http://127.0.0.1:3000')
})

//托管静态文件
app.use('/assets',express.static('assets'))

//配置ejs模板引擎
app.set('view engine','ejs')
app.set('views',__dirname + '/views')

//注入body-parser 解析post
app.use(bodyParser.urlencoded({ extended: false }))

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
app.use((req,res,next) =>{
        //判断需要验证登录的网页和需求  没有登录的话 可以访问index页面  如果没有登录的话 就不允许随便跳转页面 登录后允许访问/admin后缀和登录页
      if(req.session.isLogin && req.session.isLogin == 'true' || req.url.indexOf('/admin') || req.url == '/admin/login'){
          next()
      }else{
          //重定向
          res.redirect('/admin/login')
      }
})

//注入路由
app.use(router)

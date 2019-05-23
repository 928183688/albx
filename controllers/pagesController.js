//此控制器是渲染页面的
var querystring = require('querystring')
//请求前台首页
exports.getIndexPage = (req,res) => {
        res.render('index.ejs')  

}

//奇趣事
exports.getDetailPage = (req,res) => {
        res.render('detail.ejs')
}

//会生活
exports.getListPage = (req,res) => {
       res.render('list.ejs')
}



//请求后台首页
exports.getAdminPage = (req,res) => {
     //cookie状态保持
//     var mycookie = querystring.parse(req.headers.cookie,'; ')
//     // console.log(mycookie)
//     if(mycookie.isLogin && mycookie.isLogin == 'true'){
//          res.render('admin/index.ejs')   
//     }else{
//         res.redirect('/admin/login')
//     }
// }

    // session状态保持
     res.render('admin/index.ejs') 
}
//评论
exports.getCommentsPage = (req,res) => {
    res.render('admin/comments.ejs')
}

//分类目录
exports.getCategoriesPage = (req,res) => {
    res.render('admin/categories.ejs')
}

//登录
exports.getLoginPage = (req,res) => {
    res.render('admin/login.ejs')
}

//导航菜单
exports.getNavPage = (req,res) => {
    res.render('admin/nav-menus.ejs')
}

//登录
exports.getPasswordresPage = (req,res) => {
    res.render('admin/password-reset.ejs')
}

//写文章
exports.getPostaddPage = (req,res) => {
    res.render('admin/post-add.ejs')
}

//登出
exports.getPosteditPage = (req,res) => {
    res.render('admin/post-edit.ejs')
}


//所有文章
exports.getPostsPage = (req,res) => {
    res.render('admin/posts.ejs')
}

//个人中心
exports.getProfilePage = (req,res) => {
    res.render('admin/profile.ejs')
}

//网站设置
exports.getSettingsPage = (req,res) => {
    res.render('admin/settings.ejs')
}

//图片轮播
exports.getSlidesPage = (req,res) => {
    res.render('admin/slides.ejs')
}

//用户
exports.getUsersPage = (req,res) => {
    res.render('admin/users.ejs')
}
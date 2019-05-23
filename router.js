//引入express框架
var express = require('express')
//引入路由
var router = express.Router()
//引入渲染页面控制器
var pagesController = require('./controllers/pagesController')
//引入登录控制器
var usersController = require('./controllers/usersController')
//引入分类菜单控制器
var categoriesController = require('./controllers/categoriesController')
//引入文章部分控制器
var postController = require('./controllers/postController')
//引入文章上传文件控制器
var uploadController = require('./controllers/uploadController')
//引入设置页面
var navmenusController = require('./controllers/navmenusController')
//路由指向
//请求前台网页
router.get('/', pagesController.getIndexPage)
      .get('/detail', pagesController.getDetailPage)
      .get('/list', pagesController.getListPage)
      //请求后台网页 /admin
      .get('/admin', pagesController.getAdminPage)
      .get('/admin/comments', pagesController.getCommentsPage)
      .get('/admin/categories', pagesController.getCategoriesPage)
      .get('/admin/login', pagesController.getLoginPage)
      .get('/admin/nav-menus', pagesController.getNavPage)
      .get('/admin/password-reset', pagesController.getPasswordresPage)
      .get('/admin/post-add', pagesController.getPostaddPage)
      .get('/admin/post-edit', pagesController.getPosteditPage)
      .get('/admin/posts', pagesController.getPostsPage)
      .get('/admin/profile', pagesController.getProfilePage)
      .get('/admin/settings', pagesController.getSettingsPage)
      .get('/admin/slides', pagesController.getSlidesPage)
      .get('/admin/users', pagesController.getUsersPage)

      //处理登录业务
      //登录业务
      .post('/login', usersController.login)
      //分类菜单全部的数据
      .get('/getCategoriesAllData', categoriesController.getCategoriesAllData)
      //分类菜单编辑操作
      .post('/editCategories', categoriesController.editCategories)
      //分类菜单添加操作
      .post('/addCategories', categoriesController.addCategories)
      //分类菜单删除操作
      .get('/delCategories', categoriesController.delCategories)
      //分类菜单批量删除
      .post('/alldelCategories', categoriesController.alldelCategories)
      //文章部分业务
      .get('/getAllPostList', postController.getAllPostList)
      //文章根据id编辑
      //  .post('/editPostList',postController.editPostList)
      //文章根据id删除
      .get('/delPostList', postController.delPostList)
      //文章根据id删除批量删除数据
      .post('/delAllPostList', postController.delAllPostList)
      //文章新增上传文件
      .post('/uploadPostList',uploadController.doUpload)
      //文章新增数据
      .post('/addPostList',postController.addPostList)
      //文章根据id查找信息
      .get('/editPostListById',postController.editPostListById)
      //文章编辑数据
      .post('/editPostList',postController.editPostList)
      //设置页
      .post('/addNavMenus',navmenusController.addNavMenus)




//暴露路由
module.exports = router
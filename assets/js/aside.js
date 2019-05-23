$(function(){
   
    var routerName = urlName.getUrlName(location.href)
    //设置侧边栏文章样式
    var menu_posts = $('#menu-posts')
    if(routerName == 'posts' || routerName == 'post-add' || routerName == 'categories'){
      menu_posts.addClass('in').attr('aria-expanded',true)
    }

      //设置侧边栏设置样式
      var menu_settings = $('#menu-settings')
      if(routerName == 'nav-menus' || routerName == 'slides' || routerName == 'settings'){
         menu_settings.addClass('in').attr('aria-expanded',true)
      }
      $('li').removeClass('active')
      $('#' + routerName).addClass('active')
})
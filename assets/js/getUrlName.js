var urlName = {
    getUrlName(urlStr){
    // http://127.0.0.1:3000/admin/profile
    //判断是否有参数拼接 如果有？ 那么就证明有参数拼接
    var index = urlStr.indexOf('?')
    //url变量
    var routerName;
    //如果没有参数拼接 问号前面 不用参数拼接
    if(index == -1){
       //截取url    没参数
       routerName = urlStr.substring(urlStr.lastIndexOf('/') + 1)
    }else{
       ////截取url   有参数
       routerName = urlStr.substring(urlStr.lastIndexOf('/') + 1,index)
    }
     return routerName
    },
    getParname(str){
       var obj = {}
      // ?id=6&name=jack
       str = str.substring(1)
      //id=6&name=jack
      var arr = str.split('&')
      //['id'=6 , name=jack]
      for(var i = 0 ; i < arr.length; i++){
         //['id': 6]
         var temp = arr[0].split('=')
         // {id : 6}
         obj[temp[0]] = temp[1]
      }
      return obj
    }
   }
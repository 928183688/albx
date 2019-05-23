$(function(){
    //上传文件对象
    $('#feature').on('change',function(){
         var formdata = new FormData()
         var fileimg = document.getElementById('feature').files[0]
         formdata.append('img',fileimg)
         $.ajax({
             type: "post",
             url: "/uploadPostList",
             processData : false,
             contentType : false,
             data: formdata,
             dataType: "json",
             success: function (res) {
                if(res.code == 200){
                    $('.thumbnail').fadeIn(500).attr('src','/assets/uploads/' + res.img)
                    $('.photo').val('/assets/uploads/' + res.img)
                }
             }
         });
    })

      //富文本域
      CKEDITOR.replace( 'content' );
    //添加
    $('.btn_save').on('click',function(){
        //    console.log($('form').serialize())
            //解析富文本域的标签
           CKEDITOR.instances.content.updateElement();
         if(id){
             opt('/editPostList')
         }else{
             opt('/addPostList')
         }
    })
    //添加和编辑的公用函数
    function opt(url){
        $.ajax({
            type: "post",
            url: url,
            data: $('form').serialize(),
            dataType: "json",
            success: function (res) {
                console.log(res)
                if(res.code == 200){
                    $('.alert-danger').stop().fadeIn(200).delay(2000).fadeOut(200).text(res.msg)
                    setTimeout(function(){
                        location.href = '/admin/posts'
                    },2200)
                  
                }else{
                    $('.alert-danger').stop().fadeIn(1000).delay(2000).fadeOut(1000).text(res.msg)
                   
                  
                }
            }
        });
    }
    //根据id获取编辑信息
    var id = urlName.getParname(location.search).id
    if(id){
        $.ajax({
            type: "get",
            url: "/editPostListById",
            data: {id},
            dataType: "json",
            success: function (res) {
                // console.log(res)
                var result = res.data
                // console.log(result)
                $('#title').val(result.title)
                $('#content').val(result.content)
                $('#slug').val(result.slug)
                $('.thumbnail').attr('src',result.feature).show()
                $('.photo').val(result.feature)
                $('#category').val(result.category_id)
                $('#created').val(result.created)
                $('#status').val(result.status)
                $('#id').val(result.id)
                $('.btn_save').val('编辑')
                $('.page-title h1').text('编辑')
            }
        });
    }
  
})
    
//渲染多选框
;(function(){
    $.ajax({
        type: "get",
        url: "/getCategoriesAllData",
        dataType: "json",
        success: function (res) {
            // console.log(res)
                var html = ''
                for(var i = 0; i < res.length; i++){
                    html += ` <option value="${res[i].id}">${res[i].name}</option>`
                }
                $('#category').html(html)
            
        }
    });
})();


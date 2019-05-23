//分类页面
$(function () {
    //先让编辑隐藏
    $('.btnEdit').hide()
    //渲染页面
   function init(){
    $.ajax({
        type: "get",
        url: "/getCategoriesAllData",
        dataType: "json",
        success: function (res) {
            var html = template('categoriesTemp', { list: res })
            $('tbody').html(html)
        }
    });
}
      init()

    //编辑操作 事件委托
    $('tbody').on('click', '.btn-eidt', function() {
        //自定义属性加了三个属性
        // console.log(1)
        // console.log($(this).data()['name'])
        var data = $(this).data()
        //给表单元素属性加值
        $('#name').val(data.name)
        $('#slug').val(data.slug)
        $('#id').val(data.id)
        //点击动态编辑 让编辑按钮出现 添加隐藏
        $('.btnEdit').show()
        $('.btnAdd').hide()
        $('h2').text('编辑目录')
    })

    //编辑按钮
    $('.btnEdit').on('click', function() {
        $.ajax({
            type: "post",
            url: "/editCategories",
            data : $('form').serialize(),
            dataType: "json",
            success: function (res) {
                if(res.code == 200){
                 $('.alert-danger').fadeIn(1000).delay(1000).fadeOut(1000).text(res.msg)
                }
                    //编辑完再次渲染页面
                    init()
                    //编辑隐藏 添加出现
                    $('h2').text('添加新目录')
                    $('.btnEdit').hide()
                    $('.btnAdd').show()
                    //清空文本框
                    $('#name').val('')
                    $('#slug').val('')
            }
        });
    })
    //添加按钮
    $('.btnAdd').on('click',function(){
        $.ajax({
            type: "post",
            url: "/addCategories",
            data : $('form').serialize(),
            dataType: "json",
            beforeSend: function(){
                var reg = /^\W{2,16}$/
                if(!reg.test($('#name').val())){
                    $('.alert-danger').fadeIn(1000).delay(1000).fadeOut(1000).text('用户名输入错误')
                   return false
                }
            },  
            success: function (res) {
                if(res.code == 200){
                 $('.alert-danger').fadeIn(1000).delay(1000).fadeOut(1000).text(res.msg)
                }else{
                 $('.alert-danger').fadeIn(1000).delay(1000).fadeOut(1000).text(res.msg)
                }
                    //编辑完再次渲染页面
                    init()
                    //清空文本框
                    $('#name').val('')
                    $('#slug').val('')
            }
        });
    })

  
     //全选和全不选
     $('.btnAll').on('click',function(){
         //获取全选框得状态
         var staut = $(this).prop('checked')
         //让单选框得状态和自己保持一致
         $('.btnone').prop('checked',staut)
         //当单选框大于1得时候 显示出批量删除按钮
         var allbtn = $('.btnone:checked').length
         if(allbtn > 1){
             $('.btndels').fadeIn(500)
         }else{
            $('.btndels').fadeOut(500)
         }
     })

     //动态数据添加点击事件 复选框事件委托
     $('tbody').on('click','.btnone',function(){
        //当单选框大于1得时候 显示出批量删除按钮
         var allbtn = $('.btnone:checked').length
         if(allbtn > 1){
             $('.btndels').fadeIn(500)
         }else{
            $('.btndels').fadeOut(500)
         }
         var cut = $('.btnone').length
         //判断单选框选中得状态和单选框得个数 如果一致 全部勾选 那么全选框也勾选 如果没有全部勾选 那么全选框不勾选
         if(allbtn == cut){
             $('.btnAll').prop('checked',true)
         }else{
            $('.btnAll').prop('checked',false)
         }
     })


     //删除单条数据
     $('tbody').on('click','.btn-del',function(){
          var id = $(this).data().id
        //   console.log(id)
        if(window.confirm('请问是否真的要删除？')){
            $.ajax({
                type: "get",
                url: "/delCategories",
                data: {id},
                dataType: "json",
                success: function (res) {
                    if(res.code == 200){
                        $('.alert-danger').fadeIn(1000).delay(1000).fadeOut(1000).text(res.msg)
                       }
                           //编辑完再次渲染页面
                           init()
                   }
                
            });
        }
        
     })



     //批量删除 删除对应得id
     $('.btndels').on('click',function(){
         var ids = []
         $('.btnone:checked').each((index,item) => {
              ids.push($(item).data().id)
            //    console.log(arr)
         })
         if(window.confirm('请问你需要全部删除吗?')){
            $.ajax({
                type : 'post',
                url : '/alldelCategories',
                data: {ids},
                dataType : 'json',
                success : function(res){
                   if(res.code == 200){
                       $('.alert-danger').fadeIn(1000).delay(1000).fadeOut(1000).text(res.msg)
                       //编辑完再次渲染页面
                       init()
                      }
                          
                }
            })
         }
      
     })

    })

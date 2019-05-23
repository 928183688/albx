$(function(){
    //点击登录
    $('.btn').on('click',() => {
        //获取邮箱value值 得到值
        var email = $('#email').val()
        //获取密码value值 得到值
        var password = $('#password').val()
        //发起ajax
        $.ajax({
            type : 'post',
            url : '/login',
            data : {
                email,
                password
            },
            dataType : 'json',
            success : (res) => {
                if(res.code == 201){
                    $('.alert-danger').show().text(res.msg)
                }else{
                    location.href = '/admin'
                }
            }
        })
    })

    //使用回车按钮实现登录
    $('#email,#password').on('keydown',function(e){
        if(e.keyCode == 13){
            $('.btn').trigger('click');
        }
    })
})



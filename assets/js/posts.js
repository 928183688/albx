$(function(){
    //从第一个开始
    var pageNum = 1
    //一页有三个文章
    var pageSize = 4
    function initData(query={}){
        $.ajax({
            type: "get",
            url: "/getAllPostList",
            data : {
                pageNum,
                pageSize,
                //ES6新语法...可以加对象
                ...query
            },
            dataType: "json",
            success: function (res) {
                if(res.code == 200){
            //    console.log(res)
                //修改时间
                var time = res.data.data
                for(let i = 0; i < time.length ;i++){
                      time[i].created = moment(time[i].created).format('YYYY-MM-DD HH:mm:ss')
                }
                var html = template('postListTemp',res.data)
                $('tbody').html(html)
                if(res.data.total == 0 ){
                    res.data.total  = 1
                }
                setPage(Math.ceil(res.data.total/pageSize))
                }
             
            }
        })
    }
    initData()
    
        
        //分页器插件配置
        function setPage(total) {
            $(".pagination").bootstrapPaginator({
                //设置版本号
                bootstrapMajorVersion: 3,
                // 显示第几页
                currentPage: pageNum,
                // 总页数
                totalPages: total,
                //当单击操作按钮的时候, 执行该函数, 调用ajax渲染页面
                onPageClicked: function (event,originalEvent,type,page) {
                    // 把当前点击的页码赋值给currentPage, 调用ajax,渲染页面
                    pageNum = page
                    initData()
                }
            })
        }
  

//筛选
$('.btn-search').on('click',function(){
    var query = {}
    var cate = $('.searchCateList').val()
    var statusList = $('.statusList').val()
    // console.log(cate,statusList)
        query['category_id'] = cate
        query['status'] = statusList
    // console.log(query)
    initData(query)
})


//根据id单条删除
$('tbody').on('click','.btn-del',function(){
        //获取自定义ID
        var id = $(this).data().id
       if(window.confirm('请问真的需要删除吗')){
        $.ajax({
            type: "get",
            url: "/delPostList",
            data: {id},
            dataType: "json",
            success: function (res) {
                 if(res.code == 200){
                     $('.alert-danger').stop().fadeIn(1000).delay(2000).fadeOut(1000).text(res.msg)
                     initData()
                 }else{
                     $('.alert-danger').stop().fadeIn(1000).delay(2000).fadeOut(1000).text(res.msg)
                   
                 }
            }
        });
       }    
    
})

//全选和全不选
$('.chk').on('click',function(){
    //全选状态保持一致
   var staut =  $(this).prop('checked')
   //单选状态保持一致
   $('.btnone').prop('checked',staut)
   //如果单选选中大于1 那么就显示批量删除
   var allchk = $('.btnone:checked').length
   if(allchk > 1){
       $('.btn-alldel').fadeIn(1000)
   }else{
       $('.btn-alldel').fadeOut(1000)
   }
})

//单选超过1个 出现批量删除
$('tbody').on('click','.btnone',function(){
   //如果单选选中大于1 那么就显示批量删除
   var allchk = $('.btnone:checked').length
   if(allchk > 1){
       $('.btn-alldel').fadeIn(1000)
   }else{
       $('.btn-alldel').fadeOut(1000)
   }
   //被选中的长度 和 选中的长度 一致 就全选
   var cut = $('.btnone').length
   if(allchk == cut){
       $('.chk').prop('checked',true)
   }else{
       $('.chk').prop('checked',false)
   }
})

//批量删除
$('.btn-alldel').on('click',function(){
        var ids = []
        $('.btnone').each((index,item) => {
            ids.push($(item).data().id)
        })
        // console.log(ids)
        // 发起ajax
        if(window.confirm('请问你真的要删除吗')){
            $.ajax({
                type: "post",
                url: "/delAllPostList",
                data: {ids},
                dataType: "json",
                success: function (res) {
                    if(res.code == 200){
                        $('.alert-danger').stop().fadeIn(1000).delay(2000).fadeOut(1000).text(res.msg)
                        initData()
                    }else{
                        $('.alert-danger').stop().fadeIn(1000).delay(2000).fadeOut(1000).text(res.msg)
                      
                    }
                }
            });
        }
       
})
});


//渲染多选框
;(function(){
    $.ajax({
        type: "get",
        url: "/getCategoriesAllData",
        dataType: "json",
        success: function (res) {
            // console.log(res)
                var html = ' <option value="all">所有状态</option>'
                for(var i = 0; i < res.length; i++){
                    html += ` <option value="${res[i].id}">${res[i].name}</option>`
                }
                $('.searchCateList').html(html)
            
        }
    });
})();
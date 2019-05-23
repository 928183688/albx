var formidable = require('formidable')
var path = require('path')
//上传图片
exports.doUpload = (req,res) => {
    //创建对象
    var form = new formidable.IncomingForm()
    //文件路径
    form.uploadDir = __dirname + '/../assets/uploads'
    // console.log(form.uploadDir)
    //是否需要文件扩展名
    form.keepExtensions = true
    //使用方法
    form.parse(req,(err,fildes,files) => {
           if(err){
               res.json({
                   code:201,
                   msg:'上传图片失败'
               })
           }else{
            var filename = path.basename(files.img.path)
            res.json({
                code:200,
                msg:'上传图片成功',
                img : filename
            })
           }
    })
}
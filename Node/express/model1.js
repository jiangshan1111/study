var express = require('express')
var app = express()
var bodyParser = require('body-parser') 
var fs = require('fs');
//文件上传
var multer = require('multer')

//post请求需要使用 创建application/x-www-form-urlencoded编码解析
// var urlencodedParser = bodyParser.urlencoded({extended:false})

//使用静态资源
app.use(express.static('public'))
//post请求需要使用 创建application/x-www-form-urlencoded编码解析
app.use(bodyParser.urlencoded({extended:false}))
app.use(multer({dest:'/tmp/'}).array('image'))

app.get('/', function (req, res) {
  res.sendFile(__dirname+'/model.html')
})
app.get('/32', function (req, res) {
  res.sendFile(__dirname+'/model1.html')
})

//文件上传
app.get('/file', function (req, res) {
  res.sendFile(__dirname+'/file.html')
})

//get请求
app.get('/get_methods', function (req, res) {
  var response = {
    name:req.query.name,
    pwd:req.query.pwd,
  }
  res.end(JSON.stringify(response))
})

//post请求
// app.post('/post_methods', urlencodedParser,function (req, res) {
app.post('/post_methods', function (req, res) {
  var response = {
    name:req.body.name,
    pwd:req.body.pwd,
  }
  res.end(JSON.stringify(response))
})

//文件上传
app.post('/file_upload',function (req, res) {
  console.log(req.files[0]);  // 上传的文件信息
 
  var des_file = __dirname + "/" + req.files[0].originalname;
  fs.readFile( req.files[0].path, function (err, data) {
       fs.writeFile(des_file, data, function (err) {
        if( err ){
             console.log( err );
        }else{
              response = {
                  message:'File uploaded successfully', 
                  filename:req.files[0].originalname
             };
         }
         console.log( response );
         res.end( JSON.stringify( response ) );
      });
  });
})



var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port

  console.log("success",host,port)
})
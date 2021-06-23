const express = require('express');
const app = express();
const routes = require('./router/index.js');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongo = require('mongodb').MongoClient;
const fs = require('fs')
const cors = require("cors");
//文件上传
var multer = require('multer')
var options = {
  server: {
    auto_reconnect: true,
    poolSize: 10,
  },
};
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());
var storage = multer.diskStorage({

  //指定文件上传到服务器的路径
    // destination: function (req, file, cb) {
    //   cb(null, process.cwd()+'/public')
    // },
  
  //指定上传到服务器文件的名称
    // filename: function (req, file, cb) {
    //   cb(null, file.fieldname + '-' + Date.now())
    // }
})
var upload = multer({ storage: storage })
var cpUpload = upload.fields([{ name: 'file', maxCount: 1 }, { name: 'file', maxCount: 8 }])


app.use('/public', express.static(process.cwd() + '/public'));

app.all("/*", function (req, res, next) {
  // 跨域处理
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1');
  // res.header("Content-Type", "*");
  next(); // 执行下一个路由
})
// const allowedOrigins = ["http://localhost:8081","http://localhost:8080"];

//     app.use(
//         cors({
//             origin: function(origin, callback) {
//                 if (!origin) return callback(null, true);
//                 if (allowedOrigins.indexOf(origin) === -1) {
//                     var msg =
//                         "The CORS policy for this site does not " +
//                         "allow access from the specified Origin.";
//                     return callback(new Error(msg), false);
//                 }
//                 return callback(null, true);
//             }
//         })
//     ); 

mongo.connect('mongodb://localhost:27017/foods', options, function (err, db) {
  if (err) {
    throw new Error('Database failed to connect!');
  } else {
    console.log('MongoDB successfully');
  }
  routes(app, db,cpUpload);
  app.listen(8080, function () {
    console.log('success!');
  });
});

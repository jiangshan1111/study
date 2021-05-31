// express_cookie.js 文件
var express = require('express')
var cookieParser = require('cookie-parser')
var util = require('util');
 
var app = express()
app.use(cookieParser())
 
app.get('/', function (req, res) {
  res.cookie('jiangshan', 'jiangshan', { maxAge: 60*1000*10 })
  res.end("Cookies: " + util.inspect(req.cookies))
})
 
app.listen(8081)
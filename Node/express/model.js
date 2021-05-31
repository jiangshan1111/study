var express = require('express')
var app = express()

app.get('/', function (req, res) {
  res.send('我是主页get请求')
})
app.post('/', function (req, res) {
  res.send('我是主页post请求')
})
app.get('/user', function (req, res) {
  res.send('我是个人中心get请求')
})
app.get('/ab*cd', function (req, res) {
  res.send('正则匹配')
})

var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port

  console.log("success",host,port)
})
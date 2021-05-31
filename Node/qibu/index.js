const http = require('http'); //引入模块

http.createServer(function (request, response) {
  response.writeHead(200, {
    'Content-Type': 'text/plain' //无格式文件
  }); //发送头部

  response.end('jiangshan'); //最后发送的值
}) //创建服务
  .listen('1234');//监听
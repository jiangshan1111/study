var http = require('http');
var url = require('url');
var fs = require('fs');
var util = require('util')

var host = '127.0.0.1';
var port = '8888'

http.createServer(function (req, res) {
  var pathname = url.parse(req.url).pathname
  console.log(pathname)
  function showPager (path, status) {
    var content = fs.readFileSync(path);
    res.writeHead(status, { 'Content-type': 'text/html;charset=utf-8' })
    res.write(content)
    res.end()
  }
  switch (pathname) {
    case '/index':
      showPager('./index.html', 200)
      break;
    case '/about':
      showPager('./about.html', 200)
      break;
    default:
      showPager('./404.html', 200)
      break;
  }
}).listen(port, host)
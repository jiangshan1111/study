const fs = require('fs');//文件模块
fs.readFile('../input.txt', function (err, data) {
  if (err) {
    console.log(err.stack);
    return
  }
  console.log(err.toString());
});
console.log('结束')
const fs = require('fs');
var data = '写入xxxx';
const writeStream = fs.createWriteStream('input1.txt');
writeStream.write(data, 'utf8')
writeStream.end()
writeStream.on('finish', function () {
  console.log('写入完成！')
})
writeStream.on('error', function (err) {
  console.log(err.stack)
})
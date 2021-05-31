
const fs = require('fs');
const zlib = require('zlib');//压缩
fs.createReadStream('input.txt.gz')
  .pipe(zlib.createGunzip())
  .pipe(fs.createWriteStream('input23.txt'))
console.log('完成')
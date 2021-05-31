const fs = require('fs');

// var data = fs.readFileSync('input.txt'); //阻塞
// console.log(data.toString())
// console.log('end')

fs.readFile('input.txt', function (err, data) {
  if (err) return console.log(err);
  console.log(data)
  console.log(data.toString())
}) //非阻塞
console.log('end')
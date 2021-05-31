const events = require('events'); //引入events模块
const eventEmitter = new events.EventEmitter(); //创建实例化对象
const connectHandler = function () {
  console.log('连接成功！')
  eventEmitter.emit('data_received'); //触发
}
eventEmitter.on('connection', connectHandler); //创建事件
eventEmitter.on('data_received', function () {
  console.log('数据接收成功！');
}); //创建事件
eventEmitter.emit('connection')//触发
console.log('程序结束');
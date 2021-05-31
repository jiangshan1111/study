一、nodejs的基础知识
  node.js是一个javascript运行环境，简单得说就是运行在服务端的javascript

  1.运行原理
    不仅仅在实现一个应用，同时还实现了整个HTTP服务器

  2.创建应用
    2.1 引入required模块
      const http = require('http'); //引入模块

      //文件
      const fs = require('fs');
      var data = fs.readFileSync('input.txt');
      console.log(data.toString())  //读取到对应内容

    2.2 创建服务器
    2.3 接受请求与响应请求
      http.createServer(function (request, response) {
        response.writeHead(200, {
          'Content-Type': 'text/plain' //无格式文件
        }); //发送头部

        response.end('jiangshan'); //最后发送的值
      }) //创建服务
        .listen('1234');//监听

  3.REPL
    表示的是电脑的环境
    自带了交互式解释器
    读取（read） - 读取用户输入
    执行（eval） - 执行输入的数据结构
    打印（print） - 输出结果
    循环（loop） - 循环操作以上步骤直到用户两次按下ctrl-c退出

      输入 node 进入node操作环境
      3.1 简单的表达式运算
        1+1

      3.2 使用变量
        用 var 声明
        var x=4

      3.3 多行表达式
        for(){ 来打开一个多行编辑器
        }来结束 
        和正常写代码一样 {开始多行 }来结束 

      3.4 下划线（_）变量
        _变量可以把表达式的值赋值到当前变量
        var x = 5
        var y = 10
        x+y //15
        var sum = _ //15

  4.nodeJs 回调函数
    Node的所有API都支持回调函数
    I/O 输入输出

    //读取文件
    //非阻塞 （不需要按顺序）
    fs.readFile('input.txt', function (err, data) {
      if (err) return console.log(err);
      console.log(data.toString())
    }) 
    console.log('end')

    
    //阻塞（按顺序）
    // var data = fs.readFileSync('input.txt'); //阻塞
    // console.log(data.toString())
    // console.log('end')

  5.事件循环
    5.1 循环机制
      是单线程单进程的，通过事件和回调支持并发，性能很高
      所有的事件机制都是用观察者模式实现
      每个异步事件都生成一个事件观察者，如果有事件发生就调用该回调


    5.2 事件驱动程序、
      当webServer接收到请求，就把它关闭然后进行处理，然后去服务下一个web请求
      当这个请求完成，她就被放回处理队列，当到达队列开头，这个结果被返回给用户。

    5.3 简单范例

      const events = require('events'); //引入events模块
      const eventEmitter = new events.EventEmitter(); //创建实例化对象
      const connectHandler = function connected () {
        console.log('连接成功！')
        eventEmitter.emit('data_received'); //触发
      }
      eventEmitter.on('connection', connectHandler); //创建事件
      eventEmitter.on('data_received', function () {
        console.log('数据接收成功！');
      }); //创建事件
      eventEmitter.emit('connection')//触发
      console.log('程序结束');

    5.4 node应用程序是如何工作的
      执行异步操作的函数将回调函数作为最后一个参数，回调函数接收错误对象作为第一个参数。
      
  6.EventEmitter
    6.1 EventEmitter类
      nodeJs所有的异步操作在完成时都会发送一个事件到事件队列。
      nodeJs里面的所有对象都会分发事件：一个net.server对象会在每次有新连接
      时分发一个事件，一个fs.readStream对象会在文件被打开的时候发出一个事件。
      所有这些产生事件的对象都是events.EventEmitter的实例。

      events模块只提供了一个对象：events.EventEmitter
      EventEmitter的核心就是事件触发与事件监听器的封装。
      EventEmitter对象如果在实例化时发生错误，会触发error事件。
      当添加新的监听器时，newListener事件会触发，当监听器被移除时，
      removeListener事件被触发。

      EventEmitter支持多个事件监听器
      eventEmitter.on('data_received', function (a1,a2) {
        console.log('数据接收成功！',a1,a2);
      }); //创建事件
      eventEmitter.on('data_received', function (a1,a2) {
        console.log('数据接收成功23！',a1,a2);
      }); //创建事件1
      eventEmitter.emit('data_received','aa1','aa2')//触发
      //数据接收成功！ aa1 aa2
      //数据接收成功23！ aa1 aa2


    6.2 EventEmitter常用方法
      addListener 添加一个方法到监听器数组的尾部
      on
      once 单词监听器 只会触发一次 然后立即解除
      removeListener
      removeAllListener
      setMaxListeners 如果超过10个会报错 用于提高监听器的数量
      emit 
      listeners 返回指定事件的监听器数组

      //类方法
      listenerCount()
        const eventListeners = require('events').EventEmitter.listenerCount(eventEmitter,监听器名字);
        console.log(eventListeners)
        eventEmitter.emit(监听器名字)

    6.3 error事件
      一般要为会触发error事件的对象设置监听器，避免遇到错误后整个程序崩溃

    6.4 继承 EventEmitter
      只要时支持事件响应的核心模块都是继承EventEmitter的子类
      如fs,net,http

  7.Stream
    是一个抽象接口，很多对象实现了这个接口，例如http发起请求的request

    所有的Stream对象都是EventEmitter的实例；
    常用事件：
      data 当有数据可读时触发
      end 没有更多的数据可读时触发
      error 在接收和写入过程中发生错误时触发
      finish 所有数据已被写入到底层系统时触发

    四种流类型
      readable 可读
      writable 可写
      Duplex 可读可写
      transform 操作被写入数据，然后读出结果

    从流中读取数据 （createReadStream）
      const fs = require('fs');
      var data = '';
      const readStream = fs.createReadStream('input.txt');
      // readStream.setEncoding('UTF8'); //转成中文
      readStream.on('data', function (chunk) {
        data += chunk.toString() //转成中文
      });
      readStream.on('end', function () {
        console.log(data)
      });
      readStream.on('error', function (err) {
        console.log(err.stack)
      });

    写入流（createWriteStream）
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

    管道流（pipe）
      提供了一个输出流到输入流的机制。通常我们用于从一个流中获取数据并将数据
      传递到另外一个流中。
      const fs = require('fs')
      const readStream = fs.createReadStream('input.txt');
      const writeStream = fs.createWriteStream('output.txt');
      readStream.pipe(writeStream)
      console.log('完成')


    链式流
      通过连接输出流到另外一个流并创建多个流操作链的机制。链式流一般用于管道操作
      压缩和解压
      //压缩
      const fs = require('fs');
      const zlib = require('zlib');//压缩
      fs.createReadStream('input.txt')
        .pipe(zlib.createGzip())
        .pipe(fs.createWriteStream('input.txt.gz'))
      console.log('完成')

      //解压
      const fs = require('fs');
      const zlib = require('zlib');//压缩
      fs.createReadStream('input.txt.gz')
        .pipe(zlib.createGunzip())
        .pipe(fs.createWriteStream('input23.txt'))
      console.log('完成')

  8.Buffer
    8.1 创建Buffer类
      该类专门用来创建一个存放二进制数据的缓存区
      一个Buffer类似于一个整数数组，但他对应于V8堆内存之外的一块原始内存
      var bur = new Buffer.alloc(10) //创建长度为10字节且用0填充的Buffer实例
      var bur = new Buffer.alloc(10,1) //创建长度为10字节且用0X1填充的Buffer实例
      var bur = new Buffer.allocUnsafe(10); //创建长度为10字节且未初始化的的Buffer实例
      var bur = new Buffer.from([10,20,30,40,50]) //通过给定的数组创建Buffer实例
      var bur = new Buffer.from('www.xxx.com','utf-8') //通过一个字符串创建Buffer实例,默认是utf-8


    8.2 写入缓冲区
      bur.write(string[,offset[,length]][,encoding])

      string  - 写入缓冲区的字符串
      offset  - 缓冲区开始写入的索引值，默认为0
      length  - 写入的字节数，默认为 buffer.length
      encoding - 使用的编码。默认为utf-8

      返回值
      返回实际写入的大小.如果buffer空间不足，则只会写入部分字符串

      var buf = new Buffer.from('www.xxx.com', 'utf-8')
      len = buf.write('hello,123')
      console.log(len);  //8

    8.3 从缓冲区读取数据
      buf.toString([encoding[, start[, end]]])
      encoding - 使用的编码。默认为 'utf8' 。
      start - 指定开始读取的索引位置，默认为 0。
      end - 结束位置，默认为缓冲区的末尾。

      返回值
      解码缓冲区数据并使用指定的编码返回字符串。

      var buf = new Buffer.from('www.xxx.com', 'utf-8') 
      console.log(buf.toString(undefined, 0, 5));  //www.x

    8.4 将Buffer转换为JSON对
      buf.toJSON()
      JSON.stringify() 会隐式地调用该 toJSON()

      返回值
      返回 JSON 对象。

      const buf = Buffer.from([0x1, 0x2, 0x3, 0x4, 0x5]);
      const json = JSON.stringify(buf);

      // 输出: {"type":"Buffer","data":[1,2,3,4,5]}
      console.log(json);

      const copy = JSON.parse(json, (key, value) => {
        return value && value.type === 'Buffer' ?
          Buffer.from(value.data) :
          value;
      });

      // 输出: <Buffer 01 02 03 04 05>
      console.log(copy);

    8.5 缓冲区合并
      Buffer.concat(list[, totalLength])

      list - 用于合并的 Buffer 对象数组列表。
      totalLength - 指定合并后Buffer对象的总长度。

      返回值
      返回一个多个成员合并的新 Buffer 对象。
    
      var buffer1 = Buffer.from(('菜鸟教程'));
      var buffer2 = Buffer.from(('www.runoob.com'));
      var buffer3 = Buffer.concat([buffer1,buffer2]);
      console.log("buffer3 内容: " + buffer3.toString());//buffer3 内容: 菜鸟教程www.runoob.com


    8.6 缓冲区比较
      就像遍历整个长的数组，比较第i个元素的大小，一但发现一个大的或者小的，则退出循环，得出结论。
      buf.compare(otherBuffer);

      otherBuffer - 与 buf 对象比较的另外一个 Buffer 对象。

      返回值
      返回一个数字，表示 buf 在 otherBuffer 之前，之后或相同。


      var buffer1 = Buffer.from('ABC');
      var buffer2 = Buffer.from('ABCD');
      var result = buffer1.compare(buffer2);

      if(result < 0) {
        console.log(buffer1 + " 在 " + buffer2 + "之前");
      }else if(result == 0){
        console.log(buffer1 + " 与 " + buffer2 + "相同");
      }else {
        console.log(buffer1 + " 在 " + buffer2 + "之后");
      }
      //ABC在ABCD之前

    8.7 拷贝缓冲区
      buf.copy(targetBuffer[, targetStart[, sourceStart[, sourceEnd]]])

      targetBuffer - 要拷贝的 Buffer 对象。
      targetStart - 数字, 可选, 默认: 0
      sourceStart - 数字, 可选, 默认: 0
      sourceEnd - 数字, 可选, 默认: buffer.length
      
      返回值
      没有返回值。

      var buf1 = Buffer.from('abcdefghijkl');
      var buf2 = Buffer.from('RUNOOB');

      //将 buf2 插入到 buf1 指定位置上
      buf2.copy(buf1, 2);

      console.log(buf1.toString()); // abRUNOOBijkl

    8.8 缓冲区裁剪
      buf.slice([start[, end]])

      start - 数字, 可选, 默认: 0
      end - 数字, 可选, 默认: buffer.length

      返回值
      返回一个新的缓冲区，它和旧缓冲区指向同一块内存，但是从索引 start 到 end 的位置剪切。

    8.9 缓冲区长度
      buf.length;

    8.10 方法参考手册
      https://www.runoob.com/nodejs/nodejs-buffer.html
    










二、express
  express是一个简洁而灵活的nodejs web应用框架，提供一系列强大特性帮助你创建各种web应用
  

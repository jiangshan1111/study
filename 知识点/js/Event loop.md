js事件循环机制(Event Loop)
  javascript从诞生之日起就是一门  单线程的  非阻塞的  脚本语言，单线程意味着，javascript代码在执行的任何时候，都只有一个主线程来处理所有的任务，非阻塞靠的就是 event loop（事件循环），本文就讲解下事件循环。

event loop它最主要是分三部分：主线程、宏队列（macrotask）、微队列（microtask）
  js的任务队列分为同步任务和异步任务，所有的同步任务都是在主线程里执行的，异步任务可能会在macrotask或者microtask里面

  主线程
    就是访问到的script标签里面包含的内容，或者是直接访问某一个js文件的时候，里面的可以在当前作用域直接执行的所有内容（执行的方法，new出来的对象等）

  宏队列（macrotask）
    setTimeout、setInterval、setImmediate、I/O、UI rendering

  微队列（microtask）
    promise.then、process.nextTick

执行顺序
  1、先执行主线程

  2、遇到宏队列（macrotask）放到宏队列（macrotask）

  3、遇到微队列（microtask）放到微队列（microtask）

  4、主线程执行完毕

  5、执行微队列（microtask），微队列（microtask）执行完毕

  6、执行一次宏队列（macrotask）中的一个任务，执行完毕

  7、执行微队列（microtask），执行完毕

  8、依次循环。。。

    console.log(1)
    process.nextTick(() => {
      console.log(8)
      setTimeout(() => {
        console.log(9)
      })
    })
    setTimeout(() => {
      console.log(2)
      new Promise(() => {
        console.log(11)
      })
    })
    requestIdleCallback(() => {
      console.log(7)
    })
    // 特殊说明： new Promise（）属于主线程任务
    let promise = new Promise((resolve,reject) => {
      setTimeout(() => {
        console.log(10)
      })
      resolve()
      // 这个console也属于主线程任务
      console.log(4)
    })
    fn()
    console.log(3)
    promise.then(() => {
      console.log(12)
    })
    function fn(){
      console.log(6)
    } 

    结果是1、4、6、3、12、8、2、11、10、9、7

      这个写法可以囊括80%以上的event loop循环机制的场景了，下面开始梳理具体的运行机制。

      js是从上到下执行的，所以上来先打印的是 1 ，继续往下走；

      遇见了process.nextTick,因为它属于微队列（microtask），并且当前主线程的代码还没有执行完毕，所以它被展示扔到了微队列里，暂时不打印；

      这个时候又遇到了setTimeout，setTimeout是属于宏队列（macrotask）；

      requestIdleCallback，这里也是不立即执行的，它也不属于任何队列，这里不做详细解释；

      promise在实例化的时候，这里的setTimeout继续被丢到了宏队列（macrotask）中，并执行了成功的方法，在有promise.then的调用的时候就会去出发，但这里不做打印，接着发现了console，这里直接打印 4 ）；

      fn函数直接调用，直接打印 6 ；

      console，直接打印 3 ；

      promise.then因为它属于微队列，但是它在promise实例化的时候被调用了，所以它会在微队列的最前面执行；

      到这里主线程里面就没有任何可以执行到东西了，下面开始走微队列（microtask）：

      由于promise.then被提前调用了，所以它会先执行，打印 12 ；

      微队列（microtask）里面还有一个，就是上面的process.nextTick，执行它，打印 8 ，这个时候发现它有一个setTimeout，放到宏队列（macrotask）；

      到这里微队列就走完了，下面开始走宏队列（macrotask）：

      最外面的setTimeout在一开始的时候被放了进去，所以先执行它，打印 2 ，发现它里面有promise被实例化，直接执行，打印 11 ；

      下一个要走的就是promise里面的setTimeout，打印 10 ；

      还剩最后一个setTimeout，就是process.nextTick里面的，打印 9 ；

      到这里主线程、宏队列（macrotask）、微队列（microtask）就全都跑完了，在全部跑完的时候，requestIdleCallback才会执行，打印 7 ；

      requesIdleCallback会在当前浏览器空闲时期去依次执行，在整个过程当中你可能添加了多个requestIdleCallback，但是都不会执行，只会在空闲时期，去依次根据调用的顺序就执行。

    console.log(1)
    setTimeout(() => {
      console.log(6)
      new Promise(() => {
        console.log(7)
      });
      promise.then(() => {
        console.log(8)
      });
      setTimeout(() => {console.log(12)})
    })
    requestIdleCallback(() => {
      console.log(11)
    })
    // 特殊说明： new Promise（）属于主线程任务
    let promise = new Promise((resolve,reject) => {
      setTimeout(() => {
        console.log(9);
        promise.then(() => {
          console.log(10)}
        )
      })
      resolve()
      // 这个console也属于主线程任务
      console.log(2)
    })
    fn()
    console.log(4)
    promise.then(() => {
      console.log(5)
    })
    function fn(){
      console.log(3)
    } 

    //1,2,3,4,5,6,7,8,9,10,11,12

    //先执行主队列 再执行微队列（执行里面的主队列，微队列，有宏队列push到最后）  再执行宏队列（先执行里面的主队列，微队列，把宏队列push到最后 按这个顺序执行下一个宏队列） 
面试的时候经常会问到Promise的使用；有的面试官再深入一点，会继续问是否了解Promise的实现方式，或者有没有阅读过Promise的源码；今天我们就来看一下，Promise在内部是如何实现来链式调用的。

什么是Promise
所谓Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。从语法上说，Promise 是一个对象，从它可以获取异步操作的消息。Promise提供统一的API，各种异步操作都可以用同样的方法进行处理。

Promise出现之前都是通过回调函数来实现，回调函数本身没有问题，但是嵌套层级过深，很容易掉进回调地狱。

const fs = require('fs');
fs.readFile('1.txt', (err,data) => {
    fs.readFile('2.txt', (err,data) => {
        fs.readFile('3.txt', (err,data) => {
            //可能还有后续代码
        });
    });
});
如果每次读取文件后还要进行逻辑的判断或者异常的处理，那么整个回调函数就会非常复杂且难以维护。Promise的出现正是为了解决这个痛点，我们可以把上面的回调嵌套用Promise改写一下：

const readFile = function(fileName){
    return new Promise((resolve, reject)=>{
        fs.readFile(fileName, (err, data)=>{
            if(err){
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

readFile('1.txt')
    .then(data => {
        return readFile('2.txt');
    }).then(data => {
        return readFile('3.txt');
    }).then(data => {
        //...
    });
Promise规范
promise最早是在commonjs社区提出来的，当时提出了很多规范。比较接受的是promise/A规范。但是promise/A规范比较简单，后来人们在这个基础上，提出了promise/A+规范，也就是实际上的业内推行的规范；es6也是采用的这种规范，但是es6在此规范上还加入了Promise.all、Promise.race、Promise.catch、Promise.resolve、Promise.reject等方法。

我们可以通过脚本来测试我们写的Promise是否符合promise/A+的规范。将我们实现的Promise加入以下代码：

Promise.defer = Promise.deferred = function () {
    let dfd = {};
    dfd.promise = new Promise((resolve, reject) => {
        dfd.resolve = resolve;
        dfd.reject = reject;
    });
    return dfd;
}
然后通过module.exports导出，安装测试的脚本：

npm install -g promises-aplus-tests
在实现Promise的目录执行以下命令：

promises-aplus-tests promise.js
接下来，脚本会对照着promise/A+的规范，对我们的脚本来一条一条地进行测试。

Promise基本结构
我们先回顾一下，我们平时都是怎么使用Promise的：

var p = new Promise(function(resolve, reject){
    console.log('执行')
    setTimeout(function(){
        resolve(2)
    }, 1000)
})
p.then(function(res){
    console.log('suc',res)
},function(err){
    console.log('err',err)
})
首先看出来，Promise是通过构造函数实例化一个对象，然后通过实例对象上的then方法，来处理异步返回的结果。同时，promise/A+规范规定了：

promise 是一个拥有 then 方法的对象或函数，其行为符合本规范；
一个 Promise 的当前状态必须为以下三种状态中的一种：等待态（Pending）、执行态（Fulfilled）和拒绝态（Rejected）。
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

function Promise(executor) {
    var _this = this
    this.state = PENDING; //状态
    this.value = undefined; //成功结果
    this.reason = undefined; //失败原因
    function resolve(value) {}
    function reject(reason) {}
}

Promise.prototype.then = function (onFulfilled, onRejected) {
};

module.exports = Promise;
当我们实例化Promise时，构造函数会马上调用传入的执行函数executor，我们可以试一下：

let p = new Promise((resolve, reject) => {
    console.log('执行了');
});
因此在Promise中构造函数立马执行，同时将resolve函数和reject函数作为参数传入：

function Promise(executor) {
    var _this = this
    this.state = PENDING; //状态
    this.value = undefined; //成功结果
    this.reason = undefined; //失败原因
    function resolve(value) {}
    function reject(reason) {}
    executor(resolve, reject)
}
但是executor也会可能存在异常，因此通过try/catch来捕获一下异常情况：

try {
    executor(resolve, reject);
} catch (e) {
    reject(e);
}
不可变
promise/A+规范中规定，当Promise对象已经由等待态（Pending）改变为执行态（Fulfilled）或者拒绝态（Rejected）后，就不能再次更改状态，且终值也不可改变。






因此我们在回调函数resolve和reject中判断，只能是pending状态的时候才能更改状态：

function resolve(value) {
    if(_this.state === PENDING){
        _this.state = FULFILLED
        _this.value = value
    }
}
function reject(reason) {
    if(_this.state === PENDING){
        _this.state = REJECTED
        _this.reason = reason
    }
}
我们更改状态的同时，将回调函数中成功的结果或者失败的原因都保存在对应的属性中，方便以后来获取。

then实现
当Promise的状态改变之后，不管成功还是失败，都会触发then回调函数。因此，then的实现也很简单，就是根据状态的不同，来调用不同处理终值的函数。

Promise.prototype.then = function (onFulfilled, onRejected) {
    if(this.state === FULFILLED){
        typeof onFulfilled === 'function' && onFulfilled(this.value)
    }
    if(this.state === REJECTED){
        typeof onRejected === 'function' && onRejected(this.reason)
    }
};
在规范中也说了，onFulfilled和onRejected是可选的，因此我们对两个值进行一下类型的判断：

onFulfilled 和 onRejected 都是可选参数。如果 onFulfilled 不是函数，其必须被忽略。如果 onRejected 不是函数，其必须被忽略
代码写到这里，貌似该有的实现方式都有了，我们来写个demo测试一下：

var myP = new Promise(function(resolve, reject){
    console.log('执行')
    setTimeout(function(){
        reject(3)
    }, 1000)
});

myP.then(function(res){
    console.log(res)
},function(err){
    console.log(err)
});
然鹅，很遗憾，运行起来我们发现只打印了构造函数中的执行，下面的then函数根本都没有执行。我们整理一下代码的运行流畅：






当then里面函数运行时，resolve由于是异步执行的，还没有来得及修改state，此时还是PENDING状态；因此我们需要对异步的情况做一下处理。

支持异步
那么如何让我们的Promise来支持异步呢？我们可以参考发布订阅模式，在执行then方法的时候，如果当前还是PENDING状态，就把回调函数寄存到一个数组中，当状态发生改变时，去数组中取出回调函数；因此我们先在Promise中定义一下变量：

function Promise(executor) {
    this.onFulfilled = [];//成功的回调
    this.onRejected = []; //失败的回调
}
这样，当then执行时，如果还是PENDING状态，我们不是马上去执行回调函数，而是将其存储起来：

Promise.prototype.then = function (onFulfilled, onRejected) {
    if(this.state === FULFILLED){
        typeof onFulfilled === 'function' && onFulfilled(this.value)
    }
    if(this.state === REJECTED){
        typeof onRejected === 'function' && onRejected(this.reason)
    }
    if(this.state === PENDING){
        typeof onFulfilled === 'function' && this.onFulfilled.push(onFulfilled)
        typeof onRejected === 'function' && this.onRejected.push(onRejected)
    }
};
存储起来后，当resolve或者reject异步执行的时候就可以来调用了：

function resolve(value) {
    if(_this.state === PENDING){
        _this.state = FULFILLED
        _this.value = value
        _this.onFulfilled.forEach(fn => fn(value))
    }
}
function reject(reason) {
    if(_this.state === PENDING){
        _this.state = REJECTED
        _this.reason = reason
        _this.onRejected.forEach(fn => fn(reason))
    }
}
有童鞋可能会提出疑问了，为什么这边onFulfilled和onRejected要存在数组中，直接用一个变量接收不是也可以么？下面看一个例子：

var p = new Promise((resolve, reject)=>{
    setTimeout(()=>{
        resolve(4)
    }, 0)
})
p.then((res)=>{
    //4 res
    console.log(res, 'res')
})
p.then((res1)=>{
    //4 res1
    console.log(res1, 'res1')
})
我们分别调用了两次then，如果是一个变量的话，最后肯定只会运行后一个then，把之前的覆盖了，如果是数组的话，两个then都能正常运行。

至此，我们运行demo，就能如愿以偿的看到运行结果了；一个四十行左右的简单Promise垫片就此完成了。这里贴一下完整的代码：

const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'
function Promise(executor) {
    var _this = this
    this.state = PENDING; //状态
    this.value = undefined; //成功结果
    this.reason = undefined; //失败原因

    this.onFulfilled = [];//成功的回调
    this.onRejected = []; //失败的回调
    function resolve(value) {
        if(_this.state === PENDING){
            _this.state = FULFILLED
            _this.value = value
            _this.onFulfilled.forEach(fn => fn(value))
        }
    }
    function reject(reason) {
        if(_this.state === PENDING){
            _this.state = REJECTED
            _this.reason = reason
            _this.onRejected.forEach(fn => fn(reason))
        }
    }
    try {
        executor(resolve, reject);
    } catch (e) {
        reject(e);
    }
}
Promise.prototype.then = function (onFulfilled, onRejected) {
    if(this.state === FULFILLED){
        typeof onFulfilled === 'function' && onFulfilled(this.value)
    }
    if(this.state === REJECTED){
        typeof onRejected === 'function' && onRejected(this.reason)
    }
    if(this.state === PENDING){
        typeof onFulfilled === 'function' && this.onFulfilled.push(onFulfilled)
        typeof onRejected === 'function' && this.onRejected.push(onRejected)
    }
};
链式调用then
相信上面的Promise垫片应该很容易理解，下面链式调用才是Promise的难点和核心点；我们对照promise/A+规范，一步一步地来实现，我们先来看一下规范是如何来定义的：

then 方法必须返回一个 promise 对象
promise2 = promise1.then(onFulfilled, onRejected);
也就是说，每个then方法都要返回一个新的Promise对象，这样我们的then方法才能不断的链式调用；因此上面的简单垫片中then方法就不适用了，因为它什么都没有返回，我们对其进行简单的改写，不论then进行什么操作，都返回一个新的Promise对象：

Promise.prototype.then = function (onFulfilled, onRejected) {
    let promise2 = new Promise((resolve, reject)=>{
    })
    return promise2
}
我们继续看then的执行过程：

如果 onFulfilled 或者 onRejected 返回一个值 x ，则运行下面的 Promise 解决过程：[[Resolve]](promise2, x)
如果 onFulfilled 或者 onRejected 抛出一个异常 e ，则 promise2 必须拒绝执行，并返回拒因 e
如果 onFulfilled 不是函数且 promise1 成功执行， promise2 必须成功执行并返回相同的值
如果 onRejected 不是函数且 promise1 拒绝执行， promise2 必须拒绝执行并返回相同的据因
首先第一点，我们知道onFulfilled和onRejected执行之后都会有一个返回值x，对返回值x处理就需要用到Promise解决过程，这个我们下面再说；第二点需要对onFulfilled和onRejected进行异常处理，没什么好说的；第三和第四点，说的其实是一个问题，如果onFulfilled和onRejected两个参数没有传，则继续往下传（值的传递特性）；举个例子：

var p = new Promise(function(resolve, reject){
    setTimeout(function(){
        resolve(3)
    }, 1000)
});
p.then(1,1)
.then('','')
.then()
.then(function(res){
    //3
    console.log(res)
})
这里不管onFulfilled和onRejected传什么值，只要不是函数，就继续向下传入，直到有函数进行接收；因此我们对then方法进行如下完善：

//_this是promise1的实例对象
var _this = this
onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }

var promise2 = new Promise((resolve, reject)=>{
    if(_this.state === FULFILLED){
        let x = onFulfilled(_this.value)
        resolvePromise(promise2, x, resolve, reject)
    } else if(_this.state === REJECTED){
        let x = onRejected(_this.reason)
        resolvePromise(promise2, x ,resolve, reject)
    } else if(_this.state === PENDING){
        _this.onFulfilled.push(()=>{
            let x = onFulfilled(_this.value)
            resolvePromise(promise2, x, resolve, reject)
        })
        _this.onRejected.push(()=>{
            let x = onRejected(_this.reason)
            resolvePromise(promise2, x ,resolve, reject)
        })
    }
})
我们发现函数中有一个resolvePromise，就是上面说的Promise解决过程，它是对新的promise2和上一个执行结果 x 的处理，由于具有复用性，我们把它抽成一个单独的函数，这也是上面规范中定义的第一点。

由于then的回调是异步执行的，因此我们需要把onFulfilled和onRejected执行放到异步中去执行，同时做一下错误的处理：

//其他代码略
if(_this.state === FULFILLED){
    setTimeout(()=>{
        try {
            let x = onFulfilled(_this.value)
            resolvePromise(promise2, x, resolve, reject)
        } catch (error) {
            reject(error)
        }
    })
} else if(_this.state === REJECTED){
    setTimeout(()=>{
        try {                    
            let x = onRejected(_this.reason)
            resolvePromise(promise2, x ,resolve, reject)
        } catch (error) {
            reject(error)
        }
    })
} else if(_this.state === PENDING){
    _this.onFulfilled.push(()=>{
        setTimeout(()=>{
            try {                        
                let x = onFulfilled(_this.value)
                resolvePromise(promise2, x, resolve, reject)
            } catch (error) {
                reject(error)
            }
        })
    })
    _this.onRejected.push(()=>{
        setTimeout(()=>{
            try {                        
                let x = onRejected(_this.reason)
                resolvePromise(promise2, x ,resolve, reject)
            } catch (error) {
                reject(error)
            }
        })
    })
}
Promise解决过程
Promise 解决过程是一个抽象的操作，其需输入一个 promise 和一个值，我们表示为 [[Resolve]](promise, x)，如果 x 有 then 方法且看上去像一个 Promise ，解决程序即尝试使 promise 接受 x 的状态；否则其用 x 的值来执行 promise 。
这段话比较抽象，通俗一点的来说就是promise的解决过程需要传入一个新的promise和一个值x，如果传入的x是一个thenable的对象（具有then方法），就接受x的状态：

//promise2：新的Promise对象
//x：上一个then的返回值
//resolve：promise2的resolve
//reject：promise2的reject
function resolvePromise(promise2, x, resolve, reject) {
}
定义好函数后，来看具体的操作说明：

x 与 promise 相等
如果 promise 和 x 指向同一对象，以 TypeError 为据因拒绝执行 promise
x 为 Promise
如果 x 处于等待态， promise 需保持为等待态直至 x 被执行或拒绝
如果 x 处于执行态，用相同的值执行 promise
如果 x 处于拒绝态，用相同的据因拒绝 promise


x 为对象或函数
把 x.then 赋值给 then
如果取 x.then 的值时抛出错误 e ，则以 e 为据因拒绝 promise
如果 then 是函数，将 x 作为函数的作用域 this 调用之。传递两个回调函数作为参数，第一个参数叫做 resolvePromise ，第二个参数叫做 rejectPromise:
如果 resolvePromise 以值 y 为参数被调用，则运行 [Resolve]
如果 rejectPromise 以据因 r 为参数被调用，则以据因 r 拒绝 promise
如果 resolvePromise 和 rejectPromise 均被调用，或者被同一参数调用了多次，则优先采用首次调用并忽略剩下的调用
如果 then 不是函数，以 x 为参数执行 promise
如果 x 不为对象或者函数，以 x 为参数执行 promise
首先第一点，如果x和promise相等，这是一种什么情况呢，就是相当于把自己返回出去了：

var p = new Promise(function(resolve, reject){
    resolve(3)
});
//Uncaught (in promise) TypeError: Chaining cycle detected for promise #<Promise>
var p2 = p.then(function(){
    return p2
})
这样会陷入一个死循环中，因此我们首先要把这种情况给排除掉：

function resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {
        reject(new TypeError('Chaining cycle'));
    }
}
接下来就是对不同情况的判断了，首先我们把 x 为对象或者函数的情况给判断出来：

function resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {
        reject(new TypeError('Chaining cycle'));
    }
    if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
        //函数或对象
    } else {
        //普通值
        resolve(x)
    }
}
如果 x 为对象或函数，就把 x.then 赋值给 then好理解，但是第二点取then有可能会报错是为什么呢？这是因为需要考虑到所有出错的情况（防小人不防君子），如果有人实现Promise对象的时候使用Object.defineProperty()恶意抛错，导致程序崩溃，就像这样：

var Promise = {};
Object.defineProperty(Promise, 'then', {
    get: function(){
        throw Error('error')
    }
})
//Uncaught Error: error
Promise.then
因此，我们取then的时候也需要try/catch：

//其他代码略
if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
    //函数或对象
    try {
        let then = x.then
    } catch(e){
        reject(e)
    }
}
取出then后，回到3.3，判断如果是一个函数，就将 x 作为函数的作用域 this 调用，同时传入两个回调函数作为参数。

//其他代码略
try {
    let then = x.then
    if(typeof then === 'function'){
        then.call(x, (y)=>{
            resolve(y)
        }, (r) =>{
            reject(r)
        })
    } else {
        resolve(x)
    }
} catch(e){
    reject(e)
}
这样，我们的链式调用就能顺利的调用起来了；但是还有一种特殊的情况，如果resolve的y值还是一个Promise对象，这时就应该继续执行，比如下面的例子：

var p1 = new Promise((resolve, reject)=>{
    resolve('p1')
})
p1.then((res)=>{
    return new Promise((resolve, reject)=>{
        resolve(new Promise((resolve, reject)=>{
            resolve('p2')
        }))
    })
})
.then((res1)=>{
    //Promise {state: "fulfilled", value: "p2"}
    console.log(res1)
})
这时候第二个then打印出来的是一个promise对象；我们应该继续递归调用resolvePromise（参考规范3.3.1），因此，最终resolvePromise的完整代码如下：

function resolvePromise(promise2, x, resolve, reject){
    if(promise2 === x){
        reject(new TypeError('Chaining cycle'))
    }
    if(x && typeof x === 'object' || typeof x === 'function'){
        let used;
        try {
            let then = x.then
            if(typeof then === 'function'){
                then.call(x, (y)=>{
                    if (used) return;
                    used = true
                    resolvePromise(promise2, y, resolve, reject)
                }, (r) =>{
                    if (used) return;
                    used = true
                    reject(r)
                })
            } else {
                if (used) return;
                used = true
                resolve(x)
            }
        } catch(e){
            if (used) return;
            used = true
            reject(e)
        }
    } else {
        resolve(x)
    }
}
到这里，我们的Promise也能够完整的实现链式调用了；然后把代码用promises-aplus-tests测试一下，完美的通过了872项测试。
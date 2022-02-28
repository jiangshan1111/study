有以下需求：
  创建一个compose函数,返回函数集 functions 组合后的复合函数, 也就是一个函数执行完之后把返回的结果再作为参数赋给下一个函数来执行. 以此类推. 在数学里, 把函数 f(), g(), 和 h() 组合起来可以得到复合函数 f(g(h()))。


  compose内的函数执行顺序为从右向左，即最右边的函数（最后一个参数）最先执行，执行完的结果作为参数传递给前一个函数（包裹它的函数），一直到整个函数执行完毕，return一个函数，所以compose内部实现的原理类似多米诺骨牌，层层递进的。

  pipe函数与compose函数十分相近，也是一个函数执行完毕后将结果作为参数传递给另一个函数，但它们的区别仅在于pipe函数的接收的函数参数，是从左向右执行的，即第一个参数（函数）执行完毕，将结果吐出来作为参数传递给第二个函数，也就是pipe的第二个参数，直到pipe所有参数作为函数都执行完毕，return出一个函数，才算执行完成。

function compose() {
    var fns = [].slice.call(arguments)
    return function (initialArg) {
        var res = initialArg
        for (var i = fns.length - 1; i > -1; i--) {
            res = fns[i](res)
        }
        return res
    }
}

function pipe() {
    var fns = [].slice.call(arguments)
    return function (initialAgr) {
        var res = initialAgr
        for (var i = 0; i < fns.length; i++) {
            res = fns[i](res)
        }
        return res
    }
}
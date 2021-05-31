声明后立即执行
(function(){

})()

第一部分是包围在 圆括号运算符 () 里的一个匿名函数，这个匿名函数拥有独立的词法作用域。这不仅避免了外界访问此 IIFE 中的变量，而且又不会污染全局作用域。

第二部分再一次使用 () 创建了一个立即执行函数表达式，JavaScript 引擎到此将直接执行函数。

var result = (function () {
    var name = "Barry";
    return name;
})();
// IIFE 执行后返回的结果：
result; // "Barry"


$(function() {
	//执行操作
});
$(function() {}) 是$(document).ready(function()的简写, 这个函数什么时候执行的呢？

答案：DOM 加载完毕之后执行。
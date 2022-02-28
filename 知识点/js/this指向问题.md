this的指向在函数定义的时候是确定不了的，只有函数执行的时候才能确定，this最终指向调用它的对象。

1.函数调用模式

  当一个函数并非一个对象的属性时，那么它就是被当做函数来调用的。在此种模式下，this被绑定为全局对象，在浏览器环境下就是window对象

  function a(){
    console.log(this)
  }
  a() //window



2.方法调用模式

  当函数被保存为一个对象的属性时，它就可称为这个对象的方法。当一个方法被调用时，this被绑定到这个对象上。如果调用表达式包含一个提取属性的动作（. 或 []），那么它被称为方法调用

  var obj = {
    fn:function(){
      console.log(this)
    }
  }
  obj.fn() //obj

  var obj = {
    fn:()=>{
      console.log(this)
    }
  }
  obj.fn() //window

3.构造函数调用模式

  如果在一个函数前面加上new关键字来调用，那么就会创建一个连接到该函数的prototype成员的新对象，同时，this会被绑定到这个新对象上。这种情况下，这个函数就可以成为此对象的构造函数。

  如果new出的是一个对象 this指向该对象
  function a(){
    console.log(this)
  }
  var b = new a() //a

  function a(){
    console.log(this)
    this.name = "hello"
    <!-- return {} -->
  }
  var b = new a() //a
    console.log(b.name)

4.apply和call调用模式

  JS中，函数也是对象，所有函数对象都有两个方法：apply和call，这两个方法可以让我们构建一个参数数组传递给调用函数，也允许我们改变this的值

5.由于箭头函数不绑定this， 它会捕获其所在（即定义的位置）上下文的this值， 作为自己的this值，

  所以 call() / apply() / bind() 方法对于箭头函数来说只是传入参数，对它的 this 毫无影响。
  考虑到 this 是词法层面上的，严格模式中与 this 相关的规则都将被忽略。（可以忽略是否在严格模式下的影响）


在全局范围内，this指向全局对象（浏览器下指window对象）

对象函数调用时，this指向当前对象

全局函数调用时，应该是指向调用全局函数的对象。

使用new关键字实例化对象时，this指向新创建的对象

当用apply和call上下文调用的时候指向传入的第一个参数

var color = 'green';
var test = {
  color:blue,
  getColor:function(){
    var color = 'red',
    console.log(this.color)
  }
}
var getColor = test.getColor;
getColor();//green
test.getColor()//blue

var color = 'green';
var test = {
  color:'blue',
  getColor:function(a){
    var color = 'red';
    console.log(a)
    console.log(this.color)
  }
}
var b = {
  color:'redB'
}

var getColor = test.getColor;
getColor();//green
test.getColor()//blue
test.getColor.call(b,'123')//redB

var color = 'green';
var test = {
  color:'blue',
  getColor:function(a){
    var color = 'red';
    console.log(a)
    console.log(this.color)
  }
}
var b = {
  color:'redB'
}

var getColor = test.getColor;
getColor();//green
test.getColor()//blue
test.getColor.call(b,'123')//redB
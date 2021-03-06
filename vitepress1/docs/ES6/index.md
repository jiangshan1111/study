1.设计模式
  设计原则：
    单一职责
    里氏替换
    依赖倒置

  1.1单例模式
    确保某一个类只有一个实例
    比如点击登录弹出弹框 应该只弹出一次，而不是弹出多次
    1.
    var createLoginLayer = (function(){
      var singleResult = null;
      return function(){
        if(!singleResult){
          div = document.createElement("div");
          xxx //逻辑
        }
        return singleResult = div
      }
    }) //立即执行函数
    //耦合的单例模式，如果没有创建一个新的 有的话返回上一个

    2.
    var getSingle = function(fn){
      var result = null;
      return function(){
        if(!result){
          result = fn.apply(this,arguments);
        }
        return result;
      }
    }
    var createLoginLayer = function(){
      div = document.createElement("div");
      xxx //逻辑
      return div
    }
    getSingle(createLoginLayer)();


  1.2工厂模式
    定义一个用于创建对象的接口，让子类决定实例化哪一个类，工厂方法
    使一个类的实例化延迟到其子类。

    好处：1.良好的封装性，代码结构更清晰；
          2.业务代码，只需要知道要创建的产品对象，不用关心具体实例化过程。

    1.简单工厂
      function Car(options){
        this.doors = options.doors || 4;
        this.color = options.color || "silver";
      }
      function Truck(options){
        this.state = options.state || "used";
        this.color = options.color || "blue";
      }
      function VehicleFactory(){

      }
      VehicleFactory.prototype.vehicleClass = Car;
      VehicleFactory.prototype.createVehicle = function(){
        if(options.vehicleType == 'Car'){
          this.vehicleClass = Car;
        }else{
          this.vehicleClass = Truck;
        }
        return new this.vehicleClass(options)
      }
      var carFactory = new VehicleFactory()
      var car = carFactory.createVehicle({
        vehicleType : "car",
        color : "yellow",
        doors : 6
      })

    2.抽象工厂
      var abstractVehicleFactory = (function () {
        var types = {};
        console.log(types)
        return {
          getVehicle: function (type, custom) {
            var vehicle = types[type];
            return (vehicle ? new vehicle(custom) : null)
          },
          registerVehicle: function (type, Vehicle) {
            var proto = Vehicle.prototype;
            // if (proto.color) {
            types[type] = Vehicle;
            console.log(types)
            // }
            return abstractVehicleFactory;
          }
        }
      })()
      function Car(options) {
        this.doors = options.doors || 4;
        this.color = options.color || "silver";
      }
      function Truck(options) {
        this.state = options.state || "used";
        this.color = options.color || "blue";
      }
      console.log(abstractVehicleFactory)
      abstractVehicleFactory.registerVehicle("car", Car)
      abstractVehicleFactory.registerVehicle("car", Truck)
      abstractVehicleFactory.registerVehicle("truck", Truck)
      var car = abstractVehicleFactory.getVehicle("car", {
        color: 'lime green',
        state: 'like new'
      })
      var truck = abstractVehicleFactory.getVehicle("truck", {
        wheelSize: 'medium',
        color: 'lime yellow',
      })
      console.log(car, truck)


  1.3代理模式
    当我们需要在一个对象后多次进行访问控制访问和上下文，代理模式是
    非常有用的。当实例化一个对象开销很大的时候，它可以帮助我们控制成本，提供
    更高级的方式去关联和修改对象。
    1.
    var Letter = function(){
      this.title = "若只如初见"
    }
    var manA = {
      sendLetter:function(target){
        var letter = new Letter()
        target.receiveLetter(letter)
      }
    }
    var girlB = {
      receiveLetter:function(letter){
        girlC.listenGoodMood(function(){
          girlC.receiveLetter(letter)
        })
      }
    }
    var girlC = {
      receiveLetter:function(letter){
        console.log("收到情书"+letter.title)
      },
      listenGoodMood:function(fn){
        setTimeout(function(){
          fn()
        },2000)
      }
    }
    manA.sendLetter(girlB)
    2.跨域
    http = require('path')
    http.createServer().listen(8081);//服务端创建服务
    http.get({
      host:,
      port:,
      path:'/'
      method:'get',

    },(res)=>{
      res.on('data',function(){
        //逻辑处理
      })
      res.on('end',function(){
        //结束请求处理
      })
    }) //数据处理


  1.4适配器模式
    将一个对象或者类的接口翻译成某个指定的系统可以使用的另外一个接口，
    适配器基本上允许本来有欲接口不兼容而不能一起正常工作的对象或者类能够在一起
    工作。
    系统需要使用现有的类，而这些类的接口不符合系统的需要。
    需要一个统一的输出接口，而输入端的类型不可预知。
    var googleMap = {
      show:function(){

      }
    }
    var baiduMap = {
      display:function(){
        
      } //刚开始的方法是display
    }
    var baiduMapAdapter = {
      show:function(){
        return baiduMap.display()
      } //重构 使输出的函数也是show
    }
    var renderMap = function(map){
      if(map.show instanceof Function){
        map.show();
      }
    }
    renderMap(googleMap)
    renderMap(baiduMapAdapter)

  1.5桥梁模式
  1.6观察者模式
  
2.ES6
  ECMAscript是一种语言标准
  ECMAscript和javascript的关系，前者是后者的规格，后者是前者的一种实现。


3.ES6新增数据类型
  3.1 Symbol
    原始数据类型，表示独一无二的值，即使所传的参数一致
    使用Symbol()生成

    用途
    1.用于对象的key 不能直接使用.xxx来获取
    2.可以用于消除魔术字符串，既代码形成强耦合的某一个具体的字符串
    Object.getOwnPropertySymbols 可以获取指定对象的所有Symbol属性名

  3.2 Map
    类似于对象 但键名不仅仅能用字符串 各种类型的值均可作为键名
    delete(key) // 删除
    has(key) //是否存在
    clear() //清空
    set(key,value) //赋值
    get(key)  //获取值
    entries() //对应的key和value forof循环返回的是 [key,value]
    keys()//对应的key
    values()//对应的value
    forEach() //循环对应的key和value


  3.3 Set
    new Set()
    类似于数组，没有重复的值
    可以使用for of来遍历
    数组去重 [...new Set(arr)]
    add() //添加
    delete() // 删除
    has() //是否存在
    clear() //清空
    entries() //对应的key和value forof循环返回的是 [key,value]
    keys()//对应的key
    values()//对应的value
    forEach() //循环对应的key和value


4.ES6新语法特性
  4.1 let和const
  4.2 变量的结构赋值
    ES6允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构赋值。
    这种写法属于“模式匹配”，只要等号两边的模式相同，左边的变量就会被赋予对应的值。
    let [one,two,three] = [1,2,3] //解构成功
    let [one,,] = [1,2,3] //不完全解构
    let [one,two,three] = [1] //解构不成功

    对象的属性没有次序 变量必须与属性同名才能渠道正确的值
    let {a,b,c}={a:1,c:2,b:3}//a=1,b=3,c=2

    当赋值为undefined时 可以使用默认值
    let [x,y=5]=[1] //x=1,y=5
  
  4.3箭头函数
    相当于匿名函数，并且简化了函数定义
    this 指向 定义时的对象而不是使用时的对象
    不可以当作构造函数 不能使用new
    不可以使用arguments对象
    不可以使用yield命令 因此不能用作Generator函数

5.ES6相对ES5扩展
  5.1 字符串扩展
  5.2 函数扩展

    函数默认值
    Es5 用|| function sum(one,two,three ){one = one || 1}
    ES6 直写在函数定义后面 例：function sum(one = 1, two = 2,three = 3){}

    剩余操作符 对剩余变量进行打包  
    扩展运算符 对特定变量进行打散
    都是...
    function sum(one,...rest){
      console.log(rest) // [2,3]
    }
    sum(1,2,3)

  5.3 数组扩展

    扩展运算符 ...
      function f(x,y,z){

      }
      var args = [0,1,2]
      //Es5
      f.apply(null,args)
      //Es6
      f(...args)
    
    数组复制
      //Es5
      var arr1 = [1,2]
      var arr2 = a1.concat()
      arr2[0] = 2  //不会改变arr1
      //arr1 = [1,2]
      //Es6
      var arr1 = [1,2]
      var arr2 = [...a1] //和上述ES5效果一至

    新增方法
    Array.from()
      可以将类数组以及可遍历的对象转换成数组 比如 obj和set （obj需要加上length：长度这个属性，下标得是1，2，3）
    Array.copyWithin()
      对数组内部的值复制，并复制到特定位置上，长度不变 相当于替换 把原始的arr改变了
      Array.copyWithin(需要复制到的下标，复制的起始位置，复制的终止位置)
      [1,2,3,4,5].copyWithin(0,3,4) //[4,2,3,4,5]
      [1,2,3,4,5].copyWithin(1,3,5) //[1, 4, 5, 4, 5] //把[4,5]复制到了下标1的位置
    entries() //对应的key和value forof循环返回的是 [key,value]
    keys()//对应的key
    values()//对应的value


  5.4 对象扩展
      允许向对象直接写入变量和函数，作为对象的属性和方法。
        let foo = "bar";
        let o={
          foo,
          method(){
            //
          }
        }
      允许使用表达式作为对象的属性。
        let obj1 = {
          ['a'+'bc']:'123'
        }
        console.log(obj1[abc])

      对象的setter和getter操作
        const cart={
          _wheel:4,
          get wheels(){
            return this._wheels
          }
          set wheels1(value){
            if(value < this._wheels){
              throw new Error('1111')
            }
            this._wheels = value;
          }
        }
        调用 cart.wheels 和 cart.wheels1来执行set和get

      Object.is()
        比较两个值是否相等 严格相等 （===）  Object.is(NAN,NAN)//true 特殊的地方
      Object.assign()
        用于将对象进行合并 可以完成对象的复制
      Object.getOwnPropertyDescriptor()
        返回对象属性的描述对象.
      Object.keys()
        返回一个数组，包括对象自身的所有可枚举属性。
      

6.ES6高级操作
  6.1 Promise对象
    是异步编程的一种解决方案，将异步操作以同步操作的流程表达出来，避免多层回调函数
      未完成 成功 失败三个状态
      let promise = new Promise(function(resolve,reject){
        let flat = true;
        if(flat){
          resolve("成功")
        }else{
          reject("失败")
        }
      })
      promise.then(function(value){
        console.log(value)
        //resolve触发函数
      },function(error){
        console.log(error)
        //reject触发函数
      })
    Promise.prototype.catch() 发生错误时会执行catch的回调函数 //发生错误时触发
    Promise.prototype.done() 位于回调链的末端，可抛出任何错误。//无论如何都会执行的代码
    Promise.prototype.finally() 无论状态如何，最后都会执行  //最后触发的函数

    done和finally原生浏览器不支持 需要写方法

  6.2 Iterator遍历器
    for循环多个循环嵌套时，追踪多个变量，代码复杂度会大大增加。后期维护比较麻烦
    为各种数据结构，提供了一个统一的，简便的访问接口。
    使得数据结构的成员能够按某种次序排列。
    ES6创造了一种新的遍历命令for。。of循环

    原生遍历器封装
      function createIterator(items){
        let i = 0;
        return {
          next:function(){
            return i>=items.length?{
              done:true,
              value:undefined
            }:{
              done:false,
              value:items[i++]
            }
          }
        }
      }
      let myIterator = createIterator([1,2,3]);
      myIterator.next();

    ES6 Iterator使用
      let arr = [1,2,3]
      let myIterator = arr[Symbol.iterator]();
      console.log(myIterator.next()) //1
      console.log(myIterator.next()) //2
      console.log(myIterator.next()) //3
      console.log(myIterator.next()) //undefined

    支持Iterator的数据结构
      Array,Map,Set,String,TypedArray,函数的arguments对象，NodeList对象。

    调用场景
      解构赋值，扩展运算符，yield*，其他场景

  6.3 Generator
    可以理解为是一个状态机，封装了多个内部状态。
    可以看作是一个遍历器对象生成函数。
    返回的遍历器对象，可以依次遍历Generator函数内部的每一个状态。
    
    函数特征
      function 后有个*
      每次调用next(),均会返回一个状态。
      function* createGenerator(){
        yield 1;
        yield 2;
        yield 3;
      }
      let myIterator = createGenerator();
      console.log(myIterator.next())

    可以使用for...of来遍历
      一旦next方法返回对象的done属性为true，循环就会终止

    使用场景
      可用于给元素添加Iterator接口
      var myIterable = {}
      myIterable[Symbol.iterator] = function*{
        yield 1;
        yield 2;
        yield 3;
      }
      [...myIterable]

      异步操作的同步化表达
      function* loadUI(){
        a();
        yield b();
        c();
      }
      var load = loadUI();
      loader.next(); // 执行a，b yield表示阶段
      loader.next(); // 执行c



  6.4 Class类操作
    Es5生成实例对象的传统方法是通过构造函数 new
    ES6
      class Person {
        constructor(obj) {
          this.username = obj.username
          this.age = obj.age;
        }
        init() {
          this.sayHi()
          this.sayHello()
        }
        sayHi() {
          console.log(this.age)
        }
        sayHello() {
          console.log(this.username)
        }
      }
      var person = new Person({ username: '江山', age: 20 })
      person.init()

      //直接执行
      //class
      class Person {
        constructor(obj) {
          this.username = obj.username
          this.age = obj.age;
          this.init()
        }
        init() {
          this.sayHi()
          this.sayHello()
        }
        sayHi() {
          console.log(this.age)
        }
        sayHello() {
          console.log(this.username)
        }
      }
      new Person({ username: '江山', age: 20 })

    setter和getter
      set sex(value){
        this.s = value
      }
      get sex(){
        return this.s
      }
    
    在一个方法前加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用，
    这被称为“静态方法”

    类不存在变量提升 只能先定义类再调用
    类和模块的内部默认使用严格模式
    类的方法内部，this默认指向类的实例

    class的继承（react）
      es5的继承
        function Person(username,age){
          this.username = username
          this.age = age
          this.sayHi = function(){

          }
        }
        function Student(username,age,sex){
          Person.call(this,username,age) //继承
          this.sex = sex
        }

      es6的继承
        直接通过extends来继承
        class Person{
          constructor(a,b){
            this.a = a
            this.b = b
          }
        }
        class Student extends Person{
          constructor(a,b,c){
            supper(a,b) //代表调用了父类的构造函数
            this.c = c
          }
          show(){
            //
          }
        }

        supper //在普通方法中，super对象指向父类的原型对象；在静态方法中，指向父类

        Object.getOwnPropertyNames(obj) //获取对象自身属性
        Object.getOwnPropertySymbols(obj) //获取对象自身Symbol属性

  6.5 异步操作
    async
      是Generator的语法糖
      async函数就是将Generator 函数的*替换成async，将yield替换成await。

      有自己的内置执行器 不用每次都使用Next()
      返回值是Promise
      await 执行完自动执行下面的代码
      async函数内部return语句返回的只，会成为then方法回调函数的参数 return await 123；
      await 命令后面是一个Promise对象，返回该对象的结果。
      await 命令后面不是一个Promise对象，直接返回对应的值。





  

Object.defineProperty() 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象。


1.const object1 = {};

  Object.defineProperty(object1, 'property1', {
    value: 42,
    writable: false
  });

  object1.property1 = 77;
  // throws an error in strict mode

  console.log(object1.property1);
  // expected output: 42

2.var obj={index:1}
  Object.defineProperty(obj,'index2',{
    get : function() { return '123'; },
    set : function(newValue) { console.log(123); },
  })

  //obj.index2  "123"
  //obj.index2 = 3 打印出123 在获取时还是"123"

3.var bValue = 38;
  Object.defineProperty(o, "b", {
    // 使用了方法名称缩写（ES2015 特性）
    // 下面两个缩写等价于：
    // get : function() { return bValue; },
    // set : function(newValue) { bValue = newValue; },
    get() { return bValue; },
    set(newValue) { bValue = newValue; },
    enumerable : true,
    configurable : true
  });

  vue原理 监听get和set
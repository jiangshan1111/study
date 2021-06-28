es5实现：
  function Point(x, y) {
    this.x = x;
    this.y = y;
  }

  Point.prototype.toString = function () {
    return '(' + this.x + ', ' + this.y + ')';
  };

  var p = new Point(1, 2);
等价于
es6实现
  class Point {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }

    toString() {
      return '(' + this.x + ', ' + this.y + ')';
    }
  }

对象属性（properties），除 value 外，还有三个特殊的特性（attributes），也就是所谓的“标志”：

    writable — 如果为 true，则值可以被修改，否则它是只可读的。
    enumerable[ɪˈnjumərəbəl] — 如果为 true，则会被在循环中列出，否则不会被列出。//枚举
    configurable[kən'fɪgjərəbl] — 能否使用delete、能否需改属性特性、或能否修改访问器属性、，false为不可重新定义，默认值为true

    为了修改标志，我们可以使用 Object.defineProperty，如果该属性不存在，则会根据标志和给定的值创建该属性。
Object.defineProperty(obj, propertyName, descriptor)

要点：
  1.在类的实例上面调用方法，其实就是调用原型上的方法。 
    但是 类的内部所有定义的方法，都是不可枚举的（non-enumerable）。
    es6：
      class Point {
        constructor(x, y) {
          // ...
        }

        toString() {
          // ...
        }
      }
      Object.keys(Point.prototype)
      // []
      Object.getOwnPropertyNames(Point.prototype)
      // ["constructor","toString"]

    es5：
      var Point = function (x, y) {
        // ...
      };

      Point.prototype.toString = function () {
        // ...
      };

      Object.keys(Point.prototype)
      // ["toString"]
      Object.getOwnPropertyNames(Point.prototype)
      // ["constructor","toString"]

    2.this的指向
      类的方法内部如果含有this，它默认指向类的实例。但是，必须非常小心，一旦单独使用该方法，很可能报错。

      class Logger {
        printName(name = 'there') {
          this.print(`Hello ${name}`);
        }

        print(text) {
          console.log(text);
        }
      }

      const logger = new Logger();
      const { printName } = logger;
      printName(); // TypeError: Cannot read property 'print' of undefined
      
      上面代码中，printName方法中的this，默认指向Logger类的实例。但是，如果将这个方法提取出来单独使用，this会指向该方法运行时所在的环境（由于 class 内部是严格模式，所以 this 实际指向的是undefined），从而导致找不到print方法而报错。

      一个比较简单的解决方法是，在构造方法中绑定this，这样就不会找不到print方法了。

      class Logger {
        constructor() {
          this.printName = this.printName.bind(this);
        }

        // ...
      }
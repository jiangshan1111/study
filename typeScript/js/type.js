"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 数据类型
 */
//字符串
var name = 'tom';
var msg = "\u59D3\u540D" + name;
//array
//方式1：在数据类型后面加[]
var names = ['12', '123'];
//方式2：使用数组的泛型，Array<数据类型>
var nums = [1, 2, 3];
//元组,特殊的数组，限制数量和每个元素的类型
var tuple = [1, 'set', false];
//枚举enum 可以指定可供选择的列表，限定取值范围
var Season;
(function (Season) {
    Season["spring"] = "\u6625";
    Season["summer"] = "\u590F";
    Season["autumn"] = "\u79CB";
    Season["winter"] = "\u51AC";
})(Season || (Season = {}));
var s = Season.spring;
//any 任意类型，暂时不确定变量类型时
var a;
//void 空类型 取值只能为null或者undefined，某种程度上与void相反
//一般不会将变量声明为void
//通常当函数没有返回值时，会声明返回值为void
function show() {
    console.log(123);
}
//never 表示永不存在的类型
function test() {
    while (true) {
    }
}
//Object 表示非原始类型 除基础类型外
var d = {};
//联合类型 可以是几种类型之一 不能是其它
var e = 123;
e = 'qwe';
//类型断言 用来指定变量的类型,其实就是做个断定/假设，使编译器可以通过
var fas;
//获取变量的长度（数值没有长度会报错）
//方式一 <类型>值
//方式2 使用as ：值 as 类型
// if ((<string>f).length) {
//   console.log((f as string).length)
// }
//函数
//1.调用函数时参数的数量，类型必须一致
//2.未指定类型时，参数默认为any类型
function jiangshan(a, b, c) {
    return a + b;
}
//可选参数
//1.使用问号表示参数可选
//2.必选参数不能放在可选参数后面
function f2(a, b) {
}
f2('sdd');
//默认参数
//1.直接等号表示默认值
function f3(a, b) {
    if (b === void 0) { b = 8; }
}
//剩余参数
//1.参数个数任意，可以有多个，也可以没有
//2.使用...定义剩余数据，类型为数组，会将传入的所有参数放在数组里
function f4(a) {
    var b = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        b[_i - 1] = arguments[_i];
    }
}
//为返回值定义类型
//1.在（）后指定返回的类型
//2.没有返回值时，用void
function f5() {
    return 'ser';
}
function f6() {
}
//函数类型
//定义一个变量f7，类型为函数，函数的参数类型为string，返回值为布朗
// let f7: (a: string) => boolean
// f7 = function (a: string):boolean {
//   return true
// }
var f7 = function (a) {
    return true;
};
//类
var Student = /** @class */ (function () {
    function Student(name, age) {
        this.name = name;
        this.age = age;
    }
    Student.prototype.show = function () {
        console.log(this.name + this.age);
    };
    Student.prototype.calc = function (num1, num2) {
        return num1 + num2;
    };
    return Student;
}());
var stu1 = new Student('123', 1234);
var stu2 = new Student('11223', 123124);
stu1.show();
stu2.show();
//继承
var Student1 = /** @class */ (function (_super) {
    __extends(Student1, _super);
    function Student1(name, age, grade) {
        var _this = _super.call(this, name, age) || this;
        _this.grade = grade ? grade : 0;
        return _this;
    }
    Student1.prototype.show1 = function () {
        console.log(this.grade);
    };
    return Student1;
}(Student));
var stu11 = new Student1('12', 123);
stu11.show1();
//修饰符
var Person = /** @class */ (function () {
    function Person() {
        this.age = 123;
        this.sex = '男';
        this.name = '123';
    }
    Person.prototype.show = function () {
        console.log(this.age);
        console.log(this.sex);
        console.log(this.name);
    };
    Person.prototype.show1 = function () {
        console.log(this.age);
        console.log(this.sex);
        console.log(this.name);
    };
    return Person;
}());
var p = new Person();
p.show();
// p.show1();//报错
// console.log(p.age)//报错
// console.log(p.sex)//报错
var PersonC = /** @class */ (function (_super) {
    __extends(PersonC, _super);
    function PersonC() {
        return _super.call(this) || this;
        // console.log(this.sex) //报错
    }
    return PersonC;
}(Person));
//封装
var fengzhuang = /** @class */ (function () {
    function fengzhuang() {
        this._sex = '12123';
    }
    Object.defineProperty(fengzhuang.prototype, "sex", {
        //存取器
        get: function () {
            return this._sex;
        },
        set: function (value) {
            //可以控制值 写方法 比如只能输入男
            this._sex = value;
        },
        enumerable: false,
        configurable: true
    });
    return fengzhuang;
}());
var fz = new fengzhuang();
fz.sex = 'sad';
console.log(fz.sex);
//抽象类
var animal = /** @class */ (function () {
    function animal(name) {
        this.name = name;
    }
    return animal;
}());
var Dog = /** @class */ (function (_super) {
    __extends(Dog, _super);
    function Dog(name) {
        return _super.call(this, name) || this;
    }
    Dog.prototype.cry = function () {
    };
    return Dog;
}(animal));
// let an = new animal()//报错
var dog = new Dog('str');

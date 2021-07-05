"use strict";
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

/**
 * 数据类型
 */
//字符串
let name:string = 'tom'
let msg:string = `姓名${name}`

//array
//方式1：在数据类型后面加[]
let names:string[] = ['12','123']
//方式2：使用数组的泛型，Array<数据类型>
let nums: Array<number> = [1, 2, 3]

//元组,特殊的数组，限制数量和每个元素的类型
let tuple: [number, string, boolean] = [1, 'set', false]

//枚举enum 可以指定可供选择的列表，限定取值范围
enum Season {
  spring = '春',//每个成员有两部分组成；名称和值
  summer = '夏',//每个成员有两部分组成；名称和值
  autumn = '秋',//每个成员有两部分组成；名称和值
  winter = '冬',//每个成员有两部分组成；名称和值
}
let s: Season = Season.spring

//any 任意类型，暂时不确定变量类型时
let a: any;

//void 空类型 取值只能为null或者undefined，某种程度上与void相反
//一般不会将变量声明为void
//通常当函数没有返回值时，会声明返回值为void
function show(): void{
  console.log(123)
}

//never 表示永不存在的类型
function test(): never{
  while (true) {
    
  }
}

//Object 表示非原始类型 除基础类型外
let d:Object = {}

//联合类型 可以是几种类型之一 不能是其它
let e:string|number = 123
e = 'qwe'

//类型断言 用来指定变量的类型,其实就是做个断定/假设，使编译器可以通过
var fas:string|number;
//获取变量的长度（数值没有长度会报错）
//方式一 <类型>值
//方式2 使用as ：值 as 类型
// if ((<string>f).length) {
//   console.log((f as string).length)
// }

//函数
//1.调用函数时参数的数量，类型必须一致
//2.未指定类型时，参数默认为any类型
function jiangshan(a:number,b:number,c:string) {
  return a+b
}
//可选参数
//1.使用问号表示参数可选
//2.必选参数不能放在可选参数后面
function f2(a:string,b?:number) {
  
}
f2('sdd')

//默认参数
//1.直接等号表示默认值
function f3(a:string,b:number=8) {
  
}

//剩余参数
//1.参数个数任意，可以有多个，也可以没有
//2.使用...定义剩余数据，类型为数组，会将传入的所有参数放在数组里
function f4(a:string,...b:any[]) {
  
}

//为返回值定义类型
//1.在（）后指定返回的类型
//2.没有返回值时，用void
function f5(): string{
  return 'ser'
}
function f6(): void{
}

//函数类型
//定义一个变量f7，类型为函数，函数的参数类型为string，返回值为布朗
// let f7: (a: string) => boolean
// f7 = function (a: string):boolean {
//   return true
// }
let f7: (a: string) => boolean = function (a: string):boolean {
    return true
  }

//类
class Student{
  name:string;
  age: number;
  constructor(name:string,age: number) {
    this.name = name
    this.age  = age
  }
  show() {
    console.log(this.name+this.age)
  }
  calc(num1: number, num2: number):number{
    return num1 + num2
  }
}
let stu1 = new Student('123',1234)
let stu2 = new Student('11223',123124)
stu1.show()
stu2.show()

//继承
class Student1 extends Student{
  grade: number;
  constructor(name:string,age: number,grade?:number) {
    super(name, age)
    this.grade = grade?grade:0
  }
  show1() {
    console.log(this.grade)
  }
}
var stu11 = new Student1('12', 123)
stu11.show1()


//修饰符
class Person{
  name: string;//默认就是public
  protected age: number = 123
  private sex:string = '男'
  constructor() {
    this.name = '123'
  }
  show() {
    console.log(this.age)
    console.log(this.sex)
    console.log(this.name)
  }
  private show1() {
    console.log(this.age)
    console.log(this.sex)
    console.log(this.name)
  }
}
let p = new Person()
p.show();
// p.show1();//报错
// console.log(p.age)//报错
// console.log(p.sex)//报错

class PersonC extends Person{
  constructor() {
    super()
    // console.log(this.sex) //报错
  }
}

//封装
class fengzhuang{
  private _sex: string = '12123'
  //存取器
  get sex() {
    return this._sex
  }
  set sex(value) {
    //可以控制值 写方法 比如只能输入男
    this._sex = value
  }
}
let fz = new fengzhuang()
fz.sex = 'sad'
console.log(fz.sex)

//抽象类
abstract class animal{
  name: string;
  constructor(name: string) {
    this.name = name
  }
  //抽象方法
  abstract cry():any;
}
class Dog extends animal{
  constructor(name: string) {
    super(name)
  }
  cry() {
    
  }
}
// let an = new animal()//报错
let dog = new Dog('str')



export { }



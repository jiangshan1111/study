/**
 * 
 * 基于js，在ts可以直接使用js
 */
// var str:Array<Number> = [1, 2, 3, 4,5]
// var name = [...str]
// export{}
// console.log(str)

// interface firstType{
//   id: string;
//   name: string;
//   address: number;
// }

// interface secondType{
//   id: string;
//   uname: string;
//   uaddress: number;
// }

// type ExtractType1 = Extract<keyof firstType,keyof secondType>
// type ExtractType2 = Exclude<keyof firstType, keyof secondType>


// declare function create<T extends new () => any>(c: T): InstanceType<T>
// class jiangshan1{}
// class jiangshan2{ }
// let a1 = create(jiangshan1)
// let b1 = create(jiangshan2)

// declare function create<T extends new () => any>(c: T): InstanceType<T>

// interface IContainer{
//   callback: () => {},
//   singleton: boolean,
//   instance?: {};
// }

// interface NewAble<T>{
//   new(...args: any[]): T;
// }

// type TBind<T> = [
//   key: string,
//   Fn: NewAble<T>,
// ]

// class CreateIoc {
//   private container: Map<PropertyKey, IContainer>;
//   constructor() {
//     this.container = new Map<string, IContainer>();
//   }
//   public bind<T>(...params: TBind<T>){
//     const [key, Fn] = params;
//     const callback = () => new Fn()
//     this.container.set(key,{callback,singleton:false})
//   }
//   public singleton<T>(...params: TBind<T>){
//     const [key, Fn] = params;
//     const callback = () => new Fn()
//     this.container.set(key,{callback,singleton:true})
//   }
//   public use(namespace: string) {
//     const item = this.container.get(namespace);
//     if (item) {
//       if (item.singleton && !item.instance) {
//         item.instance = item.callback()
//       }
//       return item.singleton?item.instance:item?.callback() 
//     } else {
//       throw new Error('没有找到item')
//     }
//   }
// }


// interface IUserService{
//   test(str: string): void;
// }

// class UserService implements IUserService {
//   constructor() { }
//   public test(str: string): void{
//     console.log('123',str)
//   }
// }
// const ioc = new CreateIoc();
// ioc.bind<IUserService>('UserService',UserService)

// const user = ioc.use('UserService')
// user.test('hahaha')



// type TNon = NonNullable<string | number | undefined>

// type IFoo = (uname:string,uAge:number) => {
//   name: string;
//   age:number
// }
// type Ibar = Parameters<IFoo>

// interface User{
//   id: number;
//   age:number
// }

// type PartialUser = Partial<User>

interface Person {
  readonly id: number;
}
const data: Person = {
  id:456
}
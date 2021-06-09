let test = {
    name: "小红"
  };
test = new Proxy(test, { [ˈprɑːksi]
  get(target, key) {
    console.log('获取了getter属性');
    return target[key];
  },
  set(target,key){
    console.log(...arguments) //有四个参数
  }
});

//test.name   打印 '获取了getter属性' 返回 "小红"
//test.name = 123  打印 {name: "小红"}  "name"  123  Proxy({name: "小红"})
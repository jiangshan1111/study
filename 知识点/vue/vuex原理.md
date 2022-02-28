原理总结：
Vuex是通过全局注入store对象，来实现组件间的状态共享。在大型复杂的项目中（多级组件嵌套），需要实现一个组件更改某个数据，多个组件自动获取更改后的数据进行业务逻辑处理，这时候使用vuex比较合适。假如只是多个组件间传递数据，使用vuex未免有点大材小用，其实只用使用组件间常用的通信方法即可。


Vue.mixin({
        beforeCreate() {
            if (this.$options && this.$options.store) {
                //找到根组件 main 上面挂一个$store
                this.$store = this.$options.store
                // console.log(this.$store);

            } else {
                //非根组件指向其父组件的$store
                this.$store = this.$parent && this.$parent.$store
            }
        }
    })
可见，store注入 vue的实例组件的方式，是通过vue的 mixin机制，借助vue组件的生命周期 钩子 beforeCreate 完成的。即 每个vue组件实例化过程中，会在 beforeCreate 钩子前调用 vuexInit 方法。


new vue实现双向数据绑定：
this._s = new Vue({ 
    data: {
        // 只有data中的数据才是响应式
        state: options.state
    }
})

getters实现
 //实现getters原理
  let getters = options.getters || {}
  // console.log(getters);
  // this.getters = getters; //不是直接挂载到 getters上 这样只会拿到整个 函数体
  this.getters = {};
  // console.log(Object.keys(getters))  // ["myAge","myName"]
  Object.keys(getters).forEach((getterName) => {
      // console.log(getterName)  // myAge
      // 将getterName 放到this.getters = {}中
      // console.log(this.state);
      Object.defineProperty(this.getters, getterName, {
          // 当你要获取getterName（myAge）会自动调用get方法
          // 箭头函数中没有this               
          get: () => {
              return getters[getterName](this.state)
          }
      })
  })
从上面源码，我们可以看出Vuex的state状态是响应式，是借助vue的data是响应式，将state存入vue实例组件的data中；Vuex的getters则是借助vue的计算属性computed实现数据实时监听。



mutations实现

let mutations = options.mutations || {}
    // console.log(mutations);
    this.mutations = {};
    Object.keys(mutations).forEach(mutationName=>{
        // console.log(mutationName);
        
        this.mutations[mutationName] = (payload) =>{
            this.mutations[mutationName](this.state,payload)
        }
    })


actions实现
// actions的原理 
  let actions = options.actions || {}
  this.actions = {};
  forEach(actions,(actionName,value)=>{
      this.actions[actionName] = (payload)=>{
          value(this,payload)
      }
  })

commit dispatch的实现
    commit(type,payload){
        this.mutations[type](payload)
    }
    // type是actions的类型  
    dispatch=(type,payload)=>{
        this.actions[type](payload)
    }
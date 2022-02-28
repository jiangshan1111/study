https://juejin.cn/post/6961222829979697165
需要注意的地方：
1. Vue 组件通讯有哪几种方式

    props 和$emit 父组件向子组件传递数据是通过 prop 传递的，子组件传递数据给父组件是通过$emit 触发事件来做到的
    $parent,$children 获取当前组件的父组件和当前组件的子组件
    $attrs 和$listeners A->B->C。Vue 2.4 开始提供了$attrs 和$listeners 来解决这个问题
    父组件中通过 provide 来提供变量，然后在子组件中通过 inject 来注入变量。(官方不推荐在实际业务中使用，但是写组件库时很常用)
    $refs 获取组件实例
    envetBus 兄弟组件数据传递 这种情况下可以使用事件总线的方式
    https://www.jianshu.com/p/89406752a369
    vuex 状态管理

2.Vue2.0 响应式数据的原理
  整体思路是数据劫持+观察者模式
  对象内部通过 defineReactive 方法，使用 Object.defineProperty 将属性进行劫持（只会劫持已经存在的属性），数组则是通过重写数组方法来实现。当页面使用对应属性时，每个属性都拥有自己的 dep 属性，存放他所依赖的 watcher（依赖收集），当属性变化后会通知自己对应的 watcher 去更新(派发更新)。

3. Vue 如何检测数组变化
  数组考虑性能原因没有用 defineProperty 对数组的每一项进行拦截，而是选择对 7 种数组（push,shift,pop,splice,unshift,sort,reverse）方法进行重写(AOP 切片思想)
  所以在 Vue 中修改数组的索引和长度是无法监控到的。需要通过以上 7 种变异方法修改数组才会触发数组对应的 watcher 进行更新
  push 添加一个元素
  shift 方法用于把数组的第一个元素从其中删除，并返回第一个元素的值。
  pop 删除并返回数组的最后一个元素
  splice 删除元素，并向数组添加新元素。
  unshift 向数组的开头添加一个或更多元素，并返回新的长度。
  sort 对数组的元素进行排序
  reverse 颠倒数组中元素的顺序。

  ///////可以通过push一个空值对数组进行实时更新 或者 this.$set(this.arr, i, el+1); 或者 this.arr = this.arr.concat([])

4.vue3.0 用过吗 了解多少
  响应式原理的改变
  Vue3.x 使用 Proxy[ˈprɑːksi] 取代 Vue2.x 版本的 Object.defineProperty

  1，Object.defineproperty()操作的是对象的属性，需要对属性进行深度的遍历和监听，并且无法动态反应对象属性的添加或删除，以及数组下标的变化，需要使用$set手动的触发更新

  2，proxy是拦截整个对象，拓展对象的能力，因此对对象的任何操作都会走到处理逻辑




  组件选项声明方式
  Vue3.x 使用 Composition API
  setup 是 Vue3.x 新增的一个选项， 他是组件内使用 Composition API 的入口。

  模板语法变化
  slot 具名插槽语法
  自定义指令
  v-model 升级

  其它方面的更改
  Suspense
  支持 Fragment（多个根节点）和 Protal（在 dom 其他部分渲染组建内容）组件，针对一些特殊的场景做了处理。
  基于 treeshaking 优化，提供了更多的内置功能。

5. Vuex 页面刷新数据丢失怎么解决
  需要做 vuex 数据持久化 一般使用本地存储的方案来保存数据 可以自己设计存储方案 也可以使用第三方插件
  推荐使用 vuex-persist[pərˈsɪst] 或者vuex-persistedstate  插件，它就是为 Vuex 持久化存储而生的一个插件。不需要你手动存取 storage ，而是直接将状态保存至 cookie 或者 localStorage 中
  vuex-persist使用https://blog.csdn.net/qq_42043377/article/details/95747776
  vuex-persistedstate 使用https://www.jianshu.com/p/c22861ec5f21

6.Vue.mixin 的使用场景和原理
  在日常的开发中，我们经常会遇到在不同的组件中经常会需要用到一些相同或者相似的代码，这些代码的功能相对独立，可以通过 Vue 的 mixin 功能抽离公共的业务逻辑，原理类似“对象的继承”，当组件初始化时会调用 mergeOptions 方法进行合并，采用策略模式针对不同的属性进行合并。当组件和混入对象含有同名选项时，这些选项将以恰当的方式进行“合并”。

  使用https://cn.vuejs.org/v2/guide/mixins.html
  var myMixin = {
    created: function () {
      this.hello()
    },
    methods: {
      hello: function () {
        console.log('hello from mixin!')
      }
    }
  }

  // 定义一个使用混入对象的组件
  var Component = Vue.extend({
    mixins: [myMixin]
  })

  var component = new Component() // => "hello from mixin!"


  当组件和混入对象含有同名选项时，这些选项将以恰当的方式进行“合并”。
  比如，数据对象在内部会进行递归合并，并在发生冲突时以组件数据优先。

  var mixin = {
    data: function () {
      return {
        message: 'hello',
        foo: 'abc'
      }
    }
  }

  new Vue({
    mixins: [mixin],
    data: function () {
      return {
        message: 'goodbye',
        bar: 'def'
      }
    },
    created: function () {
      console.log(this.$data)
      // => { message: "goodbye", foo: "abc", bar: "def" }
    }
  })


  同名钩子函数将合并为一个数组，因此都将被调用。另外，混入对象的钩子将在组件自身钩子之前调用。

  var mixin = {
    created: function () {
      console.log('混入对象的钩子被调用')
    }
  }

  new Vue({
    mixins: [mixin],
    created: function () {
      console.log('组件钩子被调用')
    }
  })

  // => "混入对象的钩子被调用"
  // => "组件钩子被调用"

  值为对象的选项，例如 methods、components 和 directives，将被合并为同一个对象。两个对象键名冲突时，取组件对象的键值对。
  var mixin = {
    methods: {
      foo: function () {
        console.log('foo')
      },
      conflicting: function () {
        console.log('from mixin')
      }
    }
  }

  var vm = new Vue({
    mixins: [mixin],
    methods: {
      bar: function () {
        console.log('bar')
      },
      conflicting: function () {
        console.log('from self')
      }
    }
  })

  vm.foo() // => "foo"
  vm.bar() // => "bar"
  vm.conflicting() // => "from self"

7.nextTick 使用场景和原理
  nextTick 中的回调是在下次 DOM 更新循环结束之后执行的延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。主要思路就是采用微任务优先的方式调用异步方法去执行 nextTick 包装的方法
    created() {
      console.log(111);
      console.log(this.$refs['hello']);
      this.$nextTick(() => {
        console.log(222);
        console.log(this.$refs['hello']);
      });
    }
  在created()钩子函数执行的时候DOM 其实并未进行任何渲染，而此时进行DOM操作并无作用，而在created()里使用this.$nextTick()可以等待dom生成以后再来获取dom对象

   get() {
      this.value = '你好啊';
      console.log(this.$refs['hello'].innerText); //hello 
      this.$nextTick(() => {
        console.log(this.$refs['hello'].innerText);//你好啊 
      });
    }

  this.$nextTick()在页面交互，尤其是从后台获取数据后重新生成dom对象之后的操作有很大的优势

8.Vue 模板编译原理
  Vue 的编译过程就是将 template 转化为 render 函数的过程 分为以下三步
  第一步是将 模板字符串 转换成 element ASTs（解析器）
  第二步是对 AST 进行静态节点标记，主要用来做虚拟DOM的渲染优化（优化器）
  第三步是 使用 element ASTs 生成 render 函数代码字符串（代码生成器）

9.能说下 vue-router 中常用的路由模式实现原理吗
  hash 模式
  location.hash 的值实际就是 URL 中#后面的东西 它的特点在于：hash 虽然出现 URL 中，但不会被包含在 HTTP 请求中，对后端完全没有影响，因此改变 hash 不会重新加载页面。
  可以为 hash 的改变添加监听事件
  window.addEventListener("hashchange", funcRef, false);
  复制代码
  每一次改变 hash（window.location.hash），都会在浏览器的访问历史中增加一个记录利用 hash 的以上特点，就可以来实现前端路由“更新视图但不重新请求页面”的功能了

  特点：兼容性好但是不美观

  history 模式
  利用了 HTML5 History Interface 中新增的 pushState() 和 replaceState() 方法。
  这两个方法应用于浏览器的历史记录站，在当前已有的 back、forward、go 的基础之上，它们提供了对历史记录进行修改的功能。这两个方法有个共同的特点：当调用他们修改浏览器历史记录栈后，虽然当前 URL 改变了，但浏览器不会刷新页面，这就为单页应用前端路由“更新视图但不重新请求页面”提供了基础。

  特点：虽然美观，但是刷新会出现 404 需要后端进行配置。
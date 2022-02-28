component [kəmˈpoʊnənt]
https://www.cnblogs.com/vickylinj/p/13529926.html
1.谈一下你对MVVM原理的理解
    传统的MVC指的是，用户操作会请求服务端路由，路由拦截分发请求，调用对应的控制器来处理。控制器会获取数据，然后数据与模板结合，将结果返回给前端，页面重新渲染。
    数据流是单向的，view——>model——>view
    MVVM：传统的前端会将数据手动渲染到页面上，MVVM模式不需要用户手动操作DOM元素，将数据绑定到viewModel层上，会自动将数据渲染到页面中。视图变化会通知viewModel层更新数据，viewModel就是MVVM模式的桥梁。

    数据驱动数据流动时双向的，model——>viewModel<——>view

2.请说一下响应式数据的原理
  vue2——核心点：Object.defineProperty —— 修改每一个属性

  默认Vue在初始化数据时，会给data中的属性使用Object.defineProperty，在获取和设置的进行拦截，重新定义所有属性。当页面取到对应属性时，会进行依赖收集（收集当前组件的watcher）。如果属性发生变化会通知相关依赖进行更新操作。
  依赖收集、派发更新的作用：如果没有这项操作，每个数据更新就会去渲染页面，极大的消耗性能。加了这项操作，去监听相关数据的改变，添加到队列里，当所有改变完事儿之后，一起进行渲染(详情见：https://www.dazhuanlan.com/2019/12/10/5dee72f414290/的3)。

  vue3——核心点：proxy（代理）—— 直接处理对象

  解决了vue2中的处理对象递归、处理数组麻烦的问题(详情见：https://www.dazhuanlan.com/2019/12/10/5dee72f414290/的1,2)

3.vue中时如何检测数组变化的：使用了函数劫持的方式，重写了数组方法
  Vue将data中的数组，进行了原型链重写，指向了自己定义的数组原型方法。这样当调用数组api时，可以通知依赖更新。如果数组中包含着引用类型，会对数组中的引用类型再次进行监控。
  Object.create()，保存原有原型

4.为何vue采用异步渲染?
  vue是组件级更新，如果不采用异步更新，那么每次更新数据都会对当前组件重新渲染。为了性能考虑，vue会在本轮数据更新后，再去异步更新视图。

5.nextTick实现原理
  nextTick主要是使用了宏任务和微任务，定义了一个异步方法。多次调用nextTick会将方法存入队列中，通过这个异步方法清空当前队列，所以nextTick就是异步方法。

6.vue中computed的特点
  默认computed也是一个watcher，具备缓存，只有当依赖的属性发生变化才会更新视图。

7.watch中的deep:true是如何实现的？
  当用户指定了watch中的deep属性为true时，如果当时监控的属性是数组类型，会对对象中的每一项进行求值，此时会将当前watcher存入到对应属性的依赖中，这样数组中对象发生变化时也会通知数据更新。
  内部原理就是递归，耗费性能 。

8.vue组件的生命周期

  每个生命周期什么时候被调用

  beforeCreate 在实例初始化new Vue()之后，数据观测(data observer)响应式处理之前被调用
  created 实例已经创建完成之后被调用，实例已完成以下的配置：数据观测（data observer）、属性和方法的运算、watch/event事件回调。数据可以拿到，但是没有$el。
  beforeMount 在挂载开始之前被调用：相关的render函数首次被调用。//template
  mounted el被新创建的vm.$el替换，并挂载到实例上去之后被调用。页面渲染完毕
  beforeUpdate 数据更新时调用，发生在虚拟DOM重新渲染和打补丁之前。
  updated 由于数据更改导致的虚拟DOM重新渲染和打补丁，在这之后会调用该钩子。
  beforeDestroy 实例销毁之前调用，在这一步，实例仍然完全可用。
  destroyed Vue实例销毁后调用。调用后，Vue实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。该钩子在服务器端渲染期间不被调用。
  每个生命周期内部可以做什么事

  created 实例已经创建完成，因为它时最早触发的，可以进行一些数据资源的请求。
  mounted 实例已经挂载完成，可以进行一些DOM操作。
  beforeUpdate 可以在这个钩子中进一步地更改状态，不会触发附加的重渲染过程。
  updated 可以执行依赖于DOM的操作，尽量避免在此期间更改状态，因为可能会导致更新无限循环。该钩子在服务器端渲染期间不被调用。
  destroyed 可以执行一些优化操作，清空定时器，解除绑定事件。


9.ajax请求放在哪个生命周期中？
  在created的时候，视图中的dom并没有被渲染出来，所以此时如果直接去操作dom节点，无法找到相关元素。
  在mounted中，由于此时的dom元素已经渲染出来了，所以可以直接使用dom节点。

  因此，一般情况下，都放在mounted中，保证逻辑的统一性。因为生命周期是同步执行的，ajax是异步执行的。

  但是，服务端渲染不支持mounted方法，所以在服务端渲染的情况下统一放在created中。

10.何时需要使用beforeDestroy？
  可能在当前组件使用了$on方法，需要在组件销毁前解绑
  清除自己定义的定时器
  解除事件的原生绑定scroll、mousemove

11.vue中模板编译原理
  模板（template）》 ast语法树（抽象语法树）》 codegen方法 ==》render函数 ==》createElement方法 ==》 Virtual Dom（虚拟dom）

12.为什么v-for和v-if不能连用？

  v-for会比v-if的优先级高一些，如果连用的话，会把v-if给每个元素都添加一下，会造成性能问题。
  如果确实需要判断每一个，可以用计算属性来解决，先用计算属性将满足条件的过滤出来，然后再去循环。

13.diff算法原理 

  1、先同级比较，再比较儿子节点
  2、先判断一方有儿子一方没儿子的情况
  3、比较都有儿子的情况
  4、递归比较子节点
  vue3中做了优化，只比较动态节点，略过静态节点，极大的提高了效率
  双指针去确定位置

14.组件中的data为什么是个函数？


  同一个组件被复用多次，会创建多个实例。这些实例用的是同一个构造函数，如果data是一个对象的话，所有组件共享了同一个对象。为了保证组件的数据独立性，要求每个组件都必须通过data函数返回一个对象作为组件的状态。

15.Vue中事件绑定的原理

  Vue的事件绑定分为两种：一种是原生的事件绑定，一种是组件的事件绑定
  原生dom事件绑定采用的是addEventListener
  组件的事件绑定采用的是$on方法


16.vue父子组件生命周期调用顺序
  组件的调用顺序都是先父后子，渲染完成的顺序是先子后父
  组件的销毁操作是先父后子，销毁完成的顺序是先子后父

17.谈谈你对keep-alive的理解（一个组件）

    keep-alive可以实现组件的缓存，当组件切换时，不会对当前组件卸载
    常用的2个属性include、exclude
    常用的2个生命周期activated、deactivated
    利用include、exclude属性

    <keep-alive include="bookLists,bookLists">
          <router-view></router-view>
    </keep-alive>
    <keep-alive exclude="indexLists">
          <router-view></router-view>
    </keep-alive>
    include属性表示只有name属性为bookLists，bookLists的组件会被缓存，（注意是组件的名字，不是路由的名字）其它组件不会被缓存exclude属性表示除了name属性为indexLists的组件不会被缓存，其它组件都会被缓存


    <template>
      <div id="app">
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
      </div>
    </template>
    //通过路由元信息来判断是否需要缓存

    1. activated [ˈæktɪveɪtɪd]

        在 keep-alive 组件激活时调用
        该钩子函数在服务器端渲染期间不被调用

    2. deactivated [diːˈæktɪveɪtɪd]

        在 keep-alive 组件停用时调用
        该钩子在服务器端渲染期间不被调用

      被包含在 keep-alive 中创建的组件，会多出两个生命周期的钩子: activated 与 deactivated

      使用 keep-alive 会将数据保留在内存中，如果要在每次进入页面的时候获取最新的数据，需要在 activated 阶段获取数据，承担原来 created 钩子函数中获取数据的任务。

      注意： 只有组件被 keep-alive 包裹时，这两个生命周期函数才会被调用，如果作为正常组件使用，是不会被调用的，以及在 2.1.0 版本之后，使用 exclude 排除之后，就算被包裹在 keep-alive 中，这两个钩子函数依然不会被调用！另外，在服务端渲染时，此钩子函数也不会被调用。

18.Vue中常见性能优化
    1、编码优化

      不要将所有的数据都放到data中，data中的数据都会增加getter、setter，会收集对应的watcher
      vue在v-for时给每项元素绑定事件需要用事件代理
      SPA页面采用keep-alive缓存组件
      拆分组件（提高复用性、增加代码的可维护性，减少不必要的渲染）
      v-if当值为false时，内部指令不会执行，具有阻断功能。很多情况下使用v-if替换v-show
      key保证唯一性（默认vue会采用就地复用策略）
      Object.freeze冻结数据
      合理使用路由懒加载、异步组件
          异步组件技术 ==== 异步加载 
          vue-router配置路由 , 使用vue的异步组件技术 , 可以实现按需加载 . 
          但是,这种情况下一个组件生成一个js文件

          /* vue异步组件技术 */

          { path: '/home', name: 'home', component: resolve => require(['@/components/home'],resolve) },

          { path: '/index', name: 'Index', component: resolve => require(['@/components/index'],resolve) },

          { path: '/about', name: 'about', component: resolve => require(['@/components/about'],resolve) }



          路由懒加载(使用import)
          const 组件名=() => import('组件路径');

          // 下面2行代码，没有指定webpackChunkName，每个组件打包成一个js文件。

          /* const Home = () => import('@/components/home')

          const Index = () => import('@/components/index')

          const About = () => import('@/components/about') */

          // 下面2行代码，指定了相同的webpackChunkName，会合并打包成一个js文件。

          把组件按组分块

          const Home = () => import(/* webpackChunkName: 'ImportFuncDemo' */ '@/components/home')

          const Index = () => import(/* webpackChunkName: 'ImportFuncDemo' */ '@/components/index')

          const About = () => import(/* webpackChunkName: 'ImportFuncDemo' */ '@/components/about')

          

          { path: '/about', component: About }, { path: '/index', component: Index }, { path: '/home', component: Home }

      
      数据持久化的问题，防抖、节流

    2、Vue加载性能优化

      第三方模块按需导入（babel-plugin-component）
      滚动到可视区域动态加载（https://tangbc.github.io/vue-virtual-scroll-list）
      图片懒加载（https://github.com/hilongjw/vue-lazyload.git）

    3、用户体验

      app-skeleton骨架屏
      app shell app壳
      pwa

    4、SEO优化

    预渲染插件prerender-spa-plugin
    服务端渲染ssr

    5、打包优化

      使用cdn的方式加载第三方模块
      多线程打包happypack
      splitChunks抽离公共文件
      sourceMap生成

    6、缓存压缩

      客户端缓存、服务端缓存
      服务端gzip压缩
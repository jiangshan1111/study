1.Setup函数
setup()函数是Vue3.0中，专门为组件提供的新属性。它为基于Composition API的新特性提供了统一的入口。
在Vue3中，定义methods、watch、computed、data数据都放在了setup()函数中

  1. 执行时机

    setup()函数会在created()生命周期之前执行。

  2. 接收props数据

    props是setup()函数的一个形参，组件接收的props数据可以在setup()函数内访问到。
    setup(props) {
        console.log(props.p1)
    }

  3. context上下文对象(即：slots，attrs，emit)。

    context 是 setup() 的第二个形参，它是一个上下文对象，可以通过 context 来访问Vue的实例 this 。

    setup(props,context) {
        console.log(this)
        console.log(context)
    }
    setup的context参数.png
    注意：在 setup() 函数中访问不到Vue的 this 实例

2.Composition-Api
  一组低侵入式的、函数式的 API，使得我们能够更灵活地「组合」组件的逻辑。

  1. reactive()

    reactive() 函数接收一个普通的对象，返回出一个响应式对象。

    在Vue2.x的版本中，我们只需要在 data() 中定义一个数据就能将它变为响应式数据，在 Vue3.0 中，需要用 reactive 函数或者 ref 来创建响应式数据。

    用reactive创建响应式对象

    // 在组件库中引入 reactive
    import { reactive } from '@vue/    composition-api'

    setup() {
        // 创建响应式对象
        const state = reactive({
            count:0
        });

        // 将响应式对象return出去，暴露给模板使用
        return state;
    }
    使用响应式对象

    <p>当前的count的值为：{{count}}</p>

    <button @click="count++">点击增加count<  button>


  2. ref()
    ref() 函数可以根据给定的值来创建一个响应式的数据对象，返回值是一个对象，且只包含一个 .value 属性。

    用 ref 创建响应式对象

    // 引入 ref
    import { ref } from '@vue/composition-api'

    setup() {
        // 创建响应式对象
        const count = ref(0);

        return {
            count
        }
    }
    使用响应式对象

    <p>当前的count的值为：{{count}}</p>

    <button @click="count++">点击增加count</button>
    ref 的注意事项

    在 setup() 函数内，由 ref() 创建的响应式数据返回的是对象，所以需要用 .value 来访问；

    而在 setup() 函数外部则不需要 .value ，直接访问即可。

    可以在 reactive 对象中访问 ref() 函数创建的响应式数据。

    新的 ref() 会覆盖旧的 ref() 。


  3. computed()
    computed() 用来创建计算属性，返回值是一个 ref() 实例。按照惯例，使用前需要先引入。

    computed创建只读计算属性

    给 computed() 传入一个函数，可以得到一个只读的计算属性：

    const count = ref(1)

    // 创建一个计算属性，使其值比 count 大 1
    const bigCount = computed(() => count.value + 1)

    console.log(bigCount.value) // 输出 2
    bigCount.value++ // error 不可写
    computed创建可读可写计算属性

    const count = ref(1)

    // 创建一个 computed 计算属性，传入一个对象
    const bigCount = computed({
        // 取值函数
        get: () => (count.value + 1),
        // 赋值函数
        set: val => {
          count.value = val - 1
        }
    })

    // 给计算属性赋值的操作，会触发 set 函数
    bigCount.value = 9
    // 触发 set 函数后，count 的值会被更新
    console.log(count.value) // 8

  4. readonly()
    传入一个响应式对象、普通对象或 ref ，返回一个只读的对象代理。这个代理是深层次的，对象内部的数据也是只读的。

    const state = reactive({ count: 0 })

    const copy = readonly(state)

    watchEffect(() => {
      // 依赖追踪
      console.log(copy.count)
    })

    // state 上的修改会触发 copy 上的侦听
    state.count++

    // 这里只读属性不能被修改
    copy.count++ // warning!

  5. watchEffect()
    watchEffect() 会立即执行传入的函数，并响应式侦听其依赖，并在其依赖变更时重新运行该函数。

    基本用法

    const count = ref(0)

    // 初次直接执行，打印出 0
    watchEffect(() => console.log(count.value))

    setTimeout(() => {
      // 被侦听的数据发生变化，触发函数打印出 1
      count.value++
    }, 1000)
    停止侦听

    watchEffect() 使用时返回一个函数，当执行这个返回的函数时，就停止侦听。

    const stop = watchEffect(() => {
      /* ... */
    })

    // 停止侦听
    stop()
    更多功能

  6. watch()
    composition-api 中的 watch 和 Vue2.x 中是一样的，watch 需要侦听数据，并执行它的侦听回调。默认情况下初次渲染不执行。

    watch 与 watchEffect 的不同

    watch 初次渲染不执行
    watch 侦听的更具体
    watch 可以访问侦听数据变化前后的值
    watch 侦听单个数据源

    侦听的数据可以是个 reactive 创建出的响应式数据（拥有返回值的 getter 函数），也可以是个 ref

    // 侦听一个 getter
    const state = reactive({ count: 0 })
    watch(
      () => state.count,
      (count, prevCount) => {
        /* ... */
      }
    )

    // 直接侦听一个 ref
    const count = ref(0)
    watch(count, (count, prevCount) => {
      /* ... */
    })
    watch 侦听多个数据源
    在侦听多个数据源时，把参数以数组的形式给 watch
    watch([ref1, ref2], ([newRef1, newRef2],   [prevRef1, prevRef2]) => {
      /* ... */
    })
    与 watchEffect 同样的更多功能

  Composition-Api 依赖工具
  下面介绍一下组合式API的依赖方法集：

    1. isRef()
      isRef() 顾名思义，是用来判断某个值是否为 ref() 创建出来的响应式的值。

      当你需要展开某个可能为 ref() 创建的响应式的值的时候，会用到它：

      import { isRef } from '@vue/composition-api'

      const unwrapper = isRef(foo) ? foo.value : foo
    2. toRefs()
      toRefs() 可以将 reactive() 创建出来的响应式对象转换成内容为 ref 响应式的值的普通对象

      在搞清楚 toRefs() 的用法之前，我们需要先了解一下用 reactive() 和 ref() 创建出来的响应式对象的区别：

      用 reactive() 创建的响应式对象，整个对象是响应式的，而对象里的每一项都是普通的值。当你把它用展开运算符展开后，整个对象的普通值都不是响应式的；
      而用 ref() 创建的响应式的值，本身就是响应式的，并不依赖于其他对象。
      所以当你需要展开 reactive() 创建的响应式对象，又不想让他们失去响应式特点的时候，就需要用 toRefs() 将它进行转换：

  总结：
    reactive 和 ref 都是用来定义响应式数据的 reactive更推荐去定义复杂的数据类型 ref 更推荐定义基本类型

    ref 和 reactive 本质我们可以简单地理解为ref是对reactive的二次包装， ref定义的数据访问的时候要多一个.value

    使用ref定义基本数据类型，ref也可以定义数组和对象。


3.生命周期
  Vue2.x 的生命周期	    Vue3.x 的生命周期
  beforeCreate	         使用 setup()
  created	               使用 setup()
  beforeMount	           onBeforeMount
  mounted	               onMounted
  beforeUpdate	         onBeforeUpdate
  updated	               onUpdated
  beforeDestroy	         onBeforeUnmount
  destroyed              onUnmounted
  errorCaptured	         onErrorCaptured

4.虚拟DOM的底层原理
  使用patch flag对dom元素进行标记
  静态元素没有标记
  动态 dom 元素 <span>{{msg}}</span>  1 /* TEXT */
  创建一个属性是动态绑定的元素 <span :id="asdd">{{msg}}</span> 9 /* TEXT, PROPS */ 而且后边多了一个数组 ["id"]

  Vue3 在 Vdom 的更新时，只会关注它有变化的部分。这样的优化使 Vue3 既跳出了 Vdom 的性能瓶颈，又依然保留了可以手写 render function 的灵活性。相当于 Vue3 既有 react 的灵活性，又有基于模板的性能保证。——尤雨溪

5.变更
  1. .sync
    <!-- 3.0 -->
    <ChildComponent v-model:title="pageTitle" v-model:content="pageContent" />
    <!-- 2.x -->
    <ChildComponent :title.sync="pageTitle" :content.sync="pageContent" />
     <!-- 是以下的简写： -->
    <ChildComponent
      :title="pageTitle"
      @update:title="pageTitle = $event"
      :content="pageContent"
      @update:content="pageContent = $event"
    />

  2.异步组件
    <!-- 2.x -->
    const asyncPage = () => import('./NextPage.vue')
    或者
    const asyncPage = {
      component: () => import('./NextPage.vue'),
      delay: 200,
      timeout: 3000,
      error: ErrorComponent,
      loading: LoadingComponent
    }

    <!-- 3.0 -->
    import { defineAsyncComponent } from 'vue'
    import ErrorComponent from './components/ErrorComponent.vue'
    import LoadingComponent from './components/LoadingComponent.vue'

    // 不带选项的异步组件
    const asyncPage = defineAsyncComponent(() => import('./NextPage.vue'))

    // 带选项的异步组件
    const asyncPageWithOptions = defineAsyncComponent({
      loader: () => import('./NextPage.vue'),
      delay: 200,
      timeout: 3000,
      errorComponent: ErrorComponent,
      loadingComponent: LoadingComponent
    })

  3.$attrs  $attrs为组件标签内没有在组件内用props声明的属性
    现在 $attrs 包含传递给组件的所有 attribute，包括 class 和 style。
    <template>
      <label>
        <input type="text" v-bind="$attrs" />
      </label>
    </template>
    <script>
    export default {
      inheritAttrs: false //如果你不希望组件的根元素继承特性，你可以在组件的选项中设置
    }
    </script>
    像这样使用时：
    <my-component id="my-id" class="my-class"></my-component>
    ……将生成以下 HTML：
    <!-- 2.x -->
    <label class="my-class">
      <input type="text" id="my-id" />
    </label>
    <!-- 3.0 -->
    <label>
      <input type="text" id="my-id" class="my-class" />
    </label>

  4.$children 被移除 推荐使用$refs
  5.自定义指令
    <!-- 2.x -->
    bind - 指令绑定到元素后发生。只发生一次。
    inserted - 元素插入父 DOM 后发生。
    update - 当元素更新，但子元素尚未更新时，将调用此钩子。
    componentUpdated - 一旦组件和子级被更新，就会调用这个钩子。
    unbind - 一旦指令被移除，就会调用这个钩子。也只调用一次。
    <!-- 3.0 -->
    created - 新的！在元素的 attribute 或事件侦听器应用之前调用。
    bind → beforeMount
    inserted → mounted
    beforeUpdate：新的！这是在元素本身更新之前调用的，很像组件生命周期钩子。
    update → 移除！有太多的相似之处要更新，所以这是多余的，请改用 updated。
    componentUpdated → updated
    beforeUnmount：新的！与组件生命周期钩子类似，它将在卸载元素之前调用。
    unbind -> unmounted
  6.$emit
    <!-- 2.x -->
    不需要申明
    <!-- 3.0 -->
    现在需要和props一样需要申明
    export default {
      props: ['text'],
      emits: ['accepted']
    }
    .native - 主要是给自定义的组件添加原生事件。
    因为.native移除 所以需要申明emits 来区分emit事件和native事件
  7.$on、$off 和 $once移除
  8.Vue 3.0 开始，过滤器已删除，不再支持。建议用方法调用或计算属性替换它们
  9.函数式组件
    <!-- 2.x -->
    export default {
      functional: true,
      props: ['level'],
      render(h, { props, data, children }) {
        return h(`h${props.level}`, data, children)
      }
    }
    <!-- 3.0 -->
    import { h } from 'vue'

    const DynamicHeading = (props, context) => {
      return h(`h${props.level}`, context.attrs, context.slots)
    }

    DynamicHeading.props = ['level']
    export default DynamicHeading

  10.全局 API
    一个新的全局 API：createApp
    import { createApp } from 'vue'
    import MyApp from './MyApp.vue'
    const app = createApp(MyApp)
    app.mount('#app')

    2.x 全局 API	                 3.x 实例 API (app)
    Vue.config	                  app.config
    Vue.config.productionTip	    removed (见下方)
    Vue.config.ignoredElements	  app.config.isCustomElement (见下方)
    Vue.component	                app.component
    Vue.directive	                app.directive
    Vue.mixin	                    app.mixin
    Vue.use	                      app.use (见下方)
    Vue.prototype	                app.config.globalProperties (见下方)

  11.全局 API Treeshaking
    受影响的 API
    Vue 2.x 中的这些全局 API 受此更改的影响：

    Vue.nextTick
    Vue.observable (用 Vue.reactive 替换)
    Vue.version
    Vue.compile (仅全构建)
    Vue.set (仅兼容构建)
    Vue.delete (仅兼容构建)
    例如nextTick()
      <!-- 2.x -->
      import Vue from 'vue'
      Vue.nextTick(() => {
        // 一些和DOM有关的东西
      })
      <!-- 3.0 -->
      import { nextTick } from 'vue'
      nextTick(() => {
        // 一些和DOM有关的东西
      })
  12.key attribute
    新增：对于 v-if/v-else/v-else-if 的各分支项 key 将不再是必须的，因为现在 Vue 会自动生成唯一的 key。
    非兼容：如果你手动提供 key，那么每个分支必须使用唯一的 key。你不能通过故意使用相同的 key 来强制重用分支。
    非兼容：<template v-for> 的 key 应该设置在 <template> 标签上 (而不是设置在它的子节点上)。

  13.按键修饰符
    以下是变更的简要总结：
      非兼容：不再支持使用数字 (即键码) 作为 v-on 修饰符
      非兼容：不再支持 config.keyCodes

  14.插槽统一
    此更改统一了 3.x 中的普通插槽和作用域插槽。
    以下是变化的变更总结：
    this.$slots 现在将插槽作为函数公开
    非兼容：移除 this.$scopedSlots
  15.过渡的 class 名更改
    过渡类名 v-enter 修改为 v-enter-from、过渡类名 v-leave 修改为 v-leave-from
  16.移除 v-on.native 修饰符
    <!-- 2.x -->
    默认情况下，传递给带有 v-on 的组件的事件监听器只有通过 this.$emit 才能触发。要将原生 DOM 监听器添加到子组件的根元素中，可以使用 .native 修饰符：
    <my-component
      v-on:close="handleComponentEvent"
      v-on:click.native="handleNativeClickEvent"
    />
    <!-- 3.0 -->
    <my-component
      v-on:close="handleComponentEvent"
      v-on:click="handleNativeClickEvent"
    />
    MyComponent.vue

    <script>
      export default {
        emits: ['close']
      }
    </script>
  17.v-model
    就变化内容而言，此部分属于高阶内容：
    非兼容：用于自定义组件时，v-model prop 和事件默认名称已更改：
    prop：value -> modelValue；
    event：input -> update:modelValue；
    非兼容：v-bind 的 .sync 修饰符和组件的 model 选项已移除，可用 v-model 作为代替；
    新增：现在可以在同一个组件上使用多个 v-model 进行双向绑定；
新增：现在可以自定义 v-model 修饰符。
  18.v-if 与 v-for 的优先级对比
    两者作用于同一个元素上时，v-if 会拥有比 v-for 更高的优先级。
  19.v-bind 合并行为
    v-bind 的绑定顺序会影响渲染结果
    <!-- 2.x -->
      在 2.x，如果一个元素同时定义了 v-bind="object" 和一个相同的单独的 property，那么这个单独的 property 总是会覆盖 object 中的绑定。

      <!-- template -->
      <div id="red" v-bind="{ id: 'blue' }"></div>
      <!-- result -->
      <div id="red"></div>

    <!-- 3.0 -->
      在 3.x，如果一个元素同时定义了 v-bind="object" 和一个相同的单独的 property，那么声明绑定的顺序决定了它们如何合并。

      <!-- template -->
      <div id="red" v-bind="{ id: 'blue' }"></div>
      <!-- result -->
      <div id="blue"></div>

      <!-- template -->
      <div v-bind="{ id: 'blue' }" id="red"></div>
      <!-- result -->
      <div id="red"></div>

  20.Watch on Arrays
    当使用 watch 选项侦听数组时，只有在数组被替换时才会触发回调。换句话说，在数组改变时 watch 回调将不再被触发。要想在数组改变时触发 watch 回调，必须指定 deep 选项。

    watch: {
      bookList: {
        handler(val, oldVal) {
          console.log('book list changed')
        },
        deep: true
      },
    }


transform-origin:left  //以某某为起点转动
transform-origin:bottom center  //以底部的中心为起点转动

一、准备
    安装微信开发者工具
    https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html
    
    注册
    https://mp.weixin.qq.com/
    企业用户 所有人都能看
    个人用户 只能自己玩
    按步骤注册
    然后登录
    在开发设置里找到AppID 和微信开发者工具 关联上
    没有appid大部分功能受限
    appid wx51890b12c25594a3

    如果想让别人看到
    用户身份-添加用户-权限

    四个步骤
    编码、调试、预览、提交

    project.config.json //工具配置文件
    app.json //公共配置文件 窗口表现，文件路劲
    app.js 注册了一个小程序

二、基本属性
    1.方法
    wx. 方法库
    wx.showToast({
                    title:'加载中'，
                    icon:'loading',
                    image:'',自定义图片
                    duration:'',
                    success:function(){
                        //回调
                    },
                    mask:true // 可以防止一直下拉
                }) //下拉刷新时弹出loading图标

                wx.showNavigationBarLoading() //标题显示加载中状态
    
    //提示框 取消确定 类似于confirm
    wx.showModal({
      title:"提示",
      content:'hahhaha',
      success:function(res){

      }
    })

    bindtouchstart 拖拽开始 -》onmousestart
    bindtouchmove 拖拽开始 -》onmousemove
    bindtouchend 拖拽开始 -》onmouseend
    通过function里的ev 可以看到坐标 起始位置等属性


    事件冒泡
    //原生js
    e.cancelBubble = true //禁止冒泡 兼容所有浏览器
    e.stopPropagation() //禁止冒泡 兼容ie8以上浏览器
    //小程序
    事件有两套
    一个是bind 有事件冒泡机制
    一个是catch 阻止事件冒泡 
    比如 bindtap和catchtap 或者 bindtouchstart和catchtouchstart

    2.跳转页面
    wxml
    <navigator url="../home/index">跳转到江山页面</navigator>
    js
    wx.navigateTo 跳转页面方法
    <button bindtap="letgo"></button>
    在js里定义方法
    letgo(){
        console.log(1)
        wx.navigateTo({
            url:'../home/index'
        })
    }
    
    3.数据操作 
    数据结构类似于vue
    数据操作类似于react
    data{
        mayName:'jiangshan'
    }
    调用
    this.data.mayName
    改变值
    this.setData({
        mayName:'jiangshan'
    })

    4.配置json
        修改头部标题
        navigationBarTitleText 子页面在对应的json里设置 所有的页面统一用在 app.json设置

    5.标签
    view <-> div
    text <-> p
    image <-> img 需要用</image>闭合
    checkbox <-> input[type='checkbox']
    <block></block>  //本身是一个包装元素，只支持属性，不会渲染 用于循环判断等
    <loading>加载中</loading> 可以直接弹出一个加载中的样式
    css样式中
    background 不支持本地图片 只支持网络图片和base64格式图片
    http://base64.xpcha.com/pic.html  image/改成images/


    6.自定义属性
    wx:if <-> v-if   wx:if = '{{isShow}}'

    hidden <-> !v-show 

    wx:for <-> v-for  wx:for = '{{[1,2,3]}}'  
                     <view wx:for = '{{[1,2,3]}}' >
                        {{item}}{{index}}  默认取值
                     </view>

    wx:for-item 和 wx:for-index 和 wx:key = "*this"表示key是item本身  wx:key = "id" 唯一值指item.id  
                    <view wx:for = '{{[1,2,3]}}' wx:for-item='leo' wx:for-index='bIndex'>
                        {{leo}}{{bIndex}}  设置取值
                    </view>
    
7.全局传值  //类似于redux
    在app.js里设置globalData:{
        a:10
    }
    在其它页面js里都可以访问到
    let app = getApp() console.log(app.globalData.a)
    直接改变app.globalData.a 就可以改变全局的值
    需要在onload里setData获取app.globalData.a 不然获取到的是初始值 不是最新的值


8.生命周期函数
    分成两大块
    1.app下的
        onLaunch() //小程序激活时 15只会执行一次
        onShow()  //进入小程序前台 与放到后台运行相反 (全局)
        onHide()  //进入小程序后台 与放到前台运行相反 (全局)
        onError()  //出错（程序报错）时触发

    2.page下的
        onLoad() //加载时触发 获取后台数据
        onReady() //页面初次渲染完成时触发
        onShow()  //进入小程序前台 与放到后台运行相反 在ready之前load之后
        onHide()  //进入小程序后台 与放到前台运行相反
        onUnload() //页面卸载 左上角返回箭头触发
        onPullDownRefresh() //监听用户下拉动作 下拉刷新
                "disableScroll":true //禁止下拉
                enablePullDownRefresh:false //禁止下拉刷新
                默认是没有下拉功能的，需要配置
                enablePullDownRefresh:true
                全局在app.json window下设置
                局部page直接设置
                wx.showToast({
                    title:'加载中'，
                    icon:'loading',
                    image:'',自定义图片
                    duration:'',
                    success:function(){
                        //回调
                    },
                    mask:true // 可以防止一直下拉
                }) //下拉刷新时弹出loading图标

                wx.showNavigationBarLoading() //标题显示加载中状态
        onReachBottom() //页面上拉触底事件的处理函数
        onShareAppMessage() // 点击右上角分享


9.小程序页面布局
  rpx -> 只要是小程序 你的横屏宽度永远是 750rpx

10.数据传参
  使用 ev.target.dataset.xxx
  <button bindtap='tap' data-id='1' data-name='2'></button>

  Page({
    tap:function(ev){
      console.log(ev.target.dataset.id)   //1
      console.log(ev.target.dataset.name)  //2
    }
  })
        
11.微信小程序动画

  1.
  //css3
    transition  1s（过渡时间） all ease 1s(延时时间)
    和animation  mymove 5s infinite(重复) alternate(反向)
    @keyframe mymove{
      from{}
      to{}
    }

  //小程序自带
    animation
    wx.createAnimation({
      delay:1000,//默认参数
      duration:700, //默认参数
      timingFunction:'ease',//默认参数
    }).rotate(90).backgroundColor('red')//第一步
    .step({
      delay:1000,//会改变createAnimation参数
      duration:700,//会改变createAnimation参数
      timingFunction:'ease',//会改变createAnimation参数
    })
    结尾时需要加.step()表示终止 可以多步进行
    <view animation='{{dataName}}'></view>
    this.setData({
      dataName:wx.createAnimation({
        delay:1000,
        duration:700,
        timingFunction:'ease',
      }).rotate(90).backgroundColor('red').step()
    })


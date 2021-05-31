// index.js
// 获取应用实例
const app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    a:'',
    gaNumberValue:0,
    gaValue:[],
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //跳转
  letGo(){
    wx.navigateTo({
      url: '../home/index'
    })
  },
  ga(){
    wx.showToast({
      title:'孙梦雨是个傻子',
      icon:'loading',
      duration:1000,
  }) 
    let gaValue = []
    for(let i = 0;i<this.data.gaNumberValue;i++){
      if(i%2){
        gaValue.push('孙梦雨：嘎')
      }else{
        gaValue.push('玉儿：嘎')
      }
    }
    this.setData({
      gaValue:gaValue
    })
  },
  gaNumber(e){
    
    this.setData({
      gaNumberValue:e.detail.value.replace(/[^0-9]/g,'')
    })
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
        a:app.globalData.a,
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
          a:app.globalData.a,
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onHide(){
    wx.showToast({
      title:'孙梦雨是个傻子',
      icon:'loading',
      duration:1000,
  }) 
  }
})

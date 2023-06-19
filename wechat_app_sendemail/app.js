// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })

     // 获取设备信息
     wx.getSystemInfo({
      success: (res) => {
        // console.log(res);
        this.globalData.systeminfo = res
      },
    })
    // 获得胶囊按钮位置信息
    this.globalData.headerBtnPosi = wx.getMenuButtonBoundingClientRect()
  },
  globalData: {
    userInfo: null,
    systeminfo: {}, // 系统信息
    headerBtnPosi: {} // 胶囊按钮位置信息
  }
})

// pages/privacy_agreement/privacy_agreement.js
Page({

/**
     * 页面的初始数据
     */
    data: {
      //获取各种高度信息---tcy
      // 状态栏高度
      statusBarHeight: wx.getStorageSync('statusBarHeight'),
      // 导航栏高度
      navigationBarHeight: wx.getStorageSync('navigationBarHeight'),
      // 胶囊按钮高度
      menuButtonHeight: wx.getStorageSync('menuButtonHeight'),
      // 导航栏和状态栏高度
      navigationBarAndStatusBarHeight:
          wx.getStorageSync('statusBarHeight') +
          wx.getStorageSync('navigationBarHeight'),
  },

  //返回按钮实现
  back(){
      //返回上一级，关闭当前页面
      wx.navigateBack({
        delta: 1
      })
  },

  //获取自定义导航栏高度-用于信息页面--tcy
  getNavigationBarHeight(){
    const { statusBarHeight, platform } = wx.getSystemInfoSync()
    const { top, height } = wx.getMenuButtonBoundingClientRect()

    // 状态栏高度
    wx.setStorageSync('statusBarHeight', statusBarHeight)
    // 胶囊按钮高度 一般是32 如果获取不到就使用32
    wx.setStorageSync('menuButtonHeight', height ? height : 32)
    
    // 判断胶囊按钮信息是否成功获取
    if (top && top !== 0 && height && height !== 0) {
        const navigationBarHeight = (top - statusBarHeight) * 2 + height
        // 导航栏高度
        wx.setStorageSync('navigationBarHeight', navigationBarHeight)
    } else {
        wx.setStorageSync(
          'navigationBarHeight',
          platform === 'android' ? 48 : 40
        )
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
      //获取自定义导航栏高度-用于信息页面--tcy
      this.getNavigationBarHeight();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})
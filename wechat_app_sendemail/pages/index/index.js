// index.js
// 获取应用实例
const app = getApp()

// 引用utils模块中的方法
var utils = require('../../utils/util.js')

Page({
  data: {
    user_name: "",
    user_addr: "",
    user_addr1: "",
    user_phone: "",
    user_note: "",
    user_note1: "",
    // 是否同意协议
    is_agree: false,
    commit_result: "同一用户提交一次即可,请勿重复提交",

    // 组件所需的参数
    nvabarData: {
      showCapsule: 0, // 是否显示左上角图标   1表示显示    0表示不显示
      title: '小二采样', // 导航栏 中间的标题
      // textColor: '#fff', // 标题颜色
      textColor: 'black', // 标题颜色
      bgColor: '#fff',
      // bgColor: '#3281ff', // 导航栏背景颜色
      btnBgColor: '#2B6ED9', // 胶囊按钮背景颜色
      iconColor: 'white', // icon颜色 black/white
      borderColor: 'rgba(255, 255, 255, 0.3)' // 边框颜色 格式为 rgba()，透明度为0.3
    },
    // 此页面 页面内容距最顶部的距离
    height: app.globalData.systeminfo.statusBarHeight * 2 + 20,
  },

  // 事件处理函数
  nameInput: function (res) {
    console.log('用户名为:' + utils.trimStr(res.detail.value))
    this.setData(
      {
        user_name: utils.trimStr(res.detail.value)
      }
    )
  },

  addrInput: function (res) {
    console.log('用户地址为:' + res.detail.value)
    this.setData(
      {
        user_addr: utils.trimStr(res.detail.value)
      }
    )
  },

  addr1Input: function (res) {
    console.log('用户地址1为:' + res.detail.value)
    this.setData(
      {
        user_addr1: utils.trimStr(res.detail.value)
      }
    )
  },

  noteInput: function (res) {
    console.log('用户备注信息为:' + res.detail.value)
    this.setData(
      {
        user_note: utils.trimStr(res.detail.value)
      }
    )
  },

  note1Input: function (res) {
    console.log('用户备注信息为:' + res.detail.value)
    this.setData(
      {
        user_note1: utils.trimStr(res.detail.value)
      }
    )
  },

  phoneInput: function (res) {
    console.log('用户联系电话为:' + res.detail.value)
    this.setData(
      {
        user_phone: utils.trimStr(res.detail.value)
      }
    )
  },

  radioChange: function (e) {
    var check = this.data.is_agree;
    check = !check;
    this.setData({
      is_agree: check
    })
  },

  goUserPage() {
    wx.navigateTo({
      url: '/pages/user_agreement/user_agreement',
    })
  },

  goPrivacyPage() {
    wx.navigateTo({
      url: '/pages/privacy_agreement/privacy_agreement',
    })
  },

  postEmail() {

    if (this.data.user_name.length === 0) {
      wx.showModal({
        title: '提示',
        content: '请输入姓名',
        showCancel: false,
        complete: (res) => {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
      return
    }
    if (this.data.user_addr.length === 0) {
      wx.showModal({
        title: '提示',
        content: '请输入住址',
        showCancel: false,
        complete: (res) => {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
      return
    }

    if (this.data.user_phone.length === 0) {
      wx.showModal({
        title: '提示',
        content: '请输入联系电话',
        showCancel: false,
        complete: (res) => {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
      return
    }

    // 校验手机号格式
    if (!utils.isPhoneAvailable(this.data.user_phone)) {
      wx.showModal({
        title: '提示',
        content: '联系电话格式错误,必须为11位手机号',
        showCancel: false,
        complete: (res) => {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
      return
    }

    if (this.data.user_note.length === 0) {
      wx.showModal({
        title: '提示',
        content: '请输入备注信息',
        showCancel: false,
        complete: (res) => {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
      return
    }

    // 发送数据给腾讯轻联
    let that = this;
    let jsonData = {
      user_name: this.data.user_name,
      user_addr: this.data.user_addr + this.data.user_addr1,
      user_phone: this.data.user_phone,
      user_note: this.data.user_note + this.data.user_note1
    }
    wx.request({
      url: "https://api.hiflow.tencent.com/engine/webhook/31/1668534415678517249",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: JSON.stringify(jsonData),
      complete: function (res) {
        if (res == null || res.data == null) {
          // console.error('网络请求失败')
          wx.showModal({
            title: '提示',
            content: '网络请求失败,请稍后再试!',
            showCancel: false,
            complete: (res) => {
              if (res.confirm) {
                console.log(res.errMsg)
              }
            }
          })
          return
        }
        wx.showToast({
          title: '提交成功, 感谢反馈',
          icon: 'success',
          mask: true,
          duration: 1500
        })
        // exitMiniProgram 需要事件触发才能退出
        setTimeout(function () {
          // console.log('aaaaaaaa')
          // 提交完成后退出小程序
          wx.exitMiniProgram()
          // console.log('bbbbbbbb')
        }, 500)

        // 刷新提交结果
        that.setData({
          commit_result: that.data.user_phone + " 提交成功"
        })

        // 提交成功后,清空手机号,防止用户重复提交
        that.setData({
          user_phone: ""
        })
      }
    })
    //msleep(500)
    //wx.exitMiniProgram()
  },

  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
      })
    }
  },
})

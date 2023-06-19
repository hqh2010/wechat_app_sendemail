const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

// 小程序中的utils是一个模块, util.js里封装的方法要在外部使用的话,必须通过module.exports 或 exports对外暴露
const trimStr = str => {
  return str.replace(/(^\s*)|(\s*$)/g, '')
}

// 校验11位手机号
const isPhoneAvailable = phone => {
// 1--以1为开头；
// 2--第二位可为3,4,5,7,8,中的任意一位；
// 3--最后以0-9的9个整数结尾
  var myreg = /^[1][3,4,5,7,8][0-9]{9}$/
  if (!myreg.test(phone)) {
    return false
  } else {
    return true
  }
}

module.exports = {
  formatTime,
  trimStr,
  isPhoneAvailable
}

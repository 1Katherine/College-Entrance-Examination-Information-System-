import Cookies from 'js-cookie'

const TokenKey = 'ceeis-token' // 设定一个key用于存放token

// 获取token方法
export function getToken() {
  return Cookies.get(TokenKey)
}

// 设置token方法
export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

// 删除token方法
export function removeToken() {
  return Cookies.remove(TokenKey)
}

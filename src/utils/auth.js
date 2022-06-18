/*
 * @Author: Yang
 * @Date: 2022-06-18 12:19:35
 * @LastEditors: Yang
 * @LastEditTime: 2022-06-18 17:15:21
 * @Description: file content
 */
import Cookies from 'js-cookie'

const TokenKey = 'ceeis-token' // 设定一个key用于存放token

const timeKey = 'ceeis-token-timeKey' // 设定一个key用于存放token的持续时间

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

// 获取token的持续时间
export function getTimeStamp() {
  return Cookies.get(timeKey)
}

// 设置token获取时的时间戳
export function setTimeStamp() {
  Cookies.set(timeKey, Data.now())
}

/*
 * @Author: Yang
 * @Date: 2022-06-18 16:56:26
 * @LastEditors: Yang
 * @LastEditTime: 2022-06-18 17:06:38
 * @Description: file content
 */

import { option } from 'runjs'

// 自定义指令 - 解决异常图片情况

export const imageError = {
  // 指定对象在当前的dom元素插入到节点之后才执行
  //   dom: 当前指令作用的dom对象（img）
  //   options：指令中的变量，有一个value变量
  inserted(dom, options) {
    dom.src = dom.src || options.value // 如果图片地址为null，则给图片赋值一个默认地址value
    //   当图片有地址，但是没有加载成功时会触发图片的onerror事件
    dom.onerror = function() {
      dom.src = options.value // 如果图片地址加载失效，则给图片赋值一个默认地址value
    }
  },
  // 在当前组件更新完毕后执行
  componentUpdate(dom, options) {
    dom.src = dom.src || options.value
  }
}
// 自定义指令使用方法：<img v-imageError="imgUrl" />

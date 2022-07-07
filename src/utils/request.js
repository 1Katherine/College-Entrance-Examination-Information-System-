/*
 * @Author: Yang
 * @Date: 2022-06-18 12:19:35
 * @LastEditors: Yang
 * @LastEditTime: 2022-06-18 17:18:05
 * @Description: file content
 */
// 导出一个axios实例
// axios实例包含一个请求拦截器和一个响应拦截器
import axios from 'axios'
import { Message } from 'element-ui'

// import { getTimeStamp } from '@/utils/auth'

// const Timeout = 3600 // 定义token超时时间

// 创建一个axios实例
const service = axios.create({
  baseURL: '/api', // 设置axios请求的基础的基础地址(通过/api别名指定后端路由)
  timeout: 5000 // 定义5秒超时
})

// 请求拦截器
service.interceptors.request.use(

)

// 响应拦截器
service.interceptors.response.use(
  response => {
    const res = response
    // console.log('响应拦截器')

    // 这里定义自己的业务状态码逻辑
    if (res.data.errorCode === 400) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(new Error(res.data.message || 'Error'))
    } else {
      return res
    }
  },
  // 响应500时，走error方法
  error => {
    console.log(error.response)
    Message({
      message: '操作失误，请联系管理员',
      type: 'error',
      duration: 2 * 1000
    })
    return Promise.reject(error)
  }
)

export default service // 导出axios实例

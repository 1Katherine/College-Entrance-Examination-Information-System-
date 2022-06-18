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
import { getTimeStamp } from '@/utils/auth'

const Timeout = 3600 // 定义token超时时间

// 创建一个axios实例
const service = axios.create({
  baseURL: '', // 设置axios请求的基础的基础地址
  timeout: 5000 // 定义5秒超时
})

// 请求拦截器
service.interceptors.request.use()

service.interceptors.response.use() // 响应拦截器

export default service // 导出axios实例

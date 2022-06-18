// 导出一个axios实例
// axios实例包含一个请求拦截器和一个响应拦截器
import axios from 'axios'

// 创建一个axios实例
const service = axios.create({
  baseURL: '', // 设置axios请求的基础的基础地址
  timeout: 5000 // 定义5秒超时
})

service.interceptors.request.use() // 请求拦截器

service.interceptors.response.use() // 响应拦截器

export default service // 导出axios实例

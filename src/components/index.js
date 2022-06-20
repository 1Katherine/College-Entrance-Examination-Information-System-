// 所有公共组件的全局注册 Vue.use
import PageTools from './PageTools'
import UploadExcel from './UploadExcel'

export default {
  // 实际上Vue.use使用的是install方法
  install(Vue) {
    // 注册全局通用栏组件
    Vue.component('PageTools', PageTools)
    // 注册导入Excel组件
    Vue.component('UploadExcel', UploadExcel)
  }
}

// 导出学校招生信息模块的路由规则
import Layout from '@/layout'

export default {
  path: '/subjectInfo',
  name: 'subjectInfo',
  component: Layout, // 每个模块都属于Layout的子模块
  children: [
    {
      // 配置二级路由表
      path: '', // 当二级路由path为空时，表示该路由为当前二级路由的默认路由
      component: () => import('@/views/subjectInfo'),
      meta: {
        title: '学校专业信息', // 左侧导航会读取我们的路由里的meta里面的title作为显示菜单名称
        icon: 'school'
      }
    }
  ]
}

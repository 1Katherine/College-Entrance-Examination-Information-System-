// 导出模块的路由规则
import Layout from '@/layout'

export default {
  path: '/featureSchools',
  name: 'featureSchools',
  component: Layout, // 每个模块都属于Layout的子模块
  meta: {
    title: '特色院校信息管理',
    icon: 'nested'
  },
  children: [
    {
      // 配置二级路由表
      path: 'dual', // 当二级路由path为空时，表示该路由为当前二级路由的默认路由
      component: () => import('@/views/featureSchools/dual'),
      meta: {
        title: '双一流高校', // 左侧导航会读取我们的路由里的meta里面的title作为显示菜单名称
        icon: 'school'
      }
    },
    {
      path: 'shuangGao',
      component: () => import('@/views/featureSchools/shuangGao'),
      meta: {
        title: '双高计划高校',
        icon: 'school'
      }
    },
    {
      path: 'qiangJi',
      component: () => import('@/views/featureSchools/qiangJi'),
      meta: {
        title: '强基计划高校',
        icon: 'school'
      }
    }
  ]
}

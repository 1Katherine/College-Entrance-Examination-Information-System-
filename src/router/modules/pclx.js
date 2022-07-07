// 批次、招生类型
import Layout from '@/layout'

export default {
  path: '/pclx',
  name: 'pclx',
  component: Layout, // 每个模块都属于Layout的子模块
  meta: {
    title: '批次、类型信息',
    icon: 'other'
  },
  children: [
    {
      // 配置二级路由表
      path: 'lqpc', // 当二级路由path为空时，表示该路由为当前二级路由的默认路由
      component: () => import('@/views/pclx/lqpc'),
      meta: {
        title: '录取批次', // 左侧导航会读取我们的路由里的meta里面的title作为显示菜单名称
        icon: 'lqpc'
      }
    },
    {
      path: 'zslx',
      component: () => import('@/views/pclx/zslx'),
      meta: {
        title: '招生类型',
        icon: 'zslx'
      }
    },
    {
      path: 'discipline',
      component: () => import('@/views/pclx/discipline'),
      meta: {
        title: '学科门类',
        icon: 'other'
      }
    },
    {
      path: 'subject',
      component: () => import('@/views/pclx/subject'),
      meta: {
        title: '一级学科',
        icon: 'other'
      }
    },
    {
      path: 'major',
      component: () => import('@/views/pclx/major'),
      meta: {
        title: '专业信息',
        icon: 'other'
      }
    }
  ]
}
